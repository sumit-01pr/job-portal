import { Link } from "react-router-dom"

import Button from "./Button"

function JobCard({

    id,

    title,

    company,

    location,

    salary

}) {

    return (

        <div
            className="
                bg-white
                shadow-lg
                rounded-2xl
                p-6
                hover:shadow-2xl
                transition
                flex
                flex-col
                justify-between
            "
        >

            <div>

                <h3 className="text-2xl font-bold">

                    {title}

                </h3>

                <p className="text-gray-600 mt-2">

                    {company}

                </p>

                <div className="mt-4 space-y-2">

                    <p>

                        📍 {location}

                    </p>

                    <p>

                        💰 {salary}

                    </p>

                </div>

            </div>

            {/* Action Button */}

            <Link
                to={`/jobs/${id}`}
                className="mt-6"
            >

                <Button
                    text="View Details"
                    className="w-full"
                />

            </Link>

        </div>
    )
}

export default JobCard