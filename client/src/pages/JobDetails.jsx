import { useEffect, useState } from "react"

import { useParams } from "react-router-dom"

import MainLayout from "../layouts/MainLayout"

import Button from "../components/Button"

import api from "../services/api"

function JobDetails() {

    const { id } = useParams()

    const [job, setJob] = useState(null)

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState("")

    const [applyLoading, setApplyLoading] =
        useState(false)

    const fetchJob = async () => {

        try {

            setLoading(true)

            const response = await api.get(

                `/jobs/${id}`
            )

            setJob(response.data)

        } catch (error) {

            console.log(error)

            setError(
                "Failed to fetch job details"
            )

        } finally {

            setLoading(false)
        }
    }

    useEffect(() => {

        fetchJob()

    }, [id])

    const handleApply = async () => {

        try {

            setApplyLoading(true)

            const token =
                localStorage.getItem("token")

            if (!token) {

                return alert(
                    "Please login first"
                )
            }

            const response = await api.post(

                `/jobs/${id}/apply`,

                {},

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            )

            alert(response.data.message)

        } catch (error) {

            alert(

                error.response?.data?.message
                ||

                "Failed to apply"
            )

        } finally {

            setApplyLoading(false)
        }
    }

    /* Loading State */

    if (loading) {

        return (

            <MainLayout>

                <div className="text-center py-20">

                    <p className="text-lg text-gray-500">

                        Loading job details...

                    </p>

                </div>

            </MainLayout>
        )
    }

    /* Error State */

    if (error) {

        return (

            <MainLayout>

                <div className="text-center py-20">

                    <p className="text-red-500 text-lg">

                        {error}

                    </p>

                </div>

            </MainLayout>
        )
    }

    /* Not Found */

    if (!job) {

        return (

            <MainLayout>

                <div className="text-center py-20">

                    <p className="text-lg text-gray-500">

                        Job not found

                    </p>

                </div>

            </MainLayout>
        )
    }

    return (

        <MainLayout>

            <div className="max-w-4xl mx-auto px-6 py-10">

                <div className="bg-white shadow-md rounded-2xl p-8">

                    {/* Title */}

                    <h1 className="text-4xl font-bold mb-4">

                        {job.title}

                    </h1>

                    {/* Company */}

                    <p className="text-xl text-gray-600 mb-2">

                        {job.company}

                    </p>

                    {/* Location */}

                    <p className="text-gray-500 mb-2">

                        📍 {job.location}

                    </p>

                    {/* Salary */}

                    <p className="text-blue-600 font-medium mb-6">

                        💰 {job.salary}

                    </p>

                    {/* Description */}

                    <p className="text-gray-700 leading-7 mb-8">

                        {job.description}

                    </p>

                    {/* Recruiter */}

                    <div className="border-t pt-6">

                        <h2 className="text-xl font-semibold mb-3">

                            Recruiter Info

                        </h2>

                        <p className="text-gray-700">

                            {job.createdBy?.name}

                        </p>

                        <p className="text-gray-500">

                            {job.createdBy?.email}

                        </p>

                    </div>

                    {/* Apply Button */}

                    <div className="mt-8">

                        <Button
                            text={
                                applyLoading
                                    ? "Applying..."
                                    : "Apply Now"
                            }
                            onClick={handleApply}
                            disabled={applyLoading}
                        />

                    </div>

                </div>

            </div>

        </MainLayout>
    )
}

export default JobDetails