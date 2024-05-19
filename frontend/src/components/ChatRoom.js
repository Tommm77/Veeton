import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

function ChatRoom() {
    const { roomId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        fetchMessages().then(r => console.log('Messages fetched'));
    }, [roomId]);

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

    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Sending message with data:", {
                content: newMessage,
                room_id: roomId
            });
            const response = await fetch('/api/messages/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    room_id: roomId,
                    content: newMessage
                })
            });
            if (response.ok) {
                setNewMessage('');
                fetchMessages();
            } else {
                const errorData = await response.json();
                console.error('Failed to send message:', errorData);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Chat Room: {roomId}</h1>
            <form onSubmit={handleMessageSubmit} className="mb-4 flex items-center">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="border p-2 flex-grow mr-2 rounded"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Send</button>
            </form>
            <div className="border p-4 rounded bg-gray-100">
                {messages.map(msg => (
                    <div key={msg.id} className="mb-2 p-2 bg-white rounded shadow">
                        <p>{msg.content}</p>
                        <p className="text-gray-500 text-sm">{format(new Date(msg.timestamp), 'PPPpp')}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChatRoom;
