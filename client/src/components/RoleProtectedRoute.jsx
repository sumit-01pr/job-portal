import { Navigate } from "react-router-dom"

function RoleProtectedRoute({

    children,

    allowedRoles
}) {

    const token =
        localStorage.getItem("token")

    const user = JSON.parse(
        localStorage.getItem("user")
    )

    // Not logged in

    if (!token || !user) {

        return <Navigate to="/login" />
    }

    // Role not allowed

    if (
        !allowedRoles.includes(user.role)
    ) {

        return <Navigate to="/" />
    }

    return children
}

export default RoleProtectedRoute