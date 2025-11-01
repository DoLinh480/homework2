// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ShoppingListDetail from "./routes/ShoppingListDetail";

export default function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-100 flex gap-4">
        <Link to="/">🏠 Domů</Link>
        <Link to="/list">🛒 Nákupní seznam</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<ShoppingListDetail />} />
      </Routes>
    </Router>
  );
}

// Simple placeholder home component
function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Vítejte v aplikaci Nákupní seznam</h1>
      <p>Klikněte na "Nákupní seznam" pro zobrazení detailu.</p>
    </div>
  );
}

