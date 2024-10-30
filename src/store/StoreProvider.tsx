"use client";
import { ReactNode, useState } from "react";
import StoreContext from "./StoreContext";
import { redirect } from "next/navigation";

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
  const [theme, setTheme] = useState("dark");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [diary, setDiary] = useState([]);

  const changeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const loginUserFromAPI = (blog: any) => {
    setUser(blog);
    if (user !== null) {
      redirect("/home");
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
  };
  return (
    <StoreContext.Provider value={providerValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
