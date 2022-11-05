import { Spin } from "antd";
import React from "react";

const Loading: React.FC = () => {
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

export default Loading;
