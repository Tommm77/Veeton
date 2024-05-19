import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function Home() {
    const [roomId, setRoomId] = useState('');
    const [password, setPassword] = useState('');
    const [expirationDuration, setExpirationDuration] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [newRoomId, setNewRoomId] = useState('');
    const navigate = useNavigate();

    const handleCreate = () => {
        const newRoomId = uuidv4();
        setNewRoomId(newRoomId);
        setShowModal(true);
    };

    const createRoom = async () => {
        try {
            const response = await fetch('/api/chatrooms/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ room_id: newRoomId, password, expiration_duration: expirationDuration })
            });
            const data = await response.json();
            if (response.ok) {
                setShowModal(false);
                navigate(`/chat/${data.room_id}?password=${password}`);
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
                const response = await fetch(`/api/chatrooms/${roomId}?password=${password}`);
                if (response.ok) {
                    navigate(`/chat/${roomId}?password=${password}`);
                } else {
                    alert('Chat room does not exist or password is incorrect.');
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
            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border p-2 w-full mb-4 rounded"
            />
            <div className="flex justify-between">
                <button onClick={handleJoin} className="bg-blue-500 text-white p-2 rounded flex-grow mr-2">Join Room</button>
                <button onClick={handleCreate} className="bg-green-500 text-white p-2 rounded flex-grow">Create Room</button>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
                        <h2 className="text-xl font-bold mb-4">Enter Details for New Room</h2>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="border p-2 w-full mb-4 rounded"
                        />
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Expiration Duration (minutes)</label>
                            <input
                                type="number"
                                placeholder="Expiration Duration (minutes)"
                                value={expirationDuration}
                                onChange={e => setExpirationDuration(e.target.value)}
                                className="border p-2 w-full rounded"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-500 text-white p-2 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={createRoom}
                                className="bg-green-500 text-white p-2 rounded"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
