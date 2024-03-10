// Page.tsx

import React, { ReactNode } from "react";

interface PageProps {
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

const Page: React.FC<PageProps> = ({ header, children, footer }) => {
  return (
    <div className="Page" style={{ width: "100%", height: "100vh" }}>
      <header>{header}</header>
      <main style={{ height: "100%" }}>{children}</main>
      <footer>{footer}</footer>
    </div>
  );
};

export default Page;
