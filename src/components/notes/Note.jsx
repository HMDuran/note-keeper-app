import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Note = ({ title, content }) => {
  return (
    <div className="relative bg-white p-4 rounded-lg shadow-md w-full h-full max-w-xs max-h-64 overflow-hidden">
      <div className="absolute top-2 right-2 flex space-x-4">
        <button className="text-gray-600 hover:text-blue-500">
          <EditIcon fontSize="small" />
        </button>
        <button className="text-gray-600 hover:text-red-500">
          <DeleteIcon fontSize="small" />
        </button>
      </div>
      <h1 className="text-lg font-semibold mb-2">{title}</h1>
      <p className="text-gray-700 overflow-hidden p-2" style={{ marginBottom: "8px" }}>
        {content}
      </p>
    </div>
  );
};

export default Note;