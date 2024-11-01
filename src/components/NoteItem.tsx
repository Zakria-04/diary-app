"use client";
import React, { CSSProperties, useState } from "react";
import NoteBtnModal from "./modals/NoteBtnModal";
import "./styles/NoteItem.css";
import RenderDiary from "./RenderDiary";

const NoteItem = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const blurStyle = {
    filter: "blur(5px)",
  };

  return (
    <div className="noteItemContainer">
      <button
        style={isModalOpen ? blurStyle : undefined}
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="createNoteBtn darkBtnTheme lightBtnTheme"
      >
        Add New Note
      </button>
      {isModalOpen && (
        <NoteBtnModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <RenderDiary />
    </div>
  );
};

export default NoteItem;
