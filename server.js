const express = require("express");
const socket = require("socket.io");
const color = require("colors");

const app = express();

require('dotenv').config();


const port = 8000;
const server = app.listen(
  port,
  console.log(
    `Server is running in ${process.env.NODE_ENV} on port ${process.env.PORT} `
      .yellow.bold
  )
);

const io = socket(server);

