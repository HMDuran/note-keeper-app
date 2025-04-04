import React, { useState, useRef, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";

function AddNote(props) {
  const [isExpanded, setExpanded] = useState(false);
  const formRef = useRef(null); 

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  async function submitNote(event) {
    event.preventDefault();
  
    const noteWithUserId = {
      ...note,
      userId: props.userId,
    };
  
    try {
      const response = await fetch("/api/notes/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteWithUserId),
      });

      if (!response.ok) {
        throw new Error("Failed to add note");
      }

      const data = await response.json();
      props.onAdd(data);
    } catch (error) {
      console.error("Error adding note:", error);
    }

    setNote({
      title: "",
      content: "",
    });
    setExpanded(false);
  }
  
  function expand() {
    setExpanded(true);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setExpanded(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-md mx-auto p-4">
      <form ref={formRef} className="add-note relative bg-white p-4 rounded-lg shadow-md mt-8 mb-5 mx-auto">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title (Optional)"
            className="w-full p-2 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-brown-200"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          required
          rows={isExpanded ? 3 : 1}
          className="w-full p-2 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-brown-200 resize-none"
        />

        <Zoom in={isExpanded}>
          <Fab onClick={submitNote} className="absolute right-4 bottom-[-18px] sm:right-2 sm:bottom-[-12px]">
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default AddNote;