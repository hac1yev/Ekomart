import { createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

type PDetailProductContentTypes =  'id' | 'brand' | 'title' | 'categories' | 'liked' | 'tags' | 'description' | 'price' | 'value' | 'life' | 'type_content' | 'image' | 'ratingResult';
type PDetailAdditionalInfoType = 'id' | 'additionalInfo' | 'brand' | 'type_content' | 'status_content';
type PDetailRating = 'ratingResult';

type ProductDetailState = {
    productContent: Pick<ProductType, PDetailProductContentTypes> | null;
    additionalInfo: Pick<ProductType, PDetailAdditionalInfoType> | null;
    ratingResult: Pick<ProductType, PDetailRating> | null;
};

const initialProductDetailState: ProductDetailState = {
    productContent: null,
    additionalInfo: null,
    ratingResult: null
};

const productDetailSlice = createSlice({
    name: 'productDetailSlice',
    initialState: initialProductDetailState,
    reducers: {
        getAllProductItems(state,action) {
            state.productContent = {
                id: action.payload.id, brand: action.payload.brand, title: action.payload.title, categories: action.payload.categories,
                tags: action.payload.tags, liked: action.payload.liked, description: action.payload.description, 
                price: action.payload.price, value: action.payload.value, type_content: action.payload.type_content,
                life: action.payload.life, image: action.payload.image, ratingResult: action.payload.ratingResult,
            }

            state.additionalInfo = {
                id: action.payload.id, additionalInfo: action.payload.additionalInfo, brand: action.payload.brand,
                type_content: action.payload.type_content, status_content: action.payload.status_content,
            }

            state.ratingResult = {
                ratingResult: action.payload.ratingResult
            }
        },
        addFavorite(state) {
            if(state.productContent) {
                state.productContent.liked = 1;
            }
        },
        removeFavorite(state) {
            if(state.productContent) {
                state.productContent.liked = 0;
            }
        }
    }
});

export const useTypedProductDetailSelector: TypedUseSelectorHook<{ productDetailReducer: ProductDetailState }> = useSelector;
export const ProductDetailSliceActions = productDetailSlice.actions; 
export default productDetailSlice;