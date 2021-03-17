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

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, "mess");

    return (
        <div>
            
        </div>
    );
}

export default Chat;