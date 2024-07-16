import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inbox from "./components/Inbox";
import Login from "./components/Login";
import Register from "./components/Register";
import WriteEmail from "./components/WriteEmail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
