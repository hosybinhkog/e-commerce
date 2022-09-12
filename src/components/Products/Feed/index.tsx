import React from "react";
import ProductItem from "../ProductItem";

const Feed: React.FC = () => {
  return (
    <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto'>
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />

      <img
        src='https://links.papareact.com/dyz'
        className='md:col-span-full'
        alt=''
      />
    </div>
  );
};

export default Feed;
