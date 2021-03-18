import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { process } from '../store/action/index';
import { txtEncrypt, txtDecrypt } from '../utils/aes';
import './styles/chat.css';


function Chat({ socket, username, room }) {
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);
    const dispatch = useDispatch();

    const dispatchProcess = (encrypt, msg, cipher) => {
        dispatch(process(encrypt, msg, cipher));
    };

    useEffect(() => {
        socket.on("message", (data) => {
            const msg = txtDecrypt(data.message, data.username);
            dispatchProcess(false, msg, data.message);
            let temp = messages;
            temp.push({
                userId: data.userId,
                username: data.username,
                message: msg,
            });
            setMessages([...temp]);
        });
    }, [socket]);

    const sendData = () => {
        if (text !== '') {
            const msg = txtEncrypt(text);

            socket.emit("chat", msg);

            setText("");
        }
    };

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, "mess");

    return (
        <div className="chat">
            <div className="username">
                <h2>{username} in {room}</h2>
            </div>
            <div className="chat-message">
                {messages.map((data) => {
                    if (data.username === username) {
                        return (
                            <div className="message">
                                <p>{data.message}</p>
                                <p>{data.username}</p>
                            </div>
                        );
                    } else {
                        return (
                            <div className="message msg-right">
                                <p>{data.message}</p>
                                <p>{data.username}</p>
                            </div>
                        );
                    }
                })}
                <div ref={messagesEndRef} />
            </div>
            <div className="send">
                <input
                  placeholder="Enter Message"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyPress={(e) => {
                      if (e.key === "Enter") {
                          sendData();
                      }
                  }}
                />
                <button onClick={sendData}>Send</button>
            </div>
        </div>
    );
}

export default Chat;