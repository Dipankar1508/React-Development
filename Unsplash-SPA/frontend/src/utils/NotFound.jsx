import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-screen flex items-center justify-center
      bg-gradient-to-br from-gray-900 via-black to-gray-800
      text-white overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[120px] bottom-[-100px] right-[-100px]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        {/* 404 text */}
        <h1
          className="text-[90px] sm:text-[120px] font-extrabold tracking-tight
          bg-gradient-to-r from-white via-gray-300 to-gray-500
          bg-clip-text text-transparent"
        >
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-semibold mt-2">
          Lost in the gallery?
        </h2>

        {/* Description */}
        <p className="text-white/60 mt-4 text-sm sm:text-base">
          The page you’re looking for doesn’t exist or may have been moved.
          Let’s get you back to exploring beautiful images.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/")}
            sx={{
              background: "white",
              color: "black",
              fontWeight: 600,
              px: 4,
              "&:hover": {
                background: "#e5e5e5",
              },
            }}
          >
            Explore Home
          </Button>

          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate(-1)}
            sx={{
              color: "white",
              borderColor: "rgba(255,255,255,0.3)",
              px: 4,
            }}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
