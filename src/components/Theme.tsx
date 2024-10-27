"use client";
import StoreContext from "@/store/StoreContext";
import Images from "@/assets/images/images";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import "../components/styles/Theme.css";

const Theme = () => {
  const store = useContext(StoreContext);
  if (!store) throw new Error("provider is missing in the app");
  const { theme, changeTheme } = store;

  useEffect(() => {
    document.body.className = theme === "dark" ? "darkTheme" : "lightTheme";
  }, [theme]);

  return (
    <div className="theme_image">
      <Image
        onClick={changeTheme}
        src={theme === "dark" ? Images.moon : Images.sun}
        alt={theme === "dark" ? "light-mode" : "dark-mode"}
      />
    </div>
  );
};

export default Theme;
