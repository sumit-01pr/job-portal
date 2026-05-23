import { useState } from "react"
import { useNavigate } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import api from "../services/api"

function CreateJob() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
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

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            const token = localStorage.getItem("token")

            await api.post(
                "/jobs",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            alert("Job created successfully")

            navigate("/jobs")

        } catch (error) {

            alert(error.response.data.message)
        }
    }

    return (

        <MainLayout>

            <div className="max-w-3xl mx-auto px-6 py-10">

                <h1 className="text-4xl font-bold mb-8">
                    Create Job
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
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Create Job
                    </button>

                </form>

            </div>

        </MainLayout>
    )
}

export default CreateJob