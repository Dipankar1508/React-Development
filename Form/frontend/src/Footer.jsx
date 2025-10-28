import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <footer className="bg-gray-900 text-white text-center py-4 text-sm">
                © {new Date().getFullYear()} My Website | All Rights Reserved | Dipankar Sarkar
            </footer>
        </div>
    )
}

export default Footer