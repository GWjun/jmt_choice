import React, { ReactNode } from "react";

import { googleLogout } from "../utils/supabaseClient";
import { useAuth } from "../context/AuthContext";

interface PageProps {
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

const Page: React.FC<PageProps> = ({ header, children, footer }) => {
  const { auth } = useAuth();

  return (
    <div className="Page">
      <header>
        {header}
        <p className="userName">{auth[1]}</p>
        <button className="LogoutButton" onClick={googleLogout}>
          <img src="/images/logout.png" alt="logout" />
        </button>
      </header>
      <main>{children}</main>
      <footer>{footer}</footer>
    </div>
  );
};

export default Page;
