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
  console.log("theme iss", theme);

  useEffect(() => {
    document.body.className = theme === "light" ? "lightTheme" : "darkTheme";
  }, [theme]);

  return (
    <div className="theme_image">
      <Image
        onClick={changeTheme}
        src={theme === "dark" ? Images.moon : Images.sun}
        alt={theme === "dark" ? "dark-mode" : "light-mode"}
      />
    </div>
  );
};

export default Theme;
