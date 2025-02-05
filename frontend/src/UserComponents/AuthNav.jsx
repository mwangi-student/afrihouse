import React from "react";
import { Link } from "react-router-dom";

const AuthNavbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-8">
      <div className="container mx-auto flex items-center justify-between">
        <ul className="flex space-x-6 mx-auto">
          <li>
            <Link to="/home" className="text-gray-700 hover:text-blue-500">Home</Link>
          </li>
          <li>
            <Link to="/about-us" className="text-gray-700 hover:text-blue-500">About Us</Link>
          </li>
          <li>
            <Link to="/contact-us" className="text-gray-700 hover:text-blue-500">Contact Us</Link>
          </li>
        </ul>
        <div>
          <ul className="flex space-x-6 mx-auto">
            <li>
            <Link to="/" className="text-gray-700 hover:text-blue-500">login</Link>
            </li>
            <li>
            <Link to="/register" className="text-gray-700 hover:text-blue-500">register</Link>
            </li>
          </ul> 
        </div>
        
      </div>
    </nav>
  );
};

export default AuthNavbar;
