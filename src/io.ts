import { Socket } from "socket.io";
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket: Socket) => {
    socket.on('chat message', (msg: String) => {
      console.log('message: ' + msg);
    });
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

export default server;
