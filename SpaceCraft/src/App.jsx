// src/App.jsx
import React from "react";
import EnhancedSpace from "./components/EnhancedSpace";
import "./index.css";

export default function App() {
  return (
    <>
      <EnhancedSpace initialCamera={[0, 0, 8]} />
    </>
  );
}
