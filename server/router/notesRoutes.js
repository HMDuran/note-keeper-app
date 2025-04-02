import { addNote, getNotes } from '../controllers/notesController.js'; 
import express from "express";

const router = express.Router();

router.post("/add", addNote);
router.get("/:userId", getNotes); 

export default router;