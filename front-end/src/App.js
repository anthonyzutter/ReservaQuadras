import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddQuadra from "./components/AddQuadra";
import Quadra from "./components/Quadra";
import QuadrasList from "./components/QuadrasList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/quadras" className="navbar-brand">
          Reservas Quadras
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/quadras"} className="nav-link">
              Quadras
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Nova Quadra
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<QuadrasList/>} />
          <Route path="/quadras" element={<QuadrasList/>} />
          <Route path="/add" element={<AddQuadra/>} />
          <Route path="/quadras/:id" element={<Quadra/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
