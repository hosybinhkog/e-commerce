import { Product } from "@/interfaces";
import { MinusSmIcon } from "@heroicons/react/outline";
import { PlusIcon } from "@heroicons/react/solid";
import { Carousel, InputNumber, Rate } from "antd";
import React from "react";
import Currency from "react-currency-formatter";

interface ProductItem {
  product: Product;
  quanlity: number;
  decreaseQuantity: () => void;
  imcreaseQuantity: () => void;
  handleAddToCart: () => void;
}

const ProductItem: React.FC<ProductItem> = ({
  product,
  quanlity,
  decreaseQuantity,
  imcreaseQuantity,
  handleAddToCart,
}) => {
  const isImage = product?.imgs ? product.imgs.map((item) => item.url) : [];

  return (
    <>
      {product && (
        <section className='text-gray-700 body-font overflow-hidden bg-white'>
          <div className='container px-5 py-24 mx-auto'>
            <div className='lg:w-4/5 mx-auto flex flex-wrap'>
              <div className='lg:w-1/2 w-full'>
                <Carousel autoplay dots speed={2000} dotPosition='bottom'>
                  {isImage.length &&
                    isImage?.map((item) => (
                      <div key={item}>
                        <img
                          alt='ecommerce'
                          className=''
                          src={
                            item ||
                            "https://www.whitmorerarebooks.com/pictures/medium/2465.jpg"
                          }
                        />
                      </div>
                    ))}
                </Carousel>
              </div>

              <div className='lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0'>
                <h2 className='text-sm title-font text-gray-500 tracking-widest'>
                  {product?.category || ""}
                </h2>
                <h1 className='text-gray-900 text-3xl title-font font-medium mb-1 line-clamp-3'>
                  {product?.name || ""}
                </h1>
                <div className='flex mb-4'>
                  <span className='flex items-center'>
                    <Rate value={product.rating} disabled />
                    {product.rating === 0 && "0 rating"}
                    <span className='text-gray-600 ml-3'>
                      {product?.reviews?.length} reviews
                    </span>
                  </span>
                  <span className='flex ml-3 pl-3 py-2 border-l-2 border-gray-200'>
                    <a className='text-gray-500'>
                      <svg
                        fill='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        className='w-5 h-5'
                        viewBox='0 0 24 24'
                      >
                        <path d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'></path>
                      </svg>
                    </a>
                    <a className='ml-2 text-gray-500'>
                      <svg
                        fill='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        className='w-5 h-5'
                        viewBox='0 0 24 24'
                      >
                        <path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'></path>
                      </svg>
                    </a>
                    <a className='ml-2 text-gray-500'>
                      <svg
                        fill='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        className='w-5 h-5'
                        viewBox='0 0 24 24'
                      >
                        <path d='M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z'></path>
                      </svg>
                    </a>
                  </span>
                </div>
                <p className='leading-relaxed'>
                  {product?.description ||
                    "Fam locavore kickstarter distillery. Mixtape chillwave tumericsriracha taximy chia microdosing tilde DIY. XOXO fam indxgojuiceramps cornhole raw denim forage brooklyn. Everyday carry+1 seitan poutine tumeric. Gastropub blue bottle austinlisticle pour-over, neutra jean shorts keytar banjo tattooedumami cardigan."}
                </p>
                <div className='flex gap-2 items-center'>
                  <span>Quanlity</span>
                  <MinusSmIcon
                    onClick={imcreaseQuantity}
                    className='h-5 w-5 cursor-pointer p-1 rounded-full bg-yellow-400 text-gray-800 flex items-center justify-center hover:scale-105'
                  />
                  <InputNumber
                    min={1}
                    max={product.Stock}
                    value={quanlity}
                    // onChange={}
                  />
                  <PlusIcon
                    onClick={decreaseQuantity}
                    className='h-5 w-5 cursor-pointer p-1 rounded-full bg-yellow-400 text-gray-800 flex items-center justify-center hover:scale-105'
                  />
                </div>
                <div className='flex'>
                  <span className='title-font font-medium text-2xl text-gray-900'>
                    <Currency quantity={product.price || 0} currency='GBP' />
                  </span>
                  <button
                    className='flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded'
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </button>
                  <button className='rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4'>
                    <svg
                      fill='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='w-5 h-5'
                      viewBox='0 0 24 24'
                    >
                      <path d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z'></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductItem;
