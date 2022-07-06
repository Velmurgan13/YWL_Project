import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import logoone from "../Yosemitewestgate/assets/Icons/ywl.webp";
import { Link } from "react-router-dom";
import ".././CheckAvailibilty/checkavailibity.scss";
import AdultsChid from "../../E/CheckAvailibilty/AdultsChildren";

import DatePicker from "sassy-datepicker";
import moment from "moment";
import {
  getRoomsForReservation,
  getQueryParams,
} from "../../DataLayer/datalayerUtilities";
import { useHistory } from "react-router-dom";

import "./checkavaility1.scss";
import "./checkavailibity.scss";

import { HiChevronDown, HiChevronRight, HiOutlineTrash } from "react-icons/hi";
import { CgCalendarDates } from "react-icons/cg";

import { FiPlusSquare, FiMinusSquare } from "react-icons/fi"
import { Collapse } from "react-bootstrap";

import { propertyDataSelector } from "../../Recoil/themeModule";
import { useRecoilValue } from "recoil";
// import AOS from "aos";

const WrappperCheckAvailibility = ({ inputParams, setcheckAvailability }) => {
  const propertyData = useRecoilValue(propertyDataSelector);

  const history = useHistory();
  const checkInDateRef = useRef();
  const checkOutDateRef = useRef();
  const promoCodeRef = useRef();
  const adultsRef = React.useRef([]);
  const childsRef = React.useRef([]);

  const roomsCountRef = useRef();

  const [showInputField, setInputField] = useState(false);
  const [collapseAvailbility, setcollapseAvailbility] = useState(false);

  const availibilityToggle = () => {
    setcollapseAvailbility(!collapseAvailbility); setInputField(!showInputField);
  };

  useEffect(() => {
    setEndDates();
    setCheckAvailability(inputParams);
  }, [inputParams]);

  var check_in = "";
  var check_out = "";
  var variable_check_in = "";
  var variable_check_out = "";
  var check_out_maxDate = "";
  var max_stay_limit = "";
  var _checkinStartDate = "";
  var _checkoutStartDate = "";

  const [visibleStart, setVisibleStart] = React.useState(false);
  const [visibleEnd, setVisibleEnd] = React.useState(false);
  // const [srolldiv, setscrolldiv] = useState(false);

  const [startDate, setStartDate] = React.useState(new Date());
  const [startMinDate, setStartMinDate] = React.useState(new Date());

  const [endDate, setEndDate] = React.useState(
    new Date(Date.now() + 3600 * 1000 * 24)
  );
  const [endMinDate, setEndMinDate] = React.useState(
    new Date(Date.now() + 3600 * 1000 * 24)
  );
  const [endMaxDate, setEndMaxDate] = React.useState(
    new Date(Date.now() + 3600 * 1000 * 24)
  );

  const [totalRoom, updateTotalRoom] = React.useState(1);
  const [totalAdults, updateTotalAdults] = React.useState(2);
  const [totalChildren, updateTotalChildren] = React.useState(0);

  const [dayIn, setDayIn] = React.useState("");
  const [yearIn, setYearIn] = React.useState("");
  const [monthIn, setMonthIn] = React.useState("");
  const [dateIn, setDateIn] = React.useState("");
  const [dayOut, setDayOut] = React.useState("");
  const [yearOut, setYearOut] = React.useState("");
  const [monthOut, setMonthOut] = React.useState("");
  const [dateOut, setDateOut] = React.useState("");
  const [childsAgeValues, setChildAgeValues] = React.useState([]);

  const [promoCode, setpromoCode] = React.useState("");

  const toggleStartPicker = () => {
    setVisibleStart((v) => !v);
    setIsComponentVisible(true);
  };
  const toggleEndPicker = () => {
    setVisibleEnd((v) => !v);
    setIsComponentVisibleEnd(true);
  };

  function setCheckAvailability(inputParams) {
    if (inputParams) {
      setStartDate(new Date(inputParams.room_check_in));
      setStartMinDate(new Date());

      let tmpEndDate = new Date(inputParams.room_check_in);
      let tmpEndMinDate = tmpEndDate.setDate(tmpEndDate.getDate() + 1);
      let tmpEndMaxDate = tmpEndDate.setDate(
        tmpEndDate.getDate() + parseInt(max_stay_limit)
      );
      setEndDate(new Date(inputParams.room_check_out));
      setEndMinDate(new Date(tmpEndMinDate));
      setEndMaxDate(new Date(tmpEndMaxDate));

      changeMaterialHeader(
        moment(new Date(inputParams.room_check_in)),
        "checkin"
      );
      changeMaterialHeader(
        moment(new Date(inputParams.room_check_out)),
        "checkout"
      );

      setpromoCode(inputParams.promo_code);

      let tmpTotalAdult = 0;
      let tmpTotalChild = 0;
      if (parseInt(inputParams.no_of_rooms) > 0) {
        for (let a = 0; a < parseInt(inputParams.no_of_rooms); a++) {
          tmpTotalAdult += parseInt(inputParams.adults[a]);
          tmpTotalChild += parseInt(inputParams.children[a]);
        }
      } else {
        tmpTotalAdult = propertyData.base_occupancy; //base occupancy to be fetched need to make this value dynamic
      }

      // set childsAgeValues if the value is empty
      let tmpChildAgesArray = [];
      if(childsAgeValues.length === 0){
        let r = 0; let c1 = 0;
        Object.values(inputParams.children).map(child => {
          if(child !== 0){
            for(let c=0; c<child; c++){
              tmpChildAgesArray.push({
                name: `childage_${r}_${c}`,
                value: inputParams.child[c1]
              });
              c1++;
            }
            r++;
          }
        });
        setChildAgeValues(tmpChildAgesArray);
      }

      updateTotalRoom(inputParams.no_of_rooms);
      updateTotalAdults(tmpTotalAdult);
      updateTotalChildren(tmpTotalChild);
    }
  }

  function setEndDates() {
      max_stay_limit = document.getElementById("max_stay").value;

    // set minimum date for check-in datepicker and a variable(modifiable) check-in date
      _checkinStartDate = changeTimezone(
        startDate,
        document.getElementById("timezone").value
      );
    if (document.getElementById("dpd1").value !== "") {
      variable_check_in = new Date(document.getElementById("dpd1").value);
    } else {
      variable_check_in = new Date();
    }

    // set minimum and maximum date for check-out datepicker
    if (document.getElementById("dpd2").value !== "") {
      _checkoutStartDate = new Date(document.getElementById("dpd1").value);
      _checkoutStartDate.setDate(_checkoutStartDate.getDate() + 1);
      check_out_maxDate = moment(variable_check_in).add(max_stay_limit, "days");
    } else {
      _checkoutStartDate = new Date();
      _checkoutStartDate.setDate(_checkoutStartDate.getDate() + 1);
      check_out_maxDate = moment(_checkinStartDate).add(max_stay_limit, "days");
    }

    setEndMinDate(_checkoutStartDate);
    setEndMaxDate(check_out_maxDate.toDate());

    changeMaterialHeader(moment(new Date(_checkinStartDate)), "checkin");
    changeMaterialHeader(moment(new Date(_checkoutStartDate)), "checkout");
  }

  var changeMaterialHeader = function (date, flag) {
    let year = date.format("YYYY");
    let month = date.format("MMM");
    let dayNum = date.format("D");
    let isoDay = date.isoWeekday();

    let weekday = new Array(7);
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    weekday[7] = "Sunday";

    if (flag === "checkin") {
      // displaying dates in checkin calendar UI
      setDayIn(weekday[isoDay]);
      setYearIn(year);
      setMonthIn(month);
      setDateIn(dayNum);

      if (document.getElementById("material-day-checkin")) {
        document.getElementById("material-day-checkin").innerText =
          weekday[isoDay];
      }
      if (document.getElementById("material-year-checkin")) {
        document.getElementById("material-year-checkin").innerText = year;
      }
      if (document.getElementById("material-month-checkin")) {
        document.getElementById("material-month-checkin").innerText = month;
      }
      if (document.getElementById("material-date-checkin")) {
        document.getElementById("material-date-checkin").innerText = dayNum;
      }
    } else {
      // displaying dates in check-out calendar UI
      setDayOut(weekday[isoDay]);
      setYearOut(year);
      setMonthOut(month);
      setDateOut(dayNum);

      if (document.getElementById("material-day-checkout")) {
        document.getElementById("material-day-checkout").innerText =
          weekday[isoDay];
      }
      if (document.getElementById("material-year-checkout")) {
        document.getElementById("material-year-checkout").innerText = year;
      }
      if (document.getElementById("material-month-checkout")) {
        document.getElementById("material-month-checkout").innerText = month;
      }
      if (document.getElementById("material-date-checkout")) {
        document.getElementById("material-date-checkout").innerText = dayNum;
      }
    }
  };

  // changing timezone of browser to avoid checkin display-date and calendar-date mismatch issue
  function changeTimezone(date, ianatz) {
    // suppose the date is 12:00 UTC
    var invdate = new Date(
      date.toLocaleString("en-US", {
        timeZone: ianatz,
      })
    );

    // then invdate will be 07:00 in Toronto
    // and the diff is 5 hours
    var diff = date.getTime() - invdate.getTime();

    // so 12:00 in Toronto is 17:00 UTC
    return new Date(date.getTime() - diff); // needs to substract
  }

  const handleStartDateSelect = (date) => {
    max_stay_limit = document.getElementById("max_stay").value;

    check_in = date;
    check_out = moment(new Date(document.getElementById("dpd2").value));
    check_out_maxDate = moment(date).add(max_stay_limit, "days");

    // set value and display date for check-in
    document.getElementById("dpd1").value = moment(date).format("YYYY-MM-DD");
    document.getElementById("customedeatetimesin").innerHTML =
      moment(date).format("MMM DD");

    // check if current check-out date is less that selected check-in date
    if (check_out <= new Date(check_in)) {
      check_out = moment(check_in).add(1, "days");
      variable_check_out = check_out;
    } else {
      variable_check_out = moment(check_in).add(1, "days");
    }

    // if check-in & check-out date difference is greater than max stay limit then,
    // update check-out date to check-in date + max stay days
    var timeDiff = Math.abs(
      new Date(check_in).getTime() - new Date(check_out).getTime()
    );
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (diffDays > max_stay_limit) {
      check_out = check_out_maxDate;
    }

    // set value and display date for check-out
    document.getElementById("dpd2").value =
      variable_check_out.format("YYYY-MM-DD");
    document.getElementById("customedeatetimesout").innerHTML =
      variable_check_out.format("MMM DD");

    setStartDate(moment(check_in).toDate());
    setEndDate(variable_check_out.toDate());
    setEndMinDate(variable_check_out.toDate());
    setEndMaxDate(check_out_maxDate.toDate());

    setVisibleEnd(true);
    setVisibleStart(false);
    changeMaterialHeader(moment(new Date(check_in)), "checkin");
    changeMaterialHeader(moment(new Date(check_out)), "checkout");
  };

  const handleEndDateSelect = (date) => {
    setEndDate(date);
    document.getElementById("dpd2").value = moment(date).format("YYYY-MM-DD");
    document.getElementById("customedeatetimesout").innerHTML =
      moment(date).format("MMM DD");
    changeMaterialHeader(moment(new Date(date)), "checkout");
    setVisibleEnd(false);
  };

  // revering the obect and returing a simplied object with 'name' & 'value' pair
  function generateSimpleObjects(obj, flag = null) {
    /* 
      reversing the Object Array because the reference object was returning the old value and not the new value from the array
      therefore reversed the Object Array and now the new value is returned.
    */
    // reversing the object START
    let new_obj = [];
    let j = 0;
    let rev_obj;
    if (flag === 1) {
      rev_obj = Object.keys(obj.current).reverse();
      rev_obj.forEach(function (i) {
        new_obj[j] = obj.current[i];
        j++;
      });
    } else {
      rev_obj = Object.keys(obj).reverse();
      rev_obj.forEach(function (i) {
        new_obj[j] = obj[i];
        j++;
      });
    }
    // reversing the object END

    if (new_obj) {
      let temp = new_obj.reduce(function (previous, current) {
        if (current != null && previous != undefined) {
          var object = previous.filter(
            (object) => object.name === current.name
          );
          if (object.length == 0) {
            if (current.value !== null && current.name !== null) {
              previous.push({ name: current.name, value: current.value });
            }
          }
        }
        return previous;
      }, []);
      return temp;
    }
  }

  function generateSimpleObject(obj, flag = null) {
    if (obj.current) {
      let temp = obj.current.reduce(function (previous, current) {
        if (current != null && previous != undefined) {
          var object = previous.filter(
            (object) => object.name === current.name
          );
          if (object.length == 0) {
            if (current.value !== null && current.name !== null) {
              previous.push({ name: current.name, value: current.value });
            }
          }
        }
        return previous;
      }, []);
      return temp;
    }
  }

  function removeExtraValues(data, roomsCountVal, name) {
    let tmp = Object.values(data).map((data) => {
      for (let r = 0; r < roomsCountVal; r++) {
        if (data.name === name + r) {
          if (name === "child") {
            let ret = data.name.replace("child", "");
            data["roomNo"] = ret;
          }
          return data;
        }
      }
    });
    return tmp;
  }

  const onSubmitCheck = async (event) => {
    event.preventDefault();
    
    try {
      const checkInDateVal = checkInDateRef.current
        ? checkInDateRef.current.value
        : startDate;
      const checkOutDateVal = checkOutDateRef.current
        ? checkOutDateRef.current.value
        : endDate;
      const promoCodeVal = promoCodeRef.current
        ? promoCodeRef.current.value
        : "";
      
      let adultsVal =
        adultsRef.current.length > 0
          ? generateSimpleObject(adultsRef)
          : [{ name: "adults0", value: "2" }];
      let childsVal =
        childsRef.current.length > 0
          ? generateSimpleObjects(childsRef, 1)
          : [{ name: "child0", value: "0", roomNo: 0 }];
      let childsAgeVals =
        childsAgeValues.length > 0
          ? generateSimpleObjects(childsAgeValues, 2)
          : [{}];
      const roomsCountVal = roomsCountRef.current
        ? roomsCountRef.current.value
        : 1;

      // removing extra values if any START
      adultsVal = removeExtraValues(adultsVal, roomsCountVal, "adults");
      childsVal = removeExtraValues(childsVal, roomsCountVal, "child");
      let childsAgeVal = Object.values(childsAgeVals).map((data) => {
        for (let r = 0; r < roomsCountVal; r++) {
          if (childsVal[r].value != undefined && childsVal[r].value != "0") {
            for (let c = 0; c < parseInt(childsVal[r].value); c++) {
              if (data.name === "childage_" + childsVal[r].roomNo + "_" + c) {
                return data;
              }
            }
          }
        }
      });
      // removing extra values if any END

      let checkAvailabilityData = {
        room_check_in: checkInDateVal,
        room_check_out: checkOutDateVal,
        promo_code: promoCodeVal,
        adults: adultsVal,
        childs: childsVal,
        childsAge: childsAgeVal,
        no_of_rooms: roomsCountVal,
      };

      let previousURL = window.location.pathname;

      let queryParams = await getQueryParams(checkAvailabilityData);
      history.replace({
        pathname: "/reservations",
        search: queryParams,
      });

      if (previousURL.includes("reservations")) {
        // this function will reset the values of 'checkAvailabilityData' so that the component
        // will re-render using the useEffect dependency.
        setcheckAvailability(checkAvailabilityData);
      }

      // set collapseAvailbility = FALSE; to hide the Adults and Children div
      if(collapseAvailbility){
        setcollapseAvailbility(!collapseAvailbility);
      }

    } catch (e) {
      alert(`Error! ${e.message}`);
    }
  };

  // == when click outside hide the checkin calendar START == //
  function useComponentVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] =
      useState(initialIsVisible);
    const ref = useRef(null);

    const handleHideDropdown = (event) => {
      if (event.key === "Escape") {
        setIsComponentVisible(false);
        if (visibleStart) {
          document.getElementById("customedeatetimesin").click();
        }
      }
    };

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsComponentVisible(false);
        document.getElementById("customedeatetimesin").click();
      }
    };

    useEffect(() => {
      document.addEventListener("keydown", handleHideDropdown, true);
      document.addEventListener("click", handleClickOutside, true);
      return () => {
        document.removeEventListener("keydown", handleHideDropdown, true);
        document.removeEventListener("click", handleClickOutside, true);
      };
    });

    return { ref, isComponentVisible, setIsComponentVisible };
  }

  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(true);
  // == when click outside hide the checkin calendar END == //

  // == when click outside hide the checkout calendar START == //
  function useComponentVisibleEnd(initialIsVisible) {
    const [isComponentVisibleEnd, setIsComponentVisibleEnd] =
      useState(initialIsVisible);
    const refEnd = useRef(null);

    const handleHideDropdownEnd = (event) => {
      if (event.key === "Escape") {
        setIsComponentVisibleEnd(false);
        if (visibleEnd) {
          document.getElementById("customedeatetimesout").click();
        }
      }
    };

    const handleClickOutsideEnd = (event) => {
      if (refEnd.current && !refEnd.current.contains(event.target)) {
        setIsComponentVisibleEnd(false);
        document.getElementById("customedeatetimesout").click();
      }
    };

    useEffect(() => {
      document.addEventListener("keydown", handleHideDropdownEnd, true);
      document.addEventListener("click", handleClickOutsideEnd, true);
      return () => {
        document.removeEventListener("keydown", handleHideDropdownEnd, true);
        document.removeEventListener("click", handleClickOutsideEnd, true);
      };
    });

    return { refEnd, isComponentVisibleEnd, setIsComponentVisibleEnd };
  }

  const { refEnd, isComponentVisibleEnd, setIsComponentVisibleEnd } =
    useComponentVisibleEnd(true);
  // == when click outside hide the checkout calendar END == //

  function updateTotalValues() {
    let total_adult = 0;
    let total_child = 0;

    let no_of_rooms = parseInt(document.getElementById("no_of_rooms").value);

    for (var i = 0; i < no_of_rooms; i++) {
      total_adult =
        total_adult + parseInt(document.getElementById("adults" + i).value);
      total_child =
        total_child + parseInt(document.getElementById("child" + i).value);
    }

    updateTotalRoom(no_of_rooms);
    updateTotalAdults(total_adult);
    updateTotalChildren(total_child);
  }

  function updatePromoCode(e) {
    setpromoCode(e.target.value);
  }

  // end
  // AOS.init();
  return (
    <div
      className="mainCheckAvail mainCheckAvailllll"
      // data-aos="zoom-in-up"
      // data-aos-duration="1000"
    >
      <div className="mx-0 justify-ca text-center " id="checkAvailability">
        <div className="bg-color-datepicker px-0 onScrollCA">
          <div className="col-12 d-none CAtitle">
            <h3 className="text-white text-center">BOOK NOW</h3>
          </div>
          <div className="logo onScrollLogo">
              <figure className="">
                <Link to="/">
                  <img
                    src={logoone}
                    className="ywg-logo img-fluid"
                    width="100%"
                    height="100%"
                    // alt={logoTitle}
                    // title={logoTitle}
                    loading="lazy"
                  />
                </Link>
              </figure>
            </div>
          <form
            name="get_header_avaibility"
            id="get_header_avaibility"
            onSubmit={onSubmitCheck}
            className="CAForm"
          >
            <div className="row mx-0 justity-center">
              {/* <div></div> */}
              <div className="col-md-4 mob-bdr-right col-6 col-lg-2 col-xl-2 px-0 brdr-md-right br-right">
                <div className="text-white mb-2 font-weight br-right-md-none">
                  CHECK IN
                  {/* <span className="main-span">ARRIVAL</span> */}
                  <div className="sideLine">
                    <span
                      className="main-span1 bdr-btm-date text-uppercase text-center fs-16"
                      id="customedeatetimesin"
                      onClick={toggleStartPicker}
                    >
                      {moment(startDate).format("MMM DD")}
                    </span>
                    &nbsp;
                    <CgCalendarDates size="30" onClick={toggleStartPicker} />
                  </div>
                </div>

                <input
                  type="hidden"
                  className="form-control checkincustometime "
                  value={moment(startDate).format("YYYY-MM-DD")}
                  readOnly="readonly"
                  onClick={toggleStartPicker}
                  name="room_check_in"
                  id="dpd1"
                  ref={checkInDateRef}
                />

                {visibleStart ? (
                  <div
                    className="date-position date-position-xs-start"
                    ref={ref}
                  >
                    
                    {isComponentVisible && (
                      <>
                        <div id="material-header-holder-checkin">
                          <div
                            className="ui-datepicker-material-header"
                            id="ui-datepicker-material-header-checkin"
                          >
                            <i className="fa fa-caret-up t-arrow"></i>
                            <div
                              className="ui-datepicker-material-day"
                              id="material-day-checkin"
                            >
                              {dayIn}
                            </div>
                            <div className="ui-datepicker-material-date">
                              <div
                                className="ui-datepicker-material-month"
                                id="material-month-checkin"
                              >
                                {monthIn}
                              </div>
                              <div
                                className="ui-datepicker-material-day-num"
                                id="material-date-checkin"
                              >
                                {dateIn}
                              </div>
                              <div
                                className="ui-datepicker-material-year date-position"
                                id="material-year-checkin"
                              >
                                {yearIn}
                              </div>
                            </div>
                          </div>
                        </div>
                        <DatePicker
                          selected={startDate}
                          minDate={startMinDate}
                          // maxDate={startMaxDate}
                          onChange={handleStartDateSelect}
                          className="absolute mt-2"
                        />
                      </>
                    )}
                  </div>
                ) : null}
                <HiChevronDown size="25" className="text-white checkArrow" />
              </div>

              <div className="col-md-4 col-6 col-lg-2 col-xl-2 brdr-md-right br-right">
                <div className="text-white mb-2 br-right-md-none">
                  CHECK OUT
                  <div className="sideLine">
                    <span
                      className="main-span1 bdr-btm-date text-uppercase text-center"
                      id="customedeatetimesout"
                      onClick={toggleEndPicker}
                    >
                      {moment(endDate).format("MMM DD")}
                    </span>
                    &nbsp;
                    <CgCalendarDates size="30" onClick={toggleEndPicker} />
                  </div>
                </div>
                <input
                  type="hidden"
                  className="form-control checkincustometime "
                  value={moment(endDate).format("YYYY-MM-DD")}
                  readOnly="readonly"
                  onClick={toggleEndPicker}
                  name="room_check_out"
                  id="dpd2"
                  ref={checkOutDateRef}
                />

                {visibleEnd ? (
                  <div
                    className="date-position date-position-xs-end"
                    ref={refEnd}
                  >
                    
                    {isComponentVisibleEnd && (
                      <>
                        <div id="material-header-holder-checkout">
                          <div
                            className="ui-datepicker-material-header"
                            id="ui-datepicker-material-header-checkout"
                          >
                            <i className="fa fa-caret-up t-arrow"></i>
                            <div
                              className="ui-datepicker-material-day"
                              id="material-day-checkout"
                            >
                              {dayOut}
                            </div>
                            <div className="ui-datepicker-material-date">
                              <div
                                className="ui-datepicker-material-month"
                                id="material-month-checkout"
                              >
                                {monthOut}
                              </div>
                              <div
                                className="ui-datepicker-material-day-num"
                                id="material-date-checkout"
                              >
                                {dateOut}
                              </div>
                              <div
                                className="ui-datepicker-material-year"
                                id="material-year-checkout"
                              >
                                {yearOut}
                              </div>
                            </div>
                          </div>
                        </div>
                        <DatePicker
                          selected={endDate}
                          minDate={endMinDate}
                          maxDate={endMaxDate}
                          onChange={handleEndDateSelect}
                          className="absolute mt-2"
                        />
                        {/* <DatePicker
                          closeOnScroll={true}
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                        /> */}
                      </>
                    )}
                  </div>
                ) : null}
                <HiChevronDown size="25" className="text-white checkArrow" />
              </div>

              {/* <div className="col-md-3 col-lg-2 col-6 px-1 MT30-xs"> */}
              <div className="col-md-4 col-12 col-lg-2 col-xl-2 input-field mt-0 px-3 brdr-md-right br-right mt-xs-30 mb-xs-10">
                <div className="br-right-promo promo-section-left mt-5 text-center mt-md-0 mt-lg-0 mt-xl-0">
                  <label className="d-none" htmlFor="promo_code">
                    Promo Code
                  </label>
                  <input
                    type="text"
                    id="promo_code"
                    name="promo_code"
                    className="text-white promoInput"
                    ref={promoCodeRef}
                    defaultValue={promoCode}
                    onChange={updatePromoCode}
                  />
                  <label htmlFor="name">Promo Code</label>
                </div>
                {/* </div> */}

                {/* <span className="main-span-promo main-span">PROMO CODE</span>
              <div className="w-80">
                <input
                  className='form-control w-100 mt-0 color-placeholder brdr-b'
                  placeholder=' '
                  onFocus={e => (e.target.placeholder = ' ')}
                  onBlur={e => (e.target.placeholder = ' ')}
                  id='inputlg'
                  type='text'
                ></input>
              </div> */}
              </div>

              <div className="col-md-12 col-12 mt-5 mt-md-4 mt-xl-0 mt-lg-0 col-lg-4 col-xl-4 text-center RoomChildAdultDiv">
                <div
                  className="d-flex brdr-b"
                  onClick={availibilityToggle}
                  aria-expanded={collapseAvailbility}
                  aria-controls="collapseIdAvail"
                  readOnly="readonly"
                >
                  {!showInputField ? (
                    <FiPlusSquare
                      size="30"
                      className="plus-color text-white greaterArrow ml-1 mt-0 mx-md-2"
                    />
                  ) : (
                    <FiMinusSquare
                      size="30"
                      className="plus-color text-white greaterArrow ml-1 mt-0 mx-md-2"
                    />
                  )}
                  <label className="d-none" htmlFor="inputlg">
                    inputlg
                  </label>
                  <input
                    className="form-control mt-3 mt-md-3 mt-lg-0 mt-xl-0 w-100 text-capitalize mt-0 color-placeholder borderStyling px-0"
                    // onClick={() => setInputField(!showInputField)}
                    // placeholder="1 ROOMS 2 ADULTS 1 CHILD"
                    id="inputlg"
                    // type="text"
                    readOnly="readonly"
                    value={`${totalRoom} ROOM, ${totalAdults} ADULTS, ${totalChildren} CHILDREN`}
                  ></input>
                </div>

                {/* {showInputField && ( */}
                <Collapse in={collapseAvailbility}>
                  <div
                    className="p-2 position-abs bg-available"
                    id="collapseIdAvail"
                  >
                    <AdultsChid
                      adultsRef={adultsRef}
                      childsRef={childsRef}
                      /*childsAgeRef={childsAgeRef}*/ roomsCountRef={
                        roomsCountRef
                      }
                      setChildAgeValues={setChildAgeValues}
                      updateTotalValues={updateTotalValues}
                      inputParams={inputParams}
                    />
                  </div>
                </Collapse>
                {/* )} */}
              </div>
              <div className="col-md-2 text-right-lg mx-md-auto mx-lg-0 mx-xl-0 MT30-xs text-md-left searchBtn">
                <button
                  className="book-a-room my-5 my-md-4 my-lg-2 my-xl-2 px-5"
                  title="Book A Room"
                  type="submit"
                  id="book-a-room"
                >
                  SEARCH
                </button>
              </div>
              {/* <div className='send-icon'>
              <IconContext.Provider value={{ color: 'white', size: '30px' }}>
                <div className='send-color-bg'>
                  <button type='button' className='avail-btn'>
                    <GrSend
                      color='white'
                      className='arrow-icon text-white m-2'
                    />
                  </button>
                </div>
              </IconContext.Provider>
            </div> */}

              <input
                type="hidden"
                id="max_stay"
                name="max_stay"
                defaultValue={propertyData.max_stay_limit ? propertyData.max_stay_limit : 28}
              />
              <input
                type="hidden"
                id="timezone"
                name="timezone"
                defaultValue={propertyData.timezone ? propertyData.timezone : 'America/Los_Angeles'}
              />
            </div>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default WrappperCheckAvailibility;
