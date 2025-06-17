import Link from "next/link";
import React from "react";

const MobileNav = () => {
  return (
    <div className="mobile-menu-main">
      <nav className="nav-main mainmenu-nav mt--30">
        <ul className="mainmenu metismenu" id="mobile-menu-active">
          <li>
            <Link href="/" className="main">
              Home
            </Link>
          </li>
          <li>
            <Link href="/" className="main">
              About
            </Link>
          </li>
          <li>
            <Link href="/" className="main">
              Shop
            </Link>
          </li>
          <li>
            <Link href="/" className="main">
              Vendors
            </Link>
          </li>
          <li>
            <Link href="/" className="main">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/" className="main">
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileNav;
