import { settings } from "@/public/demo/demoCardData";
import Slider from "react-slick";
import CardItem from "../../Cards/CardItem";
import { useTypedHomeSelector } from "@/store/home-slice";

const FeaturedSlider = () => {
    const featuredProducts = useTypedHomeSelector((state) => state.homePageReducer.homePageData).featuredProducts;  

  return (
    <div className="container">
      <div className="row">
        <Slider {...settings}>
          {featuredProducts?.map((card) => (
            <CardItem
              key={card.id}
              componentType="featured"
              // handleOpenModal={handleOpenModal}
              liked={card.liked}
              id={card.id}
              discount={card.discount}
              image={card.image}
              title={card.title}
              price={card.price}
              value={card.value}
              brand={card.brand}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default FeaturedSlider;
