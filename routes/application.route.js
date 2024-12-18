import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJobs, getApplicants, getAppliedJobs, updateStatus } from "../controller/application.controller.js";
import { updateCompany } from "../controller/company.controller.js";
 
const router = express.Router();

router.post("/apply/:id", isAuthenticated, applyJobs);
router.get("/get", isAuthenticated, getAppliedJobs);
router.get("/:id/applicants", isAuthenticated, getApplicants);
router.put("/status/:id/update", isAuthenticated, updateStatus);

export default router;
