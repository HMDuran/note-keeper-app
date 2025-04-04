import React, { useState } from "react";
import Modal from "react-modal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

Modal.setAppElement("#root");

const Note = ({ id, title, content, handleDelete, handleUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(title || ""); 
  const [editContent, setEditContent] = useState(content);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSave = () => {
    const updatedTitle = editTitle.trim() === "" ? "Untitled" : editTitle; 
    handleUpdate(id, updatedTitle, editContent);
    closeModal();
  };

  return (
    <div className="relative bg-white p-4 rounded-lg shadow-md w-full max-w-xs min-h-[180px] flex flex-col">
      <div className="flex items-start justify-between">
        <h1 className="text-lg font-semibold cursor-pointer p-2" onClick={openModal}>
          {title || "Untitled"} 
        </h1>
        <div className="flex space-x-2">
          <button className="text-gray-600 hover:text-blue-500" onClick={openModal}>
            <EditIcon fontSize="small" />
          </button>
          <button
            onClick={() => handleDelete(id)}
            className="text-gray-600 hover:text-red-500"
          >
            <DeleteIcon fontSize="small" />
          </button>
        </div>
      </div>

      <p className="text-gray-700 p-2 line-clamp-3 cursor-pointer" onClick={openModal}>
        {content.length > 100 ? content.slice(0, 100) + "..." : content}
      </p>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Title (Optional)"
          className="border p-2 rounded mb-2 w-full"
        />
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="border p-2 rounded w-full h-24"
        ></textarea>
        <div className="flex justify-end space-x-4 mt-4">
          <button onClick={closeModal} className="bg-gray-400 text-white p-2 rounded">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Note;