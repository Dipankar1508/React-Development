import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Room from "./pages/Room";
import Chat from "./pages/Chat";
import Features from "./components/Features";
import Security from "./components/Security";
import About from "./components/About";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(!!localStorage.getItem("token"));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/features" element={<Features />} />
        <Route path="/security" element={<Security />} />
        <Route path="/about" element={<About />} />

        <Route path="/" element={<Login setIsAuth={setIsAuth} />} />

        <Route
          path="/rooms"
          element={isAuth ? <Room setIsAuth={setIsAuth} /> : <Navigate to="/" />}
        />


        <Route
          path="/chat/:roomId"
          element={isAuth ? <Chat setIsAuth={setIsAuth} /> : <Navigate to="/" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
