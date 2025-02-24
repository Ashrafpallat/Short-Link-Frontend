import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice"; 
import { userLogout } from "../services/authServices";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      userLogout()
      dispatch(logout()); 
      navigate("/login"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning 🌅☀️";
    if (hours < 18) return "Good afternoon 🌤️☀️";
    return "Good evening 🌆🌙";
  };
  return (
    <div className="bg-[#111827] text-white p-5 flex justify-between items-center fixed w-full">
      <h1 className="text-2xl font-bold flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        {/* <img src="/favicon.png" alt="Short Link Logo" className="w-6 h-6" /> */}
        Short Link
      </h1>


      {user ? (
        <div className="flex items-center gap-4">
          <p className="text-gray-400">{getGreeting()} <span className="font-semibold">{user.name}</span></p>
          <button
            onClick={handleLogout}
            className="border px-3 py-1 rounded hover:bg-[#303643] transition cursor-pointer"
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
