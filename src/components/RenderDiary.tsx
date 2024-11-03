import React, { useContext, useState } from "react";
import "./styles/RenderDiary.css";
import StoreContext from "@/store/StoreContext";
import Image from "next/image";
import Images from "@/assets/images/images";
import EditNote from "./EditNote";
import { DiaryType } from "@/store/types";

const RenderDiary = () => {
  const store = useContext(StoreContext);
  if (!store) throw new Error("Provider is missing");
  const { diary } = store;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DiaryType | null>(null);

  // Open the modal with selected item data
  const handleModalClick = (item: DiaryType) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="RenderDiaryContainer">
      {diary.map((item) => (
        <div key={item.id} className="itemContainer">
          <div className="itemHeader">
            <span>{item.date}</span>
            <Image
              onClick={() => handleModalClick(item)}
              src={Images.edit}
              alt="edit"
              width={25}
              height={25}
            />
          </div>
          <p>
            <span>Title: </span>
            {item.title}
          </p>
          <p>
            <span>Todays story/achievement:</span>
            <br />
            {item.textArea}
          </p>
        </div>
      ))}

      {/* Modals */}
      {isModalOpen && selectedItem && (
        <EditNote
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}
    </div>
  );
};

export default RenderDiary;
