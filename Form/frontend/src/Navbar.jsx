import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <div>
            <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
                <h1 className="text-xl font-bold tracking-wide">My Website</h1>
                <div className="flex gap-6">
                    <Link
                        to="/"
                        className="hover:text-blue-400 transition duration-200 font-medium"
                    >
                        Home
                    </Link>
                    <Link
                        to="/form"
                        className="hover:text-blue-400 transition duration-200 font-medium"
                    >
                        Form
                    </Link>
                </div>
            </nav>

        </div>
    )
}

export default Navbar