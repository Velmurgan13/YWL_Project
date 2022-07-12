import React, { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import {
  getSeoDescriptionData,
  getPropLostFoundData,
  getPropLostFoundDetailsData,
} from "../../../DataLayer/datalayerUtilities";
import moment from "moment";
import { CgCalendarDates } from "react-icons/cg";
import "../../Yosemitewestgate/style/common.css";
import "./index.scss";
import { useForm } from "react-hook-form";
import { Form, FormGroup, Label, Input } from "reactstrap";
import BannerContainer from "../BannerComponent/BannerContainer";
import DatePicker from "sassy-datepicker";


const GroupTravel = (props) => {
  const [toggleState, setToggleState] = useState(1);
  const [currentValue, setCurrentValue] = useState(false);
  const [editInfo, setEditInfo] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const [clicked, setClicked] = useState(false);
  const [seoData, setPropertySeodata] = useState([]);
  const [LostFoundData, setLostAndFoundData] = useState([]);
  const [startDate, setStartDate] = React.useState(new Date());
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const [startMinDate, setStartMinDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(
    new Date(Date.now() + 3600 * 1000 * 24)
  );
  const [endMinDate, setEndMinDate] = React.useState(
    new Date(Date.now() + 3600 * 1000 * 24)
  );
  var check_in = "";
  var check_out = "";
  var variable_check_out = "";

  useEffect(() => {
    fetchSeoProperties();
    fetchLostAndFoundData();
  }, []);


  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData("28");
    setPropertySeodata(response.data);
  };

  const fetchLostAndFoundData = async () => {
    const response = await getPropLostFoundData();
    setLostAndFoundData(response);
  };
  const onChangeDate = (e) => {
    props.setDate(e.target.value);
  };
  const onClick = () => {
    setShowStartCalendar(!showStartCalendar);
  };
  const onClickEnd = () => {
    setShowEndCalendar(!showEndCalendar);
  };
  const handleStartDateSelect = (date) => {
    check_in = date;
    check_out = moment(new Date(document.getElementById("sixPlusEndDate").value));
    document.getElementById("sixPlusStartDate").value = moment(date).format("YYYY-MM-DD");
    // setStartMinDate(new Date());
    // props.setDate(check_in );

    // check if current check-out date is less that selected check-in date
    if (check_out <= new Date(check_in)) {
      check_out = moment(check_in).add(1, "days");
      variable_check_out = check_out;
    } else {
      variable_check_out = moment(check_in).add(1, "days");
    }

    // set value and display date for check-out
    document.getElementById("sixPlusEndDate").value = variable_check_out.format("YYYY-MM-DD");
    setEndMinDate(variable_check_out.toDate());

    setStartDate(moment(check_in).toDate());
    setEndDate(variable_check_out.toDate());
    setShowStartCalendar(false);
    setShowEndCalendar(true);

    // if (check_out <= new Date(check_in)) {
    //   check_out = moment(check_in).add(1, "days");
    //   variable_check_out = check_out;
    // } else {
    //   variable_check_out = moment(check_in).add(1, "days");
    //   console.log("hello world")
    // }
  };

  const handleEndDateSelect = (date) => {
    check_out = date;
    document.getElementById("sixPlusEndDate").value =
    moment(date).format("YYYY-MM-DD");
    setEndDate(moment(check_out).toDate());
    // setStartMinDate(new Date());
    setShowEndCalendar(false);
    props.setDate(check_out);
  };
  const handleChange = (data) => {
    let { name, value } = data.target;

    setRadioValue(value);
    setEditInfo(name);

    var elem = document.getElementById("currentValue");
    if (typeof elem !== "undefined" && elem !== null) {
      document.getElementById("currentValue").value = "";
    }
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
    reset,
    trigger,
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
    const { property_name, email } = props.propertyData;
    const finalData = { ...data, property_name, email, contactBy: radioValue };
    // console.log(finalData);
    const response = await getPropLostFoundDetailsData(finalData);
    // console.log(response);
    //reset();
  };
  return (
    <section>
      <BannerContainer seoData={seoData} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container px-3 px-md-0">
          <div className="text-center">
            <h5 className="groupTitle">CONTACT INFORMATION</h5>
            <div className="shadow groupCard my-3 py-4">
              <div className="row lnf-form text-left">
                <div className="col-12 col-md-6 px-md-3 py-4 inputAni">
                  <input
                    className="ltr-border-none"
                    type="text"
                    placeholder="First Name*"
                    className={`form-control ltr-none ${
                      errors.firstname && "invalid"
                    }`}
                    {...register("first_name", {
                      required: "Please enter your first name.",
                    })}
                    onKeyUp={() => {
                      trigger("first_name");
                    }}
                  />  
                      <label className="custLabel">
                      First Name
                    </label>
                  {errors.firstname && (
                    <small className="text-danger">
                      {errors.firstname.message}
                    </small>
                  )}
                </div>
                <div className="col-12 col-md-6 px-md-3 py-4 inputAni">
                  <input
                    className="ltr-border-none"
                    type="text"
                    placeholder="Last Name*"
                    className={`form-control ltr-none ${
                      errors.lastname && "invalid"
                    }`}
                    {...register("last_name", {
                      required: "Please enter your last name.",
                    })}
                    onKeyUp={() => {
                      trigger("last_name");
                    }}
                  />
                  <label className="custLabel">
                      Last Name
                    </label>
                  {errors.lastname && (
                    <small className="text-danger">
                      {errors.lastname.message}
                    </small>
                  )}
                </div>
                <div className="col-12 px-md-3 py-2">
                  <h3 className="grpContactPref">
                    How would you prefer to be contacted ?
                  </h3>
                  <div
                    className="text-left"
                    onChange={(e) => {
                      setCurrentValue(e.target.value);
                    }}
                    value={currentValue}
                  >
                    <input
                      id="view"
                      value="Phone"
                      placeholder="india"
                      name="platform"
                      type="radio"
                      onChange={handleChange}
                      className="grpBullet"
                    />
                    Phone
                    <input
                      id="windows"
                      value={"Email"}
                      name="platform"
                      type="radio"
                      onChange={handleChange}
                      className="grpBullet"
                    />
                    Email
                  </div>
                </div>
                <div className="col-12 col-md-6 px-md-3 py-4 inputAni">
                  <input
                    className="ltr-border-none"
                    type="phone"
                    placeholder="Phone Number*"
                    className={`form-control ltr-none ${
                      errors.phone && "invalid"
                    }`}
                    {...register("phone", {
                      required: "Phone is Required",
                    })}
                    onKeyUp={() => {
                      trigger("phone");
                    }}
                  />
                  <label className="custLabel">
                      Phone Number
                    </label>
                  {errors.phone && (
                    <small className="text-danger">
                      {errors.phone.message}
                    </small>
                  )}
                </div>
                <div className="col-12 col-md-6 px-md-3 py-4 inputAni">
                  <input
                    className="ltr-border-none"
                    type="text"
                    placeholder="Email Address*"
                    className={`form-control ltr-none ${
                      errors.email && "invalid"
                    }`}
                    {...register("Email", {
                      required: "email is Required",
                    })}
                    onKeyUp={() => {
                      trigger("email");
                    }}
                  />
                     <label className="custLabel">
                      Email Address
                    </label>
                  {errors.email && (
                    <small className="text-danger">{errors.email.message}</small>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <h3 className="groupTitle">Travel Details</h3>
          </div>
          <div className="shadow groupCard pt-xs-20 my-3 py-4">
            <div className="row lnf-form">
              {/* <div className="col-12 col-md-6 px-md-3 px-2 py-4">
                <h3 className="lnf-title">Check-In</h3>
                <input
                  className="ltr-border-none"
                  type="date"
                  placeholder="Select Date"
                  className={`form-control ltr-none ${
                    errors.lostDate && "invalid"
                  }`}
                  {...register("Check-in", {
                    required: "LostDate is Required",
                  })}
                  onKeyUp={() => {
                    trigger("lostDate");
                  }}
                />
                {errors.lostDate && (
                  <small className="text-danger">
                    {errors.lostDate.message}
                  </small>
                )}
              </div> */}

              <div className="col-6 px-md-3 px-2 pt-4 lnfMobView">
                <h3 className="lnf-title lnfD1">Check-In</h3>
                <div
                  className="floating-label-group inputDiv d-flex PR"
                  onChange={onChangeDate}
                >
                  <input
                    // type="text"   
                    className="form-control checkincustometime ltr-none"
                    value={moment(startDate).format("YYYY-MM-DD")}
                    readOnly="readonly"
                    id="sixPlusStartDate"
                    onClick={onClick}
                  />
                  <label className="d-none" htmlFor="sixPlusStartDate">
                     Hidden Label
                  </label>
                  <CgCalendarDates
                    size="30"
                    className="datepicker_icon_special  datePosition"
                    onClick={onClick}
                  />
                  {showStartCalendar ? (
                    <DatePicker
                      // onChange={onChange}
                      selected={startDate}
                      minDate={startMinDate}
                      onChange={handleStartDateSelect}
                      format="dd-mm-yyyy"
                      className="openDatePosition"
                    />
                  ) : null}
                </div>
              </div>



              <div className="col-6 px-md-3 px-2 pt-4 lnfMobView">
                <h3 className="lnf-title lnfD1">Check-Out</h3>
                <div
                  className="floating-label-group inputDiv d-flex PR"
                  onChange={onChangeDate}
                >
                  <input
                    // type="text"   
                    className="form-control checkincustometime ltr-none"
                    value={moment(endDate).format("YYYY-MM-DD")}
                    readOnly="readonly"
                    id="sixPlusEndDate"
                    onClick={onClickEnd}
                  />
                  <label className="d-none" htmlFor="sixPlusEndDate">
                     Hidden Label
                  </label>
                  <CgCalendarDates
                    size="30"
                    className="datepicker_icon_special  datePosition"
                    onClick={onClickEnd}
                  />
                  {showEndCalendar ? (
                    <DatePicker
                      // onChange={onChange}
                      selected={endDate}
                      minDate={endMinDate}
                      onChange={handleEndDateSelect}
                      format="dd-mm-yyyy"
                      className="openDatePosition"
                    />
                  ) : null}
                </div>
              </div>
              {/* <div className="col-12 col-md-6 px-md-3 px-2 py-4">
                <h3 className="lnf-title">Check-Out</h3>
                <input
                  className="ltr-border-none"
                  type="date"
                  placeholder="Select Date"
                  className={`form-control ltr-none ${
                    errors.lostDate && "invalid"
                  }`}
                  {...register("Check-out", {
                    required: "LostDate is Required",
                  })}
                  onKeyUp={() => {
                    trigger("Check-out");
                  }}
                />
                {errors.lostDate && (
                  <small className="text-danger">
                    {errors.lostDate.message}
                  </small>
                )}
              </div> */}
            </div>

            <div className="row lnf-form">
              <div className="col-12 col-md-6 px-md-3 px-2 py-4">
                <h3 className="lnf-title">Trip Type</h3>
                <FormGroup className="input-form2">
                  <select
                    className="ltr-border-none"
                    type="select"
                    placeholder="item Date"
                    className={`form-control ltr-none ${
                      errors.item && "invalid"
                    }`}
                    {...register("Trip Type", {
                      required: "item is Required",
                    })}
                    onKeyUp={() => {
                      trigger("item");
                    }}
                  >
                    <option>Select Lost Item Type</option>
                    {Object.values(LostFoundData).map((item) => {
                      return <option>{ReactHtmlParser(item["item"])}</option>;
                    })}
                  </select>
                </FormGroup>
              </div>
              <div className="col-12 col-md-6 px-md-3 px-2 py-4">
                <h3 className="lnf-title">Select Number Of Rooms</h3>
                <FormGroup className="input-form2">
                  <select
                    className="ltr-border-none"
                    type="select"
                    placeholder="item Date"
                    className={`form-control ltr-none ${
                      errors.item && "invalid"
                    }`}
                    {...register("Number of Rooms", {
                      required: "item is Required",
                    })}
                    onKeyUp={() => {
                      trigger("item");
                    }}
                  >
                    <option>Select Lost Item Type</option>
                    {Object.values(LostFoundData).map((item) => {
                      return <option>{ReactHtmlParser(item["item"])}</option>;
                    })}
                  </select>
                </FormGroup>
              </div>
            </div>
          </div>

          <div className="text-center py-4">
            <button
              className="about-readmore-btn grpBtn ls-1 welcome-btn btn-style mt-3"
              type="submit" title="Submit"
            >
              SUBMIT
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default GroupTravel;
