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
import { FaTv, FaBath, FaBed, FaAccessibleIcon } from "react-icons/fa";


export default function Amenitiesslider(props) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    swipeToSlide: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
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
    <div className=" px-0 text-center">
      <div className="container px-0 ">
        <div className="first-slider-ameni">
          <Slider
           slickNext
          {...settings}
          asNavFor={nav2}
          ref={(slider1) => setNav1(slider1)}
            // {...settings}
            // asNavFor={nav2}
            // ref={(slider1) => setNav1(slider1)}
            className="featuresDetails first-slide-amenities"
          >
            <div className="color-amenities">
              <div>
                <span>
                  <FaAccessibleIcon
                    className="text-primary"
                    title="ADA Accessible Guest Room"
                  />
                </span>
                <span>ADA/ACCESSIBLE GUEST ROOM FEATURES</span>
              </div>
            </div>
            <div className="color-amenities">
              <div>
                <span>
                  <FaAccessibleIcon
                    className="text-primary"
                    title="ADA Accessible Guest Room"
                  />
                </span>
                <span>ADA/ACCESSIBLE BATHROOM FEATURES</span>
              </div>
            </div>
            <div className="color-amenities">
              <div>
                <span>
                  <FaBed title="General Services" />
                </span>
                <span>GENERAL SERVICES</span>
              </div>
            </div>

            <div className="color-amenities">
              <div>
                <span>
                  <FaBath title="Bathroom" />
                </span>
                <span>BATHROOM</span>
              </div>
            </div>
            <div className="color-amenities">
              <div>
                <span>
                  <FaTv title="Technology" />
                </span>
                <span>TECHNOLOGY</span>
              </div>
            </div>
          </Slider>
        </div>

        <Slider
          asNavFor={nav1}
          ref={(slider2) => setNav2(slider2)}
          className="overview-second-arrow second-amenities-slider"
        >
          {Object.values(props.Amenitiesslide)
            .filter((fil) => {
              return fil.room_type_id;
            })
            .map((item, index) => {
              return Object.values(item.ADAamenities)
                .filter((fill) => {
                  return (
                    fill.group_name == "ADA/Accessible Guest Room Features"
                  );
                })
                .map((subitem) => {
                  return (
                    <ul className="second-ame">
                      {subitem.aminities.map((sss) => {
                        return (
                          <>
                            {" "}
                            <li
                              type="disc"
                              className="text-justify col-11 col-md-11"
                            >
                              {sss.name}
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  );
                });
            })}

          {Object.values(props.Amenitiesslide)
            .filter((fil) => {
              return fil.room_type_id;
            })
            .map((item, index) => {
              return Object.values(item.ADAamenities)
                .filter((fill) => {
                  return fill.group_name == "ADA/Accessible Bathroom Features";
                })
                .map((subitem) => {
                  return (
                    <ul className="second-ame">
                      {subitem.aminities.map((sss) => {
                        return (
                          <>
                            {" "}
                            <li
                              type="disc"
                              className="text-justify col-11 col-md-11"
                            >
                              {sss.name}
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  );
                });
            })}

          {Object.values(props.Amenitiesslide)
            .filter((fil) => {
              return fil.room_type_id;
            })
            .map((item, index) => {
              return Object.values(item.amenities)
                .filter((fill) => {
                  return fill.group_name == "General Services";
                })
                .map((subitem) => {
                  return (
                    <ul className="generalServices">
                      {subitem.aminities.map((sss) => {
                        return (
                          <>
                            <li
                              type="disc"
                              className="text-justify col-4 col-md-4 py-2 GSIpad"
                            >
                              {sss.name}
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  );
                });
            })}

          {Object.values(props.Amenitiesslide)
            .filter((fil) => {
              return fil.room_type_id;
            })
            .map((item, index) => {
              return Object.values(item.amenities)
                .filter((fill) => {
                  return fill.group_name == "Bathroom";
                })
                .map((subitem) => {
                  return (
                    <ul className="second-ame BathroomGrid">
                      {subitem.aminities.map((sss) => {
                        return (
                          <>
                            {" "}
                            <li
                              type="disc"
                              className="text-justify col-6 col-md-6"
                            >
                              {sss.name}
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  );
                });
            })}

          {Object.values(props.Amenitiesslide)
            .filter((fil) => {
              return fil.room_type_id;
            })
            .map((item, index) => {
              return Object.values(item.amenities)
                .filter((fill) => {
                  return fill.group_name == "Technology";
                })
                .map((subitem) => {
                  return (
                    <ul className="second-ame">
                      {subitem.aminities.map((sss) => {
                        return (
                          <>
                            {" "}
                            <li
                              type="disc"
                              className="text-justify col-11 col-md-11"
                            >
                              {sss.name}
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  );
                });
            })}
        </Slider>
      </div>
    </div>
  );
}
