import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        profession: "",
    })

    const { id } = useParams()
    const navigate = useNavigate()
    const url = `http://localhost:3000/form`;

    const fetchData = async (id) => {
        console.log(id)
        try {
            const response = await axios.get(`${url}/data/${id}`)
            setFormData(response.data)
            console.log(response.data.profession)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (id) fetchData(id);
    }, [id])

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.put(`${url}/data/${id}`, formData)
            console.log(response.data)
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="flex-1 flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Edit User</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="age" className="block text-gray-700 font-medium mb-1">Age</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            placeholder="Enter age"
                            value={formData.age}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="profession" className="block text-gray-700 font-medium mb-1">Profession</label>
                        <select
                            id="profession"
                            name="profession"
                            value={formData.profession}
                            onChange={handleChange}
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

                    <button
                        type="submit"
                        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>

    )
}

export default EditForm