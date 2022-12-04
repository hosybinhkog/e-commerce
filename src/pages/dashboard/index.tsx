import { StatusCard } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import Layout from "@/layouts/admin/Layout";
import { fetchCustomers } from "@/redux/actions/admin.customer.actions";
import { getCategories } from "@/redux/actions/category.actions";
import { getProduct } from "@/redux/actions/product.actions";
import {
  QrcodeIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  ViewListIcon,
} from "@heroicons/react/solid";
import { Pagination } from "antd";
import Currency from "react-currency-formatter";
import moment from "moment";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchOrders, updateStatus } from "@/redux/actions/order.actions";

const Dashboard: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { loading, products, error, productsCount, resultPerPage } =
    useAppSelector((state) => state.products);

  const { customers } = useAppSelector((state) => state.fetchAdminCustomer);
  const { loading: loadingCategories, categories } = useAppSelector(
    (state) => state.categories
  );
  const { orders, total, totalAmount } = useAppSelector(
    (state) => state.fetchOrders
  );

  const handleUpdateStatusChange = (idOrder) => {
    const id = toast.loading("Update status....");
    // @ts-ignore
    dispatch(updateStatus(idOrder));
    toast.remove(id);
  };

  const [page, setPage] = useState<number>(1);
  const sizePage = 10;
  const size = page === 1 ? 0 : page * sizePage;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    // @ts-ignore
    dispatch(getProduct());
    // @ts-ignore
    dispatch(fetchCustomers());
    // @ts-ignore
    dispatch(getCategories());
    // @ts-ignore
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <Layout>
      <Head>
        <title>Admin - Dashboard</title>
      </Head>
      <div className='my-5 mx-5'>
        <h1 className='text-3xl font-extrabold text-gray-700 mb-4'>
          Dashboard
        </h1>
        <h3 className='pl-4 border-4 border-l-gray-400 text-xl font-semibold text-gray-600 '>
          Admin Page
        </h3>
        <p className='text-base text-gray-400 mb-2 mt-2'>
          Amazone - hosybinhkog - hutech
        </p>
        <div>
          <div></div>
          <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-x-4 mt-2'>
            <div
              className='cursor-pointer'
              onClick={() => router.push("/dashboard/product")}
            >
              <StatusCard
                icon={QrcodeIcon}
                title='Products'
                count={productsCount}
              />
            </div>
            <div
              className='cursor-pointer'
              onClick={() => router.push("/dashboard/customers")}
            >
              <StatusCard
                icon={UserGroupIcon}
                title='Customers'
                count={customers?.length ? customers?.length : 0}
              />
            </div>
            <div
              className='cursor-pointer'
              onClick={() => router.push("/dashboard/category")}
            >
              <StatusCard
                icon={ViewListIcon}
                title='Categories'
                count={categories?.length ? categories.length : 0}
              />
            </div>

            <div
              className='cursor-pointer'
              onClick={() => router.push("/dashboard/category")}
            >
              <StatusCard
                icon={ShoppingCartIcon}
                title='Orders'
                count={orders?.length ? orders.length : 0}
              />
            </div>
          </div>
          <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-x-4 mt-2'>
            <button
              onClick={() => router.push("/dashboard/product/new")}
              className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
            >
              Create product
            </button>
            <button
              onClick={() => router.push("/dashboard/category/new")}
              className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
            >
              Create categories
            </button>
          </div>
          <div className='flex flex-col'>
            <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
                <div className='overflow-x-auto'>
                  <h2 className='py-2 text-4xl font-semibold leading-6 text-black'>
                    Customers
                  </h2>
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
                    <button
                      onClick={() => router.push("/dashboard/customers")}
                      type='button'
                      className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                    >
                      See all!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className='my-8 h-px bg-gray-200 border-0 dark:bg-gray-700'></hr>
          <div className='flex flex-col mt-2  '>
            <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
                <h2 className='py-2 text-4xl font-semibold leading-6 text-black'>
                  Customers
                </h2>
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
                            <tr key={item._id} className='border-b rounded-md'>
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
                                {moment(item?.createdAt).format("MMMM Do YYYY")}
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
          <hr className='my-8 h-px bg-gray-200 border-0 dark:bg-gray-700'></hr>
          <div className='flex flex-col mb-4'>
            <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
                <div className='overflow-x-auto'>
                  <h2 className='py-2 text-4xl font-semibold leading-6 text-black'>
                    Products
                  </h2>
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
                          Price
                        </th>
                        <th
                          scope='col'
                          className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                        >
                          Stock - outStock
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
                      {products?.length &&
                        products?.map((item, index) => (
                          <tr key={item._id} className='border-b rounded-md'>
                            <td className='px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900'>
                              {index + 1}
                            </td>
                            <td className='text-md text-gray-900 font-semibold whitespace-nowrap'>
                              <img
                                className='h-14 w-14'
                                src={item!.imgs[0]!.url}
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
                              <Currency
                                quantity={item?.price || 0}
                                currency='GBP'
                              />
                            </td>
                            <td className='text-md text-gray-900 font-semibold px-6 py-4 whitespace-nowrap'>
                              {item.Stock}
                            </td>
                            <td className='text-md text-gray-900 font-semibold px-6 py-4 whitespace-nowrap'>
                              {moment(item?.createdAt).format("MMMM Do YYYY")}
                            </td>
                            <td className='text-md text-gray-900 font-semibold px-6 py-4 whitespace-nowrap'>
                              <button
                                type='button'
                                className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className=' py-2 flex items-center justify-center'>
                    <button
                      onClick={() => router.push("/dashboard/product")}
                      type='button'
                      className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                    >
                      See all!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
