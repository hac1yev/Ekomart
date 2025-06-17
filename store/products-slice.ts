import { createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

type ProductState = {
    products: ProductType[];
    totalProducts: number | null;
};

const initialProductState: ProductState = {
    products: [],
    totalProducts: null
};

const productSlice = createSlice({
    name: 'productSlice',
    initialState: initialProductState,
    reducers: {
        getAllProducts(state,action) {
            state.products = [
                ...action.payload.products
            ];
            state.totalProducts = action.payload.totalProducts;
        },
        deleteFavProducts(state,action) {
            const index = state.products.findIndex((product) => product.id === action.payload);
            state.products[index].liked = 0;
        }, 
        addFavProducts(state,action) {
            const index = state.products.findIndex((product) => product.id === action.payload);
            state.products[index].liked = 1;
        }
    },
});

export const useTypedProductSelector: TypedUseSelectorHook<{ productReducer: ProductState }> = useSelector;
export const ProductSliceActions = productSlice.actions; 
export default productSlice;