import React, { useContext, useState } from "react";
import "./styles/RenderDiary.css";
import StoreContext from "@/store/StoreContext";
import Image from "next/image";
import Images from "@/assets/images/images";
import EditNote from "./EditNote";
import { DiaryType } from "@/store/types";

const RenderDiary = () => {
  const store = useContext(StoreContext);
  if (!store) throw new Error("provider is missing");
  const { diary } = store;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleModalClick = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(!isModalOpen);
  };

  const renderDiary = () => {
    return diary.map((item) => {
      return (
        <div key={item.id} className="itemContainer">
          <div className="itemHeader">
            <span>{item.date}</span>
            <Image
              onClick={() => handleModalClick(item)}
              src={Images.edit}
              alt="edit"
              width={25}
              height={25}
              style={isModalOpen ? { zIndex: -1 } : { zIndex: 1 }}
            />
          </div>
          <p>
            <span>title: </span>
            {item.title}
          </p>
          <p>
            <span>Todays story/achievement:</span>
            <br />
            {item.textArea}
          </p>

          {/* Modals */}
          {isModalOpen && (
            <EditNote
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              selectedItem={selectedItem}
              setSelectedItem={selectedItem}
            />
          )}
        </div>
      );
    });
  };

  return <div className="RenderDiaryContainer">{renderDiary()}</div>;
};

export default RenderDiary;
