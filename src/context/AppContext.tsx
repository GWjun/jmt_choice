// AppContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { supabase } from "../utils/supabaseClient";

interface Address {
  coord: number[];
  simple: string;
  full: string;
}

interface AppContextProps {
  address: Address;
  setAddress: Dispatch<SetStateAction<Address>>;
  foodStores: string[];
}

const initAddress = (): Address => {
  const storedAddress = localStorage.getItem("myAddress");
  return storedAddress
    ? JSON.parse(storedAddress)
    : { coord: [], simple: "...", full: "" };
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [address, setAddress] = useState<Address>(initAddress);
  const [foodStores, setFoodStores] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("stores")
          .select("place_name")
          .order("place_name", { ascending: true });
        if (error) {
          console.error("Error fetching data:", error);
          return;
        }
        setFoodStores(data?.map((item) => item.place_name) || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ address, setAddress, foodStores }}>
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
