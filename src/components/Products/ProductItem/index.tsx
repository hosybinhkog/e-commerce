import { useAppDispatch } from "@/hooks";
import { addToCart } from "@/redux/feature/cartSlice";
import { StarIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import Currency from "react-currency-formatter";

interface ProductItemProps {}

const ProductItem: React.FC<ProductItemProps> = () => {
  // Math.floor(Math.random() * (MAX_RATING - MIN_RATING _1)) + MINRATING
  const [rating, setRating] = useState<number>(2);
  const dispatch = useAppDispatch()

  const handleAddToCart = async() => {
    dispatch(addToCart("bbb"))
  }

  return (
    <div className='relative flex flex-col m-5 bg-white  z-30 p-10 rounded-md'>
      <p className='absolute top-2 right-2 text-xs italic text-gray-400'>
        category
      </p>
      {/* <Image
        src='https://images-na.ssl-images-amazon.com/images/W/WEBP_402378-T2/images/G/01/AmazonExports/Fuji/2021/September/DashboardCards/Fuji_Desktop_Dash_Kindle_1x._SY304_CB639752818_.jpg'
        width={200}
        height={300}
      /> */}
      <img
        src='https://images-na.ssl-images-amazon.com/images/W/WEBP_402378-T2/images/G/01/AmazonExports/Fuji/2021/September/DashboardCards/Fuji_Desktop_Dash_Kindle_1x._SY304_CB639752818_.jpg'
        className='w-full max-h-[350px] object-contain rounded-lg'
      />
      <h4 className='my-3 '>Sports Research supplements</h4>
      <div className='flex items-center'>
        {Array(rating)
          .fill(rating)
          .map((_, i) => (
            <StarIcon className='h-5 text-yellow-500' key={i} />
          ))}
      </div>
      <p className='text-xs my-2 line-clamp-2'>
        description snippet Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Omnis voluptates officia, modi voluptatibus cupiditate vitae
        dolores ipsa ad assumenda placeat temporibus amet hic minima accusamus,
        reprehenderit totam commodi, aut adipisci et! Quis?
      </p>
      <div className='mb-5'>
        <Currency quantity={222} currency='GBP' />
      </div>
      {/* has Price  */}
      <div className='flex items-center space-x-2 -mt-5'>
        <img className='w-12' src='https://links.papareact.com/fdw' alt='' />
        <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
      </div>
      <button className='mt-auto btn'>Add to cart</button>
    </div>
  );
};

export default ProductItem;
