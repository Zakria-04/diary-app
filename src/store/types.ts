export interface StoreContextType {
  // state
  theme: string;
  user: string | null

  // setter function
  setTheme: React.Dispatch<React.SetStateAction<string>>;

  // functions
  changeTheme: () => void;
  loginUserFromAPI: (blog: any) => void;
}
