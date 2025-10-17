import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from 'react-icons/fa';
import { useAuth } from "../context/AuthContext"; // ✅ use context

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { loginUser, signInWithGoogle } = useAuth(); // ✅ get functions from context

  // Handle Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      navigate("/");
      alert("Login Successful");
    } catch (error) {
      setError("Please provide valid email and password");
      console.error("Login Error:", error);
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
      alert("Google Login Successful");
    } catch (error) {
      setError("Google login failed");
      console.error("Google Login Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-lg p-8 w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Login
        </button>

        {/* Register link */}
        <div className="py-2 text-center">
          <p className="font-medium text-sm">
            If you don't have an account{" "}
            <Link to="/Register" className="text-blue-700 hover:text-blue-500">
              Register
            </Link>{" "}
            here
          </p>
        </div>

        {/* Google Button */}
        <div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            <FaGoogle /> Sign in with Google
          </button>
        </div>

        {/* Footer */}
        <p className="mt-5 text-center text-gray-500 text-xs">
          © 2025 All Rights Reserved
        </p>
      </form>
    </div>
  );
}

export default Login;
