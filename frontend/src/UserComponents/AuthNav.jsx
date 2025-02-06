import React from "react";
import { Link } from "react-router-dom";

const AuthNavbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-8">
      <div className="container mx-auto flex items-center justify-between">
        <ul className="flex space-x-6 mx-auto">
          <li>
            <Link to="/" className="text-gray-700 hover:text-[#A68263]-900">Home</Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-700 hover:text-[#A68263]-900">About Us</Link>
          </li>
          <li>
            <Link to="/contact-us" className="text-gray-700 hover:text-[#A68263]-900">Contact Us</Link>
          </li>
        </ul>
        <div>
          <ul className="flex space-x-6 mx-auto">
            <li>
            <Link to="/login" className="text-gray-700 hover:text-[#A68263]-900">login</Link>
            </li>
            <li>
            <Link to="/register" className="text-gray-700 hover:text-[#A68263]-900">register</Link>
            </li>
          </ul> 
        </div>
        
      </div>
    </nav>
  );
};

export default AuthNavbar;
