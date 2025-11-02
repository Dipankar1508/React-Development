import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Landing = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    }, []);
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Hero Section */}
            <section className="flex flex-col md:flex-row items-center justify-between px-10 py-16 max-w-7xl mx-auto">
                <motion.div
                    className="text-center md:text-left md:w-1/2"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl font-extrabold text-blue-800 leading-tight">
                        Connecting Doctors and Patients Seamlessly
                    </h1>
                    <p className="mt-5 text-gray-700 text-lg">
                        MediConnect helps patients easily schedule appointments with trusted doctors,
                        while doctors efficiently manage consultations and availability.
                        Experience modern healthcare at your fingertips.
                    </p>

                    <motion.div
                        className="mt-8 space-x-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <Link
                            to="/login"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="bg-yellow-400 text-black px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition"
                        >
                            Register
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="mt-10 md:mt-0 md:w-1/2 flex justify-center"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <img
                        src="landingpage.png"
                        alt="Doctor and patient"
                        className="rounded-xl shadow-2xl w-3/4"
                    />
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-16">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <motion.h2
                        className="text-3xl font-bold text-blue-800 mb-10"
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Why Choose MediConnect?
                    </motion.h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        <motion.div
                            className="bg-blue-100 p-8 rounded-xl shadow-md hover:shadow-lg transition"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/4320/4320371.png"
                                alt="Online Booking"
                                className="w-16 mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2 text-blue-700">Easy Appointment Booking</h3>
                            <p className="text-gray-600">
                                Schedule appointments with just a few clicks. Say goodbye to long queues.
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-blue-100 p-8 rounded-xl shadow-md hover:shadow-lg transition"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/2966/2966484.png"
                                alt="Verified Doctors"
                                className="w-16 mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2 text-blue-700">Verified Specialists</h3>
                            <p className="text-gray-600">
                                All doctors are certified professionals with verified credentials.
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-blue-100 p-8 rounded-xl shadow-md hover:shadow-lg transition"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/4319/4319193.png"
                                alt="24x7 Support"
                                className="w-16 mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2 text-blue-700">24x7 Support</h3>
                            <p className="text-gray-600">
                                Our team is available round the clock to assist patients and doctors.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <motion.section
                className="bg-blue-700 text-white py-10 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <h3 className="text-2xl font-bold mb-3">Get Started with MediConnect Today</h3>
                <p className="mb-6 text-gray-200">
                    Join thousands of patients and doctors using MediConnect to make healthcare easy.
                </p>
                <div className="space-x-4">
                    <Link to="/login" className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
                        Login
                    </Link>
                    <Link to="/register" className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300">
                        Register
                    </Link>
                </div>
            </motion.section>
        </div>
    );
};

export default Landing;
