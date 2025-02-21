import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import toast from "react-hot-toast";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/auth/signup",
                { name, email, password },
                { withCredentials: true } // Required to send cookies
            );

            toast.success(data.message || "Signup successful! Please log in."); 
            navigate("/login"); // Redirect to login after signup
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0A192F]">
            <div className="bg-[#112240] p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-white text-2xl font-semibold text-center mb-4">Sign Up</h2>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleSignup} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full p-2 rounded bg-[#0A192F] text-white border border-gray-600 focus:outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 rounded bg-[#0A192F] text-white border border-gray-600 focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 rounded bg-[#0A192F] text-white border border-gray-600 focus:outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full p-2 bg-green-600 hover:bg-green-700 text-white rounded transition"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-gray-300 text-center mt-4">
                    Already have an account?{" "}
                    <span
                        className="text-blue-400 cursor-pointer hover:underline"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
