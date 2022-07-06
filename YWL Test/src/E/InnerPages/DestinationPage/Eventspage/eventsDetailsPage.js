import React, { useState, useEffect } from "react";

import BannerContainer from "../../../InnerPages/BannerComponent/BannerContainer";
import { useRecoilValue } from "recoil";
import { seoThemeDetails } from "../../../../Recoil/themeModule";
import Demoimage from "../../../Yosemitewestgate/assets/Icons/eventdemo - Copy.webp";
import { motion } from "framer-motion";
import DefaultImg  from '../../../CommonAssets/images/default-imag.png'
import moment from "moment";
import {
  getSeoDescriptionData,
  getPropEventsDetailsData,
} from "../../../../DataLayer/datalayerUtilities";
import { getEventContactDetailsFormData } from "../../../../DataLayer/datalayerUtilities";
import "./index.scss";
import { useForm } from "react-hook-form";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import { propertyDataSelector } from "./../../../../Recoil/themeModule";
import Carousel from "react-bootstrap/Carousel";
import ReCAPTCHA from "react-google-recaptcha";

export default function EventsDetailsPage(props) {
  const propertyData = useRecoilValue(propertyDataSelector);
  // console.log(propertyData);
  // console.log(props.match);
  const { events: seoId } = useRecoilValue(seoThemeDetails);
  const [seoData, setPropertySeodata] = useState([]);
  const [eventDetailsData, setEventDetailsData] = useState([]);
  const [eventAllDates, SetEventAllDates] = useState([]);
  const [captcha, setCaptchaData] = useState([]);
  const [count, setCount] = React.useState(1000);

  const recaptchaRef = React.createRef();

  useEffect(() => {
    fetchSeoProperties();
    fetchPropertyEvent();
  }, []);

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData(seoId);
    setPropertySeodata(response.data);
  };

  const fetchPropertyEvent = async () => {
    const response = await getPropEventsDetailsData(props.match.params);
     console.log(response)
    setEventDetailsData(response.event_details)
    setEventDetailsData(response.eventDetailsByUrl);
    SetEventAllDates(response.eventDetailsByUrl.dates);
     console.log(response.eventDetailsByUrl.dates);
  };

  
console.log(eventDetailsData.dates);

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
    trigger,
  } = useForm();

  const onSubmit = async (data) => {
    const { email, property_id } = propertyData;
    const finalData = {
      ...data,
      property_id,
      email,
    };
    console.log("this is response", finalData);
    const response = await getEventContactDetailsFormData(finalData);
    console.log(response.data);
    // console.log("my data");
  };

  function onChange(value) {
    setCaptchaData(value);
  }

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
      <div className="EventPage">
        {eventDetailsData.map((item) => (
          
          <div className="container bggrey mb-3 mt-0 mt-md-2">
            <div className="row">
              <div className="col-md-12 col-lg-12 col-xl-12 col-12 px-0">
                <Carousel>
                  <Carousel.Item>
                    <div className="eventDetImg">
                      <img
                      className="w-100"
                         src={item.event_images[0].img_name}
                        alt="Card image cap"
                        onError={(e) => {
                          e.currentTarget.src =
                      DefaultImg
                        } } />
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className="eventDetImg">
                      <img
                         src={item.event_images[0].img_name[2]}
                        alt="Card image cap"
                        onError={e => {
                          e.currentTarget.src =
                            'https://beta.laquintasantacruz.com/gallery-images/default-vector-bedroom-image.jpg'
                        }}
                        className="W100 card-img-top"
                      />
                    </div>
                  </Carousel.Item>
                </Carousel>
              </div>
              <div className="col-md-12 col-12 col-lg-12 col-xl-12">
                <div className="col-lg-12 col-sm-12 text-center P0 MT30">
                  <h1 className="event-detail-title text-center my-4" id="info">
                    {item.event_name}
                  </h1>
                </div>
                <div className="eventInfo row mx-3 mx-md-3 mx-lg-5 mx-xl-5">
                  <div className="col-md-6 col-xl-4 col-lg-6 my-2 col-12 px-0">
                  <div className="card d-block p-2 eventRes">
                   Event Location:
                    <span className="eventRes text-capitalize">{item.location}</span>
                   </div>
                  </div>
                  {/* <h5 className="text-left">
                    Event dates:
                  </h5> */}
                  
                    {/* <li>
                      <span className='eventRes'>{item.eventdate}</span>
                     </li> */}
                     <div className="col-md-6 col-xl-4 col-lg-6 my-2 col-12 px-0">
                  <div className="card d-block p-2 eventRes">
                    Event Time:
                    <span className="eventRes">{item.event_time}</span>
                    </div>
                  </div>
                  <div className="col-md-6 col-xl-4 col-lg-6 my-2 col-12 px-0">
                  <div className="card d-block p-2 eventRes">
                    Event Price:
                    <span className="eventRes"> ${item.price}</span>
                    {/* {item.event_images[0].img_name[2]} */}
                   {/* {console.log("all dates", item.dates)} */}



               
                    </div>
                  </div>
                 <div className="col-md-6 col-xl-4 col-lg-6 my-2 col-12 px-0">
                  <div className="card d-block p-2 eventRes">
                    Event Starts Date :
                    <span className="eventRes">  {ReactHtmlParser(moment(item.start_date).format('MMMM D,YYYY'))}</span>
                    <span className="eventRes">{console.log(item.start_date)}</span>
                    </div>
                  </div>
                  <div className="col-md-6 col-xl-4 col-lg-6 my-2 col-12 px-0">
                  <div className="card d-block p-2 eventRes">
                    Event Ends Date:
                    {/* <span className="eventRes">{item.end_date}</span> */}
                    <span className="eventRes">  {ReactHtmlParser(moment(item.end_date).format('MMMM D,YYYY'))}</span>
                    </div>
                  </div>
              
               
                  <p className="evnt-long-des mt-4 px-0 px-md-3">
                    
                    {ReactHtmlParser(item.long_desc)}
                  </p>
                </div>
              </div>
              <div className="col-12 text-center mt-4">
                <h3 className="text-center form-title event-detail-title">
                  Contact Us About This Event
                </h3>
                <p className="text-center form-title fs-16 px-4">
                  Please provide us your contact details and inquiry below and a
                  member of our staff will reply to your message in a timely
                  manner.
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                  <div className="border rounded my-3 py-4 innerBox">
                    <div className="row lnf-form mx-1 mx-md-3 mx-lg-5 mx-xl-5 px-lg-5 px-xl-5 px-md-3">
                      <div className="col-12 col-md-6 px-md-4 py-4 inputAni">
                        <input
                          className="ltr-border-none"
                          type="text"
                          placeholder="First Name*"
                          className={`form-control ltr-none bdr-left-rght-radius  ${
                            errors.firstname && "invalid"
                          }`}
                          {...register("firstname", {
                            required: "Please enter your first name.",
                          })}
                          onKeyUp={() => {
                            trigger("firstname");
                          }}
                        />
                        <label className="custLabel">First Name</label>
                        {errors.firstname && (
                          <small className="text-danger">
                            {errors.firstname.message}
                          </small>
                        )}
                      </div>
                      <div className="col-12 col-md-6 px-md-4 py-4 inputAni">
                        <input
                          className="ltr-border-none"
                          type="text"
                          placeholder="Last Name*"
                          className={`form-control ltr-none bdr-left-rght-radius  ${
                            errors.lastname && "invalid"
                          }`}
                          {...register("lastname", {
                            required: "Please enter your last name.",
                          })}
                          onKeyUp={() => {
                            trigger("lastname");
                          }}
                        />
                        <label className="custLabel">Last Name</label>
                        {errors.lastname && (
                          <small className="text-danger">
                            {errors.lastname.message}
                          </small>
                        )}
                      </div>
                      
                      <div className="col-12 col-md-6 px-md-4 py-4 inputAni">
                        <input
                          className="ltr-border-none"
                          type="phone"
                          maxlength="18"
                          placeholder="Phone Number*"
                          className={`form-control ltr-none bdr-left-rght-radius  ${
                            errors.phone && "invalid"
                          }`}
                          {...register("phone", {
                            required: " Please enter a phone number.",
                          })}
                          onKeyUp={() => {
                            trigger("phone");
                          }}
                        />
                        <label className="custLabel">Phone Number</label>
                        {errors.phone && (
                          <small className="text-danger">
                            {errors.phone.message}
                          </small>
                        )}
                      </div>
                      <div className="col-12 col-md-6 px-md-4 py-4 inputAni">
                        <input
                          className="ltr-border-none"
                          type="email"
                          placeholder="Enter your Email*"
                          className={`form-control ltr-none bdr-left-rght-radius  ${
                            errors.email && "invalid"
                          }`}
                          {...register("email", {
                            required: "Please enter your email address.",
                          })}
                          onKeyUp={() => {
                            trigger("email");
                          }}
                        />
                        <label className="custLabel">Enter your Email</label>
                        {errors.email && (
                          <small className="text-danger">
                            {errors.email.message}
                          </small>
                        )}
                      </div>
                      <div className="lnf-form2 col-12">
                        <div className="px-md-4 px-3 py-4 inputAni">
                          <textarea
                          {...register('comments', {})}
                              // required: 'comments is Required',
                              onKeyUp={() => {
                                trigger("comments");
                              }}
                            
                            className="ltr-border-none"
                            type="text"
                            maxlength="1000"
                            onChange={(e) =>
                              setCount(
                                1000 - e.target.value.length <= 0 ? (
                                  <span className="text-danger">
                                    You have reached the character limit for
                                    this field. 0
                                  </span>
                                ) : (
                                  1000 - e.target.value.length
                                )
                              )
                            }
                            placeholder="Where was your item first"
                            className={`form-control ltr-none bdr-left-rght-radius  ${
                              errors.comments && "invalid"
                            }`}
                            
                           
                          ></textarea>
                          <label className="custLabel">
                            Where was your item first ?
                          </label>
                          {errors.comments && (
                            <small className="text-danger">
                              {errors.comments.message}
                            </small>
                          )}
                          <span className="char-count">
                            {count} Characters left
                          </span>
                        </div>
                      </div>

                      <div id="recaptcha" className="d-flex mt-3  g-recaptcha">
                          <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey="6LdX5ggTAAAAAMEZInpJvEYoocLlK61Fg5qcdPZs"
                            onChange={onChange}
                          />
                      </div>

                      <div className="row col-12 px-0 mt-4">
                        <div className="col-12 col-md-6 my-4 px-0 text-center">
                          <button
                            type="submit"
                            className="home-readmore-btn welcome-btn btn-style px-4"
                            title="Submit"
                          >
                            SUBMIT
                          </button>
                        </div>

                        <div className="col-12 col-md-6 text-center my-4 px-0" style={{alignSelf: "center"}}>
                          <Link
                            to={`/events`}
                            className="c-pointer back-custm-btn mt-3"
                            title="Back"
                          >
                            BACK
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            {/* <div>
            <div "col-lg-12 text-center my-5">
              <a href="http://google.com" target="blank" className="btns btn-green">
                Event Name
              </a>
            </div>
            <div className="col-lg-12 text-center my-5">
              <Link to={`/events`} className="btns btn-green">
                BACK
              </Link>
            </div>
          </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
