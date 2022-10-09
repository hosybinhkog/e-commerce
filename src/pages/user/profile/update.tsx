import { Loading } from "@/components";
import Input from "@/components/Input";
import { UPDATE_PROFILE_RESET } from "@/constants/redux.contants";
import { useAppDispatch, useAppSelector } from "@/hooks";
import PrivateRoute from "@/layouts/auth/PrivateRoute";
import LayoutMain from "@/layouts/commom/LayoutMain";
import {
  clearErrors,
  loadUser,
  updateProfile,
} from "@/redux/actions/user.actions";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const register: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { error, isUpdated } = useAppSelector((state) => state.updateProfile);
  const { user: userSelect, loading } = useAppSelector((state) => state.user);

  const [user, setUser] = useState({
    name: userSelect?.username,
    email: userSelect?.email,
  });

  const [avatar, setAvatar] = useState<string | ArrayBuffer>("");
  const [avatarPreview, setAvatarPreview] = useState<string | ArrayBuffer>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { name, email } = user;

  const handleFormSubmitRegister = async (e) => {
    e.preventDefault();

    const id = toast.loading("Updating...", { position: "top-center" });
    const myForm = new FormData();
    myForm.set("username", name);
    myForm.set("email", email);

    if (avatar) {
      console.log("avatar");
      myForm.set("avatar", avatar as string);
    }
    // @ts-ignore
    await dispatch(updateProfile(myForm));
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
    window.scrollTo(0, 0);
    if (error) {
      toast.error("Error to upload");
      setErrorMessage("Error to upload");
      // @ts-ignore
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Update successfully !!!");
      // @ts-ignore
      dispatch(loadUser());
      router.push("/user/profile");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }

    if (userSelect?.username) {
      setUser({ name: userSelect.username, email: userSelect.email });

      setAvatarPreview(userSelect.avatar.url);
    }
  }, [router, error, toast, isUpdated, dispatch, userSelect]);

  return (
    <>
      <PrivateRoute>
        <LayoutMain bgWhite>
          {loading || !user ? (
            <Loading />
          ) : (
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
                    Update profile
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

                  <button className='btn mt-[30px]' disabled={!email || !name}>
                    Submit update profile
                  </button>
                </form>
              </div>
            </div>
          )}
        </LayoutMain>
      </PrivateRoute>
    </>
  );
};

export default register;
