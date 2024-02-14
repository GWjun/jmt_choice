// AppContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface Address {
  coord: number[];
  simple: string;
  full: string;
}

interface AppContextProps {
  address: Address;
  setAddress: Dispatch<SetStateAction<Address>>;
}

const initAddress = () => {
  const storedAddress = localStorage.getItem("myAddress");
  const myAddress = storedAddress
    ? JSON.parse(storedAddress)
    : {
        coord: [],
        simple: "...",
        full: "",
      };
  return myAddress;
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [address, setAddress] = useState<Address>(initAddress);

  return (
    <AppContext.Provider value={{ address, setAddress }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
