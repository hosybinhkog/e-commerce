import { ProductCartItem } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import LayoutMain from "@/layouts/commom/LayoutMain";
import { removeItemsFormCart } from "@/redux/actions/cart.actions";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Currency from "react-currency-formatter";
import toast from "react-hot-toast";

const Cart: NextPage = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const total = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  // .toLocaleString("vi", { style: "currency", currency: "GBP" });
  // FORMAT TO VND

  const handlleRemoveItem = (id) => {
    const idNoti = toast.loading("Loading...");
    //@ts-ignore
    dispatch(removeItemsFormCart(id));
    toast.success("Remove success...", { id: idNoti });
  };

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
                <>
                  <h1 className='text-3xl font-semibold border-b pb-4'>
                    Your Cart Shopping
                  </h1>
                  {cartItems.map((item) => (
                    <ProductCartItem
                      handlleRemoveItem={handlleRemoveItem}
                      productCart={item}
                      key={item.product}
                    />
                  ))}
                </>
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
            </div>
          </div>
          <div className='flex flex-col bg-white p-10 shadow-md'>
            {cartItems?.length && (
              <React.Fragment>
                <h2 className='whitespace-nowrap'>
                  Subtotal {cartItems?.length} items:
                  <span className='font-bold'>
                    <Currency quantity={total || 0} currency='GBP' />
                  </span>
                </h2>
                <button
                  onClick={() => {
                    if (user) router.push("/shipping");
                    router.push("/login");
                  }}
                  role={"link"}
                  disabled={!user}
                  className={`btn mt-2 ${
                    !user &&
                    "from-gray-300 to-gray-500 border-gray-200  text-gray-300"
                  }`}
                >
                  {user ? "Proceed to checkout" : "Please! Sign in"}
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
