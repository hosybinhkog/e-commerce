import React from "react";

interface CategoryItems {
  name: string;
  _id: string;
  descript: string;
}

interface SidebarCategoryProps {
  items: CategoryItems[];
}

const SidebarCategory: React.FC = () => {
  return (
    <div className='p-2 max-w-[250px] w-full min-h-screen border-r border-gray-300 shadow-sm'>
      <h5 className='text-base text-gray-900 font-semibold p-2'>Deparment</h5>
      <ul></ul>
    </div>
  );
};

export default SidebarCategory;
