"use client";
import { ReactNode, useEffect, useState } from "react";
import StoreContext from "./StoreContext";
import { redirect } from "next/navigation";
import { DiaryType } from "./types";

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
  const [theme, setTheme] = useState<string>("light");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState(null);
  const [diary, setDiary] = useState([]);

  const changeTheme = () => {
    const changeTheme = theme === "light" ? "dark" : "light";
    setTheme(changeTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", changeTheme);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") as string;
      if (storedTheme) {
        setTheme(storedTheme);
      }
    }
  }, []);

  const loginUserFromAPI = (blog: any) => {
    setUser(blog);
    if (user !== null) {
      redirect("/home");
    }
  };

  const removeNoteFromDiary = (id: number) => {
    function checkID(data: DiaryType) {
      return data.id === id;
    }
    const getIndex = diary.findIndex(checkID);
    if (getIndex !== -1) {
      diary.splice(getIndex, 1);
    }
  };

  const providerValue = {
    // state
    theme,
    isLoading,
    user,
    diary,
    // setter function
    setTheme,
    setIsLoading,
    setUser,
    setDiary,
    // functions
    changeTheme,
    loginUserFromAPI,
    removeNoteFromDiary,
  };
  return (
    <StoreContext.Provider value={providerValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
