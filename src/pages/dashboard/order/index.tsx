import { Loading } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import Layout from "@/layouts/admin/Layout";
import {
  clearErrors,
  fetchOrders,
  updateStatus,
} from "@/redux/actions/order.actions";
import { Pagination } from "antd";
import moment from "moment";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Currency from "react-currency-formatter";
import toast from "react-hot-toast";

const OrderManage: NextPage = () => {
  const dispatch = useAppDispatch();
  const { loading, error, orders, total, totalAmount } = useAppSelector(
    (state) => state.fetchOrders
  );
  const { success, error: errorUpdateStatus } = useAppSelector(
    (state) => state.updateOrderStatus
  );

  const [page, setPage] = useState<number>(1);
  const sizePage = 10;
  const size = page === 1 ? 0 : page * sizePage;

  const handleUpdateStatusChange = (idOrder) => {
    const id = toast.loading("Update status....");
    // @ts-ignore
    dispatch(updateStatus(idOrder));
    toast.remove(id);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      // @ts-ignore
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Update status success");
    }
    // @ts-ignore
    dispatch(fetchOrders());
  }, [error, dispatch, success]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Layout>
          <Head>
            <title>OrdersManage</title>
          </Head>
          <div className='my-5 mx-5'>
            <h1 className='text-3xl font-extrabold text-gray-700 mb-4'>
              OrdersManage
            </h1>
            <h3 className='pl-4 border-4 border-l-gray-400 text-xl font-semibold text-gray-600 '>
              Admin Page
            </h3>
            <p className='text-base text-gray-400 mb-2'>
              Amazone - hosybinhkog - hutech
            </p>
            <div className='flex flex-col gap-3'>
              <p className='text-base text-gray-600 font-semibold'>
                TotalAmount:{" "}
                <span className='text-blue-400'>
                  <Currency quantity={totalAmount || 0} currency='GBP' />
                </span>
              </p>
              <p className='text-base text-gray-600 font-semibold'>
                total: <span className='text-blue-400'>{total}</span>
              </p>
            </div>
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
                            Id user
                          </th>
                          <th
                            scope='col'
                            className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                          >
                            OrderItems
                          </th>
                          <th
                            scope='col'
                            className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                          >
                            Status
                          </th>
                          <th
                            scope='col'
                            className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                          >
                            Info Payment
                          </th>
                          <th
                            scope='col'
                            className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                          >
                            totalPrice
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
                        {orders?.length &&
                          orders
                            ?.slice(size, size + sizePage)
                            .map((item, index) => (
                              <tr
                                key={item._id}
                                className='border-b rounded-md'
                              >
                                <td className='px-6 py-4  text-md font-medium text-gray-900'>
                                  {index + 1}
                                </td>
                                <td className='text-md text-gray-900 font-semibold  max-w-[100px] break-all '>
                                  {item.user}
                                </td>
                                <td className='text-md text-gray-900 font-semibold px-6 py-4 break-all  max-w-[100px] truncate'>
                                  {item?.orderItems?.length}
                                </td>
                                <td className='text-md text-gray-900 font-semibold px-6 py-4 break-all  max-w-[100px] truncate'>
                                  {item?.orderStatus}
                                </td>
                                <td className='text-md text-gray-900 font-semibold px-6 py-4 max-w-[100px] break-all'>
                                  <div className='flex flex-col'>
                                    <span>id: {item?.paymentInfo?.id}</span>
                                    <span className='text-blue-400'>
                                      Status: {item?.paymentInfo?.status}
                                    </span>
                                  </div>
                                </td>
                                <td className='text-md text-gray-900 font-semibold px-6 py-4 '>
                                  <Currency
                                    quantity={item?.totalPrice || 0}
                                    currency='GBP'
                                  />
                                </td>

                                <td className='text-md text-gray-900 font-semibold px-6 py-4 whitespace-nowrap'>
                                  {moment(item?.createdAt).format(
                                    "MMMM Do YYYY"
                                  )}
                                </td>
                                <td className='text-md text-gray-900 font-semibold px-6 py-4 whitespace-nowrap'>
                                  <button
                                    onClick={() =>
                                      handleUpdateStatusChange(item._id)
                                    }
                                    type='button'
                                    className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
                                  >
                                    Update status
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
                        total={total}
                        pageSize={sizePage}
                      />
                      ;
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

export default OrderManage;
