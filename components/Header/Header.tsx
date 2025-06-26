"use client";

import Image from "next/image";
import logo1 from "../../public/images/logo/logo-01.svg";
import MobileHeader from "./MobileHeader";
import { Bell, Heart, ShoppingCart, UserIcon } from "lucide-react";
import Link from "next/link";
import Search from "./Search";
import { useTypedFavoriteSelector } from "@/store/favorites-slice";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { FavoriteProductsAction } from "@/store/favorites-slice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LoadingProductsAction } from "@/store/loading-slice";
import { cartSliceAction } from "@/store/cart-slice";

const Header = () => {
  const [token, setToken] = useState("");
  const favoritesCount = useTypedFavoriteSelector((state) => state.favoriteReducer.favoritesCount);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  console.log(favoritesCount);
  

  useEffect(() => {
    const accessToken: string =
      typeof window !== "undefined" && localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo") || "{}").accessToken
        : "";
    setToken(accessToken);
  }, []);

  useEffect(() => {
    if (token) {
      (async function () {
        dispatch(LoadingProductsAction.toggleLoading(true));
        try {
          const response = await axiosPrivate.get("/api/products/favorites");
          dispatch(FavoriteProductsAction.getFavoriteProducts(response.data.favorites));
          dispatch(FavoriteProductsAction.getFavoriteCounts(response.data.favorites.length));
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(LoadingProductsAction.toggleLoading(false));
        }
      })();
    }
  }, [axiosPrivate, dispatch, token]);

  useEffect(() => {
    if(token) {
      (async function() {
        dispatch(LoadingProductsAction.toggleLoading(true));
        try {
          const response = await axiosPrivate.get("/api/cart");
          console.log(response);
          dispatch(cartSliceAction.getAllCarts(response.data.cartProducts));
        } catch (error) {
          console.log(error);
        }finally{
          dispatch(LoadingProductsAction.toggleLoading(false));
        }
      })()
    }
  }, [token,axiosPrivate,dispatch]);

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
                        <span
                          className="number"
                          style={{
                            position: "absolute",
                            left: "7px",
                            top: "-6px",
                          }}
                        >
                          2
                        </span>
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
                    <div className="d-flex align-items-center h-100 gap-3 cart-button-wrap">
                      <div style={{ position: "relative" }}>
                        <Bell style={{ flexShrink: 0 }} width={18} />
                        <span
                          className="number"
                          style={{
                            position: "absolute",
                            left: "7px",
                            top: "-6px",
                          }}
                        >
                          2
                        </span>
                      </div>
                    </div>
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
