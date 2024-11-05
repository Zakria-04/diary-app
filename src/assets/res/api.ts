import { UserDataType } from "@/store/types";
import axios from "axios";

const MainURL = "https://diary-server-nikj.onrender.com";

const checkIfServerLive = () => {
  const route = "/live";
  return appFetch(route, "GET");
};

const createNewUserAccount = (blog: UserDataType) => {
  const route = "/create_user";
  return appFetch(route, "POST", blog);
};

const loginUserAccount = (blog: UserDataType) => {
  const route = "/login_user";
  return appFetch(route, "POST", blog);
};

const appFetch = async (route: string, method: "GET" | "POST", data?: any) => {
  try {
    const response = await axios({
      method: method,
      url: MainURL + route,
      data: method === "POST" ? data : null,
    });

    return response.data;
  } catch (error) {
    console.error(`Error on fetching the route, ${route} `, error);
    return null;
  }
};

export { checkIfServerLive, createNewUserAccount, loginUserAccount };
