import React, { useState } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { shortenUrl } from "../services/urlServices";
import { Button, CircularProgress } from "@mui/material";

const Home = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false)
  const [faqs, setFaqs] = useState([
    { question: "Why I need to create an account?", answer: "By creating a account in Short Link you can get your URLs history.", open: false },
    { question: "What are the analytics I can see in the URL history?", answer: "You can see your URLs created date, original URL, Short URL and Click counts!.", open: false },
    { question: "Is it free to use?", answer: "Yes, Short Link is completely free.", open: false },
  ]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const handleCopy = () => {
    navigator.clipboard.writeText(`${BACKEND_URL}/${shortUrl}`);
    toast.success("Copied to clipboard!");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  const handleShortenUrl = async () => {
    try {
      setLoading(true)
      if (!user) {
        navigate('/login')
      }
      setError("");
      if (!originalUrl.trim()) {
        setError("Please enter a valid URL");
        return;
      }
      const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/i;
      if (!urlPattern.test(originalUrl.trim())) {
        setError("Please enter a valid URL starting with http:// or https://");
        return;
      }
      const response = await shortenUrl(originalUrl)
      setShortUrl(response.data.shortUrl);
      setLoading(false)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to shorten URL");
    } finally {
      setLoading(false)
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col items-center bg-[#1F2937] text-white p-6 pt-26">

        {/* Heading */}
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-2">
            Welcome to <span className="text-blue-400">Short Link</span>
          </h1>
          <p className="text-gray-300 text-lg py-7">
            Short Link is a simple and efficient URL shortener that helps you convert long, complex links into short and shareable ones.
          </p>
        </div>
        {/* URL Input Section */}
        <div className="w-full max-w-lg p-6 bg-[#1F2937] rounded-lg shadow-md border border-gray-600">
          <input
            type="text"
            placeholder="Enter original URL"
            className="border p-3 rounded-md w-full bg-[#374151] text-white outline-none"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
          <Button
            onClick={handleShortenUrl}
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading} 
            sx={{ padding: "10px", textTransform: "none", mt: 2 }} 
          >
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Shorten URL"}
          </Button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Shortened URL Display */}
          {shortUrl && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md flex justify-between items-center">
              <p>{`${BACKEND_URL}/${shortUrl}`}</p>
              <button onClick={handleCopy} className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 cursor-pointer">
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          )}
        </div>
        {/* Navigation Button */}
        <button
          onClick={() => navigate("/history")}
          className="mt-6 text-blue-400 hover:underline"
        >
          View URL History
        </button>
        {/* FAQ Section */}
        <div className="w-full max-w-5xl mt-8">
          <h2 className="text-2xl font-semibold text-center mb-4">Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <Accordion key={index} sx={{ backgroundColor: "#1F2937", color: "white" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}>
                <Typography className="font-semibold">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="text-gray-400">{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
