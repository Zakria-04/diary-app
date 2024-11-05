"use client";
import { ReactNode, useEffect, useState } from "react";
import StoreContext from "./StoreContext";
import { redirect } from "next/navigation";
import { DiaryType, UserDataType } from "./types";
import {
  checkIfServerLive,
  createNewUserAccount,
  loginUserAccount,
} from "@/assets/res/api";

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
  //* theme
  const [theme, setTheme] = useState<string>("light");

  //* user states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserDataType | null>(null);

  //* others
  const [diary, setDiary] = useState<DiaryType[]>([]);

  //* change app theme
  const changeTheme = () => {
    const changeTheme = theme === "light" ? "dark" : "light";
    setTheme(changeTheme);
    if (typeof window !== "undefined") {
      // set theme to the local storage
      localStorage.setItem("theme", changeTheme);
    }
  };
  //* check if local storage is not undefined to get the data from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") as string;
      if (storedTheme) {
        setTheme(storedTheme);
      }
    }
  }, []);

  //* create new user account from db
  const createNewUserFromAPI = async (blog: any) => {
    try {
      setIsLoading(true);
      const data = await createNewUserAccount(blog);
      if (data) {
        setUser(data.user);
        setIsLoading(false);
      }
      console.log("register data ", data);
    } catch (error) {
      console.log("try again", error);
      setIsLoading(false);
    }
  };

  //* login user account from db
  const loginUserFromAPI = async (blog: any) => {
    console.log("blog data", blog);

    try {
      setIsLoading(true);
      const data = await loginUserAccount(blog);
      if (data) {
        setIsLoading(false);
        setUser(data.user);
      }
      console.log("login data ", data);
    } catch (error) {
      console.log("try again", error);
      setIsLoading(false);
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

  const isServerLive = () => {
    checkIfServerLive();
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
    isServerLive,
    createNewUserFromAPI,
  };
  return (
    <StoreContext.Provider value={providerValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
