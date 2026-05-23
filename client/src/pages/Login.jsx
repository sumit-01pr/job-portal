import { useState } from "react"

import { Link, useNavigate } from "react-router-dom"

import MainLayout from "../layouts/MainLayout"

import api from "../services/api"

import Button from "../components/Button"

function Login() {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({

        email: "",

        password: ""

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

                "/users/login",

                formData
            )

            localStorage.setItem(

                "token",

                response.data.token
            )

            localStorage.setItem(

                "user",

                JSON.stringify(
                    response.data.user
                )
            )

            alert("Login successful")

            navigate("/")

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

                        Login

                    </h1>

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
                                ? "Logging in..."
                                : "Login"
                        }
                        type="submit"
                        disabled={loading}
                        className="w-full"
                    />

                    <p className="text-center mt-5 text-gray-600">

                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="text-blue-600 font-medium hover:underline"
                        >

                            Register

                        </Link>

                    </p>

                </form>

            </div>

        </MainLayout>
    )
}

export default Login