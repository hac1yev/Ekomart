import { ChevronDown, ChevronUp, ShoppingCartIcon, X } from "lucide-react";
import Image from "next/image";
import { useState } from 'react';
import useFavorite from "@/hooks/useFavorite";
import useShoppingCart from "@/hooks/useShoppingCart";

const FavoritesList = ({ favorites }: { favorites: ProductType[] }) => {
  const [count, setCount] = useState<Record<string, number>>({});
  const { handleRemoveFavorite } = useFavorite('profile-favorites');
  const { handleAddToCart } = useShoppingCart();

  const handleIncreaseCount = (id: string) => {
    setCount((prev) => {
      return {
        ...prev,
        [id]: (prev[id] || 1) + 1,
      };
    });
  };

  const handleDecreaseCount = (id: string) => {
    if (count[id] === 1) return;
    else
      setCount((prev) => {
        return {
          ...prev,
          [id]: prev[id] - 1,
        };
      });
  };

  return (
    <>
      {favorites.map((item) => (
        <div className="single-cart-area-list main item-parent" key={item.id}>
          <div className="product-main-cart">
            <div
              className="close section-activation"
              onClick={handleRemoveFavorite.bind(null, item.id)}
            >
              <X />
            </div>
            <div className="thumbnail">
              <Image
                width={200}
                height={200}
                src={item.image}
                alt={item.title}
                priority
              />
            </div>
            <div className="information">
              <h6 className="title">{item.title}</h6>
              <span>SKU:BG-{1000 + item.id}</span>
            </div>
          </div>
          <div className="price">
            <p>${item.price.toFixed(2)}</p>
          </div>
          <div className="quantity mr--10">
            <div className="quantity-edit">
              <span>{count[`SKU${item.id}`] || 1}</span>
              <div className="button-wrapper-action">
                <button
                  className="button"
                  onClick={handleIncreaseCount.bind(null, `SKU${item.id}`)}
                >
                  <ChevronUp width={16} />
                </button>
                <button
                  className="button"
                  onClick={handleDecreaseCount.bind(null, `SKU${item.id}`)}
                >
                  <ChevronDown width={16} />
                </button>
              </div>
            </div>
          </div>
          <div className="subtotal">
            <p>${(item.price * (count[`SKU${item.id}`] || 1)).toFixed(2)}</p>
          </div>
          <div className="button-area" onClick={handleAddToCart.bind(null, {
            productId: item.id,
            image: item.image,
            title: item.title,
            price: item.price,
            quantity: count[`SKU${item.id}`] || 1
          })}>
            <button className="rts-btn btn-primary radious-sm with-icon">
              <div className="btn-text" style={{ whiteSpace: 'nowrap' }}>Add To Cart</div>
              <ShoppingCartIcon width={18} />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default FavoritesList;