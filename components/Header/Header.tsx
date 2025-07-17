"use client";

import Image from "next/image";
import logo1 from "../../public/images/logo/logo-01.svg";
import MobileHeader from "./MobileHeader";
import { Bell, Heart, ShoppingCart, UserIcon } from "lucide-react";
import Link from "next/link";
import Search from "./Search";
import { useTypedFavoriteSelector } from "@/store/favorites-slice";
import { useHeaderData } from "@/hooks/useHeaderData";
import { useTypedCartSelector } from "@/store/cart-slice";
import { useEffect, useMemo, useState } from "react";
import NotificationPopover from "../Popovers/NotificationPopover";
import useNotification from "@/hooks/useNotification";

const Header = () => {
  const favoritesCount = useTypedFavoriteSelector((state) => state.favoriteReducer.favoritesCount);
  const cartProducts = useTypedCartSelector((state) => state.cartReducer.cartProducts);
  const { notifications } = useNotification();
  const { token } = useHeaderData();
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const open = Boolean(anchorEl);
  const id = useMemo(() => open ? 'simple-popover' : undefined, [open]);
  
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  useEffect(() => {
    if (open) {
      document.body.classList.add('notification-popover-no-scroll');
    } else {
      document.body.classList.remove('notification-popover-no-scroll');
    }

    return () => {
      document.body.classList.remove('notification-popover-no-scroll');
    };
  }, [open]);

  return (
    <>
      <div className="search-header-area-main">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="logo-search-category-wrapper">
                <Link href="/" className="logo-area">
                  <Image
                    width={181}
                    height={47}
                    src={logo1}
                    alt="logo-main"
                    className="logo"
                    priority
                  />
                </Link>
                <div className="category-search-wrapper">
                  <Search />
                </div>
                <div className="accont-wishlist-cart-area-header">
                  <Link href={'/cart'} className={"btn-border-only cart category-hover-header"}>
                    <div className="d-flex align-items-center h-100 gap-3 cart-button-wrap">
                      <div style={{ position: "relative" }}>
                        <ShoppingCart style={{ flexShrink: 0 }} width={18} />
                        {cartProducts.length !== 0 && <span
                          className="number"
                          style={{
                            position: "absolute",
                            left: "7px",
                            top: "-6px",
                          }}
                        >
                          {cartProducts.length}
                        </span>}
                      </div>
                    </div>
                  </Link>
                  <Link
                    href="/profile/favorites"
                    className="btn-border-only wishlist"
                  >
                    <div className="d-flex align-items-center h-100 gap-3 cart-button-wrap">
                      <div style={{ position: "relative" }}>
                        <Heart width={18} />
                        {favoritesCount > 0 && (
                          <span
                            className="number"
                            style={{
                              position: "absolute",
                              left: "7px",
                              top: "-6px",
                            }}
                          >
                            {favoritesCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                  <div className={"btn-border-only cart category-hover-header"}>
                    <div aria-describedby={id} className="d-flex align-items-center h-100 gap-3 cart-button-wrap" onClick={handleClick}>
                      <div style={{ position: "relative" }}>
                        <Bell style={{ flexShrink: 0 }} width={18} />
                        {notifications.length > 0 && <span
                          className="number"
                          style={{
                            position: "absolute",
                            left: "7px",
                            top: "-6px",
                          }}
                        >
                          {notifications.length}
                        </span>}
                      </div>
                    </div>
                    {open && <NotificationPopover 
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                    />}
                  </div>
                  <Link
                    href={token ? "/profile" : "/login"}
                    className="btn-border-only account"
                  >
                    <div className="d-flex align-items-center h-100 gap-3 cart-button-wrap">
                      <UserIcon width={18} />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileHeader />
    </>
  );
};

export default Header;