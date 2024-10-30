"use client";
import React from "react";
import Header from "@/components/Header";
import "./page.css";
import NoteBtnModal from "@/components/modals/NoteBtnModal";
import NoteItem from "@/components/NoteItem";

const page = () => {
  return (
    <>
      <Header />
      <NoteItem />
    </>
  );
};

export default page;
