import dynamic from "next/dynamic";
import TrendingSkeletonLoading from "@/components/LoadingProgress/TrendingSkeletonLoading";

const TrendingProductsDynamic = dynamic(() => import("./TrendingProductsWrapper"), {
    loading: () => <TrendingSkeletonLoading />,
    ssr: false
});

const TrendingProducts = () => {

  return (
    <div className="top-tranding-product rts-section-gap">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="title-area-between">
              <h2 className="title-left mb--10">Top Trending Products</h2>
            </div>
          </div>
        </div>
        <TrendingProductsDynamic />
      </div>
    </div>
  );
};

export default TrendingProducts;
