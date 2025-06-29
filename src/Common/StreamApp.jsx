import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function StreamApp() {
  const [role, setRole] = useState(null);
  const videoRef = useRef();
  const localRef = useRef();
  const peerRef = useRef();

  useEffect(() => {
    if (!role) return;

    socket.emit("join", role);

    if (role === "sender") {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(stream => {
        localRef.current.srcObject = stream;
        peerRef.current = new RTCPeerConnection();

        stream.getTracks().forEach(track => peerRef.current.addTrack(track, stream));

        peerRef.current.onicecandidate = (e) => {
          if (e.candidate) {
            socket.emit("ice-candidate", { candidate: e.candidate, to: peerRef.current.remoteId });
          }
        };

        socket.on("request-offer", async (receiverId) => {
          peerRef.current.remoteId = receiverId;

          const offer = await peerRef.current.createOffer();
          await peerRef.current.setLocalDescription(offer);
          socket.emit("offer", { offer, to: receiverId });
        });

        socket.on("answer", async ({ answer }) => {
          await peerRef.current.setRemoteDescription(new RTCSessionDescription(answer));
        });

        socket.on("ice-candidate", ({ candidate }) => {
          peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        });
      });
    }

    if (role === "receiver") {
      peerRef.current = new RTCPeerConnection();

      peerRef.current.ontrack = (event) => {
        videoRef.current.srcObject = event.streams[0];
      };

      peerRef.current.onicecandidate = (e) => {
        if (e.candidate) {
          socket.emit("ice-candidate", { candidate: e.candidate, to: peerRef.current.remoteId });
        }
      };

      socket.on("offer", async ({ offer, from }) => {
        peerRef.current.remoteId = from;
        await peerRef.current.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerRef.current.createAnswer();
        await peerRef.current.setLocalDescription(answer);
        socket.emit("answer", { answer, to: from });
      });

      socket.on("ice-candidate", ({ candidate }) => {
        peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
      });
    }
  }, [role]);

  return (
    <div style={{ padding: 20 }}>
      {!role && (
        <div>
          <button onClick={() => setRole("sender")}>Start Camera (Mobile)</button>
          <button onClick={() => setRole("receiver")}>View Stream (Viewer)</button>
        </div>
      )}

      {role === "sender" && <video ref={localRef} autoPlay muted style={{ width: '100%' }} />}
      {role === "receiver" && <video ref={videoRef} autoPlay controls style={{ width: '100%' }} />}
    </div>
  );
}

export default StreamApp;
