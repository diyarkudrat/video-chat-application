const express = require("express");
const socket = require("socket.io");
const color = require("colors");
const { getCurrentUser, userJoin, userLeave } = require('./users');

const app = express();

require('dotenv').config();


const port = 8000;
const server = app.listen(port, console.log(`Server is running in ${process.env.NODE_ENV} on port ${process.env.PORT} `.yellow.bold));

const io = socket(server);

io.on("connection", (socket) => {
    // New user joins a room 
    socket.on("join", ({ username, room }) => {
        const newUser = userJoin(socket.id, username, room);

        socket.join(newUser.room);

        // Emit welcome message when user first joins room
        socket.emit("message", {
            userId: newUser.id,
            username: newUser.username,
            message: `Welcome ${newUser.username} to ${room}!`,
        });

        // Alert other users in room that a new user has joined
        socket.broadcast.to(newUser.room).emit("message", {
            userId: newUser.id,
            username: newUser.username,
            message: `${newUser.username} has joined the chat!`,
        });
    });

    // User sends chat message
    socket.on("chat", (message) => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit("message", {
            userId: user.id,
            username: user.username,
            message: message
        });
    });

    // User leaves room
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit("message", {
                userId: user.id,
                username: user.username,
                message: `${user.username} has left the chat`,
            });
        };
    });
});