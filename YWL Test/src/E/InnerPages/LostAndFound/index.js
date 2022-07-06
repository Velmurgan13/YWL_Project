import React, { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import { motion } from "framer-motion";
import {
  getSeoDescriptionData,
  getPropLostFoundData,
  getPropLostFoundDetailsData,
} from "../../../DataLayer/datalayerUtilities";
import moment from "moment";
import { CgCalendarDates } from "react-icons/cg";
import { PrimaryTitle } from "./styledIndex";
import DatePicker from "sassy-datepicker";
import "./index.scss";
import "../../Yosemitewestgate/style/common.css";
import { useForm } from "react-hook-form";
import { Form, FormGroup, Label, Input } from "reactstrap";
import BannerContainer from "../BannerComponent/BannerContainer";
import ReCAPTCHA from "react-google-recaptcha";

const LostAndFoundComponent = (props) => {
  const [toggleState, setToggleState] = useState(1);
  const [clicked, setClicked] = useState(false);
  const [seoData, setPropertySeodata] = useState([]);
  const [LostFoundData, setLostAndFoundData] = useState([]);
  const [captcha, setCaptchaData] = useState([]);
  const [count, setCount] = React.useState(1000);
  const [count1, setCount1] = React.useState(1000);
  const [startDate, setStartDate] = useState(new Date());
  const [startMinDate, setStartMinDate] = useState(new Date("2020-05-06"));
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [lost_Date, setlost_Date] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const recaptchaRef = React.createRef();

  var check_in = "";

  useEffect(() => {
    fetchSeoProperties();
    fetchLostAndFoundData();
  }, []);

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData("33");
    setPropertySeodata(response.data);
  };

  const fetchLostAndFoundData = async () => {
    const response = await getPropLostFoundData();
    setLostAndFoundData(response);
    // console.log('thiss is ', response)
  };

  const onClick = () => {
    setShowStartCalendar(!showStartCalendar);
  };

  const handleStartDateSelect = (date) => {
    check_in = date;
    document.getElementById("eventStartDate").value =
      moment(date).format("YYYY-MM-DD");
    setStartDate(moment(check_in).toDate());
    setShowStartCalendar(false);
    props.setDate(check_in);
  };
  const onChangeDate = (e) => {
    props.setDate(e.target.value);
  };
  const toggle = (index) => {
    if (clicked === index) {
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
    reset,

    trigger,
  } = useForm();

  function onChange(value) {
    setCaptchaData(value);
  }
  const onSubmit = async (data) => {
    const { property_name, email } = props.propertyData;
    const finalData = { ...data, property_name, lost_Date, email, captcha };
    console.log("this is lnf data", finalData);
    const response = await getPropLostFoundDetailsData(finalData);
    // console.log(response);
    //reset();
  };
  const Char = (e) => {};

  return (
    <section>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.4 }}
      >
        <BannerContainer seoData={seoData} />
      </motion.div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container px-3 px-md-0 lostNFound">
          <div className="text-center">
            <PrimaryTitle>LOST ITEM DETAILS</PrimaryTitle>
          </div>
          <div className="shadow border rounded pt-xs-20  my-3 py-4">
            <div className="row lnf-form lnfDate">
              <div className="col-6 px-md-3 px-2 pt-4 lnfMobView">
                <h3 className="lnf-title lnfD1">Lost Date</h3>
                <div
                  className="floating-label-group inputDiv d-flex PR"
                  onChange={onChangeDate}
                >
                  <input
                    // type="text"   
                    className="form-control checkincustometime ltr-none"
                    value={moment(startDate).format("YYYY-MM-DD")}
                    readOnly="readonly"
                    id="eventStartDate"
                    onClick={onClick}
                  />
                  <CgCalendarDates
                    size="30"
                    className="datepicker_icon_special  datePosition"
                    onClick={onClick}
                  />
                  {showStartCalendar ? (
                    <DatePicker
                      onChange={onChange}
                      selected={date}
                      minDate={startMinDate}
                      onChange={handleStartDateSelect}
                      format="dd-mm-yyyy"
                      className="openDatePosition"
                    />
                  ) : null}
                </div>
              </div>
              <div className="col-6 px-md-3 px-2 pt-4 lnfMobView">
                <div className="col-12 selectLostType">
                  <h3 className="lnf-title">Select types of Items</h3>
                  <FormGroup className="input-form2">
                    {/* <Label className="input-label" for="exampleSelect"></Label> */}
                    <select
                      className="ltr-border-none"
                      type="select"
                      placeholder="item Date"
                      className={`form-control ltr-none ${
                        errors.item && "invalid"
                      }`}
                      {...register("item", {
                        required: "Item is Required",
                      })}
                      onKeyUp={() => {
                        trigger("item");
                      }}
                    >
                      <option>Select Lost Item Type</option>
                      {Object.values(LostFoundData).map((item) => {
                        return (
                          <option value={ReactHtmlParser(item["id"])}>
                            {ReactHtmlParser(item["item"])}
                          </option>
                        );
                      })}
                    </select>
                  </FormGroup>
                </div>
              </div>
            </div>

            <div className="lnf-form">
              <div className="px-md-3 px-2 pt-4 inputAni text-left lostDetailDesc">
                <Input
                  placeholder="Where was your item first"
                  type="text"
                  maxlength="200"
                  {...register("last_seen", {
                    required: "",
                  })}
                  onChange={(e) =>
                    setCount1(
                      1000 - e.target.value.length <= 0 ? (
                        <span>
                          <span className="text-danger">
                            You have reached the character limit for this field.
                          </span>
                          <span className="text-black"> 0</span>
                        </span>
                      ) : (
                        1000 - e.target.value.length
                      )
                    )
                  }
                  className={`form-control ltr-none ${
                    errors.last_seen && "invalid"
                  }`}
                  onKeyUp={() => {
                    trigger("last_seen");
                  }}
                />
                <label className="custLabel">
                  Where was your item last seen?
                </label>

                {errors.last_seen && (
                  <small className="text-danger">
                    {errors.last_seen.message}
                  </small>
                )}
                <span className="char-count">{count1} Characters left </span>
              </div>

              <div className="px-md-3 px-2 pt-4 inputAni text-left lostDetailDesc">
                <Input
                  placeholder="Describe your Item"
                  type="text"
                  maxlength="200"
                  {...register("item_description", {
                    required: "",
                  })}
                  onChange={(e) =>
                    setCount(
                      1000 - e.target.value.length <= 0 ? (
                        <span>
                          <span className="text-danger">
                            You have reached the character limit for this field.
                          </span>
                          <span className="text-black"> 0</span>
                        </span>
                      ) : (
                        1000 - e.target.value.length
                      )
                    )
                  }
                  className={`form-control ltr-none ${
                    errors.item_description && "invalid"
                  }`}
                  onKeyUp={() => {
                    trigger("item_description");
                  }}
                />
                <label className="custLabel">Describe your Item</label>

                {errors.item_description && (
                  <small className="text-danger">
                    {errors.item_description.message}
                  </small>
                )}
                <span className="char-count">{count} Characters left </span>
              </div>
            </div>
          </div>
          <div className="text-center">
            {/* <h5 className='primary-title'>SHIPPING DETAILS</h5> */}
            <div className="text-center">
              <PrimaryTitle>SHIPPING DETAILS</PrimaryTitle>
            </div>
            <div className="shadow border rounded my-3 py-4">
              <div className="row lnf-form">
                <div className="col-6 px-md-3 py-4 inputAni text-left lnfMobView">
                  <input
                    className="ltr-border-none"
                    type="text"
                    placeholder="First Name*"
                    className={`form-control ltr-none ${
                      errors.first_name && "invalid"
                    }`}
                    {...register("first_name", {
                      required: "Please enter your firstname",
                    })}
                    onKeyUp={() => {
                      trigger("first_name");
                    }}
                  />
                  <label className="custLabel">First Name</label>
                  {errors.first_name && (
                    <small className="text-danger errMessage">
                      {errors.first_name.message}
                    </small>
                  )}
                </div>
                <div className="col-6 px-md-3 py-4 inputAni text-left lnfMobView">
                  <input
                    className="ltr-border-none"
                    type="text"
                    placeholder="Last Name*"
                    className={`form-control ltr-none ${
                      errors.lastname && "invalid"
                    }`}
                    {...register("last_name", {
                      required: "Please enter your lastname",
                    })}
                    onKeyUp={() => {
                      trigger("last_name");
                    }}
                  />
                  <label className="custLabel">Last Name</label>
                  {errors.last_name && (
                    <small className="text-danger errMessage">
                      {errors.last_name.message}
                    </small>
                  )}
                </div>
                <div className="col-6 px-md-3 py-4 inputAni text-left lnfMobView">
                  <input
                    className="ltr-border-none"
                    type="text"
                    placeholder="Street*"
                    className={`form-control ltr-none ${
                      errors.street_address && "invalid"
                    }`}
                    {...register("street_address", {
                      required: "Please enter street address",
                    })}
                    onKeyUp={() => {
                      trigger("street_address");
                    }}
                  />
                  <label className="custLabel">Street</label>
                  {errors.street_address && (
                    <small className="text-danger errMessage">
                      {errors.street_address.message}
                    </small>
                  )}
                </div>
                <div className="col-6 px-md-3 py-4 inputAni text-left lnfMobView">
                  <input
                    className="ltr-border-none"
                    type="text"
                    placeholder="City*"
                    className={`form-control ltr-none ${
                      errors.city && "invalid"
                    }`}
                    {...register("city", {
                      required: "Please enter city",
                    })}
                    onKeyUp={() => {
                      trigger("city");
                    }}
                  />
                  <label className="custLabel">City</label>
                  {errors.city && (
                    <small className="text-danger errMessage">{errors.city.message}</small>
                  )}
                </div>
                <div className="col-6 px-md-3 py-4 inputAni text-left lnfMobView">
                  <input
                    className="ltr-border-none"
                    type="text"
                    placeholder="State*"
                    className={`form-control ltr-none ${
                      errors.state && "invalid"
                    }`}
                    {...register("state", {
                      required: "Please enter state",
                    })}
                    onKeyUp={() => {
                      trigger("state");
                    }}
                  />
                  <label className="custLabel">State</label>
                  {errors.state && (
                    <small className="text-danger errMessage">
                      {errors.state.message}
                    </small>
                  )}
                </div>
                <div className="col-6 px-md-3 py-4 inputAni text-left lnfMobView">
                  <input
                    className="ltr-border-none"
                    type="text"
                    placeholder="Country*"
                    className={`form-control ltr-none ${
                      errors.country && "invalid"
                    }`}
                    {...register("country", {
                      required: "Please enter country",
                    })}
                    onKeyUp={() => {
                      trigger("country");
                    }}
                  />
                  <label className="custLabel">Country</label>
                  {errors.country && (
                    <small className="text-danger errMessage">
                      {errors.country.message}
                    </small>
                  )}
                </div>
                <div className="col-12 col-md-6 px-md-3 text-left  py-4 inputAni px-4">
                  <input
                    className="ltr-border-none"
                    type="number"
                    placeholder="Zipcode*"
                    className={`form-control ltr-none ${
                      errors.zip_code && "invalid"
                    }`}
                    {...register("zip_code", {
                      required: "Please enter zipcode",
                    })}
                    onKeyUp={() => {
                      trigger("zip_code");
                    }}
                  />
                  <label className="custLabel">Zipcode</label>
                  {errors.zip_code && (
                    <small className="text-danger errMessage">
                      {errors.zip_code.message}
                    </small>
                  )}
                </div>
              </div>
            </div>
            <div className="text-center">
              {/* <h5 className='primary-title'>CONTACT DETAILS</h5> */}
              <div className="text-center">
                <PrimaryTitle>CONTACT DETAILS</PrimaryTitle>
              </div>
              <div className="shadow border rounded my-3 py-4">
                <div className="lnf-form row">
                  <div className="col-6 py-4 inputAni text-left lnfMobView">
                    <input
                      className="ltr-border-none"
                      type="text"
                      placeholder="Guest Name*"
                      className={`form-control ltr-none ${
                        errors.guest_name && "invalid"
                      }`}
                      {...register("guest_name", {
                        required: "Please enter Guest name",
                      })}
                      onKeyUp={() => {
                        trigger("guest_name");
                      }}
                    />
                    <label className="custLabel">Guest Name</label>
                    {errors.guest_name && (
                      <small className="text-danger errMessage">
                        {errors.guest_name.message}
                      </small>
                    )}
                  </div>
                  <div className="col-6 py-4 inputAni text-left lnfMobView">
                    <input
                      className="ltr-border-none"
                      type="text"
                      placeholder="Reservation Id*"
                      className={`form-control ltr-none ${
                        errors.reservation && "invalid"
                      }`}
                      {...register("reservation", {
                        required: "Please enter your Reservation Id",
                      })}
                      onKeyUp={() => {
                        trigger("reservation");
                      }}
                    />

                    <label className="custLabel">Reservation Id</label>
                    {errors.reservation && (
                      <small className="text-danger errMessage">
                        {errors.reservation.message}
                      </small>
                    )}
                  </div>
                  <div className="col-6 py-4 inputAni text-left lnfMobView">
                    <input
                      className="ltr-border-none"
                      type="text"
                      placeholder="Room No*"
                      className={`form-control ltr-none ${
                        errors.room && "invalid"
                      }`}
                      {...register("room", {
                        required: "Please enter room no",
                      })}
                      onKeyUp={() => {
                        trigger("room");
                      }}
                    />
                    <label className="custLabel">Room No</label>
                    {errors.room && (
                      <small className="text-danger errMessage">
                        {errors.room.message}
                      </small>
                    )}
                  </div>
                  <div className="col-6 py-4 inputAni text-left lnfMobView">
                    <input
                      className="ltr-border-none"
                      type="email"
                      placeholder="Enter your Email*"
                      className={`form-control ltr-none ${
                        errors.email1 && "invalid"
                      }`}
                      {...register("email1", {
                        required: "Please enter your email address.",
                      })}
                      onKeyUp={() => {
                        trigger("email1");
                      }}
                    />
                    <label className="custLabel">Enter your Email</label>
                    {errors.email1 && (
                      <small className="text-danger errMessage">
                        {errors.email1.message}
                      </small>
                    )}
                  </div>
                  <div className="col-6 py-4 inputAni text-left lnfMobView cEmailDiv">
                    <input
                      className="ltr-border-none"
                      type="email"
                      placeholder="Enter your Confirm Email*"
                      className={`form-control ltr-none cEmail ${
                        errors.email && "invalid"
                      }`}
                      {...register("re_email", {
                        required: "Please confirm your email address",
                      })}
                      onKeyUp={() => {
                        trigger("re_email");
                      }}
                    />
                    <label className="custLabel">
                      Enter your Confirm Email
                    </label>
                    {errors.re_email && (
                      <small className="text-danger errMessage">
                        {errors.re_email.message}
                      </small>
                    )}
                  </div>
                  <div className="col-6 py-4 inputAni text-left lnfMobView cEmailDiv">
                    <input
                      className="ltr-border-none"
                      type="phone"
                      placeholder="Phone Number*"
                      className={`form-control ltr-none cEmail ${
                        errors.phone && "invalid"
                      }`}
                      {...register("phone", {
                        required: "Please Enter Phone Number",
                      })}
                      onKeyUp={() => {
                        trigger("phone");
                      }}
                    />

                    <label className="custLabel">Phone Number</label>
                    {errors.phone && (
                      <small className="text-danger errMessage">
                        {errors.phone.message}
                      </small>
                    )}
                  </div>
                </div>
              </div>
            </div>
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
          <div className="text-center py-4 lnfIpad">
            <button
              className="home-readmore-btn welcome-btn btn-style mt-3 mb-4 px-4"
              type="submit"
              title="Submit"
            >
              SUBMIT
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default LostAndFoundComponent;
