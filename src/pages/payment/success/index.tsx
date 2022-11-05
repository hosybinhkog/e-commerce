import PrivateRoute from "@/layouts/auth/PrivateRoute";
import LayoutMain from "@/layouts/commom/LayoutMain";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";

const Success: NextPage = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <PrivateRoute>
      <LayoutMain>
        <div className='my-5 mx-5'>
          <h1 className='text-3xl font-extrabold text-gray-700 mb-4'>
            Your order has been successfully
          </h1>
          <h3 className='pl-4 border-4 border-l-gray-400 text-xl font-semibold text-gray-600 '>
            Thanks for you
          </h3>
          <p className='text-base text-gray-400 mb-2'>
            Amazone - hosybinhkog - hutech
          </p>
          <div className='text-xl font-extrabold text-blue-400  underline'>
            <Link href='/user/order'>Go to your orders</Link>
          </div>
        </div>
      </LayoutMain>
    </PrivateRoute>
  );
};

export default Success;
