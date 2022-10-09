import Input from "@/components/Input";
import { useAppDispatch, useAppSelector } from "@/hooks";
import LayoutMain from "@/layouts/commom/LayoutMain";
import {
  clearErrors,
  login as loginAction,
} from "@/redux/actions/user.actions";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const login: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { error, isAuthenticated, user } = useAppSelector(
    (state) => state.user
  );

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleFormSubmitLogin = async (e) => {
    e.preventDefault();
    const id = toast.loading("Login...", { position: "top-center" });
    // @ts-ignore
    dispatch(loginAction(email, password));
    toast.remove(id);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (error) {
      toast.error(error);
      setErrorMessage(error);
      // @ts-ignore
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      router.push("/");
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className='flex-1 w-0 p-4'>
            <div className='flex items-start'>
              <div className='flex-shrink-0 pt-0.5'>
                <img
                  className='h-10 w-10 rounded-full'
                  src={user.avatar.url}
                  alt=''
                />
              </div>
              <div className='ml-3 flex-1'>
                <p className='text-sm font-medium text-gray-900'>
                  {user.username}
                </p>
                <p className='mt-1 text-sm text-gray-500'>
                  Hello friend! welcome to Amazone
                </p>
              </div>
            </div>
          </div>
          <div className='flex border-l border-gray-200'>
            <button
              onClick={() => toast.dismiss(t.id)}
              className='w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            >
              Close
            </button>
          </div>
        </div>
      ));
    }
  }, [dispatch, error, isAuthenticated, router]);

  return (
    <>
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
              <Input
                value={email}
                onBlur={() => setErrorMessage("")}
                onChange={(e) => setEmail(e.target.value)}
                name='emailOrNumber'
                label='Mobile number or email'
              />
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name='password'
                onBlur={() => setErrorMessage("")}
                label='Password'
                type={"password"}
              />

              <p className='text-xs text-red-300'>{errorMessage}</p>
              <button
                onClick={handleFormSubmitLogin}
                className='btn text-center font-bold hover:scale-105 duration-150 transition-all ease-out mt-[30px] '
                disabled={!email || !password}
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
                Forgot password ? click{" "}
                <span
                  className='link text-blue-400'
                  onClick={() => router.push("/forgotpassword")}
                >
                  Here
                </span>
              </p>
              <p
                // onClick={() => signIn()}
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
    </>
  );
};

export default login;
