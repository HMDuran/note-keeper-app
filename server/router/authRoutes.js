import express from "express";
import { signUp, googleSignIn, signIn } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signUp); 
router.post("/google-signin", googleSignIn); 
router.post('/signin', signIn); 
export default router;
