import { HeartIcon, MinusIcon, PlusIcon, ShoppingCart, X } from "lucide-react";
import Image from "next/image";

type CardItemProps = 
  ProductCardModalType & {
    handleCloseModal: () => void;
};

const ProductDetailModal = ({ image,categories,price,value,tags,title,reviewCount,description,handleCloseModal }: CardItemProps) => {
    return (
        <div className="product-detail-modal-overlay">
            <div className="rts-product-details-section rts-product-details-section2 product-details-popup-section">
                <div className="product-details-popup">
                    <button className="product-details-close-btn" onClick={() => handleCloseModal()}>
                        <X width={18}/>
                    </button>
                    <div className="details-product-area">
                        <div className="product-thumb-area">
                            <div className="cursor"></div>
                            <div className="thumb-wrapper one filterd-items figure">
                                <div className="product-thumb zoom">
                                    <Image src={image} width={200} height={300} alt="product-thumb" priority />
                                </div>
                            </div>
                            <div className="thumb-wrapper two filterd-items hide">
                                <div className="product-thumb zoom">
                                    {/* <img src="assets/images/products/product-filt2.jpg" alt="product-thumb" /> */}
                                </div>
                            </div>
                            <div className="thumb-wrapper three filterd-items hide">
                                <div className="product-thumb zoom">
                                    {/* <img src="assets/images/products/product-filt3.jpg" alt="product-thumb" /> */}
                                </div>
                            </div>
                            <div className="product-thumb-filter-group">
                                <div className="thumb-filter filter-btn active" data-show=".one">
                                    {/* <img src="assets/images/products/product-filt1.jpg" alt="product-thumb-filter" /> */}
                                </div>
                                <div className="thumb-filter filter-btn" data-show=".two">
                                    {/* <img src="assets/images/products/product-filt2.jpg" alt="product-thumb-filter" /> */}
                                </div>
                                <div className="thumb-filter filter-btn" data-show=".three">
                                    {/* <img src="assets/images/products/product-filt3.jpg" alt="product-thumb-filter" /> */}
                                </div>
                            </div>
                        </div>
                        <div className="contents">
                            <div className="product-status">
                                <span className="product-catagory">{categories.join("")}</span>
                                <div className="rating-stars-group">
                                    <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#000' }}>5.0</span> Average Rating 
                                    <span>{reviewCount} Reviews</span>
                                </div>
                            </div>
                            <h2 className="product-title">{title} <span className="stock">In Stock</span></h2>
                            <span className="product-price"><span className="old-price">${value.toFixed()}</span> ${price.toFixed()}</span>
                            <p>
                                {description}
                            </p>
                            <div className="product-bottom-action">
                                <div className="cart-edit">
                                    <div className="quantity-edit action-item">
                                        <button className="button">
                                            <MinusIcon className="minus-icon" width={16}/>
                                        </button>
                                        <input type="text" className="input" value={1} />
                                        <button className="button plus" style={{ cursor: 'pointer' }}>
                                            <PlusIcon className="plus-icon" width={16}/>
                                        </button>
                                    </div>
                                </div>
                                <button className="rts-btn btn-primary radious-sm with-icon">
                                    <div className="btn-textn d-flex align-items-center gap-2">
                                        <span>Add To Cart</span>
                                        <ShoppingCart width={20} />
                                    </div>
                                </button>
                                <button className="rts-btn btn-primary ml--20">
                                    <HeartIcon width={20} />
                                </button>
                            </div>
                            <div className="product-uniques">
                                <span className="sku product-unipue"><span>SKU: </span> BO1D0MX8SJ</span>
                                <span className="tags product-unipue"><span>Tags: </span> {tags.join(", ")}</span>
                            </div>
                            <div className="share-social">
                                <span>Share:</span>
                                <a className="platform" href="http://facebook.com/" target="_blank"><i
                                    className="fab fa-facebook-f"></i></a>
                                <a className="platform" href="http://twitter.com/" target="_blank"><i
                                    className="fab fa-twitter"></i></a>
                                <a className="platform" href="http://behance.com/" target="_blank"><i
                                    className="fab fa-behance"></i></a>
                                <a className="platform" href="http://youtube.com/" target="_blank"><i
                                    className="fab fa-youtube"></i></a>
                                <a className="platform" href="http://linkedin.com/" target="_blank"><i
                                    className="fab fa-linkedin"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailModal;
