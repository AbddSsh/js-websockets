import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

const Pulling = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const sendMessage = useCallback(async () => {
    await axios.post("http://localhost:5000/new-messages", {
      message: value,
      id: Date.now(),
    });
  }, [value]);
  useEffect(() => {
    subscribe();
  }, []);
  const subscribe = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/get-messages");
      setMessages((prev) => [data, ...prev]);
      await subscribe();
    } catch (error) {
      setTimeout(() => {
        subscribe();
      }, 500);
    }
  };
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

export default Pulling;
