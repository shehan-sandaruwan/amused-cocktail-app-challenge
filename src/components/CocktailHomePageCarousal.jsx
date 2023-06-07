import React from "react";
import { cocktailHeroCarousalImages } from "constant/cocktailCarousalconstant";
import Carousel from "react-bootstrap/Carousel";
import "css/cocktailhomepage.css";

const CocktailHomePageCarousal = () => {
  return (
    <Carousel className="home-page-carousal">
      {cocktailHeroCarousalImages.map((item) => {
        return (
          <Carousel.Item interval={3000} key={item.key}>
            <img
              className="d-block w-100"
              src={item.src}
              alt={`carousal${item.key}`}
            />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default CocktailHomePageCarousal;
