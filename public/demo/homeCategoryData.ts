import category1 from "../images/category/01.png"
import category2 from "../images/category/02.png"
import category3 from "../images/category/03.png"
import category4 from "../images/category/04.png"
import category5 from "../images/category/05.png"
import category6 from "../images/category/06.png"
import category7 from "../images/category/07.png"
import category8 from "../images/category/08.png"
import category9 from "../images/category/09.png"
import category10 from "../images/category/10.png"

export const categories = [
    { id: 'c1', image: category1, label: "Organic Vegetable" },
    { id: 'c2', image: category2, label: "Fresh Fruits" },
    { id: 'c3', image: category3, label: "Dairy Products" },
    { id: 'c4', image: category4, label: "Bakery Items" },
    { id: 'c5', image: category5, label: "Frozen Goods" },
    { id: 'c6', image: category6, label: "Meat & Seafood" },
    { id: 'c7', image: category7, label: "Beverages" },
    { id: 'c8', image: category8, label: "Snacks" },
    { id: 'c9', image: category9, label: "Canned Goods" },
    { id: 'c10', image: category10, label: "Spices & Condiments" },
];

export const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 10,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 1250,
          settings: {
            slidesToShow: 7,
            slidesToScroll: 1,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            infinite: true,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: false
          }
        }
      ]
};