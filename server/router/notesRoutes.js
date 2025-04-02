import { addNote, getNotes, deleteNote } from '../controllers/notesController.js'; 
import express from "express";

const router = express.Router();

router.post("/add", addNote);
router.get("/:userId", getNotes); 
router.delete("/:id", deleteNote);

export default router;