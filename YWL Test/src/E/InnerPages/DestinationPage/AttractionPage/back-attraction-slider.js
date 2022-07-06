import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../DestinationPage/AttractionPage/index.scss";
import ReactHtmlParser from "react-html-parser";
import BannerContainer from "../../../InnerPages/BannerComponent/BannerContainer";
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
  // console.log(propertyData);
  const { attractions: seoId } = useRecoilValue(seoThemeDetails);
  const [clicked, setClicked] = useState(false);
  const [seoData, setPropertySeodata] = useState([]);
  const [DestinationData, setPropertyDestinationdata] = useState([]);

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
    //console.log(finalData);
    const response = await getPropDestinationAttractionData(finalData);
    // console.log(response);
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
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
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
    <div className="container-fluid p-0">
      <BannerContainer seoData={seoData} />
      {/* <div className="text-center">
        <h4>YOSEMITE NATIONAL PARK ATTRACTIONS AND DESTINATION GUIDE</h4>
      </div> */}

      <div className="attraction">
        <div className="container-fluid">
          <div className="col-md-10 offset-md-1 bg-attractions mb-5 d-flex pr-0">
            <div className="col-12 col-md-3 attraction-card PR">
              <Slider {...settings}>
                {Object.values(DestinationData).map((item, index) => {
                  return (
                    <>
                      {item.attraction_name != "" ? (
                        <div className="bg-white card-hover-bdr attraction">
                          <div className="row card-heading">
                            <div className="row mx-0 my-2">
                              <div className="col-2">
                                <span className="numbering mt-1">
                                  {index + 1}.
                                </span>
                              </div>
                              <div className="col-10">
                                <a className="card-title text-left my-3">
                                  {ReactHtmlParser(item.attraction_name)}
                                </a>
                              </div>
                            </div>
                            <div className="text-secondary">
                              -----------------------------------------------------------
                            </div>
                            <p className="text-muted attDesc">
                              {ReactHtmlParser(item.attraction_description)}
                            </p>
                            <div className="attCard">
                              <div className="col-6 view_att_details">
                                <Link
                                  to={`/attractions/${item.attraction_url}`}
                                >
                                  {" "}
                                  <button
                                    type="button"
                                    className="home-readmore-btn welcome-btn btn-style"
                                  >
                                    + VIEW DETAILS
                                  </button>
                                </Link>
                              </div>
                              <div className="col-6 direction-details">
                                <a type="a" className="btn-direction">
                                  Get Directions
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="slick-current-new"></div>
                      )}
                    </>
                  );
                })}
              </Slider>
            </div>
            <div className="col-12 col-md-8 mb-auto pb-5 mx-4 pr-1">
              <div className="border ml-5 position-relative">
                <AttractionMapbox className="position-absolute" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AttractionComponent;
