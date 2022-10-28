import ProductCartItem from "@/components/Products/ProductCartItem";
import { useAppSelector } from "@/hooks";
import LayoutMain from "@/layouts/commom/LayoutMain";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import Currency from "react-currency-formatter";

const Cart: NextPage = () => {
  const { cartItems } = useAppSelector((state) => state.cart);

  const total = cartItems.reduce((pre, current) => {}, 0);

  const { data: session } = useSession();
  return (
    <div>
      <Head>
        <title>Cart - Amazon</title>
      </Head>
      <LayoutMain>
        <div className='lg:flex'>
          <div className='flex-grow m-5 shadow-sm'>
            <Image
              width={1020}
              height={250}
              src='https://links.papareact.com/ikj'
              objectFit='contain'
            />
            <div className='flex flex-col p-5 md:space-y-10 space-y-3 bg-white'>
              {cartItems.length > 0 ? (
                <h1 className='text-3xl font-semibold border-b pb-4'>
                  Your Cart Shopping
                </h1>
              ) : (
                <div className='flex gap-2 items-center flex-col md:flex-row md:justify-start justify-center text-center md:text-left '>
                  <Image
                    width={1020}
                    height={250}
                    objectFit='contain'
                    src={require("@assets/img/cartemty.svg")}
                  />
                  <div className='flex-grow'>
                    <h3 className='text-lg font-bold'>
                      Your Amazon Cart is empty
                    </h3>
                    <span className='text-green-400 text-xs hover:underline cursor-pointer'>
                      Shop today's deals
                    </span>
                    <div className='flex gap-2 md:justify-start justify-center'>
                      <button className='btn'>Sign in</button>
                      <button className='px-3 py-2 border rounded-md border-gray-300 '>
                        Register now
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* <ProductCartItem /> */}
            </div>
          </div>
          <div className='flex flex-col bg-white p-10 shadow-md'>
            {cartItems.length > 0 && (
              <React.Fragment>
                <h2 className='whitespace-nowrap'>
                  Subtotal {cartItems.length} items:
                  <span className='font-bold'>
                    <Currency quantity='900000' currency='GBP' />
                  </span>
                </h2>
                <button
                  role={"link"}
                  disabled={!session}
                  className={`btn mt-2 ${
                    !session &&
                    "from-gray-300 to-gray-500 border-gray-200  text-gray-300"
                  }`}
                >
                  {session ? "Proceed to checkout" : "Please! Sign in"}
                </button>
              </React.Fragment>
            )}
          </div>
        </div>
      </LayoutMain>
    </div>
  );
};

export default Cart;
