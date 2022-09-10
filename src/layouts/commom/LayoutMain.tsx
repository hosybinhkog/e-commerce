import { NextPage } from "next";
import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutMainProps {
  children: ReactNode;
}

const LayoutMain: NextPage<LayoutMainProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutMain;
