import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./UserComponents/Login";
import Register from "./UserComponents/Register";
import Home from "./UserPages/Home";
import Houses from "./UserPages/Houses";
import Dashboard from "./UserPages/Dashboard";
import CartPage from "./UserPages/cart";
import Profile from "./UserPages/Profile";
import SingleHouse from "./UserPages/SingleHouse";
import YourSingleHouse from "./UserPages/YoursingleHouses";
import Ghome from "./GlobalPages/Ghome";
import { UserProvider } from "./context/UserContext";
import { HouseProvider } from "./context/HouseContext";
import About from "./GlobalPages/About";
import Contact from "./GlobalPages/Contact";

function App() {
  return (
<BrowserRouter>
  <UserProvider>
    <HouseProvider>
      <Routes>

                <Route path="/" element={<Ghome />} />

                <Route path="/login" element={<Login />} />
                <Route path="register" element={<Register />} />

                <Route path="/homepage" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/houses" element={<Houses />} />
                <Route path="/contact-us" element={<Contact />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/single-house/:id" element={<SingleHouse />} />
                <Route path="/single-house" element={<YourSingleHouse />} />

      </Routes>
    </HouseProvider>
  </UserProvider>
      
</BrowserRouter>
  );
}

export default App;
