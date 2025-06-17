import { createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

type HomePageType<T> = {
    homePageData: {
        [key: string]: T[], 
    }
}

const initialHomeState: HomePageType<ProductType> = {
    homePageData: {
        discountProducts: [],
        trendingProducts: [],
        featuredProducts: [],
        weeklyProducts: [],
    }
}

const homePageSlice = createSlice({
    name: 'homePageSlice', 
    initialState: initialHomeState,
    reducers: {
        getAllHomeData(state,action) {
            state.homePageData = {
                discountProducts: action.payload.discountProducts, 
                trendingProducts: action.payload.trendingProducts, 
                featuredProducts: action.payload.featuredProducts, 
                weeklyProducts: action.payload.weeklyProducts,
            }
        },
        addFavProducts(state, action) {
            const productKeys = ['discountProducts', 'trendingProducts', 'featuredProducts', 'weeklyProducts'] as const;

            productKeys.forEach((key) => {
                const index = state.homePageData[key].findIndex(product => product.id === action.payload);
                if (index !== -1) {
                    state.homePageData[key][index].liked = 1;
                }
            });
        },
        deleteFavProducts(state, action) {
            const productKeys = ['discountProducts', 'trendingProducts', 'featuredProducts', 'weeklyProducts'] as const;
            
            productKeys.forEach((key) => {
                const index = state.homePageData[key].findIndex(product => product.id === action.payload);
                if (index !== -1) {
                    state.homePageData[key][index].liked = 0;
                }
            });
        },
    }
});

export const useTypedHomeSelector: TypedUseSelectorHook<{ homePageReducer: HomePageType<ProductType> }> = useSelector;
export const homePageSliceAction = homePageSlice.actions;
export default homePageSlice;