import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import NatureIcon from "@mui/icons-material/Park";
import TechIcon from "@mui/icons-material/Memory";
import CarIcon from "@mui/icons-material/DirectionsCar";
import ArchIcon from "@mui/icons-material/Apartment";
import OtherIcon from "@mui/icons-material/Category";
import LoginIcon from "@mui/icons-material/Login";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import { IconButton } from "@mui/material";

const option = ["nature", "tech", "car", "architecture", "others"];
const categories = [
  { name: "all", icon: <WallpaperIcon /> },
  { name: "nature", icon: <NatureIcon /> },
  { name: "tech", icon: <TechIcon /> },
  { name: "car", icon: <CarIcon /> },
  { name: "architecture", icon: <ArchIcon /> },
  { name: "others", icon: <OtherIcon /> },
];

export default function Sidebar({ active, setActive, open, setOpen }) {
  // const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div
      className={`fixed top-0 left-0 h-screen z-50 
            flex flex-col justify-between
            transition-all duration-200 ease-in-out
            ${open ? "w-44 sm:w-52" : "w-16"}
            bg-white/10 backdrop-blur-md border-r border-white/20`}
    >
      {/* Top section */}
      <div>
        {/* Menu toggle */}
        <div className="flex py-4 px-2">
          <IconButton onClick={() => setOpen(!open)}>
            <MenuIcon className="text-white" />
          </IconButton>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => setActive(cat.name)}
              className={`flex items-center gap-4 px-4 py-3 cursor-pointer 
                        hover:bg-white/20 transition
                        ${active === cat.name ? "bg-white/20" : ""}`}
            >
              {cat.icon}
              {open && (
                <span className="text-white capitalize">{cat.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer section */}
      <div className="mb-4">
        {/* Login button */}
        <div
          onClick={() => navigate("/admin")}
          className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-white/20 transition"
        >
          <LoginIcon />
          {open && <span className="text-white">Login</span>}
        </div>

        {open && (
          <>
            {/* Divider */}
            <div className="border-t border-white/10 mx-4 my-4"></div>

            {/* Footer content */}
            <div className="flex flex-col items-center text-center gap-3 px-4">
              {/* Logo */}
              <img
                src="/images/ViewPort_Logo.png"
                alt="Logo"
                className="h-10 object-contain"
              />

              {/* Description */}
              <p className="text-xs text-white/60 leading-relaxed">
                ViewPort is a free and open-source photo sharing platform.
              </p>

              {/* Copyright */}
              <span className="text-xs text-white/50">© 2026 ViewPort</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
