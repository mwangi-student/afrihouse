import React from "react";
import AuthNavbar from "./AuthNav";
import Footer from "./Footer";

const Register = () => {
  return (
    <div>
      <div>
        <AuthNavbar/>
      </div>
      <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/your-image.jpg')" }}>
      <div className="bg-white bg-opacity-80 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input type="email" className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          </div>
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input type="tel" className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input type="password" className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          </div>
          <div className="flex items-center">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" required />
              <span className="text-gray-700">I agree to the Terms & Conditions</span>
            </label>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Register</button>
          <br/>
          <p className="text-center text-gray-800">Already have an account? <a href="./" className="text-blue-800">Login here</a></p>
        </form>
      </div>
    </div>
    <div>
      <Footer/>
    </div>
    </div>
    
  );
};

export default Register;
