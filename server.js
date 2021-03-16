const express = require('express');
const socket = require('socket.io');
const color = require('colors');

const app = express();


const port = process.env.PORT;
const server = app.listen(port, `Server is running in ${process.env.NODE_ENV} on ${port}`);

const io = socket(server);