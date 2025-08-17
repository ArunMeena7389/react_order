import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("https://dev-hotels.onrender.com");

export default function ViewStream() {
  const imgRef = useRef();
  const [frame, setFrame] = useState(null);

  useEffect(() => {
    socket.on("video-stream", (data) => {
      setFrame(data);
    });

    return () => {
      socket.off("video-stream");
    };
  }, []);

  return (
    <div>
      <h2>Live View</h2>
      {frame ? (
        <img
          ref={imgRef}
          src={frame}
          alt="Live stream"
          style={{ width: "100%" }}
        />
      ) : (
        <p>Waiting for stream...</p>
      )}
    </div>
  );
}
