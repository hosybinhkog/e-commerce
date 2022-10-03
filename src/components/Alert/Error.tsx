import { FunctionComponent, useEffect, useState } from "react";

interface Props {
  dataErrors: string;
}

const AlertError: FunctionComponent<Props> = ({ dataErrors }) => {
  const ListError = (): JSX.Element => {
    return (
      <div className='my-4 mx-0 w-full'>
        <div className='leading-6 w-full whitespace-pre-line rounded-md border border-solid border-[#800404] bg-white py-2 px-6 text-left text-[1.2rem] text-[#B20808]'>
          <p>{dataErrors}</p>
        </div>
      </div>
    );
  };
  return <ListError />;
};

export default AlertError;
