import { createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

type ProductState = {
    products: Pick<ProductType, keyof ProductType>[]
}

const initialProductState: ProductState = {
    products: []
};

const productSlice = createSlice({
    name: 'productSlice',
    initialState: initialProductState,
    reducers: {
        getAllProducts(state,action) {
            state.products = [
                ...action.payload
            ]
        }
    }
});

export const useTypedProductSelector: TypedUseSelectorHook<{ productReducer: ProductState }> = useSelector;
export const ProductSliceActions = productSlice.actions; 
export default productSlice;