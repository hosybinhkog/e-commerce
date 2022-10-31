import React, { ReactNode, useEffect, useState } from "react";
import { Spin } from "antd";

interface ProtectRoute {
  children: ReactNode;
}

const LoadingSpin: React.FC = () => {
  return (
    <div className='route__loading'>
      <Spin />
      <style jsx>{`
        .route__loading {
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

const ProtectRouter: React.FC<ProtectRoute> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <LoadingSpin />;

  return <>{children}</>;
};

export default ProtectRouter;
