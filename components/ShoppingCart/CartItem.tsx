import useShoppingCart from "@/hooks/useShoppingCart";
import { MinusIcon, PlusIcon, X } from "lucide-react";
import Image from "next/image";
import React from "react";

const CartItem = ({ cart }: { cart: CartItem }) => {
  const { handleAddToCart } = useShoppingCart();

  return (
    <div className="single-cart-area-list main  item-parent">
      <div className="product-main-cart">
        <div className="close section-activation">
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
              className="button" 
            >
                <MinusIcon className="minus-icon" width={16}/>
            </button>
            <span>{cart.quantity}</span>
            <button 
              style={{ cursor: 'pointer', border: 'none' }}
              className="button plus"
              onClick={handleAddToCart.bind(null, {
                productId: cart.productId,
                image: cart.image,
                title: cart.title,
                price: cart.price,
                quantity: 1
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