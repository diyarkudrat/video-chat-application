import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/home.scss';

function Home({ socket }) {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');

    const sendData = () => {
        if (username !== '' && room !== '') {
            socket.emit("join", { username, room });
        } else {
            alert("Username and Room Name must be filled!")
        }
    };

    return (
        <div className="homepage">
            <h1>Video Chat Application</h1>

            <input
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="Enter Room Name"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
            <Link to={`/chat/${room}/${username}`}>
                <button onClick={sendData}>Join</button>
            </Link>
        </div>
    );
}

export default Home;