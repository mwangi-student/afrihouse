import React, { useContext, useState } from "react";
import AuthNavbar from "./AuthNav";
import Footer from "./Footer";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const { login } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Use navigate function

  // Handling form submission
  const handleSubmit = (er) => {
    er.preventDefault();

    // Call the login function (optional, if you want to track the login)
    login(email, password);

    // Redirect directly to the dashboard after login
    navigate("/dashboard"); // Redirect to the dashboard
  };

  return (
    <div>
      <div>
        <AuthNavbar />
      </div>
      <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/your-image.jpg')" }}>
        <div className="bg-white bg-opacity-80 p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                value={email}
                onChange={(er) => setEmail(er.target.value)}
                type="email"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                value={password}
                onChange={(er) => setPassword(er.target.value)}
                type="password"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-gray-700">Remember me</span>
              </label>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Login</button>
            <br />
            <p className="text-center text-gray-800">Don't have an account? <a href="./register" className="text-blue-800">Register here</a></p>
          </form>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
