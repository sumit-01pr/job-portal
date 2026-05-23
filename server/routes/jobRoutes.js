import express from "express"

import protect from "../middlewares/authMiddleware.js"

import roleMiddleware from "../middlewares/roleMiddleware.js"

import {

    createJob,
    getJobs,
    getSingleJob,
    applyJob,
    getMyApplications,
    getMyPostedJobs,
    deleteJob,
    updateJob

} from "../controllers/jobController.js"

const router = express.Router()



// PUBLIC ROUTES

router.get("/", getJobs)

router.get("/:id", getSingleJob)



// CANDIDATE ROUTES

router.post(

    "/:id/apply",

    protect,

    roleMiddleware("candidate"),

    applyJob
)

router.get(

    "/my/applications",

    protect,

    roleMiddleware("candidate"),

    getMyApplications
)



// RECRUITER ROUTES

router.post(

    "/",

    protect,

    roleMiddleware("recruiter"),

    createJob
)

router.get(

    "/my/posted-jobs",

    protect,

    roleMiddleware("recruiter"),

    getMyPostedJobs
)

router.put(

    "/:id",

    protect,

    roleMiddleware("recruiter"),

    updateJob
)

router.delete(

    "/:id",

    protect,

    roleMiddleware("recruiter"),

    deleteJob
)

export default router