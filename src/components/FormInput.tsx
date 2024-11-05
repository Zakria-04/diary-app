"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import StoreContext from "@/store/StoreContext";
import "./styles/FormInput.css";
import Theme from "./Theme";
import { checkIfServerLive } from "@/assets/res/api";
import { FormType, UserDataType } from "@/store/types";

interface FormInputProps {
  logStatus: "login" | "register";
}

const FormInput: React.FC<FormInputProps> = (props) => {
  const store = useContext(StoreContext);
  if (!store) throw new Error("provider is missing in the app");
  const { loginUserFromAPI, user, isServerLive, createNewUserFromAPI } = store;

  // check if server is live
  useEffect(() => {
    const checkIfLive = async () => {
      const response = await checkIfServerLive();
      console.log(response.server);
    };

    checkIfLive();
  }, []);

  let blogRef = useRef<FormType>({
    userName: "",
    email: null,
    userPass: "",
  });

  // change input text and save it inside the blogRef
  const handleInputChange = (key: string, e: string) => {
    blogRef.current = {
      ...blogRef.current,
      [key]: e,
    };
  };

  // check the log status and return message
  const logStatusText = (login: string, register: string) => {
    return props.logStatus === "login" ? login : register;
  };

  // handle for submit to the db
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return props.logStatus === "login"
      ? await loginUserFromAPI(blogRef.current)
      : await createNewUserFromAPI(blogRef.current);
  };

  return (
    <div className="formContainer">
      {/* Theme Component */}
      <Theme />

      {/* User Form */}
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="">
          {logStatusText("UserName or Email", "UserName")}
        </label>
        <input
          onChange={(e) => {
            handleInputChange("userName", e.target.value);
          }}
          type="text"
          className="darkInputTheme1 lightInputTheme1"
          required
        />
        {props.logStatus === "register" && (
          <>
            <label htmlFor="">Email</label>
            <input
              onChange={(e) => {
                handleInputChange("email", e.target.value);
              }}
              type="email"
              className="darkInputTheme1 lightInputTheme1"
              required
            />
          </>
        )}
        <label htmlFor="">Password</label>
        <input
          onChange={(e) => handleInputChange("userPass", e.target.value)}
          type="password"
          className="darkInputTheme1 lightInputTheme1"
          required
        />
        {/* Submit Button */}
        <button
          // onClick={(e) => {
          //   // e.preventDefault();
          //   loginUserFromAPI(blogRef.current);
          // }}
          className="submitBtn lightBtnTheme darkBtnTheme"
        >
          {logStatusText("Login", "Create New Account")}
        </button>
        <p>
          {logStatusText("don't have an account? ", "already a member? ")}
          <a href={`/${logStatusText("register", "login")}`}>
            {logStatusText("register", "login")}
          </a>
        </p>
      </form>
    </div>
  );
};

export default FormInput;
