import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const { token, username, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-lg font-bold">
          Amazon Clone
        </Link>
        <div className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
          {token ? (
            <>
              <span>Hello, {username}</span>
              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
