import LayoutMain from "@/layouts/commom/LayoutMain";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";

const Cart: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Cart - Amazon</title>
      </Head>
      <LayoutMain>
        <div>Cart</div>
      </LayoutMain>
    </div>
  );
};

export default Cart;
