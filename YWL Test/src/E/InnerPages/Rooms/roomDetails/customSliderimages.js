import React, { useState, useEffect } from "react";

import BannerContainer from "../../../InnerPages/BannerComponent/BannerContainer";
import { useRecoilValue } from "recoil";
import { themeSelector } from "../../../../Recoil/themeModule";
import WrappperCheckAvailibility from "../../../CheckAvailibilty/WrapperCheckAvailibity";
import { seoThemeDetails } from "../../../../Recoil/themeModule";
import {
  getSeoDescriptionData,
  getPropRoomsDetailsData,
} from "../../../../DataLayer/datalayerUtilities";
import "../../Rooms/index.css";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
// import CustomSlider from '../roomDetails/customSliderimages';
import { propertyDataSelector } from "./../../../../Recoil/themeModule";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function Imagesslider(props) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    swipeToSlide: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Slider
        asNavFor={nav1}
        ref={(slider2) => setNav2(slider2)}
        className="custome-first-slide"
      >
        {Object.values(props.ImagesSlider)
          .filter((fil) => {
            return fil.room_type_id;
          })
          .map((item, index) => {
            return Object.values(item.room_images).map((subitem) => {
              return (
                <div>
                  <img
                    title={item.room_name}
                    src={
                      "https://beta.yosemitewestgate.com/" +
                      "gallery-images/properties/medium/" +
                      subitem.image_name
                    }
                    alt=""
                    className="W100 height-400"
                  />{" "}
                </div>
              );
            });
          })}
      </Slider>

      <Slider
        {...settings}
        asNavFor={nav2}
        ref={(slider1) => setNav1(slider1)}
        className="custome-second-slide d-none d-lg-block"
      >
        {Object.values(props.ImagesSlider)
          .filter((fil) => {
            return fil.room_type_id;
          })
          .map((item, index) => {
            return Object.values(item.room_images).map((subitem) => {
              return item.room_images.length >= 4 ? (
                <div className="greaterFour">
                  {" "}
                  <img
                    title={subitem.image_caption}
                    src={
                      "https://beta.yosemitewestgate.com/" +
                      "gallery-images/properties/medium/" +
                      subitem.image_name
                    }
                    alt=""
                    className="W100 height-150"
                  />{" "}
                </div>
              ) : (
                <div className="lessFour">
                  {" "}
                  <img
                    title={subitem.image_caption}
                    src={
                      "https://beta.yosemitewestgate.com/" +
                      "gallery-images/properties/medium/" +
                      subitem.image_name
                    }
                    alt=""
                    className="W100 height-150"
                  />{" "}
                </div>
              );
            });
          })}
      </Slider>
    </>
  );
}
