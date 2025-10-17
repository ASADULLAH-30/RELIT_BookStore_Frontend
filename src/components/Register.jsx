// src/pages/Register.jsx
import { useState } from "react";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from 'react-icons/fa';

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser, sighnWithGoogle  } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.password !== data.repassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      await registerUser(data.email, data.password);
      setMessage(""); // clear error
      alert("Registration successful!");
      navigate("/"); // redirect to homepage after signup
    } catch (error) {
      setMessage(error.message); // show Firebase error
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await sighnWithGoogle();
      navigate("/");
      alert("Google Login Successful");
    } catch (error) {
      setError("Google login failed");
      console.error("Google Login Error:", error);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl mb-4 text-center font-bold">Please Register</h2>

        {message && (
          <p className="text-red-500 text-xs text-center mb-2">{message}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="py-2">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
              type="email"
              id="email"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Username (optional, not used in Firebase Auth) */}
          <div className="py-2">
            <label className="block text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              {...register("username", { required: "Username is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
              type="text"
              id="username"
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs">{errors.username.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="py-2">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              {...register("password", { required: "Password is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
              type="password"
              id="password"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* Re-enter Password */}
          <div className="py-2">
            <label className="block text-sm font-bold mb-2" htmlFor="repassword">
              Confirm Password
            </label>
            <input
              {...register("repassword", {
                required: "Please confirm your password",
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
              type="password"
              id="repassword"
              placeholder="Re-enter your password"
            />
            {errors.repassword && (
              <p className="text-red-500 text-xs">
                {errors.repassword.message}
              </p>
            )}
          </div>

          {/* Register Button */}
          <div className="py-3">
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
             <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                      >
                        <FaGoogle /> Sign in with Google
                      </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
