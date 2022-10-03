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
    route: "/dashboard",
    icon: HomeIcon,
  },
  {
    display_name: "Customers",
    route: "/admin/customers",
    icon: UserGroupIcon,
  },
  {
    display_name: "Posts",
    router: "/admin/posts",
    icon: NewspaperIcon,
  },
  {
    display_name: "Products",
    route: "/admin/products",
    icon: QrcodeIcon,
  },
  {
    display_name: "Orders",
    route: "/admin/orders",
    icon: ShoppingCartIcon,
  },
  {
    display_name: "categories",
    route: "/admin/categories",
    icon: ViewListIcon,
  },
  {
    display_name: "discount",
    route: "/admin/discount",
    icon: GiftIcon,
  },
  {
    display_name: "inventory",
    route: "/admin/inventory",
    icon: OfficeBuildingIcon,
  },
  {
    display_name: "settings",
    route: "/admin/settings",
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
