import React from "react";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

import { myURL } from "../../../../Configuration/config_url";
import moment from "moment";

const PrintBooking = React.forwardRef((props, ref) => {
  // console.log(props.bookingData);
  // This below code is to show special cancellation policy only once if same room type has used same rate plan START
  let isAllRoomTypeAreSame = 0;
  let isAllRoomTypeUsedSameRatePlan = 0;
  let isAllSpecialHoursAreSame = 0;

  let roomTypeNameArr = [];
  let ratePlanNameArr = [];
  let specialCancellationPolicyHour = [];

  for (let r = 0; r < parseInt(props.bookingData[0].no_of_rooms); r++) {
    if (props.bookingData[r].room_type_name) {
      roomTypeNameArr.push(props.bookingData[r].room_type_name);
    }

    if (props.bookingData[r].payment[0].discount_details.discount_data.id) {
      ratePlanNameArr.push(
        props.bookingData[r].payment[0].discount_details.discount_data.id
      );
    }

    if (props.bookingData[r].specialCancellationPolicyHour) {
      if (props.bookingData[r].payment[0].discount_details.discount_data.id === "") {
        specialCancellationPolicyHour.push(
          props.bookingData[r].specialCancellationPolicyHour
        );
      }
    }
  }

  // function to get number of unique elements in an array
  const countUnique = (iterable) => {
    return new Set(iterable).size;
  };
  if (roomTypeNameArr.length > 0) {
    if (countUnique(roomTypeNameArr)) {
      isAllRoomTypeAreSame = 1;
    }
  }

  if (
    ratePlanNameArr.length > 0 &&
    ratePlanNameArr.length === roomTypeNameArr.length
  ) {
    if (countUnique(ratePlanNameArr) !== ratePlanNameArr.length) {
      isAllRoomTypeUsedSameRatePlan = 1;
    }
  }

  if (
    specialCancellationPolicyHour.length > 0 &&
    specialCancellationPolicyHour.length === roomTypeNameArr.length
  ) {
    if (
      countUnique(specialCancellationPolicyHour) !==
      specialCancellationPolicyHour.length
    ) {
      isAllSpecialHoursAreSame = 1;
    }
  }

  // This below code is to show special cancellation policy only once if same room type has used same rate plan END

  let isCustomCancellationPresent = 0;
  let isSpecialCancellationPresent = 0;

  let tmp = props.bookingData[0].primaryPhoneNumber;
  let myarr = tmp.split("-");
  let tmparr = myarr[0].split("/");

  let tmpFax = props.bookingData[0].faxPhoneNumber;
  let myarrFax = tmpFax.split("-");
  let tmparrFax = myarrFax[0].split("/");

  let roomsHTML = [];
  let taxHTML = "";
  let specialCancelHTML = [];
  let addOnListsHTML = [];
  // let total = 0;
  for (let r = 0; r < parseInt(props.bookingData[0].no_of_rooms); r++) {
    let guestName = props.bookingData[r].guest_name.split(" ");
    let total = parseFloat(props.bookingData[r].payment[0].total);
    let tax = parseFloat(
      (total * parseFloat(props.bookingData[r].tax)) / 100
    ).toFixed(2);

    let otherDiscountRatePlanName =
      props.bookingData[r].payment[0].discount_details.discount_data.name;

    if (
      props.bookingData[r].payment[0].discount_details.discount_data.type === "apd"
    ) {
      otherDiscountRatePlanName = "Advance Purchase";
    }
    if (props.bookingData[r].payment[0].discount_details.discount_data.type === "standard" || props.bookingData[r].payment[0].discount_details.discount_data.type === "standard_package") {
      otherDiscountRatePlanName = "Best Standard Online Rate";
    }
    if (props.bookingData[r].payment[0].discount_details.discount_data.type === "standard_strike") {
      otherDiscountRatePlanName = "";
    }

    let additional_fees = parseInt(props.bookingData[r].payment[0].add_fees);

    if (additional_fees > 0) {
      let nightlyFeesHTML = "";
      let oneTimeFeesHTML = "";
      taxHTML = "";
      let nightlyFeesTotal = parseFloat(
        props.bookingData[r].payment[0].nightlyFeeTotal
      );
      let oneTimeFeesTotal = parseFloat(
        props.bookingData[r].payment[0].oneTimeFeeTotal
      );

      if (nightlyFeesTotal > 0) {
        nightlyFeesHTML =
          props.bookingData.additionaFeesDetails.nightly !== ""
            ? props.bookingData.additionaFeesDetails.nightly
            : "Nightly Fees";
        taxHTML += ` + <strong>${nightlyFeesHTML}</strong>(${props.currency + parseFloat(nightlyFeesTotal).toFixed(2)
          })`;
      }
      if (oneTimeFeesTotal > 0) {
        oneTimeFeesHTML =
          props.bookingData.additionaFeesDetails.onetime !== ""
            ? props.bookingData.additionaFeesDetails.onetime
            : "One time Fees";
        taxHTML += ` + <strong>${nightlyFeesHTML}</strong>(${props.currency + parseFloat(oneTimeFeesTotal).toFixed(2)
          })`;
      }
    } else {
      taxHTML = `<p><strong>Tax (${parseFloat(props.bookingData[r].tax).toFixed(
        2
      )}):</strong> ${props.currency + tax}</p>`;
    }

    let totalWithOther = parseFloat(
      parseFloat(total) + parseFloat(tax) + parseFloat(additional_fees)
    ).toFixed(2);

    roomsHTML.push(`
    <thead>
      <tr style='border-bottom:none; background:#d7d4d4'>
        <th colspan="2" class="tableHeading" style='border:none' >
          Room ${r + 1}: <span>${props.bookingData[r].room_type_name}</span>
        </th>
        <th class="tableHeading" style='border:none'>
          Adults: <span>${props.bookingData[r].no_of_adults}</span>
        </th>
        <th class="tableHeading" style='border:none'>
          Children: <span>${props.bookingData[r].no_of_childs}</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row" class="tableHeading" style='border-right:none'>
        First Name:
        </th>
        <td style='border-left:none'>${guestName[0]}</td>
        <th class="tableHeading" style='border-right:none'}>Last Name:</th>
        <td style='border-left:none'>${guestName[1]}</td>
      </tr>
      <tr>
        <td colspan="2" class="tableHeading">Date:</td>
        <td colspan="2">${props.bookingData[r].payment[0].charged_day}</td>
      </tr>
      <tr>
        <td colspan="2" class="tableHeading">Rate:</td>
        <td colspan="2">${props.currency + parseFloat(props.bookingData[r].payment[0].total).toFixed(2)
      } </td>
      </tr>
      <tr>
        <td colspan="2" style='font-weight:600'>
          Sub-Total: <span style='font-weight:400'>${parseFloat(total).toFixed(2)}</span>(${otherDiscountRatePlanName})
          <p class="m-0" style='font-weight:600'>
            Tax (${parseFloat(props.bookingData[r].tax).toFixed(2)}%):
            <span style='font-weight:400'>${props.currency + tax + taxHTML
      }</span> = Total:
            <span style='font-weight:400'>${props.currency + totalWithOther}</span>
          </p>
        </td>
        <td colspan="2" style='font-weight:600;verticalAlign:middle'>
          Note:
          <span style='font-weight:400'>
            Rates include Extra Person/Child Fees
          </span>
        </td>
      </tr>
    </tbody>
    `);
  }

  // special cancellation policy START
  for (let r = 0; r < parseInt(props.bookingData[0].no_of_rooms); r++) {
    if (
      props.bookingData[r].payment[0].discount_details.discount_data
        .customCancellationHour !== ""
    ) {
      isCustomCancellationPresent = 1;
      specialCancelHTML.push(`
        <div class="col-12 FS14">
          <p class="mb-0 tableHeading">
            Special Cancellation Policy For
            <span class="tableSubHeading">Room ${r + 1}: ${props.bookingData[r].room_type_name}</span>
          </p>
          <ul class="p-0" style='list-style:none'>
            <li class="tableHeading">
              Cancellation Hours:
              <span class="tableSubHeading">
              ${parseInt(
        props.bookingData[r].payment[0].discount_details.discount_data
          .customCancellationHour
      ) <= 72
          ? props.bookingData[r].payment[0].discount_details.discount_data
            .customCancellationHour + " Hour"
          : parseInt(
            props.bookingData[r].payment[0].discount_details.discount_data
              .customCancellationHour
          ) /
          24 +
          " Day"
        }
              </span>
            </li>
            <li class="tableHeading">
              Description: <span class="tableSubHeading">${props.bookingData[r].payment[0].discount_details.discount_data
          .custom_cancellation_desc
        }</span>
            </li>
          </ul>
        </div>
      `);
    } else if (props.bookingData[r].specialCancellationPolicyHour !== "") {
      isSpecialCancellationPresent = 1;
      specialCancelHTML.push(`
        <div class="col-12 FS14">
          <p class="mb-0 tableHeading">
            Special Cancellation Policy For
            <span class="tableSubHeading">
            ${isAllRoomTypeAreSame !== 1 || isAllSpecialHoursAreSame !== 1
          ? "Room" + (r + 1) + ":"
          : null
        }
            ${props.bookingData[r].room_type_name}</span>
          </p>
          <ul class="p-0" style='list-style:none'>
            <li class="tableHeading">
              Cancellation Hours:
              <span class="tableSubHeading">
              ${parseInt(props.bookingData[r].specialCancellationPolicyHour) <= 72
          ? props.bookingData[r].specialCancellationPolicyHour + " Hour"
          : parseInt(props.bookingData[r].specialCancellationPolicyHour) /
          24 +
          " Day"
        }
              </span>
            </li>
            <li class="tableHeading">
              Description: <span class="tableSubHeading">${props.bookingData[r].specialCancellationPolicyDesc
        }</span>
            </li>
          </ul>
        </div>
      `);
    }

    if (isAllRoomTypeAreSame === 1 && isAllRoomTypeUsedSameRatePlan === 1) {
      break;
    } else if (isAllRoomTypeAreSame === 1 && isAllSpecialHoursAreSame === 1) {
      break;
    }
  }
  // special cancellation policy END

  // addon Lists START
  if (props.bookingData.addOnList) {
    let tmpHTML = '';
    Object.values(props.bookingData.addOnList).map(addonVal => {
      let addOnHTML = `<table class="table table-bordered FS14" style='border-top: none; border-left: none; border-right: none'>
                          <thead>
                            <tr style='border-bottom: none; background: #d7d4d4;'>
                              <td colspan="1" class="text-left tableHeading"> Add On - <span>${addonVal.addon_name}</span></td>
                            </tr>
                          </thead>
                          <tbody style='text-align:center'>`;

      if (addonVal.addon_used_days && addonVal.addon_type === 'per_person') {
        addOnHTML += `<tr >
                        <th scope="row" class="tableHeading"> Rate: </th>
                        <td colspan="2">${parseFloat(addonVal.addon_price).toFixed(2)}</td>
                      </tr>`;
      } else if (addonVal.addon_used_days) {
        addOnHTML += `<tr >
                        <th scope="row" class="tableHeading"> Date: </th>`;
        Object.values(addonVal.addon_used_days).map(addonDayVal => {
          addOnHTML += `<td colspan="2">${moment(addonDayVal.addon_charge_date).format('MMM D')}</td>`
        });
        addOnHTML += `</tr>`;
      } else {
        addOnHTML += `<tr >
                        <th scope="row" class="tableHeading"> Rate: </th>
                        <td colspan="2">${parseFloat(addonVal.addon_price_without_quantity_tax).toFixed(2)}</td>
                      </tr>`;
      }

      // 2nd row
      if (addonVal.addon_used_days && addonVal.addon_type === 'per_person') {
        addOnHTML += `<tr>
                        <th scope="row" class="tableHeading"> Quantity Used: </th>
                        <td colspan="2">${parseFloat(addonVal.addon_total_price / addonVal.addon_price).toFixed(2)}</td>
                      </tr>`;
      } else if (addonVal.addon_used_days) {
        Object.values(addonVal.addon_used_days).map(addonDayVal => {
          addOnHTML += `<tr>
                          <th scope="row" class="tableHeading"> Rate: </th>
                          <td colspan="2">${props.currency + parseFloat(addonVal.addon_total_price).toFixed(2)}</td>
                        </tr>`
        });
        Object.values(addonVal.addon_used_days).map(addonDayVal => {
          addOnHTML += `<tr>
                          <th scope="row" class="tableHeading"> Quantity Used: </th>
                          <td colspan="2">${(parseInt(addonVal.addon_quantity) > 0) ? addonVal.addon_quantity : props.bookingData[0].no_of_rooms}</td>
                        </tr>`
        });
      } else {
        addOnHTML += `<tr>
                        <th scope="row" class="tableHeading"> Quantity Used: </th>
                        <td colspan="2">${(parseInt(addonVal.addon_quantity) > 0) ? addonVal.addon_quantity : props.bookingData[0].no_of_rooms}</td>
                      </tr>`;
      }
      // 2nd row end

      if (parseFloat(addonVal.addon_tax) > 0) {
        let addon_subtotal = parseFloat(addonVal.addon_total_with_tax) - parseFloat(addonVal.addon_tax)
        tmpHTML += `<strong>Sub-Total:</strong> <span style='font-weight:400'>${props.currency + parseFloat(addon_subtotal).toFixed(2)}</span> <br/>`;
      }

      let tmp = ''
      if (parseFloat(addonVal.addon_tax) > 0) {
        tmp += `<strong>Tax(${parseFloat(addonVal.addon_tax_percent).toFixed(2)}%)</strong> ${parseFloat(addonVal.addon_tax).toFixed(2)} =`;
      }
      tmpHTML += `${tmp} <strong>${props.currency + parseFloat(addonVal.addon_total_with_tax).toFixed(2)}</strong>`

      addOnHTML += `<tr> <td colspan="4" class="text-left">${tmpHTML}</td> </tr>`;
      tmpHTML = '';

      addOnHTML += `</tbody>
                  </table>`;

      addOnListsHTML.push(addOnHTML);
    })
  }
  // addon Lists END

  return (
    <>
      <div className="bookingParentDiv mt-5" id="bookingParentDivs" ref={ref}>
        <div className="col-12 FS14">
          <table className="table table-bordered FS14">
            <tbody>
              <tr>
                <td colSpan="2" className="text-center">
                  <img
                    src={`${myURL}/css/standalone_css/${props.api_data.api_theme}_images/logonew.jpg`}
                    className=""
                    height="80"
                    width="80"
                    alt={props.property_details.property_name}
                    title={props.property_details.property_name}
                    loading="lazy"
                  />
                </td>
                <td colSpan="2" className="printPage">
                  <p className="m-0">{props.property_details.property_name}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-12 row FS14">
          <div className="col-6 text-center align-self-center">
            <p>
              <strong className="tableHeading rahul">Attn: </strong>
              {props.bookingData[0].booking_name}
            </p>
            <p>
              <strong className="tableHeading">Subject:</strong> Booking
              Confirmation
            </p>
          </div>
          <div className="col-6">
            <ul className="list-group text-center">
              <li className="list-group-item">Reservation Confirmation</li>
              <li className="list-group-item">{props.bookingData[0].folio_number}</li>
              <li className="list-group-item">
                Created:
                <span>
                  {moment(props.bookingData[0].booking_date).format("MM/DD/YYYY HH:mm:ss")}
                </span>
                GMT
              </li>
            </ul>
          </div>
        </div>
        <div className="col-12 FS14">
          <p className="mt-3" style={{ fontSize: "14px" }}>
            We have received reservation for {props.bookingData[0].booking_name},
            Checking In on
            {moment(props.bookingData[0].arrival_date).format("MMMM DD, YYYY")}. If
            you have any questions regarding this reservation, please contact
            INNkeeper at Tel: {tmparr[1] + " " + myarr[1] + "-" + myarr[2]},
            Fax: {tmparrFax[1] + " " + myarrFax[1] + "-" + myarrFax[2]},
            {props.bookingData[0].skype &&
              ReactHtmlParser(` Skype: ${props.bookingData[0].skype} `)}
            or email: <Link>{props.bookingData[0].email}</Link>
          </p>

          <span className="mt-3">Thank You,</span>
          <p>{props.property_details.property_name}</p>
        </div>
        <div className="col-12 FS14">
          <table
            className="table table-bordered FS14"
            style={{
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
            }}
          >
            <thead>
              <tr>
                <th
                  className="tableHeading"
                  style={{ borderBottom: "none", background: "#d7d4d4" }}
                >
                  Billing Info
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="tableHeading">
                  Booked by:
                </th>
                <td>{props.bookingData[0].booking_name}</td>
                <th className="tableHeading">State:</th>
                <td>{props.bookingData[0].billing_state}</td>
              </tr>
              <tr>
                <th scope="row" className="tableHeading">
                  Address:
                </th>
                <td>{props.bookingData[0].billing_address}</td>
                <th className="tableHeading">Zip code:</th>
                <td>{props.bookingData[0].billing_zipcode}</td>
              </tr>
              <tr>
                <th scope="row" className="tableHeading">
                  City:
                </th>
                <td>{props.bookingData[0].billing_city}</td>
                <th className="tableHeading">Country:</th>
                <td>{props.bookingData[0].billing_country}</td>
              </tr>
              <tr>
                <th scope="row" className="tableHeading">
                  Email ID:
                </th>
                <td>{props.bookingData[0].billing_email}</td>
                <th className="tableHeading">Telephone Number:</th>
                <td>{props.bookingData[0].billing_phone_number}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-12 FS14">
          <table
            className="table table-bordered FS14"
            style={{
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
            }}
          >
            <thead>
              <tr>
                <th
                  className="tableHeading"
                  style={{ borderBottom: "none", background: "#d7d4d4" }}
                >
                  Reservation Details
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="tableHeading">
                  Number of Rooms:
                </th>
                <td>{props.bookingData[0].no_of_rooms}</td>
                <th className="tableHeading">Number of Nights:</th>
                <td>{props.bookingData[0].stay_days}</td>
              </tr>
              <tr>
                <th scope="row" className="tableHeading">
                  Check In Date:
                </th>
                <td>
                  {moment(props.bookingData[0].arrival_date).format("MM/DD/YYYY")}
                </td>
                <th className="tableHeading">Check Out Date:</th>
                <td>
                  {moment(props.bookingData[0].departure_date).format("MM/DD/YYYY")}
                </td>
              </tr>
              <tr>
                <th scope="row" className="tableHeading">
                  Booking Source:
                </th>
                <td>{props.bookingData[0].booking_source}</td>
                <th className="tableHeading">Grand Total:</th>
                <td>
                  {props.currency +
                    parseFloat(props.bookingData[0].total_charge).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-12 FS14 hello">
          <table className="table table-bordered FS14">
            {ReactHtmlParser(roomsHTML)}
          </table>
        </div>
        <div className="col-12 FS14">
          {ReactHtmlParser(addOnListsHTML.join(""))}
        </div>
        <div className="col-12 FS14">
          <table className="table table-bordered FS14">
            {props.bookingData[0].special_instructions && (
              <>
                <thead>
                  <tr style={{ borderBottom: "none", background: "#d7d4d4" }}>
                    <td colSpan="1" className="text-left tableHeading"> <span>Special Breakfast</span></td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="1">{props.bookingData[0].special_instructions}</td>
                  </tr>
                </tbody>
              </>
            )}
          </table>
        </div>

        {props.bookingData[0].dietary_restrictions && <>
          <div className="col-12 FS14">
            <table className="table table-bordered FS14">
              <thead>
                <tr style={{ borderBottom: "none", background: "#d7d4d4" }}>
                  <td colSpan="1" className="text-left tableHeading"><span>Dietary Restrictions</span></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="1">{props.bookingData[0].dietary_restrictions}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>}

        {props.bookingData[0].estimated_checkin && <>
          <div className="col-12 FS14">
            <table className="table table-bordered FS14">
              <thead>
                <tr style={{ borderBottom: "none", background: "#d7d4d4" }}>
                  <td colSpan="1" className="text-left tableHeading"><span>Estimated Time of Arrival</span></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="1">{moment(new Date('2022-04-25 ' + props.bookingData[0].estimated_checkin)).format("h:mm A")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>}

        {ReactHtmlParser(specialCancelHTML.join(""))}
      </div>
    </>
  );
});

export default PrintBooking;