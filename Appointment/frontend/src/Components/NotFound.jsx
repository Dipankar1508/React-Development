import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-6 py-10">
            <div className="text-center max-w-2xl">
                {/* 404 Number */}
                <h1 className="text-9xl font-extrabold text-indigo-700">
                    404
                </h1>

                {/* Error Message */}
                <h2 className="text-3xl font-bold text-gray-800 mt-4 mb-3">
                    Oops! Page Not Found
                </h2>

                <p className="text-gray-600 text-lg mb-8">
                    The page you're looking for doesn't exist or has been moved.
                    <br />
                    Let's get you back on track!
                </p>

                {/* Illustration */}
                <div className="mb-8">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
                        alt="Page not found"
                        className="w-40 mx-auto"
                    />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 justify-center">
                    <Link
                        to="/"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Go Home
                    </Link>
                    <Link
                        to="/contact"
                        className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-300 transition"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
