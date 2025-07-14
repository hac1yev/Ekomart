import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FavoriteProductsAction } from "@/store/favorites-slice";
import { LoadingSliceAction } from "@/store/loading-slice";
import { cartSliceAction } from "@/store/cart-slice";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useUserInfo from "./useUserInfo";
import { notificationSliceAction } from "@/store/notification-slice";

export const useHeaderData = () => {
  const user = useUserInfo();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(user?.accessToken) {
      (async function() {
        dispatch(LoadingSliceAction.toggleLoading(true));
        try {
          const [notificationData,favoritesData,cartData] = await Promise.all([
            axiosPrivate.get("/api/notification").then((res) => res.data.notifications),
            axiosPrivate.get("/api/products/favorites").then((res) => res.data.favorites),
            axiosPrivate.get("/api/cart").then((res) => res.data.cartProducts)
          ]);

          dispatch(notificationSliceAction.getAllNotifications(notificationData));
          dispatch(FavoriteProductsAction.getFavoriteProducts(favoritesData));
          dispatch(FavoriteProductsAction.getFavoriteCounts(favoritesData.length));
          dispatch(cartSliceAction.getAllCarts(cartData));
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(LoadingSliceAction.toggleLoading(false));
        }
      })()
    }
  }, [axiosPrivate,user?.accessToken,dispatch]); 

  return {
    token: user?.accessToken,
  };
};