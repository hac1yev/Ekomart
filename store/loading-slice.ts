import { createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

type LoadingStateType = {
    isLoading: boolean;
}

const initialLoadingState: LoadingStateType = {
    isLoading: false
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
export const LoadingSliceAction = loadingSlice.actions;
export default loadingSlice;