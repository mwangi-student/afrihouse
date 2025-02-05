import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./UserComponents/Login";
import Register from "./UserComponents/Register";
import Home from "./UserPages/Home";
import Houses from "./UserPages/Houses";
import Dashboard from "./UserPages/Dashboard";
import CartPage from "./UserPages/cart";
import Profile from "./UserPages/Profile";
import SingleHouse from "./UserPages/SingleHouse";
import YourSingleHouse from "./UserPages/YoursingleHouses";

function App() {
  return (
    <Router>
      <Routes>
      
         <Route path="/" element={<Login />} />
         <Route path="register" element={<Register />} />

         <Route path="/homepage" element={<Home />} />
         <Route path="/houses" element={<Houses />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/cart" element={<CartPage />} />
         <Route path="/profile" element={<Profile />} />
         <Route path="/single-house/:id" element={<SingleHouse />} />
         <Route path="/single-house/:id" element={<YourSingleHouse />} />

      </Routes>
    </Router>
  );
}

export default App;
