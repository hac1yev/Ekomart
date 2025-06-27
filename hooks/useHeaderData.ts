import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FavoriteProductsAction } from "@/store/favorites-slice";
import { LoadingProductsAction } from "@/store/loading-slice";
import { cartSliceAction } from "@/store/cart-slice";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

export const useHeaderData = () => {
  const [token, setToken] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken: string =
      typeof window !== "undefined" && localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo") || "{}").accessToken
        : "";
    setToken(accessToken);
  }, []);

  useEffect(() => {
    if (token) {
      (async () => {
        dispatch(LoadingProductsAction.toggleLoading(true));
        try {
          const response = await axiosPrivate.get("/api/products/favorites");
          dispatch(FavoriteProductsAction.getFavoriteProducts(response.data.favorites));
          dispatch(FavoriteProductsAction.getFavoriteCounts(response.data.favorites.length));
        } catch (error) {
          console.error(error);
        } finally {
          dispatch(LoadingProductsAction.toggleLoading(false));
        }
      })();
    }
  }, [token,axiosPrivate,dispatch]);

  useEffect(() => {
    if (token) {
      (async () => {
        dispatch(LoadingProductsAction.toggleLoading(true));
        try {
          const response = await axiosPrivate.get("/api/cart");
          dispatch(cartSliceAction.getAllCarts(response.data.cartProducts));
        } catch (error) {
          console.error(error);
        } finally {
          dispatch(LoadingProductsAction.toggleLoading(false));
        }
      })();
    }
  }, [token,axiosPrivate,dispatch]);

  return {
    token,
  };
};