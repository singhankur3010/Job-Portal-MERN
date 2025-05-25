import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header'
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import UserDashboard from "./pages/UserDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path = "/" element = {<Header />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/company" element={<CompanyDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
