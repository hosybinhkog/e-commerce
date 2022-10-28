import { useAppSelector } from "@/hooks";
import React from "react";
import Index from "@/pages";
import { Loading } from "@/components";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated, user, loading } = useAppSelector(
    (state) => state.user
  );

  return (
    <>
      {loading === false ? (
        <>{isAuthenticated && user.role === "admin" ? children : <Index />}</>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
};

export default AdminRoute;
