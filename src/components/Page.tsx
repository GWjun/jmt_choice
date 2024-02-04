import React, { ReactNode } from "react";

interface PageProps {
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

const Page: React.FC<PageProps> = ({ header, children, footer }) => {
  return (
    <div className="Page">
      <header>{header}</header>
      <main>{children}</main>
      <footer>{footer}</footer>
    </div>
  );
};

export default Page;
