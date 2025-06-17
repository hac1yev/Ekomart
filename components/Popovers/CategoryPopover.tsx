import { CookingPot,Plus, ShoppingBasket, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaFemale, FaMale, FaShoppingCart } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { GiConverseShoe, GiLipstick } from "react-icons/gi";
import { IoDesktop } from "react-icons/io5";
import { MdChildFriendly, MdSportsVolleyball } from "react-icons/md";
import { PiPaintBrushHouseholdFill } from "react-icons/pi";
import { RiSofaFill } from "react-icons/ri";

type CategoryName = "breakfast" | "meats" | "chips";

const CategoryPopover = () => {
  const [dropdown, setDropdown] = useState<Record<CategoryName, boolean>>({
    breakfast: false,
    meats: false,
    chips: false,
  });

  const handleOpenDropdown = (categoryName: CategoryName) => {
    setDropdown((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  return (
    <ul className="category-sub-menu" id="category-active-four">
      <li onClick={() => handleOpenDropdown("breakfast")}>
        <div className="menu-item">
          <FaFemale width={18} height={18} />
          <span>Female</span>
          <div className="plus-icon">
            <Plus style={{ width: "15px" }} />
          </div>
        </div>
        {dropdown.breakfast && (
          <ul className="submenu mm-collapse">
            <li>
              <Link className="mobile-menu-link" href="/">
                <UtensilsCrossed width={18} />
                Breakfast
              </Link>
            </li>
            <li>
              <Link className="mobile-menu-link" href="/">
                <CookingPot width={18} />
                Dinner
              </Link>
            </li>
            <li>
              <Link className="mobile-menu-link" href="/">
                <ShoppingBasket width={18} />
                Pumking
              </Link>
            </li>
          </ul>
        )}
      </li>
      <li onClick={() => handleOpenDropdown("meats")}>
        <div className="menu-item">
          <FaMale width={18} height={18} />
          <span>Male</span>
          <div className="plus-icon">
            <Plus style={{ width: "15px" }} />
          </div>
        </div>
        {dropdown.meats && (
          <ul className="submenu mm-collapse">
            <li>
              <Link className="mobile-menu-link" href="/">
                <UtensilsCrossed width={18} />
                Breakfast
              </Link>
            </li>
            <li>
              <Link className="mobile-menu-link" href="/">
                <CookingPot width={18} />
                Dinner
              </Link>
            </li>
            <li>
              <Link className="mobile-menu-link" href="/">
                <ShoppingBasket width={18} />
                Pumking
              </Link>
            </li>
          </ul>
        )}
      </li>
      <li>
        <Link href="/" className="menu-item">
          <MdChildFriendly width={18} height={18} />
          <span>Mother&Kid</span>
        </Link>
      </li>
      <li onClick={() => handleOpenDropdown("chips")}>
        <div className="menu-item">
          <PiPaintBrushHouseholdFill width={18} height={18} />
          <span>Households</span>
          <div className="plus-icon">
            <Plus style={{ width: "15px" }} />
          </div>
        </div>
        {dropdown.chips && (
          <ul className="submenu mm-collapse">
            <li>
              <Link className="mobile-menu-link" href="/">
                <UtensilsCrossed width={18} />
                Breakfast
              </Link>
            </li>
            <li>
              <Link className="mobile-menu-link" href="/">
                <CookingPot width={18} />
                Dinner
              </Link>
            </li>
            <li>
              <Link className="mobile-menu-link" href="/">
                <ShoppingBasket width={18} />
                Pumking
              </Link>
            </li>
          </ul>
        )}
      </li>
      <li>
        <Link href="/" className="menu-item">
          <RiSofaFill width={18} height={18} />
          <span>Furnitures</span>
        </Link>
      </li>
      <li>
        <Link href="/" className="menu-item">
          <FaShoppingCart width={18} height={18} />
          <span>Supermarket</span>
        </Link>
      </li>
      <li>
        <Link href="/" className="menu-item">
          <GiLipstick width={18} height={18} />
          <span>Cosmetics</span>
        </Link>
      </li>
      <li>
        <Link href="/" className="menu-item">
          <GiConverseShoe width={18} height={18} />
          <span>Shoes</span>
        </Link>
      </li>
      <li>
        <Link href="/" className="menu-item">
          <FaBagShopping width={18} height={18} />
          <span>Bags</span>
        </Link>
      </li>
      <li>
        <Link href="/" className="menu-item">
          <IoDesktop width={18} height={18} />
          <span>Electronics</span>
        </Link>
      </li>
      <li>
        <Link href="/" className="menu-item">
          <MdSportsVolleyball width={18} height={18} />
          <span>Sports</span>
        </Link>
      </li>
    </ul>
  );
};

export default CategoryPopover;