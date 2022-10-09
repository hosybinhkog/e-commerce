import { useAppDispatch, useAppSelector } from "@/hooks";
import Layout from "@/layouts/admin/Layout";
import { getProduct } from "@/redux/actions/product.actions";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Dashboard: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { loading, products, error, productsCount, resultPerPage } =
    useAppSelector((state) => state.products);

  console.log(products);

  useEffect(() => {
    // @ts-ignore
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <Layout>
      <p>Layout</p>
    </Layout>
  );
};

export default Dashboard;
