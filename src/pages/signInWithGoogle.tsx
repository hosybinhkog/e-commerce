import { GetServerSideProps, NextPage } from "next";
import { getProviders, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

interface signInWithGoogleProps {
  providers: Awaited<ReturnType<typeof getProviders>>;
}

const signInWithGoogle: NextPage<signInWithGoogleProps> = ({ providers }) => {
  const { data: session } = useSession();
  const { name, id } = providers.google;
  const router = useRouter();

  const handleLoginWithGoogle = () => signIn(id, { callbackUrl: "/" });

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  return (
    <div className='flex flex-col justify-center items-center bg-amazone_blue-light h-screen'>
      <div className='mb-6'>
        <Image
          src='https://links.papareact.com/f90'
          width={200}
          height={200}
          objectFit='contain'
          className='cursor-pointer'
        />
      </div>
      <button
        className='bg-yellow-300 text-white px-4 py-3 rounded-full'
        onClick={handleLoginWithGoogle}
      >
        Login with {name}
      </button>
    </div>
  );
};

export default signInWithGoogle;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
