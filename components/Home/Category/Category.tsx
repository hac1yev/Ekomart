"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { categories, settings } from "@/public/demo/homeCategoryData";

const Category = () => {
  return (
    <div className="category-area-main-wrapper-one">
      <div className="swiper mySwiper-category-1 swiper-data">
        <Slider {...settings}>
          {categories.map((category) => (
            <div key={category.id} style={{ gap: '20px' }}>
                <a href="shop-grid-sidebar.html" className="single-category-one">
                  <Image width={100} height={100} src={category.image} alt="category" priority />
                  <p>{category.label}</p>
                </a>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Category;
