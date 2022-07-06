import React, { useState, useEffect } from "react";
import {
  getSeoDescriptionData,
  getPropCleanProtocolData,
} from "../../../DataLayer/datalayerUtilities";
import { motion } from "framer-motion";
import "../../InnerPages/cleaningProtocal/index.scss";
import "./index.css";
import BannerContainer from "../BannerComponent/BannerContainer";
import ReactHtmlParser from "react-html-parser";
import Housekeepertrolley from "../../Yosemitewestgate/assets/images/housekeeper-trolley.webp";
import { useRecoilValue } from "recoil";
import {
  propertyDataSelector,
  seoThemeDetails,
} from "../../../Recoil/themeModule";
import sanatizerImg from "../../Yosemitewestgate/assets/images/sanitizer.jpg";

const CleaningProtocalComponent = () => {
  const propertyData = useRecoilValue(propertyDataSelector);
  const { cleaningprotocols: seoId } = useRecoilValue(seoThemeDetails);
  // console.log(seoId);

  const [toggleState, setToggleState] = useState(1);
  const [clicked, setClicked] = useState(false);
  const [seoData, setPropertySeodata] = useState([]);
  const [CleanProtocolData, setPropertyCleanProtocolData] = useState([]);

  useEffect(() => {
    fetchSeoProperties();
    fetchPropCleanProtocol();
  }, []);

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData(seoId);
    setPropertySeodata(response.data);
  };

  const fetchPropCleanProtocol = async () => {
    const response = await getPropCleanProtocolData();
    // console.log(response.data);
    setPropertyCleanProtocolData(response.data);
  };

  return (
    <>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.4 }}
      >
        <BannerContainer seoData={seoData} />
      </motion.div>
      <div className="container CleaningProtocal mt-3">
        <div className="row">
          <strong className="static-line1">
            
            During these challenging times with the COVID-19 Pandemic, we deem
            it essential to implement new sanitation guidelines and processes at
            our hotel in order to provide as safe an environment as possible for
            our guests and associates.
          </strong>
          <div className="col-8 clean-style mob-view">
              <div className="mt-2">
                <strong className="static-line">
                  Here are some measures we have implemented to work towards a
                  more sanitary and safe experience, for all:
                </strong>
              </div>
              <ul className="mt-2 fs-16 pl-5 listView">
                <li>
                  All of our staff have been trained on 'Universal Precaution'
                  methods
                </li>
                <li>
                  Housekeeping staff wears disposable gloves at all times during
                  cleaning, and wear a new pair at the start of every shift
                </li>
                <li>
                  Housekeeping staff has been taught the proper method of
                  removing gloves, and proper disposal to avoid
                  cross-contamination
                </li>
                <li>Housekeeping carts are sanitized before use each day</li>
              </ul>
            {Object.values(CleanProtocolData).map((item) => {
              return (
                <>
                  <div className="mt-4">
                    <strong class="static-line mt-4">
                      {ReactHtmlParser(item.cp_title)}
                    </strong>
                    <div className="pl-3 fs-16 mt-3 listView">
                      {ReactHtmlParser(item.cp_desc)}
                    </div>
                  </div>
                </>
              );
            })}
            
              <div>
                <div className="static-line">
                  <strong>
                    We have also implemented processes to clean the areas that
                    most people touch without thought and out of habit:
                  </strong>
                </div>
                <ul className="fs-16 mt-3 pl-5 listView">
                  <li>Disinfect in-room telephones.</li>
                  <li> Master keys are sanitized daily.</li>
                  <li>
                    Disinfect handles to mops, dusters, vacuums, toilet brushes,
                    and spray bottles daily
                  </li>

                  <li>
                    Disinfect the staff break room and all appliances, handles,
                    and tables
                  </li>
                  <li>
                    Bell truck and luggage cart handholds are disinfected after
                    each use
                  </li>
                  <li>
                    Sanitize vending machines, guest laundry (machines, soap,
                    and change dispensers, surfaces, door handles, door jams,
                    and seats)
                  </li>
                  <li>
                    Remove pamphlets, maps, menus, and magazines from common
                    areas
                  </li>
                  <li>
                    Disinfect seats, tables, lamps, and all areas that are
                    commonly touched by guests in lobbies and common areas
                  </li>
                  <li>
                    The use of shared food and beverage equipment, including
                    shared coffee service has been discontinued
                  </li>
                  <li>No stayover daily housekeeping service</li>
                  <li>Contactless amenity drop-offs</li>
                  <li>
                    Reduced paper amenities (like notepads, magazines and guest
                    directories) in guest rooms
                  </li>
                </ul>
              </div>
            
          </div>
          <div className="col-md-4 col-12 description-img ">
            <img
              className="w-100 d-none d-md-block d-lg-block d-xl-block h-auto"
              src={Housekeepertrolley}
              alt="side"
              title="Hotel Housekeeping"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 col-12 description-1">
            <div className="my-3 bg-img-clean-protocal">
              <div className="d-xxl- none d-xl-none d-lg-none d-md-none d-sm-block d-xs-block">
                <img 
                src={sanatizerImg}
                alt="Sanatizer"
                title="House Keeping" 
                className="sanatizeMobImg"
                />
              </div>
              <div className="line-h-5 pl-5 pb-2 text-white PR bg mb-5 otherMeasures">
                <div className="pl-2 pt-5 col-6 cleanIpadV">
                  <div className="static-line font-weight-bold">
                    OTHER MEASURES WE HAVE UNDERTAKEN &nbsp;:
                  </div>
                  <ul className="pl-5 pb-3 measuresList">
                    <li>
                      Sneeze guard at Front Desk to prevent spread at lobby
                    </li>
                    <li>Modified breakfast procedures</li>
                    <li>
                      Spread breakfast tables so that they meet the safety
                      distance standards that are currently in place
                    </li>
                    <li>
                      Front desk staff are instructed to wear disposable gloves
                    </li>
                    <li>
                      Remove containers of pens at the reservation counters
                    </li>
                    <li>
                      Installed automated hands-free hand sanitizer station
                    </li>
                    <li>
                      Properties with saunas, hot tubs, and steam rooms refer to
                      CDC guidelines for proper protocols and precautions
                    </li>
                    <li>
                      Keep disinfectant wipes, and waste baskets beside public
                      phones or other frequently touched amenities
                    </li>
                    <li>
                      Lock every other stall in public bathrooms to maintain the
                      recommended distance protocols
                    </li>
                    <li>
                      Proper safety protocols are taken in regards to
                      disinfecting fitness rooms, and equipment
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CleaningProtocalComponent;
