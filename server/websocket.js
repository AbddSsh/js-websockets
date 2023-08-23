const ws = require("ws");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
const wss = new ws.Server(
  {
    port: 5000,
  },
  () => console.log(`Server started on 5000`)
);

wss.on("connection", function connection(ws) {
  ws.on("message", function (message) {
    message = JSON.parse(message);
    switch (message.event) {
      case "message":
        broadcastMessage(message);
        break;
      case "connection":
        broadcastMessage(message);
        break;
    }
  });
});

const message = {
  event: "message/connection",
  id: 123,
  date: "21.01.2023",
  username: "abddssh",
  message: "Топ 1",
};

function broadcastMessage(message) {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
}
