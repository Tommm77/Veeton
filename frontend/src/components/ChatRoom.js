// src/components/ChatRoom.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ChatRoom() {
    const { roomId } = useParams();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`/api/messages?room_id=${roomId}`);
                const data = await response.json();
                if (response.ok) {
                    setMessages(data);
                } else {
                    console.error('Failed to fetch messages:', data);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        fetchMessages();
    }, [roomId]);

    return (
        <div className="p-8">
            <h1 className="text-xl">Chat Room: {roomId}</h1>
            <div>
                {messages.map(msg => (
                    <p key={msg.id}>{msg.content}</p>
                ))}
            </div>
        </div>
    );
}

export default ChatRoom;
