import { notifications, userMenu } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { logout } from "@/redux/actions/user.actions";
import { BellIcon, SearchIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Dropdown from "../Dropdown";
import Loading from "../Loading";

interface userDisplay {
  displayName: string;
  image: string;
}

const renderUserToggle = (user: userDisplay) => (
  <div className='topnav__right-user'>
    <div className='topnav__right-user__image'>
      <img src={user?.image} alt='UserImage' />
    </div>
    <div className='topnav__right-user__name'>{user?.displayName}</div>
  </div>
);

const renderNotificationItem = (item, index) => (
  <div className='notification-item' key={index}>
    <item.icon className='h-5 w-5' />
    <span>{item.content}</span>
  </div>
);

const renderUserMenu = (item, index) => (
  <div key={index} className='notification-item'>
    <item.icon className='h-5 w-5 text-gray-500' />
    <span>{item.content}</span>
  </div>
);

const TopNav: React.FC = () => {
  const { user, loading } = useAppSelector((state) => state.user);
  const [userDisplay, setUserDisplay] = useState<userDisplay>();

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    const id = toast.loading("Logout....");
    // @ts-ignore
    dispatch(logout());
    toast.success("Logout successfully", { id });
  };

  useEffect(() => {
    if (user) {
      setUserDisplay({ image: user?.avatar?.url, displayName: user?.username });
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className='topnav'>
          <div className='topnav__search'>
            <input type='text' placeholder='Search here ...' />
            <SearchIcon className='h-5 w-5' />
          </div>
          <div className='topnav__right'>
            <div className='topnav__right-item'>
              <Dropdown
                customToggle={() => renderUserToggle(userDisplay)}
                contentData={userMenu}
                // renderItems={(item, index) => renderUserMenu(item, index)}
              />
            </div>
            {/* <div className='topnav__right-item'>
              <Dropdown
                icon={BellIcon}
                badge='12'
                contentData={notifications}
                renderItems={(item, index) =>
                  renderNotificationItem(item, index)
                }
                renderFooter={() => <Link href='/'>View All</Link>}
              />
            </div> */}
            <div className='topnav__right-item'>{/* <ThemeMenu /> */}</div>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-10 h-10 cursor-pointer'
                onClick={handleLogout}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopNav;
