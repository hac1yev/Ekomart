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
            const productIndex = state.cartProducts.findIndex((item) => item.productId === action.payload.productId);

            if (productIndex !== -1) {
                state.cartProducts[productIndex].quantity += action.payload.quantity;
                state.cartProducts[productIndex].totalPrice += (action.payload.price * action.payload.quantity);
            } else {
                state.cartProducts.push(action.payload);
            }
        },
        deleteProduct(state,action) {
            state.cartProducts = state.cartProducts.filter((item) => item.productId !== action.payload.productId);
        },
        increaseProductCount(state,action) {
            const productIndex = state.cartProducts.findIndex((item) => item.productId === action.payload.productId);

            if (productIndex !== -1) {
                state.cartProducts[productIndex].quantity += 1;
                state.cartProducts[productIndex].totalPrice += action.payload.price;
            }
        },
        decreaseProductCount(state,action) {
            const productIndex = state.cartProducts.findIndex((item) => item.productId === action.payload.productId);

            if (productIndex !== -1) {
                state.cartProducts[productIndex].quantity -= 1;
                state.cartProducts[productIndex].totalPrice -= action.payload.price;
            }
        },
    }
})

export const useTypedCartSelector: TypedUseSelectorHook<{ cartReducer: CartStateType }> = useSelector; 
export const cartSliceAction = cartSlice.actions;
export default cartSlice;