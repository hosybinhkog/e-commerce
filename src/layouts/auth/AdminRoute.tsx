import { useAppSelector } from "@/hooks";
import React, { useEffect } from "react";
import Index from "@/pages";
import { Loading } from "@/components";
import { useRouter } from "next/router";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated, user, loading } = useAppSelector(
    (state) => state.user
  );

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      router.push("/admin/login");
    }
  }, [isAuthenticated, user]);

  return (
    <>{loading === true ? <Loading /> : <>{isAuthenticated && children}</>}</>
  );
};

export default AdminRoute;
