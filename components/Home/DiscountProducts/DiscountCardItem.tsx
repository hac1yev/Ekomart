"use client";

import { ChevronDown, ChevronUp, ShoppingCart } from "lucide-react";
import bookmark from "../../../public/images/bookmark.png";
import Image from "next/image";

type DiscountProductsType = "discount" | "image" | "brand" | "title" | "price" | "value";

const DiscountCardItem = ({ discount, image, title, price, value, brand }: Pick<ProductType, DiscountProductsType>) => {
  return (
    <div className="single-shopping-card-one discount-offer">
      <a href="shop-details.html" className="thumbnail-preview">
        <div className="badge">
          <span>
            {discount}% <br />
            Off
          </span>
          <Image src={bookmark} width={50} height={50} alt="bookmark" priority />
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
        {/* <span className="availability">{kg * 1000}g Pack</span> */}
        <div className="price-area">
          <span className="current">${price}</span>
          <div className="previous">${value}</div>
        </div>
        <div className="cart-counter-action">
          <div className="quantity-edit">
            <input type="text" className="input" onChange={() => console.log("")} value={1} />
            <div className="button-wrapper-action">
              <button className="button">
                <ChevronDown width={16} />
              </button>
              <button className="button plus">
                <ChevronUp width={16} />
              </button>
            </div>
          </div>
          <button className="rts-btn btn-primary radious-sm with-icon">
            <span className="btn-text">Add</span>
            <ShoppingCart width={17} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountCardItem;