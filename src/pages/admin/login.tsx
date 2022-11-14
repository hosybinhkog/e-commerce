import { useAppDispatch, useAppSelector } from "@/hooks";
import { clearErrors, login } from "@/redux/actions/user.actions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.user);
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLoginAdmin = (e) => {
    e.preventDefault();
    const id = toast.loading("submit logging...");
    // @ts-ignore
    dispatch(login(email, password));

    toast.remove(id);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      left: 0,
    });

    if (user && user.role === "admin") {
      toast.success("Loading success");
      router.push("/dashboard");
    }

    if (user && user.role !== "admin") {
      toast.error("Account not a admin");
    }

    if (error) {
      toast.error(error);
      // @ts-ignore
      dispatch(clearErrors());
    }
  }, [user, dispatch]);

  return (
    <section className='h-full gradient-form bg-gray-200 md:h-screen flex items-center justify-center w-full'>
      <div className='container py-12 px-6 h-full'>
        <div className='flex justify-center items-center flex-wrap h-full g-6 text-gray-800'>
          <div className='xl:w-10/12'>
            <div className='block bg-white shadow-lg rounded-lg'>
              <div className='lg:flex lg:flex-wrap g-0'>
                <div className='lg:w-6/12 px-4 md:px-0'>
                  <div className='md:p-12 md:mx-6'>
                    <div className='text-center'>
                      <img
                        className='mx-auto w-48'
                        src='https://media.loveitopcdn.com/3807/logo-amazon-1.png'
                        alt='logo'
                      />
                      <h4 className='text-xl font-semibold mt-1 mb-12 pb-1'>
                        Amazone DB
                      </h4>
                    </div>
                    <form onSubmit={handleLoginAdmin}>
                      <p className='mb-4'>Please login to admin account</p>
                      <div className='mb-4'>
                        <input
                          type='text'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          id='email'
                          placeholder='Email'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className='mb-4'>
                        <input
                          type='password'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          id='password'
                          placeholder='Password'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className='text-center pt-1 mb-12 pb-1'>
                        <button
                          className='inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
                          type='submit'
                          data-mdb-ripple='true'
                          data-mdb-ripple-color='light'
                          style={{
                            background: "blue",
                          }}
                        >
                          Log in
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                  className='lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none'
                  style={{
                    background:
                      "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);",
                  }}
                >
                  <div className='text-white px-4 py-6 md:p-12 md:mx-6'>
                    <h4 className='text-xl font-semibold mb-6'>
                      Amazon for ADMIN PAGE
                    </h4>
                    <p className='text-sm text-black'>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
