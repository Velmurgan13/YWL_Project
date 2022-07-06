import React, { useState } from "react";
import ReactHtmlParser from "react-html-parser";

import RoomSelectPromoButton from "./RoomSelectPromoButton";
import Collapse from "react-bootstrap/Collapse";
import RatePolicyModal from "./popups/RatePolicyModal";
import RoomTotalModal from "./popups/RoomTotalModal";
import Backdrop from "./popups/backdrop";
import "./popups/index.css";

const RoomPromotionalCodes = ({
  i,
  val1,
  convertPrice,
  avg_rate,
  currency,
  is_available,
  no_of_nights,
  valueRoomTypeName,
  extraAdultCharge,
  extraChildCharge,
  oneTimeFee,
  nightlyFee,
  room_tax_percentile,
  input_params,
  avg_rate_tax,
  additionalFee,
  property_details,
  addOnDetails,
  promoCounterText,
  idPostfix,
  updateGrandTotal,
  showDiscountDiv,
  scrollWindow,
  otherRatePlanRef,
  promoNamesRef,
  promoByURL,
  oneTimeFeeName,
  nightlyFeeName,
  opensCollapse,
  checkAvailabilityData
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [roomTotalOpen, setRoomTotal] = useState(false);

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

  function handleChange(i) {
    otherRatePlanRef.current[i + 1].focus();
  }
  function handleChangeTwo(i) {
    promoNamesRef.current[i + 1].focus();
  }

  let BestDiscountName = "";
  let isDealApplied = 0;
  let roomBaseCharge = convertPrice * parseFloat(avg_rate);
  let vacantText = "";
  let promoNightStayDiv = "";
  let no_of_rooms = parseInt(input_params.no_of_rooms);
  let roomBasePromoRate = 0;
  let showStrikePromoPrice = false;
  let roomBasePromoDiscountRate = 0;
  let reservationTypeViewText = "Per Night <br/> Excluding Taxes & Fees";
  let nextId = "";
  let selectPromoButtonDiv = "";
  let selectPromoButtonArray = [];
  let selectPromoButtonHiddenArray = [];
  let roomCountHiddenInputPromo = "";
  let ratePolicyTitle = "";
  let ratePolicyDesc = "";
  let ratePolicyPolicy = "";
  let ratePolicyCustomPolicy = "";
  let ratePolicyCustomHour = "";
  let ratePolicyCustomText = "Packages";
  let roomTotalData = {};
  let isStandardDiscountNotExists = "";
  // let moreButtonHTML = [];

  if (val1.rate_plan_name != "") {
    BestDiscountName = val1.rate_plan_name;
  } else if (val1.rate_plan_name == "" && val1.type == "package") {
    BestDiscountName = "Additional Amount";
  } else if (val1.rate_plan_name == "" && val1.type == "promo") {
    BestDiscountName = "Promotion Codes";
  } else if (val1.rate_plan_name == "" && val1.type == "special") {
    BestDiscountName = "Special Codes";
  } else if (val1.rate_plan_name == "" && val1.type == "apd") {
    BestDiscountName = "Advance Purchase";
  }

  let dicount = "";
  let roomDiscountCharge = 0;
  if (val1.type === "promo" || val1.type === "apd") {
    if (val1.pc_percent !== "0.00" && val1.pc_percent !== null) {
      dicount = val1.pc_percent + "%";

      roomDiscountCharge =
        (parseFloat(avg_rate) * parseFloat(val1.pc_percent)) / 100;
      roomDiscountCharge = parseFloat(avg_rate) - roomDiscountCharge;
    } else if (val1.pc_amount !== "0.00" && val1.pc_amount !== null) {
      dicount = currency + convertPrice * parseFloat(val1.pc_amount);

      roomDiscountCharge = parseFloat(avg_rate);
      roomDiscountCharge = parseFloat(avg_rate) - parseFloat(val1.pc_amount);
    }

    if (roomDiscountCharge < 0) {
      roomDiscountCharge = 0;
    }
  } else if (val1.type === "package") {
    if (val1.pc_percent !== "0.00" && val1.pc_percent !== null) {
      dicount = val1.pc_percent + "%";

      roomDiscountCharge =
        (parseFloat(avg_rate) * parseFloat(val1.pc_percent)) / 100;
      roomDiscountCharge = parseFloat(avg_rate) + roomDiscountCharge;
    } else if (val1.pc_amount !== "0.00") {
      dicount = currency + convertPrice * parseFloat(val1.pc_amount);

      roomDiscountCharge = parseFloat(avg_rate);
      roomDiscountCharge = parseFloat(avg_rate) + parseFloat(val1.pc_amount);
    } else if (val1.pc_percent === "0.00" || val1.pc_amount === "0.00") {
      roomDiscountCharge = parseFloat(avg_rate);
    }
  } else {
    dicount = currency + convertPrice * parseFloat(val1.fixed_room_rate);
    roomDiscountCharge = val1.fixed_room_rate;
  }

  roomDiscountCharge = convertPrice * roomDiscountCharge;

  if (val1.is_refundable === "1") {
    vacantText = '<p class="text-danger">Non-Refundable</p>';
  }

  if (
    !(
      is_available == "Y" &&
      parseInt(no_of_nights) >= parseInt(val1.min_nights) &&
      parseInt(no_of_nights) <= parseInt(val1.max_nights)
    )
  ) {
    if (parseInt(no_of_nights) <= parseInt(val1.max_nights)) {
      promoNightStayDiv = `<div class="F14 red-text text-left text-xs-center">${valueRoomTypeName} is only available for a Minimum stay of ${val1.min_nights} Night.</div>`;
    } else if (parseInt(no_of_nights) >= parseInt(val1.min_nights)) {
      promoNightStayDiv = `<div class="F14 red-text text-left text-xs-center">${valueRoomTypeName} is only available for a Maximum stay of ${val1.max_nights} Night.</div>`;
    }
  }

  // showDesc_ MODAL POPUP
  ratePolicyTitle = BestDiscountName;
  ratePolicyDesc = val1.rate_plan_desc;
  ratePolicyPolicy = val1.rate_plan_policy;
  if (val1.customCancellationHour !== "0") {
    ratePolicyCustomPolicy = val1.custom_cancellation_desc;
    ratePolicyCustomHour = val1.customCancellationHour;
    if (val1.type === "promo") {
      ratePolicyCustomText = "Promotion Code";
    } else if (val1.type === "special") {
      ratePolicyCustomText = "Special Code";
    } else if (val1.type === "apd") {
      ratePolicyCustomText = "Advance Purchase";
    }
  }

  let totalAmountIncludingAllTaxes = 0;
  let extraAdultChargeForDiscount = extraAdultCharge;
  let extraChildChargeForDiscount = extraChildCharge;
  let nightlyFeeForDiscount = convertPrice * nightlyFee;
  let oneTimeFeeForDiscount = convertPrice * oneTimeFee;

  totalAmountIncludingAllTaxes =
    roomDiscountCharge * parseInt(no_of_nights) +
    extraAdultChargeForDiscount * parseInt(no_of_nights) +
    extraChildChargeForDiscount * parseInt(no_of_nights);
  let propertyTaxAmountForDiscount =
    (parseFloat(totalAmountIncludingAllTaxes) *
      parseFloat(room_tax_percentile)) /
    100;
  totalAmountIncludingAllTaxes =
    totalAmountIncludingAllTaxes + propertyTaxAmountForDiscount;
  totalAmountIncludingAllTaxes =
    totalAmountIncludingAllTaxes + nightlyFeeForDiscount / no_of_rooms;
  totalAmountIncludingAllTaxes =
    totalAmountIncludingAllTaxes + oneTimeFeeForDiscount / no_of_rooms;

  // showRate_ MODAL POPUP
  roomTotalData["roomDiscountCharge"] = roomDiscountCharge;
  roomTotalData["noOfNights"] = no_of_nights;
  roomTotalData["BestDiscountName"] = BestDiscountName;
  roomTotalData["extraAdultChargeForDiscount"] = extraAdultChargeForDiscount;
  roomTotalData["extraChildChargeForDiscount"] = extraChildChargeForDiscount;
  roomTotalData["roomTax"] = room_tax_percentile;
  roomTotalData["propertyTaxAmountForDiscount"] = propertyTaxAmountForDiscount;
  roomTotalData["oneTimeFeeName"] = oneTimeFeeName;
  roomTotalData["nightlyFeeName"] = nightlyFeeName;
  roomTotalData["oneTimeFeeForDiscount"] = oneTimeFeeForDiscount;
  roomTotalData["nightlyFeeForDiscount"] = nightlyFeeForDiscount;
  roomTotalData["totalAmountIncludingAllTaxes"] = totalAmountIncludingAllTaxes;
  roomTotalData["noOfRooms"] = no_of_rooms;

  let total =
    convertPrice * (parseFloat(avg_rate_tax) + additionalFee / no_of_rooms);

  if (val1.type != "package" && val1.type != "special") {
    if (
      (val1.type == "promo" && val1.pc_amount != "0.00") ||
      (val1.type == "promo" && val1.pc_percent != "0.00")
    ) {
      showStrikePromoPrice = true;
      let roomchargetotaltaxamount =
        (roomBaseCharge * parseFloat(room_tax_percentile)) / 100;
      let totalroomchargetotalwithtax =
        roomBaseCharge + roomchargetotaltaxamount;
      let totalroomchargetotalwithtaxandfee =
        totalroomchargetotalwithtax +
        convertPrice * (additionalFee / (no_of_rooms * parseInt(no_of_nights)));
      let totalroomchargetotalwithtaxandfeeallnight =
        totalroomchargetotalwithtax * parseInt(no_of_nights) +
        convertPrice * (additionalFee / no_of_rooms);

      if (property_details.reservation_type_view == "2") {
        roomBasePromoRate =
          currency + totalroomchargetotalwithtaxandfee.toFixed(2);
      } else if (property_details.reservation_type_view == "3") {
        roomBasePromoRate =
          currency + (roomBaseCharge * no_of_nights).toFixed(2);
      } else if (property_details.reservation_type_view == "4") {
        roomBasePromoRate =
          currency + totalroomchargetotalwithtaxandfeeallnight.toFixed(2);
      } else {
        roomBasePromoRate = currency + roomBaseCharge.toFixed(2);
      }
    }
  }

  let roomchargetaxamount =
    (roomDiscountCharge * parseFloat(room_tax_percentile)) / 100;
  let totalroomchargewithtax = roomDiscountCharge + roomchargetaxamount;
  let totalroomchargewithtaxandfee =
    totalroomchargewithtax +
    convertPrice * (additionalFee / (no_of_rooms * parseInt(no_of_nights)));
  let totalroomchargewithtaxandfeeallnight =
    totalroomchargewithtax * parseInt(no_of_nights) +
    convertPrice * (additionalFee / no_of_rooms);

  if (property_details.reservation_type_view == "2") {
    roomBasePromoDiscountRate =
      ReactHtmlParser(currency) + totalroomchargewithtaxandfee.toFixed(2);
    reservationTypeViewText = "Per Night <br/> Including Taxes & Fees";
  } else if (property_details.reservation_type_view == "3") {
    roomBasePromoDiscountRate =
      ReactHtmlParser(currency) + (roomDiscountCharge * no_of_nights).toFixed(2);
    reservationTypeViewText = "Per Stay <br/> Excluding Taxes & Fees";
  } else if (property_details.reservation_type_view == "4") {
    roomBasePromoDiscountRate =
      ReactHtmlParser(currency) + totalroomchargewithtaxandfeeallnight.toFixed(2);
    reservationTypeViewText = "Per Stay <br/> Including Taxes & Fees";
  } else {
    roomBasePromoDiscountRate = ReactHtmlParser(currency) + roomDiscountCharge.toFixed(2);
    reservationTypeViewText = "Per Night <br/> Excluding Taxes & Fees";
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

  selectPromoButtonDiv = (
    <>
      <input
        type="hidden"
        id={"otherRatePlan_" + val1.pc_id}
        name={"otherRatePlan_" + val1.pc_id}
        defaultValue={dicount}
        ref={(ref) => otherRatePlanRef.current.push(ref)}
        onChange={() => handleChange(i)}
      />
      <input
        type="button"
        className={
          "notAvailableRoom btn btn-danger naRoomTypeId" +
          i +
          val1.room_type +
          " naDiscount" +
          i +
          val1.pc_id
        }
        defaultValue="Not Available"
        id={"buttonNotAvailable" + val1.room_type + "_" + val1.pc_id}
        style={{ display: "none" }}
      />
    </>
  );
  selectPromoButtonArray.push(
    `${i}`,
    `${idPostfix}`,
    `${val1.room_type}`,
    `${nextId}`,
    `${isDealApplied}`
  );
  selectPromoButtonHiddenArray.push(
    `${i}`,
    `${roomBaseCharge}`,
    `${roomDiscountCharge}`,
    `${extraAdultCharge}`,
    `${extraChildCharge}`,
    `${valueRoomTypeName}`,
    `${val1.room_type}`,
    `${BestDiscountName}`,
    `${val1.pc_id}`
  );

  roomCountHiddenInputPromo = (
    <>
      <input
        type="hidden"
        defaultValue={val1.min_room_count}
        name={val1.rate_plan_name}
        id={"min_room_count_" + val1.pc_id}
        ref={(ref) => promoNamesRef.current.push(ref)}
        onChange={() => handleChangeTwo(i)}
      />
    </>
  );

  let dynamicClass = "";
  if (promoCounterText > 2) {
    dynamicClass = "removeLess" + i + val1.room_type;
  } else {
    dynamicClass = "first-two";
  }

  let classNamePromo = `showOnlyRatePlan_${i}_${
    val1.pc_id
  } ratePlanDivRoom_${i} ratePlanDivRoomTypeId_${
    i + val1.room_type
  } ${dynamicClass}`;
  return (
    <>
      {promoCounterText < 3 ? (
        <div className={classNamePromo} id={"divToToggle_" + val1.pc_id}>
          {promoCounterText === 1 && !promoByURL
            ? ReactHtmlParser(`
                  <p className'text-center FSize'>
                      <b>Other Rate Plans</b>
                  </p>`)
            : ""}

          <input
            type="hidden"
            defaultValue={val1.room_type}
            id={"roomTypeAssignedToRatePlan" + val1.pc_id}
          />
          <>
            <div className="whitebg rateplans p-2 row mx-0 mt-3 standardRateDivRoom_1">
              <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 mt-1 text-left text-xs-center">
                <h5>{BestDiscountName}</h5>
                <a
                  onClick={ratePolicyShow}
                  id={i + val1.pc_id}
                  className="resPolicy"
                >
                  Rate Policy
                </a>{" "}
                |{" "}
                <a onClick={roomTotalShow} className="resPolicy">
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
                      isStandardDiscountNotExists={isStandardDiscountNotExists}
                      ratePolicyCustomText={ratePolicyCustomText}
                    />
                  )}{" "}
                  {modalIsOpen && <Backdrop onCancel={ratePolicyHide} />}{" "}
                </div>
                <div>
                  {roomTotalOpen && (
                    <RoomTotalModal
                      onCancel={roomTotalHide}
                      i={i}
                      roomName={valueRoomTypeName}
                      currency={currency}
                      roomTotalData={roomTotalData}
                    />
                  )}
                  {roomTotalOpen && <Backdrop onCancel={roomTotalHide} />}{" "}
                </div>
                {ReactHtmlParser(vacantText)}
                {ReactHtmlParser(promoNightStayDiv)}
              </div>
              <div className="col-lg-2 col-md-3 col-sm-12 col-xs-12 mt-1 text-right text-xs-center">
                {showStrikePromoPrice
                  ? ReactHtmlParser(`
                  <strong className'text-center'>
                      <del className'text-dark'>${roomBasePromoRate}</del>
                  </strong>`)
                  : ""}
                <h4 className="text-danger">{roomBasePromoDiscountRate}</h4>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 mt-1">
                <p className="text-left fs-14 roomPrice text-xs-center">
                  {ReactHtmlParser(reservationTypeViewText)}
                </p>
              </div>
              <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 mt-1 selectCancelBtns">
                <RoomSelectPromoButton
                  selectPromoButton={selectPromoButtonArray}
                  selectPromoButtonHidden={selectPromoButtonHiddenArray}
                  updateGrandTotal={updateGrandTotal}
                  showDiscountDiv={showDiscountDiv}
                  scrollWindow={scrollWindow}
                  checkAvailabilityData={checkAvailabilityData}
                />
                {selectPromoButtonDiv}
                {roomCountHiddenInputPromo}
              </div>
            </div>
          </>
        </div>
      ) : (
        <Collapse in={opensCollapse}>
          <div className={classNamePromo} id={"divToToggle_" + val1.pc_id}>
            {promoCounterText === 1 && !promoByURL
              ? ReactHtmlParser(`
                  <p className'text-center FSize'>
                      <b>Other Rate Plans</b>
                  </p>`)
              : ""}

            <input
              type="hidden"
              defaultValue={val1.room_type}
              id={"roomTypeAssignedToRatePlan" + val1.pc_id}
            />
            <>
              <div className="whitebg rateplans p-2 row mx-0 mt-3 standardRateDivRoom_1">
                <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 mt-1 text-left text-xs-center">
                  <h5>{BestDiscountName}</h5>
                  <a
                    onClick={ratePolicyShow}
                    id={i + val1.pc_id}
                    className="resPolicy"
                  >
                    Rate Policy
                  </a>{" "}
                  |{" "}
                  <a onClick={roomTotalShow} className="resPolicy">
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
                    )}{" "}
                    {modalIsOpen && <Backdrop onCancel={ratePolicyHide} />}{" "}
                  </div>
                  <div>
                    {roomTotalOpen && (
                      <RoomTotalModal
                        onCancel={roomTotalHide}
                        i={i}
                        roomName={valueRoomTypeName}
                        currency={currency}
                        roomTotalData={roomTotalData}
                      />
                    )}
                    {roomTotalOpen && <Backdrop onCancel={roomTotalHide} />}{" "}
                  </div>
                  {ReactHtmlParser(vacantText)}
                  {ReactHtmlParser(promoNightStayDiv)}
                </div>
                <div className="col-lg-2 col-md-3 col-sm-12 col-xs-12 mt-1 text-right text-xs-center">
                  {showStrikePromoPrice
                    ? ReactHtmlParser(`
                  <strong className'text-center'>
                      <del className'text-dark'>${roomBasePromoRate}</del>
                  </strong>`)
                    : ""}
                  <h4 className="text-danger">{roomBasePromoDiscountRate}</h4>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 mt-1">
                  <p className="text-left fs-14 roomPrice text-xs-center">
                    {ReactHtmlParser(reservationTypeViewText)}
                  </p>
                </div>
                <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 mt-1 selectCancelBtns">
                  <RoomSelectPromoButton
                    selectPromoButton={selectPromoButtonArray}
                    selectPromoButtonHidden={selectPromoButtonHiddenArray}
                    updateGrandTotal={updateGrandTotal}
                    showDiscountDiv={showDiscountDiv}
                    scrollWindow={scrollWindow}
                    checkAvailabilityData={checkAvailabilityData}
                  />
                  {selectPromoButtonDiv}
                  {roomCountHiddenInputPromo}
                </div>
              </div>
            </>
          </div>
        </Collapse>
      )}
    </>
  );
};

export default RoomPromotionalCodes;
