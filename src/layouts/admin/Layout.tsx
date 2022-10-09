import React from "react";
import { SideBar, TopNav } from "@/components";
import AdminRoute from "../auth/AdminRoute";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AdminRoute>
      <div className='layout'>
        <SideBar />
        <div className='layout__content'>
          <TopNav />
          <div className='layout__content-main'>{children}</div>
        </div>
      </div>
    </AdminRoute>
  );
};

export default Layout;
