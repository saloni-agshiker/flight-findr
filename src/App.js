import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Trips from "./pages/Trips";

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/trips" element={<Trips />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
