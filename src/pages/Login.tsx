// Login.tsx

import React from "react";

import { googleLogin } from "../utils/supabaseClient";

const Login: React.FC = () => {
  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={googleLogin}>Login</button>
    </div>
  );
};

export default Login;
