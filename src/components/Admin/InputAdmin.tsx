import React from "react";

interface InputAdminProps {
  as?: string;
  value?: string | number | readonly string[];
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  onChange?: (e) => void;
  onBlur?: () => void;
  row?: number;
  dataSelect?: any;
  multible?: true;
}

const InputAdmin: React.FC<InputAdminProps> = ({
  as = "text",
  value,
  label,
  name,
  onBlur,
  onChange,
  placeholder,
  type = "text",
  row = 4,
  dataSelect,
  multible = false,
}) => {
  if (as === "textarea") {
    return (
      <>
        <label
          htmlFor={name}
          className='block mb-2 text-md font-medium text-gray-900'
        >
          {label}
        </label>
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          rows={row}
          className='form-textarea block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 '
          placeholder={placeholder}
        ></textarea>
      </>
    );
  }

  if (type === "file") {
    return (
      <>
        <label
          className='block mb-2 text-sm font-medium text-gray-900 '
          htmlFor={name}
        >
          {label}
        </label>
        <input
          className=' block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer '
          id='file_input'
          multiple={multible}
          type='file'
          accept='images/'
          onChange={onChange}
          onBlur={onBlur}
        />
      </>
    );
  }

  if (as === "select") {
    return (
      <>
        <label
          htmlFor={name}
          className='block mb-2 text-sm font-medium text-gray-900 '
        >
          {label}
        </label>
        <select
          id='countries'
          value={value}
          onChange={onChange}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
        >
          <option>Choose a {label}</option>
          {dataSelect.map((data) => (
            <option key={data.name} value={data._id}>
              {data.name}
            </option>
          ))}
        </select>
      </>
    );
  }

  return (
    <>
      <div className='mb-6'>
        <label
          htmlFor={name}
          className='block mb-2 text-md font-semibold text-gray-900 '
        >
          {label}
        </label>
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className='form-input block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border sm:text-md focus:ring-blue-500 focus:border-blue-500  border-gray-600 placeholder-gray-400'
        />
      </div>
    </>
  );
};

export default InputAdmin;
