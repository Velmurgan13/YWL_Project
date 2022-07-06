import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../DestinationPage/AttractionPage/index.scss";
import ReactHtmlParser from "react-html-parser";
import BannerContainer from "../../../InnerPages/BannerComponent/BannerContainer";
import { motion } from 'framer-motion';
import axios from "axios";
import {
  getSeoDescriptionData,
  getPropDestinationAttractionData,
} from "../../../../DataLayer/datalayerUtilities";
import { useRecoilValue } from "recoil";
import {
  propertyDataSelector,
  seoThemeDetails,
} from "../../../../Recoil/themeModule";
import AttractionMapbox from "../AttractionPage/Attraction_mapbox.js";

const AttractionComponent = () => {
  const propertyData = useRecoilValue(propertyDataSelector);
  console.log(propertyData);
  const { attractions: seoId } = useRecoilValue(seoThemeDetails);
  const [clicked, setClicked] = useState(false);
  const [seoData, setPropertySeodata] = useState([]);
  const [DestinationData, setPropertyDestinationdata] = useState([]);
  const [xmlpost, setxmlPost] = React.useState(null);
  const [open, setOpen] = useState(false);
  

  React.useEffect(() => {
    axios
      .get("https://www.innstaging.com/property_xml/2/6/265.xml", {
        "Content-Type": "application/xml; charset=utf-8",
      })
      .then((response) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(response.data, "text/xml");
        const finalData =
          xml.querySelector("destination_content").childNodes[0].nodeValue;
        console.log(finalData);
        function removeHTML(str) {
          var tmp = document.createElement("DIV");
          tmp.innerHTML = str;
          return tmp.textContent || tmp.innerText || "";
        }

        const onlyText = removeHTML(finalData);
        // console.log(finalData);
        console.log(onlyText);
        setxmlPost(onlyText);
      });
  }, []);

  useEffect(() => {
    fetchSeoProperties();
    fetchDestinations();
  }, []);

  const [togglee, setTogglee] = useState(true);

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData(seoId);
    setPropertySeodata(response.data);
  };

  const fetchDestinations = async () => {
    const destination_id = "2";
    // const { additional_destinations, latitude, longitude } = propertyData;
    const finalData = { destination_id };
    const response = await getPropDestinationAttractionData(finalData);
    console.log(response);
    // setPropertyDestinationdata(response)
    setPropertyDestinationdata(response.attractions);
  };

  const toggle = (index) => {
    if (clicked === index) {
      //if clicked question is already active, then close it
      return setClicked(null);
    }

    setClicked(index);
  };

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    rows: 1,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 2800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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

  console.log(DestinationData);
  return (
    <div className="container-fluid p-0">
      <motion.div
    initial={{ scaleY: 0 }}
    animate={{ scaleY: 1 }}
    exit={{ scaleY: 0 }}
    transition={{ duration: 0.4 }}
  >
        <BannerContainer seoData={seoData} />
        </motion.div>
      {/* <div className="text-center">
        <h4>YOSEMITE NATIONAL PARK ATTRACTIONS AND DESTINATION GUIDE</h4>
      </div> */}
 
      <div className="attraction">
        <div className="container px-0">
        <div className="fs-12 content-title mt-3 px-2 px-md-2 text-left px-lg-0 px-xl-0">
                <div className="attraction-content mb-5">
                  <div className="mainTitle px-3 px-md-1 px-lg-0 px-xl-0">{ReactHtmlParser(xmlpost)  ? ReactHtmlParser(xmlpost)  : "loading"}</div>
              
                </div>
              </div>
          <div className="col-md-12  mb-5 pr-0 pl-0">
            <div className="col-12 col-md-12 attraction-card PR"></div>
            <div className="col-12 col-md-12 p-0">
              <div className="border2 mx-2 mx-md-1  position-relative">
                <AttractionMapbox
                  className="position-absolute"
                  DestinationData={DestinationData}
                />
              </div>
            </div>
            {/* <Slider {...settings}>  */}
            <div className="row card-width mt-4 mx-1">
                {Object.values(DestinationData).map((item, index) => {
                  return (
                    <>
                      {item.attraction_id != '' ? (
                        <div className="col-lg-6 col-xl-4 col-12 bdr-left col-md-6 card-hover-bdr  px-1 px-md-0">
                          <div className="attraction mx-1"> 
                          <div className="row card-heading ">
                            <div className="row mx-0 my-2 col-md-12 px-4 attractiongreybg2">
                              <div className="col-1 px-0">
                                <span className="numbering mt-3">
                                  {index + 1}.
                                </span>
                              </div>
                              <div className="col-11 pl-1 ">
                                <a className="card-title text-left mt-3 pl-2 text-uppercase">
                                  {ReactHtmlParser(item.attraction_name)}
                                </a>
                              </div>
                            </div>
                          </div>

                          <p className="text-muted attDesc mt-3 px-md-4 px-3">
                            {ReactHtmlParser(item.attraction_description)}
                          </p>
                          <div className="attCard my-4 px-4">
                            <div className="col-6 col-lg-5 col-md-5 col-xl-5 view_att_details px-0">
                              <Link
                                title="View details"
                                className="home-readmore-btn welcome-btn btn-style c-pointer"
                                to={`/attractions/${item.attraction_url}`}
                              >
                                {" "}
                                VIEW DETAILS
                              </Link>
                            </div>
                            <div className="col-6 col-lg-7 col-md-7 col-xl-7 direction-details px-0">
                              <a
                                type="a"
                                class="default-btn  txt-trasnform"
                                href={`/directions/${item.attraction_name}/${item.address1}/${item.city}/${item.state}/${item.zip_code}`}
                                title="Get directions"
                              >
                                Get Directions
                              </a>
                            </div>
                          </div>
                          </div>
                        </div>
                    )
                     : (
                      <div className="slick-current-new"></div>
                    )
                    }
                  </>
                );
              })}
              </div>
            {/* </Slider> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AttractionComponent;
