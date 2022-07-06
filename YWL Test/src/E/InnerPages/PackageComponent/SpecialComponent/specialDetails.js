import React, { useState, useEffect } from "react";
import BannerContainer from "../../BannerComponent/BannerContainer";
import FormElement from "../SpecialComponent/FormElement";
import "./index.scss";
import { getPackagesDetailsInfoData } from "../../../../DataLayer/datalayerUtilities";
import { useRecoilValue } from "recoil";
import { seoThemeDetails } from "../../../../Recoil/themeModule";
import { getSeoDescriptionData } from "../../../../DataLayer/datalayerUtilities";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import SpecialFormElement from "./SpecialFormElement";
import { themeSelector } from "../../../../Recoil/themeModule";

let isCustomUrl;
const SpecialDetails = (props) => {
  const { url: baseUrl } = useRecoilValue(themeSelector);
  const { guestrooms: seoId } = useRecoilValue(seoThemeDetails);
  const [seoData, setPropertySeodata] = useState([]);
  const [packagesDetailsData, setPackagesDetailsData] = useState([]);
  // const [specialfrom, setSpecialFormUpdate] = usestate([])

  useEffect(() => {
    fetchSeoProperties();
    fetchPackagesDetailsData();
  }, []);

  (function () {
    Object.values(packagesDetailsData).map((item) => {
      isCustomUrl = item.customurl;
    });
  })();

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData(seoId);
    setPropertySeodata(response.data);
  };

  const fetchPackagesDetailsData = async () => {
    const response = await getPackagesDetailsInfoData(props.match.params);
    // console.log("this is props ", props.match.params)
    // console.log("this is details data", response);
    setPackagesDetailsData(response.data.packageDetailsByUrl);
  };
  // console.log("check this", packagesDetailsData);
  return (
    <div className="container-fluid px-0 text-center">
      <BannerContainer seoData={seoData} />
      {Object.values(packagesDetailsData).map((item) => {
        return (
          <div className="specialComponent">
            <div className="EventPage">
              <div className="container bggrey mb-5 mt-4 px-0">
                <div className="row packageInfoMob">
                  <div className="col-md-12 col-lg-12 col-xl-12 col-12">
                    <Carousel className="px-4 packageImage">
                      <Carousel.Item>
                        <div className="eventDetImg">
                          <img
                            className="w-100"
                            src={
                              baseUrl + "/" + item.package_images[0].img_name
                            }
                            // title={item.package_images[0].img_name}
                            alt="fff"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://beta.laquintasantacruz.com/gallery-images/default-vector-bedroom-image.jpg";
                            }}
                            height="536"
                            width="570"
                          />
                        </div>
                      </Carousel.Item>
                      <Carousel.Item>
                        <div className="eventDetImg">
                          <img
                            className="w-100"
                            src={
                              baseUrl + "/" + item.package_images[1].img_name
                            }
                            // title={item.package_images[1].img_name}
                            alt="fff"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://beta.laquintasantacruz.com/gallery-images/default-vector-bedroom-image.jpg";
                            }}
                            height="536"
                            width="570"
                          />
                        </div>
                      </Carousel.Item>
                    </Carousel>
                  </div>
                  <div className="col-md-12 col-lg-12 col-xl-12 col-12 mt-4 px-md-5 px-5 packageDesc1">
                    {/* <div className="packagedetail text-left">
                      Detail Description
                    </div> */}
                    <div className="packageTitle">
                      <div className="sub-title-package-details">
                        {ReactHtmlParser(item["ptitle"])}
                      </div>
                    </div>
                    <p className="p-summary">{ReactHtmlParser(item["desc"])}</p>
                  </div>
                </div>
                <div className="row pl-3 pr-3 packageInfoMob">
                  <div className="col-md-6 col-12">
                    <div className="p-summary">
                      <div className="p-summary p-s1 mt-4 ml-5 mx-md-3 mx-lg-3 mx-xl-3">
                        {item.included && (
                          <>
                            <span className="packagedetail">
                              Included:
                            </span>{" "}
                            <p className="sub-content mr-4 mt-2">
                              {ReactHtmlParser(item.included)}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12 pl-md-0">
                    <div className="p-summary mt-4 mx-5 mx-md-4 mx-lg-3 mx-xl-3">
                      {item.contact_details && (
                        <>
                          <span className="packagedetail mt-2">
                            Contact Details:
                          </span>{" "}
                          <a className="mt-2 packageContactNo" href={`tel:${item.contact_details.split("/")[1]}`}>
                            {ReactHtmlParser(item.contact_details)}
                          </a>{" "}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="p-summary mt-4 mx-5 mx-md-4 mx-lg-3 mx-xl-3">
                      {item.special_conditions && (
                        <>
                          <span className="packagedetail mt-2">
                          Special Conditions:
                          </span>{" "}
                          <p className="mt-2">
                            {ReactHtmlParser(item.special_conditions)}
                          </p>{" "}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-12 text-center mt packagedetail mt-2 mb-5-4 px-0">
                  {/* <Link
                    to={item.customurl ? item.customurl : `/packages`}
                    className="home-readmore-btn welcome-btn btn-style mt-3 btn-relative"
                    title={item.customurl ? "Book It Now" : "Back"}
                  >
                    {item.customurl ? "Book It Now" : "Back"}
                  </Link> */}
                  {isCustomUrl ? (
                    <a
                      href={item.customurl}
                      target="_blank"
                      className="home-readmore-btn welcome-btn btn-style mt-3 btn-relative"
                      title={item.btn_text ? item.btn_text : "Book Now"}
                    >
                      {item.btn_text ? item.btn_text : "Book Now"}
                    </a>
                  ) : (
                    // <Link
                    //   to={`/packages`}
                    //   className="home-readmore-btn welcome-btn btn-style mt-3 btn-relative"
                    //   title={"Back"}
                    // >
                    //   {"Back"}
                    // </Link>
                    <div className="container">
                      <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12 text-left">
                        <SpecialFormElement price={item.price}/>
                      </div>
                    </div>
                  )}
                  {/* <BookNowBackBtn /> */}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SpecialDetails;
