import { useAppDispatch, useAppSelector } from "@/hooks";
import Layout from "@/layouts/admin/Layout";
import { getProduct } from "@/redux/actions/product.actions";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Dashboard: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { loading, products, error, productsCount, resultPerPage } =
    useAppSelector((state) => state.products);

  useEffect(() => {
    // @ts-ignore
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <Layout>
      <Head>
        <title>Admin - Dashboard</title>
      </Head>
      <div></div>
    </Layout>
  );
};

export default Dashboard;
