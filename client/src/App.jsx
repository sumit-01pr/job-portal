import {
  Routes,
  Route
} from "react-router-dom"

import Home from "./pages/Home"
import Jobs from "./pages/Jobs"
import JobDetails from "./pages/JobDetails"

import Login from "./pages/Login"
import Register from "./pages/Register"

import CreateJob from "./pages/CreateJob"
import EditJob from "./pages/EditJob"

import MyApplications from "./pages/MyApplications"
import MyPostedJobs from "./pages/MyPostedJobs"

import RoleProtectedRoute from "./components/RoleProtectedRoute"

function App() {

  return (

    <Routes>

      {/* Public Routes */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/jobs"
        element={<Jobs />}
      />

      <Route
        path="/jobs/:id"
        element={<JobDetails />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />



      {/* Recruiter Routes */}

      <Route
        path="/create-job"
        element={

          <RoleProtectedRoute
            allowedRoles={["recruiter"]}
          >

            <CreateJob />

          </RoleProtectedRoute>
        }
      />

      <Route
        path="/edit-job/:id"
        element={

          <RoleProtectedRoute
            allowedRoles={["recruiter"]}
          >

            <EditJob />

          </RoleProtectedRoute>
        }
      />

      <Route
        path="/my-posted-jobs"
        element={

          <RoleProtectedRoute
            allowedRoles={["recruiter"]}
          >

            <MyPostedJobs />

          </RoleProtectedRoute>
        }
      />



      {/* Candidate Routes */}

      <Route
        path="/my-applications"
        element={

          <RoleProtectedRoute
            allowedRoles={["candidate"]}
          >

            <MyApplications />

          </RoleProtectedRoute>
        }
      />

    </Routes>
  )
}

export default App