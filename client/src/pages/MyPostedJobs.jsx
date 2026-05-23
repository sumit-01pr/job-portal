import { useEffect, useState } from "react"

import MainLayout from "../layouts/MainLayout"

import api from "../services/api"
import { Link } from "react-router-dom"

function MyPostedJobs() {

    const [jobs, setJobs] =
        useState([])

    const [loading, setLoading] =
        useState(true)

    const [error, setError] =
        useState("")

    const [deleteLoading, setDeleteLoading] =
        useState("")

    const fetchJobs = async () => {

        try {

            setLoading(true)

            const token =
                localStorage.getItem("token")

            if (!token) {

                setError(
                    "Please login first"
                )

                return
            }

            const response = await api.get(

                "/jobs/my/posted-jobs",

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            )

            setJobs(response.data)

        } catch (error) {

            console.log(error)

            setError(
                "Failed to fetch posted jobs"
            )

        } finally {

            setLoading(false)
        }
    }

    useEffect(() => {

        fetchJobs()

    }, [])

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this job?"
            )

        if (!confirmDelete) return

        try {

            setDeleteLoading(id)

            const token =
                localStorage.getItem("token")

            await api.delete(

                `/jobs/${id}`,

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            )

            setJobs((prev) =>

                prev.filter(
                    (job) => job._id !== id
                )
            )

        } catch (error) {

            console.log(error)

            alert(

                error.response?.data?.message
                ||

                "Failed to delete job"
            )

        } finally {

            setDeleteLoading("")
        }
    }

    return (

        <MainLayout>

            <div className="max-w-6xl mx-auto px-6 py-10">

                <div className="flex items-center justify-between mb-8">

                    <h1 className="text-4xl font-bold">

                        My Posted Jobs

                    </h1>

                    <p className="text-gray-500">

                        {jobs.length} Jobs Posted

                    </p>

                </div>

                {/* Loading State */}

                {
                    loading && (

                        <div className="text-center py-20">

                            <p className="text-lg text-gray-500">

                                Loading jobs...

                            </p>

                        </div>
                    )
                }

                {/* Error State */}

                {
                    error && (

                        <div className="text-center py-20">

                            <p className="text-red-500 text-lg">

                                {error}

                            </p>

                        </div>
                    )
                }

                {/* Empty State */}

                {
                    !loading &&
                    !error &&
                    jobs.length === 0 && (

                        <div className="text-center py-20 bg-white rounded-2xl shadow-sm">

                            <h2 className="text-2xl font-semibold">

                                No Posted Jobs

                            </h2>

                            <p className="text-gray-500 mt-2">

                                Create jobs to see them here.

                            </p>

                        </div>
                    )
                }

                {/* Jobs Grid */}

                {
                    !loading &&
                    !error &&
                    jobs.length > 0 && (

                        <div className="grid md:grid-cols-2 gap-6">

                            {
                                jobs.map((job) => (

                                    <div
                                        key={job._id}
                                        className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition"
                                    >

                                        <h2 className="text-2xl font-bold mb-2">

                                            {job.title}

                                        </h2>

                                        <p className="text-gray-600 mb-2">

                                            {job.company}

                                        </p>

                                        <p className="text-gray-500 mb-2">

                                            📍 {job.location}

                                        </p>

                                        <p className="text-blue-600 font-medium mb-4">

                                            💰 {job.salary}

                                        </p>

                                        <div className="border-t pt-4 flex gap-4">

                                            <Link
                                                to={`/edit-job/${job._id}`}
                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                onClick={() =>
                                                    handleDelete(job._id)
                                                }
                                                disabled={
                                                    deleteLoading === job._id
                                                }
                                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                                            >

                                                {
                                                    deleteLoading === job._id
                                                        ? "Deleting..."
                                                        : "Delete"
                                                }

                                            </button>

                                        </div>

                                    </div>
                                ))
                            }

                        </div>
                    )
                }

            </div>

        </MainLayout>
    )
}

export default MyPostedJobs