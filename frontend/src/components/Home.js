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
                body: JSON.stringify({ room_id: newRoomId})
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

    const handleJoin = () => {
        if (roomId !== '') {
            navigate(`/chat/${roomId}`);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-xl font-bold">Join or Create Chat Room</h1>
            <input
                type="text"
                placeholder="Enter Room ID"
                value={roomId}
                onChange={e => setRoomId(e.target.value)}
                className="border p-2 m-2"
            />
            <button onClick={handleJoin} className="bg-blue-500 text-white p-2">Join Room</button>
            <button onClick={handleCreate} className="bg-green-500 text-white p-2">Create Room</button>
        </div>
    );
}

export default Home;
