"use client";
import StoreContext from "@/app/store/StoreContext";
import Images from "@/assets/images/images";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import "../components/styles/Theme.css";

const Theme = () => {
  const store = useContext(StoreContext);
  if (!store) throw new Error("wrap your app with provider");
  const { theme, changeTheme } = store;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.body.className = theme === "dark" ? "darkTheme" : "lightTheme";
  });

  return (
    <div className="theme_image">
      <Image
        onClick={changeTheme}
        src={theme === "dark" ? Images.sun : Images.moon}
        alt={theme === "dark" ? "light-mode" : "dark-mode"}
      />
    </div>
  );
};

export default Theme;
