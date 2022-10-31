import { useAppDispatch } from "@/hooks";
import { IProductCartItem } from "@/interfaces";
import { StarIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React from "react";
import Currency from "react-currency-formatter";

interface ProductCartItemProps {
  productCart: IProductCartItem;
  handlleRemoveItem: (id: string) => void;
}

const ProductCartItem: React.FC<ProductCartItemProps> = ({
  productCart,
  handlleRemoveItem,
}) => {
  return (
    <div className='md:grid md:grid-cols-5 flex flex-col items-center md:items-start border-b border-gray-200'>
      <Link href={`/product/details/${productCart.product}`}>
        <img
          src={
            productCart.image ||
            "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1563378212-amazon-echo-dot-3-1563376152.jpg?crop=1xw:1xh;center,top&resize=480:*"
          }
          className='object-contain h-[200px] w-[200px] cursor-pointer  '
        />
      </Link>
      <div className='col-span-3 mx-5'>
        <Link href={`/product/details/${productCart.product}`}>
          <p className='line-clamp-2 cursor-pointer'>{productCart.name}</p>
        </Link>
        <div className='flex items-center'>
          {Array(5)
            .fill(5)
            .map((_, i) => (
              <StarIcon key={i} className='h-5 text-yellow-500' />
            ))}
        </div>
        <p className='text-xs my-2 line-clamp-3'>{productCart.description}</p>
        <Currency quantity={productCart.price} currency='GBP' />
        {true && (
          <div className='flex items-center space-x-2'>
            <img
              src='https://links.papareact.com/fdw'
              className='w-12'
              loading='lazy'
              alt=''
            />
            <p className='text-xs text-gray-500'>FREE Next-day</p>
          </div>
        )}
        <div>
          <span className='text-md font-semibold'>quanlity</span>:{" "}
          {productCart.quantity}
        </div>
      </div>
      <div className='flex flex-col space-y-2 my-auto justify-self-end'>
        <button
          onClick={() => handlleRemoveItem(productCart.product)}
          className='btn'
        >
          Remove to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCartItem;
