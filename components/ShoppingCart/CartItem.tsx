import useShoppingCart from "@/hooks/useShoppingCart";
import { MinusIcon, PlusIcon, X } from "lucide-react";
import Image from "next/image";

const CartItem = ({ cart }: { cart: CartItem }) => {
  const { handleDecreaseQuantity,handleIncreaseQuantity,handleRemoveFromCart } = useShoppingCart();

  return (
    <div className="single-cart-area-list main  item-parent">
      <div className="product-main-cart">
        <div className="close section-activation" onClick={handleRemoveFromCart.bind(null,cart.productId)}>
          <X width={35} />
        </div>
        <div className="thumbnail">
          <Image 
            src={cart.image}
            width={65}
            height={45}
            alt={cart.title}
          />
        </div>
        <div className="information">
          <h6 className="title">
            {cart.title}
          </h6>
          <span>SKU:BG-{1000 + cart.productId}</span>
        </div>
      </div>
      <div className="price">
        <p>${cart.price.toFixed(2)}</p>
      </div>
      <div className="quantity" >
        <div className="quantity-edit">
          <div className="button-wrapper-action d-flex justify-content-between align-items-center w-100" style={{ border: 'none' }}>
            <button 
              style={{ cursor: 'pointer', border: 'none' }}
                onClick={() => {
                  if (cart.quantity !== 1) {
                    handleDecreaseQuantity({
                      productId: cart.productId,
                      price: cart.price,
                    });
                  }
                }}
              className="button" 
            >
                <MinusIcon className="minus-icon" width={16}/>
            </button>
            <span>{cart.quantity}</span>
            <button 
              style={{ cursor: 'pointer', border: 'none' }}
              className="button plus"
              onClick={handleIncreaseQuantity.bind(null, {
                productId: cart.productId,
                price: cart.price
              })}
            >
                <PlusIcon className="plus-icon" width={16}/>
            </button>
          </div>
        </div>
      </div>
      <div className="subtotal">
        <p>${cart.totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItem;