import { ShoppingCart } from "lucide-react";
import Category from "../Category/Category";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="background-light-gray-color rts-section-gap bg_light-1 pt_sm--20">
      <div className="rts-banner-area-one mb--30">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="category-area-main-wrapper-one">
                <div className="swiper-slide">
                  <div className="banner-bg-image bg_image bg_one-banner  ptb--120 ptb_md--80 ptb_sm--60">
                    <div className="banner-one-inner-content">
                      <span className="pre">
                        Get up to 30% off on your first $150 purchase
                      </span>
                      <h1 className="title">
                        Do not miss our amazing <br />
                        grocery deals
                      </h1>
                      <Link
                        href="/products"
                        className="rts-btn btn-primary radious-sm with-icon"
                      >
                        <div className="btn-text" style={{ display: 'flex', gap: '3px' }}>
                            Shop Now
                            <ShoppingCart width={20} />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rts-caregory-area-one ">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Category />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
