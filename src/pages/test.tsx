import AccountCard from "@/components/AccountCard";
import LayoutMain from "@/layouts/commom/LayoutMain";
import { NextPage } from "next";
import React from "react";

const test: NextPage = () => {
  return (
    <LayoutMain>
      <div className='max-w-[800px] mx-auto py-[4rem]'>
        <AccountCard
          description='Manage, add, or remove user profiles for personalized experiences'
          href='/'
          src='https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/account._CB660668669_.png'
          title='Your Profile'
        />
      </div>
    </LayoutMain>
  );
};

export default test;
