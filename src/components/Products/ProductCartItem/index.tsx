import { useAppDispatch } from "@/hooks";
import { StarIcon } from "@heroicons/react/solid";
import React from "react";
import Currency from "react-currency-formatter";
const ProductCartItem: React.FC = () => {
  const dispath = useAppDispatch();

  /// HARD
  const handleAddToCart = () => {};

  const handleRemoveItemToCart = () => {};

  return (
    <div className='md:grid md:grid-cols-5 flex flex-col items-center md:items-start border-b border-gray-200'>
      <img
        src='https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1563378212-amazon-echo-dot-3-1563376152.jpg?crop=1xw:1xh;center,top&resize=480:*'
        className='object-contain h-[200px] w-[200px]'
      />
      <div className='col-span-3 mx-5'>
        <p className='line-clamp-2'>Abcdefgh shorthand</p>
        <div className='flex items-center'>
          {Array(5)
            .fill(5)
            .map((_, i) => (
              <StarIcon key={i} className='h-5 text-yellow-500' />
            ))}
        </div>
        <p className='text-xs my-2 line-clamp-3'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores,
          consectetur ad tenetur ratione dignissimos iusto commodi beatae. Minus
          numquam consequuntur debitis eaque nostrum, maxime, ab omnis odit unde
          impedit molestias?
        </p>
        <Currency quantity={"400000"} currency='GBP' />
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
      </div>
      <div className='flex flex-col space-y-2 my-auto justify-self-end'>
        <button onClick={handleAddToCart} className='btn'>
          Add to cart
        </button>
        <button onClick={handleRemoveItemToCart} className='btn'>
          Remove to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCartItem;
