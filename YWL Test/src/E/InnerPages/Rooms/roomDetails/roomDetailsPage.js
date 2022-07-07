import React, { useState, useEffect } from "react";
import BannerContainer from "../../../InnerPages/BannerComponent/BannerContainer";
import { useRecoilValue } from "recoil";
import { themeSelector } from "../../../../Recoil/themeModule";
import WrappperCheckAvailibility from "../../../CheckAvailibilty/WrapperCheckAvailibity";
import { seoThemeDetails } from "../../../../Recoil/themeModule";
import Carousel from "react-bootstrap/Carousel";
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
import AmenitiesSlider from "../../../InnerPages/Rooms/roomDetails/amenitiesSlider";
import ImagesSlider from "../../../InnerPages/Rooms/roomDetails/customSliderimages";
import {
  FaAccessibleIcon,
  FaSmokingBan,
  FaWifi,
  FaHotel,
  BsPersonFill,
  FaUserAlt,
  SiGoogleclassroom,
} from "react-icons/fa";
export default function GuestRoomDetailsPage(props) {
  const propertyData = useRecoilValue(propertyDataSelector);
  const { guestrooms: seoId } = useRecoilValue(seoThemeDetails);
  const [RoomDetailsData, setRoomDetailsData] = useState([]);
  const [OtherRoomsDetailsData, setOtherRoomsDetailsData] = useState([]);
  const [VideosData, setVideosData] = useState([]);

  //icons
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
  useEffect(() => {
    fetchPropertyRoom();
  }, []);

  const fetchPropertyRoom = async () => {
    // console.log(props.match.params);
    const response = await getPropRoomsDetailsData(props.match.params);
    console.log("thi sis ", response);
    setRoomDetailsData(response.room_details);
    setOtherRoomsDetailsData(response.other_room_details);
    setVideosData(response.videos);
  };
  const baseUrl = "https://beta.yosemitewestgate.com/";
  const xml = " ";
  return (
    <div className=" px-0 text-center GuestRoomScss">
      <div className="container-fluid px-0">
        <div className="single-img">
          {/* <BannerContainer seoData={seoData} /> */}
          <div className="displayCA">
            <div className="position-relative">
              <div className="overlay-bg-layer"></div>
              {Object.values(RoomDetailsData).map((item) => {
                return (
                  <>
                    {item.image_url != null ? (
                      <>
                        {" "}
                        <picture>
                          <img
                            className="w-100 h-100 banner-xs  banner-xl-size mx-0 mt-0 d-none d-md-block d-lg-block d-xl-block"
                            src={baseUrl + item.image_url}
                            alt="banner-overiew"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://beta.laquintasantacruz.com/gallery-images/default-vector-bedroom-image.jpg";
                            }}
                          />

                          <img
                            className="w-100 h-100 banner-xs details-banner-xs mx-0  mt-0 d-block d-md-none d-lg-none d-xl-none"
                            src={baseUrl + item.image_url}
                            alt="banner-overiew"
                          />
                        </picture>
                        <div className="inner-text-overlay slider-txt">
                          <div className="text-white banner-title-bg-color d-inline-block mt-2 fs-xs-16 px-0 px-md-4 ls-2">
                            {ReactHtmlParser(item.room_name)}
                          </div>
                        </div>
                      </>
                    ) : (
                      " "
                    )}{" "}
                  </>
                );
              })}{" "}
            </div>
            <div className="wrapCA checkAvail">
              <WrappperCheckAvailibility />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center my-4 my-md-3">
        {Object.values(RoomDetailsData).map((item) => {
          return (
            <>
              <div className="about aboutTittle mt-md-4 mt-4 mb-4">
                {ReactHtmlParser(item.room_name)}
              </div>
            </>
          );
        })}
      </div>
      
      <div
        className="container min100 shadow pb-0 GuestRoomScss "
        id="delay-details"
      >
        <div className="col-lg-12 col-xl-12 col-md-12">
          <ImagesSlider ImagesSlider={RoomDetailsData} />
        </div>
        <div className="container mb-4 mt-5 w94-p ameni-94">
          {Object.values(RoomDetailsData).map((item) => {
            return (
              <div className="col-lg-12 col-xl-12 col-md-12">
                {/* <p className="roomdetails-name">{item.room_name}</p> */}
                {item.image_url != null ? (
                  <>
                    <ul class="detailsAmenities my-4">
                      <li>
                        <span>
                          <FaSmokingBan title="Non-Smoking" />
                        </span>
                        Non-Smoking
                      </li>
                      <li>
                        <span>
                          <FaHotel title="Floors" />
                        </span>
                        {item.floor} floor
                      </li>
                      <li>
                        <span>
                          <FaAccessibleIcon title="ADA Accessible Guest Room" />
                        </span>
                        ADA Accessible Guest Room
                      </li>
                      <li>
                        {" "}
                        <span>
                          <FaUserAlt title="Persons" />
                        </span>
                        {item.no_of_guest} Person
                      </li>
                      <li>
                        <span>
                          <FaHotel title="Area" />
                        </span>
                        {item.room_size_feet} ft Area{" "}
                      </li>
                    </ul>
                    <p> {ReactHtmlParser(item.room_description)}</p>
                    <div className="included mt-4">
                      <p className="a-p1 mb-0">
                        {item.included && (
                          <>
                            <span className="font-weight-bold"> INCLUDED:</span>{" "}
                            {ReactHtmlParser(item.included)}
                          </>
                        )}
                      </p>
                      <p className="a-p1 mb-0">
                        {item.not_included && (
                          <>
                            <span className="font-weight-bold">
                              NOT INCLUDED:{" "}
                            </span>{" "}
                            {ReactHtmlParser(item.not_included)}
                          </>
                        )}
                      </p>
                      {/* <p className="a-p1 mb-0">
                        {item.extra_bed_configurations && (
                          <>
                            <span className="font-weight-bold">EXTRA BED: </span>
                            {ReactHtmlParser(item.extra_bed_configurations)}
                          </>
                        )}
                      </p> */}





                      <p className="a-p1 mb-0">
                        {item.extra_bed_configurations && (
                          <>
                            <span className="font-weight-bold">EXTRA BED: </span>{" "}
                            <p>{ReactHtmlParser(item.extra_bed_configurations)}</p>
                          </>
                        )}
                      </p>




                      <p className="a-p1 mb-0">
                        {item.hotel_extra_bed_policy && (
                          <>
                            <span className="font-weight-bold">EXTRA BED POLICY: </span>{" "}
                            {ReactHtmlParser(item.hotel_extra_bed_policy)}
                          </>
                        )}
                      </p>
                    </div>
                  </>
                ) : (
                  " "
                )}
              </div>
            );
          })}
        </div>
        <div className="mb-5 px-0 w94-p">
          {Object.values(RoomDetailsData)
            .filter((fil) => {
              return fil.room_type_id;
            })
            .map((item, index) => {
              return (
                <div className="col-lg-12 col-xl-12 col-md-12 px-0">
                  <h3 className="roomdetails-name">Amenities</h3>

                  <div className="row px-0 mob-px-0">
                    {item.amenitieswithimgs.map((subitem) => {
                      return (
                        <>
                          {subitem.amenity_icon != null ? (
                            <div className="amenitiesdfs my-2 col-lg-4 col-md-6 py-2">
                              <span className="mr-4">
                                <img
                                  title={subitem.name}
                                  src={
                                    "https://beta.yosemitewestgate.com/" +
                                    "gallery-images/amenityicon/" +
                                    subitem.amenity_icon
                                  }
                                  alt=""
                                  className="w-30px"
                                />
                              </span>{" "}
                              <span className="text-left"> {subitem.name}</span>{" "}
                            </div>
                          ) : (
                            " "
                          )}
                        </>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
        <AmenitiesSlider Amenitiesslide={RoomDetailsData} />
        <div className="mb-5 mt-5">
          <div className="col-lg-12 col-xl-12 col-md-12 mw-90p">
            {Object.values(VideosData).length !== 0 ? (
              <>
                <div className=" col-lg-12 text-center">
                  <h3 className="roomdetails-name">Videos</h3>
                </div>
                <div className="row videe justify-content-center mb-5 mt-4">
                  {Object.values(VideosData).map((item) => {
                    return (
                      <div className="mx-5">
                        <a href={item.video_url} target="_blank">
                          <img
                            src={
                              "https://my.innstaging.com/user_images/properties/videos/thumbs/2/6/5/" +
                              item.video_thumb
                            }
                            alt={item.video_caption}
                            className="w300"
                          />
                        </a>
                      </div>
                    );
                  })}
                </div>{" "}
              </>
            ) : (
              " "
            )}
          </div>
        </div>
        <div className="mb-5">
          <div className="col-lg-12 col-xl-12 col-md-12 mw-90p">
            <div className="text-center col-lg-12">
              <h3 className="roomdetails-name mt-5 mb-4">Room Plan</h3>
            </div>
            {Object.values(RoomDetailsData).map((item) => {
              return (
                <>
                  {item.roomplan_description != null ? (
                    <div className="bg-roomplan">
                      <div className="plan-img col-lg-4">
                        {" "}
                        <img
                          title={item.room_name + " - Room Plan"}
                          src={
                            "https://beta.yosemitewestgate.com/gallery-images/properties/medium/" +
                            item.roomplan_image
                          }
                          alt=""
                          className="W100"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://beta.laquintasantacruz.com/gallery-images/default-vector-bedroom-image.jpg";
                          }}
                        />{" "}
                      </div>
                      <div className="plan-img col-lg-8">
                        {" "}
                        <p>{item.roomplan_description}</p>{" "}
                      </div>
                    </div>
                  ) : (
                    " "
                  )}
                </>
              );
            })}
          </div>
        </div>
        <div className="">
          <div className="col-lg-12 col-xl-12 col-md-12 mw-90p">
            <div className="row">
              <div className="text-center col-lg-12">
                <h3 className="roomdetails-name">3D VIRTUAL TOUR</h3>
              </div>
              {Object.values(RoomDetailsData).map((item) => {
                return (
                  <div className="text-center col-lg-12 mt-4">
                    {item.panographicxml != null ? (
                      <div>
                        {" "}
                        <iframe
                          width="100%"
                          height="434"
                          src={
                            "https://www.innsight.com/virtual/index.php?value=" +
                            item.panographicxml
                          }
                          title="Video"
                        ></iframe>{" "}
                      </div>
                    ) : (
                      " "
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mb-5 px-0 bg-room-other p-3">
          <div className="col-lg-12 col-xl-12 col-md-12 px-0 mw-90p">
            <div className="row">
              <div className="text-center col-lg-12 px-0 ipad-details-top mt-3">
                <span className="roomdetails-name ml-4">
                  Other Room Details
                </span>
              </div>
              {Object.values(OtherRoomsDetailsData).map((item) => {
                return (
                  <>
                    <div className="col-lg-4 px-0 my-4 suggestRoomCard">
                      {" "}
                      <div className="roomCardDetails">
                        <div className="col-lg-12 px-0">
                          {
                            <Link to={`/guestrooms/${item.subdomain}`}>
                              <img
                                src={
                                  "https://beta.yosemitewestgate.com/" +
                                  item.image_medium_url
                                }
                                alt={(item.image_caption) ? item.image_caption : "Image Not Available"}
                                className="W100"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "https://beta.laquintasantacruz.com/gallery-images/default-vector-bedroom-image.jpg";
                                }}
                              />
                             </Link>
                            }
                          </div>
                          <div className="col-lg-12">
                            <p className="mt-3 mb-2 room-name-details text-center">
                              {item.room_name}
                            </p>
                          </div>
                        </div>
              
                        <div className="book mb-3">
                      <Link
                        to={`/guestrooms/${item.subdomain}`}
                        className="btn bookbtn detailsBtn roomBtnStyle btnFix"
                        title="See Details"
                      >
                        SEE DETAILS
                      </Link>

                        <Link
                          to={`/reservations`}
                          className="btn bookbtn detailsBtn2 roomBtnStyle2 btnFix2"
                          title="Check Availability"
                        >
                          CHECK AVAILABILITY
                        </Link>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}
