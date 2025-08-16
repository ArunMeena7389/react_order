  // Receive video chunks from sender (mobile)
import React, { useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io("https://dev-hotels.onrender.com"); // Node.js backend

export default function AddStream() {
  const videoRef = useRef();

  useEffect(() => {
    async function startStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        videoRef.current.srcObject = stream;

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        setInterval(() => {
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

          // Convert frame to base64
          const frame = canvas.toDataURL("image/webp", 0.3);
          socket.emit("video-stream", frame);
        }, 200); // send frame every 200ms
      } catch (err) {
        console.error("Camera error:", err);
      }
    }
    startStream();
  }, []);

  return (
    <div>
      <h2>📱 Mobile Camera Streaming</h2>
      <video ref={videoRef} autoPlay muted playsInline style={{ width: "100%" }} />
    </div>
  );
}
