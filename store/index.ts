"use client";

import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./products-slice";
import productDetailSlice from "./product-detail-slice";
import homePageSlice from "./home-slice";
import favoriteSlice from "./favorites-slice";
import loadingSlice from "./loading-slice";


export const store = configureStore({
    reducer: {
        productReducer: productSlice.reducer,
        productDetailReducer: productDetailSlice.reducer,
        homePageReducer: homePageSlice.reducer,
        favoriteReducer: favoriteSlice.reducer,
        loadingReducer: loadingSlice.reducer
    }
});