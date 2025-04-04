import { addNote, getNotes, deleteNote, updateNote } from '../controllers/notesController.js'; 
import express from "express";

const router = express.Router();

router.post("/add", addNote);
router.get("/:userId", getNotes); 
router.delete("/:id", deleteNote);
router.put("/:id", updateNote);

export default router;