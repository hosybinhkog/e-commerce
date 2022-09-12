import { NextPage } from "next";
import Head from "next/head";
import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutMainProps {
  children: ReactNode;
}

const LayoutMain: NextPage<LayoutMainProps> = ({ children }) => {
  return (
    <React.Fragment>
      <Head>
        <meta name='viewport' content='width=1920, user-scalable=no' />
      </Head>
      <div className='w-full max-w-[1920px] bg-[#eaeded]'>
        <Header />
        <main className='min-h-screen max-w-screen-2xl mx-auto'>
          {children}
        </main>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default LayoutMain;
