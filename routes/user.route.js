import express from "express";
import { login, register, updateProfile } from "../controller/user.controller.js";
const router = express.Router();

router.post("/register",register);
router.route("/login").post(login);
router.route("/profile/update").post(updateProfile);

export default router;
