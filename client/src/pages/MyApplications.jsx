import { useEffect, useState } from "react"

import MainLayout from "../layouts/MainLayout"

import api from "../services/api"

function MyApplications() {

    const [applications, setApplications] =
        useState([])

    const [loading, setLoading] =
        useState(true)

    const [error, setError] =
        useState("")

    const fetchApplications = async () => {

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

                "/jobs/my/applications",

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            )

            setApplications(response.data)

        } catch (error) {

            console.log(error)

            setError(
                "Failed to fetch applications"
            )

        } finally {

            setLoading(false)
        }
    }

    useEffect(() => {

        fetchApplications()

    }, [])

    return (

        <MainLayout>

            <div className="max-w-6xl mx-auto px-6 py-10">

                <div className="flex items-center justify-between mb-8">

                    <h1 className="text-4xl font-bold">

                        My Applications

                    </h1>

                    <p className="text-gray-500">

                        {applications.length} Applied Jobs

                    </p>

                </div>

                {/* Loading State */}

                {
                    loading && (

                        <div className="text-center py-20">

                            <p className="text-lg text-gray-500">

                                Loading applications...

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
                    applications.length === 0 && (

                        <div className="text-center py-20 bg-white rounded-2xl shadow-sm">

                            <h2 className="text-2xl font-semibold">

                                No Applications Found

                            </h2>

                            <p className="text-gray-500 mt-2">

                                Apply to jobs to see them here.

                            </p>

                        </div>
                    )
                }

                {/* Applications Grid */}

                {
                    !loading &&
                    !error &&
                    applications.length > 0 && (

                        <div className="grid md:grid-cols-2 gap-6">

                            {
                                applications.map(
                                    (application) => (

                                        <div
                                            key={application._id}
                                            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition"
                                        >

                                            <h2 className="text-2xl font-bold mb-2">

                                                {
                                                    application.job?.title
                                                }

                                            </h2>

                                            <p className="text-gray-600 mb-2">

                                                {
                                                    application.job?.company
                                                }

                                            </p>

                                            <p className="text-gray-500 mb-2">

                                                📍 {
                                                    application.job?.location
                                                }

                                            </p>

                                            <p className="text-blue-600 font-medium mb-4">

                                                💰 {
                                                    application.job?.salary
                                                }

                                            </p>

                                            <div className="border-t pt-4">

                                                <p className="text-green-600 font-medium">

                                                    Applied Successfully

                                                </p>

                                            </div>

                                        </div>
                                    )
                                )
                            }

                        </div>
                    )
                }

            </div>

        </MainLayout>
    )
}

export default MyApplications