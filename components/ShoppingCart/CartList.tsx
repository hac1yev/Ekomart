import { useTypedCartSelector } from "@/store/cart-slice";
import CartItem from "./CartItem";

const ShoppingCartWrapper = () => {
    const carts = useTypedCartSelector((state) => state.cartReducer.cartProducts);

    return (
        <>
            {carts.map((cart) => (
                <CartItem
                    key={cart.productId} 
                    cart={cart}
                />
            ))}
        </>
    );
};

export default ShoppingCartWrapper;