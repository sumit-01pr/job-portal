import { useState } from "react"

import { Link, useNavigate } from "react-router-dom"

import MainLayout from "../layouts/MainLayout"

import api from "../services/api"

import Button from "../components/Button"

function Register() {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({

        name: "",

        email: "",

        password: "",
        role: "candidate"

    })

    const handleChange = (e) => {

        const { name, value } = e.target

        setFormData((prev) => ({

            ...prev,

            [name]: value

        }))
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (
            !formData.name ||
            !formData.email ||
            !formData.password
        ) {

            return alert(
                "Please fill all fields"
            )
        }

        try {

            setLoading(true)

            const response = await api.post(

                "/users/register",

                formData
            )

            console.log(response.data)

            alert(
                "Registration successful"
            )

            navigate("/login")

        } catch (error) {

            alert(

                error.response?.data?.message
                ||

                "Something went wrong"
            )

        } finally {

            setLoading(false)
        }
    }

    return (

        <MainLayout>

            <div className="min-h-screen flex items-center justify-center px-6">

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
                >

                    <h1 className="text-3xl font-bold text-center mb-8">

                        Register

                    </h1>

                    {/* Name */}

                    <div className="mb-5">

                        <label className="block mb-2 font-medium">

                            Name

                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    {/* Email */}

                    <div className="mb-5">

                        <label className="block mb-2 font-medium">

                            Email

                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    {/* Select role */}
                    <div className="mb-5">

                        <label className="block mb-2 font-medium">
                            Select Role
                        </label>

                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        >

                            <option value="candidate">
                                Candidate
                            </option>

                            <option value="recruiter">
                                Recruiter
                            </option>

                        </select>

                    </div>
                    {/* Password */}

                    <div className="mb-6">

                        <label className="block mb-2 font-medium">

                            Password

                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    {/* Submit Button */}

                    <Button
                        text={
                            loading
                                ? "Creating Account..."
                                : "Register"
                        }
                        type="submit"
                        disabled={loading}
                        className="w-full"
                    />

                    <p className="text-center mt-5 text-gray-600">

                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="text-blue-600 font-medium hover:underline"
                        >

                            Login

                        </Link>

                    </p>

                </form>

            </div>

        </MainLayout>
    )
}

export default Register