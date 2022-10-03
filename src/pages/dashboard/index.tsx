import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "@/layouts/admin/Layout";
import React from "react";

const Dashboard: NextPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <p>Layout</p>
    </Layout>
  );
};

export default Dashboard;
