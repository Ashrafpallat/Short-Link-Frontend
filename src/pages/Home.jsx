import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../services/axiosInstance";

const Home = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleShortenUrl = async () => {
    try {
      setError(""); // Clear previous errors

      if (!originalUrl.trim()) {
        setError("Please enter a valid URL");
        return;
      }

      const response = await api.post("/url/shorten", {originalUrl});

      setShortUrl(response.data.shortUrl);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to shorten URL");
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col items-center bg-blue-950">
        <div className="w-full max-w-xl mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-4">URL Shortener</h2>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter original URL"
              className="border p-2 rounded-md w-full"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
            />
            <button
              onClick={handleShortenUrl}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Shorten URL
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {shortUrl && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md">
              <p>Short URL:
                <a
                  href={`http://localhost:5000/${shortUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline ml-2"
                >
                  {`http://localhost:5000/${shortUrl}`}
                </a>
              </p>
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => navigate("/history")}
              className="text-blue-500 hover:underline"
            >
              View URL History
            </button>

            {user && <p className="text-gray-600">Logged in as: <strong>{user.name}</strong></p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
