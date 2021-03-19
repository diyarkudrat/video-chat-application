import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';


function Video({ userId, room, username, socket }) {
    const [currUserId, setCurrUserId] = useState('');
    const [users, setUsers] = useState([]);
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);

    const userVideo = useRef();
    const partnerVideo = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            setStream(stream);
            if (userVideo.current) {
                userVideo.current.srcObject = stream;
            }
        })

        setCurrUserId(userId);

        socket.on("allUsers", (users) => {
            setUsers(users);
        })

        socket.on('hey', (data) => {

        })

    }, [userId]);

    const callPeer = (id) => {

    }

    const acceptCall = () => {

    }

    let UserVideo;
    if (stream) {
        UserVideo = (
            <video playsInline muted ref={userVideo} autoPlay />
        )
    }

    let PartnerVideo;
    if (callAccepted) {
        PartnerVideo = (
            <video playsInline ref={partnerVideo} autoPlay />
        )
    }

    let incomingCall;
    if (receivingCall) {
        incomingCall = (
            <div>
                <h1>{caller} is calling you</h1>
                <button onClick={acceptCall}>Accept</button>
            </div>
        )
    }

    return (
        <div>
            
        </div>
    );
}

export default Video;