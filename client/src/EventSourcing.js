import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

const EventSourcing = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:5000/connect");
    eventSource.onmessage = function (event) {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };
    return () => {
      eventSource.close(); // Закрываем подключение при размонтировании компонента
      console.log("sub");
    };
  }, []);

  const sendMessage = useCallback(async () => {
    await axios.post("http://localhost:5000/new-messages", {
      message: value,
      id: Date.now(),
    });
  }, [value]);
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
          <div className="message" key={mess.id}>
            {mess?.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventSourcing;
