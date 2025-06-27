import { useMemo, useState } from "react";
import StaticRatingStar from "../RatingStar/StaticRatingStar";
import { Forward, GitCompare, Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import moment from "moment";
import { getAverageRating, getReviewCount } from "@/app/lib/getRating";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import useFavorite from "@/hooks/useFavorite";
import useShoppingCart from "@/hooks/useShoppingCart";

const ProductDetailContent = ({ productContent }: { productContent: ProductDetailContentType }) => {
  const [count,setCount] = useState(1);
  const { handleAddFavorite, handleRemoveFavorite } = useFavorite('detailContent');
  const { handleAddToCart } = useShoppingCart();

  const filteredRating = useMemo(() => {
    return productContent.ratingResult.filter((item) => item.count !== 0);
  }, [productContent.ratingResult]);

  const reviewCount = useMemo(() => {
    return getReviewCount(filteredRating);
  }, [filteredRating]);    

  const averageRating = useMemo(() => {
    return getAverageRating(filteredRating);
  }, [filteredRating]);

    const handlePlus = () => {
    setCount((prev) => prev + 1);
  };

  const handleMinus = () => {
    if (count === 1) return;
    else setCount((prev) => prev - 1);
  };
  
  return (
    <div className="product-details-popup-wrapper in-shopdetails">
      <div className="rts-product-details-section rts-product-details-section2 product-details-popup-section">
        <div className="product-details-popup">
          <div className="details-product-area">
            <div className="product-thumb-area">
              <div className="thumb-wrapper one filterd-items figure">
                <div
                  className="product-thumb zoom"
                >
                  <Image width={300} height={500} src={productContent.image} alt={productContent.brand} priority />
                </div>
              </div>
            
            </div>
            <div className="contents">
              <div className="product-status">
                <span className="product-catagory">{productContent.brand}</span>
                <div className="rating-stars-group">
                  {averageRating && <>
                    <StaticRatingStar filledStars={Math.round(averageRating)} />
                    <span>{reviewCount} Reviews</span>
                  </>}
                  {!averageRating && <span>No review</span>}
                </div>
              </div>
              <h2 className="product-title">
                {productContent.title}
              </h2>
              <p className="mt--20 mb--20">
                {productContent.description}
              </p>
              <span
                className="product-price mb--15 d-block"
                style={{ color: "#DC2626", fontWeight: "600" }}
              >
                {" "}
                ${productContent.price.toFixed(2)}
                <span className="old-price ml--15">${productContent.value.toFixed(2)}</span>
              </span>
              <div className="product-bottom-action">
                <div className="cart-edits">
                  <div className="quantity-edit action-item">
                    <button className="button" onClick={handleMinus}>
                      <Minus width={18} />
                    </button>
                    <h4 className="mb--0">{count}</h4>
                    <button className="button plus" onClick={handlePlus}>
                      <Plus width={18} />
                    </button>
                  </div>
                </div>
                <button
                  className="rts-btn btn-primary radious-sm with-icon"
                  onClick={handleAddToCart.bind(null, {
                    productId: productContent.id,
                    image: productContent.image,
                    title: productContent.title,
                    price: productContent.price,
                    quantity: count
                  })}
                >
                  <span className="btn-text">Add To Cart</span>
                  <span className="arrow-icon">
                    <ShoppingCart width={20} />
                  </span>
                </button>
              </div>
              <div className="product-uniques">
                <span className="sku product-unipue mb--10">
                  <span
                    style={{
                      fontWeight: "400",
                      marginRight: "10px",
                    }}
                  >
                    Sku:{" "}
                  </span>{" "}
                  BO1D0MX8SJ
                </span>
                <span className="catagorys product-unipue mb--10">
                  <span
                    style={{
                      fontWeight: "400",
                      marginRight: "10px",
                    }}
                  >
                    Categories:{" "}
                  </span>{" "}
                  {productContent.categories.join(", ")}
                </span>
                <span className="tags product-unipue mb--10">
                  <span
                    style={{
                      fontWeight: "400",
                      marginRight: "10px",
                    }}
                  >
                    Tags:{" "}
                  </span>{" "}
                  {productContent.tags.join(", ")}
                </span>
                <span className="tags product-unipue mb--10">
                  <span
                    style={{
                      fontWeight: "400",
                      marginRight: "10px",
                    }}
                  >
                    Life:{" "}
                  </span>{" "}
                  {moment(productContent.life).fromNow()}
                </span>
                <span className="tags product-unipue mb--10">
                  <span
                    style={{
                      fontWeight: "400",
                      marginRight: "10px",
                    }}
                  >
                    Type:{" "}
                  </span>{" "}
                  {productContent.type_content}
                </span>
              </div>
              <div className="share-option-shop-details">
                <div className="single-share-option">
                  {productContent.liked === 1 ? (
                      <div className="icon" onClick={handleRemoveFavorite.bind(null, productContent.id)}>
                        <FaHeart width={20} color="#629d23" />
                      </div>
                    ) : (
                      <div className="icon" onClick={handleAddFavorite.bind(null, productContent.id)}>
                        <FaRegHeart width={20} color="#629d23" />
                      </div>
                  )}
                  <span>{productContent.liked === 1 ? 'Remove From' : 'Add To'} Favorites</span>
                </div>
                <div className="single-share-option">
                  <div className="icon">
                    <Forward color="#629d23" />
                  </div>
                  <span>Share On Social</span>
                </div>
                <div className="single-share-option">
                  <div className="icon">
                    <GitCompare color="#629d23" />
                  </div>
                  <span>Compare</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailContent;