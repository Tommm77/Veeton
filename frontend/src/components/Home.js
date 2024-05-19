import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function Home() {
    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();

    const handleCreate = async () => {
        const newRoomId = uuidv4();
        try {
            const response = await fetch('/api/chatrooms/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ room_id: newRoomId })
            });
            const data = await response.json();
            if (response.ok) {
                navigate(`/chat/${data.room_id}`);
            } else {
                console.error('Failed to create room:', data);
            }
        } catch (error) {
            console.error('Error creating room:', error);
        }
    };

    const handleJoin = async () => {
        if (roomId !== '') {
            try {
                const response = await fetch(`/api/chatrooms/${roomId}`);
                if (response.ok) {
                    navigate(`/chat/${roomId}`);
                } else {
                    alert('Chat room does not exist.');
                }
            } catch (error) {
                console.error('Error checking chat room:', error);
                alert('An error occurred while checking the chat room. Please try again.');
            }
        }
    };


    return (
        <div className="p-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Join or Create Chat Room</h1>
            <input
                type="text"
                placeholder="Enter Room ID"
                value={roomId}
                onChange={e => setRoomId(e.target.value)}
                className="border p-2 w-full mb-4 rounded"
            />
            <div className="flex justify-between">
                <button onClick={handleJoin} className="bg-blue-500 text-white p-2 rounded flex-grow mr-2">Join Room</button>
                <button onClick={handleCreate} className="bg-green-500 text-white p-2 rounded flex-grow">Create Room</button>
            </div>
        </div>
    );
}

export default Home;
