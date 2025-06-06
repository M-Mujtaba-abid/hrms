
import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [emails, setEmails] = useState("");

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form reload

    if (emails === "mujtabaabid06@gmail.com" && username === "0077") {
      sessionStorage.setItem("login", "true");
      toast.success("Login Successful ✅");
      navigate("/");
    } else {
      toast.error("Wrong credentials ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">HRMS Login</h2>


        {/* ✅ Add onSubmit here */}
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaUser className="text-gray-400 mr-2" />
            <input
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaLock className="text-gray-400 mr-2" />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm text-blue-500 ml-2"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          © {new Date().getFullYear()} Metro HRMS. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
