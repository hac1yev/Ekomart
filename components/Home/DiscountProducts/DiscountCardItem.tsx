"use client";

import { ChevronDown, ChevronUp, ShoppingCart } from "lucide-react";
import bookmark from "../../../public/images/bookmark.png";
import Image from "next/image";
import useShoppingCart from "@/hooks/useShoppingCart";
import { useState } from "react";

type DiscountProductsType = "id" | "discount" | "image" | "brand" | "title" | "price" | "value";

const DiscountCardItem = ({ id, discount, image, title, price, value, brand }: Pick<ProductType, DiscountProductsType>) => {
  const { handleAddToCart } = useShoppingCart();
  const [count,setCount] = useState(1);

  const handleIncreaseCount = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecreaseCount = () => {
    if (count === 1) return;
    else setCount((prev) => prev - 1);
  };    

  return (
    <div className="single-shopping-card-one discount-offer">
      <a href="shop-details.html" className="thumbnail-preview">
        <div className="badge">
          <span>
            {discount}% <br />
            Off
          </span>
          <Image src={bookmark} width={50} alt="bookmark" priority />
        </div>
        <Image
          width={300}
          height={150}
          src={image}
          alt={brand}
          priority
        />
      </a>
      <div className="body-content">
        <a href="shop-details.html">
          <h4 className="title">{title}</h4>
        </a>
        <div className="price-area">
          <span className="current">${price}</span>
          <div className="previous">${value}</div>
        </div>
        <div className="cart-counter-action">
          <div className="quantity-edit">
            <span style={{ fontSize: '16px' }}>{count}</span>
            <div className="button-wrapper-action">
              <button className="button" onClick={handleDecreaseCount}>
                <ChevronDown width={16} />
              </button>
              <button className="button plus" onClick={handleIncreaseCount}>
                <ChevronUp width={16} />
              </button>
            </div>
          </div>
          <button className="rts-btn btn-primary radious-sm with-icon" onClick={handleAddToCart.bind(null, {
            productId: id,
            image: image,
            title: title,
            price: price,
            quantity: count
          })}>
            <span className="btn-text">Add</span>
            <ShoppingCart width={17} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountCardItem;