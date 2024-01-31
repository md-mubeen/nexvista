import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
  const [rememberLogin, setRememberLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { signUp } = UserAuth();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" h-screen flex items-center justify-center text-white">
      <div className="bg-black/80 p-8 rounded-lg max-w-[450px] w-full">
        <h1 className="text-3xl mb-8 ">Sign Up</h1>
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
          <button className="bg-red-600 py-3 mb-6 rounded">Sign Up</button>
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
          <p className="mt-4 text-gray-400">
            <span className="mr-2">Already subscribed to Netflix?</span>
            <Link to="/login" className="underline font-semibold">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
