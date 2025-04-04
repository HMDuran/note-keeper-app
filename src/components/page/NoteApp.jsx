import React, { useState, useEffect } from "react";
import Header from "../Header";
import AddNote from "../notes/AddNote";
import Note from "../notes/Note";

const NoteApp = ({ onLogout }) => {
  const [notes, setNotes] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      window.location.href = "/signIn";
      return;
    }

    fetch(`/api/notes/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }
        return response.json();
      })
      .then((data) => {
        setNotes(data);
      })
      .catch((error) => console.error(error));
  }, [userId]);

  const handleAddNote = (newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  const handleDeleteNote = async (id) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }), 
      });

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleUpdateNote = async (id, title, content, color) => {
    try {
      const updatedTitle = title.trim() === "" ? "Untitled" : title;
      const response = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, title: updatedTitle, content, color }), 
      });
  
      if (!response.ok) {
        throw new Error("Failed to update note");
      }
  
      const updatedNote = await response.json();
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? updatedNote : note)) 
      );
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header onLogout={onLogout} />
      <div className="flex-grow p-4">
        <AddNote userId={userId} onAdd={handleAddNote} />
        <div
          className="flex flex-wrap gap-4 mt-4 justify-center items-start"
          style={{ alignContent: "flex-start", maxWidth: "100%", margin: "0 auto" }}
        >
          {notes.map((note) => (
            <Note
              key={note.id}
              id={note.id} 
              title={note.title}
              content={note.content}
              color={note.color}
              handleDelete={handleDeleteNote}
              handleUpdate={handleUpdateNote}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteApp;