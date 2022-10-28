import { NextPage } from "next";
import Head from "next/head";
import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutMainProps {
  children: ReactNode;
  bgWhite?: boolean;
  wFull?: boolean;
}

const LayoutMain: NextPage<LayoutMainProps> = ({
  children,
  bgWhite,
  wFull,
}) => {
  return (
    <React.Fragment>
      <Head>
        <meta name='viewport' content='width=1920, user-scalable=no' />
      </Head>
      <div
        className={`w-full max-w-[1920px]  ${
          bgWhite ? "bg-white" : "bg-[#eaeded]"
        }`}
      >
        <Header />
        <main
          className={`min-h-screen  mx-auto ${
            wFull ? "w-full" : "max-w-screen-2xl"
          }`}
        >
          {children}
        </main>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default LayoutMain;
