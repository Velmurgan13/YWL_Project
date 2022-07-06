import React, { useState, useEffect, useLayoutEffect } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactHtmlParser from "react-html-parser";
import BannerContainer from "../../BannerComponent/BannerContainer";
import {
  getSeoDescriptionData,
  getPropFriendPageData,
} from "../../../../DataLayer/datalayerUtilities";
import { useRecoilValue } from "recoil";
import { seoThemeDetails } from "../../../../Recoil/themeModule";
import {
  themeSelector,
  propertyDataSelector,
} from "../../../../Recoil/themeModule";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const FriendsComponent = () => {
  const { friendspage: seoId } = useRecoilValue(seoThemeDetails);
  const [seoData, setPropertySeodata] = useState([]);
  const [friendsData, setFriendsData] = useState([]);
  const { url: baseUrl } = useRecoilValue(themeSelector);
  const propertyData = useRecoilValue(propertyDataSelector);
  console.log(propertyData);

  useEffect(() => {
    fetchSeoProperties();
    fetchFriendPageData();
  }, []);

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData(seoId);
    setPropertySeodata(response.data);
  };

  const fetchFriendPageData = async (data) => {
    let sliderMain = document.querySelector(".frnds-slider");
    const response = await getPropFriendPageData(data);
    setFriendsData(response.data.friend_details);
    if (window.screen.availWidth > 991 && response.data.friend_details.length) {
      !sliderMain.className.includes("lists-3") &&
        sliderMain.classList.add("lists-3");
    } else {
      sliderMain.className.includes("lists-3") &&
        sliderMain.classList.remove("lists-3");
    }
  };

  const SamplePrevArrow = function (props) {
    const { className, style, onClick } = props;
    return (
      <div
        className="slick-arrow left-slick-btn"
        onClick={onClick}
        title="Previous"
      >
        <FaAngleLeft size="20" />
      </div>
    );
  };

  const SampleNextArrow = function (props) {
    const { className, style, onClick } = props;
    return (
      <div
        className="slick-arrow right-slick-btn"
        onClick={onClick}
        title="Next"
      >
        <FaAngleRight size="20" />
      </div>
    );
  };

  let settings = {
    dots: false,
    arrows: true,
    infinite: true,
    loop: true,
    speed: 1000,
    slidesToShow: 3,
    centerPadding: "50px",
    slidesToScroll: 1,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.4 }}
      >
        <BannerContainer seoData={seoData} />
      </motion.div>
      <div className="friendsStyle">
        <div className="container">
          <p className="friends-subHead">
            {propertyData.property_name} Name has partnered with the following
            local businesses to provide our guests with a variety of places to
            visit and things to do while staying in{" "}
            <strong>
              {propertyData.city}, {propertyData.state_prefix}
            </strong>
            . Discover what these local businesses have to offer by clicking on
            their banners below and help support our local small businesses.
          </p>
        </div>
        
        <div className="container position-relative mb-5 friendsBgColor">
          {/* <div className="bg-card-color"></div> */}
          <div className="container px-0">
            <div className="mx-0 mb-1 mb-md-3 pt-2 frnds-slider">
              <Slider {...settings}>
                {Object.values(friendsData).map((item) => (
                  <div className="d-flex justify-content-center my-1 my-md-2 my-lg-2 my-xl-0 py-2 py-md-4 frndMainCont">
                    <div className="card  bg-white card-shadow pb-3 px-3 pt-3">
                      <div className="h-100 w-100">
                        <img
                          className="img-object-fit"
                          src={baseUrl + "/" + item.images[0].img_name}
                          alt="fff"
                          title={item.name}
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://beta.laquintasantacruz.com/gallery-images/default-vector-bedroom-image.jpg";
                          }}
                        />
                        <div>
                          <div className="title-name friends-text text-center mt-2 py-2 px-1 mb-1 text-uppercase">
                            {ReactHtmlParser(item.name)}
                          </div>
                        </div>
                        <div className="text-center friendsIpad">
                          <Link
                            to={`/friends-details-page/${item.sub_url}`}
                            className=""
                          >
                            <button
                              type="button"
                              title="View Details"
                              class="home-readmore-btn ls-1 welcome-btn btn-style my-2 "
                            >
                              VIEW DETAILS
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsComponent;
