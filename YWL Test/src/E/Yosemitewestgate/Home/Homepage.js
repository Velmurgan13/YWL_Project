import React, { useState, useEffect } from "react";
import PrimarySlider from "./sections/PrimarySlider";
import WelcomeHeading from "./sections/WelcomeContent";
import MetaTags from "react-meta-tags";
import { useRecoilValue } from "recoil";
import { seoThemeDetails } from "../../../Recoil/themeModule";
import {
  getSeoDescriptionData,
  getYesomiteData,
} from "../../../DataLayer/datalayerUtilities";
import EmailInput from "./sections/EmailInput";
import ReactHtmlParser from "react-html-parser";
import ExploreContent from "./sections/ExploreContent";
import Features from "./sections/Features";
import GuestRoom from "./sections/GuestRoomComponent/GuestRoom";
import SisterProperty from "./sections/SisterProperty";
import Attractions from "./sections/Attractions";
import Cafe from "./sections/Cafe";
import Location from "./sections/Location";
import "../Home/Homepage.scss";
import { propertyDataSelector } from "../../../Recoil/themeModule";
import { themeSelector } from "../../../Recoil/themeModule";

// import ReviewHomeComponent from "../Home/sections/Reviews";
import { FaArrowUp } from "react-icons/fa";
import AOS from "aos";

// import { Button } from './Styles';

export default function Homepage(props) {
  const { home: seoId } = useRecoilValue(seoThemeDetails);
  const [seoData, setPropertySeodata] = useState([]);
  const [visible, setVisible] = useState(false);
  const propertyData = useRecoilValue(propertyDataSelector);
  useEffect(() => {
    fetchSeoProperties();
  }, []);

  const onSrollPage = function () {
    let headerSmaller = document.querySelector(".App");
    let screenWidth = window.screen.availWidth;
    if (screenWidth > 1199) {
      if (window.pageYOffset > 500) {
        headerSmaller.classList.add("smaller");
      } else {
        headerSmaller.classList.remove("smaller");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onSrollPage);
  });

  const fetchSeoProperties = async () => {
    // console.log(seoId);
    const response = await getSeoDescriptionData(seoId);
    // alert(response);
    // console.log(response.data);
    setPropertySeodata(response.data);
  };

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  const { url: baseUrl } = useRecoilValue(themeSelector);
  const CurrentWebUrl = window.location.href;
  window.addEventListener("scroll", toggleVisible);
  AOS.init();

  return (
    <div className="HomepageStyle">
      <MetaTags>
          <title>{ReactHtmlParser(seoData.meta_title)}</title>
          <meta name="description" content={ReactHtmlParser(seoData.meta_desc)} />
          <meta property="og:title" content={ReactHtmlParser(seoData.meta_title)} />
          <meta property="og:description" content={ReactHtmlParser(seoData.meta_desc)} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={CurrentWebUrl} />
          <meta property="og:image" content={
              baseUrl +
              "/gallery-images/properties/" +
              ReactHtmlParser(seoData.slider_img)
            }/>    
          <meta name="twitter:image" content={
              baseUrl +
              "/gallery-images/properties/" +
              ReactHtmlParser(seoData.slider_img)
            }/>	
          <meta property="og:site_name" content="Yosemite westgate lodge" />
          <meta name="twitter:title" content={ReactHtmlParser(seoData.meta_title)} />
          <meta name="twitter:description" content={ReactHtmlParser(seoData.meta_desc)} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content={CurrentWebUrl} />
          <link rel="canonical" href={CurrentWebUrl}/>
      </MetaTags>
      <PrimarySlider />
      <WelcomeHeading />
      <Features />
      <div className="bg-Image">
        <GuestRoom porpertyData={propertyData} />
        {/* <ReviewHomeComponent /> */}
        <ExploreContent porpertyData={propertyData} />
      </div>
      <Attractions porpertyData={propertyData} />
      <SisterProperty />
      <Cafe />
      <Location />
      <EmailInput />
      {/* <div data-aos="zoom-in-up" data-aos-duration="1000" className="scrollBtn">
        <button className="scrolBtnStyle">
          <FaArrowUp
            onClick={scrollToTop}
            style={{ display: visible ? "inline" : "none" }}
          />
        </button>
      </div> */}
      
    </div>
  );
}

// import React from 'react'

// export default function Homepage() {
//     return (
//         <div className="bg-dark container-fluid">
//             <h4 className="text-white">Welcome to yosemitewestgate -- HomePage -- 265</h4>
//         </div>
//     )
// }
