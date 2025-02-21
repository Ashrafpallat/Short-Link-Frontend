import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../services/axiosInstance";
import toast from "react-hot-toast";

const Home = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState([
    { question: "What is Short Link?", answer: "Short Link is a URL shortening service.", open: false },
    { question: "Is it free to use?", answer: "Yes, Short Link is completely free.", open: false },
    { question: "How long does the short link last?", answer: "Short links last indefinitely unless deleted.", open: false },
  ]);
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Copied to clipboard!");
  };

  const toggleFaq = (index) => {
    setFaqs(faqs.map((faq, i) => (i === index ? { ...faq, open: !faq.open } : faq)));
  };
  const handleShortenUrl = async () => {
    try {
      if(!user){
        navigate('/login')
      }
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
      <div className="min-h-screen flex flex-col items-center bg-[#1F2937] text-white p-6">
      
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-6">
        Welcome to <span className="text-blue-400">Short Link</span>
      </h1>

      {/* URL Input Section */}
      <div className="w-full max-w-lg p-6 bg-[#1F2937] rounded-lg shadow-md border border-gray-600">
        <input
          type="text"
          placeholder="Enter original URL"
          className="border p-3 rounded-md w-full bg-[#374151] text-white outline-none"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <button
          onClick={handleShortenUrl}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full mt-4"
        >
          Shorten URL
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Shortened URL Display */}
        {shortUrl && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md flex justify-between items-center">
            <p>{shortUrl}</p>
            <button onClick={handleCopy} className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
              Copy
            </button>
          </div>
        )}
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-lg mt-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-[#374151] p-4 rounded-lg cursor-pointer">
              <div onClick={() => toggleFaq(index)} className="flex justify-between items-center">
                <h3 className="font-semibold">{faq.question}</h3>
                <span>{faq.open ? "▲" : "▼"}</span>
              </div>
              {faq.open && <p className="mt-2 text-gray-300">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Button */}
      <button
        onClick={() => navigate("/history")}
        className="mt-6 text-blue-400 hover:underline"
      >
        View URL History
      </button>
    </div>
    </div>
  );
};

export default Home;
