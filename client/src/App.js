import "./App.css";
import React from "react";
import Pulling from "./Pulling";
import EventSourcing from "./EventSourcing";
import Websocket from "./websocket";

function App() {
  return (
    <div className="app">
      {/* <Pulling /> */}
      {/* <EventSourcing /> */}
      <Websocket />
    </div>
  );
}

export default App;
