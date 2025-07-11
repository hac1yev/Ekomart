"use client";

import ProductDetailContainer from "@/components/ProductDetail/ProductDetailContainer";
import { useTypedProductDetailSelector } from "@/store/product-detail-slice";
import axios from "axios";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const ProductDetail = ({ params }: { params: { id: string } }) => {
  const productContent = useTypedProductDetailSelector(state => state.productDetailReducer.productContent);
  const { id } = params;

  useEffect(() => {
    (async function() {
      try {
        await axios.put(`/api/products/${id}/views`);
      } catch (error) {
        console.log(error);
      }
    })()
  }, [id]);

  return (
    <>
      <div className="rts-navigation-area-breadcrumb bg_light-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="navigator-breadcrumb-wrapper">
                <Link href="/">Home</Link>
                <ChevronRight width={18} />
                <Link className="current" href="/products">Products</Link>
                <ChevronRight width={18} />
                <Link className="current" href={`/products/${id}`}>{productContent?.title}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductDetailContainer id={id} />
    </>
  );
};

export default ProductDetail;