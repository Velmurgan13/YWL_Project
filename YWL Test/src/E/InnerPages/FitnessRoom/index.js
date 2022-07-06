import React from "react";
//common banner component
import BannerContainer from "../BannerComponent/BannerContainer";
import BannerImage from "../../../E/Yosemitewestgate/assets/images/BannerImages/fitness-banner.webp";
import BannerImage1 from "../../../E/Yosemitewestgate/assets/images/BannerImages/fitness-banner.webp";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

const FitnessRoom = () => {
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    lazyLoad: "ondemand",
    slidesToShow: 3,
    speed: 500,
    rows: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <BannerContainer
        bannerImageUrl={BannerImage}
        bannerImageUrlMobile={BannerImage1}
        HeadingTitle2="Lorem Ipsum Lorem Ipsum is simply dummy text of the printing"
        InnerPageTitle="NEVER MISS YOUR WORKOUT"
      />
      <div className="container">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="pets-para">
            <p className="ls-1 line-h-22">
              has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to
              make a type specimen book. It has survived not only five
              centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s
              with the release of Letraset sheets containing Lorem Ipsum
              passages, and more recently with desktop publishing software like
              Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <ul>
              <li>
                has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived
              </li>
              <li>
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised
                in the 1960s with the release of Letraset sheets containing
              </li>
              <li>
                Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <Slider {...settings}>
            <div className="image-card">
              <img
                title="Hours Of Operations"
                className="fitness-img"
                src="https://beta.yosemitesouthgate.com/gallery-images/properties/2/7/9/fitness-img1.jpg"
                alt="Hours Of Operations"
                width="373"
                height="200"
                loading="lazy"
              />
            </div>
            <div className="image-card">
              <img
                title="Equipment Brands"
                className="fitness-img"
                src="https://beta.yosemitesouthgate.com/gallery-images/properties/2/7/9/fitness-img2.jpg"
                alt="Equipment Brands"
                width="373"
                height="200"
                loading="lazy"
              />
            </div>
            <div className="image-card">
              <img
                title="Equipment Brands"
                className="fitness-img"
                src="https://beta.yosemitesouthgate.com/gallery-images/properties/2/7/9/fitness-img3.jpg"
                alt="Equipment Brands"
                width="373"
                height="200"
                loading="lazy"
              />
            </div>
            <div className="image-card">
              <img
                title="Hours Of Operations"
                className="fitness-img"
                src="https://beta.yosemitesouthgate.com/gallery-images/properties/2/7/9/fitness-img1.jpg"
                alt="Hours Of Operations"
                width="373"
                height="200"
                loading="lazy"
              />
            </div>
            <div className="image-card">
              <img
                title="Equipment Brands"
                className="fitness-img"
                src="https://beta.yosemitesouthgate.com/gallery-images/properties/2/7/9/fitness-img2.jpg"
                alt="Equipment Brands"
                width="373"
                height="200"
                loading="lazy"
              />
            </div>
            <div className="image-card">
              <img
                title="Equipment Brands"
                className="fitness-img"
                src="https://beta.yosemitesouthgate.com/gallery-images/properties/2/7/9/fitness-img3.jpg"
                alt="Equipment Brands"
                width="373"
                height="200"
                loading="lazy"
              />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};
export default FitnessRoom;
