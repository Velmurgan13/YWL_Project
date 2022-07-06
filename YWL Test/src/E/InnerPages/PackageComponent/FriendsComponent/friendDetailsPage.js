import React, { useState, useEffect } from "react";
import "./index.scss";
import {
  getSeoDescriptionData,
  getPropFriendDetailsPageData,
} from "../../../../DataLayer/datalayerUtilities";
import ReactHtmlParser from "react-html-parser";
import BannerContainer from "../../BannerComponent/BannerContainer";
import { useRecoilValue } from "recoil";
import {
  seoThemeDetails,
  themeSelector,
  propertyDataSelector,
} from "../../../../Recoil/themeModule";
import Carousel from "react-bootstrap/Carousel";
import { BiTimeFive } from "react-icons/bi";
// import LocationMap from "../../../Yosemitewestgate/assets/images/mapOrangePin.jpg";
import { TiSocialFacebook } from "react-icons/ti";
import { AiOutlineGlobal } from "react-icons/ai";
import { IoCallOutline } from "react-icons/io5";
import { GoLocation } from "react-icons/go";
import { SiTripadvisor } from "react-icons/si";
import { FaYelp } from "react-icons/fa";
import FriendDetailsMapbox from "../FriendsComponent/FriendDetailsMapbox.js";

export default function FriendDetailsPage(props) {
  const { friendspage: seoId } = useRecoilValue(seoThemeDetails);
  const [seoData, setPropertySeodata] = useState([]);
  const [friendsDetailsData, setfriendsDetailsData] = useState([]);
  const { url: baseUrl } = useRecoilValue(themeSelector);
  const propertyData = useRecoilValue(propertyDataSelector);
  // console.log(propertyData)

  useEffect(() => {
    fetchSeoProperties();
    fetchFriendDetailsPageData();
  }, []);

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData(seoId);
    setPropertySeodata(response.data);
  };
  const fetchFriendDetailsPageData = async () => {
    const response = await getPropFriendDetailsPageData(props.match.params);
    // console.log('ssss', response)
    setfriendsDetailsData(response.data.friend_details);
    // console.log(friendsDetailsData, "called");
  };

  // console.log('deatials page babab ', friendsDetailsData)

  return (
    <div className="friendsStyle pb-xl-2 pb-lg-2 pb-4 pb-md-3">
      <BannerContainer seoData={seoData} />
      {Object.values(friendsDetailsData).map((item) => (
        <>
          <div className="container px-0 mb-5 pd-xs-15">
            <div className="text-center frds-detail-title pt-3">
              {ReactHtmlParser(item.name)}
            </div>
            <div className="container-fluid px-0">
              <div className="row mx-0">
                <div className="col-12 col-md-12 col-lg-12 col-xl-12 mx-auto mt-1 px-0">
                  <Carousel className="slider-bg-effects">
                    <Carousel.Item>
                      <div className="eventDetImg  position-relative">
                        <div className="bg-shadow-slider position-absolute" title={item.name} ></div>
                        <img
                          className="w-100 cust-img"
                          src={baseUrl + "/" + item.images[1].img_name}
                          alt="fff"
                          title={item.name}
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://beta.laquintasantacruz.com/gallery-images/default-vector-bedroom-image.jpg";
                          }}
                        />
                      </div>
                    </Carousel.Item>
                    <Carousel.Item>
                      <div className="eventDetImg  position-relative">
                        <div className="bg-shadow-slider position-absolute" title={item.name}></div>
                        <img
                          className="w-100 cust-img px-1 px-md-0"
                          src={baseUrl + "/" + item.images[2].img_name}
                          alt="fff"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://beta.laquintasantacruz.com/gallery-images/default-vector-bedroom-image.jpg";
                          }}
                        />
                      </div>
                    </Carousel.Item>
                    <Carousel.Item>
                      <div className="eventDetImg  position-relative">
                        <div className="bg-shadow-slider position-absolute" title={item.name}></div>
                        <img
                          className="w-100 cust-img px-1 px-md-0"
                          src={baseUrl + "/" + item.images[1].img_name}
                          alt="fff"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://beta.laquintasantacruz.com/gallery-images/default-vector-bedroom-image.jpg";
                          }}
                        />
                      </div>
                    </Carousel.Item>
                  </Carousel>
                </div>
                <div className="col-12 col-md-12 border-top-0 col-lg-12 col-xl-12 mx-auto px-0 friendsDesc">
                  <div className="text-dark  f-detail-content p-md-4 p-3 text-white">
                    {ReactHtmlParser(item.desc)}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-md-5 mt-xs-5">
              <div className="row col-12 col-md-12 col-lg-12 col-xl-12 mx-auto px-0">
                <div className="col-6 col-md-6 col-lg-3 col-xl-3 pl-0">
                  <div className="icon-container-first mx-auto mt-3 mt-md-0 text-center">
                    {" "}
                    <BiTimeFive className="text-white p-1 p-md-1 p-xl-0 px-lg-0" size="60" title="Hours Of Operation" />
                  </div>
                  <div className="sub-title text-center  mt-3">
                    Hours of Operation:
                    <p className="p-content mt-2">
                      {" "}
                      {ReactHtmlParser(item.hrs_operation)}
                    </p>
                  </div>
                </div>
                <div className="col-6 col-md-6 col-lg-3 col-xl-3 pl-0">
                  <div className="icon-container mt-3 mt-md-0 mx-auto text-center">
                    {" "}
                    <GoLocation className="text-white p-1 p-md-1 p-xl-0 px-lg-0" size="50" title="Address" />
                  </div>
                  <div className="sub-title text-center mx-auto mt-3">
                    Address:
                    <p className="p-content mt-2">{ReactHtmlParser(item.address)}</p>
                  </div>
                </div>
                <div className="col-6 col-md-6 col-lg-3 col-xl-3 pl-0">
                  <div className="icon-container mt-3 mt-md-0  mx-auto  text-center">
                    {" "}
                    <IoCallOutline
                      className="text-white p-1 p-md-1 p-xl-0 px-lg-0"
                      size="45"
                      title="Phone"
                    />
                  </div>
                  
                  <div className="sub-title  text-center mt-3">
                    Phone:
                    <p className="p-content mt-2">
                      {" "}
                      {ReactHtmlParser(item.phone_no)}
                    </p>
                  </div>
                </div>
                <div className="col-6 col-md-6 col-lg-3 col-xl-3 pl-0">
                  <div className="icon-container mt-3 mt-md-0 mx-auto  text-center">
                    {" "}
                    <AiOutlineGlobal
                      className="text-white p-1 p-md-1 p-xl-0 px-lg-0"
                      size="55"
                      title="Website URL"
                    />
                  </div>
                  <div className="sub-title  text-center mx-auto  mt-3">
                    Website Url:
                    <p className="p-content mt-2">
                      {" "}
                      {ReactHtmlParser(item.web_url)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="connect-title text-center text-center mt-4">
              Connect with lucky buck cafe
            </div>

            {/* <div className="horizontal-line mb-3"></div> */}
            <div className="text-center mt-4 mb-5">
              <ul className="social-networks list-unstyled d-flex justify-content-center">
                <li className="icon-color mx-2">
                  <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https://www.yosemitewestgate.com/friends-details-page/the-san-remo-hotel" className="icon-facebook">
                    <TiSocialFacebook
                      size="45"
                      title="Facebook"
                      className="cursor-pointer mr-3 mr-md-4"
                    />{" "}
                  </a>
                </li>
                <li className="icon-color mx-2">
                  <a target="_blank" href="https://twitter.com/intent/tweet?url=https://www.yosemitewestgate.com/friends-details-page/lucky-buck-cafe" className="icon-yelp">
                    <FaYelp
                      size="45"
                      title="Yelp"
                      className="cursor-pointer mr-3 mr-md-4 p-1"
                    />{" "}
                  </a>
                </li>
                <li className="icon-color mx-2">
                <a target="_blank" href="http://pinterest.com/pin/create/button/?url=https://alpha.yosemitewestgate.com/friends-details-page/the-san-remo-hotel&description=friends" className="icon-tripAdvisor cursor-pointer">
                    <SiTripadvisor size="45" title="Trip Advisor" className=" mr-3 mr-md-4 p-1" />{" "}
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-12 px-0 position-relative mb-5 ">
              <button
                className="btn-style mt-3 position-absolute layer"
                title="GET DIRECTIONS FOR YOSEMITE WESTGATE LODGE"
              >
                GET DIRECTION
              </button>
              <FriendDetailsMapbox className="" friendsDetailsData={friendsDetailsData} />
            </div>
          </div>
        </>
      ))}
    </div>
  );
}
