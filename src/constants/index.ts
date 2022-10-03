import {
  CogIcon,
  GiftIcon,
  HomeIcon,
  NewspaperIcon,
  QrcodeIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  ViewListIcon,
  OfficeBuildingIcon,
  UserIcon,
  LogoutIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline";

export const APP = "HELLLO APP";
export const passwordRegex =
  /(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]{8,16}$/;

export const sidebarRoutes = [
  {
    display_name: "Dashboard",
    route: "/",
    icon: HomeIcon,
  },
  {
    display_name: "Customers",
    route: "/customers",
    icon: UserGroupIcon,
  },
  {
    display_name: "/admin/Posts",
    router: "/posts",
    icon: NewspaperIcon,
  },
  {
    display_name: "/admin/Products",
    route: "/products",
    icon: QrcodeIcon,
  },
  {
    display_name: "/admin/Orders",
    route: "/orders",
    icon: ShoppingCartIcon,
  },
  {
    display_name: "/admin/categories",
    route: "/categories",
    icon: ViewListIcon,
  },
  {
    display_name: "/admin/discount",
    route: "/discount",
    icon: GiftIcon,
  },
  {
    display_name: "/admin/inventory",
    route: "/inventory",
    icon: OfficeBuildingIcon,
  },
  {
    display_name: "/admin/settings",
    route: "/settings",
    icon: CogIcon,
  },
];

export const userMenu = [
  {
    icon: UserIcon,
    content: "Profile",
  },
  // {
  //   icon: Wa,
  //   content: "My Wallet",
  // },
  {
    icon: CogIcon,
    content: "Settings",
  },
  {
    icon: LogoutIcon,
    content: "Logout",
  },
];

export const notifications = [
  {
    icon: ExclamationCircleIcon,
    content: "Curabitur id eros quis nunc suscipit blandit",
  },
  {
    icon: ViewListIcon,
    content: "Duis malesuada justo eu sapien elementum, in semper diam posuere",
  },
  {
    icon: ShoppingCartIcon,
    content: "Donec at nisi sit amet tortor commodo porttitor pretium a erat",
  },
  {
    icon: ExclamationCircleIcon,
    content: "In gravida mauris et nisi",
  },
  {
    icon: ShoppingCartIcon,
    content: "Curabitur id eros quis nunc suscipit blandit",
  },
];
