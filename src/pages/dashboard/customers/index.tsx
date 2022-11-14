import { Loading } from "@/components";
import { CLEAR_ERRORS_FETCH_CUSTOMER } from "@/constants/redux.contants";
import { useAppDispatch, useAppSelector } from "@/hooks";
import Layout from "@/layouts/admin/Layout";
import { fetchCustomers } from "@/redux/actions/admin.customer.actions";
import { Pagination } from "antd";
import moment from "moment";
import { NextPage } from "next";
import { useEffect } from "react";
import toast from "react-hot-toast";

const CustomersManage: NextPage = () => {
  const dispatch = useAppDispatch();
  const { error, loading, customers } = useAppSelector(
    (state) => state.fetchAdminCustomer
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      // @ts-ignore
      dispatch({ type: CLEAR_ERRORS_FETCH_CUSTOMER });
    }

    // @ts-ignore
    dispatch(fetchCustomers());
  }, [error, dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Layout>
          <div className='my-5 mx-5'>
            <h1 className='text-3xl font-extrabold text-gray-700 mb-4'>
              CustomersManage
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
                            Username
                          </th>
                          <th
                            scope='col'
                            className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                          >
                            Email
                          </th>
                          <th
                            scope='col'
                            className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                          >
                            Roles
                          </th>
                          <th
                            scope='col'
                            className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                          >
                            Register
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
                        {customers?.length &&
                          customers?.map((item, index) => (
                            <tr key={item._id} className='border-b rounded-md'>
                              <td className='px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900'>
                                {index + 1}
                              </td>
                              <td className='text-md text-gray-900 font-semibold whitespace-nowrap'>
                                <img
                                  className='h-14 w-14'
                                  src={item!.avatar!.url}
                                  alt=''
                                />
                              </td>
                              <td className='text-md text-gray-900 font-semibold px-6 py-4 whitespace-nowrap max-w-[100px] truncate'>
                                {item?.username}
                              </td>
                              <td className='text-md text-gray-900 font-semibold px-6 py-4 whitespace-nowrap max-w-[100px] truncate'>
                                {item?.email}
                              </td>
                              <td className='text-md text-gray-900 font-semibold px-6 py-4 whitespace-nowrap'>
                                {item?.role}
                              </td>
                              <td className='text-md text-gray-900 font-semibold px-6 py-4 whitespace-nowrap'>
                                {item.isGoogle ? "Google" : "My website"}
                              </td>
                              <td className='text-md text-gray-900 font-semibold px-6 py-4 whitespace-nowrap'>
                                {moment(item?.createdAt).format("MMMM Do YYYY")}
                              </td>
                              <td className='text-md text-gray-900 font-semibold px-6 py-4 whitespace-nowrap'>
                                <button
                                  type='button'
                                  className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
                                >
                                  Views
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <div className=' py-2 flex items-center justify-center'>
                      <Pagination defaultCurrent={1} total={50} />;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default CustomersManage;
