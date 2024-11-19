import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true // Fixed: added `type` and corrected spelling
        },
        description: {
            type: String,
            required: true
        },
        requirements: [
            {
                type: String
            }
        ], // Array of strings for skills
        salary: {
            type: Number,
            required: true
        },
        experience: {
            type: Number, // Can be a range or level, keep `String` if non-integer
            required: true
        },
        jobLocation: {
            type: String,
            required: true
        },
        jobType: {
            type: String,
            required: true
        },
        position: {
            type: Number,
            required: true
        },
        company: {
            type: mongoose.Schema.Types.ObjectId, // Reference to Company model
            ref: 'Company',
            required: true
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId, // Reference to User model
            ref: 'User',
            required: true
        },
        applications: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Application' // Reference to Application model
            }
        ]
    },
    { timestamps: true } // Adds `createdAt` and `updatedAt` fields
);

export const Job = mongoose.model("Job", jobSchema);
