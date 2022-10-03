import React from "react";
import { SideBar, TopNav } from "@/components";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='layout'>
      <SideBar />
      <div className='layout__content'>
        <TopNav />
        <div className='layout__content-main'>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
