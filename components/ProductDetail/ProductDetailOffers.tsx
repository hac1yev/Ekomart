import { Box, Handshake, RotateCcwSquare } from "lucide-react";
import payment from '../../public/images/payment/01.png';
import React from "react";
import Image from "next/image";

const ProductDetailOffers = () => {
  return (
    <div className="theiaStickySidebar">
      <div className="shop-sight-sticky-sidevbar  mb--20">
        <h6 className="title">Available offers</h6>
        <div className="single-offer-area">
          <div className="icon">
            <Handshake width={20} />
          </div>
          <div className="details">
            <p>
              Get %5 instant discount for the 1st Flipkart Order using Ekomart
              UPI T&C
            </p>
          </div>
        </div>
        <div className="single-offer-area">
          <div className="icon">
            <RotateCcwSquare width={20} />
          </div>
          <div className="details">
            <p>
              Flat $250 off on Citi-branded Credit Card EMI Transactions on
              orders of $30 and above T&C
            </p>
          </div>
        </div>
        <div className="single-offer-area">
          <div className="icon">
            <Box width={20} />
          </div>
          <div className="details">
            <p>Free Worldwide Shipping on all orders over $100</p>
          </div>
        </div>
      </div>
      <div className="our-payment-method">
        <h5 className="title">Guaranteed Safe Checkout</h5>
        <Image width={300} height={30} src={payment} alt="payment" priority />
      </div>
    </div>
  );
};

export default ProductDetailOffers;