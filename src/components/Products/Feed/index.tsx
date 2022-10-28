import { Product } from "@/interfaces";
import React from "react";
import ProductItem from "../ProductItem";

interface FeedProps {
  products: Product[];
}

const Feed: React.FC<FeedProps> = ({ products }) => {
  return (
    <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto'>
      {products?.slice(0, 20).map((product) => {
        return <ProductItem key={product._id} product={product} />;
      })}
      <img
        src='https://links.papareact.com/dyz'
        className='md:col-span-full'
        alt=''
      />
    </div>
  );
};

export default Feed;
