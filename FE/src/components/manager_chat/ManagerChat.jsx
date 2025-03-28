import { useEffect, useState, memo, useRef, useCallback } from 'react';
import { Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './ManagerChat.css';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import useLocalStorage from 'use-local-storage'
import { jwtDecode } from 'jwt-decode';
import LOCALSTORAGE from '../../constant/localStorage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

const ManagerChat = memo(() => {
    const messagesEndRef = useRef(null);
    const [workers, setWorkers] = useState([]);
    const [client, setClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [chatRoomId, setChatRoomId] = useState(null);
    const [userChatRoom, setUserChatRoom] = useState(null);
    const [auth, setAuth] = useLocalStorage(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION, '');
    const [sizeMes, setSizeMes] = useState(20);
    const [page, setPage] = useState(0);
    const [hasMoreMessages, setHasMoreMessages] = useState(true);
    const [isFetchingMessages, setIsFetchingMessages] = useState(false);

    const chatRoomIdRef = useRef(chatRoomId);
    const userChatRoomRef = useRef(userChatRoom);
    const bearerTokenRef = useRef(atob(auth));

    useEffect(() => {
        chatRoomIdRef.current = chatRoomId;
        userChatRoomRef.current = userChatRoom;
        bearerTokenRef.current = atob(auth);
    }, [chatRoomId, userChatRoom, auth]);

    useEffect(() => {
        getALlWorkersChatRoom();
        handleConnectWebSocket();
    }, [auth]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (userChatRoom) {
            setMessages([]);
            setPage(0);
            setHasMoreMessages(true);
            handleFetchChatMessages(0, sizeMes);
        } else {
            setMessages([]);
            setChatRoomId(null);
        }
    }, [userChatRoom]);

    const handleFetchChatMessages = useCallback(async (currentPage, currentSize) => {
        if (!userChatRoom) return;
        setIsFetchingMessages(true);
        try {
            const params = new URLSearchParams({
                senderId: parseInt(jwtDecode(atob(auth)).id),
                receiveId: userChatRoom.id,
                page: currentPage,
                size: currentSize
            });

            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_END_POINT}/chat/read?${params}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${bearerTokenRef.current}`,
                    },
                }
            );

            if (!response.ok) throw new Error("Failed to fetch chat messages");

            const data = await response.json();
            const messagesContent = data.content;
            const totalElements = data.totalElements;

            const userId = jwtDecode(atob(auth)).id;

            const formattedMessages = messagesContent.map(msg => ({
                text: msg.message,
                isUserMessage: msg.senderId === userId,
            }));

            setMessages(prevMessages => currentPage === 0 ? formattedMessages : [...prevMessages, ...formattedMessages]);
            setHasMoreMessages(messages.length + formattedMessages.length < totalElements);
            setPage(currentPage + 1);

        } catch (error) {
            console.error("Error fetching chat messages:", error);
            toast.error("Error fetching chat messages");
        } finally {
            setIsFetchingMessages(false);
        }
    }, [auth, userChatRoom, messages]);

    const handleSetUserChat = async (worker) => {
        setUserChatRoom(worker);
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_END_POINT}/chat-room`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${bearerTokenRef.current}`,
                },
            });

            if (!response.ok) throw new Error("Failed to fetch chat rooms");

            const result = await response.json();
            const chatRooms = result.data;

            const targetRoom = chatRooms.find(item => item.workerId === worker.id);

            if (!targetRoom) {
                toast.error("Không tìm thấy phòng chat");
                setChatRoomId(null);
                return;
            }

            setChatRoomId(targetRoom.id);
        } catch (error) {
            console.error("Error:", error);
            toast.error("Lỗi khi tải phòng chat");
            setChatRoomId(null);
        }
    }

    const handleSend = async () => {
        if (!input.trim() || !userChatRoom || !chatRoomId) return;
        const body = {
            receiveId: userChatRoom.id,
            senderId: jwtDecode(atob(auth)).id,
            chatRoomId: chatRoomId,
            message: input.trim(),
        };
        try {
            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_END_POINT}/chat/send`,
                {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${bearerTokenRef.current}`,
                    },
                }
            );

            if (response.ok) {
                setMessages(prevMessages => [...prevMessages, { text: input, isUserMessage: true }]);
                setInput('');
            } else {
                toast.error("Không thể gửi tin nhắn.");
            }

        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Lỗi khi gửi tin nhắn.");
        }
    }

    const handleConnectWebSocket = useCallback(() => {
        if (client && client.connected) return;

        const socket = new SockJS(`${import.meta.env.VITE_REACT_APP_END_POINT}/web-socket`);
        const newClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000, // Increased reconnect delay
            connectHeaders: {
                "Authorization": `Bearer ${bearerTokenRef.current}`,
            },
        });

        newClient.onConnect = () => {
            console.log('Connected to WebSocket');
            newClient.subscribe("/topic/messages", (message) => {
                try {
                    const parts = message.body.split("|");
                    const messageText = parts[0];
                    const senderId = parseInt(parts[1]);
                    const receiveId = parseInt(parts[2]);

                    if (
                        receiveId === parseInt(jwtDecode(atob(auth)).id) &&
                        senderId === userChatRoomRef.current?.id
                    ) {
                        setMessages(prev => [...prev, { text: messageText, isUserMessage: false }]);
                    }
                } catch (error) {
                    console.error("Error processing WebSocket message:", error);
                }
            });
        };

        newClient.onDisconnect = () => {
            console.log('Disconnected from WebSocket');
            toast.warn("Mất kết nối với máy chủ chat. Đang cố gắng kết nối lại...");
        };

        newClient.onStompError = (frame) => {
            console.error('Stomp error:', frame);
            toast.error(`Lỗi kết nối chat: ${frame.body}`);
        };

        newClient.activate();
        setClient(newClient);
    }, [auth]);

    const getALlWorkersChatRoom = useCallback(async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_END_POINT}/user/workers`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${bearerTokenRef.current}`,
                    },
                }
            );
            if (!response.ok) throw new Error("Failed to fetch workers");
            const data = await response.json();
            setWorkers(data);
        } catch (error) {
            console.error("Error fetching workers:", error);
            toast.error("Lỗi khi tải danh sách nhân viên.");
        }
    }, [auth]);

    const handleScroll = (e) => {
        const scrollTop = e.target;
        if (scrollTop === 0 && hasMoreMessages && !isFetchingMessages) {
            handleFetchChatMessages(page, sizeMes);
        }
    };

    return (
        <Row className='w-100'>
            <Col md={9} className='Chat'>
                <div className='manager-chat-header'>
                    <h6>
                        {userChatRoom ? userChatRoom.userName : ""}
                    </h6>
                </div>
                <div ref={messagesEndRef} className='manager-chat-messages' onScroll={handleScroll}>
                    {isFetchingMessages && page === 0 && <div className="loading-indicator"></div>}
                    {messages.length === 0 && userChatRoom && !isFetchingMessages && <div className="no-messages">no message yêt.</div>}
                    {messages.map((msg, index) => (
                        <div key={index} className={`manager-chat-message ${msg.isUserMessage ? 'manager-message' : 'manager-other-message'}`}>
                            <div>{msg.text}</div>
                        </div>
                    ))}
                    {isFetchingMessages && page > 0 && <div className="loading-indicator">.</div>}
                    {!hasMoreMessages && messages.length > 0 && <div className="end-of-messages"></div>}
                </div>
                <div className='manager-chat-input'>
                    <input
                        type="text"
                        value={input}
                        disabled={!userChatRoom}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSend();
                            }
                        }}
                        placeholder={userChatRoom ? "Nhập tin nhắn..." : "Vui lòng chọn nhân viên"}
                    />
                    <button onClick={handleSend} disabled={!userChatRoom}>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </div>
            </Col>
            <Col md={3}>
                <div className='manager-chat-list-users mt-5'>
                    <h5>Nhân viên</h5>
                    {workers.map((worker, index) => (
                        <button
                            key={index}
                            className={`user-item ${userChatRoom?.id === worker.id ? 'active' : ''}`}
                            onClick={() => handleSetUserChat(worker)}
                        >
                            <div className='user-avatar'>
                                <FontAwesomeIcon icon={faCircleUser} size="lg" />
                            </div>
                            <h6 className='user-name'>{worker.userName}</h6>
                        </button>
                    ))}
                </div>
            </Col>
        </Row >
    );
});

ManagerChat.displayName = 'ManagerChat';

export default ManagerChat;