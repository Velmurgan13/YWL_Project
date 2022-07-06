import React, { useState, useEffect, useRef, setState } from "react";
import ReservationHeader from "../../Reservation/ReservationHeader";
// image import statement:
import BannerContainer from "../../../InnerPages/BannerComponent/BannerContainer";
import "../../../InnerPages/Reservation/StyleReservation.scss";
//image url
import wheelIcon from "../../../CommonAssets/Icons/wheelchair-solid.svg";
import xIcon from "../../../CommonAssets/Icons/xmark-solid.svg";
import GridOne from "../../../Yosemitewestgate/assets/images/innerpages/grid1.jpeg";
import { useLocation } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import RoomImage from "../sections/RoomImage";
import { useHistory } from "react-router-dom";
import {
  getSeoDescriptionData,
  getRoomsForReservation,
  submitReservationData,
} from "../../../../DataLayer/datalayerUtilities";
import { getBinUrl } from "../../../../Configuration/config_url";
import "./gridView.scss";
import RoomData from "../sections/RoomData";
import Collapse from "react-bootstrap/Collapse";
import { _ticker } from "gsap/gsap-core";

const ColumnGrid = (props, data) => {
  const [checkAvailabilityData, setcheckAvailabilityData] = useState({});
  const search = useLocation().search;
  const [seoData, setPropertySeodata] = useState([]);
  const [roomsData, setRoomsData] = useState([]);
  const [showVisible, setHideVisible] = useState(false);
  const [show, setShow] = useState(false);

  let stateCollapseKeyArray = [];
  let pushKeyValuesCollapseArray, settings;
  const [opensCollapse, setOpensCollapse] = useState([]);

  useEffect(() => {
    fetchSeoProperties();
  }, []);
  useEffect(() => {
    fetchPropertyRooms();
  }, [checkAvailabilityData]);

  const fetchPropertyRooms = async () => {
    let roomObject = {};
    roomObject["room_check_in"] = new URLSearchParams(search).get(
      "room_check_in"
    );
    roomObject["room_check_out"] = new URLSearchParams(search).get(
      "room_check_out"
    );
    roomObject["promo_code"] = new URLSearchParams(search).get("promo_code");
    roomObject["rooms"] = new URLSearchParams(search).get("rooms");
    for (let r = 1; r <= roomObject["rooms"]; r++) {
      roomObject["room" + r] = new URLSearchParams(search).get("room" + r);
    }

    const response = await getRoomsForReservation(roomObject);
    setRoomsData(response.data);
    // console.log("API DATA JSON"); console.log(response.data); console.log("API DATA JSON END");
  };

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData("4");
    setPropertySeodata(response.data);
  };
  // function setcheckAvailability(checkAvailabilityData) {
  //   setcheckAvailabilityData(checkAvailabilityData);
  // }
  // console.log("this is data ", roomsData);
  // *************************************** //
  var roomsDataArray = [];
  let convertPrice = 1;
  let currencySign = "$";
  let suggestions = 0;
  let promoCodesArray = [];
  let countroom = 0;
  let oneTimeFee = 0;
  let nightlyFee = 0;
  let additionalFee = 0;
  let no_of_nights = 0;
  let oneTimeFeeName = "One Time Fee";
  let nightlyFeeName = "Nightly Fee";
  // let bookNextRoomButton = '';
  let promoAppliedThroughUrl = "";
  let promoAppliedThroughUrlId = "";
  let arrivalDate = "";
  let departureDate = "";
  let noOfRooms = "";
  let noOfAdults = "";
  let noOfChildren = "";
  let childrenAge = "";
  let totalRoomTypeHTML = [];
  let room_tax_percentile = 0;
  let oneTimeFeeHTML = "";
  let nightlyFeeHTML = "";
  let addonids = [];
  window.localStorage.removeItem("addons");
  let isAllRoomSelected = 1;

  // Rahul START
  // const [checkAvailabilityData, setcheckAvailabilityData] = useState({});
  // const search = useLocation().search;
  const history = useHistory();
  const is_googleRef = useRef();
  const baseRef = useRef();
  const arrivalDateRef = useRef();
  const departureDateRef = useRef();
  const noOfRoomsRef = useRef();
  const noOfAdultsRef = useRef();
  const noOfChildrenRef = useRef();
  const childrenAgeRef = useRef();
  const addPromoChargeRef = useRef();
  const isPromoCodeAppliedRef = useRef();
  const addOnChargesAddedRef = useRef();
  const isAddOnFeesExistRef = useRef();
  const promoAppliedThroughUrlRef = useRef();
  const promoAppliedThroughUrlIdRef = useRef();
  const currencySignRef = useRef();
  const noOfNightsRef = useRef();
  const propertyTaxRef = useRef();
  const checkInRef = useRef();
  const checkOutRef = useRef();
  const countroomRef = useRef();
  const isRoomSelectedRef = React.useRef([]);
  const isDealSelectedRef = React.useRef([]);
  const isDiscountSelectedRef = React.useRef([]);
  const selectedRoomTypeIdRef = React.useRef([]);
  const baseRateRef = React.useRef([]);
  const discountRateRef = React.useRef([]);
  const OtherRateRef = React.useRef([]);
  const showOnlyRatePlanForOtherRoomRef = useRef();
  const roomLeftRef = React.useRef([]);
  const roomTypeIdRef = React.useRef([]);
  const roomTypeNameRef = React.useRef([]);
  const avgBaseRateRef = React.useRef([]);
  const avgDiscountRateRef = React.useRef([]);
  const otherRatePlanRef = React.useRef([]);
  const promoNamesRef = React.useRef([]);
  // const addOnAmountRef = React.useRef([]);
  // const addOnQuantityRef = React.useRef([]);
  const addon_total_priceRef = React.useRef([]);
  const addon_quantityRef = React.useRef([]);
  const addon_priceRef = React.useRef([]);
  const addOnIdRef = React.useRef([]);
  const addon_tax_percentRef = React.useRef([]);
  const addon_tax_amountRef = React.useRef([]);
  const perItemAddonRef = React.useRef([]);
  const perPersonAddonRef = React.useRef([]);
  const perNightAddonRef = React.useRef([]);
  const avg_discount_rateRef = React.useRef([]);
  const avg_rateRef = React.useRef([]);
  const week_dates_dateRef = React.useRef([]);
  const week_dates_rateRef = React.useRef([]);
  const special_cancellation_policyRef = React.useRef([]);
  const special_cancellation_policy_descRef = React.useRef([]);

  function bookItNow(noOfRooms) {
    // let isAllRoomSelected = 1;
    for (var r = 1; r <= noOfRooms; r++) {
      if (parseInt(document.getElementById("isRoomSelected" + r).value) === 0) {
        isAllRoomSelected = 0;
        break;
      }
    }

    if (isAllRoomSelected === 0) {
      alert("Please select a room type assignment for Room " + r);

      let scrollToDiv = document.getElementById("tab_head_room_" + r);
      scrollToDiv.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
  }

  function generateSimpleObject(obj) {
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

  if (roomsData.availableRoomTypes) {
    suggestions = roomsData.availableRoomTypes.action;
    no_of_nights =
      parseInt(roomsData.no_of_nights) > 0
        ? parseInt(roomsData.no_of_nights)
        : 1;

    // Object.values(roomsData.availableRoomTypes).map((data) => {
    //   // console.log(data);
    // });

    // additional OneTimeFee and NightlyFee calculation
    Object.values(roomsData.additionalFeesList).map((addFee) => {
      if (addFee.fee_type === "onetime" && addFee.fee_name !== "") {
        oneTimeFee =
          parseInt(addFee.fee_amount) * parseInt(roomsData.no_of_rooms);
        oneTimeFeeName = addFee.fee_name;
        additionalFee = additionalFee + oneTimeFee;
      }
      if (addFee.fee_type === "nightly") {
        nightlyFee =
          parseInt(addFee.fee_amount) *
          parseInt(roomsData.no_of_rooms) *
          no_of_nights;
        nightlyFeeName = addFee.fee_name;
        additionalFee = additionalFee + nightlyFee;
      }
    });

    function roomLeftRefChange(i) {
      roomLeftRef.current[i + 1].focus();
    }

    var hiddenRoomsLeft = Object.values(roomsData.availableRoomTypes).map(
      (data) => {
        if (data.promo_codes_available) {
          promoCodesArray.push(data.promo_codes_available);
        }

        if (typeof data === "object") {
          countroom++;
          return (
            <input
              type="hidden"
              defaultValue={data.vacant_rooms}
              id={"roomLeft" + data.id}
              name={"roomLeft" + data.id}
              ref={(ref) => roomLeftRef.current.push(ref)}
              onChange={() => roomLeftRefChange(countroom)}
            />
          );
        }
      }
    );

    var hiddenPromocodes = Object.values(promoCodesArray).map((promos) => {
      return Object.values(promos).map((promo) => {
        return (
          <div key={promo.pc_id}>
            <input
              type="hidden"
              defaultValue={
                promo.limit !== "0"
                  ? parseInt(promo.limit) - parseInt(promo.no_of_time_used)
                  : "unlimited"
              }
              id={"discountLeft" + promo.pc_id}
            />
            <input
              type="hidden"
              defaultValue={
                promo.per_day_limit !== "0"
                  ? parseInt(promo.per_day_limit) -
                    parseInt(promo.day_used_count)
                  : "unlimited"
              }
              id={"discountPerDayLeft" + promo.pc_id}
            />
          </div>
        );
      });
    });

    var hiddenPromoForAll = Object.values(roomsData.promoCodesForAll).map(
      (forAll) => {
        return (
          <>
            <input type="hidden" id={forAll.name} value={forAll.value} />
          </>
        );
      }
    );

    promoAppliedThroughUrl = roomsData.input_params.promo_code;
    promoAppliedThroughUrlId = roomsData.input_params.promo_code_id;

    arrivalDate = roomsData.input_params.room_check_in;
    departureDate = roomsData.input_params.room_check_out;
    noOfRooms = roomsData.no_of_rooms;
    noOfAdults = roomsData.input_params.serialize_adults;
    noOfChildren = roomsData.input_params.serialize_children;
    childrenAge = roomsData.input_params.serialize_child;

    room_tax_percentile = parseFloat(
      roomsData.availableRoomTypes[0].room_tax_percentile
    ).toFixed(2);

    if (oneTimeFee > 0) {
      oneTimeFeeHTML = `
      <div className'd-flex bd-highlight'>
        <div className'p-2 flex-grow-1 bd-highlight'> ${oneTimeFeeName} </div>
        <div className'p-2 bd-highlight'>${currencySign}<span id="oneTimeFeesTotal">0.00</span></div>
        <input type="hidden" id="oneTimeFees" value=${
          convertPrice * oneTimeFee
        } />
        <input type="hidden" id="oneTimeFeesName" value=${oneTimeFeeName} />
        <input type="hidden" id="isOneTimeFeesExist" value="1" />
      </div>
      `;
    } else {
      oneTimeFeeHTML = `<input type="hidden" id="isOneTimeFeesExist" value="0" />`;
    }

    if (nightlyFee > 0) {
      nightlyFeeHTML = `
      <div className'd-flex bd-highlight'>
        <div className'p-2 flex-grow-1 bd-highlight'> ${nightlyFeeName} </div>
        <div className'p-2 bd-highlight'>${currencySign}<span id="nightlyFeesTotal">0.00</span></div>
        <input type="hidden" id="nightlyFees" value=${
          convertPrice * nightlyFee
        } >
        <input type="hidden" id="nightlyFeesName" value=${nightlyFeeName} />
        <input type="hidden" id="isNightlyFeesExist" value="1" />
      </div>
      `;
    } else {
      nightlyFeeHTML = `<input type="hidden" id="isNightlyFeesExist" value="0" />`;
    }

    let scrollToDiv = document.getElementById("formReservation");
    scrollToDiv.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });
  }

  function updateGrandTotal() {
    let grandTotal = 0;
    let subTotal = 0;
    let tax = 0;
    let subTotalCharge = 0;
    let totalWithoutAddonCharge = 0;
    let propertyTax = parseFloat(document.getElementById("propertyTax").value);
    let noOfRooms = parseInt(document.getElementById("noOfRooms").value);

    for (let i = 1; i <= noOfRooms; i++) {
      let roomTotal = 0;
      let roomRate = parseFloat(
        document.getElementById("roomRate" + i).innerHTML
      );
      let extraAdultCharge = parseFloat(
        document.getElementById("extraAdultCharge" + i).innerHTML
      );
      let extraChildCharge = parseFloat(
        document.getElementById("extraChildCharge" + i).innerHTML
      );
      let discountCharge = parseFloat(
        document.getElementById("discountCharge" + i).innerText
      );

      roomTotal =
        roomRate + extraAdultCharge + extraChildCharge - discountCharge;
      document.getElementById("roomTotal" + i).innerHTML = roomTotal.toFixed(2);
      subTotal = subTotal + roomTotal;
    }

    subTotalCharge = subTotal;
    if (document.getElementById("isPromoCodeApplied").value === "1") {
      if (document.getElementById("addPromoCharge").value === "1") {
        subTotal =
          subTotal +
          parseFloat(document.getElementById("promoCodeCharge").innerHTML);
      } else {
        subTotal =
          subTotal -
          parseFloat(document.getElementById("promoCodeCharge").innerHTML);
      }
    }

    tax = (subTotal * propertyTax) / 100;
    grandTotal = subTotal + tax;

    if (parseInt(document.getElementById("isOneTimeFeesExist").value) === 1) {
      grandTotal =
        grandTotal +
        parseFloat(document.getElementById("oneTimeFeesTotal").innerHTML);
    }
    if (parseInt(document.getElementById("isNightlyFeesExist").value) === 1) {
      grandTotal =
        grandTotal +
        parseFloat(document.getElementById("nightlyFeesTotal").innerHTML);
    }

    totalWithoutAddonCharge = grandTotal;

    if (document.getElementById("isAddOnFeesExist").value === "1") {
      /* As subtotal is exists only when addon's selected */
      if (document.getElementById("isOneTimeFeesExist").value === "1") {
        subTotal =
          subTotal +
          parseFloat(document.getElementById("oneTimeFeesTotal").innerHTML);
      }

      if (document.getElementById("isNightlyFeesExist").value === "1") {
        subTotal =
          subTotal +
          parseFloat(document.getElementById("nightlyFeesTotal").innerHTML);
      }
      subTotal = subTotal + tax;

      let subTotalDisplay =
        document.getElementsByClassName("subTotalToDisplay");
      for (let r = 0; r < subTotalDisplay.length; r++) {
        subTotalDisplay[r].style.display = "block";
      }

      let noOfAddOnCharges = document.getElementById("addOnChargesAdded").value;
      let i = 1;
      while (i <= noOfAddOnCharges) {
        if (document.getElementById("addOnFeesTotal" + i) != null) {
          if (
            typeof document.getElementById("addOnFeesTotal" + i).innerHTML !=
            "undefined"
          ) {
            grandTotal =
              grandTotal +
              parseFloat(
                document.getElementById("addOnFeesTotal" + i).innerHTML
              );

            if (document.getElementById("addOnFeesTax" + i) !== null) {
              if (
                typeof document.getElementById("addOnFeesTax" + i).innerHTML !=
                "undefined"
              ) {
                grandTotal =
                  grandTotal +
                  parseFloat(
                    document.getElementById("addOnFeesTax" + i).innerHTML
                  );
              }
            }
          }
        }
        i++;
      }
    }

    if (document.getElementById("subTotalCharge") != null) {
      document.getElementById("subTotalCharge").innerHTML =
        subTotalCharge.toFixed(2);
    }

    if (document.getElementById("totalCharge") !== null) {
      document.getElementById("totalCharge").innerHTML =
        totalWithoutAddonCharge.toFixed(2);
    }

    if (document.getElementById("subTotal") != null) {
      document.getElementById("subTotal").innerHTML = subTotal.toFixed(2);
    }
    document.getElementById("tax").innerHTML = tax.toFixed(2);
    document.getElementById("grandTotal").innerHTML = grandTotal.toFixed(2);
  }

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

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission
    try {
      bookItNow(noOfRooms);
      if (isAllRoomSelected === 1) {
        const is_googleVal = is_googleRef.current
          ? is_googleRef.current.value
          : "0";
        const baseVal = baseRef.current ? baseRef.current.value : "0";
        const arrivalDateVal = arrivalDateRef.current
          ? arrivalDateRef.current.value
          : "0";
        const departureDateVal = departureDateRef.current
          ? departureDateRef.current.value
          : "0";
        const noOfRoomsVal = noOfRoomsRef.current
          ? noOfRoomsRef.current.value
          : "0";
        const noOfAdultsVal = noOfAdultsRef.current
          ? noOfAdultsRef.current.value
          : "0";
        const noOfChildrenVal = noOfChildrenRef.current
          ? noOfChildrenRef.current.value
          : "0";
        const childrenAgeVal = childrenAgeRef.current
          ? childrenAgeRef.current.value
          : "0";
        const addPromoChargeVal = addPromoChargeRef.current
          ? addPromoChargeRef.current.value
          : "0";
        const isPromoCodeAppliedVal = isPromoCodeAppliedRef.current
          ? isPromoCodeAppliedRef.current.value
          : "0";
        const addOnChargesAddedVal = addOnChargesAddedRef.current
          ? addOnChargesAddedRef.current.value
          : "0";
        const isAddOnFeesExistVal = isAddOnFeesExistRef.current
          ? isAddOnFeesExistRef.current.value
          : "0";
        const promoAppliedThroughUrlVal = promoAppliedThroughUrlRef.current
          ? promoAppliedThroughUrlRef.current.value
          : "0";
        const promoAppliedThroughUrlIdVal = promoAppliedThroughUrlIdRef.current
          ? promoAppliedThroughUrlIdRef.current.value
          : "0";
        const currencySignVal = currencySignRef.current
          ? currencySignRef.current.value
          : "0";
        const noOfNightsVal = noOfNightsRef.current
          ? noOfNightsRef.current.value
          : "0";
        const propertyTaxVal = propertyTaxRef.current
          ? propertyTaxRef.current.value
          : "0";
        const checkInVal = checkInRef.current ? checkInRef.current.value : "0";
        const checkOutVal = checkOutRef.current
          ? checkOutRef.current.value
          : "0";
        const countroomVal = countroomRef.current
          ? countroomRef.current.value
          : "0";
        const showOnlyRatePlanForOtherRoomVal =
          showOnlyRatePlanForOtherRoomRef.current
            ? showOnlyRatePlanForOtherRoomRef.current.value
            : "0";

        // ===
        // const addOnQuantityVal = addOnQuantityRef;
        // const addOnAmountVal = addOnAmountRef;
        // ===

        const OtherRateVal = generateSimpleObject(OtherRateRef);
        const otherRatePlanVal = generateSimpleObject(otherRatePlanRef);
        const promoNamesVal = generateSimpleObject(promoNamesRef);
        const roomLeftVal = generateSimpleObject(roomLeftRef);
        const roomTypeIdVal = generateSimpleObject(roomTypeIdRef);
        const roomTypeNameVal = generateSimpleObject(roomTypeNameRef);
        const avgBaseRateVal = generateSimpleObject(avgBaseRateRef);
        const avgDiscountRateVal = generateSimpleObject(avgDiscountRateRef);
        const avg_discount_rateVal = generateSimpleObject(avg_discount_rateRef);
        const avg_rateVal = generateSimpleObject(avg_rateRef);
        const baseRateVal = generateSimpleObject(baseRateRef);
        const discountRateVal = generateSimpleObject(discountRateRef);
        const isDealSelectedVal = generateSimpleObject(isDealSelectedRef);
        const isDiscountSelectedVal = generateSimpleObject(
          isDiscountSelectedRef
        );
        const isRoomSelectedVal = generateSimpleObject(isRoomSelectedRef);
        const week_dates_dateVal = generateSimpleObject(week_dates_dateRef);
        const week_dates_rateVal = generateSimpleObject(week_dates_rateRef);
        const selectedRoomTypeIdVal = generateSimpleObject(
          selectedRoomTypeIdRef
        );
        const addon_total_priceVal = generateSimpleObject(addon_total_priceRef);
        const addon_quantityVal = generateSimpleObject(addon_quantityRef);
        const addon_priceVal = generateSimpleObject(addon_priceRef);
        const addon_tax_percentVal = generateSimpleObject(addon_tax_percentRef);
        const addon_tax_amountVal = generateSimpleObject(addon_tax_amountRef);
        const perItemAddonVal = generateSimpleObject(perItemAddonRef);
        const perPersonAddonVal = generateSimpleObject(perPersonAddonRef);
        const perNightAddonVal = generateSimpleObject(perNightAddonRef);
        const addOnIdVal = generateSimpleObject(addOnIdRef);
        const special_cancellation_policyVal = generateSimpleObject(
          special_cancellation_policyRef
        );
        const special_cancellation_policy_descVal = generateSimpleObject(
          special_cancellation_policy_descRef
        );

        const binData = {
          is_google: is_googleVal,
          base: baseVal,
          arrivalDate: arrivalDateVal,
          departureDate: departureDateVal,
          noOfRooms: noOfRoomsVal,
          noOfAdults: noOfAdultsVal,
          noOfChildren: noOfChildrenVal,
          childrenAge: childrenAgeVal,
          addPromoCharge: addPromoChargeVal,
          isPromoCodeApplied: isPromoCodeAppliedVal,
          addOnChargesAdded: addOnChargesAddedVal,
          isAddOnFeesExist: isAddOnFeesExistVal,
          promoAppliedThroughUrl: promoAppliedThroughUrlVal,
          promoAppliedThroughUrlId: promoAppliedThroughUrlIdVal,
          currencySign: currencySignVal,
          noOfNights: noOfNightsVal,
          propertyTax: propertyTaxVal,
          checkIn: checkInVal,
          checkOut: checkOutVal,
          countroom: countroomVal,
          showOnlyRatePlanForOtherRoom: showOnlyRatePlanForOtherRoomVal,

          // ===
          // addOnQuantity: addOnQuantityVal.current,
          // addOnAmount: addOnAmountVal.current,
          // ===

          OtherRate: OtherRateVal,
          otherRatePlan: otherRatePlanVal,
          promoNames: promoNamesVal,
          roomLeft: roomLeftVal,
          roomTypeId: roomTypeIdVal,
          roomTypeName: roomTypeNameVal,
          avgBaseRate: avgBaseRateVal,
          avgDiscountRate: avgDiscountRateVal,
          avg_discount_rate: avg_discount_rateVal,
          avg_rate: avg_rateVal,
          baseRate: baseRateVal,
          discountRate: discountRateVal,
          isDealSelected: isDealSelectedVal,
          isDiscountSelected: isDiscountSelectedVal,
          selectedRoomTypeId: selectedRoomTypeIdVal,
          isRoomSelected: isRoomSelectedVal,
          week_dates_date: week_dates_dateVal,
          week_dates_rate: week_dates_rateVal,
          special_cancellation_policy: special_cancellation_policyVal,
          special_cancellation_policy_desc: special_cancellation_policy_descVal,
          addon_total_price: addon_total_priceVal,
          addon_quantity: addon_quantityVal,
          addon_price: addon_priceVal,
          addon_tax_percent: addon_tax_percentVal,
          addon_tax_amount: addon_tax_amountVal,
          perItemAddon: perItemAddonVal,
          perPersonAddon: perPersonAddonVal,
          perNightAddon: perNightAddonVal,
          addOnId: addOnIdVal,
          themeName: "react",
        };

        // console.log(binData);

        const response = await submitReservationData(binData);
        if (response.data.type === "error") {
          // history.replace("/");
        } else {
          let addonLocal = "";
          let queryParams = "";

          if (window.localStorage.getItem("addons") !== null) {
            addonLocal = localStorage.getItem("addons");
            localStorage.removeItem("addons");
          }

          if (addonLocal !== "") {
            queryParams = "?q=" + response.data.msg + "&r=" + addonLocal;
          } else {
            queryParams = "?q=" + response.data.msg;
          }

          window.open(getBinUrl + queryParams, "_self");
        }
      } else {
        return false;
      }
    } catch (e) {
      // console.log(e);
      alert(`Error! ${e.message}`);
    }
  };

  const showRoomTypeClick = (key) => {
    if (show) {
      // document.getElementById("collapseIdAmenities" + key).style.display = "block";
      setShow(false);
    } else {
      // document.getElementById("collapseIdAmenities" + key).style.display = "none";
      setShow(true);
    }
    toggleViewMoreCollapse(key);
  };
  // *************************************** //

  var msgDiv = "";

  // console.log("dbghdsbgbs", roomsData);
  // console.log("bata bhai", show);

  const collapseObjectArray = function (keys) {
    pushKeyValuesCollapseArray = { id: keys, open: false };
    stateCollapseKeyArray.push(pushKeyValuesCollapseArray);
    settings = stateCollapseKeyArray;
  };

  (() => {
    {
      roomsData.availableRoomTypes &&
        Object.values(roomsData.availableRoomTypes).map((data, key) => {
          return typeof data == "object" ? collapseObjectArray(key) : null;
        });

      // console.log("asdsad: ", opensCollapse.length);
      if (roomsData.availableRoomTypes && opensCollapse.length === 0) {
        setOpensCollapse(stateCollapseKeyArray);
      }
    }
  })();

  const toggleViewMoreCollapse = function (k) {
    let newarrray = [...opensCollapse];
    for (const obj of newarrray) {
      if (obj.id === k) {
        obj.open = !obj.open;
      } else {
        obj.open = obj.open;
      }
    }
    setOpensCollapse(newarrray);
    // settings = newarrray;
    console.table("opencaollapse", opensCollapse[0].open);
  };

  const setAtt = function () {
    console.log("called");
  };

  return (
    <>
      <section>
        <BannerContainer seoData={seoData} />
        <ReservationHeader
          msgData={roomsData.property_message_reservation_top}
        />
        <div className="container vertical-menu-slide">
          <form name="formReservation" id="formReservation" onSubmit={onSubmit}>
            <>
              <div>
                {roomsData.availableRoomTypes &&
                  opensCollapse.length !== 0 &&
                  Object.values(roomsData.availableRoomTypes).map(
                    (data, key) => {
                      return typeof data == "object" ? (
                        <>
                          <div className="col-md-4 col-6 forGrid">
                            <RoomImage
                              images={data.room_type_images}
                              className="col-12"
                            />
                            <h4 className="mt-2 ml-3 cardTitle">{data.name}</h4>
                            <div className="d-flex flex-row my-2">
                              <div className="d-flex col-6">
                                <p className="mt-1 font-weight-bold">From</p>
                                <h3 className="text-danger ml-3">
                                  {" "}
                                  ${data.rates}
                                </h3>
                              </div>
                              <div className="mb-2 col-6 px-0">
                                <button
                                  className="home-readmore-btn ls-1 welcome-btn btn-style"
                                  onClick={() => showRoomTypeClick(key)}
                                  title={
                                    showVisible ? "READ LESS" : "READ MORE"
                                  }
                                  type="button"
                                  aria-expanded={opensCollapse[key].open}
                                  aria-controls={"collapseIdAmenities" + key}
                                >
                                  READ MORE
                                </button>
                              </div>
                            </div>
                          </div>

                          <div
                            className="col-md-12 col-12 floatL"
                            id={"collapseIdAmenities" + key}
                          >
                            <Collapse in={opensCollapse[key].open}>
                              <div id={"showRoomType" + key}>
                                {typeof data == "object"
                                  ? roomsDataArray.push(
                                      <RoomData
                                        data={data}
                                        input_params={roomsData.input_params}
                                        no_of_nights={roomsData.no_of_nights}
                                        property_details={
                                          roomsData.property_details
                                        }
                                        convertPrice={convertPrice}
                                        i={1}
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
                                        splCancelPolicy={
                                          roomsData.special_cancellation_policy
                                        }
                                        avg_discount_rateRef={
                                          avg_discount_rateRef
                                        }
                                        avg_rateRef={avg_rateRef}
                                        week_dates_dateRef={week_dates_dateRef}
                                        week_dates_rateRef={week_dates_rateRef}
                                        special_cancellation_policyRef={
                                          special_cancellation_policyRef
                                        }
                                        special_cancellation_policy_descRef={
                                          special_cancellation_policy_descRef
                                        }
                                      />
                                    )
                                  : ""}

                                {hiddenRoomsLeft}
                                {hiddenPromocodes}
                                {roomsDataArray[key]}
                                {hiddenPromoForAll}
                              </div>
                            </Collapse>
                          </div>
                        </>
                      ) : null;
                    }
                  )}
              </div>
            </>
          </form>
          <div className="mt-3">
            <span className="sort_bar my-3">
              Step 2: Review Your Total Price and Continue by Clicking Book It
              Now
            </span>
            <div className="bg-color-price border">
              <div className="d-flex bd-highlight">
                <div className="p-2 flex-grow-1 bd-highlight">Room 1:</div>
                <div className="p-2 bd-highlight">$0.00</div>
              </div>
              <div className="d-flex bd-highlight">
                <div className="p-2 flex-grow-1 bd-highlight">
                  Extra Adult Fee
                </div>
                className{" "}
              </div>
              <div className="d-flex bd-highlight">
                <div className="p-2 flex-grow-1 bd-highlight">
                  Extra Child Fee
                </div>
                <div className="p-2 bd-highlight">$0.00</div>
              </div>
              <div className="d-flex bd-highlight bg-white">
                <div className="p-2 flex-grow-1 bd-highlight font-weight-bold">
                  Room 1 Total
                </div>
                <div className="p-2 bd-highlight">$0.00</div>
              </div>
              <div className="d-flex bd-highlight">
                <div className="p-2 flex-grow-1 bd-highlight">
                  Taxes<span className="text-danger">(13.00%)</span>
                </div>
                <div className="p-2 bd-highlight">$0.00</div>
              </div>
              <div className="d-flex bd-highlight">
                <div className="p-2 flex-grow-1 bd-highlight">
                  City Tourism Tax
                </div>
                <div className="p-2 bd-highlight">$0.00</div>
              </div>
              <div className="d-flex bd-highlight bg-white">
                <div className="p-2 flex-grow-1 bd-highlight">
                  <span className="font-weight-bold">Grand Total</span>
                </div>
                <div className="p-2 bd-highlight">$0.00</div>
              </div>
              <div className="text-center">
                <button
                  type="button"
                  className="border my-3 btn btn-success btn-lg px-3"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ColumnGrid;
{
  /* <button
                          className="home-readmore-btn ls-1 welcome-btn btn-style"
                          onClick={() => setHideVisible(!showVisible)}
                        >
                          {showVisible ? "READ LESS" : "READ MORE"}{" "}
                        </button> */
}
