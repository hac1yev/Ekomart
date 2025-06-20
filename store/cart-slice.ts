import { createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

type CartStateType = {
    cartProducts: CartItem[];
}

const initialCartState: CartStateType = {
    cartProducts: []
}

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: initialCartState,
    reducers: {
        getAllCarts(state,action) {
            state.cartProducts = action.payload;
        },
        addProduct(state,action) {
            const productIndex = state.cartProducts.findIndex((item) => item.productId === action.payload.id);

            if(productIndex !== -1) {
                state.cartProducts[productIndex] = {
                    ...action.payload
                }
            }
        }
    }
})

export const useTypedCartSelector: TypedUseSelectorHook<{ cartReducer: CartStateType }> = useSelector; 
export const cartSliceAction = cartSlice.actions;
export default cartSlice;