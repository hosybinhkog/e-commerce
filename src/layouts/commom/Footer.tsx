import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Footer: React.FC = () => {
  const router = useRouter();

  return (
    <footer className='max-w-[1920px]'>
      {/* FOOTER SCROLL TO TOP  */}
      <div
        onClick={() => window.scrollTo(0, 0)}
        className='w-full text-white text-md cursor-pointer text-center bg-[#37475a] h-[50px] flex items-center justify-center hover:bg-opacity-90'
      >
        Back to top
      </div>
      {/* FOOTER BLOCK 1  */}
      <div className='w-full bg-[#232f3e] py-[20px] md:py-[50px] border-b border-b-gray-400'>
        <div className='max-w-[1000px] mx-auto py-4 text-white grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 px-[20px] md:px-[40px]'>
          <div className='flex flex-col gap-[10px] md:gap-[20px]'>
            <h4 className='text-white font-semibold text-base'>
              Get to Know Us
            </h4>
            <ul className='flex flex-col gap-1'>
              <li className='link text-gray-400 truncate'>Careers</li>
              <li className='link text-gray-400 truncate'>Blog</li>
              <li className='link text-gray-400 truncate'>About Amazon</li>
              <li className='link text-gray-400 truncate'>
                Investor Relations
              </li>
              <li className='link text-gray-400 truncate'>Amazon Devices</li>
              <li className='link text-gray-400 truncate'>Amazon Science</li>
            </ul>
          </div>
          <div className='flex flex-col gap-[10px] md:gap-[20px]'>
            <h4 className='text-white font-semibold text-base'>
              Amazon Payment Products
            </h4>
            <ul className='flex flex-col gap-1'>
              <li className='link text-gray-400 truncate'>
                Amazon Business Card
              </li>
              <li className='link text-gray-400 truncate'>Shop with Points</li>
              <li className='link text-gray-400 truncate'>
                Reload Your Balance
              </li>
              <li className='link text-gray-400 truncate'>
                Amazon Currency Converter
              </li>
            </ul>
          </div>
          <div className='flex flex-col gap-[10px] md:gap-[20px]'>
            <h4 className='text-white font-semibold text-base'>
              Make Money with Us
            </h4>
            <ul className='flex flex-col gap-1'>
              <li className='link text-gray-400 truncate'>
                Sell products on Amazon
              </li>
              <li className='link text-gray-400 truncate'>
                Sell on Amazon Business
              </li>
              <li className='link text-gray-400 truncate'>
                Sell apps on Amazon
              </li>
              <li className='link text-gray-400 truncate'>
                Become an Affiliate
              </li>
              <li className='link text-gray-400 truncate'>
                Advertise Your Products
              </li>
              <li className='link text-gray-400 truncate'>
                Self-Publish with Us
              </li>
              <li className='link text-gray-400 truncate'>
                Host an Amazon Hub
              </li>
              <li className='link text-gray-400 truncate'>
                See More Make Money with Us
              </li>
            </ul>
          </div>
          <div className='flex flex-col gap-[10px] md:gap-[20px]'>
            <h4 className='text-white font-semibold text-base'>
              Let Us Help You Manage Amazon
            </h4>
            <ul className='flex flex-col gap-1'>
              <li className='link text-gray-400 truncate'>
                Amazon and COVID-19
              </li>
              <li className='link text-gray-400 truncate'>Your Account</li>
              <li className='link text-gray-400 truncate'>
                Shipping Rates & Policies
              </li>
              <li className='link text-gray-400 truncate'>
                Returns & Replacements
              </li>
              <li className='link text-gray-400 truncate'>
                Your Content and Devices
              </li>
              <li className='link text-gray-400 truncate'>Help</li>
              <li className='link text-gray-400 truncate'>Assistant</li>
            </ul>
          </div>
        </div>
      </div>
      {/* FOOTER BLOCK 2  */}
      <div className='w-full bg-[#232f3e] py-[10px] md:py-[20px] flex items-center flex-col'>
        <Image
          onClick={() => router.push("/")}
          src='https://links.papareact.com/f90'
          width={150}
          height={40}
          objectFit='contain'
          className='cursor-pointer'
        />
      </div>
      {/* FOOTER FOOTER  */}
      <div className='w-full bg-[#131A22] flex flex-col items-center  py-[10px] md:py-[20px] justify-center text-white'>
        <span>
          ©copyright 2022 - hosybinhkog -{" "}
          <a
            className='text-blue-400 hover:underline'
            href='https://github.com/hosybinhkog'
            target={"_blank"}
          >
            github
          </a>
        </span>
        <span className='text-blue-400 mt-1'>
          Nextjs - Typescript - Tailwindcss - Orthers
        </span>
      </div>
    </footer>
  );
};

export default Footer;
