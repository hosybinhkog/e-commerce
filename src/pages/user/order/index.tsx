import { Loading } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import PrivateRoute from "@/layouts/auth/PrivateRoute";
import LayoutMain from "@/layouts/commom/LayoutMain";
import { clearErrors, myOrders } from "@/redux/actions/order.actions";
import moment from "moment";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const OrderMe: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [size, setSize] = useState<number>(10);
  const { user, loading: loadingUser } = useAppSelector((state) => state.user);
  const { loading, error, orders } = useAppSelector((state) => state.myOrders);

  useEffect(() => {
    if (error) {
      toast.error(error);
      // @ts-ignore
      dispatch(clearErrors());
    }
    // @ts-ignore
    dispatch(myOrders());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <PrivateRoute>
          <LayoutMain>
            <Head>Order Me</Head>
            <div className='my-5 mx-5'>
              <h1 className='text-3xl font-extrabold text-gray-700 mb-4'>
                Order me
              </h1>
              <h3 className='pl-4 border-4 border-l-gray-400 text-xl font-semibold text-gray-600 '>
                List orders
              </h3>
              <p className='text-base text-gray-400 mb-2'>
                Amazone - {user?.email} - hutech
              </p>
              <div>
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
                                Order Id
                              </th>
                              <th
                                scope='col'
                                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                              >
                                Items Qty
                              </th>
                              <th
                                scope='col'
                                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                              >
                                Amount(total)
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
                                Actions
                              </th>
                              <th
                                scope='col'
                                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                              >
                                CreatedAt
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {!orders?.length && <p>0 orders</p>}
                            {orders?.length > 0 &&
                              orders?.slice(0, size).map((item, index) => (
                                <tr
                                  className='border-b hover:bg-blue-300'
                                  key={item._id}
                                >
                                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 hover:text-white'>
                                    {index + 1}
                                  </td>
                                  <td className='text-sm text-gray-900 hover:text-white font-semibold px-6 py-4 whitespace-nowrap'>
                                    {item.orderItems.length}
                                  </td>
                                  <td className='text-sm text-gray-900 hover:text-white font-semibold px-6 py-4 whitespace-nowrap'>
                                    {item.totalPrice}
                                  </td>
                                  <td className='text-sm text-gray-900 hover:text-white font-semibold px-6 py-4 whitespace-nowrap'>
                                    {item.orderStatus}
                                  </td>
                                  <td
                                    onClick={() =>
                                      router.push(`/user/order/${item._id}`)
                                    }
                                    className='text-sm cursor-pointer text-blue-500 underline font-semibold px-6 py-4 whitespace-nowrap'
                                  >
                                    View
                                  </td>
                                  <td>
                                    {moment(item?.createdAt).format(
                                      "MMMM Do YYYY"
                                    )}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                        <div
                          onClick={() => setSize(orders.length)}
                          className='flex items-center justify-center p-3 bg-blue-300 mt-2 rounded-md text-white font-semibold text-base cursor-pointer underline'
                        >
                          Full order
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </LayoutMain>
        </PrivateRoute>
      )}
    </>
  );
};

export default OrderMe;
