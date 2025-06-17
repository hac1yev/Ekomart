import { Heart, Package, ShoppingCart, User } from "lucide-react";

export const tabs = [
  {
    id: "tab1",
    href: "/profile",
    label: "Personal Information",
    icon: User,
  },
  {
    id: "tab2",
    href: "/profile/orders",
    label: "Orders",
    icon: Package,
  },
  {
    id: "tab3",
    href: "/profile/favorites",
    label: "Favorites",
    icon: Heart,
  },
  {
    id: "tab4",
    href: "/profile/add-product",
    label: "Add Product",
    icon: ShoppingCart,
  },
];
