import { createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

type FavoriteStateType = {
    favoriteProducts: ProductType[];
    isLoading: boolean;
}

const initialFavoriteState: FavoriteStateType = {
    favoriteProducts: [],
    isLoading: true
};

const favoriteSlice = createSlice({
    name: 'favoriteSlice',
    initialState: initialFavoriteState,
    reducers: {
        getFavoriteProducts(state,action) {
            state.favoriteProducts = action.payload;
        },
        toggleLoading(state,action) {
            state.isLoading = action.payload;
        },
        deleteFavoriteItem(state,action) {
            state.favoriteProducts = state.favoriteProducts.filter((item) => item.id !== action.payload);
        }
    }
});

export const useTypedFavoriteSelector: TypedUseSelectorHook<{ favoriteReducer: FavoriteStateType }> = useSelector; 
export const FavoriteProductsAction = favoriteSlice.actions;
export default favoriteSlice;