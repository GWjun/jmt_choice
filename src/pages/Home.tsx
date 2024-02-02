// Home.tsx

import React from "react";
import { useAuth } from "../context/AuthContext";
import { googleLogout } from "../utils/supabaseClient";

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="Home">
      Home
      <button onClick={googleLogout}>Logout</button>
    </div>
  );
};

export default Home;
