import Job from "../models/Job.js"
import Application from "../models/Application.js"



// CREATE JOB

export const createJob = async (req, res) => {

    try {

        const {
            title,
            company,
            location,
            salary,
            description
        } = req.body

        // Validation

        if (
            !title ||
            !company ||
            !location ||
            !salary ||
            !description
        ) {

            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const job = await Job.create({

            title,
            company,
            location,
            salary,
            description,

            createdBy: req.user._id
        })

        res.status(201).json(job)

    } catch (error) {

        res.status(500).json({
            message: error.message
        })
    }
}



// GET ALL JOBS

export const getJobs = async (req, res) => {

    try {

        const search = req.query.search || ""

        const query = {

            $or: [

                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },

                {
                    company: {
                        $regex: search,
                        $options: "i"
                    }
                },

                {
                    location: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ]
        }

        const jobs = await Job.find(query)

            .populate(
                "createdBy",
                "name email"
            )

            .sort({
                createdAt: -1
            })

        res.status(200).json(jobs)

    } catch (error) {

        res.status(500).json({
            message: error.message
        })
    }
}



// GET SINGLE JOB

export const getSingleJob = async (req, res) => {

    try {

        const job = await Job.findById(
            req.params.id
        ).populate(
            "createdBy",
            "name email"
        )

        if (!job) {

            return res.status(404).json({
                message: "Job not found"
            })
        }

        res.status(200).json(job)

    } catch (error) {

        res.status(500).json({
            message: error.message
        })
    }
}



// APPLY JOB

export const applyJob = async (req, res) => {

    try {

        const jobId = req.params.id

        const userId = req.user._id

        // Check job exists

        const job = await Job.findById(jobId)

        if (!job) {

            return res.status(404).json({
                message: "Job not found"
            })
        }

        // Check already applied

        const existingApplication =
            await Application.findOne({

                user: userId,
                job: jobId
            })

        if (existingApplication) {

            return res.status(400).json({
                message: "Already applied"
            })
        }

        const application =
            await Application.create({

                user: userId,
                job: jobId
            })

        res.status(201).json({

            message: "Applied successfully",

            application
        })

    } catch (error) {

        res.status(500).json({
            message: error.message
        })
    }
}



// GET MY APPLICATIONS

export const getMyApplications = async (req, res) => {

    try {

        const applications =
            await Application.find({

                user: req.user._id

            })

                .populate("job")

                .sort({
                    createdAt: -1
                })

        // Remove deleted jobs applications

        const validApplications =
            applications.filter(
                (application) =>
                    application.job !== null
            )

        res.status(200).json(validApplications)

    } catch (error) {

        res.status(500).json({
            message: error.message
        })
    }
}



// GET MY POSTED JOBS

export const getMyPostedJobs = async (req, res) => {

    try {

        const jobs = await Job.find({

            createdBy: req.user._id

        }).sort({

            createdAt: -1
        })

        res.status(200).json(jobs)

    } catch (error) {

        res.status(500).json({
            message: error.message
        })
    }
}



// DELETE JOB

export const deleteJob = async (req, res) => {

    try {

        const job = await Job.findById(
            req.params.id
        )

        if (!job) {

            return res.status(404).json({
                message: "Job not found"
            })
        }

        // Authorization check

        if (
            job.createdBy.toString()
            !==
            req.user._id.toString()
        ) {

            return res.status(403).json({
                message: "Unauthorized"
            })
        }

        // Delete job

        await job.deleteOne()

        // Delete related applications

        await Application.deleteMany({
            job: req.params.id
        })

        res.status(200).json({

            message:
                "Job and related applications deleted successfully"
        })

    } catch (error) {

        res.status(500).json({
            message: error.message
        })
    }
}



// UPDATE JOB

export const updateJob = async (req, res) => {

    try {

        const job = await Job.findById(
            req.params.id
        )

        if (!job) {

            return res.status(404).json({
                message: "Job not found"
            })
        }

        // Authorization check

        if (
            job.createdBy.toString()
            !==
            req.user._id.toString()
        ) {

            return res.status(401).json({
                message: "Not authorized"
            })
        }

        const updatedJob =
            await Job.findByIdAndUpdate(

                req.params.id,

                req.body,

                {
                    new: true
                }
            )

        res.status(200).json(updatedJob)

    } catch (error) {

        res.status(500).json({
            message: error.message
        })
    }
}