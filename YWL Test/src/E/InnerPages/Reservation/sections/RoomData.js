import React, { useState, useEffect, useContext } from "react";

import { useRecoilValue } from "recoil";
import ReactHtmlParser from "react-html-parser";
// import { ReservationContext } from "../MainReservation";

import { FaSmokingBan } from "react-icons/fa";
import { BiHandicap } from "react-icons/bi";
import { ImWarning } from "react-icons/im";

//sections import
import RoomSelectButton from "./RoomSelectButton";
import RoomPromotionalCodes from "./RoomPromotionalCodes";
import OtherRatePlansButton from "./OtherRatePlansButton";
import RoomImage from "./RoomImage";
// import NotAvailableRooms from "./NotAvailableRooms";

import { propertyDataSelector } from "../../../../Recoil/themeModule";
import PopModal from "../../../InnerPages/Reservation/PopupModal/UI/PopModal";
import RatePolicyModal from "./popups/RatePolicyModal";
import RoomTotalModal from "./popups/RoomTotalModal";
import Backdrop from "./popups/backdrop";
import SimpleReactLightbox from "simple-react-lightbox";
import { FaPlus } from "react-icons/fa";
import "./popups/index.css";
import "./RoomData.scss";
const RoomData = ({
  data,
  input_params,
  no_of_nights,
  property_details,
  convertPrice,
  i,
  keyRoomType,
  additionalFee,
  oneTimeFeeName,
  oneTimeFee,
  nightlyFeeName,
  nightlyFee,
  addOnDetails,
  updateGrandTotal,
  showDiscountDiv,
  baseRef,
  otherRatePlanRef,
  promoNamesRef,
  policies,
  splCancelPolicy,
  avg_discount_rateRef,
  avg_rateRef,
  week_dates_dateRef,
  week_dates_rateRef,
  special_cancellation_policyRef,
  special_cancellation_policy_descRef,
  currencySign,
  checkAvailabilityData
}) => {
  // const contentContext = useContext(ReservationContext);

  const [opensCollapse, setOpensCollapse] = useState(false);
  function handleChangeOne(i) {
    avg_discount_rateRef.current[i + 1].focus();
  }

  function handleChangeTwo(i) {
    avg_rateRef.current[i + 1].focus();
  }

  function handleChangeThree(i) {
    week_dates_dateRef.current[i + 1].focus();
  }

  function handleChangeFour(i) {
    week_dates_rateRef.current[i + 1].focus();
  }

  function handleChangeFive(i) {
    otherRatePlanRef.current[i + 1].focus();
  }
  function handleChangeSix(i) {
    promoNamesRef.current[i + 1].focus();
  }

  function handleChangeSeven(i) {
    special_cancellation_policyRef.current[i + 1].focus();
  }
  function handleChangeEight(i) {
    special_cancellation_policy_descRef.current[i + 1].focus();
  }

  const propertyData = useRecoilValue(propertyDataSelector);
  const [error, setError] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [roomTotalOpen, setRoomTotal] = useState(false);

  let isRoomAvailableToBook = false;
  let description = "";
  let idPostfix = i.toString() + (keyRoomType + 1).toString();
  let BestDiscountName = "";
  // let currency = "$";
  let currency = currencySign;
  let refundable = "";
  let promoNightStay = "";
  let total = 0;
  let showStrikeThroughPrice = false;
  let roomBaseRate = 0;
  let roomBaseDiscountRate = 0;
  let reservationTypeViewText = "Per Night <br/> Excluding Taxes & Fees";
  let roomCountHiddenInput = "";
  let nextId = "";
  let selectButtonDiv = "";
  let selectButtonArray = [];
  let selectButtonHiddenArray = [];
  let isNotAvailableRoomType = 0;
  let isPromotionalCodeAvailable = 0;
  let promoCodeHTML = [];
  let moreButtonHTML = "";
  let promoCounterText = 0;
  let promoCount = 0;
  let promoByURL = 0;
  let roomTypeAssignedToRatePlanHidden = "";
  let splCancelHiddenInputs = "";
  let ratePolicyTitle = data.name;
  let ratePolicyDesc = "";
  let ratePolicyPolicy = "";
  let ratePolicyCustomPolicy = "";
  let ratePolicyCustomHour = "";
  let ratePolicyCustomText = "";
  let roomTotalData = {};
  let tmpNotAvailArray = [];
  let tmpNotAvailRoom = [];

  // base rate policy popup content if no RACK or PHANTOM rate exists
  if (propertyData.cancel_hours) {
    ratePolicyCustomHour = parseInt(propertyData.cancel_hours);
    ratePolicyCustomPolicy = propertyData.cancellation_policy;
  }

  function showMoreDetailsPopup(popup) {
    document.getElementById(popup).click();
  }

  function addUserHandler() {
    if (true) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }
  }

  const errorHandler = () => {
    console.log(error);
    setError(null);
  };

  function ratePolicyShow() {
    setModalIsOpen(true);
  }

  function ratePolicyHide() {
    setModalIsOpen(false);
  }

  function roomTotalShow() {
    setRoomTotal(true);
  }

  function roomTotalHide() {
    setRoomTotal(false);
  }

  function scrollWindow(id) {
    let scrollToNextRoom = document.getElementById(id);
    scrollToNextRoom.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });
  }

  if (data.description) {
    // removing HTML tags from description
    const regex = /(<([^>]+)>)/gi;
    description = data.description.replace(regex, "").trim();
  }

  // vacant text
  let vacantText = "";
  if (data.vacant_rooms > 0 && data.vacant_rooms < 5) {
    vacantText = `<p className="text-danger" id="roomLeftText${i}${
      data.id
    }">Only ${data.vacant_rooms} 
    ${data.vacant_rooms == 1 ? "Room" : "Rooms"} left</p>`;
  }

  // special cancellation policy inputs
  if (splCancelPolicy) {
    Object.values(splCancelPolicy).map((spl, k) => {
      if (spl.room_type_id === data.id) {
        splCancelHiddenInputs = (
          <div key={k}>
            <input
              type="hidden"
              id={"special_cancellation_policy_" + spl.room_type_id}
              name={"special_cancellation_policy_" + spl.room_type_id}
              defaultValue={spl.no_of_days}
              ref={(ref) => special_cancellation_policyRef.current.push(ref)}
              onChange={() => handleChangeSeven(i)}
            />
            <input
              type="hidden"
              id={"special_cancellation_policy_desc_" + spl.room_type_id}
              name={"special_cancellation_policy_desc_" + spl.room_type_id}
              defaultValue={spl.cancellation_desc}
              ref={(ref) =>
                special_cancellation_policy_descRef.current.push(ref)
              }
              onChange={() => handleChangeEight(i)}
            />
          </div>
        );
        ratePolicyCustomPolicy = spl.cancellation_desc;
        ratePolicyCustomHour = spl.no_of_days;
        ratePolicyTitle = data.name;
        ratePolicyCustomText = "Best Standard Online Rate";
      }
    });
  }

  // global variables
  let totalGuests = 0;
  let extraAdultCharge =
    convertPrice * data.extra_charges[i - 1].extra_adult_charge;
  let extraChildCharge =
    convertPrice * data.extra_charges[i - 1].extra_child_charge;
  let isStandardDiscountNotExists = 1;

  if (input_params.promo_code === "") {
    isRoomAvailableToBook = true;

    isStandardDiscountNotExists = 1;
    roomBaseDiscountRate = convertPrice * parseFloat(data.avg_rate[i - 1]);

    if (
      data.promo_codes_available !== "" &&
      data.promo_codes_available !== null
    ) {
      Object.values(data.promo_codes_available).map(
        (val_standard_discount, key_standard_discount) => {
          if (
            data.is_available === "Y" &&
            val_standard_discount.is_available === "Y" &&
            (val_standard_discount.type === "standard" ||
              val_standard_discount.type === "standard_package")
          ) {
            isStandardDiscountNotExists = 0;
            BestDiscountName = "Best Standard Online Rate";

            roomTypeAssignedToRatePlanHidden = `<input type="hidden" value=${
              val_standard_discount.room_type
            } id=${
              "roomTypeAssignedToRatePlan" + val_standard_discount.pc_id
            } />`;

            let isDealApplied = 0;
            let roomBaseCharge = convertPrice * parseInt(data.avg_rate[i - 1]);

            let dicount = "";
            let roomDiscountCharge = 0;
            if (val_standard_discount.type === "standard") {
              if (val_standard_discount.pc_percent !== "0.00") {
                dicount = val_standard_discount.pc_percent + "%";

                roomDiscountCharge =
                  (parseFloat(data.avg_rate[i - 1]) *
                    parseFloat(val_standard_discount.pc_percent)) /
                  100;
                roomDiscountCharge =
                  parseFloat(data.avg_rate[i - 1]) - roomDiscountCharge;
              } else if (val_standard_discount.pc_amount !== "0.00") {
                dicount =
                  currency +
                  convertPrice * parseFloat(val_standard_discount.pc_amount);

                roomDiscountCharge = parseFloat(data.avg_rate[i - 1]);
                roomDiscountCharge =
                  parseFloat(data.avg_rate[i - 1]) -
                  parseFloat(val_standard_discount.pc_amount);
              }

              if (roomDiscountCharge < 0) {
                roomDiscountCharge = 0;
              }
            } else if (val_standard_discount.type === "standard_package") {
              if (val_standard_discount.pc_percent !== "0.00") {
                dicount = val_standard_discount.pc_percent + "%";

                roomDiscountCharge =
                  (parseFloat(data.avg_rate[i - 1]) *
                    parseFloat(val_standard_discount.pc_percent)) /
                  100;
                roomDiscountCharge =
                  parseFloat(data.avg_rate[i - 1]) + roomDiscountCharge;
              } else if (val_standard_discount.pc_amount !== "0.00") {
                dicount =
                  currency +
                  convertPrice * parseFloat(val_standard_discount.pc_amount);

                roomDiscountCharge = parseFloat(data.avg_rate[i - 1]);
                roomDiscountCharge =
                  parseFloat(data.avg_rate[i - 1]) +
                  parseFloat(val_standard_discount.pc_amount);
              }
            }

            roomDiscountCharge = convertPrice * roomDiscountCharge;

            if (val_standard_discount.is_refundable === "1") {
              refundable = `<p className"text-danger">Non-Refundable</p>`;
            } else {
              refundable = "";
            }

            if (
              !(
                val_standard_discount.is_available === "Y" &&
                parseInt(no_of_nights) >=
                  parseInt(val_standard_discount.min_nights) &&
                parseInt(no_of_nights) <=
                  parseInt(val_standard_discount.max_nights)
              )
            ) {
              if (
                parseInt(no_of_nights) >=
                parseInt(val_standard_discount.min_nights)
              ) {
                promoNightStay = `<div className"F14 red-text text-left text-xs-center">${data.name} is only available for a Minimum stay of ${val_standard_discount.min_nights} Night</div>`;
              } else if (
                parseInt(no_of_nights) <=
                parseInt(val_standard_discount.max_nights)
              ) {
                promoNightStay = `<div className"F14 red-text text-left text-xs-center">${data.name} is only available for a Maximum stay of ${val_standard_discount.max_nights} Night</div>`;
              } else {
                promoNightStay = "";
              }
            }

            // policy modal HERE
            ratePolicyTitle = BestDiscountName;
            ratePolicyDesc = val_standard_discount.rate_plan_desc;
            ratePolicyPolicy = val_standard_discount.rate_plan_policy;
            if (val_standard_discount.customCancellationHour !== "") {
              ratePolicyCustomPolicy =
                val_standard_discount.custom_cancellation_desc;
              ratePolicyCustomHour =
                val_standard_discount.customCancellationHour;
              ratePolicyCustomText = "Best Standard Online Rate";
            }

            let totalAmountIncludingAllTaxes = 0;
            let extraAdultChargeForDiscount = extraAdultCharge;
            let extraChildChargeForDiscount = extraChildCharge;
            let nightlyFeeForDiscount = convertPrice * nightlyFee;
            let oneTimeFeeForDiscount = convertPrice * oneTimeFee;

            totalAmountIncludingAllTaxes =
              roomDiscountCharge * no_of_nights +
              extraAdultChargeForDiscount * no_of_nights +
              extraChildChargeForDiscount * no_of_nights;
            let propertyTaxAmountForDiscount =
              (parseFloat(totalAmountIncludingAllTaxes) *
                parseFloat(data.room_tax_percentile)) /
              100;
            totalAmountIncludingAllTaxes =
              totalAmountIncludingAllTaxes + propertyTaxAmountForDiscount;
            totalAmountIncludingAllTaxes =
              totalAmountIncludingAllTaxes +
              nightlyFeeForDiscount / parseInt(input_params.no_of_rooms);
            totalAmountIncludingAllTaxes =
              totalAmountIncludingAllTaxes +
              oneTimeFeeForDiscount / parseInt(input_params.no_of_rooms);

            // price room total modal HERE
            roomTotalData["roomDiscountCharge"] = roomDiscountCharge;
            roomTotalData["noOfNights"] = no_of_nights;
            roomTotalData["BestDiscountName"] = BestDiscountName;
            roomTotalData["extraAdultChargeForDiscount"] =
              extraAdultChargeForDiscount;
            roomTotalData["extraChildChargeForDiscount"] =
              extraChildChargeForDiscount;
            roomTotalData["roomTax"] = data.room_tax_percentile;
            roomTotalData["propertyTaxAmountForDiscount"] =
              propertyTaxAmountForDiscount;
            roomTotalData["oneTimeFeeName"] = oneTimeFeeName;
            roomTotalData["nightlyFeeName"] = nightlyFeeName;
            roomTotalData["oneTimeFeeForDiscount"] = oneTimeFeeForDiscount;
            roomTotalData["nightlyFeeForDiscount"] = nightlyFeeForDiscount;
            roomTotalData["totalAmountIncludingAllTaxes"] =
              totalAmountIncludingAllTaxes;
            roomTotalData["noOfRooms"] = input_params.no_of_rooms;

            total =
              convertPrice *
              (parseInt(data.avg_rate[i - 1]) +
                additionalFee / parseInt(input_params.no_of_rooms));

            if (val_standard_discount.type === "standard_package") {
              showStrikeThroughPrice = false;
            } else {
              showStrikeThroughPrice = true;

              // room base rate calculation
              let roomchargetaxamount1 =
                (parseFloat(roomBaseCharge) *
                  parseFloat(data.room_tax_percentile)) /
                100;
              let totalroomchargewithtax1 =
                roomBaseCharge + roomchargetaxamount1;
              let totalroomchargewithtaxandfee1 =
                totalroomchargewithtax1 +
                convertPrice *
                  (additionalFee /
                    (parseInt(input_params.no_of_rooms) * no_of_nights));
              let totalroomchargewithtaxandfeeallnight1 =
                totalroomchargewithtax1 * no_of_nights +
                convertPrice *
                  (additionalFee / parseInt(input_params.no_of_rooms));

              if (property_details.reservation_type_view === "2") {
                roomBaseRate = totalroomchargewithtaxandfee1.toFixed(2);
                reservationTypeViewText =
                  "Per Night <br/> Including Taxes & Fees";
              } else if (property_details.reservation_type_view === "3") {
                roomBaseRate = (
                  parseFloat(roomBaseCharge) * no_of_nights
                ).toFixed(2);
                reservationTypeViewText =
                  "Per Stay <br/> Excluding Taxes & Fees";
              } else if (property_details.reservation_type_view === "4") {
                roomBaseRate = totalroomchargewithtaxandfeeallnight1.toFixed(2);
                reservationTypeViewText =
                  "Per Stay <br/> Including Taxes & Fees";
              } else {
                roomBaseRate = parseFloat(roomBaseCharge).toFixed(2);
                reservationTypeViewText =
                  "Per Night <br/> Excluding Taxes & Fees";
              }
            }

            // room standard promocode calculation
            let totalRoomRateWithTax1 =
              parseFloat(roomDiscountCharge) +
              (parseFloat(roomDiscountCharge) *
                parseFloat(data.room_tax_percentile)) /
                100;
            let totalRoomRateWithTaxandfee1 =
              totalRoomRateWithTax1 +
              convertPrice *
                (additionalFee /
                  (parseInt(input_params.no_of_rooms) * no_of_nights));
            let totalRoomRateWithTaxandfeeallnight1 =
              totalRoomRateWithTax1 * no_of_nights +
              convertPrice *
                (additionalFee / parseInt(input_params.no_of_rooms));

            if (property_details.reservation_type_view === "2") {
              roomBaseDiscountRate = totalRoomRateWithTaxandfee1.toFixed(2);
            } else if (property_details.reservation_type_view === "3") {
              roomBaseDiscountRate = (
                parseFloat(roomDiscountCharge) * no_of_nights
              ).toFixed(2);
            } else if (property_details.reservation_type_view === "4") {
              roomBaseDiscountRate =
                totalRoomRateWithTaxandfeeallnight1.toFixed(2);
            } else {
              roomBaseDiscountRate = parseFloat(roomDiscountCharge).toFixed(2);
            }

            if (i === parseInt(input_params.no_of_rooms)) {
              if (addOnDetails !== null) {
                nextId = "selectAddOnDiv";
              } else {
                nextId = "step2";
              }
            } else {
              nextId = "bookNextRoom" + i;
            }

            // WARNING DIV SKIPPED

            if (
              data.is_available === "Y" &&
              no_of_nights >= parseInt(val_standard_discount.min_nights) &&
              no_of_nights <= parseInt(val_standard_discount.max_nights)
            ) {
              selectButtonArray.push(
                `${i}`,
                `${idPostfix}_${val_standard_discount.pc_id}`,
                `${data.id}`,
                `${nextId}`,
                `${isDealApplied}`
              );
              selectButtonHiddenArray.push(
                `${i}`,
                `${roomBaseCharge}`,
                `${roomDiscountCharge}`,
                `${extraAdultCharge}`,
                `${extraChildCharge}`,
                `${data.name}`,
                `${data.id}`,
                `${BestDiscountName}`,
                `${val_standard_discount.pc_id}`
              );
              selectButtonDiv = (
                <>
                  <input
                    type="hidden"
                    id={"otherRatePlan_" + val_standard_discount.pc_id}
                    name={"otherRatePlan_" + val_standard_discount.pc_id}
                    defaultValue={dicount}
                    ref={(ref) => otherRatePlanRef.current.push(ref)}
                    onChange={() => handleChangeFive(i)}
                  />
                  <input
                    type="button"
                    value="Not Available"
                    id={
                      "buttonNotAvailable" +
                      i +
                      data.id +
                      "_" +
                      val_standard_discount.pc_id
                    }
                    style={{ display: "none" }}
                    className={
                      "notAvailableRoom naRoomTypeId" +
                      i +
                      data.id +
                      " btn btn-danger naDiscount" +
                      i +
                      val_standard_discount.pc_id
                    }
                  />
                </>
              );
            } else {
              selectButtonDiv = (
                <>
                  <input
                    type="button"
                    className={"btn btn-danger selectRoom" + i}
                    value="Not Available"
                  />
                </>
              );
            }

            let room_count =
              val_standard_discount.min_room_count !== ""
                ? val_standard_discount.min_room_count
                : 0;
            roomCountHiddenInput = (
              <>
                <input
                  type="hidden"
                  defaultValue={room_count}
                  id={"min_room_count_" + val_standard_discount.pc_id}
                  name="rack"
                  ref={(ref) => promoNamesRef.current.push(ref)}
                  onChange={() => handleChangeSix(i)}
                />
              </>
            );
          }
        }
      );
    }

    if (isStandardDiscountNotExists == 1) {
      if (data.is_available === "Y") {
        let isDealApplied = 0;
        let roomBaseCharge = convertPrice * parseInt(data.avg_rate[i - 1]);
        let roomDiscountCharge = convertPrice * parseInt(data.avg_rate[i - 1]);

        BestDiscountName = "Best Standard Online Rate";

        // standard rate policy modal popup HERE
        if (splCancelPolicy.length === 0) {
          let hours = '';
          if(policies.cancellation_policy.includes('hours')){
            hours = policies.cancellation_policy.replace('hours', '');
          }else{
            hours = policies.cancellation_policy;
          }
          ratePolicyCustomPolicy = policies.policy_details;
          ratePolicyCustomHour = hours;
          ratePolicyTitle = data.name;
          ratePolicyCustomText = "Best Standard Online Rate";
        }

        let totalAmountIncludingAllTaxes = 0;
        totalAmountIncludingAllTaxes =
          roomDiscountCharge * no_of_nights +
          extraAdultCharge * no_of_nights +
          extraChildCharge * no_of_nights;
        let propertyTaxAmount =
          (parseFloat(totalAmountIncludingAllTaxes) *
            parseFloat(data.room_tax_percentile)) /
          100;
        totalAmountIncludingAllTaxes =
          totalAmountIncludingAllTaxes + propertyTaxAmount;
        totalAmountIncludingAllTaxes =
          totalAmountIncludingAllTaxes +
          (convertPrice * nightlyFee) / parseInt(input_params.no_of_rooms);
        totalAmountIncludingAllTaxes =
          totalAmountIncludingAllTaxes +
          (convertPrice * oneTimeFee) / parseInt(input_params.no_of_rooms);

        // standard room total modal popup HERE
        roomTotalData["roomDiscountCharge"] = roomDiscountCharge;
        roomTotalData["noOfNights"] = no_of_nights;
        roomTotalData["BestDiscountName"] = "";
        roomTotalData["extraAdultChargeForDiscount"] = extraAdultCharge;
        roomTotalData["extraChildChargeForDiscount"] = extraChildCharge;
        roomTotalData["roomTax"] = data.room_tax_percentile;
        roomTotalData["propertyTaxAmountForDiscount"] = propertyTaxAmount;
        roomTotalData["oneTimeFeeName"] = oneTimeFeeName;
        roomTotalData["nightlyFeeName"] = nightlyFeeName;
        roomTotalData["oneTimeFeeForDiscount"] = oneTimeFee;
        roomTotalData["nightlyFeeForDiscount"] = nightlyFee;
        roomTotalData["totalAmountIncludingAllTaxes"] =
          totalAmountIncludingAllTaxes;
        roomTotalData["noOfRooms"] = input_params.no_of_rooms;

        total =
          convertPrice *
          (parseInt(data.avg_rate[i - 1]) +
            additionalFee / parseInt(input_params.no_of_rooms));

        let phantomRateExists = 0;
        let phantomRateToShow = roomBaseCharge;
        let pc_id = 0;

        if (
          data.promo_codes_available !== "" &&
          data.promo_codes_available !== null
        ) {
          Object.values(data.promo_codes_available).map(
            (valPhantom, keyPhantom) => {
              if (valPhantom.type === "standard_strike") {
                showStrikeThroughPrice = true;

                if (valPhantom.pc_amount > 0) {
                  phantomRateToShow =
                    parseFloat(roomBaseCharge) +
                    parseFloat(valPhantom.pc_amount);
                } else if (valPhantom.pc_percent > 0) {
                  let phantomPercentage =
                    (parseFloat(roomBaseCharge) *
                      parseFloat(valPhantom.pc_percent)) /
                    100;
                  phantomRateToShow =
                    parseFloat(roomBaseCharge) + phantomPercentage;
                }

                pc_id = valPhantom.pc_id;
                let room_count =
                  valPhantom.min_room_count !== ""
                    ? valPhantom.min_room_count
                    : 0;
                roomCountHiddenInput = (
                  <div key={keyPhantom}>
                    <input
                      type="hidden"
                      value={room_count}
                      id={"min_room_count_" + valPhantom.pc_id}
                      name="phantom"
                      ref={(ref) => promoNamesRef.current.push(ref)}
                      onChange={() => handleChangeSix(i)}
                    />
                  </div>
                );
                phantomRateExists = 1;
              } else {
                showStrikeThroughPrice = false;
              }
            }
          );
        }

        if (phantomRateExists) {
          showStrikeThroughPrice = true;

          let phantomRateToShowtax =
            phantomRateToShow +
            (phantomRateToShow * parseFloat(data.room_tax_percentile)) / 100;
          let phantomRateToShowtaxandfee =
            phantomRateToShowtax +
            convertPrice *
              (additionalFee /
                (parseInt(input_params.no_of_rooms) * no_of_nights));
          let phantomRateToShowtaxandfeeallnight =
            phantomRateToShowtax * no_of_nights +
            convertPrice * (additionalFee / parseInt(input_params.no_of_rooms));

          if (property_details.reservation_type_view === "2") {
            roomBaseRate = phantomRateToShowtaxandfee.toFixed(2);
          } else if (property_details.reservation_type_view === "3") {
            roomBaseRate = (parseFloat(roomBaseCharge) * no_of_nights).toFixed(
              2
            );
          } else if (property_details.reservation_type_view === "4") {
            roomBaseRate = phantomRateToShowtaxandfeeallnight.toFixed(2);
          } else {
            roomBaseRate = parseFloat(phantomRateToShow).toFixed(2);
          }
        }

        let totalRoomRateWithTax =
          roomBaseCharge +
          (roomBaseCharge * parseFloat(data.room_tax_percentile)) / 100;
        let totalRoomRateWithTaxandfee =
          totalRoomRateWithTax +
          convertPrice *
            (additionalFee /
              (parseInt(input_params.no_of_rooms) * no_of_nights));
        let totalRoomRateWithTaxandfeeallnight =
          totalRoomRateWithTax * no_of_nights +
          convertPrice * (additionalFee / parseInt(input_params.no_of_rooms));

        if (property_details.reservation_type_view === "2") {
          roomBaseDiscountRate = totalRoomRateWithTaxandfee.toFixed(2);
        } else if (property_details.reservation_type_view === "3") {
          roomBaseDiscountRate = (
            parseFloat(roomBaseCharge) * no_of_nights
          ).toFixed(2);
        } else if (property_details.reservation_type_view === "4") {
          roomBaseDiscountRate = totalRoomRateWithTaxandfeeallnight.toFixed(2);
        } else {
          roomBaseDiscountRate = parseFloat(roomBaseCharge).toFixed(2);
        }

        if (i === parseInt(input_params.no_of_rooms)) {
          if (addOnDetails !== null) {
            nextId = "selectAddOnDiv";
          } else {
            nextId = "step2";
          }
        } else {
          nextId = "bookNextRoom" + i;
        }

        if (data.is_available === "Y") {
          if (pc_id !== 0) {
            selectButtonArray.push(
              `${i}`,
              `${idPostfix}`,
              `${data.id}`,
              `${nextId}`,
              `${isDealApplied}`
            );
            selectButtonHiddenArray.push(
              `${i}`,
              `${roomBaseCharge}`,
              `${roomDiscountCharge}`,
              `${extraAdultCharge}`,
              `${extraChildCharge}`,
              `${data.name}`,
              `${data.id}`
            );
            selectButtonDiv = (
              <>
                <input
                  type="button"
                  value="Not Available"
                  id={"buttonNotAvailable" + i + data.id}
                  style={{display: 'none'}}
                  className={"notAvailableRoom naRoomTypeId" + i + data.id + "btn btn-danger"}
                />
              </>
            );
          } else {
            selectButtonArray.push(
              `${i}`,
              `${idPostfix}`,
              `${data.id}`,
              `${nextId}`,
              `${isDealApplied}`
            );
            selectButtonHiddenArray.push(
              `${i}`,
              `${roomBaseCharge}`,
              `${roomDiscountCharge}`,
              `${extraAdultCharge}`,
              `${extraChildCharge}`,
              `${data.name}`,
              `${data.id}`
            );
            selectButtonDiv = (
              <>
                <input
                  type="hidden"
                  defaultValue="0"
                  id="min_room_count_0"
                  name="base"
                  ref={baseRef}
                />
                <input
                  type="button"
                  defaultValue="Not Available"
                  id={"buttonNotAvailable" + i + data.id}
                  style={{ display: "none" }}
                  className={`notAvailableRoom naRoomTypeId${i}${data.id} btn btn-danger`}
                />
              </>
            );
          }
        }
      } else if (data.is_available === "N" && data.warning !== 0) {
        // WARNING DIV SKIPPED
        isNotAvailableRoomType = 1;
        isRoomAvailableToBook = false;
        selectButtonDiv = (
          <>
            <span className="red-text roomNotAvailableMsg">
              <span className="fa fa-warning F26 MR10"></span>
              {data.warning}
            </span>
          </>
        );
      } else {
        isNotAvailableRoomType = 1;
        isRoomAvailableToBook = false;
        selectButtonDiv = (
          <>
            <span className="red-text roomNotAvailableMsg">
              <span className="fa fa-warning F26 MR10"></span>Sorry, this room
              type is Not Available for your selected dates. Please try another
              set of dates to check the availability of this room type.
            </span>
          </>
        );
      }
    }
  } else if (
    input_params.promo_code != "" &&
    input_params.promo_code !== null &&
    data.is_available !== "Y"
  ) {
    isRoomAvailableToBook = false;
    selectButtonDiv = (
      <>
        <span className="red-text roomNotAvailableMsg">
          <span className="fa fa-warning F26 MR10"></span>Sorry, this room
          type is Not Available for your selected dates. Please try another
          set of dates to check the availability of this room type.
        </span>
      </>
    );
  }

  // line no. 2092 in reservation list (Promo Codes rates)
  if (data.is_available == "Y") {
    if (
      typeof data.promo_codes_available == "object" &&
      data.promo_codes_available !== null
    ) {
      if (input_params.promo_code !== "") {
        promoByURL = 1;
      }
      isRoomAvailableToBook = true;
      let counterToShowOtherRatePlanText = 1;
      let roomTypeId = "";

      Object.values(data.promo_codes_available).map((val1, key1) => {
        promoCount++;

        if (
          val1.is_available === "Y" &&
          val1.type !== "standard" &&
          val1.type !== "standard_package" &&
          val1.type !== "standard_strike"
        ) { 
          // if (input_params.promo_code === '' && input_params.promo_code !== null && counterToShowOtherRatePlanText === 1) {
          isPromotionalCodeAvailable = 1;

          if (roomTypeId === "" && promoCounterText === 0) {
            promoCounterText = 1;
            roomTypeId = val1.room_type;
          } else {
            if (roomTypeId === val1.room_type) {
              promoCounterText++;
            } else {
              promoCounterText = 1;
            }
          }

          promoCodeHTML.push(
            <RoomPromotionalCodes
              i={i}
              val1={val1}
              convertPrice={convertPrice}
              avg_rate={data.avg_rate[i - 1]}
              currency={currency}
              is_available={data.is_available}
              no_of_nights={no_of_nights}
              valueRoomTypeName={data.name}
              extraAdultCharge={extraAdultCharge}
              extraChildCharge={extraChildCharge}
              oneTimeFee={oneTimeFee}
              nightlyFee={nightlyFee}
              room_tax_percentile={data.room_tax_percentile}
              input_params={input_params}
              avg_rate_tax={data.avg_rate_tax[i - 1]}
              additionalFee={additionalFee}
              property_details={property_details}
              addOnDetails={addOnDetails}
              promoCounterText={promoCounterText}
              idPostfix={idPostfix}
              updateGrandTotal={updateGrandTotal}
              showDiscountDiv={showDiscountDiv}
              scrollWindow={scrollWindow}
              otherRatePlanRef={otherRatePlanRef}
              promoNamesRef={promoNamesRef}
              promoByURL={promoByURL}
              oneTimeFeeName={oneTimeFeeName}
              nightlyFeeName={nightlyFeeName}
              key={key1}
              opensCollapse={opensCollapse}
              checkAvailabilityData={checkAvailabilityData}
            />
          );

          if (
            promoCounterText > 2 &&
            data.promo_codes_available.length === promoCount
          ) {
            moreButtonHTML = (
              <OtherRatePlansButton
                i={i}
                val1={val1}
                key={key1}
                id="collapseIdAmenities"
                setOpensCollapse={setOpensCollapse}
                opensCollapse={opensCollapse}
              />
            );
          }

          // }
        } else if (data.promo_codes_available.length-1 ===  key1){
          // this ELSE IF condition is added because the VIEW MORE RATE PLANS 
          // was not displayed if the last promo code in the promotional array 
          // was STANDARD, STANDARD_PACKAGE or STANDARD_STRIKE as the IF condition
          // above will not evaluate to TRUE and "moreButtonHTML" will be empty for
          // this loop
          if (
            promoCounterText > 2 &&
            data.promo_codes_available.length === promoCount
          ) {
            moreButtonHTML = (
              <OtherRatePlansButton
                i={i}
                val1={data.promo_codes_available[key1-1]}
                key={key1-1}
                id="collapseIdAmenities"
                setOpensCollapse={setOpensCollapse}
                opensCollapse={opensCollapse}
              />
            );
          }
        }
      });
    }
  }
  return (
    <div className="resRoomData container px-0">
      {isRoomAvailableToBook ? (
        <>
        <div className="row mx-0">
          <div className="light-grey border-box roomBox mb-4">
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 px-0">
              <SimpleReactLightbox>
                <RoomImage images={data.room_type_images} />
              </SimpleReactLightbox>
            </div>
            <div className="col-lg-9 col-md-9 col-sm-6 col-xs-12 my-2 roomDesCont pd-xs-15 mt-xs-0">
              <div className="d-flex mt-3 roomCardView">
                <div className="d-flex">
                  {data.is_smoking == "0" ? (
                    <FaSmokingBan
                      size="40"
                      fill="red"
                      className="smokeIcon"
                      title="Non Smoking"
                    />
                  ) : (
                    ""
                  )}
                  {data.is_handicap == "1" ? (
                    <BiHandicap
                      size="40"
                      className="disableIcon ml-2"
                      fill="#003f87"
                      title="ADA Accessible Guest Room"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className="roomLeft">
                  <h4 className="mb-0">{data.name}</h4>
                  <p className="text-left">{ReactHtmlParser(vacantText)}</p>
                </div>
              </div>
              <div>
                <p className="roomDesc text-left mt-2">
                  {ReactHtmlParser(description.substring(0, 300))}
                  {description.length > 300 ? (
                    <>
                      ...
                      <a
                        className="moregreen"
                        onClick={() =>
                          showMoreDetailsPopup("details" + i + data.id)
                        }
                      >
                        More
                      </a>
                    </>
                  ) : null}
                </p>
              </div>
            </div>
            <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12 offset-3 roomDataIpad">
              {!promoByURL ? (
                <div className="col-12 px-0">
                  {ReactHtmlParser(roomTypeAssignedToRatePlanHidden)}
                  <div
                    className={
                      "whitebg rateplans p-2 row mx-0 mb-3 standardRateDivRoom_" +
                      i
                    }
                  >
                    <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 mt-1 text-left text-xs-center">
                      <h5 className="m-0">{BestDiscountName}</h5>
                      <a
                        onClick={ratePolicyShow}
                        id={i + data.id}
                        className="resPolicy"
                      >
                        Rate Policy
                      </a> | <a onClick={roomTotalShow} className="resPolicy">
                        Room Total
                      </a>
                      <div>
                        {modalIsOpen && (
                          <RatePolicyModal
                            title={ratePolicyTitle}
                            onCancel={ratePolicyHide}
                            ratePolicyDesc={ratePolicyDesc}
                            ratePolicyPolicy={ratePolicyPolicy}
                            ratePolicyCustomPolicy={ratePolicyCustomPolicy}
                            ratePolicyCustomHour={ratePolicyCustomHour}
                            isStandardDiscountNotExists={
                              isStandardDiscountNotExists
                            }
                            ratePolicyCustomText={ratePolicyCustomText}
                          />
                        )}
                        {modalIsOpen && <Backdrop onCancel={ratePolicyHide} />}
                      </div>
                      <div>
                        {roomTotalOpen && (
                          <RoomTotalModal
                            onCancel={roomTotalHide}
                            i={i}
                            roomName={data.name}
                            currency={currency}
                            roomTotalData={roomTotalData}
                          />
                        )}
                        {roomTotalOpen && <Backdrop onCancel={roomTotalHide} />}
                      </div>
                      {ReactHtmlParser(refundable)}
                      {ReactHtmlParser(promoNightStay)}
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-12 col-xs-12 mt-1 text-right text-xs-center">
                      {showStrikeThroughPrice
                        ? ReactHtmlParser(`
                                            <strong className'text-center'>
                                                <del className'text-dark'>${currency}${roomBaseRate}</del>
                                            </strong>`)
                        : ""}
                      <h4 className="text-danger text-right roomPrice text-xs-center">
                        {ReactHtmlParser(currency)}
                        {roomBaseDiscountRate}
                      </h4>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 mt-1">
                      <p className="text-left fs-14 roomPrice text-xs-center">
                        {ReactHtmlParser(reservationTypeViewText)}
                      </p>
                    </div>
                    <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 mt-1 selectCancelBtns">
                      <RoomSelectButton
                        selectButton={selectButtonArray}
                        selectButtonHidden={selectButtonHiddenArray}
                        updateGrandTotal={updateGrandTotal}
                        showDiscountDiv={showDiscountDiv}
                        scrollWindow={scrollWindow}
                        checkAvailabilityData={checkAvailabilityData}
                      />
                      {selectButtonDiv}
                      {roomCountHiddenInput}
                    </div>

                    <input
                      type="hidden"
                      name={"week_dates_date_" + data.id}
                      value={data.week_dates_date_serialized}
                      ref={(ref) => week_dates_dateRef.current.push(ref)}
                      onChange={() => handleChangeThree(i)}
                    />
                    {!input_params.promo_code && (
                      <input
                        type="hidden"
                        name={"week_dates_rate_" + data.id}
                        value={data.week_dates_rate_serialized}
                        ref={(ref) => week_dates_rateRef.current.push(ref)}
                        onChange={() => handleChangeFour(i)}
                      />
                    )}
                    {input_params.promo_code && (
                      <input
                        type="hidden"
                        name={"week_dates_rate_" + data.id}
                        value={data.week_discount_rate_serialized}
                        ref={(ref) => week_dates_rateRef.current.push(ref)}
                        onChange={() => handleChangeFour(i)}
                      />
                    )}

                    <input
                      type="hidden"
                      name={"avg_discount_rate_" + data.id}
                      defaultValue={data.avg_discount_rate}
                      ref={(ref) => avg_discount_rateRef.current.push(ref)}
                      onChange={() => handleChangeOne(i)}
                    />
                    <input
                      type="hidden"
                      name={"avg_rate_" + data.id}
                      defaultValue={data.avg_rate[i - 1]}
                      ref={(ref) => avg_rateRef.current.push(ref)}
                      onChange={() => handleChangeTwo(i)}
                    />

                    {splCancelHiddenInputs}
                  </div>
                </div>
              ) : null}
              <div className="hfsefgyuegu">
                {promoCodeHTML}
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 veiwMoreBtns">
                  {error && (
                    <PopModal
                      onConfirm={errorHandler}
                      data={data}
                      property_details={property_details}
                      policies={policies}
                      splCancelPolicy={splCancelPolicy}
                      input_params={input_params}
                      i={i}
                      isStandardDiscountNotExists={isStandardDiscountNotExists}
                      currency={currency}
                      convertPrice={convertPrice}
                    >
                      <div style={"height: 300px"}></div>
                    </PopModal>
                  )}
                  <button
                    type="button"
                    title="More Room Details"
                    className="mx-2 moreRoomDetail btnFix"
                    onClick={addUserHandler}
                    id={"details" + i + data.id}
                  >
                    More Room Details
                    <FaPlus size="16" className="ml-2" />
                  </button>

                  {moreButtonHTML}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {Object.values(tmpNotAvailArray).map(d => {
          tmpNotAvailRoom.push(<NotAvailableRooms html={d}/>);
        })}
        {tmpNotAvailRoom} */}
        </>
      ) : (
        <div className="row mx-0 singleRoomData">
          <div className="light-grey border-box roomBox mb-4">
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 px-0">
              <RoomImage images={data.room_type_images} />
            </div>
            <div className="col-lg-9 col-md-9 col-sm-6 col-xs-12 my-2">
              <div className="d-flex mt-3">
                <div className="iconFix">
                  {data.is_smoking == "0" ? (
                    <FaSmokingBan
                      size="40"
                      className="smokeIcon"
                      fill="red"
                      title="Non Smoking"
                    />
                  ) : (
                    ""
                  )}
                  {data.is_handicap == "1" ? (
                    <BiHandicap
                      size="40"
                      className="disableIcon ml-2"
                      fill="#003f87"
                      title="ADA Accessible Guest Room"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className="iconFix1">
                  <h4 className="ml-3 mb-0 mt-1">{data.name}</h4>
                  <p className="text-danger">{ReactHtmlParser(vacantText)}</p>
                </div>
              </div>

              <p className="text-left roomDesc">
                {ReactHtmlParser(description.substring(0, 300))}
                {description.length > 300 ? (
                  <>
                    ...
                    <a
                      className="moregreen"
                      onClick={() =>
                        showMoreDetailsPopup("details" + i + data.id)
                      }
                    >
                      More
                    </a>
                  </>
                ) : null}
              </p>
              <div className="border p-2 whitebg">
                <p className="text-center text-danger d-flex">
                  <span className="align-self-center"><ImWarning size="34" /></span>
                  {selectButtonDiv}
                  {/* Sorry, this room type is Not Available for your selected
                  dates. Please try another set of dates to check the
                  availability of this room type. */}
                </p>
              </div>
              <div className="text-center veiwMoreBtns">
                {error && (
                  <PopModal
                    onConfirm={errorHandler}
                    data={data}
                    property_details={property_details}
                    policies={policies}
                    splCancelPolicy={splCancelPolicy}
                    input_params={input_params}
                    i={i}
                    isStandardDiscountNotExists={isStandardDiscountNotExists}
                    currency={currency}
                    convertPrice={convertPrice}
                  >
                    <div style={"height: 300px"}></div>
                  </PopModal>
                )}
                <button
                  type="button"
                  className="mx-2 moreRoomDetail my-3 mb-3"
                  onClick={addUserHandler}
                  id={"details" + i + data.id}
                  title="More Room Details"
                >
                  More Room Details <FaPlus size="16" className="ml-2" />
                </button>
                {/* <button className='sort_bar my-3'>More Room Details +</button> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomData;
