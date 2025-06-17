import React from "react";

const RatingStar = ({ handleChangeRating }: { handleChangeRating: (value: number) => void }) => {
  return (
    <div className="rating-star-container">
      <div className="container__items">
        {Array.from({ length: 5 }, (_,i) => i+1).toSorted((a,b) => b-a).map((item) => (
          <div key={item}>
            <input type="radio" name="stars" id={`st${item}`} onChange={() => handleChangeRating(item)} />
            <label htmlFor={`st${item}`}>
              <div className="star-stroke">
                <div className="star-fill"></div>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingStar;