import { Loading } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import Layout from "@/layouts/admin/Layout";
import { getCategories } from "@/redux/actions/category.actions";
import { Pagination } from "antd";
import moment from "moment";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Categies: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    loading: loadingCategories,
    categories,
    error,
  } = useAppSelector((state) => state.categories);

  const [page, setPage] = useState<number>(1);
  const sizePage = 10;

  const size = page === 1 ? 0 : page * sizePage;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    // @ts-ignore
    dispatch(getCategories());
  }, [dispatch, error]);
  return (
    <>
      {loadingCategories ? (
        <Loading />
      ) : (
        <Layout>
          <Head>
            <title>CategoriesManage</title>
          </Head>
          <div className='my-5 mx-5'>
            <h1 className='text-3xl font-extrabold text-gray-700 mb-4'>
              CategoriesManage
            </h1>
            <h3 className='pl-4 border-4 border-l-gray-400 text-xl font-semibold text-gray-600 '>
              Admin Page
            </h3>
            <p className='text-base text-gray-400 mb-2'>
              Amazone - hosybinhkog - hutech
            </p>
            <div className='flex flex-col'>
              <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
                  <div className='overflow-x-auto'>
                    <table className='min-w-full'>
                      <thead className='border-b'>
                        <tr>
                          <th
                            scope='col'
                            className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                          >
                            #
                          </th>
                          <th
                            scope='col'
                            className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                          >
                            Img
                          </th>
                          <th
                            scope='col'
                            className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                          >
                            Title
                          </th>
                          <th
                            scope='col'
                            className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                          >
                            Description
                          </th>
                          <th
                            scope='col'
                            className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                          >
                            CreatedAt
                          </th>
                          <th
                            scope='col'
                            className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories?.length &&
                          categories
                            ?.slice(size, size + sizePage)
                            .map((item, index) => (
                              <tr
                                key={item._id}
                                className='border-b rounded-md'
                              >
                                <td className='px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900'>
                                  {index + 1}
                                </td>
                                <td className='text-md text-gray-900 font-semibold whitespace-nowrap'>
                                  <img
                                    className='h-14 w-14'
                                    src={item!.img?.url}
                                    alt=''
                                  />
                                </td>
                                <td className='text-md text-gray-900 font-semibold px-6 py-4 whitespace-nowrap max-w-[100px] truncate'>
                                  {item?.name}
                                </td>
                                <td className='text-md text-gray-900 font-semibold px-6 py-4 whitespace-nowrap max-w-[100px] truncate'>
                                  {item?.description}
                                </td>

                                <td className='text-md text-gray-900 font-semibold px-6 py-4 whitespace-nowrap'>
                                  {moment(item?.createdAt).format(
                                    "MMMM Do YYYY"
                                  )}
                                </td>
                                <td className='text-md text-gray-900 font-semibold px-6 py-4 whitespace-nowrap'>
                                  <button
                                    type='button'
                                    className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 disabled:opacity-50'
                                    disabled
                                  >
                                    Delete
                                  </button>
                                  <button
                                    onClick={() =>
                                      router.push(
                                        `/dashboard/category/update/${item?._id}`
                                      )
                                    }
                                    type='button'
                                    className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() =>
                                      router.push(
                                        `/dashboard/category/${item?._id}`
                                      )
                                    }
                                    type='button'
                                    className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
                                  >
                                    views
                                  </button>
                                </td>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                    <div className=' py-2 flex items-center justify-center'>
                      <Pagination
                        current={page}
                        onChange={(e) => setPage(e)}
                        pageSize={sizePage}
                        total={categories.length}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => router.push("/dashboard/category/new")}
              className='text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 mb-2'
            >
              Create new category
            </button>
          </div>
        </Layout>
      )}
    </>
  );
};

export default Categies;
