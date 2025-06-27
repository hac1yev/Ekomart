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
            await axiosPrivate.post("/api/cart", JSON.stringify({ productId, userId, quantity, totalPrice: price * quantity }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            dispatch(cartSliceAction.addProduct({ productId,image,title,price,quantity,totalPrice: quantity * price  }));
        } catch (error) {
            console.log(error);
        }
    };
    
    const handleIncreaseQuantity = async ({ productId,price }: { productId: number, price: number }) => {        
        try {
            await axiosPrivate.put("/api/cart", JSON.stringify({ productId,userId,price,count_type: 'increase' }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            dispatch(cartSliceAction.increaseProductCount({ productId, price }));
        } catch (error) {
            console.log(error);
        }
    };

    const handleDecreaseQuantity = async ({ productId,price }: { productId: number, price: number }) => {        
        try {
            await axiosPrivate.put("/api/cart", JSON.stringify({ productId,userId,price,count_type: 'decrease' }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            dispatch(cartSliceAction.decreaseProductCount({ productId, price }));
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemoveFromCart = async (productId: number) => {
        try {
            await axiosPrivate.delete(`/api/cart/${productId}`);
            dispatch(cartSliceAction.deleteProduct({ productId }));
        } catch (error) {
            console.log(error);
        }
    }; 

    return {
        handleAddToCart,
        handleRemoveFromCart,
        handleIncreaseQuantity,
        handleDecreaseQuantity
    }
}

export default useShoppingCart