import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

interface TitleProps {
  backUrl?: string;
  children: ReactNode;
}

const Title: React.FC<TitleProps> = ({ backUrl = "", children }) => {
  if (backUrl.length) {
    return (
      <>
        <Link to={backUrl}></Link>
        <h1 style={{ paddingRight: "44px" }}>{children}</h1>
      </>
    );
  }

  return <h1>{children}</h1>;
};

export default Title;
