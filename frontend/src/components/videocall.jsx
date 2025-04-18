import React, { useEffect, useRef, useState } from 'react';
import { Peer } from 'peerjs';
import io from 'socket.io-client';

const VideoCall = () => {
  const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const socket = useRef(null);
  const [roomId, setRoomId] = useState('');

  useEffect(() => {
    // Initialize socket.io
    socket.current = io('http://localhost:3000'); // Replace with your backend URL

    // Get a new room ID from the backend
    const getRoomId = async () => {
      const response = await fetch('http://localhost:3000/api/v1/newRoomId'); // Replace with your backend URL
      const data = await response.json();
      setRoomId(data.roomId);
    };
    getRoomId();

    const peer = new Peer();

    peer.on('open', (id) => {
      setPeerId(id);
    });

    peer.on('call', (call) => {
      var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      getUserMedia({ video: true, audio: true }, (mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();

        call.answer(mediaStream);

        call.on('stream', (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });
      }, (err) => {
        console.log('Failed to get local stream', err);
      });
    });

    peerInstance.current = peer;

    // Socket event listeners
    socket.current.on('connect', () => {
      console.log('Connected to socket.io server');
    });

    socket.current.on('user-joined', (userId) => {
      console.log('User joined', userId);
    });

  }, []);

  const call = (remotePeerId) => {
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    getUserMedia({ video: true, audio: true }, (mediaStream) => {
      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();

      const call = peerInstance.current.call(remotePeerId, mediaStream);

      call.on('stream', (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play();
      });
    }, (err) => {
      console.log('Failed to get local stream', err);
    });
  }

  const joinRoom = () => {
    if (socket.current) {
      socket.current.emit('join', roomId);
    }
  };

  return (
    <div>
      <h1>My ID: {peerId}</h1>
      <h1>Room ID: {roomId}</h1>
      <button onClick={joinRoom}>Join Room</button>
      <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
      <button onClick={() => call(remotePeerIdValue)}>Call</button>

      <h2>My Video</h2>
      <video style={{width: "300px", height: "300px"}} ref={currentUserVideoRef} />

      <h2>Remote Video</h2>
      <video style={{width: "300px", height: "300px"}} ref={remoteVideoRef} />
    </div>
  );
};

export default VideoCall;
