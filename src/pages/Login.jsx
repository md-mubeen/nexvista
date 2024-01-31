import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const [rememberLogin, setRememberLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, logIn } = UserAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-black/80 p-8 rounded-lg max-w-[450px] w-full text-white">
        <h1 className="text-3xl mb-8">Login</h1>
        <form className="flex flex-col" onSubmit={handleFormSubmit}>
          <input
            className="p-3 mb-4 bg-gray-700 rounded"
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="p-3 mb-4 bg-gray-700 rounded"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-red-600 py-3 mb-6 rounded">Sign In</button>
          <div className="flex justify-between items-center text-gray-600">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={rememberLogin}
                onChange={() => setRememberLogin(!rememberLogin)}
              />
              Remember me
            </label>
            <Link to="/forgot-password">Need Help?</Link>
          </div>
        </form>
        <p className="mt-4 text-gray-400">
          <span className="mr-2">New to NexVista?</span>
          <Link to="/signup" className="underline font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
