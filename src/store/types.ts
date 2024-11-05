import React, { SetStateAction } from "react";

export type FormType = {
  userName: string;
  email?: string | null;
  userPass: string;
};

export type UserDataType = {
  _id: string;
  userName: string;
  userPass: string;
  email: string;
  userDiaryData: DiaryType[];
  __v: number;
};

export type DiaryType = {
  id: number;
  date: string;
  title: string;
  textArea: string;
};
export interface StoreContextType {
  // state
  theme: string;
  user: UserDataType | null;
  diary: DiaryType[];

  // setter function
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  setDiary: React.Dispatch<SetStateAction<DiaryType[]>>;
  setUser: React.Dispatch<SetStateAction<UserDataType | null>>;
  // functions
  changeTheme: () => void;
  isServerLive: () => void;
  createNewUserFromAPI: (blog: any) => Promise<void>;
  loginUserFromAPI: (blog: any) => Promise<void>;
  removeNoteFromDiary: (id: number) => void;
}
