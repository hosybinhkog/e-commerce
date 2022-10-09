import Input from "@/components/Input";
import { useAppDispatch, useAppSelector } from "@/hooks";
import LayoutMain from "@/layouts/commom/LayoutMain";
import { clearErrors } from "@/redux/actions/user.actions";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { register as registerAction } from "@/redux/actions/user.actions";
import { validatePasswrodReset } from "@/utils/passwordConfirm";

const register: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isAuthenticated, error, success } = useAppSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const [avatar, setAvatar] = useState<string | ArrayBuffer>("");
  const [avatarPreview, setAvatarPreview] = useState<string | ArrayBuffer>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { name, email, password } = user;

  const handleFormSubmitRegister = async (e) => {
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
    const id = toast.loading("Registering...", { position: "top-center" });
    const myForm = new FormData();
    myForm.set("username", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar as string);
    // @ts-ignore
    await dispatch(registerAction(myForm));
    toast.remove(id);
  };

  const onBlur = () => setErrorMessage("");

  const handleChangeDataRegister = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: [e.target.value] });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);

      setErrorMessage(error);
      clearErrors();
    }

    if (success) {
      toast.success("Register success!! welcome to...");
    }

    if (isAuthenticated) {
      router.push("/");
    }
  }, [router, isAuthenticated, error, toast, success]);

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
          <form
            onSubmit={handleFormSubmitRegister}
            className='flex max-w-[800px] mx-auto flex-col gap-2'
          >
            <h4 className='font-semibold text-2xl text-gray-600'>
              Create account
            </h4>
            <Input
              name='name'
              value={name}
              label='username'
              onBlur={onBlur}
              onChange={handleChangeDataRegister}
              placehoder='First and last name'
            />
            <Input
              value={email}
              name='email'
              onBlur={onBlur}
              type={"email"}
              label='Email'
              onChange={handleChangeDataRegister}
            />
            <Input
              value={password}
              name='password'
              onBlur={onBlur}
              label='Password'
              type={"password"}
              onChange={handleChangeDataRegister}
            />
            <Input
              name='confirmPassword'
              value={passwordConfirm}
              onBlur={onBlur}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              type={"password"}
              label='Re-enter password'
            />
            <div>
              <label htmlFor='avatar'>Avatar</label>
              <input
                type='file'
                name='avatar'
                id='avatar'
                accept='image/'
                placeholder='Vd: avatar.png'
                onChange={handleChangeDataRegister}
              />
            </div>
            <div className='flex justify-center items-center p-2'>
              {avatarPreview && (
                <img
                  className='object-cover w-[150px] h-[150px] rounded-full '
                  width='150px'
                  height='150px'
                  src={avatarPreview as string}
                  alt='Avatar privew'
                />
              )}
            </div>
            <p className='text-xs text-red-300'>{errorMessage}</p>

            <button
              className='btn mt-[30px]'
              disabled={!email || !password || !name}
            >
              Submit
            </button>
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
