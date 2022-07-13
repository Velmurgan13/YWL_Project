import React, { useEffect, useState } from "react";
import ConnectUs from "../../InnerPages/ContactUs/ConnectUs";
import { useForm } from "react-hook-form";
import "../../Yosemitewestgate/style/common.css";
import { Link } from "react-router-dom";
import {
  getSeoDescriptionData,
  getContactform,
} from "../../../DataLayer/datalayerUtilities";
// import { useHistory } from 'react-router-dom'

import { useRecoilValue } from "recoil";
import {
  propertyDataSelector,
  seoThemeDetails,
  themeSelector,
} from "../../../Recoil/themeModule";
import "./contact.scss";
import "./index.css";
//common images
import BannerContainer from "../BannerComponent/BannerContainer";
import ReCAPTCHA from "react-google-recaptcha";

const styles = {
  width: '100px',
  height: '100px',
};

const ContactComponent = (props) => {
  const themeSelectorData = useRecoilValue(themeSelector);
  // console.log(themeSelectorData);
  const newcaptchakey = themeSelectorData.noCaptchaSiteKey;
  // console.log("capcha data here Recoil" , newcaptchakey);
  const propertyData = useRecoilValue(propertyDataSelector);
  console.log(propertyData);
  const { contactus: seoId } = useRecoilValue(seoThemeDetails);
  const [seoData, setPropertySeodata] = useState([]);
  const [captcha, setCaptchaData] = useState([]);
  const [count1, setCount1] = React.useState(2000);
  const [count2, setCount2] = React.useState(150);
  const recaptchaRef = React.createRef();
  const [alertmsg, setAlertmsg] = useState([]);
  const [showGoTop, setShowGoTop] = useState(false)
  const [showMsg, setShowMsg] = React.useState(true)


  const handleVisibleButton = () => {
    setShowGoTop(window.pageYOffset > 50)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleVisibleButton)

  }, [])


//  const handleKeyDown = (e) => {
//     e.target.style.height = 'inherit';
//     e.target.style.height = `${e.target.scrollHeight}px`; 
//   }



  useEffect(() => {
    fetchSeoProperties();
 
  }, []);

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData(seoId);
    console.log(response);
    setPropertySeodata(response.data);
    console.log(response.data);
  };


  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  function onChange(value) {
    setCaptchaData(value);
  }

  const onSubmit = async (data) => {
    const { email, primary_phone_no, property_name } = props.propertyData;

    const finalData = {
      ...data,
      email,
      primary_phone_no,
      property_name,
      captcha
    }

    const response = await getContactform(finalData);
    console.log("MEssage", response);
    setAlertmsg(response.data);

    if (response.data === "success") {
      console.log(response.data);
      document.getElementById("successmsg").innerHTML =
        "Your message has been sent successfully! A member of our customer service team will contact you shortly.";
      document.getElementById('successmsg').style.backgroundColor = 'rgb(96 158 111)';
      document.getElementById('successmsg').style.padding = '10px 30px';
      document.getElementById('successmsg').style.display = 'inline-block';
      document.getElementById('successmsg').style.justifyContent = 'center';
      document.getElementById('successmsg').style.borderRadius = '5px';
      // const element = document.querySelector("successmsg");
      // element.scrollIntoView({ behavior: "smooth" });
      document.body.scrollTop = document.documentElement.scrollTop = 500;
      document.getElementById("myForm").reset();
      // hideLoadingDiv();
    }
    
      else if (response.data === "Captcha ERROR") {
        document.getElementById("successmsg").innerHTML =
          "";
        document.getElementById('successmsg').style.backgroundColor = '#f30000';
        document.getElementById('successmsg').style.padding = '10px 30px';
        document.getElementById('successmsg').style.display = 'inline-block';
        document.getElementById('successmsg').style.justifyContent = 'center';
        document.getElementById('successmsg').style.borderRadius = '5px';
        // document.getElementById('successmsg').style.width = '50%';
        // const element = document.getElementById("successmsg");
        // element.scrollIntoView({ behavior: "smooth" });
        document.body.scrollTop = document.documentElement.scrollTop = 500;

    } else if (response.data === "Invalid") {
      document.getElementById("successmsg").innerHTML =
        "Sorry, you have entered an invalid email address.";
    }

    setTimeout(() => {
      const successmsg = document.getElementById('successmsg');
      successmsg.style.display = 'none';
    }, 4000);

  };

  // console.log(alertmsg);
  return (
    <>
      <div>
        <BannerContainer seoData={seoData} />
        <div className="container Contact mt-3 mt-md-4 px-md-0">
          <div className="mb-3 pt-3 pt-md-3 pb-3  px-1 px-md-0 contactDetails custom-shadow">
            <div className="text-center">
              <div id="successmsg" className="msg-display text-white mx-auto "></div>
            </div>
            <div className="px-md-4 px-0 round pb-3">
              <p className="contact-description text-center my-2 my-md-3">
                Please enter the message below that you would like to send to our hotel.
                <br />  A guest service agent will reply to your message in a timely manner.{" "}
              </p>{" "}
              <div className="px-md-0 px-0">
                <form name="myForm" id="myForm" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group col-xl-9 col-lg-10 col-md-11 mx-auto py-3">
                    <div className="floating-label-group inputAni">
                      <input
                        className="ltr-border-none"
                        type="text"
                        maxlength="50"
                        placeholder="First Name *"
                        className={`form-control ltr-none bdr-left-rght-radius ${errors.firstname && "invalid"
                          }`}
                        {...register("firstname", {
                          required: "Please enter your first name.",
                          pattern: {
                            value: /[a-zåäö ]/i,
                            message: "Please enter alphabets only",
                          },
                        },
                        )}

                        onKeyUp={() => {
                          trigger("firstname");
                        }}
                      />
                      <label className="custLabel">First Name</label>
                    </div>
                    {/* {errors.firstname && (
                      <small className="text-danger">
                        {" "}
                        {errors.firstname.message}{" "}
                      </small>
                    )}{" "} */}
                  </div>




                  <div className="form-group col-xl-9 col-lg-10 col-md-11 mx-auto py-3">
                    <div className="floating-label-group inputAni">
                      <input
                        maxlength="50"
                        // className="form-control ltr-none bdr-left-rght-radius"
                        type="text"
                        placeholder="Last Name *"
                        className={`bdr-left-rght-radius form-control  ltr-none ${errors.lastname && "invalid"
                          }`}
                        {...register("lastname", {
                          required: "Please enter your last name.",
                        })}
                        onKeyUp={() => {
                          trigger("lastname");
                        }}
                      />
                      <label className="custLabel">Last Name</label>
                    </div>
                    {errors.lastname && (
                      <small className="text-danger">
                        {errors.lastname.message}
                      </small>
                    )}
                  </div>
                  <div className="form-group col-xl-9 col-lg-10 col-md-11 mx-auto py-3">
                    <div className="floating-label-group inputAni">
                      <input
                        placeholder="Email *"
                        type="email"
                        className={`form-control ltr-none bdr-left-rght-radius ${errors.email && "invalid"
                          }`}
                        {...register("email1", {
                          required: "Please enter email address.",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid Email address",
                          },
                        })}
                        onKeyUp={() => {
                          trigger("email1");
                        }}
                      />

                      <label className="custLabel">Email</label>
                    </div>
                    {errors.email1 && (
                      <small className="text-danger pt-4 mt-4">
                        {errors.email1.message}
                      </small>
                    )}
                  </div>
                  <div className="form-group col-xl-9 col-lg-10 col-md-11 mx-auto py-3">
                    <div className="floating-label-group inputAni">
                      <input
                        placeholder="Phone *"
                        type="text"
                        maxlength="18"
                        className={`form-control ltr-none bdr-left-rght-radius ${errors.phone && "invalid"
                          }`}
                        {...register("phone", {
                          required: "Please enter a phone number.",
                          pattern: {
                            // value:
                            //   /^\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/,
                            message: "Invalid phone no",
                          },
                        })}
                        onKeyUp={() => {
                          trigger("phone");
                        }}
                      />

                      <label className="custLabel">Phone</label>
                    </div>
                    {errors.phone && (
                      <small className="text-danger">
                        {errors.phone.message}
                      </small>
                    )}
                  </div>
         
                  <div className="form-group col-xl-9 col-lg-10 col-md-11 mx-auto py-3 contactFrm">
                    <div className="floating-label-group inputAni">
                      <textarea 
                      onKeyDown={handleKeyDown}
                        maxlength="150"
                        type="text"
                        placeholder="Subject *"
                        className={`form-control ltr-none bdr-left-rght-radius textbox ${errors.subject && "invalid"
                          }`}
                        {...register("subject", {
                          required: "Please enter a subject.",
                        })}
                        onKeyUp={(e) => {
                          trigger("subject");
                          setCount2(
                            150 - e.target.value.length <= 0 ? (
                              <span className="text-danger">
                                {/* You have reached the character limit for this
                                field.  */}

                                0
                              </span>
                            ) : (
                              150 - e.target.value.length
                            )
                          )
                        }}
                      ></textarea>
                      <label className="custLabel">Subject</label>
                    </div>
                    {errors.subject && (
                      <small className="text-danger">
                        {errors.subject.message}
                      </small>
                    )}
                    <span className="char-count float-right mr-md-4 mt-1">
                      {count2} Characters left
                    </span>
                  </div>


                  <div className="form-group col-xl-9 col-lg-10 col-md-11 mx-auto py-3 contactFrm">
                    <div className="floating-label-group inputAni">
                      <textarea
                        onKeyDown={handleKeyDown}
                        maxlength="2000"
                        type="text"
                        placeholder="Message *"
                        className={`form-control ltr-none bdr-left-rght-radius textbox ${errors.message && "invalid"
                          }`}
                        {...register("message", {
                          required: "Please enter a message.",
                        })}
                        onKeyUp={(e) => {
                          trigger("message");
                          setCount1(
                            2000 - e.target.value.length <= 0 ? (
                              <span className="text-danger">
                        
                                0
                              </span>
                            ) : (
                              2000 - e.target.value.length
                            )
                          )
                        }}
                      ></textarea>
                      <label className="custLabel">Message</label>
                    </div>
                    {errors.message && (
                      <small className="text-danger">
                        {errors.message.message}
                      </small>
                    )}
                    <span className="char-count float-right mr-md-4 mt-1">
                      {count1} Characters left
                    </span>
                  </div>



   
                  {/* <div className="form-group col-xl-9 col-lg-10 col-md-11 mx-auto py-3 contactFrm">
                    <div className="floating-label-group inputAni">
                      <textarea
                        {...register("message", {})}
                        onKeyUp={() => {
                          trigger("message");
                        }}
                        type="text"
                        placeholder="Message"
                        maxlength="2000"
                        onChange={(e) =>
                          setCount1(
                            2000 - e.target.value.length <= 0 ? (
                              <span className="text-danger">
                                0
                              </span>
                            ) : (
                              2000 - e.target.value.length
                            )
                          )
                        }
                        className={`form-control ltr-none bdr-left-rght-radius textbox ${errors.message && "invalid"
                          }`}
                      ></textarea>
                      <label className="custLabel">Message</label>
                    </div>
                    {errors.message && (
                      <small className="text-danger">
                        {errors.message.message}
                      </small>
                    )}
                    <span className="char-count float-right ">
                      {count1} Characters left
                    </span>
                  </div> */}





                  <div id="recaptcha" className="d-flex mt-5 g-recaptcha">
                    <div>
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        // sitekey={props.noCaptchaSiteKey}
                        sitekey={newcaptchakey}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                  <div className="text-center pt-md-3 pt-4 contactBtn">
                    {/* <div ref={div1} style={{ background: 'yellowgreen', ...styles }}> */}
                    <div className={showGoTop ? '' : styles.goTopHidden} >
                      <button
                        type='submit'
                        className="home-readmore-btn welcome-btn btn-style mt-3 px-4"
                        value="Submit"
                        // value="Clear Fields"
                        title="Submit"
                      > SUBMIT</button>
                    </div>{" "}
                  </div>

                </form>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div>
            <ConnectUs propertyData={props.propertyData} />{" "}
          </div>{" "}
          <div className="text-center mb-5 my-md-5">
            <h2 className="btn-lnf $primary-color my-3 my-md-4"> LOST SOMETHING?</h2>{" "}
            <div className="btn-desc"> Click Here And Let Us Know </div>{" "}
            <Link to="/lost-found">
              <input
                type="submit"
                className="home-readmore-btn welcome-btn mt-md-4 btn-style mt-3 mb-4"
                value="LOST & FOUND"
                title="Lost & Found"
              />
            </Link>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    </>
  );
};




export default ContactComponent;
