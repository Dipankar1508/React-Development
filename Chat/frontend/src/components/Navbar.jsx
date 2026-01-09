import { useState } from "react";
import logo from "/Huddle_Logo.png";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="w-full bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* LEFT: BRAND */}
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-transparent flex items-center justify-center overflow-hidden">
                        <img
                            src={logo}
                            alt="Huddle Logo"
                            className="w-14 h-14 object-contain mix-blend-multiply"
                        />
                    </div>

                    <div className="hidden sm:block">
                        <h1 className="text-lg font-bold text-slate-800">
                            Huddle
                        </h1>
                        <p className="text-xs text-slate-500 -mt-0.5">
                            Real-time chat platform
                        </p>
                    </div>
                </div>

                {/* DESKTOP NAV */}
                <nav className="hidden md:flex items-center gap-8">
                    {["Features", "Security", "About"].map((item) => (
                        <button
                            key={item}
                            className=" text-slate-600 hover:text-indigo-600 transition-colors"
                        >
                            {item}
                        </button>
                    ))}
                </nav>

                {/* MOBILE MENU BUTTON */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
                    aria-label="Toggle menu"
                >
                    <div className="space-y-1.5">
                        <span
                            className={`block w-6 h-0.5 bg-slate-700 transition-transform
                                ${open ? "rotate-45 translate-y-2" : ""}`}
                        />
                        <span
                            className={`block w-6 h-0.5 bg-slate-700 transition-opacity
                                ${open ? "opacity-0" : ""}`}
                        />
                        <span
                            className={`block w-6 h-0.5 bg-slate-700 transition-transform
                                ${open ? "-rotate-45 -translate-y-2" : ""}`}
                        />
                    </div>
                </button>
            </div>

            {/* MOBILE MENU */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300
                    ${open ? "max-h-60 border-t border-slate-200" : "max-h-0"}`}
            >
                <nav className="px-6 py-4 space-y-4 bg-white">
                    {["Features", "Security", "About"].map((item) => (
                        <button
                            key={item}
                            onClick={() => setOpen(false)}
                            className="block w-full text-left text-slate-700 hover:text-indigo-600 transition-colors"
                        >
                            {item}
                        </button>
                    ))}
                </nav>
            </div>
        </header>
    );
}
