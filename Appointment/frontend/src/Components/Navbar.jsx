import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path ? "text-yellow-300" : "";

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="bg-blue-700 text-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-2xl font-extrabold tracking-wide">MediConnect</Link>

                {/* Hamburger Menu Button (Mobile) */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden flex flex-col space-y-1.5 focus:outline-none"
                    aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-white transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 text-lg">
                    <Link to="/" className={`${isActive("/")} hover:text-yellow-200 transition font-bold`}>Home</Link>
                    <Link to="/about" className={`${isActive("/about")} hover:text-yellow-200 transition font-bold`}>About</Link>
                    <Link to="/contact" className={`${isActive("/contact")} hover:text-yellow-200 transition font-bold`}>Contact</Link>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-48' : 'max-h-0'}`}>
                <div className="px-4 py-3 space-y-3 bg-blue-800">
                    <Link
                        to="/"
                        className={`block ${isActive("/")} hover:text-yellow-200 transition`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className={`block ${isActive("/about")} hover:text-yellow-200 transition`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        About
                    </Link>
                    <Link
                        to="/contact"
                        className={`block ${isActive("/contact")} hover:text-yellow-200 transition`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
