import React, { useState, useEffect } from "react";
import Header from "../Header";
import AddNote from "../notes/AddNote";
import Note from "../notes/Note";

const NoteApp = ({ onLogout }) => {
  const [notes, setNotes] = useState([]);
  const userId = localStorage.getItem("userId"); 
  console.log("Retrieved userId:", userId);

  useEffect(() => {
    if (!userId) {
      console.error("User ID is missing. Redirecting to login...");
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
            <Note key={note.id} title={note.title} content={note.content} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteApp;