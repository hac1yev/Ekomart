"use client";

import { useEffect } from "react";
import ProductDetailOffers from "./ProductDetailOffers";
import productDetailSlice, { useTypedProductDetailSelector } from "@/store/product-detail-slice";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import axios from "axios";

const DynamicProductDetailContent = dynamic(() => import("./ProductDetailContent"), {
    loading: () => <p>Loading...</p>,
  }
);

const DynamicProductDetailTabs = dynamic(() => import("./ProductDetailTabs"), {
  loading: () => <p>Loading...</p>,
});

const ProductDetailContainer = ({ id }: { id: string }) => {
  const productContent = useTypedProductDetailSelector(state => state.productDetailReducer.productContent);
  const productDetailAdditionalInfo = useTypedProductDetailSelector(state => state.productDetailReducer.additionalInfo);
  const productDetailRatingResult = useTypedProductDetailSelector(state => state.productDetailReducer.ratingResult);

  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(`/api/products/${id}`);
        dispatch(productDetailSlice.actions.getAllProductItems(response.data.product));                
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id, dispatch]);

  return (
    <div className="rts-chop-details-area rts-section-gap bg_light-1">
      <div className="container">
        <div className="shopdetails-style-1-wrapper">
          <div className="row g-5">
            <div className="col-xl-8 col-lg-8 col-md-12">
              {productContent  && <DynamicProductDetailContent productContent={productContent} />}
            </div>
            <div className="col-xl-3 col-lg-4 col-md-12 offset-xl-1  rts-sticky-column-item">
              <ProductDetailOffers />
            </div>
            <div className="col-md-12">
              {productDetailAdditionalInfo && productDetailRatingResult && (
                <DynamicProductDetailTabs 
                  productDetailRatingResult={productDetailRatingResult} 
                  productDetailAdditionalInfo={productDetailAdditionalInfo} 
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailContainer;