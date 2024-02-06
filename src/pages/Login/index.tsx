// Login.tsx

import React from "react";
import { googleLogin } from "../../utils/supabaseClient";

const Login: React.FC = () => {
  return (
    <div className="Login">
      <div className="LoginForm">
        <h1 className="LoginTitle">Enjoy JMT!</h1>
        <p className="LoginSubtitle">메뉴를 추천해 드려요!</p>
        <div className="LoginButton">
          <button className="GoogleButton" onClick={googleLogin}>
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Google Logo"
            />
            Login
          </button>
          <button className="GuestButton">Guest</button>
        </div>

        <p className="LoginFooter">
          궁금한게 있으신가요? <a href="/signup">여기에서 확인하세요</a>.
        </p>
      </div>
    </div>
  );
};

export default Login;
