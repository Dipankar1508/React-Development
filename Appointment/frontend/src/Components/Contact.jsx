import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    FaPhone,
    FaEnvelope,
    FaFacebook,
    FaInstagram,
    FaTelegram,
    FaUserShield,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "./Toast";

const Contact = () => {
    const url = `http://localhost:7000/api/feedback`;
    const [formdata, setFormdata] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [feedbacks, setFeedbacks] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        loadFeedbacks(1);
    }, []);

    // Fetch all feedbacks with pagination
    const loadFeedbacks = async (pageNum = 1) => {
        try {
            const res = await axios.get(`${url}/watchfeedback?page=${pageNum}&limit=6`);
            setFeedbacks(res.data.feedback || []);
            setPages(res.data.pages || 1);
            setPage(res.data.page || 1);
        } catch (err) {
            console.error("Error fetching feedback:", err);
        }
    };

    const handleValue = (e) => {
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${url}/postfeedback`, formdata);
            setFormdata({ name: "", email: "", message: "" });
            toast(data.message);
            loadFeedbacks(page); // reload current page
        } catch (error) {
            console.error("Feedback submission failed:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center justify-start px-6 py-12 space-y-10">
            {/* Contact Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white shadow-2xl rounded-2xl w-full max-w-5xl flex flex-col md:flex-row"
            >
                {/* Left Info */}
                <div className="md:w-1/2 bg-indigo-600 text-white p-8 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
                    <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                    <p className="mb-6 text-indigo-100">
                        Have questions or feedback? Reach out to us via phone, email, or our social platforms.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <FaPhone /> <span>+91 98765 43210</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaEnvelope /> <span>support@mediconnectpro.com</span>
                        </div>

                        <div className="flex items-center gap-8 mt-6 text-3xl">
                            <a href="#" className="hover:text-blue-300">
                                <FaFacebook />
                            </a>
                            <Link to="/admin/login" className="hover:text-green-400" title="Admin Login">
                                <FaUserShield />
                            </Link>
                            <a href="#" className="hover:text-orange-400">
                                <FaInstagram />
                            </a>
                            <a href="#" className="hover:text-sky-300">
                                <FaTelegram />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Form */}
                <div className="md:w-1/2 p-8">
                    <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Send a Message</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-600 mb-1">Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                name="name"
                                value={formdata.name}
                                onChange={handleValue}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                name="email"
                                value={formdata.email}
                                onChange={handleValue}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1">Message</label>
                            <textarea
                                rows="4"
                                placeholder="Type your message..."
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                name="message"
                                value={formdata.message}
                                onChange={handleValue}
                                required
                            ></textarea>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                        >
                            Send Message
                        </motion.button>
                    </form>
                </div>
            </motion.div>

            {/* Feedback Section */}
            <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-8 mt-4">
                <h2 className="text-2xl font-semibold text-indigo-700 mb-4">What Others Say</h2>
                {feedbacks.length > 0 ? (
                    <>
                        <div className="grid md:grid-cols-2 gap-6">
                            {feedbacks.map((fb) => (
                                <motion.div
                                    key={fb._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="border border-gray-200 rounded-xl p-4 bg-indigo-50 hover:bg-indigo-100 transition"
                                >
                                    <p className="text-gray-800 italic">"{fb.message}"</p>
                                    <p className="mt-3 text-sm text-gray-500">— {fb.name}</p>
                                    <p className="text-xs text-gray-400">
                                        {new Date(fb.createdAt).toLocaleDateString()}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-center mt-6 gap-4">
                            <button
                                disabled={page <= 1}
                                onClick={() => loadFeedbacks(page - 1)}
                                className={`px-4 py-2 rounded-lg font-semibold transition ${page <= 1
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-indigo-500 text-white hover:bg-indigo-600"
                                    }`}
                            >
                                Previous
                            </button>
                            <span className="text-gray-600 font-medium mt-2">
                                Page {page} of {pages}
                            </span>
                            <button
                                disabled={page >= pages}
                                onClick={() => loadFeedbacks(page + 1)}
                                className={`px-4 py-2 rounded-lg font-semibold transition ${page >= pages
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-indigo-500 text-white hover:bg-indigo-600"
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="text-gray-500">No feedback yet. Be the first to send one!</p>
                )}
            </div>
        </div>
    );
};

export default Contact;
