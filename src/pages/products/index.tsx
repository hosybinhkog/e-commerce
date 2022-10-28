import { SidebarCategory } from "@/components";
import LayoutMain from "@/layouts/commom/LayoutMain";
import { NextPage } from "next";

const Products: NextPage = () => {
  return (
    <LayoutMain wFull>
      <div className='flex mt-2 p-2 border-t border-gray-400'>
        <SidebarCategory />
        <div className='py-5 px-2'>
          <h5 className='text-3xl tracking-wider font-extrabold text-gray-700 ml-4'>
            Hello category
          </h5>
        </div>
      </div>
    </LayoutMain>
  );
};

export default Products;
