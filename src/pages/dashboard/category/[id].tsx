import { Loading } from "@/components";
import { CLEAR_ERRORS } from "@/constants/redux.contants";
import { useAppDispatch, useAppSelector } from "@/hooks";
import Layout from "@/layouts/admin/Layout";
import { getDetails } from "@/redux/actions/category.actions";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";

const CategoryViews: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { loading, category, error } = useAppSelector(
    (state) => state.categoryDetails
  );

  useEffect(() => {
    if (router.query.id)
      // @ts-ignore
      dispatch(getDetails(router.query?.id));

    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERRORS });
      router.push("/dashboard/category");
    }
  }, [dispatch, router.query?.id, error]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Layout>
          <Head>
            <title>Categories details</title>
          </Head>
          <div className='my-5 mx-5'>
            <h1 className='text-3xl font-extrabold text-gray-700 mb-4'>
              Categories - {router.query?.id}
            </h1>
            <h3 className='pl-4 border-4 border-l-gray-400 text-xl font-semibold text-gray-600 '>
              Admin Page
            </h3>
            <p className='text-base text-gray-400 mb-2'>
              Amazone - hosybinhkog - hutech
            </p>
            <div className='my-5'>
              <h5 className='text-4xl font-semibold mb-2'>{category?.name}</h5>
              <p className=''>{category?.description || "Not description"}</p>
              <img
                src={category?.img?.url}
                className='mt-5 w-[500px] rounded-lg object-cover'
                alt=''
              />
              <div className='flex gap-2 mt-2'>
                <button
                  onClick={() =>
                    router.push(`/dashboard/category/update/${category?._id}`)
                  }
                  type='button'
                  className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
                >
                  Edit
                </button>
                <button
                  onClick={() => router.push("/dashboard/category/new")}
                  className='text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 mb-2'
                >
                  Create new category
                </button>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default CategoryViews;
