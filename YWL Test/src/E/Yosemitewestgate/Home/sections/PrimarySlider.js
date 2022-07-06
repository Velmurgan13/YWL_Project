import React, { useState } from "react";
// import SocialIcons from '../../../Yosemitewestgate/Home/sections/social-Icons'
import Carousel from "react-bootstrap/Carousel";
import Forest from "../../assets/images/BannerImages/forest.webp";
import Room from "../../assets/images/BannerImages/guestRoom.webp";
import SwimmingPool from "../../assets/images/BannerImages/banner-3.webp";
import Adventure from "../../assets/images/BannerImages/yosemite-adventures.webp";
import KingBed from "../../assets/images/BannerImages/kingBed.webp";
import MobileBanner1 from "../../assets/images/BannerImages/banner-1-mob.4322f7a2.webp";

import WrappperCheckAvailibility from "../../../CheckAvailibilty/WrapperCheckAvailibity";
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from "react-icons/ai";
import "./PrimarySlider.css";
// import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';


const PrimarySlider = () => {
  const [play, setPlay] = useState(false);
  const playPauseFunction = function () {
    // Carousel.propTypes.pauseOnHover = true;
    // const carousels = document.querySelector(".primary-carousel");
    // Carousel.propTypes.pause = false;
    // console.log(Carousel.propTypes.slide);
    setPlay(!play);
  };
  return (
    <div className="hide-right-arrow carousel-fade Hm-Primary">
      <Carousel className="primary-carousel" slide={play}>
        <Carousel.Item>
          <div className="carousel-overlay"></div>
           
          <img rel="preload"
            className="d-none d-md-block d-lg-block w-100 imageAuto"
            src={Adventure}
            alt="First slide"
            width="1500"
            height="850"
          />
          
          
          <img rel="preload"  
            className="d-block d-md-none d-lg-none w-100 imageAuto"
            src={MobileBanner1}
            alt="First slide"
            height="960"
          />
          

          <div className="slider-content">
            <span className="slider-caption1">YEAR-ROUND LODGING</span>
            <span className="slider-caption2">YOSEMITE NATIONAL PARK</span>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="carousel-overlay"></div>
           
          <img rel="preload"
            className="d-none d-md-block d-lg-block w-100 imageAuto"
            src={Forest}
            alt="First slide"
            width="1500"
            height="850"
          />
          
          
          <img rel="preload"
            className="d-block d-md-none d-lg-none w-100 imageAuto"
            src={MobileBanner1}
            alt="First slide"
            width="964"
          />
          
          <div className="slider-content">
            <span className="slider-caption1">ENJOY BREATHTAKING YOSEMITE</span>
            <span className="slider-caption2">WHILE STAYING IN COMFORT</span>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="carousel-overlay"></div>
           
          <img rel="preload"
            className="d-none d-md-block d-lg-block w-100 imageAuto"
            src={Room}
            alt="First slide"
            width="1500"
            height="850"
          />
          
          
          <img rel="preload"
            className="d-block d-md-none d-lg-none w-100 imageAuto"
            src={MobileBanner1}
            alt="First slide"
            width="964"
          />
          
          <div className="slider-content">
            <span className="slider-caption1">MODERN HOTEL ROOMS</span>
            <span className="slider-caption2">JUST MINUTES FROM YOSEMITE</span>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="carousel-overlay"></div>
           
          <img rel="preload"
            className="d-none d-md-block d-lg-block w-100 imageAuto"
            src={SwimmingPool}
            alt="First slide"
            width="1500"
            height="850"
          />
          
          
          <img rel="preload"
            className="d-block d-md-none d-lg-none w-100 imageAuto"
            src={MobileBanner1}
            alt="First slide"
            width="964"
          />
          
          <div className="slider-content">
            <span className="slider-caption1">UNWIND AFTER A LONG HIKE</span>
            <span className="slider-caption2">HEATED POOL AND SPA</span>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="carousel-overlay"></div>
           
          <img rel="preload"
            className="d-none d-md-block d-lg-block w-100 imageAuto"
            src={KingBed}
            alt="First slide"
            width="1500"
            height="850"
          />
          
          
          <img rel="preload"
            className="d-block d-md-none d-lg-none w-100 imageAuto"
            src={MobileBanner1}
            alt="First slide"
            width="964"
          />
          
          <div className="slider-content">
            <span className="slider-caption1">SPACIOUS GUEST ROOMS</span>
            <span className="slider-caption2">NESTLED IN THE WOODS</span>
          </div>
        </Carousel.Item>
      </Carousel>

      {/* <AiOutlinePauseCircle
        size="30"
        className="cauroselBtn"
        id="play"
        onClick={playPauseFunction}
      /> */}

      <div className="checkAvail">
        <WrappperCheckAvailibility />
      </div>
    </div>
  );
};

export default PrimarySlider;