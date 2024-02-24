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
const isEmail = isLocal ? localAuth.user.user_metadata.email : "";

interface AuthContextProps {
  auth: [boolean, string, string];
  setAuth: Dispatch<SetStateAction<[boolean, string, string]>>;
}

const AuthContext = createContext<AuthContextProps>({
  auth: [isLocal, isName, isEmail],
  setAuth: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<[boolean, string, string]>([
    isLocal,
    isName,
    isEmail,
  ]);

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
