import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const PageNotFound: NextPage = () => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>404 Not found</title>
        <meta name='viewport' content='width=1920, user-scalable=no' />
      </Head>
      <div className='flex flex-col items-center pt-10 bg-white'>
        <div
          className='cursor-pointer max-w-4xl'
          onClick={() => router.push("/")}
        >
          <span className='text-red-600 text-[7rem] font-bold tracking-wider'>
            404 SORRY
          </span>
          <p className='text-gray-400 font-bold text-xl tracking-wide'>
            we couldn't find that page
          </p>
          <p className='text-gray-400 font-bold text-xl tracking-wide'>
            Try searching or go to{" "}
            <span className='text-blue-600 text-xl font-semibold'>
              Amazon's home page.
            </span>
          </p>
        </div>
        <img
          onClick={() => router.push("/")}
          src='https://images-na.ssl-images-amazon.com/images/G/01/error/80._TTD_.jpg'
          alt=''
          className='cursor-pointer object-contain max-w-4xl'
        />
      </div>
    </div>
  );
};

export default PageNotFound;
