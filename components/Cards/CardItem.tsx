"use client";

import Image from "next/image";
import bookmark from "../../public/images/bookmark.png";
import { ChevronDown, ChevronUp, EyeIcon, ShoppingCart } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import useFavorite from "@/hooks/useFavorite";
import useShoppingCart from "@/hooks/useShoppingCart";

const CardItem = (
  props: Pick<ProductCardType, keyof ProductCardType> & {
    componentType?: string;
    handleOpenModal?: (id: string) => void;
  }
) => {
  const [count, setCount] = useState(1);
  const { handleAddFavorite, handleRemoveFavorite } = useFavorite(props.componentType as string);
  const { handleAddToCart } = useShoppingCart();

  const handleIncreaseCount = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecreaseCount = () => {
    if (count === 1) return;
    else setCount((prev) => prev - 1);
  };    

  return (
    <div
      className={
        props.componentType === "weekly"
          ? "single-shopping-card-one weekly-grocery-height"
          : "single-shopping-card-one featured-grocery-height"
      }
    >
      {" "}
      <div className="image-and-action-area-wrapper">
        <Link href={`/products/${props.id}`} className="thumbnail-preview">
          <div className="badge">
            <span>
              {props.discount}% <br />
              Off
            </span>
            <Image
              src={bookmark}
              width={50}
              height={50}
              alt="bookmark"
              priority
            />
          </div>
          <Image
            src={props.image}
            width={300}
            height={200}
            alt={props.brand}
            priority
          />
        </Link>
        <div className="action-share-option">
          {props.liked === 1 ? (
            <div
              className="single-action openuptip message-show-action"
              data-flow="up"
              title="Add To Wishlist"
              onClick={handleRemoveFavorite.bind(null, props.id)}
            >
              <FaHeart width={17} style={{ color: "#fff" }} />
            </div>
          ) : (
            <div
              className="single-action openuptip message-show-action"
              data-flow="up"
              title="Add To Wishlist"
              onClick={handleAddFavorite.bind(null, props.id)}
            >
              <FaRegHeart width={17} style={{ color: "#fff" }} />
            </div>
          )}
          <div
            className="single-action openuptip cta-quickview product-details-popup-btn"
            data-flow="up"
            title="Quick View"
            // onClick={() => props.handleOpenModal(props.id)}
          >
            <EyeIcon width={17} style={{ color: "#fff" }} />
          </div>
        </div>
      </div>
      <div className="body-content">
        <Link href={`/products/${props.id}`}>
          <h4 className="title">{props.title}</h4>
        </Link>
        <div className="price-area">
          <span className="current">${props.price.toFixed(2)}</span>
          <div className="previous">${props.value.toFixed(2)}</div>
        </div>
        <div className="cart-counter-action">
          <div className="quantity-edit">
            <span>{count}</span>
            <div className="button-wrapper-action">
              <button className="button" onClick={handleIncreaseCount}>
                <ChevronUp width={16} />
              </button>
              <button className="button" onClick={handleDecreaseCount}>
                <ChevronDown width={16} />
              </button>
            </div>
          </div>
          <button className="rts-btn btn-primary radious-sm with-icon" onClick={handleAddToCart.bind(null, {
            productId: props.id,
            image: props.image,
            title: props.title,
            price: props.price,
            quantity: 1
          })}>
            <div className="btn-text d-flex align-items-center gap-2">
              <span>Add</span>
              <ShoppingCart width={17} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardItem;