import { Link } from "react-router-dom"

import { Menu, X } from "lucide-react"

import { useState } from "react"

function Navbar() {

    const [menuOpen, setMenuOpen] =
        useState(false)

    const user = JSON.parse(
        localStorage.getItem("user")
    )



    const handleLogout = () => {

        localStorage.removeItem("token")

        localStorage.removeItem("user")

        window.location.reload()
    }



    return (

        <nav className="bg-white shadow-md sticky top-0 z-50">

            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}

                <Link
                    to="/"
                    className="text-2xl font-bold text-blue-600"
                >
                    Job Portal
                </Link>



                {/* Desktop Menu */}

                <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">

                    <Link
                        to="/"
                        className="hover:text-blue-600 transition"
                    >
                        Home
                    </Link>

                    <Link
                        to="/jobs"
                        className="hover:text-blue-600 transition"
                    >
                        Jobs
                    </Link>



                    {/* Recruiter Links */}

                    {
                        user?.role === "recruiter" && (

                            <>

                                <Link
                                    to="/create-job"
                                    className="hover:text-blue-600 transition"
                                >
                                    Post Job
                                </Link>

                                <Link
                                    to="/my-posted-jobs"
                                    className="hover:text-blue-600 transition"
                                >
                                    My Posted Jobs
                                </Link>

                            </>
                        )
                    }



                    {/* Candidate Links */}

                    {
                        user?.role === "candidate" && (

                            <Link
                                to="/my-applications"
                                className="hover:text-blue-600 transition"
                            >
                                My Applications
                            </Link>
                        )
                    }



                    {/* Auth Section */}

                    {
                        user ? (

                            <>

                                <p className="text-blue-600 font-semibold">

                                    Hello, {user.name}

                                </p>

                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                >
                                    Logout
                                </button>

                            </>

                        ) : (

                            <>

                                <Link
                                    to="/login"
                                    className="hover:text-blue-600 transition"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Register
                                </Link>

                            </>
                        )
                    }

                </div>



                {/* Mobile Menu Button */}

                <button
                    className="md:hidden"
                    onClick={() =>
                        setMenuOpen(!menuOpen)
                    }
                >

                    {
                        menuOpen
                            ? <X size={28} />
                            : <Menu size={28} />
                    }

                </button>

            </div>



            {/* Mobile Menu */}

            {
                menuOpen && (

                    <div className="md:hidden flex flex-col gap-4 px-6 pb-6 text-gray-700 font-medium bg-white border-t">

                        <Link
                            to="/"
                            onClick={() =>
                                setMenuOpen(false)
                            }
                        >
                            Home
                        </Link>

                        <Link
                            to="/jobs"
                            onClick={() =>
                                setMenuOpen(false)
                            }
                        >
                            Jobs
                        </Link>



                        {/* Recruiter Mobile Links */}

                        {
                            user?.role === "recruiter" && (

                                <>

                                    <Link
                                        to="/create-job"
                                        onClick={() =>
                                            setMenuOpen(false)
                                        }
                                    >
                                        Post Job
                                    </Link>

                                    <Link
                                        to="/my-posted-jobs"
                                        onClick={() =>
                                            setMenuOpen(false)
                                        }
                                    >
                                        My Posted Jobs
                                    </Link>

                                </>
                            )
                        }



                        {/* Candidate Mobile Links */}

                        {
                            user?.role === "candidate" && (

                                <Link
                                    to="/my-applications"
                                    onClick={() =>
                                        setMenuOpen(false)
                                    }
                                >
                                    My Applications
                                </Link>
                            )
                        }



                        {/* Auth */}

                        {
                            user ? (

                                <>

                                    <p className="text-blue-600 font-semibold">

                                        Hello, {user.name}

                                    </p>

                                    <button
                                        onClick={handleLogout}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-left"
                                    >
                                        Logout
                                    </button>

                                </>

                            ) : (

                                <>

                                    <Link
                                        to="/login"
                                        onClick={() =>
                                            setMenuOpen(false)
                                        }
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        to="/register"
                                        onClick={() =>
                                            setMenuOpen(false)
                                        }
                                    >
                                        Register
                                    </Link>

                                </>
                            )
                        }

                    </div>
                )
            }

        </nav>
    )
}

export default Navbar