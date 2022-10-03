import Link from "next/link";
import React from "react";

import { sidebarRoutes } from "@/constants";
import { useRouter } from "next/router";

interface SidebarItemProps {
  active: boolean;
  title: string;
  icon: (props: React.ComponentProps<"svg">) => JSX.Element | any;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  active,
  title,
  icon: Icon,
}) => {
  const activeItem = active ? "active" : "";

  return (
    <div className='sidebar__item'>
      <div className={`sidebar__item-inner ${activeItem}`}>
        <Icon />
        <span>{title}</span>
      </div>
    </div>
  );
};

const Sidebar: React.FC = () => {
  const router = useRouter();

  const activeItem = sidebarRoutes.findIndex(
    (item) => item.route === router.pathname
  );
  return (
    <div className='sidebar'>
      <div className='sidebar__logo'>
        <img
          src='https://media.loveitopcdn.com/3807/logo-amazon-1.png'
          alt='Logo'
        />
      </div>
      {sidebarRoutes.map((item, index) => {
        return (
          <Link href={item.route} key={index}>
            <SidebarItem
              title={item.display_name}
              icon={item.icon}
              active={index === activeItem}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
