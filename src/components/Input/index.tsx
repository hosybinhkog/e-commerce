import React, { HTMLInputTypeAttribute } from "react";

interface InputProps {
  placehoder?: string;
  name: string;
  label: string;
  onChange?: (e) => void;
  type?: HTMLInputTypeAttribute;
  className?: string;
  value?: string;
  onBlur?: () => void;
}

const Input: React.FC<InputProps> = ({
  placehoder,
  name,
  label,
  onChange,
  className,
  type,
  value,
  onBlur,
}) => {
  return (
    <div className='flex flex-col gap-[4px]'>
      <label
        htmlFor={name}
        className='capitalize text-[14px] font-bold text-gray-600'
      >
        {label}
      </label>
      <input
        value={value || ""}
        className={`${className} focus:outline-none focus:ring-[2px] focus:ring-yellow-300 rounded-[2px] border-[0.5px] border-gray-600 focus:border-hidden text-justify px-2 transition-all ease-out duration-150 text-[15px] text-gray-500`}
        type={type}
        name={name}
        id={name}
        onChange={onChange}
        placeholder={placehoder}
        onBlur={onBlur}
      />
    </div>
  );
};

export default Input;
