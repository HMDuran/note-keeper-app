import React from "react";
import Header from "../Header";
import Note from "../notes/Note";
import AddNote from "../notes/AddNote";

const NoteApp = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow p-4">
        <AddNote />
        {/* Notes Flexbox */}
        <div
            className="flex flex-wrap gap-4 mt-4 justify-center items-start"
            style={{ alignContent: "flex-start", maxWidth: "100%", margin: "0 auto" }}
            >
            <Note />
            <Note />
            <Note />
            <Note />
        </div>
      </div>
    </div>
  );
};

export default NoteApp;
