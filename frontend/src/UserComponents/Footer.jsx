import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-0 px-8">
      <div className="container mx-auto flex flex-col items-center space-y-2">
        <h2 className="text-xl font-semibold">AfriHouse Realtors Co.</h2>
        <div className="w-full max-w-md">
          <p className="text-center mb-2">Subscribe to our Newsletter</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full p-2 rounded-l-lg focus:outline-none text-white-900" 
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600">Subscribe</button>
          </div>
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-blue-400">Home</Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
          </li>
          <li>
            <Link to="/houses" className="hover:text-blue-400">Houses</Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-blue-400">Cart</Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-blue-400">Profile</Link>
          </li>
        </ul>
        <p className="text-center text-sm">&copy; {new Date().getFullYear()} AfriHouse Realtors Co. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
