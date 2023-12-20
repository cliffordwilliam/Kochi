const express = require("express");

// production? do not use .env
if (process.env.NODE_ENV !== "production") require("dotenv").config();

// home router
const homeRouter = require("./routers/homeRouter");

// need the handleError
const Middleware = require("./middleware");

// to let anyone bypass
const cors = require("cors");

// create app + use cors
const app = express();
app.use(cors());

// socket.io
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// handle signals from frontend
io.on("connection", (socket) => {
  process.env.NODE_ENV !== "production" &&
    console.log(`User connected: ${socket.id}`);

  socket.on("join_room", (room) => {
    socket.join(room);
  });

  socket.on("send_message", (data) => {
    process.env.NODE_ENV !== "production" && console.log(data);
    const chats = data.chats;
    socket.to(data.room).emit("receive_message", chats);
  });
});

app.use(express.urlencoded({ extended: true })); // req.body
app.use(express.json()); // for reading jest req
app.use(homeRouter); // enter home router
app.use(Middleware.handleError); // dump all err here

// exports
module.exports = { app, server };
