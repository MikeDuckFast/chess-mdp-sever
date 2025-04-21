// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const games = {};

io.on("connection", (socket) => {
  socket.on("join", (gameId) => {
    socket.join(gameId);
    if (!games[gameId]) {
      games[gameId] = [socket];
      socket.emit("color", "w");
    } else {
      games[gameId].push(socket);
      socket.emit("color", "b");
    }
  });

  socket.on("move", ({ gameId, move }) => {
    socket.to(gameId).emit("move", move);
  });
});

app.get("/", (req, res) => {
  res.send("Server chess online!");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
