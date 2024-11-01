"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import StoreContext from "@/store/StoreContext";
import Image from "next/image";
import Images from "@/assets/images/images";
import "./styles/FormInput.css";
import Theme from "./Theme";

interface FormInputProps {
  logStatus: "login" | "register";
}

const FormInput: React.FC<FormInputProps> = (props) => {
  const store = useContext(StoreContext);
  if (!store) throw new Error("provider is missing in the app");
  const { loginUserFromAPI, user } = store;

  let blogRef = useRef<{}>({
    userName: "",
    email: null,
    password: "",
  });

  const handleInputChange = (key: string, e: string) => {
    blogRef.current = {
      ...blogRef.current,
      [key]: e,
    };
  };

  const logStatusText = (login: string, register: string) => {
    return props.logStatus === "login" ? login : register;
  };

  return (
    <div className="formContainer">
      {/* Theme Component */}
      <Theme />

      {/* User Form */}
      <form>
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
          onChange={(e) => handleInputChange("password", e.target.value)}
          type="password"
          className="darkInputTheme1 lightInputTheme1"
          required
        />
        {/* Submit Button */}
        <button
          onClick={(e) => {
            // e.preventDefault();
            loginUserFromAPI(blogRef.current);
          }}
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
