import { Router } from "express";
import UserController from "../controllers/UserController.js";

const router = Router();

router.post("/signup", UserController.signup);

export default router;
