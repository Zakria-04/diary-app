import React, { SetStateAction } from "react";

export type DiaryType = {
  id: number;
  date: string;
  title: string;
  textArea: string;
};
export interface StoreContextType {
  // state
  theme: string;
  user: string | null;
  diary: DiaryType[];

  // setter function
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  setDiary: React.Dispatch<SetStateAction<DiaryType[]>>;

  // functions
  changeTheme: () => void;
  loginUserFromAPI: (blog: any) => void;
  removeNoteFromDiary: (id: number) => void;
}
