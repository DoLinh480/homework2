// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
 // optional – only if you have global styles (e.g., Tailwind)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
