import { Input } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import ProtectedRoute from "@/layouts/auth/ProtectedRoute";
import LayoutMain from "@/layouts/commom/LayoutMain";
import { forgotPassword } from "@/redux/actions/user.actions";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Forgotpassword: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");

  const { error, message } = useAppSelector((state) => state.password);

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    const id = toast.loading("submiting....");
    // @ts-ignore
    await dispatch(forgotPassword(email));
    toast.remove(id);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (message) {
      toast.success("Success please check mail !!");
    }
  }, [error, toast, message]);

  return (
    <ProtectedRoute>
      <LayoutMain bgWhite>
        {" "}
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
                Forgot password
              </h4>
              <Input
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                label='Email'
              />

              <button
                className='btn text-center font-bold hover:scale-105 duration-150 transition-all ease-out mt-[30px]'
                disabled={!email}
                onClick={handleForgotPasswordSubmit}
              >
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
              <p className='text-xs tracking-wider'>
                Login?{" "}
                <span
                  className='link text-blue-400'
                  onClick={() => router.push("/login")}
                >
                  Here
                </span>
              </p>
              <p className='mt-2 text-center text-xs text-blue-400 underline'>
                hosybinhkog - ecommerce
              </p>
            </form>
          </div>
        </div>
      </LayoutMain>
    </ProtectedRoute>
  );
};

export default Forgotpassword;
