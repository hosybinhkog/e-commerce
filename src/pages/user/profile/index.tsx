import { Loading } from "@/components";
import { useAppSelector } from "@/hooks";
import PrivateRoute from "@/layouts/auth/PrivateRoute";
import LayoutMain from "@/layouts/commom/LayoutMain";
import { NextPage } from "next";
import moment from "moment";
import AccountCard from "@/components/AccountCard";

const Profile: NextPage = () => {
  const { user, loading } = useAppSelector((state) => state.user);

  return (
    <>
      {loading && !user ? (
        <Loading />
      ) : (
        <PrivateRoute>
          <LayoutMain>
            <div className='mx-auto max-w-[900px] py-[3rem]'>
              <h3 className='text-3xl text-gray-800 font-semibold pb-3'>
                Manage your Profile
              </h3>
              <div className='flex flex-col  rounded-md'>
                <div className='flex flex-col gap-3'>
                  <h5 className='border bg-gray-300 font-semibold text-xl tracking-wider  py-[2rem] rounded-md px-4'>
                    <span className='font-bold'>Username: </span>{" "}
                    {user?.username}
                  </h5>
                  <h5 className='border bg-gray-300 font-semibold text-xl tracking-wider  py-[2rem] rounded-md px-4'>
                    <span className='font-bold'>Email: </span> {user?.email}
                  </h5>
                  <h5 className='border bg-gray-300 font-semibold text-xl tracking-wider  py-[2rem] rounded-md px-4'>
                    <span className='font-bold'>Created at: </span>{" "}
                    {moment(user?.createdAt).format("MMMM Do YYYY")}
                  </h5>
                  <h5 className='border bg-gray-300 font-semibold text-xl tracking-wider  py-[2rem] rounded-md px-4 flex gap-2 items-center'>
                    <p>Avatar</p>
                    <img
                      src={user?.avatar?.url}
                      className='w-[150px] h-[150px] object-cover rounded-full'
                      alt=''
                    />
                  </h5>
                </div>
              </div>
              <div className='grid grid-cols-3 gap-2 my-4'>
                <AccountCard
                  description='Manage, add, or remove user profiles for personalized experiences'
                  href='/user/profile/update'
                  src='https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/account._CB660668669_.png'
                  title='Update Profile'
                />
                <AccountCard
                  description='Track, return, or buy things again'
                  href='/user/order'
                  src='https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/order._CB660668735_.png '
                  title='Your Orders'
                />
                <AccountCard
                  description='View, modify, and share your lists, or create new ones'
                  href='/'
                  src='https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/fshub/11_lists._CB654640573_.png'
                  title='Your List'
                />

                {user?.role === "admin" && (
                  <AccountCard
                    description='Admin page'
                    href='/dashboard'
                    src='https://m.media-amazon.com/images/G/01/x-locale/cs/contact-us/GiftCard_icon_01._CB660349069_.png'
                    title='Dashboard for admin'
                  />
                )}
              </div>
            </div>
          </LayoutMain>
        </PrivateRoute>
      )}
    </>
  );
};

export default Profile;
