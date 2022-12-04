import { Loading } from "@/components";
import { useAppSelector } from "@/hooks";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, loading, user } = useAppSelector(
    (state) => state.user
  );

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  return (
    <>{loading === true ? <Loading /> : <>{isAuthenticated && children}</>}</>
  );
};

export default PrivateRoute;
