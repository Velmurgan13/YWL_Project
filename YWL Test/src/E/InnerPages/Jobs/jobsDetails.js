import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  getSeoDescriptionData,
  getPropJobDetailsData,
  getPropJobFormPostData,
} from "../../../DataLayer/datalayerUtilities";
import ReactHtmlParser from "react-html-parser";
// import { Link } from 'react-router-dom'
import { Form, FormGroup, Label, Input } from "reactstrap";
import {
  JobDetailsBlock,
  PersonalInfoDiv,
  MbrSectionTitle,
} from "./styledIndex";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdAttach } from "react-icons/io";
import { AiOutlineFieldTime } from "react-icons/ai";
import { AiOutlineDollar } from "react-icons/ai";
import { RiUserStarFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";

import {
  propertyDataSelector,
  seoThemeDetails,
} from "../../../Recoil/themeModule";
//common banner component
import BannerContainer from "../BannerComponent/BannerContainer";
import "../../InnerPages/Jobs/index.css";
import ReCAPTCHA from "react-google-recaptcha";
import moneyIcon from "../../Yosemitewestgate/assets/Icons/money.svg";
//import ReCAPTCHA from "react-google-recaptcha";

const JobsDetailsComponent = (props) => {
  const fileRef = useRef();
  //console.log(props.match.params)
  const propertyData = useRecoilValue(propertyDataSelector);
  // console.log(propertyData)
  const [toggleState, setToggleState] = useState(1);
  const [clicked, setClicked] = useState(false);
  const [count1, setCount1] = useState(500);
  const [seoData, setPropertySeodata] = useState([]);
  const [jobDetailsData, setPropJobDetailsdata] = useState([]);
  const [jobCountryData, setPropJobCountrydata] = useState([]);
  const [captcha, setCaptchaData] = useState([]);
  const recaptchaRef = React.createRef();

  useEffect(() => {
    fetchSeoProperties();
    fetchPropJobDetails();
  }, []);

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData("23");
    setPropertySeodata(response.data);
  };

  const fetchPropJobDetails = async () => {
    // console.log(props.match.params);
    const response = await getPropJobDetailsData(props.match.params);
    // console.log(response);
    setPropJobDetailsdata(response.data.job_details);
    setPropJobCountrydata(response.data.countries);
  };

  const handleChange = (e) => {
    const [file] = e.target.files;
    // console.log(file);
  };

  const toggle = (index) => {
    if (clicked === index) {
      //if clicked question is already active, then close it
      return setClicked(null);
    }
    setClicked(index);
  };

  const toggleTab = (index) => {
    setToggleState(index);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
    trigger,
  } = useForm();

  function onChange(value) {
    setCaptchaData(value);
  }

  const onSubmit = async (data) => {
    // console.log("this is job details data", data);
    // alert("hrbvbhkvbgkb")
    const jid = props.match.params.jid;
    const jtitle = props.match.params.jtitle;
    //const paramsData = props.match.params;
    //console.log(paramsData);
    const {
      email,
      reservation_phone_no,
      property_name,
    } = propertyData;
    const finalData = {
      ...data,
      jid,
      jtitle,
      email,
      reservation_phone_no,
      property_name,
      captcha,
    };

    console.log("this is finalData", finalData);
    // console.log("this iss final data", finalData);
    const response = await getPropJobFormPostData(finalData);
    // console.log(response);
    //reset();
  };

  //  console.log(jobDetailsData);
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
      <div className="container mt-4">
        {Object.values(jobDetailsData).map((item) => {
          return (
            <div> 
              <p className="text-left jobs_sun-text pl-5"> Job Details </p>
              <JobDetailsBlock className="job_deatils_block block1">
                <p className="text-left">
                  <strong> Job Title: </strong>
                  <span> {ReactHtmlParser(item["jtitle"])} </span>
                </p>
                <p className="text-left">
                  <strong> Job Id: </strong>
                  <span> {ReactHtmlParser(item["jid"])} </span>
                </p>
                <p className="text-left">
                  <strong> Department: </strong>
                  <span> {ReactHtmlParser(item["jdname"])} </span>
                </p>
              </JobDetailsBlock>
              <JobDetailsBlock className="job_deatils_block">
                <div className="row">
                  <div className="col-6 col-md-3">
                    <div className="wrap">
                      <div className="ico-wrap">
                        <AiOutlineDollar
                          className="mb-1 p-2 p-md-0 jobs-icon-color"
                          size="80"
                          title="Offered Salary"
                        />
                      </div>
                      <div className="text-wrap vcenter">
                        <MbrSectionTitle> Offered Salary </MbrSectionTitle>
                        <span className="mbr-text d-block">
                          $ {ReactHtmlParser(item["js_range"])}
                          LPA / {ReactHtmlParser(item["js_calculate"])}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="wrap">
                      <div className="ico-wrap">
                        <IoLocationSharp
                          className="mb-1 p-2 p-md-0 jobs-icon-color"
                          size="80"
                          title="Job Location"
                        />
                      </div>
                      <div className="text-wrap vcenter">
                        <MbrSectionTitle> Job Location </MbrSectionTitle>
                        <span className="mbr-text d-block">
                          {ReactHtmlParser(item["jcity"])},
                          {ReactHtmlParser(item["jstate"])},
                          {ReactHtmlParser(item["jcountry"])}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="wrap">
                      <div className="ico-wrap">
                        <AiOutlineFieldTime
                          className="mb-1 p-2 p-md-0 jobs-icon-color"
                          size="80"
                          title="Job Type"
                        />
                      </div>
                      <div className="text-wrap vcenter">
                        <MbrSectionTitle> Job Type </MbrSectionTitle>
                        <span className="mbr-text d-block">
                          {ReactHtmlParser(item["jtype"])}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="wrap">
                      <div className="ico-wrap">
                        <RiUserStarFill
                          className="mb-1 p-2 p-md-0 jobs-icon-color"
                          size="80"
                          title="Experience"
                        />
                      </div>
                      <div className="text-wrap vcenter">
                        <MbrSectionTitle> Experience </MbrSectionTitle>
                        <span className="mbr-text d-block">
                          {ReactHtmlParser(item["jexp_from"])} -
                          {ReactHtmlParser(item["jexp_to"])}
                          Years
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </JobDetailsBlock>
              <p className="text-left jobs_sun-text pl-5">Job Description</p>
              <JobDetailsBlock className="job_deatils_block">
                <div className="text-justify p-0">
                  <p> {ReactHtmlParser(item["jdescription"])} </p>
                </div>
              </JobDetailsBlock>
              <p className="text-left jobs_sun-text pl-5"> Key Skills </p>
              <JobDetailsBlock className="job_deatils_block">
                <div className="text-justify p-0">
                  <p> {ReactHtmlParser(item["jskills"])} </p>
                </div>
              </JobDetailsBlock>
              <p className="text-left jobs_sun-text pl-5"> Desired Profile </p>
              <JobDetailsBlock className="job_deatils_block">
                <div className="text-justify p-0">
                  <p> {ReactHtmlParser(item["jd_profile"])} </p>
                </div>
              </JobDetailsBlock>
              <p className="text-left jobs_sun-text pl-5">
                Benefits of working with Yosemite Southgate Hotel and Suitess:
              </p>
              <JobDetailsBlock className="job_deatils_block">
                <div className="text-justify p-0">
                  <p> {ReactHtmlParser(item["jbenefits"])} </p>
                </div>
              </JobDetailsBlock>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center jobs_sun-text F28 text-strong text-uppercase MT20 form_apply_jobs_title">
                JOB APPLICATION FOR {ReactHtmlParser(item["jtitle"])}
                <div className="current_job_line"> </div>
              </div>
            </div>
          );
        })}

        <div className="">
          <p className="jobs_sun-text1 mt-4">Personal Information </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container px-1 px-md-0">
              <div className="personal-info-div rounded my-5">
                <div className="shipping-details row mx-0">
                  <div className="col-12 col-md-6 px-3 pt-3 pb-4">
                    <div className="inputAni px-3 px-md-3">
                      <input
                        placeholder="First Name*"
                        type="text"
                        className={`form-control ltr-none bdr-left-rght-radius ${
                          errors.first_name && "invalid"
                        }`}
                        {...register("first_name", {
                          required: "First name is required",
                        })}
                        onKeyUp={() => {
                          trigger("first_name");
                        }}
                      />
                      <label className="custLabel">First Name </label>
                      {errors.first_name && (
                        <small className="text-danger">
                          {errors.first_name.message}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 px-3 pt-4 pb-5 lastNameDetails">
                    <div className="inputAni px-3 px-md-3">
                      <input
                        placeholder="Last Name*"
                        type="text"
                        className={`form-control ltr-none bdr-left-rght-radius ${
                          errors.last_name && "invalid"
                        }`}
                        {...register("last_name", {
                          required: "Last name is required",
                        })}
                        onKeyUp={() => {
                          trigger("last_name");
                        }}
                      />
                      <label className="custLabel">Last Name </label>
                      {errors.last_name && (
                        <small className="text-danger">
                          {errors.last_name.message}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 pb-5">
                    <div className="inputAni px-3 px-md-3">
                      <input
                        placeholder="Email Address*"
                        type="text"
                        className={`form-control ltr-none bdr-left-rght-radius ${
                          errors.email && "invalid"
                        }`}
                        {...register("email1", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid Email address",
                          },
                        })}
                        onKeyUp={() => {
                          trigger("email1");
                        }}
                      />
                      <label className="custLabel">Email Address </label>
                      {errors.email1 && (
                        <small className="text-danger">
                          {errors.email1.message}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 pb-5">
                    <div className="inputAni px-3 px-md-3">
                      <input
                        placeholder="Phone Number*"
                        type="text"
                        className={`form-control ltr-none bdr-left-rght-radius ${
                          errors.phone && "invalid"
                        }`}
                        {...register("phone", {
                          required: "Phone is required",
                        })}
                        onKeyUp={() => {
                          trigger("phone");
                        }}
                      />
                      <label className="custLabel">Phone Number </label>
                      {errors.phone && (
                        <small className="text-danger">
                          {errors.phone.message}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-12 px-3 pb-5">
                    <div className="inputAni px-3 px-md-3">
                      <input
                        placeholder="Address*"
                        type="text"
                        className={`form-control ltr-none bdr-left-rght-radius ${
                          errors.address && "invalid"
                        }`}
                        {...register("address", {
                          required: "Address is required",
                        })}
                        onKeyUp={() => {
                          trigger("address");
                        }}
                      />
                      <label className="custLabel">Address </label>
                      {errors.address && (
                        <small className="text-danger">
                          {errors.address.message}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="row px-3 px-md-3">
                      <div className="col-12 col-md-4 pb-5 selectCountry1">
                        <div className="input-form2">
                          <Label
                            className="input-label ml-2 countryField"
                            for="exampleSelect"
                          >
                            Your Country
                          </Label>
                          <select
                            className="ltr-none selectCountry"
                            type="select"
                            id="job_country"
                            required="pleas"
                            className={`form-control ltr-none bdr-left-rght-radius ${
                              errors.job_country && "invalid"
                            }`}
                            {...register("job_country", {
                              required: "Country is required",
                            })}
                            onKeyUp={() => {
                              trigger("job_country");
                            }}
                          >
                            {Object.values(jobCountryData).map((item) => {
                              // console.log(jobCountryData.item);
                              return (
                                <option
                                  key={ReactHtmlParser(item)}
                                  value={ReactHtmlParser(item)}
                                >
                                  {ReactHtmlParser(item)}
                                </option>
                              );
                            })}
                            {errors.job_country && (
                              <small className="text-danger">
                                {errors.job_country.message}
                              </small>
                            )}
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-md-4 pb-4 addDetails">
                        <div className="input-form2 stateForm">
                          <div className="inputAni px-3">
                            <input
                              placeholder="State*"
                              type="text"
                              className={`form-control ltr-none bdr-left-rght-radius ${
                                errors.job_state && "invalid"
                              }`}
                              {...register("job_state", {
                                required: "State is required",
                              })}
                              onKeyUp={() => {
                                trigger("job_state");
                              }}
                            />
                            <label className="custLabel">State </label>
                            {errors.job_state && (
                              <small className="text-danger">
                                {errors.job_state.message}
                              </small>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-4 pb-4 addDetails">
                        <div className="stateForm">
                          <div className="inputAni px-3">
                            <input
                              placeholder="City*"
                              type="text"
                              className={`form-control ltr-none bdr-left-rght-radius ${
                                errors.job_city && "invalid"
                              }`}
                              {...register("job_city", {
                                required: "City is required",
                              })}
                              onKeyUp={() => {
                                trigger("job_city");
                              }}
                            />
                            <label className="custLabel">City </label>
                            {errors.job_city && (
                              <small className="text-danger">
                                {errors.job_city.message}
                              </small>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="row ">
                      <div className="col-12 col-md-6 px-4 px-md-3 pt-4 pb-5">
                        <div className="inputAni px-2">
                          <input
                            placeholder="Zip Code*"
                            type="text"
                            className={`form-control ltr-none bdr-left-rght-radius ${
                              errors.zipcode && "invalid"
                            }`}
                            {...register("zipcode", {
                              required: "Zipcode is required",
                            })}
                            onKeyUp={() => {
                              trigger("zipcode");
                            }}
                          />
                          <label className="custLabel">Zip Code </label>
                          {errors.zipcode && (
                            <small className="text-danger">
                              {errors.zipcode.message}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-12 col-md-6 px-md-3 pb-4">
                        <div className="input-form2 px-3">
                          <Label
                            className="input-label mb-0 countryField"
                            for="exampleSelect"
                          >
                            Where did you hear about this position ?
                          </Label>
                          <select
                            className="ltr-none bdr-left-rght-radius detailText px-3 px-md-5"
                            type="select"
                            name="select"
                            id="info_source"
                            required="please"
                            className={`form-control ltr-none bdr-left-rght-radius ${
                              errors.info_source && "invalid"
                            }`}
                            {...register("info_source", {
                              required: "State is required",
                            })}
                            onKeyUp={() => {
                              trigger("info_source");
                            }}
                          >
                            <option value=""> Select </option>
                            <option value="Craigslist"> Craigslist </option>
                            <option value="Job fair"> Job fair </option>
                            <option value="Linked In"> Linked In </option>
                            <option value="Facebook"> Facebook </option>
                            <option value="Indeed"> Indeed </option>
                            <option value="Search"> Search </option>
                            <option value="Referred by Friend">
                              Referred by Friend
                            </option>
                            <option value="Other"> Other </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 my-3 my-md-0 col-12 text-center">
                  <h4 className="jobs_sun-text2"> Attach your resume </h4>
                  
                  <div>
                    <button
                      className="home-readmore-btn welcome-btn btn-style mt-3 w-50 jobDetBtn"
                      title="Choose a file..."
                      type="button"
                      onClick={() => fileRef.current.click()}
                    >
                      CHOOSE A FILE... <IoMdAttach className="mb-1 mr-2" size="30" />
                    </button>{" "}
                    <input
                      ref={fileRef}
                      onChange={handleChange}
                      multiple={false}
                      type="file"
                      hidden
                    />
                  </div>
                </div>
                <div className="col-md-6 my-3 my-md-0 col-12 text-center">
                  <h4 className="jobs_sun-text2"> Attach your cover letter </h4>{" "}
                  <div>
                    <button
                      className="home-readmore-btn welcome-btn btn-style mt-3 w-50 jobDetBtn"
                      title="Choose a file..."
                      type="button"
                      onClick={() => fileRef.current.click()}
                    >
                       CHOOSE A FILE... <IoMdAttach className="mb-1 mr-2" size="30" />
                    </button>{" "}
                    <input
                      ref={fileRef}
                      onChange={handleChange}
                      multiple={false}
                      type="file"
                      hidden
                    />
                  </div>
                </div>
              </div>
              <div className="personal-info-div rounded my-5">
                <div className="col-12 form-group pb-4 px-md-4 mb-0 pt-3">
                  <div className="inputAni px-3 px-md-3 feedbackComment">
                    <textarea
                      placeholder="Please let us know if you have any comments, questions or special requests*"
                      className={`form-control px-2 ltr-none bdr-left-rght-radius ${
                        errors.message && "invalid"
                      }`}
                      {...register("note_message", {
                        required: "Message is Required",
                        // minLength: {
                        //   value: 0,
                        //   message: "Minimum Required length is 50",
                        // },
                        // maxLength: {
                        //   value: 250,
                        //   message: "Maximum allowed length is 250 ",
                        // },
                      })}
                      onChange={(e) =>
                        setCount1(
                          500 - e.target.value.length <= 0 ? (
                            <span className="text-danger">
                              You have reached the character limit for this field. 0
                            </span>
                          ) : (
                            500 - e.target.value.length
                          )
                        )
                      }
                      onKeyUp={() => {
                        trigger("note_message");
                      }}
                    ></textarea>
                    <label className="custLabel">
                      Please let us know if you have any comments, questions or
                      special requests
                    </label>
                    {errors.message && (
                      <small className="text-danger">
                        {errors.message.message}
                      </small>
                    )}
                    <span className="char-count">{count1} Characters left</span>
                  </div>
                </div>
              </div>

              <div className="px-md-4 px-1 pt-3 pb-0 d-flex checkBox">
                <input
                  type="checkbox"
                  id=""
                  name=""
                  value=""
                  className="checkBoxTick"
                />

                <h4 className="checkBoxContent">
                  I agree to Yosemite Southgate Hotel and Suites's &nbsp;
                  <a href="/terms-conditions" className="text-primary">
                    Terms & Conditions
                  </a> &nbsp; 
                  and would like to be contacted by the hotel in consideration
                  for this job opening.
                </h4>
              </div>
              <div id="recaptcha" className="d-flex mt-5 g-recaptcha">
                <div>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LdX5ggTAAAAAMEZInpJvEYoocLlK61Fg5qcdPZs"
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="text-center py-5">
                <button
                  className="welcome-btn btn-style px-5 mt-3 jobSubmitBtn"
                  type="submit"
                  title="Apply"
                >
                  APPLY
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default JobsDetailsComponent;
