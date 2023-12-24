import { Server } from "socket.io";
import { UserType } from "../models/UserType";
import { MessageType } from "../models/MessageType";
import { v4 as uuid } from "uuid";

export const chatSocket = (server: any) => {
  const username = "vikoran";
  console.log(`called`);

  const io = new Server(server, {
    path: `/chat`,
    cors: {
      origin: `http://localhost:3000`,
      methods: ["GET", "POST"],
      allowedHeaders: `content-type`,
      credentials: true,
    },
  });

  io.on(`connection`, (socket) => {
    
    socket.on(`user joined`, (user: UserType) => {
      socket.connected;
      io.emit(`user joined`, user);
    });

    console.log(socket.id);

    socket.on(`message`, (messageData: { message: MessageType; user: UserType }) => {
      const { message, user } = messageData;
      message.id = uuid();
      message.socketId = socket.id;
      message.timestamp = new Date().toISOString();
      message.username = `${user.firstName} ${user.lastName}`;

      io.emit(`message`, message);
    });

    socket.on("disconnect", () => {
      io.emit("user left", { socket_id: socket.id });
    });
  });

  return { io: io };
};
