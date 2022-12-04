import { useAppDispatch } from "@/hooks";
import { Product } from "@/interfaces";
import { addItemsToCart } from "@/redux/actions/cart.actions";
import { Rate } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Currency from "react-currency-formatter";
import toast from "react-hot-toast";

interface ProductItemProps {
  product: Product;
  imageHeight?: boolean;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, imageHeight }) => {
  // Math.floor(Math.random() * (MAX_RATING - MIN_RATING _1)) + MINRATING
  const [rating, setRating] = useState<number>(product.rating);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleAddToCart = (e) => {
    e.preventDefault();

    // @ts-ignore
    dispatch(addItemsToCart(product._id, 1));
    toast.success("Add to successfully", {
      duration: 2000,
      position: "bottom-center",
    });
  };

  const handleClickDetails = () =>
    router.push(`/product/details/${product._id}`);

  return (
    <div className='relative flex flex-col m-5 bg-white  z-30 p-10 rounded-md'>
      <p className='absolute top-2 right-2 text-xs italic text-gray-400'>
        {product.category ? product.category : "category"}
      </p>
      <img
        onClick={handleClickDetails}
        src={
          product.imgs[0].url ||
          "https://images-na.ssl-images-amazon.com/images/W/WEBP_402378-T2/images/G/01/AmazonExports/Fuji/2021/September/DashboardCards/Fuji_Desktop_Dash_Kindle_1x._SY304_CB639752818_.jpg"
        }
        className={`w-full h-full ${
          imageHeight ? `max-h-[200px]` : "max-h-[350px]"
        } cursor-pointer object-contain rounded-lg`}
      />
      <h4 onClick={handleClickDetails} className='my-3 cursor-pointer'>
        {product.name}
      </h4>
      <div className='flex items-center'>
        <Rate value={product.rating} disabled />
        {product.rating === 0
          ? "0 rating"
          : `${product.rating.toFixed(1)} ratings`}
      </div>
      <p className='text-xs my-2 line-clamp-2'>
        {product.description ||
          "description snippet Lorem ipsum dolor sit amet, consectetur adipisicingelit. Omnis voluptates officia, modi voluptatibus cupiditate vitaedolores ipsa ad assumenda placeat temporibus amet hic minima accusamus,reprehenderit totam commodi, aut adipisci et! Quis?"}
      </p>
      <div className='mb-5'>
        <Currency quantity={product.price} currency='GBP' />
      </div>
      {/* has Price  */}
      <div className='flex items-center space-x-2 -mt-5'>
        <img className='w-12' src='https://links.papareact.com/fdw' alt='' />
        <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
      </div>
      <button
        disabled={!product.Stock}
        onClick={handleAddToCart}
        className='mt-auto btn disabled:opacity-50'
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductItem;
