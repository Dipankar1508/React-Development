import React, { useEffect } from "react";
import { motion } from "framer-motion";

const About = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    }, []);
    return (
        <motion.div
            className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-6 py-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* Hero Section */}
            <div className="text-center max-w-3xl">
                <h1 className="text-4xl sm:text-5xl font-bold text-indigo-700 mb-4">
                    About Our Healthcare Platform
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                    Our mission is to simplify healthcare management for doctors and
                    patients. With our platform, booking appointments, managing schedules,
                    and maintaining records becomes seamless and secure.
                </p>
            </div>

            {/* Mission + Image Section */}
            <div className="mt-12 flex flex-col md:flex-row items-center gap-30 justify-center">
                <img
                    src="/aboutpage.png"
                    alt="Healthcare"
                    className="md:w-1/2 rounded-2xl shadow-lg"
                    style={{ width: "30%", height: "auto" }}
                />
                <div className="md:w-1/2 text-gray-700">
                    <h2 className="text-2xl font-semibold mb-3 text-indigo-600">
                        Empowering Digital Healthcare
                    </h2>
                    <p className="leading-relaxed mb-4">
                        We bridge the gap between doctors and patients by offering a secure,
                        <br />
                        user-friendly platform to manage appointments, consultations, and
                        follow-ups.
                    </p>
                    <ul className="list-disc list-inside text-gray-600">
                        <li>24/7 appointment booking</li>
                        <li>Verified doctors and specialists</li>
                        <li>Secure patient data handling</li>
                        <li>Real-time availability and updates</li>
                    </ul>
                </div>
            </div>

            {/* Stats Section */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                    { label: "Registered Doctors", value: "500+" },
                    { label: "Happy Patients", value: "10k+" },
                    { label: "Appointments Monthly", value: "8k+" },
                    { label: "Support Availability", value: "24/7" },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition"
                    >
                        <h3 className="text-2xl font-bold text-indigo-700">{item.value}</h3>
                        <p className="text-gray-600 text-sm mt-1">{item.label}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default About;
