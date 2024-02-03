// AuthContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

const localAuth = JSON.parse(
  localStorage.getItem(process.env.REACT_APP_NAME as string) || "{}"
);
const isLocal = Object.keys(localAuth).length > 0 ? true : false;
const isName = isLocal ? localAuth.user.user_metadata.full_name : "";

interface AuthContextProps {
  auth: [boolean, string];
  setAuth: Dispatch<SetStateAction<[boolean, string]>>;
}

const AuthContext = createContext<AuthContextProps>({
  auth: [isLocal, isName],
  setAuth: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<[boolean, string]>([isLocal, isName]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
