import Image from "next/image";
import React from "react";

const CartItem = ({ cart }: { cart: CartItem }) => {
  return (
    <div className="single-cart-area-list main  item-parent">
      <div className="product-main-cart">
        <div className="close section-activation">
          <i className="fa-regular fa-x"></i>
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
      <div className="quantity">
        <div className="quantity-edit">
          <input type="text" className="input" value={1} />
          <div className="button-wrapper-action">
            <button className="button">
              <i className="fa-regular fa-chevron-down"></i>
            </button>
            <button className="button plus">
              +<i className="fa-regular fa-chevron-up"></i>
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
