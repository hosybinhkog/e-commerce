import React from "react";

interface Props {
  dataSuccess: string;
}

const AlertSuccess: React.FC<Props> = ({ dataSuccess }) => {
  const Success = (): JSX.Element => {
    if (!dataSuccess) {
      return null;
    }
    return (
      <div className='ot-alert'>
        <div className='ot-alert__content ot-alert__success'>
          <p>{dataSuccess}</p>
        </div>
      </div>
    );
  };
  return <Success />;
};

export default AlertSuccess;
