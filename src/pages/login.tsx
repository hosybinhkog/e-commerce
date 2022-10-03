import Input from "@/components/Input";
import { useAppDispatch } from "@/hooks";
import LayoutMain from "@/layouts/commom/LayoutMain";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const login: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <LayoutMain bgWhite>
      <div className='flex flex-col items-center border-b-[0.5px] border-b-gray-300 pb-[100px]'>
        <div
          onClick={() => router.push("/")}
          className='mt-[100px] mb-5 flex items-center flex-grow sm:flex-grow-0'
        >
          <Image
            src='https://media.loveitopcdn.com/3807/logo-amazon-1.png'
            width={150}
            height={40}
            objectFit='contain'
            className='cursor-pointer'
          />
        </div>
        <div className='max-w-[350px] px-[20px] py-[20px] lg:px-[30px] lg:py-[40px] border-[0.5px] border-gray-400 bg-white w-full rounded-[2px]'>
          <form className='flex max-w-[800px] mx-auto flex-col gap-2'>
            <h4 className='font-semibold text-2xl text-gray-600'>Sign in</h4>
            <Input name='emailOrNumber' label='Mobile number or email' />
            <Input name='password' label='Password' type={"password"} />
            <button className='btn text-center font-bold hover:scale-105 duration-150 transition-all ease-out mt-[30px]'>
              Submit
            </button>
            <p className='text-xs tracking-wider'>
              You can create Account ?{" "}
              <span
                className='link text-blue-400'
                onClick={() => router.push("/register")}
              >
                Register
              </span>
            </p>

            <p
              onClick={() => signIn()}
              className='btn text-center font-bold hover:scale-105 duration-150 transition-all ease-out'
            >
              Signin with Google
            </p>

            <p className='mt-2 text-center text-xs text-blue-400 underline'>
              hosybinhkog - ecommerce
            </p>
          </form>
        </div>
      </div>
    </LayoutMain>
  );
};

export default login;
