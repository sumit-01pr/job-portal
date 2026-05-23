import { useEffect, useState } from "react"

import MainLayout from "../layouts/MainLayout"

import JobCard from "../components/JobCard"

import api from "../services/api"

function Jobs() {

    const [jobs, setJobs] = useState([])

    const [loading, setLoading] =
        useState(true)

    const [search, setSearch] =
        useState("")

    const [error, setError] =
        useState("")

    const fetchJobs = async () => {

        try {

            setLoading(true)

            setError("")

            const response = await api.get(

                `/jobs?search=${search}`

            )

            setJobs(response.data)

        } catch (error) {

            console.log(error)

            setError(
                "Failed to fetch jobs"
            )

        } finally {

            setLoading(false)
        }
    }

    useEffect(() => {

        const delaySearch = setTimeout(() => {

            fetchJobs()

        }, 500)

        return () =>
            clearTimeout(delaySearch)

    }, [search])

    return (

        <MainLayout>

            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* Top Section */}

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                    <h1 className="text-4xl font-bold">

                        Available Jobs

                    </h1>

                    <p className="text-gray-500">

                        {jobs.length} Jobs Found

                    </p>

                </div>

                {/* Search Input */}

                <div className="mb-8">

                    <input
                        type="text"
                        placeholder="Search by title, company, location..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

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
                    !loading &&
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

                                No Jobs Found

                            </h2>

                            <p className="text-gray-500 mt-2">

                                Try another search keyword.

                            </p>

                        </div>
                    )
                }

                {/* Jobs Grid */}

                {
                    !loading &&
                    !error &&
                    jobs.length > 0 && (

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {
                                jobs.map((job) => (

                                    <JobCard
                                        key={job._id}
                                        id={job._id}
                                        title={job.title}
                                        company={job.company}
                                        location={job.location}
                                        salary={job.salary}
                                    />

                                ))
                            }

                        </div>
                    )
                }

            </div>

        </MainLayout>
    )
}

export default Jobs