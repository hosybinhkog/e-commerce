import { Loading } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import Layout from "@/layouts/admin/Layout";
import { clearErrors, getDetails } from "@/redux/actions/product.actions";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Currency from "react-currency-formatter";
import toast from "react-hot-toast";

const ProductDetailsViews = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { loading, product, error } = useAppSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (router.query.id)
      // @ts-ignore
      dispatch(getDetails(router.query.id));

    if (error) {
      toast.error(error);
      router.push("/dashboard/product");
      //@ts-ignore
      dispatch(clearErrors());
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [dispatch, router.query.id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Layout>
          {product && (
            <div className='my-5 mx-5'>
              <h1 className='text-3xl font-extrabold text-gray-700 mb-4'>
                Product details {product._id}
              </h1>
              <h3 className='pl-4 border-4 border-l-gray-400 text-xl font-semibold text-gray-600 '>
                Admin Page
              </h3>
              <p className='text-base text-gray-400 mb-2'>
                Amazone - hosybinhkog - hutech
              </p>
              <h1 className='font-semibold text-xl text-gray-800'>
                {product.name}
              </h1>
              <p className='mt-2 text-xs text-gray-400'>
                {product.description}
              </p>
              <div className='my-3'>
                <span className='mt-2 text-gray-800 title-font font-medium text-2xl'>
                  Price :
                </span>
                <span className='title-font font-medium text-2xl text-gray-900'>
                  <Currency quantity={product.price || 0} currency='GBP' />
                </span>
              </div>
              <div className='flex gap-4'>
                {product?.imgs?.length &&
                  product?.imgs?.map((item) => (
                    <div key={item.public_id}>
                      <img
                        alt='ecommerce'
                        className='w-[200px] h-[200px] rounded-md'
                        src={
                          item.url ||
                          "https://www.whitmorerarebooks.com/pictures/medium/2465.jpg"
                        }
                      />
                    </div>
                  ))}
              </div>
              <div className='mt-2'>
                <span className='text-xs font-semibold'>
                  Created At: {product?.createdAt ? product?.createdAt : ""}
                </span>
              </div>
              <button
                onClick={() => router.push("/dashboard/product/new")}
                className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
              >
                Create product
              </button>
              <button
                onClick={() =>
                  router.push(`/dashboard/product/update/${product._id}`)
                }
                className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
              >
                edit product
              </button>
            </div>
          )}
        </Layout>
      )}
    </>
  );
};

export default ProductDetailsViews;
