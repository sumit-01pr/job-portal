import { useMemo, useState } from "react"

import MainLayout from "../layouts/MainLayout"

import Button from "../components/Button"
import JobCard from "../components/JobCard"

const jobs = [

    {
        id: 1,
        title: "Frontend Developer",
        company: "Google",
        location: "Bangalore",
        salary: "12 LPA",
    },

    {
        id: 2,
        title: "React Developer",
        company: "Microsoft",
        location: "Hyderabad",
        salary: "15 LPA",
    },

    {
        id: 3,
        title: "Full Stack Developer",
        company: "Amazon",
        location: "Pune",
        salary: "18 LPA",
    }

]

function Home() {

    const [search, setSearch] = useState("")

    const filteredJobs = useMemo(() => {

        const searchText =
            search.toLowerCase()

        return jobs.filter((job) => (

            job.title
                .toLowerCase()
                .includes(searchText)

            ||

            job.company
                .toLowerCase()
                .includes(searchText)

            ||

            job.location
                .toLowerCase()
                .includes(searchText)

        ))

    }, [search])

    return (

        <MainLayout>

            {/* Hero Section */}

            <section className="bg-blue-50 py-20">

                <div className="max-w-7xl mx-auto px-6 text-center">

                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">

                        Find Your Dream Job Today

                    </h1>

                    <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">

                        Discover thousands of opportunities with top companies and grow your career faster.

                    </p>

                    {/* Search Box */}

                    <div className="mt-8 max-w-xl mx-auto">

                        <input
                            type="text"
                            placeholder="Search jobs by title, company, or location..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    {/* CTA */}

                    <div className="mt-8">

                        <Button text="Explore Jobs" />

                    </div>

                </div>

            </section>

            {/* Featured Jobs */}

            <section className="max-w-7xl mx-auto px-6 py-16">

                <div className="flex items-center justify-between mb-10">

                    <h2 className="text-3xl font-bold">

                        Featured Jobs

                    </h2>

                    <p className="text-gray-500">

                        {filteredJobs.length} Jobs Found

                    </p>

                </div>

                {
                    filteredJobs.length > 0 ? (

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                            {
                                filteredJobs.map((job) => (

                                    <JobCard
                                        key={job.id}
                                        title={job.title}
                                        company={job.company}
                                        location={job.location}
                                        salary={job.salary}
                                    />

                                ))
                            }

                        </div>

                    ) : (

                        <div className="text-center py-16 bg-white rounded-2xl shadow-sm">

                            <h3 className="text-2xl font-semibold text-gray-700">

                                No Jobs Found

                            </h3>

                            <p className="text-gray-500 mt-2">

                                Try searching with another keyword.

                            </p>

                        </div>

                    )
                }

            </section>

        </MainLayout>
    )
}

export default Home