import { useEffect, useState, memo, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './ManagerChat.css';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import useLocalStorage from 'use-local-storage'
import { jwtDecode } from 'jwt-decode';
import LOCALSTORAGE from '../../constant/localStorage'



const ManagerChat = memo(() => {
    const messagesEndRef = useRef(null);
    const [workers, setWorkers] = useState([]);
    const [client, setClient] = useState();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [chatRoomId, setChatRoomId] = useState(null);
    const [userChatRoom, setUserChatRoom] = useState("");
    const [auth, setAuth] = useLocalStorage(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION, '');
    const [sizeMes, setSizeMes] = useState(1000);

    const chatRoomIdRef = useRef(chatRoomId);

    const userChatRoomRef = useRef(userChatRoom);

    const [bearerToken, setBearerToken] = useState(atob(auth));

    useEffect(() => {
        chatRoomIdRef.current = chatRoomId;
        userChatRoomRef.current = userChatRoom;

    }, [chatRoomId, userChatRoom]);


    useEffect(() => {
        getALlWorkersChatRoom();
        if (!client) {
            handleConnectWebSocket();
        }
    }, [auth]);


    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [messages]);

    const handleFetchChatMessages = async () => {
        try {
            setMessages([]); // Xóa tin nhắn cũ khi chuyển chat room

            const params = new URLSearchParams({
                senderId: parseInt(jwtDecode(atob(auth)).id),
                receiveId: userChatRoomRef.current.id,
                page: 0,
                size: sizeMes
            });

            console.log(params.toString())
            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_END_POINT}/chat/read?${params}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${bearerToken}`,
                    },
                }
            );

            if (!response.ok) throw new Error("Failed to fetch chat messages");

            const data = await response.json();
            const messagesContent = data.content;

            const userId = jwtDecode(atob(auth)).id;

            const formattedMessages = messagesContent.map(msg => ({
                text: msg.message,
                isUserMessage: msg.senderId === userId,
            }));

            setMessages(formattedMessages);

        } catch (error) {
            console.error("Error fetching chat messages:", error);
            toast.error("Error fetching chat messages");
        }
    }

    useEffect(() => {
        if (chatRoomId) {
            setMessages([]);
            handleFetchChatMessages();
        }
    }, [chatRoomId]);

    const handleSetUserChat = async (worker) => {
        setUserChatRoom(worker);
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_END_POINT}/chat-room`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${bearerToken}`,
                },
            });

            if (!response.ok) throw new Error("Failed to fetch chat rooms");

            const result = await response.json();
            const chatRooms = result.data;

            const targetRoom = chatRooms.find(item => item.workerId === worker.id);

            if (!targetRoom) {
                toast.error("Không tìm thấy phòng chat");
                return;
            }
            setChatRoomId(targetRoom.id);
        } catch (error) {
            console.error("Error:", error);
            toast.error("Lỗi khi tải phòng chat");
        }
    }


    const handleSend = async () => {
        if (!input.trim()) return;
        const body = {
            receiveId: userChatRoom.id, // thí dụ gửi cho thằng 1
            senderId: jwtDecode(atob(auth)).id, // id của thằng gửi
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
                        "Authorization": `Bearer ${bearerToken}`,
                    },
                }
            );

            if (response) {
                setMessages((prevMessages) => [...prevMessages, {
                    text: input,
                    isUserMessage: true,
                }]);
                setInput('');
            }

            if (!response.ok) throw new Error("Failed to sedn mess");

        } catch (error) {
            console.error("Error fetching workers:", error);
            toast.error("Error fetching worker ");
        }
    }

    const handleConnectWebSocket = async () => {
        if (client && client.connected) return;

        const socket = new SockJS(`${import.meta.env.VITE_REACT_APP_END_POINT}/web-socket`);
        const newClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 2000,
            connectHeaders: {
                "Authorization": `Bearer ${bearerToken}`,
            }
        });

        newClient.onConnect = () => {
            console.log('Connected to WebSocket');
            newClient.subscribe("/topic/messages", (message) => {
                console.log(message)

                const messageText = message.body.split("|")[0];
                const senderId = message.body.split("|")[1];
                const receiveId = message.body.split("|")[2];
                console.log(message.body)

                if (
                    parseInt(receiveId) === parseInt(jwtDecode(atob(auth)).id)
                    &&
                    senderId == userChatRoomRef.current.id

                    // &&
                    // parseInt(roomId) === parseInt(chatRoomIdRef.current)
                ) {
                    setMessages(prev => [...prev, {
                        text: messageText,
                        isUserMessage: false,
                    }]);
                }
            });
        };


        newClient.activate();
        setClient(newClient);
    };

    const getALlWorkersChatRoom = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_END_POINT}/user/workers`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${bearerToken}`,
                    },
                }
            );
            if (!response.ok) throw new Error("Failed to fetch workers");
            const data = await response.json();
            setWorkers(data);
        } catch (error) {
            console.error("Error fetching workers:", error);
            toast.error("Error fetching worker ");
        }
    }

    return (
        <Row className='w-100'>
            <Col md={9} className='Chat'>
                <div>
                    <h6 className='manager-chat-room-name'>
                        {userChatRoom.userName}
                    </h6>
                </div>


                <div ref={messagesEndRef} className='manager-chat-messages'>
                    {messages.map((msg, index) => (
                        <div key={index} className={`manager-chat-message ${msg.isUserMessage ? 'manager-message' : 'manager-other-message'}`}>
                            <div>{msg.text}</div>
                        </div>
                    ))}
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
                        placeholder="Type a message..."
                    />
                    <button onClick={handleSend}>
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.3009 13.6949L20.102 3.89742M10.5795 14.1355L12.8019 18.5804C13.339 19.6545 13.6075 20.1916 13.9458 20.3356C14.2394 20.4606 14.575 20.4379 14.8492 20.2747C15.1651 20.0866 15.3591 19.5183 15.7472 18.3818L19.9463 6.08434C20.2845 5.09409 20.4535 4.59896 20.3378 4.27142C20.2371 3.98648 20.013 3.76234 19.7281 3.66167C19.4005 3.54595 18.9054 3.71502 17.9151 4.05315L5.61763 8.2523C4.48114 8.64037 3.91289 8.83441 3.72478 9.15032C3.56153 9.42447 3.53891 9.76007 3.66389 10.0536C3.80791 10.3919 4.34498 10.6605 5.41912 11.1975L9.86397 13.42C10.041 13.5085 10.1295 13.5527 10.2061 13.6118C10.2742 13.6643 10.3352 13.7253 10.3876 13.7933C10.4468 13.87 10.491 13.9585 10.5795 14.1355Z" stroke="#000000" strokeWidth="2" />
                        </svg>
                    </button>
                </div>

            </Col>
            <Col md={3}>
                <div
                    className='manager-chat-list-users mt-5'
                >
                    <h5>Workers</h5>
                    {
                        workers.map((worker, index) => (
                            <button key={index} className='' onClick={() => handleSetUserChat(worker)}>
                                <div>
                                    <img
                                        src={"https://www.w3schools.com/howto/img_avatar.png"}
                                        alt=""
                                        className='manager-chat-avatar'
                                    />
                                </div>
                                <h6 className='m-0'>{worker.userName}</h6>
                            </button>
                        ))
                    }
                </div>
            </Col>
        </Row >
    );
});

ManagerChat.displayName = 'ManagerChat';

export default ManagerChat;
