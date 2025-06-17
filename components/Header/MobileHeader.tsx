"use client";

import Image from "next/image";
import logo1 from "../../public/images/logo/logo-01.svg";
import { Bell, Menu, ShoppingCart, UserIcon } from "lucide-react";
import { useState } from "react";
import Sidebar from "../Navbar/Sidebar";
import Link from "next/link";

const MobileHeader = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleShowMobileMenu = () => {    
    setShowMobileMenu(true);
  };

  return (
    <>
      <div className="logo-search-category-wrapper after-md-device-header">
        <Link href="index.html" className="logo-area">
          <Image width={181} height={47} src={logo1} alt="logo-main" className="logo" priority />
        </Link>
        <div className="main-wrapper-action-2 d-flex">
        <div className="accont-wishlist-cart-area-header">
                  <Link href="/" className="btn-border-only account">
                    <div className="d-flex align-items-center h-100 gap-3 cart-button-wrap">
                      <UserIcon width={18} />
                    </div>
                  </Link>
                  <div 
                    className={"btn-border-only cart category-hover-header"} 
                  >
                    <div 
                      className="d-flex align-items-center h-100 gap-3 cart-button-wrap"
                    >
                      <div style={{ position: 'relative' }}>
                        <Bell 
                          style={{ flexShrink: 0 }} 
                          width={18} 
                        />
                        <span className="number" style={{ position: 'absolute', left: '7px', top: '-7px' }}>2</span>
                      </div>
                    </div>
                  </div>
                  <div 
                    className={"btn-border-only cart category-hover-header"} 
                  >
                    <div 
                      className="d-flex align-items-center h-100 gap-3 cart-button-wrap"
                    >
                      <div style={{ position: 'relative' }}>
                        <ShoppingCart 
                          style={{ flexShrink: 0 }} 
                          width={18} 
                        />
                        <span className="number" style={{ position: 'absolute', left: '7px', top: '-7px' }}>2</span>
                      </div>
                    </div>
                  </div>
                </div>
          <div className="actions-area">
            <div className="menu-btn" onClick={handleShowMobileMenu}>
              <Menu width={20} />
            </div>
          </div>
        </div>
      </div>
      {showMobileMenu && <Sidebar showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />}
    </>
  );
};

export default MobileHeader;