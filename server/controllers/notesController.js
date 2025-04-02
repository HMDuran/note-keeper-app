import { addNoteToDB, getNotesByUserId } from "../models/notesModel.js";

export const addNote = async (req, res) => {
  const { userId, title, content } = req.body;

  if (!userId || !title || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newNote = await addNoteToDB(userId, title, content);
    res.status(201).json(newNote);
  } catch (err) {
    console.error("Error in addNote:", err);
    res.status(500).json({ error: err.message });
  }
};


export const getNotes = async (req, res) => {
  const { userId } = req.params;

  try {
    const notes = await getNotesByUserId(userId);
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

import { deleteNoteFromDB } from "../models/notesModel.js";

export const deleteNote = async (req, res) => {
  const { id } = req.params; 
  const { userId } = req.body; 

  if (!id || !userId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const deletedNote = await deleteNoteFromDB(id, userId);

    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found or not authorized" });
    }

    res.status(200).json({ message: "Note deleted successfully", deletedNote });
  } catch (err) {
    console.error("Error in deleteNote:", err);
    res.status(500).json({ error: err.message });
  }
};
