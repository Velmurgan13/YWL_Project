import React, { useState, useEffect, useContext } from "react";
// import RoomImage from "./RoomImage";
import RoomData from "./RoomData";
// import { GiConsoleController } from "react-icons/gi";
import ReactHtmlParser from "react-html-parser";

import { ReservationContext } from "../MainReservation";
import NotAvailableRooms from "./NotAvailableRooms";

const RoomsPage = ({
  convertPrice,
  roomsData,
  counter,
  countroom,
  additionalFee,
  oneTimeFeeName,
  oneTimeFee,
  nightlyFeeName,
  nightlyFee,   
  updateGrandTotal,
  currencySign,
  is_googleRef,
  // isRoomSelectedRef,
  currencySignRef,
  noOfRoomsRef,
  noOfNightsRef,
  propertyTaxRef,
  checkInRef,
  checkOutRef,
  countroomRef,
  // isDealSelectedRef,
  // isDiscountSelectedRef,
  // selectedRoomTypeIdRef,
  // baseRateRef,
  // discountRateRef,
  // OtherRateRef,
  // showOnlyRatePlanForOtherRoomRef,
  baseRef,
  otherRatePlanRef,
  promoNamesRef,
  avg_discount_rateRef,
  avg_rateRef,
  week_dates_dateRef,
  week_dates_rateRef,
  special_cancellation_policyRef,
  special_cancellation_policy_descRef,
  propertyIdRef,
  checkAvailabilityData
}) => {

  const contentContext = useContext(ReservationContext);
  let tmpNotAvailArray = [];

  function showDiscountDiv(room_number, noOfRooms) {
    for (let i = 1; i <= noOfRooms; i++) {
      if (i != room_number) {
        document
          .getElementById("tab_head_room_" + i)
          .classList.remove("active");
        document.getElementById("selectRoomDiv" + i).style.display = "none";
        document.getElementById("bookNextRoom" + i).style.display = "none";
      } else {
        document.getElementById("tab_head_room_" + i).classList.add("active");
        document.getElementById("selectRoomDiv" + i).style.display = "block";
        document.getElementById("bookNextRoom" + i).style.display = "block";
      }
    }
  }

  function navigate_to_next_room(room_number) {
    let noOfRooms = parseInt(document.getElementById("noOfRooms").value);
    let roomNumber = parseInt(room_number);
    let isRoomSelected = 1;
    for (let i = 1; i <= roomNumber; i++) {
      if (document.getElementById("isRoomSelected" + i).value === "0") {
        isRoomSelected = 0;
        break;
      }
    }

    if (isRoomSelected == 0) {
      alert("Please select a room type assignment for Room " + roomNumber);
      let scrollToDiv = document.getElementById("tab_head_room_" + room_number);
      scrollToDiv.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
      return false;
    } else {
      room_number = parseInt(room_number);
      let next_room_number = room_number + 1;

      document
        .getElementById("tab_head_room_" + room_number)
        .classList.remove("active");
      document.getElementById("selectRoomDiv" + room_number).style.display =
        "none";
      document.getElementById("bookNextRoom" + room_number).style.display =
        "none";

      document
        .getElementById("tab_head_room_" + next_room_number)
        .classList.add("active");
      document
        .getElementById("tab_head_room_" + next_room_number)
        .classList.remove("disbaled");
      document
        .getElementById("tab_head_room_" + next_room_number)
        .removeAttribute("disabled");
      document
        .getElementById("selectRoomDiv" + next_room_number)
        .classList.add("active");
      document.getElementById(
        "selectRoomDiv" + next_room_number
      ).style.display = "block";

      let c = document.getElementById("tab_head_room_" + next_room_number);
      c.addEventListener("click", function () {
        showDiscountDiv(next_room_number, noOfRooms);
      });

      let scrollToDiv = document.getElementById("tab_head_room_" + room_number);
      scrollToDiv.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
  }

  // function handleChange(i) {
  //   isRoomSelectedRef.current[i + 1].focus();
  // }

  // function handleChangeOne(i) {
  //   isDealSelectedRef.current[i + 1].focus();
  // }

  // function handleChangeTwo(i) {
  //   isDiscountSelectedRef.current[i + 1].focus();
  // }

  // function handleChangeThree(i) {
  //   selectedRoomTypeIdRef.current[i + 1].focus();
  // }

  // function handleChangeFour(i) {
  //   baseRateRef.current[i + 1].focus();
  // }

  // function handleChangeFive(i) {
  //   discountRateRef.current[i + 1].focus();
  // }

  // function handleChangeSix(i) {
  //   OtherRateRef.current[i + 1].focus();
  // }

  return (
    <div
      className="p-3 mt-3 pt-0 p-xs-lr-5"
      id={"selectRoomDiv" + counter}
      style={{ display: counter === 1 ? "block" : "none" }}
    >
      <div id={"roomTypeDiv" + counter}>
        <input
          type="hidden"
          value={roomsData.input_params.property_id}
          id="property_id"
          ref={propertyIdRef}
        />
        <input
          type="hidden"
          value={ReactHtmlParser(currencySign)}
          id="currencySign"
          ref={currencySignRef}
        />
        <input
          type="hidden"
          value={roomsData.no_of_rooms}
          id="noOfRooms"
          ref={noOfRoomsRef}
        />
        <input
          type="hidden"
          value={roomsData.no_of_nights}
          id="noOfNights"
          ref={noOfNightsRef}
        />
        <input
          type="hidden"
          value={roomsData.availableRoomTypes[0].room_tax_percentile}
          id="propertyTax"
          ref={propertyTaxRef}
        />
        <input
          type="hidden"
          value={roomsData.input_params.room_check_in}
          id="checkIn"
          ref={checkInRef}
        />
        <input
          type="hidden"
          value={roomsData.input_params.room_check_out}
          id="checkOut"
          ref={checkOutRef}
        />
        <input
          type="hidden"
          value={roomsData.input_params.is_google === "" ? 0 : 1}
          id="is_google"
          name="is_gogole"
          ref={is_googleRef}
        />
        <input
          type="hidden"
          id="countroom"
          value={countroom}
          ref={countroomRef}
        />

        {Object.values(roomsData.availableRoomTypes).map((data, key) => {
          if (
            parseInt(data.no_of_guest) >=
            parseInt(roomsData.input_params.adults[counter - 1]) +
              parseInt(roomsData.input_params.children[counter - 1])
          ) {
            return (
              <div
                key={key}
                className={`row m-xs-5 div${counter}${data.id} roomTypeDivSelect${counter}`}
                id={"roomTypeDivToToggle" + counter + data.id}
              >
                {/* <RoomImage images={data.room_type_images} /> */}

                {/* ternary operator to prevent the output of number 0 */}
                {typeof data === "object" ? (
                  <RoomData
                    data={data}
                    input_params={roomsData.input_params}
                    no_of_nights={roomsData.no_of_nights}
                    property_details={roomsData.property_details}
                    convertPrice={convertPrice}
                    i={counter}
                    keyRoomType={key}
                    additionalFee={additionalFee}
                    oneTimeFeeName={oneTimeFeeName}
                    oneTimeFee={oneTimeFee}
                    nightlyFeeName={nightlyFeeName}
                    nightlyFee={nightlyFee}
                    addOnDetails={roomsData.addOnDetails}
                    updateGrandTotal={updateGrandTotal}
                    showDiscountDiv={showDiscountDiv}
                    baseRef={baseRef}
                    otherRatePlanRef={otherRatePlanRef}
                    promoNamesRef={promoNamesRef}
                    policies={roomsData.policies}
                    splCancelPolicy={roomsData.special_cancellation_policy}
                    avg_discount_rateRef={avg_discount_rateRef}
                    avg_rateRef={avg_rateRef}
                    week_dates_dateRef={week_dates_dateRef}
                    week_dates_rateRef={week_dates_rateRef}
                    special_cancellation_policyRef={
                      special_cancellation_policyRef
                    }
                    special_cancellation_policy_descRef={
                      special_cancellation_policy_descRef
                    }
                    currencySign={currencySign}
                    checkAvailabilityData={checkAvailabilityData}
                  />
                ) : (
                  ""
                )}
              </div>
            );
          }
        })}
        
        {Object.values(contentContext.contentHTML).map(data => {
          if(counter === data.id){
            tmpNotAvailArray.push(<NotAvailableRooms html={data.html}/>);
            // tmpNotAvailArray.push(data.html);
          }
        })}
        {tmpNotAvailArray}

        <div
          id={"bookNextRoom" + counter}
          className="text-center"
          style={{ display: "none" }}
        >
          <input
            type="button"
            value="Book Next Room"
            className="border btn btn-success btn-lg "
            onClick={() => navigate_to_next_room(`${counter}`)}
          />
        </div>

        {/* <input
          type="text"
          className={"isRoomSelected"}
          name={"isRoomSelected" + counter}
          id={"isRoomSelected" + counter}
          value="0"
          ref={(ref) => isRoomSelectedRef.current.push(ref)}
          onChange={() => handleChange(counter)}
        /> */}
        {/* <input
          type="hidden"
          className={"isDealSelected"}
          name={"isDealSelected" + counter}
          id={"isDealSelected" + counter}
          value="0"
          ref={(ref) => isDealSelectedRef.current.push(ref)}
          onChange={() => handleChangeOne(counter)}
        />
        <input
          type="hidden"
          className={"isDiscountSelected"}
          name={"isDiscountSelected" + counter}
          id={"isDiscountSelected" + counter}
          value="0"
          ref={(ref) => isDiscountSelectedRef.current.push(ref)}
          onChange={() => handleChangeTwo(counter)}
        /> */}
        {/* <input
          type="hidden"
          className={"selectedRoomTypeId"}
          name={"selectedRoomTypeId" + counter}
          id={"selectedRoomTypeId" + counter}
          value="0"
          ref={(ref) => selectedRoomTypeIdRef.current.push(ref)}
          onChange={() => handleChangeThree(counter)}
        /> */}
        {/* <input
          type="hidden"
          className={"baseRate"}
          name={"baseRate" + counter}
          id={"baseRate" + counter}
          value="0"
          ref={(ref) => baseRateRef.current.push(ref)}
          onChange={() => handleChangeFour(counter)}
        />
        <input
          type="hidden"
          className={"discountRate"}
          name={"discountRate" + counter}
          id={"discountRate" + counter}
          value="0"
          ref={(ref) => discountRateRef.current.push(ref)}
          onChange={() => handleChangeFive(counter)}
        />
        <input
          type="hidden"
          className={"OtherRate"}
          id={"OtherRate" + counter}
          name={"OtherRate" + counter}
          value="0"
          ref={(ref) => OtherRateRef.current.push(ref)}
          onChange={() => handleChangeSix(counter)}
        /> */}
        {/* <input
          type="hidden"
          name="showOnlyRatePlanForOtherRoom"
          id="showOnlyRatePlanForOtherRoom"
          value="0"
          ref={showOnlyRatePlanForOtherRoomRef}
        /> */}
      </div>
    </div>
  );
};

export default RoomsPage;