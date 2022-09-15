import Banner from "@/components/Banner";
import Feed from "@/components/Products/Feed";
import LayoutMain from "@/layouts/commom/LayoutMain";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Amazon EB</title>
      </Head>
      <LayoutMain>
        <Banner />
        {/* <Feed /> */}
      </LayoutMain>
    </div>
  );
};

export default Home;
