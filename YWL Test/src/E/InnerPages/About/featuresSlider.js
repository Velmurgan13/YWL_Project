import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./featuresSlider.css";
import tripIcon from '../../CommonAssets/Icons/Tripadvisor.svg'

//icons
import bgbubbleicon1 from "../../Yosemitewestgate/assets/Icons/up.svg";
import bgbubbleicon2 from "../../Yosemitewestgate/assets/Icons/down.svg";
import { FaBed } from "react-icons/fa";
import { RiShoppingBasket2Line } from "react-icons/ri";
import  {IoPeople}  from "react-icons/io5";
import { BsInfoCircleFill } from "react-icons/bs";

import { FaBusinessTime } from "react-icons/fa";
// import { FaBusinessTime } from "react-icons/fa";
import { AiOutlineShopping } from "react-icons/ai";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { object } from "yup";
const FeaturesSlider = (props, propData) => {
  const [showInputField, setInputField] = useState(null);
  //  console.log("this is data ", props);
  // const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  // let resultData = [];
  // for (let i = 0; i < (props.AmenitiesData).length; i++) {
  //    resultData = (props.AmenitiesData);
  // }
  // const resultData = (props.AmenitiesData).valueOf();
  // const resultData = (props.AmenitiesData).map(obj => Object.values(obj));
  // const resultData = (props.AmenitiesData).groupBy( ({ amenity_group_id }) => amenity_group_id );
  // console.log(resultData);


  var settings = {
    dots: true,
    adaptiveHeight: true,
    swipeToSlide: true,
    focusOnSelect: true,
    slidesToShow: 4,
    infinite: true,
    speed: 1200,
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
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          speed: 1400,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="container-fluid pt-0 sm-pt-5 md-pt-5 px-1">
      <div className="features n amenities p-1 mt-3 mb-3 bg-img-features">
        <div className="features-title text-center">
          {props.propertyData.property_name}
        </div>
        <h4 className="features-subtitle text-center text-muted ls-1 mb-0 mb-md-4 mb-lg-3">
          FEATURES N AMENITIES
        </h4>

       
        <Slider
          slickNext
          {...settings}
          // asNavFor={nav2}
          // ref={(slider1) => setNav2(slider1)}
          className="features-details pt-2 pt-md-2 p-xl-2 p-xl-2"
        >
          {Object.keys(props.AmenityGroupData).filter((AmenityName) => (AmenityName != 'ADA/Accessible Features for the Overall Property') && (AmenityName != 'ADA/Accessible Features Our Property Does Not Offer')).map((item, index) => (
            // console.log("names", item),
            <div className="hello">
              <div key={index} className="px-0 px-md-0 card01 bg-img-features">
                <div className=" bg-white sliderCardHeight  slick-width individualCard">
                  <div className="mx-auto justify-content-center align-items-center slideCardLogo">
                    <div className="position-relative slideCardLogoSec">
                      <div className="text-center py-4 text-uppercase">
                        {/* <AiFillCar size="30" /> */}
                       <>
                          {(() => {
                            switch (item) {
                              case 'General Services':
                                return <FaBed   size="35"/>;
                              case 'Conceirge Amenities':
                                return <BsInfoCircleFill  size="30"/>;
                              case 'Pool & Spa Amenities':
                                return <BsInfoCircleFill  size="30"/>;
                              case 'Business Services':
                                return <FaBusinessTime size="30"/>;
                              case 'Shops':
                                return <RiShoppingBasket2Line size="35"/>;
                              case 'Family':
                                return <IoPeople size="30"/>;
                              case 'Dining':
                                return <BsInfoCircleFill size="30"/>;
                              default:
                                return <img className="mx-1" />;
                            }
                          })()}
                           <div className="card-title-slider mt-2">{item}</div>
                        </>
                      </div>
                    </div>
                    {/* <div className="text-center">
                      <div className="pt-3">
                        <div className="card-title-slider">{item}</div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="container card-animeties mx-2 mx-md-4 mx-xl-4 mx-lg-4">
                <div className="ml-0 ml-md-1 lh-38 pl-5 pl-md-0 pd-xs-0">
                  <div>
                    <ul className="col-6 col-md-12 grid-amenities ml-md-0 ml-lg-4 pr-0 mb-0">
                      {Object.values(props.AmenityGroupData[item])
                        .map((newitemData) => (
                          // console.log(newitemData),
                          <li
                            className="pl-0 general-list"
                            key={newitemData.amenity_id}
                          >
                            {newitemData.amenity_name}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* <Slider
          asNavFor={nav1}
          ref={(slider2) => setNav2(slider2)}
          className="overview-second-arrow"
        >
          <div className="container pl-5 mt-4 ml-4 ml-md-0 ml-lg-5 card-animeties">
                <div className="ml-0 ml-md-1 ml-lg-5 lh-38 pl-5 pl-md-0 pd-xs-0">
                  <div>
                    <ul className="col-6 col-md-12 grid-amenities ml-md-0 ml-lg-4 pr-0 mb-0">
                      {Object.values(props.AmenityGroupData[item])
                      .map((newitemData) => (
                        console.log(newitemData),
                        <div className="general-mob-view">
                          <li
                            className="pl-0 general-list"
                            key={newitemData.amenity_id}
                          >
                            {newitemData.amenity_name}
                          </li>
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
        </Slider> */}

      </div>
    </div>
  );
};

export default FeaturesSlider;
