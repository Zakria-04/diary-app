import FormInput from "@/components/FormInput";
import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  const load = true;
  load && redirect("/login");
  return (
    <>
      <h2>Loading...</h2>
    </>
  );
};

export default page;
