import Image from "next/image";
import bookmark from "../../../public/images/bookmark.png";
import Link from "next/link";
import { useTypedHomeSelector } from "@/store/home-slice";

const TrendingProducts = () => {
  const trendingProducts = useTypedHomeSelector((state) => state.homePageReducer.homePageData).trendingProducts;
  if(trendingProducts?.length === 0) {
    return <p>Loading...</p>
  }

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
        <div className="row">
          <div className="col-lg-12">
            <div className="cover-card-main-over">
              <div className="row g-4">
                {trendingProducts?.map((product) => (
                  <div className="col-xl-3 col-md-6 col-sm-12 col-12" key={product.id}>
                    <div className="single-shopping-card-one tranding-product">
                      <Link href="/" className="thumbnail-preview">
                        <div className="badge">
                          <span>{product.discount}% <br />Off</span>
                          <Image src={bookmark} width={50} height={50} alt="bookmark" priority />
                        </div>
                        <Image width={200} height={100} src={product.image} alt="grocery" priority />
                      </Link>
                      <div className="body-content">
                        <Link href="/">
                          <h4 className="title">{product.title}</h4>
                        </Link>
                        <span className="availability">500g Pack</span>
                        <div className="price-area">
                          <span className="current">${product.price.toFixed(2)}</span>
                          <div className="previous">${product.value.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
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

export default TrendingProducts;
