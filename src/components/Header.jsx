import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from "../redux/userSlice"; // Import logout action

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });

      dispatch(logout()); // Clear Redux state
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="bg-[#0A192F] text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Short Link</h1>

      {user ? (
        <div className="flex items-center gap-4">
          <p className="text-gray-300">Logged in as <span className="font-semibold">{user.name}</span></p>
          <button 
            onClick={handleLogout} 
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <button 
          onClick={() => navigate("/login")} 
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Header;
