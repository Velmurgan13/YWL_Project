import React, { useState, useEffect } from "react";
import BannerContainer from "../BannerComponent/BannerContainer";
import { Link } from "react-router-dom";
// import BannerImage from '../../../E/Yosemitewestgate/assets/images/BannerImages/rooms-banner-desk.webp';
// import BannerImage1 from '../../../E/Yosemitewestgate/assets/images/BannerImages/rooms-banner-mob.webp';
import { motion } from "framer-motion";
import {
  getSeoDescriptionData,
  getGuestRoomsData,
} from "../../../DataLayer/datalayerUtilities";
import { useRecoilValue } from "recoil";
import {
  propertyDataSelector,
  seoThemeDetails,
} from "../../../Recoil/themeModule";
import "../Rooms/index.scss";
import ReactHtmlParser from "react-html-parser";
import { FaAccessibleIcon, FaSmokingBan, FaWifi } from "react-icons/fa";

const RoomComponent = (props) => {
  const propertyData = useRecoilValue(propertyDataSelector);
  const { guestrooms: seoId } = useRecoilValue(seoThemeDetails);
  // console.log(guestrooms);
  const [seoData, setPropertySeodata] = useState([]);
  const [GuestRoomData, setGuestRoomData] = useState([]);
  const [AmenitiesData, setAmenitiesData] = useState([]);

  useEffect(() => {
    fetchSeoProperties();
    fetchPropertyGuestRooms();
  }, []);

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData(seoId);
    setPropertySeodata(response.data);
  };

  const fetchPropertyGuestRooms = async () => {
    const response = await getGuestRoomsData();
    // console.log(response);
    setGuestRoomData(response.room_details);
    setAmenitiesData(response.amenities_data);
    console.log(response);
  };

  return (
    <>
      <BannerContainer seoData={seoData} />
      <div className=" px-0 text-center GuestRoomScss">
        {/* <div className="bg-gray pb-4">
          <div className="container ">
            <div className="col-lg-12">
      <p>At Hotel Yosemite Westgate, we provide ultimate comfort so you can experience the best of Yosemite National Park, California.  </p>
    </div>
          </div>
        </div> */}

        <div className="conatiner mb-5 singleGuestRoom">
          <div className="col-lg-12 col-xl-12 col-md-12">
            {Object.values(GuestRoomData)
              .filter((fil) => {
                return fil.room_type_id;
              })
              .map((item, index) => {
                return (
                  <>
                    {item.amenities.length !== 0 ? (
                      <div
                        className="row main-flex flex-reverse-colom mb-80 mt-3 mb-5"
                        key={index}
                      >
                        <div className="col-lg-5 col-md-5 col-md-12 mb-4">
                          <div className="room_description-amenities d-none d-md-block">
                            <ul className="list-unstyled">
                              <li>
                                <span
                                  data-placement="top"
                                  title=""
                                  data-original-title="ADA Accessible Room"
                                >
                                  {" "}
                                  <FaAccessibleIcon
                                    className="text-primary"
                                    title="ADA Accessible Guest Room"
                                    size="30"
                                  />
                                </span>
                              </li>
                              <li>
                                <span
                                  data-placement="top"
                                  title=""
                                  data-original-title="Non-Smoking"
                                >
                                  <FaSmokingBan
                                    className="text-danger"
                                    title="Non-Smoking"
                                    size="30"
                                  />
                                </span>
                              </li>
                              <li>
                                <span
                                  data-placement="top"
                                  title=""
                                  data-original-title="Wifi"
                                >
                                  <FaWifi
                                    className="text-success"
                                    title="Wifi"
                                    size="30"
                                  />
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className="text-left mb-4">
                            <span className="occupancy">
                              MAX OCCUPANCY: {item.no_of_guest} PERSONS
                            </span>
                          </div>

                          {GuestRoomData &&
                            item.room_description &&
                            ReactHtmlParser(
                              item.room_description.substr(0, 400)
                            )}
                          <div class="room_description-amenities d-block d-md-none">
                            <ul class="list-unstyled">
                              <li>
                                <span
                                  data-placement="top"
                                  title=""
                                  data-original-title="ADA Accessible Room"
                                >
                                  {" "}
                                  <FaAccessibleIcon
                                    className="text-primary"
                                    title="ADA Accessible Guest Room"
                                    size="30"
                                  />
                                </span>
                              </li>
                              <li>
                                <span
                                  data-placement="top"
                                  title=""
                                  data-original-title="Non-Smoking"
                                >
                                  <FaSmokingBan
                                    className="text-danger"
                                    title="Non-Smoking"
                                    size="30"
                                  />
                                </span>
                              </li>
                              <li>
                                <span
                                  data-placement="top"
                                  title=""
                                  data-original-title="Wifi"
                                >
                                  <FaWifi
                                    className="text-success"
                                    title="Wifi"
                                    size="30"
                                  />
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className="dfsss mt-5">
                            <div className="book">
                              <Link
                                to={`/guestrooms/${item.subdomain}`}
                                className="btn bookbtn detailsBtn roomBtnStyle"
                                title="See Details"
                              >
                                {" "}
                                SEE DETAILS{" "}
                              </Link>

                              <Link
                                to={`/reservations`}
                                className="btn bookbtn detailsBtn2 roomBtnStyle2"
                                title="Check Availability"
                              >
                                CHECK AVAILABILITY
                              </Link>
                            </div>
                          </div>
                          <div className="guest-dfs  col-lg-12 px-0 single-img d-none d-md-none d-xl-block d-lg-block">
                            {item.room_images.map((subitem) => {
                              return (
                                <>
                                  {subitem.image_name != null ? (
                                    <div className="p-2 border-room mr-1 col-lg-6">
                                      {" "}
                                      <img
                                        src={
                                          "https://beta.yosemitewestgate.com/" +
                                          "gallery-images/properties/medium/" +
                                          subitem.image_name
                                        }
                                        // alt=""
                                        alt={item.room_name}
                                        title={item.room_name}
                                        className="W100 "
                                      />
                                    </div>
                                  ) : (
                                    " "
                                  )}
                                </>
                              );
                            })}
                          </div>
                        </div>
                        <div className="col-lg-7 col-md-7 col-md-12 roomInfoIpad PR pr-0 pl-0">
                          <div
                            className="img-shadow PR"
                            alt={item.room_name}
                            title={item.room_name}
                          >
                            <img
                            alt={item.room_name}
                            title={item.room_name}
                              src={
                                "https://beta.yosemitewestgate.com/" +
                                item.image_url
                              }
                              className="W100"
                              onError={(e) => {
                                e.currentTarget.src =
                                  "https://beta.laquintasantacruz.com/gallery-images/default-vector-bedroom-image.jpg";
                              }}
                            />
                          </div>
                          <h3 className="guest-h3">{item.room_name}</h3>
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
      </div>
    </>
  );
};

export default RoomComponent;
