export interface StoreContextType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  changeTheme: () => void;
}
