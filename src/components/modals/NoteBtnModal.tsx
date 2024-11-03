"use client";
import StoreContext from "@/store/StoreContext";
import "./styles/NoteBtnModal.css";
import React, { SetStateAction, useContext, useRef, useState } from "react";
import { DiaryType } from "@/store/types";

interface NoteBtnModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

const NoteBtnModal: React.FC<NoteBtnModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const store = useContext(StoreContext);
  if (!store) throw new Error("provider is missing");
  const { setDiary, diary } = store;

  // current date
  const getDate = new Date();
  const getDay = getDate.getDate();
  const getMonth = getDate.getMonth() + 1;
  const getYear = getDate.getFullYear();
  const fullDate = `${getDay},${getMonth},${getYear}`;

  let createID = diary.length;

  const formRef = useRef<DiaryType>({
    id: createID,
    date: fullDate,
    title: "",
    textArea: "",
  });

  // handle inputs text change and save it inside formRef
  const handleFormTextChange = (key: string, e: string) => {
    formRef.current = {
      ...formRef.current,
      id: createID,
      [key]: e,
    };
  };

  // submit form data 
  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const diaryProvider = diary;
    diaryProvider.unshift(formRef.current);
    setDiary(diaryProvider);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="NoteBtnModalContainer">
      {isModalOpen && (
        <form onSubmit={(e) => handleSubmitForm(e)} className="formContainer">
          <input
            type="text"
            placeholder="title"
            className="darkInputTheme2 lightInputTheme2"
            onChange={(e) => handleFormTextChange("title", e.target.value)}
          />
          <textarea
            name=""
            className="darkInputTheme2 lightInputTheme2"
            placeholder="Write Your Diary here"
            onChange={(e) => handleFormTextChange("textArea", e.target.value)}
          />
          <div className="modalControlBtn">
            <button
              className="lightBtnTheme darkBtnTheme"
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              cancel
            </button>
            <button className="lightBtnTheme darkBtnTheme">
              add to my diary
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NoteBtnModal;
