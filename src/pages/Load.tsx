// Load.tsx

import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Load: React.FC = () => {
  const { setAuth } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      const localAuth = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_NAME as string) || "{}"
      );
      if (Object.keys(localAuth).length > 0) {
        setAuth([true, localAuth.user.user_metadata.full_name]);
      }
      window.location.href = "/";
    }, 1000);
  }, [setAuth]);

  return <div className="Load">Loading...</div>;
};

export default Load;
