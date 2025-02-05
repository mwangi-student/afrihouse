import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md py-4 px-8">
      <div className="container mx-auto flex items-center justify-between">
        <ul className="flex space-x-6 mx-auto">
          <li>
            <Link
              to="/homepage"
              className={`${
                location.pathname === "/homepage" ? "text-[#A68263] font-bold" : "text-gray-700 hover:text-blue-500"
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className={`${
                location.pathname === "/dashboard" ? "text-[#A68263] font-bold" : "text-gray-700 hover:text-blue-500"
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/houses"
              className={`${
                location.pathname === "/houses" ? "text-[#A68263] font-bold" : "text-gray-700 hover:text-blue-500"
              }`}
            >
              Your Houses
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className={`${
                location.pathname === "/cart" ? "text-[#A68263] font-bold" : "text-gray-700 hover:text-blue-500"
              }`}
            >
              Cart
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className={`${
                location.pathname === "/profile" ? "text-[#A68263] font-bold" : "text-gray-700 hover:text-blue-500"
              }`}
            >
              Profile
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link
              to="/"
              className={`${
                location.pathname === "/" ? "text-[#A68263] font-bold" : "text-gray-700 hover:text-blue-500"
              }`}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
