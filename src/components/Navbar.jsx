import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { UserAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const { isLightMode, toggleTheme } = useTheme();

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full p-4 z-50 flex items-center justify-between bg-black/50">
      <Link to="/">
        <h1 className="uppercase text-red-600 font-bold cursor-pointer text-2xl sm:text-4xl">
          NexVista
        </h1>
      </Link>
      <div className="flex items-center space-x-6">
      <Link to="/search">
        <FaSearch size={25} className="text-white" />
      </Link>
      <button className="text-white" onClick={toggleTheme}>
        {isLightMode ? <FaMoon size={25}/> : <FaSun size={25} />}
      </button>

      {user?.email ? (
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link to="/profile">
            <button className="capitalize text-white font-semibold">
              Profile
            </button>
          </Link>
          <button
            onClick={handleLogOut}
            className="capitalize bg-red-600 px-2 sm:px-4 py-2 rounded cursor-pointer text-white font-semibold"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <button className="capitalize text-white font-semibold">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="capitalize bg-red-600 px-6 py-2 rounded cursor-pointer text-white font-semibold">
              Signup
            </button>
          </Link>
        </div>
      )}
      </div>
    </div>
  );
}

export default Navbar;
