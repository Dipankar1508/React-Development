import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaTelegram, FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";


const Contact = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    }, []);
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white shadow-2xl rounded-2xl w-full max-w-5xl flex flex-col md:flex-row"
            >
                {/* Left Contact Info */}
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
                            <a href="#" className="hover:text-blue-300"><FaFacebook /></a>
                            <Link to="/admin/login" className="hover:text-yellow-300" title="Admin Login">
                                <FaUserShield />
                            </Link>

                            <a href="#" className="hover:text-pink-300"><FaInstagram /></a>
                            <a href="#" className="hover:text-sky-300"><FaTelegram /></a>
                        </div>
                    </div>
                </div>

                {/* Right Contact Form */}
                <div className="md:w-1/2 p-8">
                    <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Send a Message</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-gray-600 mb-1">Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1">Message</label>
                            <textarea
                                rows="4"
                                placeholder="Type your message..."
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
        </div>
    );
};

export default Contact;
