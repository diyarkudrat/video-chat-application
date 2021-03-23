import React, { useEffect, useState, useRef } from 'react';
import Peer from 'simple-peer';


function Video({ userId, socket }) {
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
            setReceivingCall(true);
            setCaller(data.from);
            setCallerSignal(data.signal);
        })

    }, []);

    const callPeer = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        });

        peer.on('signal', (data) => {
            socket.emit('callUser', {
                userToCall: id,
                signalData: data,
                from: currUserId
            })
        })

        peer.on('stream', (stream) => {
            if (partnerVideo) {
                partnerVideo.current.srcObject = stream;
            }
        })

        socket.on('callAccepted', (signal) => {
            console.log('callAccepted', callAccepted);
            setCallAccepted(true);
            peer.signal(signal);
        })
    }

    const acceptCall = () => {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        });

        peer.on('signal', (data) => {
            socket.emit('acceptCall', {
                signal: data,
                to: caller
            })
        })

        peer.on('stream', (stream) => {
            debugger;
            partnerVideo.current.srcObject = stream;
        })

        peer.signal(callerSignal);
    }

    let UserVideo;
    if (stream) {
        UserVideo = (
            <video playsInline muted ref={userVideo} autoPlay />
        )
    }

    let PartnerVideo;
    if (callAccepted) {
        debugger;
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
          <div>
              {UserVideo}
              { callAccepted ? <video playsInline ref={partnerVideo} autoPlay /> : null }
          </div>  
          <div>
              {users.map(user => {
                  if (user.id === currUserId) {
                      return null;
                  }
                  return (
                      <button onClick={() => callPeer(user.id)}>Call {user.username}</button>
                  );
              })}
          </div>
          <div>
              {incomingCall}
          </div>
        </div>
    );
}

export default Video;