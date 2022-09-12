import Image from "next/image";
import { useRouter } from "next/router";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
  MapIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  const router = useRouter();
  return (
    <header className='sticky top-0 z-50 left-0 right-0'>
      <div className='flex items-center bg-amazone_blue p-1 flex-grow py-2'>
        <div
          onClick={() => router.push("/")}
          className='mt-2 flex items-center flex-grow sm:flex-grow-0'
        >
          <Image
            src='https://links.papareact.com/f90'
            width={150}
            height={40}
            objectFit='contain'
            className='cursor-pointer'
          />
        </div>
        <div className='md:flex items-center text-white px-2 space-x-2 hidden'>
          <MapIcon className='h-6 font-bold' />
          <div className='cursor-pointer link '>
            <p className='text-xs'>Deliver to</p>
            <p className='font-extrabold text-sm'>Viet nam</p>
          </div>
        </div>
        {/* SEARCH INPUT HEADER  */}
        <form className='bg-yellow-400 hidden md:flex items-center h-10 rounded-md sm:flex flex-grow cursor-pointer '>
          <input
            type='text'
            className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all duration-200 ease-out px-4'
          />
          <SearchIcon className='h-12 text-gray-800 font-semibold p-3' />
        </form>

        {/* RIGHT HEADER  */}
        <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
          <div className='cursor-pointer link'>
            <p>Hello Sỹ Bình</p>
            <p className='font-extrabold md:text-sm'>Account & Lists</p>
          </div>
          <div className='cursor-pointer link'>
            <p>Returns</p>
            <p className='font-extrabold md:text-sm'>& Orders</p>
          </div>
          <Link href={"/cart"}>
            <div className='cursor-pointer link relative flex items-center'>
              <div className='relative'>
                <ShoppingCartIcon className='h-10' />
                <span className='absolute h-4 w-4 top-0 right-[0] px-2 py-1 text-xs  rounded-full bg-yellow-300 text-black font-extrabold flex items-center justify-center animate-pulse transition-all duration-150 ease-linear'>
                  0
                </span>
              </div>
              <p className='font-extrabold md:text-sm hidden lg:flex mt-2 '>
                Cart
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div className='flex items-center bg-amazone_blue-light text-white text-sm p-2 space-x-3 pl-6'>
        <p className='link flex items-center space-x-2 hover-border '>
          <MenuIcon className='h-5 mr-2 text-white hover:scale-105 transition-all duration-150 font-semibold' />{" "}
          All
        </p>
        <p className='link hover-border hidden md:inline'>Today's Deals</p>
        <p className='link hover-border hidden md:inline'>Customer Services</p>
        <p className='link hover-border hidden md:inline'>Registry</p>
        <p className='link hover-border hidden md:inline'>Gift Cards</p>
        <p className='link hover-border hidden md:inline'>Sell</p>
      </div>
    </header>
  );
};

export default Header;
