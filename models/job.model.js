import { request } from "express";
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    requirement:[{
        type:String,
    }], //array because it maybe many skills
    salary:{
        type:Number,
        require:true
    },
    jobLocation:{
        type:String,
        require:true
    },
    jobType:{
        type:String,
        require:true
    },
    noOfPosition:{
        type:Number,
        require:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId, //job and comapany will have relationship so objid will be created
        ref:'Company',
        require:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User', //it maybe recruiter or admin
        require:true
    },
    applications:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Application'
        }
    ]
}, {timestamps:true})
export const job = mongoose.model("Job", jobSchema)