"use client";
import React, { useContext, useEffect, useState } from "react";
import StoreContext from "@/app/store/StoreContext";
import Image from "next/image";
import Images from "@/assets/images/images";
import "./styles/FormInput.css";
import Theme from "./Theme";

const FormInput = () => {
  return (
    <div className="formContainer">
      {/* Theme Container */}
      <Theme />
      <form>
        <label htmlFor="">UserName or Email</label>
        <input type="text" required />
        <label htmlFor="">Password</label>
        <input type="text" required />
        <button className="submitBtn">login</button>
        <p>
          don't have an account? <a href="#">register</a>
        </p>
      </form>
    </div>
  );
};

export default FormInput;
