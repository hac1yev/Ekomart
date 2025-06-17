import { getAverageRating, getReviewCount } from "@/app/lib/getRating"
import RatingStar from "../RatingStar/RatingStar";
import StaticRatingStar from "../RatingStar/StaticRatingStar";
import { FormEvent, useMemo, useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useParams } from "next/navigation";

const TabCustomer = ({ productDetailRatingResult }: { productDetailRatingResult: ProductDetailRatingResultType }) => {
  const [ratingData,setRatingData] = useState<RatingType>({ star: null, reviewMessage: "" });
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const userId: string = typeof window !== "undefined" && localStorage.getItem("userInfo") 
    ? JSON.parse(localStorage.getItem("userInfo") || "{}").userId 
    : "";  
    
  const filteredRating = useMemo(() => {
    return productDetailRatingResult.ratingResult.filter((item) => item.count !== 0);
  }, [productDetailRatingResult.ratingResult]);

  const reviewCount = useMemo(() => {
    return getReviewCount(filteredRating);
  }, [filteredRating]);  

  const average = useMemo(() => {
    return getAverageRating(filteredRating)?.toFixed(1);
  }, [filteredRating]);

  const handleChangeRating = (star: number) => {
    setRatingData(prev => {
      return {
        ...prev,
        star,
      }
    })
  };

  const handleSubmitRating = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axiosPrivate.post(`/api/products/${id}/rating`, JSON.stringify({
        ...ratingData,
        userId
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      setRatingData({ star: null, reviewMessage: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="single-tab-content-shop-details">
      <div className="product-details-review-product-style">
        <div className="average-stars-area-left">
          <div className="top-stars-wrapper">
            <h4 className="review">{!average ? 'No Rating Yet' : average}</h4>
          </div>
          {average && <div className="review-charts-details">
            {Array.from({ length: 5 }, (_, i) => i + 1).toSorted((a,b) => b-a).map((item) => {
              const findedStar = filteredRating.find((el) => el.star === item);

              return (
                <div className="single-review" key={item}>
                  <div className="stars">
                    <StaticRatingStar filledStars={item} />
                    {findedStar ? (
                      <span className="pac">{(findedStar.count / reviewCount) * 100}%</span>
                    ) : (
                      <span className="pac">0%</span>
                    )}
                  </div>
                  <div className="single-progress-area-incard">
                    <div className="progress">
                      <div
                        className="progress-bar wow fadeInLeft"
                        role="progressbar"
                        style={{ width: findedStar ? `${(findedStar.count / reviewCount) * 100}%` : '0%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>}
        </div>
        <div className="submit-review-area" style={{ width: '100%' }}>
          <form onSubmit={handleSubmitRating} className="submit-review-area">
            <h5 className="title">Submit Your Review</h5>
            <div className="your-rating">
              <span>Rating Product:</span>
              <RatingStar handleChangeRating={handleChangeRating} />
            </div>
            <textarea
              name="reviewMsg"
              id="reviwMsg"
              placeholder="Write Your Review"
              value={ratingData.reviewMessage}
              onChange={(e) => {
                setRatingData((prev) => {
                  return {
                    ...prev,
                    reviewMessage: e.target.value
                  }
                })
              }}
            ></textarea>
            <button className="rts-btn btn-primary">SUBMIT REVIEW</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TabCustomer;
