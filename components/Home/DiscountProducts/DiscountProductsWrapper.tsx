import { useTypedHomeSelector } from "@/store/home-slice";
import DiscountCardItem from "./DiscountCardItem";

const DiscountProductsWrapper = () => {
    const discountProducts = useTypedHomeSelector((state) => state.homePageReducer.homePageData).discountProducts;

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="product-with-discount">
                    <div className="row g-5">
                        <div className="col-xl-4 col-lg-12">
                            <a href="shop-details.html" className="single-discount-with-bg">
                                <div className="inner-content">
                                    <h4 className="title">Alpro Organic Flavored <br />
                                        Fresh Juice</h4>
                                    <div className="price-area">
                                        <span>Only</span>
                                        <h4 className="title">
                                            $15.00
                                        </h4>
                                    </div>
                                </div>
                            </a>
                            <a href="shop-details.html" className="single-discount-with-bg bg-2">
                                <div className="inner-content">
                                    <h4 className="title">Alpro Organic Flavored <br />
                                        Fresh Juice</h4>
                                    <div className="price-area">
                                        <span>Only</span>
                                        <h4 className="title">
                                            $15.00
                                        </h4>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-xl-8 col-lg-12">
                            <div className="row">
                                {discountProducts?.map((product) => (
                                    <div className="col-lg-6 mb-4" key={product.id}>
                                        <DiscountCardItem 
                                            key={product.id}
                                            {...product}
                                        />
                                    </div> 
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscountProductsWrapper;