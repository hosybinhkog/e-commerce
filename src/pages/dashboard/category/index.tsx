import Layout from "@/layouts/admin/Layout";
import { NextPage } from "next";
import Head from "next/head";

const Categies: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Manage Categories</title>
      </Head>
      <h5 className='text-2xl font-extrabold text-gray-700'>
        Manage Categories
      </h5>
    </Layout>
  );
};

export default Categies;
