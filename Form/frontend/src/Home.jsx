import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [data, setdata] = useState([]);

    const url = `http://localhost:3000/form`;
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axios.get(`${url}/data`);
            setdata(response.data.data);
        }
        catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdate = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            // setdata(data.filter((person) => person._id !== id)); // for faster UI update
            await axios.delete(`${url}/data/${id}`)
            fetchData();
            navigate(`/`);
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-10">Users Data</h1>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-6xl">
                    {data.length > 0 ? (
                        data.map((person) => (
                            <div
                                key={person._id}
                                className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                            >
                                <h2 className="text-xl font-semibold text-blue-600 mb-2">
                                    {person.name}
                                </h2>
                                <p className="text-gray-700 mb-1">
                                    <span className="font-medium">Email:</span> {person.email}
                                </p>
                                <p className="text-gray-700 mb-1">
                                    <span className="font-medium">Age:</span> {person.age}
                                </p>
                                <p className="text-gray-700 mb-3">
                                    <span className="font-medium">Profession:</span>{" "}
                                    {person.profession}
                                </p>

                                <div className="flex  gap-3 mt-4">
                                    <button
                                        onClick={() => handleUpdate(person._id)}
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-md transition"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(person._id)}
                                        className="bg-pink-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-lg text-center w-full">
                            No records found
                        </p>
                    )}
                </div>

                {/* Floating Add User button */}
                <button
                    onClick={() => navigate("/form")}
                    className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white text-lg px-5 py-3 rounded-full shadow-lg transition"
                >
                    + Add User
                </button>
            </div>
        </>

    )
}
export default Home;
