import React, { useState } from "react";
import moment from "moment";
import { CgCalendarDates } from "react-icons/cg";
import DatePicker from "sassy-datepicker";

const CustomCalendar = (props) => {
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [startMinDate, setStartMinDate] = useState(new Date());
    const [showStartCalendar, setShowStartCalendar] = useState(false);
    const [showEndCalendar, setShowEndCalendar] = useState(false);
    const [endDate, setEndDate] = useState( new Date(Date.now() + 3600 * 1000 * 24) );
    const [endMinDate, setEndMinDate] = useState(new Date(Date.now() + 3600 * 1000 * 24));
    // const [visibleStart, setVisibleStart] = React.useState(false);
    // const [visibleEnd, setVisibleEnd] = React.useState(false);

    var check_in = "";
    var check_out = "";
    var variable_check_in = "";
    var variable_check_out = "";

    const onClick = () => {
        if (showEndCalendar) {
          setShowEndCalendar(false);
        }
        setShowStartCalendar(!showStartCalendar);
        setShowEndCalendar(false);
        // alert('start');
        // setVisibleEnd((v) => !v);
      };

    const onChange = (newDate) => {
    // console.log(`New date selected - ${newDate.toString()}`);
    setDate(newDate);
    };

    const handleStartDateSelect = (date) => {
        check_in = date;
        check_out = moment(new Date(document.getElementById("eventEndDate").value));
    
        // set value and display date for check-in
        document.getElementById("eventStartDate").value =
          moment(date).format("YYYY-MM-DD");
    
        // check if current check-out date is less that selected check-in date
        if (check_out <= new Date(check_in)) {
          check_out = moment(check_in).add(1, "days");
          variable_check_out = check_out;
        } else {
          variable_check_out = moment(check_in).add(1, "days");
        }
    
        // set value and display date for check-out
        document.getElementById("eventEndDate").value =
          variable_check_out.format("YYYY-MM-DD");
    
        setStartDate(moment(check_in).toDate());
        setEndDate(variable_check_out.toDate());
        setEndMinDate(variable_check_out.toDate());
        setShowStartCalendar(false);
        setShowEndCalendar(true);
        props.setDate(check_in)
        props.setEndDate(check_out)
      };

    const onClickEnd = () => {
    setShowEndCalendar(!showEndCalendar);
    // alert('end');
    // setVisibleStart((v) => !v);
    setShowStartCalendar(false)
    };

    const handleEndDateSelect = (date) => {
        setEndDate(date);
        document.getElementById("eventEndDate").value =
          moment(date).format("YYYY-MM-DD");
        setShowEndCalendar(false);
        props.setEndDate(date)
      };

      const onChangeDate = (e) => {
        props.setDate(e.target.value)
        props.setEndDate(e.target.value)
      };

  return (
    <>
        <div className="form-group text-left col-lg-12 col-xl-12 col-md-12 col-sm-12">
          <div className="floating-label-group inputDiv PR" onChange={onChangeDate} >
            <label className="mb-0">Check In</label>
            <input
              className="form-control checkincustometime ltr-none text-center"
              value={moment(startDate).format("YYYY-MM-DD")}
              readOnly="readonly"
              onClick={onClick}
              id="eventStartDate"
              name="room_check_in"
              
            />
            <CgCalendarDates
              size="30"
              className="datepicker_icon_special"
              onClick={onClick}
            />
            {showStartCalendar ? (
              <DatePicker
                onChange={onChange}
                selected={date}
                minDate={startMinDate}
                onChange={handleStartDateSelect}
                format="dd-mm-yyyy"
              />
            ) : null}
          </div>
        </div>
        <div className="form-group text-left col-lg-12 col-xl-12 col-md-12 col-sm-12">
          <div className="floating-label-group inputDiv PR" onChange={onChangeDate} >
            <label className="mb-0">Check Out</label>
            <input
              className="form-control checkincustometime ltr-none text-center"
              value={moment(endDate).format("YYYY-MM-DD")}
              readOnly="readonly"
              name="room_check_out"
              id="eventEndDate"
              onClick={onClickEnd}
            />
            {showEndCalendar ? (
              <DatePicker
                onChange={onChange}
                selected={endDate}
                minDate={endMinDate}
                onChange={handleEndDateSelect}
                format="dd-mm-yyyy"
              />
              
            ) : null}
            <CgCalendarDates
              size="30"
              className="datepicker_icon_special"
              onClick={onClickEnd}
            />
          </div>
        </div>
      </>
  );
};

export default CustomCalendar;
