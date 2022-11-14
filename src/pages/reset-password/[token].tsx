import { Input } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import ProtectedRoute from "@/layouts/auth/ProtectedRoute";
import LayoutMain from "@/layouts/commom/LayoutMain";
import {
  clearErrors,
  loadUser,
  resetPassword,
} from "@/redux/actions/user.actions";
import { validatePasswrodReset } from "@/utils/passwordConfirm";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ResetPassword: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { error, success } = useAppSelector((state) => state.password);

  const onBlur = () => setErrorMessage("");

  console.log(router.query.token);

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!validatePasswrodReset(password.toString(), passwordConfirm)) {
      setErrorMessage(
        "Password is includes one regex (8 - 16) and match confirm password"
      );

      toast.error(
        "Password is includes one regex (8 - 16) and match confirm password"
      );

      return;
    }

    const id = toast.loading("Sumiting...");

    const myForm = new FormData();
    myForm.set("newPasssword", password);
    myForm.set("confirmPassword", passwordConfirm);
    // @ts-ignore
    dispatch(resetPassword(router.query.token, myForm));
    toast.remove(id);
  };

  useEffect(() => {
    if (success) {
      router.push("/");
      toast.success("Change password succeess!!");
      // @ts-ignore
      dispatch(loadUser());
    }

    if (error) {
      toast.error(error);
      // @ts-ignore
      dispatch(clearErrors());
    }
  }, [dispatch, toast, error, success]);

  return (
    <ProtectedRoute>
      <LayoutMain bgWhite>
        <Head>
          <title>Change password</title>
        </Head>
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
                Reset password
              </h4>
              <Input
                value={password}
                name='password'
                onBlur={onBlur}
                label='New password'
                type={"password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                name='confirmPassword'
                value={passwordConfirm}
                onBlur={onBlur}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                type={"password"}
                label='Re-enter password'
              />
              <p className='text-xs text-red-300'>{errorMessage}</p>
              <button
                className='btn text-center font-bold hover:scale-105 duration-150 transition-all ease-out mt-[30px]'
                disabled={!password || !passwordConfirm}
                onClick={handleResetPassword}
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

export default ResetPassword;
