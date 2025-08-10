import React, { ReactNode } from "react";
import Header from "../components/Header";
type LayoutProps = {
  children: ReactNode;
};
const layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col items-center  h-screen bg-black">
      <Header />
      <main className="w-full">{children}</main>
    </div>
  );
};

export default layout;
