import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";

const Websocket = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");

  const connect = () => {
    socket.current = new WebSocket("ws://localhost:5000");
    socket.current.onopen = () => {
      const message = {
        event: "connection",
        username,
        id: Date.now(),
      };
      socket.current.send(JSON.stringify(message));
      console.log(`Подключение установлено пользователем ${username}`);
      setConnected(true);
    };
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };
    socket.current.onclose = () => {
      console.log("Socket закрыт");
    };
    socket.current.onerror = () => {
      console.log("Произошла ошибка");
    };
  };

  const sendMessage = async () => {
    const message = {
      username,
      message: value,
      id: Date.now(),
      event: "message",
    };
    socket.current.send(JSON.stringify(message));
    setValue("");
  };

  if (!connected) {
    return (
      <div className="center">
        <div className="form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Введите ваше имя"
          />
          <button onClick={connect}>Войти</button>
        </div>
      </div>
    );
  }
  return (
    <div className="center">
      <div>
        <div className="form">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            className="input"
          />
          <button onClick={sendMessage}>SEND</button>
        </div>
      </div>
      <div className="messages">
        {messages.map((mess) => (
          <div key={mess.id}>
            {mess.event === "connection" ? (
              <div className="connection-message">
                + Пользователь {mess.username} подключился
              </div>
            ) : (
              <div className="message">
                {mess.username}: {mess.message}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Websocket;
