"use client";

import { AlignLeft } from "lucide-react";
import CategoryPopover from "../Popovers/CategoryPopover";
import { useState } from "react";

const Search = () => {
  const [openCategoryPopover,setOpenCartPopover] = useState(false);

  const handleOpenCategoryPopover = () => {
    setOpenCartPopover((prev) => !prev);
  };

  return (
    <>
      <div 
        className="category-btn category-hover-header"
      >
        <div className="d-flex align-items-center h-100 gap-3 cart-button-wrap" onClick={handleOpenCategoryPopover}>
          <AlignLeft
            width={18}
            height={18}
            className="parent"
          />
          <span>Categories</span>
        </div>
        {openCategoryPopover && <CategoryPopover />}
      </div>
      <form action="#" className="search-header">
        <input type="text" placeholder="Search for products, categories or brands" required />
        <a href="#" className="rts-btn btn-primary radious-sm with-icon">
          <div className="btn-text">
              Search
          </div>
          <div className="arrow-icon">
              <i className="fa-light fa-magnifying-glass"></i>
          </div>
          <div className="arrow-icon">
              <i className="fa-light fa-magnifying-glass"></i>
          </div>
        </a>
      </form>
    </>
  );
};

export default Search;