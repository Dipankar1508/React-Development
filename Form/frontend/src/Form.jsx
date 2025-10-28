import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Form = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        profession: "",
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const url = `http://localhost:3000/form`;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/input`, formData)
            setFormData({ name: '', email: '', age: '', profession: '' });
            setTimeout(() => navigate("/"), 1000);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex-1 flex justify-center items-center bg-gray-50 py-10">
            <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Form
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your name"
                            name="name"
                            onChange={handleChange}
                            value={formData.name}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Age */}
                    <div>
                        <label htmlFor="age" className="block text-gray-700 font-medium mb-1">
                            Age
                        </label>
                        <input
                            type="number"
                            id="age"
                            placeholder="Enter your age"
                            name="age"
                            onChange={handleChange}
                            value={formData.age}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Profession */}
                    <div>
                        <label htmlFor="profession" className="block text-gray-700 font-medium mb-1">
                            Profession
                        </label>
                        <select
                            name="profession"
                            id="profession"
                            onChange={handleChange}
                            value={formData.profession}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                        >
                            <option value="">Select Profession</option>
                            <option value="Student">Student</option>
                            <option value="Developer">Developer</option>
                            <option value="Engineer">Engineer</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
                    >
                        Submit
                    </button>

                    {/* Message */}
                    {/* {message && (
                        <p className="text-center mt-3 text-sm text-green-600 font-medium">
                            {message}
                        </p>
                    )} */}
                </form>
            </div>
        </div>
    );
};

export default Form;
