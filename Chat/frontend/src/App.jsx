import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Room from "./pages/Room";
import Chat from "./pages/Chat";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(!!localStorage.getItem("token"));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
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
