import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home.jsx";
import Form from "./Form.jsx";
import EditForm from "./EditForm.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const App = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-1 bg-gray-100 px-4 sm:px-8 py-8">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/form" element={<Form />} />
                    <Route path="/edit/:id" element={<EditForm />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
};

export default App;
