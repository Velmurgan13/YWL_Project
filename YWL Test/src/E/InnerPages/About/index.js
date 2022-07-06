import React, { useState, useEffect } from "react";
import FeaturesSlider from "../About/featuresSlider";
import {
  getSeoDescriptionData,
  getPropAmenities,
} from "../../../DataLayer/datalayerUtilities";
import { motion } from "framer-motion";
import overiewicon from "../../Yosemitewestgate/assets/Icons/new_clip.svg";
import checkIn from "../../CommonAssets/Icons/check-in.svg";
import checkOut from "../../CommonAssets/Icons/check-out.svg";
import dollar from "../../CommonAssets/Icons/dollar-symbol.svg";
import child from "../../CommonAssets/Icons/student.svg";
import adult from "../../CommonAssets/Icons/adult.svg";
// import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import "../About/about.scss";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
//common banner component
import BannerContainer from "../../InnerPages/BannerComponent/BannerContainer";
import CdaMainTitle from "./styledIndex";
import { useRecoilValue } from "recoil";
import {
  propertyDataSelector,
  seoThemeDetails,
  destinationDataSelector,
} from "../../../Recoil/themeModule";

const AboutComponent = () => {
  const propertyData = useRecoilValue(propertyDataSelector);
  //console.log(propertyData);
  const getDestinationData = useRecoilValue(propertyDataSelector);
  // console.log(getDestinationData);
  const { overview: seoId } = useRecoilValue(seoThemeDetails);
  const [seoData, setPropertySeodata] = useState([]);
  const [showInputField, setInputField] = useState(false);
  // const [xmlData, setXmlPropertydata] = useState([]);
  const [AmenitiesData, setPropAmenitiesdata] = useState([]);
  const [AmenityGroupData, setPropAmenityGroupdata] = useState([]);
  const [AmenityAdaData, setPropAmenityADAdata] = useState([]);
  const [xmlpost, setxmlPost] = React.useState(null);
  const [open, setOpen] = useState(false);
  // Hello
  useEffect(() => {
    fetchSeoProperties();
    fetchPropertyAmenities();
    //fetchProperties()
  }, []);
  React.useEffect(() => {
    axios
      .get("https://www.innstaging.com/property_xml/2/6/265.xml", {
        "Content-Type": "application/xml; charset=utf-8",
      })
      .then((response) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(response.data, "text/xml");
        const finalData =
          xml.querySelector("overview_standard").childNodes[0].nodeValue;
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

  const fetchSeoProperties = async () => {
    // console.log(seoId);
    const response = await getSeoDescriptionData(seoId);
    // console.log(response);
    setPropertySeodata(response.data);
  };

  const fetchPropertyAmenities = async () => {
    const response = await getPropAmenities();
    // alert(response);
    console.log("slider", response);
    setPropAmenitiesdata(
      response["ADA/Accessible Features for the Overall Property"]
    );
    setPropAmenityGroupdata(response);
    setPropAmenityADAdata(
      response["ADA/Accessible Features Our Property Does Not Offer"]
    );
  };

  // scroll to contents
  var elements = document.getElementsByClassName("nav-link");
  Array.from(elements).forEach(function (element) {
    // let v = window.screen.availWidth > 1199 ? 70 : 0;
    element.addEventListener("click", () => {
      var scrollDiv = document.getElementById("div" + element.id).offsetTop;
      window.scrollTo({ top: scrollDiv - 70, behavior: "smooth" });
    });
  });
  return (
    <>
      <div className="container-fluid px-0  About">
        <BannerContainer seoData={seoData} />
        <div className="about container">
          <div id="div1">
            <div
              className={`overview-details ${
                showInputField ? "enable-parent-child" : "parent-child"
              }`}
            >
              <div className="fs-12 content-title mt-3 px-2 px-md-2 text-left">
                <div className="welcomeTitle">
                  <div className="mainTitle">{ReactHtmlParser(xmlpost)}</div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button
                type="button"
                className="home-readmore-btn ls-1 welcome-btn btn-style mt-3 aboutBtn"
                title={`Read More About ${propertyData.property_name} Amenities and Services`}
                onClick={() => setInputField(!showInputField)}
              >
                {showInputField ? "READ LESS" : "READ MORE"}{" "}
              </button>
            </div>
          </div>
          <div
            className="features n amenities  p-1 px-md-5 py-md-2 mt-3 mb-0"
            id="div2"
          >
            <FeaturesSlider
              // AmenitiesData={AmenitiesData}
              AmenityGroupData={AmenityGroupData}
              propertyData={propertyData}
            />
          </div>
          <div>
            <div className="ada-fetures-accessibility">
              <div className="bg-light p-4 ada-access">
                <div className="text-center bg-ada-color position-relative  pb-0 pt-2 text-white">
                  <div className="pb-1 ada-title">
                    ADA/ACCESSIBLE FEATURES
                    <p className="ada-sub-title mb-0">
                      FOR THE OVERALL PROPERTY
                    </p>
                  </div>
                  <div className="bg-img-icon  ">
                    <img
                      className="d-none d-md-none d-sm-none d-xl-block "
                      src={overiewicon}
                    />
                  </div>
                </div>
                {/* <div className='row mx-0 pt-5'> */}
                <ul className="ada-list-color col-12 font-weight grid-ada-features mt-4 ">
                  {AmenitiesData.map((item) => (
                    <li className="" key={item.amenity_id}>
                      <div className="col-12 pr-5 pd-xs-0">
                        {item.amenity_name}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div className="ada-fetures-accessibility">
              <div className="bg-light p-4 ada-access">
                <div className="text-center bg-ada-color bg-ada-color1 position-relative  pb-0 pt-2 text-white">
                  <div className="pb-1 ada-title">
                    ADA/ACCESSIBLE FEATURES
                    <p className="ada-sub-title mb-0">
                      Our Property Does Not Offer
                    </p>
                  </div>
                  <div className="bg-img-icon  ">
                    <img
                      className="d-none d-md-none d-sm-none d-xl-block "
                      src={overiewicon}
                    />
                  </div>
                </div>
                {/* <div className='row mx-0 pt-5'> */}
                <ul className="ada-list-color col-12 font-weight grid-ada-features mt-4 ">
                  {AmenityAdaData
                    // .filter(
                    //   (id) => id == 18
                    // )
                    .map((item) => (
                      <li className="" key={item.amenity_id}>
                        <div className="col-12 pr-5 pd-xs-0">
                          {item.amenity_name}
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <>
            <div className="Polices" id="div3">
              <div className="about-title-two mt-4 ">POLICES</div>
              <div className="col-6 policy-heading"></div>
              <div className="row mx-0">
                <div className="col-12 policy-main px-1">
                  <div className="check-avail-content">
                    {" "}
                    These are general hotel policies. Policies may vary per room
                    type. Please check the accompanying room details
                    accordingly.
                  </div>
                </div>
                <div className="col-12 my-5 policyInfo px-0">
                  <div className="text-center">
                    <div className="my-3">
                      <img className="" src={checkIn} title="Check In Time" />
                      {/* <VscSignIn size="60" className="text-center" title="" /> */}
                    </div>
                    <div className="cust-border-polices btn btn-light fs-14 check-availablity1">
                      <div className="fs-12 policybtn">
                        Check In Time - {propertyData.checkin_time}
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="my-3">
                      <img className="" src={checkOut} title="Check Out Time" />
                      {/* <VscSignOut size="60" className="text-center" title="" /> */}
                    </div>
                    <div className="cust-border-polices btn btn-light fs-14 mt-0 check-availablity2">
                      <div className="fs-12 policybtn">
                        Check Out Time - {propertyData.checkout_time}
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="my-3">
                      <img className="" src={dollar} title="Currency" />
                    </div>
                    <div className="cust-border-polices btn btn-light fs-14 check-availablity3">
                      <div className="fs-12 policybtn">
                        {" "}
                        Currency - {propertyData.currency_abbr}
                        {ReactHtmlParser(propertyData.currency_symbol)}
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="my-3">
                      <img className="" src={child} title="Extra Child Cost" />
                    </div>
                    <div className="cust-border-polices btn btn-light fs-14 check-availablity4">
                      <div className="fs-12 policybtn">
                        Extra Child Cost -{" "}
                        {ReactHtmlParser(propertyData.currency)}
                        {propertyData.extraChildrenCharge}/Night
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="mt-3">
                      <img className="" src={adult} title="Extra Child Cost" />
                    </div>
                    <div className="cust-border-polices btn btn-light fs-14 check-availablity4">
                      <div className="fs-12 policybtn">
                        Extra Adult Cost -{" "}
                        {ReactHtmlParser(propertyData.currency)}
                        {propertyData.extraAdultCharge}/Night
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h6 className="pt-3 polices-subtitle">EARLY CHECK IN</h6>
                <p className="fs-16 abt-text-color">
                  {ReactHtmlParser(propertyData.early_check_in)}
                </p>

                <h6 className="pt-3 polices-subtitle">LATE CHECK OUT</h6>
                <p className="fs-16 abt-text-color">
                  {ReactHtmlParser(propertyData.late_check_out)}
                </p>

                <h6 className="pt-3 polices-subtitle">CANCELLATION POLICY</h6>
                <p className="fs-16 abt-text-color">
                  {ReactHtmlParser(propertyData.cancellation_policy)}
                </p>

                <h6 className="pt-3 polices-subtitle">FEATURES</h6>
                <p className="fs-16 abt-text-color">
                  {ReactHtmlParser(propertyData.accessibility_features)}
                </p>

                <h6 className="pt-3 polices-subtitle">SERVICES</h6>
                <p className="fs-16 abt-text-color">
                  {ReactHtmlParser(propertyData.services)}
                </p>
              </div>
            </div>
            <div className="text-left Terms n conditions" id="div4">
              <div className="about-title-two  ">TERMS & CONDITIONS</div>
              <div className="bg-grey-color px-1 px-md-4 pt-md-2 pb-4 py-1 text-justify terms-condition">
                <div className="fs-16 ls-1 abt-text-color">
                  {ReactHtmlParser(propertyData.terms_and_conditions)}
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default AboutComponent;
