import { useDispatch } from "react-redux";
import useAxiosPrivate from "./useAxiosPrivate";
import { cartSliceAction } from "@/store/cart-slice";
import toast from "react-hot-toast";

const useShoppingCart = () => {
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const userId: string =
        typeof window !== "undefined" && localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo") || "{}").userId
        : "";

    const handleAddToCart = async ({ productId,image,title,price,quantity }: Pick<CartItem, keyof Omit<CartItem, 'totalPrice'>>) => {
        try {
            const response = await axiosPrivate.post("/api/cart", JSON.stringify({ productId, userId, quantity, totalPrice: price * quantity }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            dispatch(cartSliceAction.addProduct({ productId,image,title,price,quantity,totalPrice: quantity * price  }));

            if(response.status === 200) {
                toast.success("Product added to cart.");
            }
        } catch (error) {
            console.log(error);
            toast.error("An unexpected error occurred.");
        }
    };
    
    const handleIncreaseQuantity = async ({ productId,price }: { productId: number, price: number }) => {        
        try {
            const response = await axiosPrivate.put("/api/cart", JSON.stringify({ productId,userId,price,count_type: 'increase' }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            dispatch(cartSliceAction.increaseProductCount({ productId, price }));

            if(response.status === 200) {
                toast.success("Product quantity increased.");
            }
        } catch (error) {
            console.log(error);
            toast.error("An unexpected error occurred.");
        }
    };

    const handleDecreaseQuantity = async ({ productId,price }: { productId: number, price: number }) => {        
        try {
            const response = await axiosPrivate.put("/api/cart", JSON.stringify({ productId,userId,price,count_type: 'decrease' }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            dispatch(cartSliceAction.decreaseProductCount({ productId, price }));

            if(response.status === 200) {
                toast.success("Product quantity decreased.");
            }
        } catch (error) {
            console.log(error);
            toast.error("An unexpected error occurred.");
        }
    };

    const handleRemoveFromCart = async (productId: number) => {
        try {
            const response = await axiosPrivate.delete(`/api/cart/${productId}`);
            dispatch(cartSliceAction.deleteProduct({ productId }));

            if(response.status === 200) {
                toast.success("Product removed from cart.");
            }
        } catch (error) {
            console.log(error);
            toast.error("An unexpected error occurred.");
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