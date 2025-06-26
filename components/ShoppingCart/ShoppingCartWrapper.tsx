"use client";

import dynamic from "next/dynamic"
import LinearProgressComponent from "../LoadingProgress/LinearProgressComponent"
import { useTypedCartSelector } from "@/store/cart-slice";
import { useTypedLoadingSelector } from "@/store/loading-slice";

const DynamicCartList = dynamic(() => import('./CartList'), {
    loading: () => <LinearProgressComponent />,
    ssr: false
})

const ShoppingCartWrapper = () => {
    const carts = useTypedCartSelector((state) => state.cartReducer.cartProducts);
    const isLoading = useTypedLoadingSelector((state) => state.loadingReducer.isLoading);

    return (
        <div className="rts-cart-area rts-section-gap bg_light-1">
            <div className="container">
                <div className="row g-5">
                    <div className="col-xl-9 col-lg-12 col-md-12 col-12 order-2 order-xl-1 order-lg-2 order-md-2 order-sm-2">
                        {/* <div className="cart-area-main-wrapper">
                            <div className="cart-top-area-note">
                                <p>Add <span>$59.69</span> to cart and get free shipping</p>
                                <div className="bottom-content-deals mt--10">
                                    <div className="single-progress-area-incard">
                                        <div className="progress">
                                            <div className="progress-bar wow fadeInLeft" role="progressbar" style={{ width: '80%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className="rts-cart-list-area">
                            <div className="single-cart-area-list head">
                                <div className="product-main">
                                    <p>Products</p>
                                </div>
                                <div className="price">
                                    <p>Price</p>
                                </div>
                                <div className="quantity">
                                    <p>Quantity</p>
                                </div>
                                <div className="subtotal">
                                    <p>SubTotal</p>
                                </div>
                            </div>
                            {carts.length === 0 && !isLoading && (
                                <div className="single-cart-area-list head d-flex justify-content-center">
                                    <h4 className="mb--0">There is no product on your cart!</h4>
                                </div>
                            )}
                            <DynamicCartList />
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-12 col-md-12 col-12 order-1 order-xl-2 order-lg-1 order-md-1 order-sm-1">
                        <div className="cart-total-area-start-right">
                            <h5 className="title">Cart Totals</h5>
                            <div className="bottom">
                                <div className="wrapper">
                                    <span>Subtotal</span>
                                    <h6 className="price">$1100.00</h6>
                                </div>
                                <div className="button-area">
                                    <button className="rts-btn btn-primary">Proceed To Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCartWrapper