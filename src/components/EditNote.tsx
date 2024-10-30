"use client";
import React, { SetStateAction, useContext, useEffect, useState } from "react";
import "./styles/EditNote.css";
import Image from "next/image";
import Images from "@/assets/images/images";
import { DiaryType } from "@/store/types";
import StoreContext from "@/store/StoreContext";

interface EditNoteProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
  selectedItem: DiaryType;
  setSelectedItem: any;
}

const EditNote: React.FC<EditNoteProps> = ({
  isModalOpen,
  setIsModalOpen,
  selectedItem,
  setSelectedItem,
}) => {
  const store = useContext(StoreContext);
  if (!store) throw new Error("provider is missing");
  const { diary, setDiary } = store;
  const [value, setValue] = useState(selectedItem.title);
  const [textInput, setTextInput] = useState(selectedItem.textArea);

  const updateItem = () => {
    const getID = diary.find(
      (getID: DiaryType) => getID.id === selectedItem.id
    );
    if (getID) {
      getID.title = value;
      getID.textArea = textInput;
      setIsModalOpen(!isModalOpen);
    }
  };

  return (
    <div className="editNoteContainer">
      <div className="borderContainer">
        <div className="headerContainer">
          <p>title</p>
          <Image src={Images.delete} alt="delete" width={30} height={30} />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <p>textArea</p>
        <textarea
          value={textInput}
          onChange={(e) => setTextInput(e.currentTarget.value)}
        />
        <div className="footerContainer">
          <button onClick={() => setIsModalOpen(!isModalOpen)}>cancel</button>
          <button onClick={updateItem}>save</button>
        </div>
      </div>
    </div>
  );
};

export default EditNote;
