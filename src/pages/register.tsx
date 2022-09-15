import Input from "@/components/Input";
import LayoutMain from "@/layouts/commom/LayoutMain";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

const register: NextPage = () => {
  const router = useRouter();

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
            <h4 className='font-semibold text-2xl text-gray-600'>
              Create account
            </h4>
            <Input
              name='username'
              label='username'
              placehoder='First and last name'
            />
            <Input name='emailOrNumber' label='Mobile number or email' />
            <Input name='password' label='Password' type={"password"} />
            <Input
              name='confirmPassword'
              type={"password"}
              label='Re-enter password'
            />
            <button className='btn mt-[30px]'>Submit</button>
            <p className='text-xs tracking-wider'>
              Already have an account?{" "}
              <span
                className='link text-blue-400'
                onClick={() => router.push("/login")}
              >
                Sign in
              </span>
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

export default register;
