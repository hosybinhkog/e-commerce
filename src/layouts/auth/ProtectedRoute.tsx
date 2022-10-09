import { useAppSelector } from "@/hooks";
import React from "react";
import Index from "@/pages";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.user);

  if (isAuthenticated && !loading) {
    return <Index />;
  } else {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
