import express from "express";
import { signUp, googleSignIn } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signUp); 
router.post("/google-signin", googleSignIn); 
export default router;
