import { createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

type LoadingStateType = {
    isLoading: boolean;
}

const initialLoadingState: LoadingStateType = {
    isLoading: true
};

const loadingSlice = createSlice({
    name: 'loadingSlice',
    initialState: initialLoadingState,
    reducers: {
        toggleLoading(state,action) {
            state.isLoading = action.payload;
        }
    }
});

export const useTypedLoadingSelector: TypedUseSelectorHook<{ loadingReducer: LoadingStateType }> = useSelector; 
export const LoadingProductsAction = loadingSlice.actions;
export default loadingSlice;