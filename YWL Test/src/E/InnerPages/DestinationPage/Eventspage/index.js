



// hard 3rd code
import React, { useState, useEffect } from "react";
//common images
import BannerContainer from "../../../InnerPages/BannerComponent/BannerContainer";
import DefaultImg  from '../../../CommonAssets/images/default-imag.png'
import { useRecoilValue } from "recoil";
import { motion } from "framer-motion";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  propertyDataSelector,
  seoThemeDetails,
} from "../../../../Recoil/themeModule";
import events from "./events";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { TiWarningOutline } from 'react-icons/ti'
import moment from 'moment'
import {
  getSeoDescriptionData,
  getPropEventsData,
} from "../../../../DataLayer/datalayerUtilities";
import "./index.scss";


const localizer = momentLocalizer(moment)

export default function EventsPage(props) {
  console.log(props.eventData);
  const propertyData = useRecoilValue(propertyDataSelector);
  console.log(propertyData)
  const { events: seoId } = useRecoilValue(seoThemeDetails);
  const [seoData, setPropertySeodata] = useState([]);
  const [eventData, setPropertyEventdata] = useState([]);
  const [toggleState, setToggleState] = useState(1);
  const [sortEventTab, setSortEventTab] = useState(1);

  useEffect(() => {
    fetchPropertyStay(sortEventTab);
    fetchSeoProperties();
  }, [sortEventTab]);

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData(seoId);
    setPropertySeodata(response.data);
  };

  const toggleTab = (index, tabName) => {
    setToggleState(index);
    setSortEventTab(tabName);
    // fetchPropertyStay(tabName);
    // useEffect();
  };

  const fetchPropertyStay = async (sortData) => {
    console.log(sortEventTab)
    const response = await getPropEventsData(sortData);
    console.log("this is eventMainData", response);
    if(toggleState == 1){
      setPropertyEventdata(response.data.event_details.sliderallEvents);
      if((response.data.event_details.sliderallEvents).length > 0){
        
        document.getElementById("message_data").style.display = "none";
      }else{
        document.getElementById("message_data").style.display = "block";
      }
    }
    else 
    {
      setPropertyEventdata(response.data.event_details.allEvents);
      console.log((response.data.event_details.allEvents).length)
      if((response.data.event_details.allEvents).length > 0){
        console.log('if data')
        document.getElementById("message_data").style.display = "none";
      }else{
        console.log('else data')
        document.getElementById("message_data").style.display = "block";
      }
      
      
    }
  };
console.log(eventData.length)

  return (
    <div>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.4 }}
      >
        <BannerContainer seoData={seoData} />
      </motion.div>
      {/* <div className="EventPage">
        <CustomTab eventData={eventData} />
      </div> */}

      <div>
        <div className="container mt-4 mb-5 EventPage">
          <div className="bloc-tabs row mx-1 mx-md-1 px-0">
            <button
              className={toggleState === 1 ? "tabs active-tabs" : "tabs tab-event  my-md-2 my-xl-0 my-lg-0"}
              onClick={() => toggleTab(1)}

            >
      <span>ALL</span>
            </button>
            <button
              className={toggleState === 2 ? "tabs active-tabs" : "tabs  tab-event my-md-2 my-xl-0 my-lg-0"}
              // onClick={() => toggleTab(2)}
              onClick={(e) => toggleTab(2, "thisWeek", e)}
            >
       <span>       THIS WEEK</span>
            </button>
            <button
              className={toggleState === 3 ? "tabs active-tabs" : "tabs  tab-event my-md-2 my-xl-0 my-lg-0"}
              onClick={(e) => toggleTab(3, "thisMonth" , e)}
            >
             <span> NEXT 30 DAYS</span>
            </button>
            <button
              className={toggleState === 4 ? "tabs active-tabs" : "tabs   tab-event  my-md-2 my-xl-0 my-lg-0"}
              onClick={(e) => toggleTab(4, "90Days" , e)}
            >
           <span>   NEXT 90 DAYS</span>
            </button>
            <button
              className={toggleState === 5 ? "tabs active-tabs" : "tabs tab-event  my-md-2 my-xl-0 my-lg-0"}
              onClick={() => toggleTab(5)}
            >
           <span>CALENDER</span>
            </button>
          </div>


          <div className="content-tabs">
            <div
              className={toggleState === 1 ? "content  active-content" : "content"}
            >
              {!eventData && <div id="message_data"><p className="text-danger text-center sry-font mt-5 mb-4">
              <TiWarningOutline className="mx-2 mb-1" size="30" /> 
                Sorry, Yosemite Westgate Lodge currently has no events available.
              </p></div>}
              {eventData.length>0 && eventData.map((item) => (
                <div className="card col-lg-4 col-12 EventBox">
                  <a href="">
                    <img
                      src={item.event_images[0].img_name}
                      alt="Card image cap"
                      className="W100 card-img-top"
                      onError={(e) => {
                        e.currentTarget.src =
                    DefaultImg
                      } } />
                  </a>

                  <div className="card-body">
                    <div className="eventcontent">
                      <h3 className="title"> {ReactHtmlParser(item.event_name)} </h3>
                      <div className="description">
                        <p className="form-title mb-0 pt-2 pb-1">
                          {ReactHtmlParser(item.short_desc)}{" "}
                        </p>
                      </div>
                      <Link to={`/events/${item.subdomain}`} className="">
                        <button
                          className="home-readmore-btn welcome-btn btn-style mt-3"
                          title="View details"
                        >
                          VIEW DETAILS
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

           
              <div
                className={toggleState === 2 ? "content  active-content" : "content"}
              >

          {!eventData && <div id="message_data"><p className="text-danger text-center sry-font mt-5 mb-4">
          <TiWarningOutline className="mx-2 mb-1" size="30" /> 
                Sorry, Yosemite Westgate Lodge currently has no events available.
              </p></div>}
                {eventData.length>0 && eventData.map((item) => (
                  <div className="card col-lg-4 col-12 EventBox">
                    <a href="">
                      <img
                        src={item.event_images[0].img_name}
                        alt="Card image cap"
                        className="W100 card-img-top"
                      />
                    </a>

                    <div className="card-body">
                      <div className="eventcontent">
                        <h3 className="title"> {ReactHtmlParser(item.event_name)} </h3>
                        <div className="description">
                        <p className="form-title mb-0">
                            {ReactHtmlParser(item.short_desc)}{" "}
                          </p>
                        </div>
                        <Link to={`/events/${item.subdomain}`} className="">
                          <button
                            className="home-readmore-btn welcome-btn btn-style mt-3"
                            title="View Details"
                          >
                            VIEW DETAILS
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            
           
              
              


              <div
                className={toggleState === 3 ? "content  active-content" : "content"}
              >
                {!eventData && <div id="message_data"><p className="text-danger text-center sry-font mt-5 mb-4">
                <TiWarningOutline className="mx-2 mb-1" size="30" /> 
                Sorry, Yosemite Westgate Lodge currently has no events available.
              </p></div>}
                {eventData.length>0 && eventData.map((item) => (
                  <div className="card col-lg-4 col-12 EventBox">
                    <a href="">
                      <img
                        src={item.event_images[0].img_name}
                        alt="Card image cap"
                        className="W100 card-img-top"
                      />
                    </a>

                    <div className="card-body">
                      <div className="eventcontent">
                        <h3 className="title"> {ReactHtmlParser(item.event_name)} </h3>
                        <div className="description">
                        <p className="form-title mb-0">
                            {ReactHtmlParser(item.short_desc)}{" "}
                          </p>
                        </div>
                        <Link to={`/events/${item.subdomain}`} className="">
                          <button
                            className="home-readmore-btn welcome-btn btn-style mt-3"
                            title="View details"
                          >
                            VIEW DETAILS
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            
            <div
              className={toggleState === 4 ? "content  active-content" : "content"}
            >
             {!eventData && <div id="message_data"><p className="text-danger text-center sry-font mt-5 mb-4">
             <TiWarningOutline className="mx-2 mb-1" size="30" /> 
                Sorry, Yosemite Westgate Lodge currently has no events available.
              </p></div>}
                {eventData.length>0 && eventData.map((item) => (
                  <div className="card col-lg-4 col-12 EventBox">
                    <a href="">
                      <img
                        src={item.event_images[0].img_name}
                        alt="Card image cap"
                        className="W100 card-img-top"
                      />
                    </a>

                    <div className="card-body">
                      <div className="eventcontent">
                        <h3 className="title"> {ReactHtmlParser(item.event_name)} </h3>
                        <div className="description">
                        <p className="form-title mb-0">
                            {ReactHtmlParser(item.short_desc)}{" "}
                          </p>
                        </div>
                        <Link to={`/events/${item.subdomain}`} className="">
                          <button
                            className="home-readmore-btn welcome-btn btn-style mt-3"
                            title="View details"
                          >
                            VIEW DETAILS
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            <div
              className={toggleState === 5 ? "content  active-content" : "content"}
            >
              <div style={{ width: "100%" }}>
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: "500px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
