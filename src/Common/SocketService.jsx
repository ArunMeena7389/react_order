import { io } from "socket.io-client";
import Config from "../Config";

let socket;

export const connectSocket = () => {
  if (!socket) {
    socket = io(Config.url);
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const added_new = (callback) => {
  if (!socket) return;
  socket.on("new_order", callback);
};

export const off_new = () => {
  if (!socket) return;
  socket.off("new_order");
};
