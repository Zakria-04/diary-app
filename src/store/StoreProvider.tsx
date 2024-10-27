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

  const changeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const loginUserFromAPI = (blog: any) => {
    setUser(blog);
  };

  const providerValue = {
    // state
    theme,
    isLoading,
    user,
    // setter function
    setTheme,
    setIsLoading,
    setUser,
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
