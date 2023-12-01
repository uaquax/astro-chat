const express = require("express");
const path = require("path");
const http = require("http");
const formatMessage = require("./messages");
const Database = require("./database");

const app = express();
const PORT = 3000 || process.env.PORT;
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const db = new Database();
db.connect().catch(console.dir);

app.use(express.static(path.join(__dirname, "static")));

io.on("connection", (socket) => {
  socket.on("chatMsg", async (msg) => {
    console.log(msg);
    let user = await db.getUser(socket.id);
    io.emit("message", formatMessage(user.username, msg));
  });

  socket.on("disconnect", async () => {
    let user = await db.getUser(socket.id);

    if (user) {
      io.emit(
        "message",
        formatMessage("AstroChat", `${user.username} has left the room`)
      );
    }
  });

  socket.on("join", async (data) => {
    console.log(data);
    let user = await db.getUser(socket.id);
    console.log(user);

    if (!user) {
      let a = await db.addUser(socket.id, data.username);
      console.log(a);
    }
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
