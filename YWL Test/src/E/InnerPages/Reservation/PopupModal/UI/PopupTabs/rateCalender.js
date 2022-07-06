import React from "react";
import ReactHtmlParser from "react-html-parser";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";
import { BsInfoCircleFill } from "react-icons/bs";
import "./pop.scss";
import { Link } from "react-router-dom";

function rateCalender({
  valueRoomType,
  input_params,
  i,
  isStandardDiscountNotExists,
  currency,
  convertPrice,
}) {
  // console.log(input_paramfygfuiugfjugfs)

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const headings = new Array("Sun", "Mon", "Tues", "Wed", "Thus", "Fri", "Sat");

  let endDate =
    valueRoomType.week_dates_date[
      Object.keys(valueRoomType.week_dates_date)[
        Object.keys(valueRoomType.week_dates_date).length - 1
      ]
    ];

  let titleStartDay =
    headings[new Date(valueRoomType.week_dates_date[0]).getDay()];
  let titleStartMonth =
    monthNames[new Date(valueRoomType.week_dates_date[0]).getMonth()];
  let titleStartDate = new Date(valueRoomType.week_dates_date[0]).getDate();
  let titleStartYear = new Date(valueRoomType.week_dates_date[0]).getFullYear();

  let titleEndDay = headings[new Date(endDate).getDay()];
  let titleEndMonth = monthNames[new Date(endDate).getMonth()];
  let titleEndDate = new Date(endDate).getDate();
  let titleEndYear = new Date(endDate).getFullYear();

  let month_checkin =
    monthNames[new Date(valueRoomType.week_dates_date[0]).getMonth()];
  let year_checkin = new Date(endDate).getFullYear();

  let days_in_month = valueRoomType.week_dates_date.length;
  let days_in_this_week = 1;
  let day_counter = 0;
  let dates_array = [];

  let date_from = new Date(valueRoomType.week_dates_date[0]);
  let date_to = new Date(endDate);
  let dayCheckIn = titleStartDay;

  let running_day = 0;
  switch (dayCheckIn) {
    case "Sun":
      running_day = 0;
      break;
    case "Mon":
      running_day = 1;
      break;
    case "Tues":
      running_day = 2;
      break;
    case "Wed":
      running_day = 3;
      break;
    case "Thus":
      running_day = 4;
      break;
    case "Fri":
      running_day = 5;
      break;
    case "Sat":
      running_day = 6;
  }

  let weekDaysTitle = "";
  for (let h = 0; h < headings.length; h++) {
    weekDaysTitle += `<td class="calendar-day-head text-center">${headings[h]}</td>`;
  }

  let blankSpace = "";
  for (let x = 0; x < running_day; x++) {
    blankSpace += `<td class="calendar-day-np"></td>`;
  }

  // calendar body START
  let v = 0;
  let discountRate = 0;
  let rateCalendarClass = "";
  let calendarBody = `<tr class="calendar-row">`;

  calendarBody += blankSpace;

  Object.values(valueRoomType.week_dates_date).map((date, k) => {
    discountRate = valueRoomType.week_dates[v];
    if (input_params.promo_code !== "" && input_params.promo_code !== null) {
      discountRate = valueRoomType.week_discount_rate[v];
    } else if (isStandardDiscountNotExists === 0) {
      discountRate = valueRoomType.week_discount_rate[v];
    }

    if (
      new Date(input_params.room_check_in) <=
        new Date(valueRoomType.week_dates_date[v]) &&
      new Date(input_params.room_check_out) >
        new Date(valueRoomType.week_dates_date[v])
    ) {
      rateCalendarClass = 'style="background:#b7b7b7"';
    } else {
      rateCalendarClass = "";
    }

    calendarBody += `
      <td class="calendar-day">
        <div class="text-center rateCalCont" ${rateCalendarClass}>
          ${new Date(date).getDate()}
          <div style="line-height:30px">${currency + discountRate}</div>
        </div>
      </td>
    `;
    if (running_day === 6) {
      calendarBody += `</tr>`;
      if (day_counter + 1 != days_in_month) {
        calendarBody += `<tr class="calendar-row">`;
      }
      running_day = -1;
      days_in_this_week = 0;
    }

    days_in_this_week++;
    running_day++;
    day_counter++;
    v++;
  });

  if (days_in_this_week < 8) {
    for (let x = 1; x <= 8 - days_in_this_week; x++) {
      calendarBody += `<td class="calendar-day-np"></td>`;
    }
  }

  calendarBody += `</tr>`;
  // calendar body END

  let price = 0;
  if (input_params.promo_code !== "" && input_params.promo_code !== null) {
    price =
      parseFloat(convertPrice) * parseFloat(valueRoomType.avg_discount_rate);
  } else {
    price =
      parseFloat(convertPrice) * parseFloat(valueRoomType.avg_rate[i - 1]);
  }

  return (
    <div className="container">
      <div className="RateCalenderCards">
        <p className="text-center">
          ({titleStartDay}) {titleStartMonth} {titleStartDate} {titleStartYear}{" "}
          - ({titleEndDay}) {titleEndMonth} {titleEndDate} {titleEndYear}
        </p>

        <table
          cellpadding="0"
          cellspacing="0"
          className="calendar"
          style={{
            width: "90%",
            margin: "0 auto",
            minWidth: "500px",
            overflowX: "scroll",
          }}
        >
          <tr className="calendar-row">{ReactHtmlParser(weekDaysTitle)}</tr>

          {ReactHtmlParser(calendarBody)}
        </table>

        <div className="col-lg-12 col-xs-12 text-center">
          <div className="overlaydiv col-lg-12">
            <OverlayTrigger
              delay={{ hide: 150, show: 300 }}
              overlay={(props) => (
                <Tooltip {...props}>
                  Avg Rate | Rate published are per room/unit and include all
                  extra person fees. Rates do NOT include taxes or service fees
                  select a room and you will see the total cost displayed in
                  step 4
                </Tooltip>
              )}
              placement="top"
            >
              <Link>
                <BsInfoCircleFill size="16" /> Avg Rate
              </Link>
            </OverlayTrigger>
            <span> {currency + price.toFixed(2)} </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default rateCalender;
