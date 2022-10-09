import { useAppSelector } from "@/hooks";
import Login from "@/pages/login";
import React from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.user);

  if (!(isAuthenticated || loading)) {
    return <Login />;
  } else {
    return <>{children}</>;
  }
};

export default PrivateRoute;
