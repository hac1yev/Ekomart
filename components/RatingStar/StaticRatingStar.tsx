import React from "react";

const StaticRatingStar = ({ filledStars }: { filledStars: number }) => {
  return (
    <div className="static-rating-star-container">
      <div className="container__items">
        <label>
          <div className="star-stroke">
            <div className={filledStars >= 1 ? "star-fill" : "star-not-fill"}></div>
          </div>
        </label>
        <label>
          <div className="star-stroke">
            <div className={filledStars >= 2 ? "star-fill" : "star-not-fill"}></div>
          </div>
        </label>
        <label>
          <div className="star-stroke">
            <div className={filledStars >= 3 ? "star-fill" : "star-not-fill"}></div>
          </div>
        </label>
        <label>
          <div className="star-stroke">
            <div className={filledStars >= 4 ? "star-fill" : "star-not-fill"}></div>
          </div>
        </label>
        <label>
          <div className="star-stroke">
            <div className={filledStars === 5 ? "star-fill" : "star-not-fill"}></div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default StaticRatingStar;
