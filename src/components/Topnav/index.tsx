import { notifications, userMenu } from "@/constants";
import { BellIcon, SearchIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";
import Dropdown from "../Dropdown";

interface userDisplay {
  displayName: string;
  image: string;
}

const currentUser: userDisplay = {
  displayName: "your name",
  image:
    "https://res.cloudinary.com/hosybinh/image/upload/v1646192864/cld-sample.jpg",
};

const renderUserToggle = (user: userDisplay) => (
  <div className='topnav__right-user'>
    <div className='topnav__right-user__image'>
      <img src={user.image} alt='UserImage' />
    </div>
    <div className='topnav__right-user__name'>{user.displayName}</div>
  </div>
);

const renderNotificationItem = (item, index) => (
  <div className='notification-item' key={index}>
    <item.icon className='h-5 w-5' />
    <span>{item.content}</span>
  </div>
);

const renderUserMenu = (item, index) => (
  <Link href='/' key={index}>
    <div className='notification-item'>
      <item.icon className='h-5 w-5' />
      <span>{item.content}</span>
    </div>
  </Link>
);

const TopNav: React.FC = () => {
  return (
    <div className='topnav'>
      <div className='topnav__search'>
        <input type='text' placeholder='Search here ...' />
        <SearchIcon className='h-5 w-5' />
      </div>
      <div className='topnav__right'>
        <div className='topnav__right-item'>
          <Dropdown
            customToggle={() => renderUserToggle(currentUser)}
            contentData={userMenu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
        <div className='topnav__right-item'>
          <Dropdown
            icon={BellIcon}
            badge='12'
            contentData={notifications}
            renderItems={(item, index) => renderNotificationItem(item, index)}
            renderFooter={() => <Link href='/'>View All</Link>}
          />
        </div>
        <div className='topnav__right-item'>{/* <ThemeMenu /> */}</div>
      </div>
    </div>
  );
};

export default TopNav;
