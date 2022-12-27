import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Cinemas from "./components/Cinemas";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Cinemas />} />
      </Routes>
    </div>
  );
}
