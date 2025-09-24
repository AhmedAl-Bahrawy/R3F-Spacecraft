// src/App.jsx
import React from "react";
import Space from "./components/Space";
import "./index.css"; // styles (see below)

export default function App() {
  return (
    <>
      <Space initialCamera={[0, 0, 8]} />
    </>
  );
}
