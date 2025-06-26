import { createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

type FavoriteStateType = {
    favoriteProducts: ProductType[];
    favoritesCount: number;
    isLoading: boolean;
}

const initialFavoriteState: FavoriteStateType = {
    favoriteProducts: [],
    favoritesCount: 0,
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
        getFavoriteCounts(state,action) {
            state.favoritesCount = action.payload;
        },
        increaseFavCount(state) {
            state.favoritesCount += 1;
        },
        decreaseFavCount(state) {
            state.favoritesCount -= 1;
        },
        deleteFavoriteItem(state,action) {
            state.favoriteProducts = state.favoriteProducts.filter((item) => item.id !== action.payload);
        }
    }
});

export const useTypedFavoriteSelector: TypedUseSelectorHook<{ favoriteReducer: FavoriteStateType }> = useSelector; 
export const FavoriteProductsAction = favoriteSlice.actions;
export default favoriteSlice;