import useAxiosPrivate from './useAxiosPrivate';
import { useDispatch } from 'react-redux';
import { ProductSliceActions } from '@/store/products-slice';
import { homePageSliceAction } from '@/store/home-slice';
import { ProductDetailSliceActions } from '@/store/product-detail-slice';
import { FavoriteProductsAction } from '@/store/favorites-slice';

const useFavorite = (componentType: string) => {
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const userId: string =
        typeof window !== "undefined" && localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo") || "{}").userId
        : "";

    const handleAddFavorite = async (productId: number) => {
        try {
            await axiosPrivate.post(`/api/products/favorites`, JSON.stringify({ productId, userId }), {
                headers: {
                    "Content-Type": "application/json",
                },
            });   
            
            switch(componentType) {
                case 'detailContent':
                    dispatch(ProductDetailSliceActions.addFavorite());
                    break;
                case 'featured':
                    dispatch(homePageSliceAction.addFavProducts(productId));
                    break;
                case 'weekly':
                    dispatch(homePageSliceAction.addFavProducts(productId));
                    break;
                default:
                    dispatch(ProductSliceActions.addFavProducts(productId));
                    break;
            }
            dispatch(FavoriteProductsAction.increaseFavCount());
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemoveFavorite = async (productId: number) => {    
        try {
            await axiosPrivate.delete(`/api/products/favorites/${productId}`);
            
            switch(componentType) {
                case 'detailContent':
                    dispatch(ProductDetailSliceActions.removeFavorite());
                    break;
                case 'featured':
                    dispatch(homePageSliceAction.deleteFavProducts(productId));
                    break;
                case 'weekly':
                    dispatch(homePageSliceAction.deleteFavProducts(productId));
                    break;
                case 'profile-favorites':
                    dispatch(FavoriteProductsAction.deleteFavoriteItem(productId));
                    break;
                default:    
                    dispatch(ProductSliceActions.deleteFavProducts(productId));
                    break;
            }
            dispatch(FavoriteProductsAction.decreaseFavCount());
        } catch (error) {
            console.log(error);
        }
    };

    return {
        handleAddFavorite,
        handleRemoveFavorite
    }
};

export default useFavorite;