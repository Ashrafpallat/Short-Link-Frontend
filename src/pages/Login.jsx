import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/userSlice";
import Header from "../components/Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true } // Required to send cookies
      );
      dispatch(loginSuccess({ name: data.user.name, email: data.user.email })); // Save user in Redux
      toast.success("Login successful!"); // You can replace this with a toast notification
      navigate("/"); // Redirect to dashboard after login
    } catch (err) {
      setError(err.response.data.message);      
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-[#0A192F]">
        <div className="bg-[#112240] p-10 rounded-lg shadow-lg w-[450px]"> {/* Increased width */}
          <h2 className="text-white text-3xl font-semibold text-center mb-6">Welcome Back</h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="text-gray-300 block mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded bg-[#0A192F] text-white border border-gray-600 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="text-gray-300 block mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-3 rounded bg-[#0A192F] text-white border border-gray-600 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
            >
              Login
            </button>
          </form>

          <p className="text-gray-300 text-center mt-5">
            Don't have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Login;
