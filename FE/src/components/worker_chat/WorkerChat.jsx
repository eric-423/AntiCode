import { useEffect, useRef, useState } from 'react';
import './WorkerChat.css';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { toast } from 'react-toastify/unstyled';
import useLocalStorage from 'use-local-storage'
import { jwtDecode } from 'jwt-decode';
import LOCALSTORAGE from '../../constant/localStorage'
import { de } from 'date-fns/locale';

const WorkerChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [client, setClient] = useState();
    const [chatRoomId, setChatRoomId] = useState('');
    const [auth, setAuth] = useLocalStorage(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION, '');
    const [decodeId, setDecodeId] = useState(jwtDecode(atob(auth)).id);

    const chatRoomIdRef = useRef(chatRoomId);
    useEffect(() => {
        handleGetAllChatRoom();
        chatRoomIdRef.current = chatRoomId;
    }, [chatRoomId]);


    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (!client) {
            handleConnectWebSocket();
        }

        return () => {
            if (client && client.connected) {
                client.deactivate();
            }
        };
    }, []);

    const handleGetAllChatRoom = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_END_POINT}/chat-room`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) throw new Error("Failed to fetch chat rooms");

            const result = await response.json();
            const chatRooms = result.data;
            const targetRoom = chatRooms.find(item => item.workerId === decodeId);
            setChatRoomId(targetRoom.id);
            if (!targetRoom) {
                toast.error("Failed to fetch chat rooms");
                return;
            }

            setChatRoomId(targetRoom.id);

        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to fetch chat rooms");
        }
    }

    const handleConnectWebSocket = async () => {
        if (client && client.connected) return;

        const socket = new SockJS(`${import.meta.env.VITE_REACT_APP_END_POINT}/web-socket`);
        const newClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 2000,
        });
        newClient.onConnect = () => {
            console.log('Connected to WebSocket');
            newClient.subscribe("/topic/messages/", (message) => {
                console.log(message)
                const splitMessage = message.body.split('|')[1];
                const splitIdChatRoom = message.body.split('|')[2];
                if (splitMessage == decodeId && splitIdChatRoom == chatRoomIdRef.current) {
                    setMessages(prev => [...prev, {
                        text: message.body.split('|')[0],
                        isUserMessage: false,
                    }]);
                }

            });
        };
        newClient.activate();
        setClient(newClient);
    };

    const handleSend = async () => {

        if (!input.trim()) return;
        const body = {
            userId: 1,
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
                    },
                }
            );

            if (response) {
                setMessages((prevMessages) => [...prevMessages, {
                    text: input,
                    isUserMessage: true,
                    timestamp: new Date().toISOString()
                }]);
                setInput('');
            }

            if (!response.ok) throw new Error("Failed to sedn mess");

        } catch (error) {
            console.error("Error fetching workers:", error);
            toast.error("Error fetching worker ");
        }
    }



    return (
        <div className="chat-container">
            <div className="chat-bubble" onClick={toggleChat}>
                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 10H16M8 14H16M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21C9.9675 21 3.00463 21 3.00463 21C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12Z" stroke="#000000" />
                </svg>
            </div>
            {isOpen && (
                <div className="chat-window">
                    <div className='chat-header'>
                        Chat With Manager
                    </div>
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`chat-message ${msg.isUserMessage ? 'user-message' : 'other-message'}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    <div className="chat-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSend();
                                }
                            }}
                            placeholder="Type a message..."
                        />
                        <button
                            onClick={handleSend}
                        >
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.3009 13.6949L20.102 3.89742M10.5795 14.1355L12.8019 18.5804C13.339 19.6545 13.6075 20.1916 13.9458 20.3356C14.2394 20.4606 14.575 20.4379 14.8492 20.2747C15.1651 20.0866 15.3591 19.5183 15.7472 18.3818L19.9463 6.08434C20.2845 5.09409 20.4535 4.59896 20.3378 4.27142C20.2371 3.98648 20.013 3.76234 19.7281 3.66167C19.4005 3.54595 18.9054 3.71502 17.9151 4.05315L5.61763 8.2523C4.48114 8.64037 3.91289 8.83441 3.72478 9.15032C3.56153 9.42447 3.53891 9.76007 3.66389 10.0536C3.80791 10.3919 4.34498 10.6605 5.41912 11.1975L9.86397 13.42C10.041 13.5085 10.1295 13.5527 10.2061 13.6118C10.2742 13.6643 10.3352 13.7253 10.3876 13.7933C10.4468 13.87 10.491 13.9585 10.5795 14.1355Z" stroke="#000000" />
                            </svg>

                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkerChat;
