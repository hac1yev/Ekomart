import useAxiosPrivate from './useAxiosPrivate';
import { useDispatch } from 'react-redux';
import { ProductSliceActions } from '@/store/products-slice';
import { homePageSliceAction } from '@/store/home-slice';
import { ProductDetailSliceActions } from '@/store/product-detail-slice';
import { FavoriteProductsAction } from '@/store/favorites-slice';
import toast from 'react-hot-toast';

const useFavorite = (componentType: string) => {
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const userId: string =
        typeof window !== "undefined" && localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo") || "{}").userId
        : "";

    const handleAddFavorite = async (productId: number) => {
        try {
            const response = await axiosPrivate.post(`/api/products/favorites`, JSON.stringify({ productId, userId }), {
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

            if(response.status === 200) {
                toast.success("Product added to favorites.");
            }
        } catch (error) {
            console.log(error);
            toast.error("An unexpected error occurred.");
        }
    };

    const handleRemoveFavorite = async (productId: number) => {    
        try {
            const response = await axiosPrivate.delete(`/api/products/favorites/${productId}`);
            
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

            if(response.status === 200) {
                toast.success("Product removed from favorites.");
            }
        } catch (error) {
            console.log(error);
            toast.error("An unexpected error occurred.");
        }
    };

    return {
        handleAddFavorite,
        handleRemoveFavorite
    }
};

export default useFavorite;