import { Job } from "../models/job.model.js";

//admins post karenge
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id; // Ensure this is set in middleware

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is Missing",
                status: false
            });
        };

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","), // Convert comma-separated string to array
            salary: Number(salary),
            jobLocation: location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(200).json({
            message: "New job created successfully",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};



//for student
export const getAllJobs = async (req,res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or:[ //anyofbelow
                {title:{$regex:keyword, $options:"i"}},  //i means case sensitive
                {description:{$regex:keyword, $options:"i"}},
            ]
        };
        const jobs = await Job.find(query);
        if(!jobs){
            return res.status(404).json({
                message:"jobs not found.",
                success:false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

//for student
export const getJobById = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message:"Jobs not found",
                success:false
            })
        };
        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
};

//admins kitne job create kara hai abhi takk
export const getAdminJobs = async (req,res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId});
        if(!jobs){
            return res.status(404).json({
                message: "jobs not found",
                success:false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        });
    } catch (error) {
        console.log(error)
    }
}