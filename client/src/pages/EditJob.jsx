import { useEffect, useState } from "react"

import { useNavigate, useParams } from "react-router-dom"

import MainLayout from "../layouts/MainLayout"

import api from "../services/api"

function EditJob() {

    const { id } = useParams()

    const navigate = useNavigate()

    const [loading, setLoading] =
        useState(true)

    const [updateLoading, setUpdateLoading] =
        useState(false)

    const [error, setError] =
        useState("")

    const [formData, setFormData] =
        useState({
            title: "",
            company: "",
            location: "",
            salary: "",
            description: ""
        })

    const handleChange = (e) => {

        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const fetchJob = async () => {

        try {

            setLoading(true)

            const response = await api.get(
                `/jobs/${id}`
            )

            const job = response.data

            setFormData({
                title: job.title,
                company: job.company,
                location: job.location,
                salary: job.salary,
                description: job.description
            })

        } catch (error) {

            console.log(error)

            setError(
                "Failed to fetch job"
            )

        } finally {

            setLoading(false)
        }
    }

    useEffect(() => {

        fetchJob()

    }, [id])

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            setUpdateLoading(true)

            const token =
                localStorage.getItem("token")

            await api.put(

                `/jobs/${id}`,

                formData,

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            )

            alert("Job updated successfully")

            navigate("/my-posted-jobs")

        } catch (error) {

            alert(

                error.response?.data?.message
                ||

                "Failed to update job"
            )

        } finally {

            setUpdateLoading(false)
        }
    }

    if (loading) {

        return (

            <MainLayout>

                <div className="text-center py-20">

                    Loading...

                </div>

            </MainLayout>
        )
    }

    if (error) {

        return (

            <MainLayout>

                <div className="text-center py-20 text-red-500">

                    {error}

                </div>

            </MainLayout>
        )
    }

    return (

        <MainLayout>

            <div className="max-w-3xl mx-auto px-6 py-10">

                <h1 className="text-4xl font-bold mb-8">

                    Edit Job

                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded-2xl p-6 space-y-5"
                >

                    <input
                        type="text"
                        name="title"
                        placeholder="Job Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg outline-none"
                        required
                    />

                    <input
                        type="text"
                        name="company"
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg outline-none"
                        required
                    />

                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg outline-none"
                        required
                    />

                    <input
                        type="text"
                        name="salary"
                        placeholder="Salary"
                        value={formData.salary}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg outline-none"
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Job Description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="5"
                        className="w-full border p-3 rounded-lg outline-none"
                        required
                    />

                    <button
                        type="submit"
                        disabled={updateLoading}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    >

                        {
                            updateLoading
                                ? "Updating..."
                                : "Update Job"
                        }

                    </button>

                </form>

            </div>

        </MainLayout>
    )
}

export default EditJob