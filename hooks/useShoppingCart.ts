import { useDispatch } from "react-redux";
import useAxiosPrivate from "./useAxiosPrivate";
import { cartSliceAction } from "@/store/cart-slice";

const useShoppingCart = () => {
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const userId: string =
        typeof window !== "undefined" && localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo") || "{}").userId
        : "";

    const handleAddToCart = async ({ productId,image,title,price,quantity }: Pick<CartItem, keyof Omit<CartItem, 'totalPrice'>>) => {
        try {
            await axiosPrivate.post("/api/cart", JSON.stringify({ productId, userId, totalPrice: price * quantity }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            dispatch(cartSliceAction.addProduct({ productId,image,title,price,quantity,totalPrice: quantity * price  }));
        } catch (error) {
            console.log(error);
        }
    }; 

    const handleRemoveFromCart = async (productId: number) => {
        try {
            await axiosPrivate.delete(`/api/cart/${productId}`);
        } catch (error) {
            console.log(error);
        }
    }; 

    return {
        handleAddToCart,
        handleRemoveFromCart
    }
}

export default useShoppingCart