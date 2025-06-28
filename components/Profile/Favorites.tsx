"use client";

import dynamic from "next/dynamic";
import LinearProgressComponent from "../LoadingProgress/LinearProgressComponent";
import { FavoriteProductsAction, useTypedFavoriteSelector } from "@/store/favorites-slice";
import { LoadingSliceAction, useTypedLoadingSelector } from "@/store/loading-slice";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const AllFavoriteProducts = dynamic(() => import("./FavoritesList"), {
  loading: () => <LinearProgressComponent />,
  ssr: false
});

const Favorites = () => {
  const favorites = useTypedFavoriteSelector((state) => state.favoriteReducer.favoriteProducts);
  const isLoading = useTypedLoadingSelector((state) => state.loadingReducer.isLoading);
  const axiosPrivate =  useAxiosPrivate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      dispatch(LoadingSliceAction.toggleLoading(true));
      try {
        const response = await axiosPrivate.get("/api/products/favorites");
        dispatch(FavoriteProductsAction.getFavoriteProducts(response.data.favorites));
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(LoadingSliceAction.toggleLoading(false));
      }
    })();
  }, [axiosPrivate, dispatch]);

  return (
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-12">
          <div className="rts-cart-list-area wishlist">
            <div className="single-cart-area-list head">
              <div className="product-main">
                <p>Products</p>
              </div>
              <div className="price">
                <p>Price</p>
              </div>
              <div className="quantity">
                <p>Quantity</p>
              </div>
              <div className="subtotal">
                <p>SubTotal</p>
              </div>
              <div className="button-area"></div>
            </div>
            {favorites.length === 0 && !isLoading && (
              <h4 className="text-center my-4">There is no favorite product.</h4>
            )} 
            <AllFavoriteProducts favorites={favorites} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;