// App.js
import React from "react";
import Videosec from "./components/Videosec";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import "./App.css";

const App = () => {
  return (
    <div>
      <Videosec />
      <Navbar />
      <Content />
    </div>
  );
};

export default App;
