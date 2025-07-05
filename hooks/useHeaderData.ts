import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FavoriteProductsAction } from "@/store/favorites-slice";
import { LoadingSliceAction } from "@/store/loading-slice";
import { cartSliceAction } from "@/store/cart-slice";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useUserInfo from "./useUserInfo";

export const useHeaderData = () => {
  const user = useUserInfo();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.accessToken) {
      (async () => {
        dispatch(LoadingSliceAction.toggleLoading(true));
        try {
          const response = await axiosPrivate.get("/api/products/favorites");
          dispatch(FavoriteProductsAction.getFavoriteProducts(response.data.favorites));
          dispatch(FavoriteProductsAction.getFavoriteCounts(response.data.favorites.length));
        } catch (error) {
          console.error(error);
        } finally {
          dispatch(LoadingSliceAction.toggleLoading(false));
        }
      })();
    }
  }, [user?.accessToken,axiosPrivate,dispatch]);

  useEffect(() => {
    if (user?.accessToken) {
      (async () => {
        dispatch(LoadingSliceAction.toggleLoading(true));
        try {
          const response = await axiosPrivate.get("/api/cart");
          dispatch(cartSliceAction.getAllCarts(response.data.cartProducts));
        } catch (error) {
          console.error(error);
        } finally {
          dispatch(LoadingSliceAction.toggleLoading(false));
        }
      })();
    }
  }, [user?.accessToken,axiosPrivate,dispatch]);

  return {
    token: user?.accessToken,
  };
};