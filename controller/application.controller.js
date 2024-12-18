import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import mongoose from "mongoose";


export const applyJobs = async (req,res) => {
    try {
        const userId = req.userId;
        const { id: jobId }  = req.params;
        if(!jobId){
            return res.status(400).json({
                message:"Job id is required",
                success:true
            });
        };
        const existingApplication = await Application.findOne({Job:jobId, applicant:userId})

        if(existingApplication){
            return res.status(400).json({
                message:"you have already applied for this jobs",
                success: false
            })
        };

        //check if the jobs exists
        const existingJob = await Job.findById(jobId);
        if(!existingJob){
            return res.status(404).json({
                message: "job not found",
                success:false
            })
        };

        //create a new aplication
        const newApplication = await Application.create({
            job:jobId,  //as per schema name
            applicant:userId,
        });

        existingJob.applications.push(newApplication._id);
        await existingJob.save();

        return res.status(201).json({
            message:"Job Applied successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"something went wrong",
            success:false,
            error:error.message,
        })
    }
};

export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.userId;
        const application = await Application.find({ applicant:userId }).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path: 'company',
                option:{sort:{createdAt:-1}},
            }
        });
        if(!application || application.length === 0){
            return res.status(404).json({
                message:"no applications found for this user",
                success:false
            })
        }
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "something went wrong",
            successL:false,
            error: error.message,
        });
    }
};

export const getApplicants = async (req, res) => {
    try {
        const userId = req.userId;
        const { id: jobId }  = req.params;

      //const { jobId } = req.params; // Extract jobId directly
      console.log("Job ID:", jobId);
  
      // Validate the jobId
      if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({
          message: "Invalid Job ID",
          success: false,
        });
      }
  
      // Find the job and populate applicants
      const job = await Job.findById(jobId).populate({
        path: "applications",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "applicant",
        },
      });
  
      // Handle if the job is not found
      if (!job) {
        return res.status(404).json({
          message: "Job not found",
          success: false,
        });
      }
  
      return res.status(200).json({
        job,
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Something went wrong",
        success: false,
        error: error.message,
      });
    }
  };
  

export const updateStatus = async(req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required.',
                success:false
            });
        };

        //find the application by application id
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message: "Application not found",
                success:false
            })
        };

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"status updated successfully.",
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}