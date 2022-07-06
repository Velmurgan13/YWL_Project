import React, { useState, useEffect, useRef, createContext } from "react";
import ReactHtmlParser from "react-html-parser";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ".././Reservation/StyleReservation.scss";
import ReservationHeader from "../../InnerPages/Reservation/ReservationHeader";
import {
  getSeoDescriptionData,
  getRoomsForReservation,
  submitReservationData,
} from "../../../DataLayer/datalayerUtilities";
import { getBinUrl } from "../../../Configuration/config_url";
// import {BiError} from "react-icons/bi";
import errorIcons from "../../CommonAssets/Icons/errorIcon.svg";

//sections import
import RoomNumbersHeader from "./sections/RoomNumbersHeader";
import RoomsPage from "./sections/RoomsPage";
import HiddenInputs from "./sections/HiddenInputs";
import RoomSuggestions from "./sections/RoomSuggestions";
import AddOns from "./sections/AddOns";
import SummaryRoomType from "./sections/SummaryRoomType";

//common banner component
import BannerContainer from "../BannerComponent/BannerContainer";
import { useHistory } from "react-router-dom";

const ReservationContext = createContext();

// const scrollToRef = (ref) => {
//   window.scrollTo({ behavior: "smooth", top: ref.current.offsetTop });
// };
const ReservationComponent = () => {
  const [contentHTML , setContentHTML] = useState([]);
  // console.log("contentHTML: ", contentHTML);

  var error = `<img src=${errorIcons} width="30" class="my-2"/>`;

  // submitted data START
  const [checkAvailabilityData, setcheckAvailabilityData] = useState({});
  const search = useLocation().search;
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
  const propertyIdRef = useRef();
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
  // const [searchParams, setSearchParams] = useSearchParams();
  // const [searchParams] = useSearchParams();

  function roomLeftRefChange(i) {
    roomLeftRef.current[i + 1].focus();
  }
  // submitted data END

  const [seoData, setPropertySeodata] = useState([]);
  // const [error, setError] = useState()
  // const [showtext, setShowText] = useState(true)
  // const [modalOpen, setModalOpen] = useState(false)
  const [roomsData, setRoomsData] = useState([]);
  var roomsPage = [];
  let roomsAvailable = true;

  // let convertPrice = 1;
  // let currencySign = "$";
  const [convertPrice, setConvertPrice] = useState(1);
  const [currencySign, setCurrencySign] = useState('$');
  const [currencyAbbr, setCurrencyAbbr] = useState('USD');
  const [currencyFlagAbbr, setCurrencyFlagAbbr] = useState('us');
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
  let roomsHiddenInputs = [];
  // let incr = 0;

  function setcheckAvailability(checkAvailabilityData) {
    setcheckAvailabilityData(checkAvailabilityData);
  }

  function addOnSelection() {
    let scrollToDiv = document.getElementById("stepNo");
    scrollToDiv.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });
    return false;
  }

  // console.log('currencyFlagAbbr', currencyFlagAbbr, currencyAbbr, currencySign)
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
      /* As subtotal exists only when addon are selected */
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


  function bookItNow(noOfRooms) {
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

  // function handleChange(i) {
  //   isRoomSelectedRef.current[i + 1].focus();
  // }

  // Rahul START
  if (roomsData.availableRoomTypes) {
    suggestions = roomsData.availableRoomTypes.action;
    no_of_nights =
      parseInt(roomsData.no_of_nights) > 0
        ? parseInt(roomsData.no_of_nights)
        : 1;

    // test - to be removed later
    Object.values(roomsData.availableRoomTypes).map((data) => {
      // console.log(data);
    });

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
      <div class='d-flex bd-highlight'>
        <div class='p-2 flex-grow-1 bd-highlight'> ${oneTimeFeeName} </div>
        <div class='p-2 bd-highlight'>${currencySign}<span id="oneTimeFeesTotal">0.00</span></div>
        <input type="hidden" id="oneTimeFees" value=${convertPrice * oneTimeFee} />
        <input type="hidden" id="oneTimeFeesName" value=${oneTimeFeeName} />
        <input type="hidden" id="isOneTimeFeesExist" value="1" />
      </div>
      `;
    } else {
      oneTimeFeeHTML = `<input type="hidden" id="isOneTimeFeesExist" value="0" />`;
    }

    if (nightlyFee > 0) {
      nightlyFeeHTML = `
      <div class='d-flex bd-highlight'>
        <div class='p-2 flex-grow-1 bd-highlight'> ${nightlyFeeName}
        </div>
        <div class='p-2 bd-highlight'>${currencySign}<span id="nightlyFeesTotal">0.00</span></div> 
        
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

  useEffect(() => {
    fetchPropertyRooms();
  }, [checkAvailabilityData, convertPrice]);

  const fetchPropertyRooms = async () => {
    let roomObject = {};
    roomObject["room_check_in"] = new URLSearchParams(search).get("room_check_in");
    roomObject["room_check_out"] = new URLSearchParams(search).get("room_check_out");
    roomObject["promo_code"] = new URLSearchParams(search).get("promo_code");
    roomObject["rooms"] = new URLSearchParams(search).get("rooms");
    for (let r = 1; r <= roomObject["rooms"]; r++) {
      roomObject["room" + r] = new URLSearchParams(search).get("room" + r);
    }

    // console.log("API DATA JSON OBJECT"); console.log('roomObject: ', roomObject);
    const response = await getRoomsForReservation(roomObject);
    setRoomsData(response.data);
    // console.log("API DATA JSON"); console.log(response.data); console.log("API DATA JSON END");
  };
  // Rahul END

  useEffect(() => {
    fetchSeoProperties();
  }, []);

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData("4");
    setPropertySeodata(response.data);
  };

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
        const propertyIdVal = propertyIdRef.current
          ? propertyIdRef.current.value
          : (document.getElementById('property_id')) ? document.getElementById('property_id') : '0';
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
          currencyAbbr: currencyAbbr,
          convertPrice: convertPrice,
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
          propertyId: propertyIdVal
        };

        // console.log('binData: ', binData); return false;

        const response = await submitReservationData(binData);
        if (response.data.type === "error") {
          history.replace("/");
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

          window.open(getBinUrl + queryParams, "_blank");
        }
      } else {
        return false;
      }
    } catch (e) {
      alert(`Error! ${e.message}`);
    }
  };

  return (
    <section>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.4 }}
      >
        <BannerContainer
          seoData={seoData}
          inputParams={roomsData.input_params}
          setcheckAvailability={setcheckAvailability}
        />
      </motion.div>

      <ReservationHeader msgData={roomsData.property_message_reservation_top} 
                        isRoomsAvailable={roomsData.availableRoomTypes} 
                        all_country_currency_code={roomsData.all_country_currency_code} 
                        setConvertPrice={setConvertPrice} 
                        setCurrencySign={setCurrencySign} 
                        setCurrencyAbbr={setCurrencyAbbr} 
                        currencyAbbr={currencyAbbr} 
                        setCurrencyFlagAbbr={setCurrencyFlagAbbr} 
                        currencyFlagAbbr={currencyFlagAbbr} 
                        suggestions={suggestions}/>
      <div className="container vertical-menu-slide p-0">
        <form name="formReservation" id="formReservation" onSubmit={onSubmit}>

          {(() => {
            if (suggestions !== 1) {
              if (roomsData.availableRoomTypes === "invalidPromoCode") {
                roomsPage.push(
                  ReactHtmlParser(`
                <div class='text-danger text-center mt-3 mb-4'>
                  We are sorry but you have entered an <br />
                  ${error}
                  <h2 class="M0 Red FS30">Invalid Promotion Code</h2> for your selected dates. <br class="MT10 DB " />
                  Please select alternative dates or remove the promo code and perform a search for your desired dates again.<br/> 
                  If you still run into issues, please contact the INNkeeper by clicking <a href="/contact-us"  target="_blank" > here </a>
                <div>`)
                );
                roomsAvailable = false;
              }else if(roomsData.availableRoomTypes === false){
                roomsPage.push(
                  ReactHtmlParser(`
                <div class='text-danger text-center mt-3 mb-4'>
                  We are really sorry, but we have <br />
                  ${error}
                  <h1 class="M0 Red FS30">No Vacancy!</h1> for your selected dates. <br class="MT10 DB " />
                  Please try another set of dates to check availability.
                <div>`)
                );
                roomsAvailable = false;
              } else {
                // rooms list
                for (let i = 1; i <= roomsData.no_of_rooms; i++) {
                  // if (parseInt(roomsData.availableRoomTypes[i - 1].no_of_guest) >= (parseInt(roomsData.input_params.adults[i - 1]) + parseInt(roomsData.input_params.children[i - 1]))) {
                  roomsPage.push(
                    <ReservationContext.Provider value={{contentHTML , setContentHTML}}>
                    <RoomsPage
                      convertPrice={convertPrice}
                      roomsData={roomsData}
                      counter={i}
                      countroom={countroom}
                      additionalFee={additionalFee}
                      oneTimeFeeName={oneTimeFeeName}
                      oneTimeFee={oneTimeFee}
                      nightlyFeeName={nightlyFeeName}
                      nightlyFee={nightlyFee}
                      updateGrandTotal={updateGrandTotal}
                      currencySign={currencySign}
                      is_googleRef={is_googleRef}
                      // isRoomSelectedRef={isRoomSelectedRef}
                      currencySignRef={currencySignRef}
                      noOfRoomsRef={noOfRoomsRef}
                      noOfNightsRef={noOfNightsRef}
                      propertyTaxRef={propertyTaxRef}
                      checkInRef={checkInRef}
                      checkOutRef={checkOutRef}
                      countroomRef={countroomRef}
                      // isDealSelectedRef={isDealSelectedRef}
                      // isDiscountSelectedRef={isDiscountSelectedRef}
                      // selectedRoomTypeIdRef={selectedRoomTypeIdRef}
                      // baseRateRef={baseRateRef}
                      // discountRateRef={discountRateRef}
                      // OtherRateRef={OtherRateRef}
                      // showOnlyRatePlanForOtherRoomRef={
                      //   showOnlyRatePlanForOtherRoomRef
                      // }
                      baseRef={baseRef}
                      otherRatePlanRef={otherRatePlanRef}
                      promoNamesRef={promoNamesRef}
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
                      propertyIdRef={propertyIdRef}
                      checkAvailabilityData={checkAvailabilityData}
                    />
                    </ReservationContext.Provider>
                  );

                  /* 
                    This component is created to prevent the values of hidden input
                    elements from resetting when a room having "ONLY 1 ROOM LEFT" was selected.

                    Becuase on selecting "ONLY 1 ROOM LEFT" room the constant "contentHTML"
                    is updated (to move that room div to the bottom of the page for the 
                    next room) and because of constant updated value the component was 
                    rendered and the input values were back to initial value.
                  */
                  roomsHiddenInputs.push(
                    <HiddenInputs isRoomSelectedRef={isRoomSelectedRef}
                                  isDealSelectedRef={isDealSelectedRef}
                                  isDiscountSelectedRef={isDiscountSelectedRef}
                                  selectedRoomTypeIdRef={selectedRoomTypeIdRef}
                                  baseRateRef={baseRateRef}
                                  discountRateRef={discountRateRef}
                                  OtherRateRef={OtherRateRef}
                                  showOnlyRatePlanForOtherRoomRef={
                                    showOnlyRatePlanForOtherRoomRef
                                  }
                                  counter={i} 
                                  roomTypeIdRef={roomTypeIdRef}
                                  roomTypeNameRef={roomTypeNameRef}
                                  avgBaseRateRef={avgBaseRateRef}
                                  avgDiscountRateRef={avgDiscountRateRef}
                    />
                  );
                  // }
                }
              }
            } else {
              roomsPage.push(<RoomSuggestions roomsData={roomsData} />);
            }
          })()}

          {
            // Number of rooms header
            suggestions !== 1 ? (
              roomsAvailable && <RoomNumbersHeader
                noOfRooms={roomsData.no_of_rooms}
                inputParams={roomsData.input_params}
              />
            ) : (
              ""
            )
          }

          {/* rooms div START */}
          {hiddenRoomsLeft}
          {hiddenPromocodes}
          {roomsPage}
          {roomsHiddenInputs}
          {hiddenPromoForAll}
          {/* rooms div END */}

          <input
            type="hidden"
            id="addOnChargesAdded"
            defaultValue="0"
            ref={addOnChargesAddedRef}
          />
          <input
            type="hidden"
            id="isAddOnFeesExist"
            defaultValue="0"
            ref={isAddOnFeesExistRef}
          />
          <input
            type="hidden"
            name="promoAppliedThroughUrl"
            defaultValue={promoAppliedThroughUrl}
            ref={promoAppliedThroughUrlRef}
          />
          <input
            type="hidden"
            name="promoAppliedThroughUrlId"
            defaultValue={promoAppliedThroughUrlId}
            ref={promoAppliedThroughUrlIdRef}
          />

          {suggestions !== 1 && (
            <>
              {/* addon START */}
              <div id="selectAddOnDiv" style={{ display: "none" }}>
                <div>
                  <span className="sort_bar my-3">
                    Step 2: Add – On(s) – Select From Our Wonderful Offers,
                    Activities, And Packages You Can Add To Your Reservation
                  </span>
                </div>

                {roomsData.addOnDetails && (
                  <AddOns
                    convertPrice={convertPrice}
                    addOnDetails={roomsData.addOnDetails}
                    updateGrandTotal={updateGrandTotal}
                    addonids={addonids}
                    /*addOnAmountRef={addOnAmountRef}
                    addOnQuantityRef={addOnQuantityRef}*/ 
                    addon_total_priceRef={addon_total_priceRef}
                    addon_quantityRef={addon_quantityRef}
                    addon_priceRef={addon_priceRef}
                    addOnIdRef={addOnIdRef}
                    addon_tax_percentRef={addon_tax_percentRef}
                    addon_tax_amountRef={addon_tax_amountRef}
                    perNightAddonRef={perNightAddonRef}
                    perItemAddonRef={perItemAddonRef}
                    perPersonAddonRef={perPersonAddonRef}
                    currencySign={currencySign}
                  />
                )}
                <input
                  type="hidden"
                  id="addon-added-counter"
                  defaultValue="0"
                />
              </div>
              {/* addon END */}

              <div
                id="proceedCheckout"
                className="checkout-btn text-center"
                style={{ display: "none" }}
              >
                <button
                  type="button"
                  className="border btn btn-success btn-lg addOn-checkout-btn mt-3"
                  onClick={() => addOnSelection()}
                >
                  Proceed to Check Out
                </button>
              </div>

              {roomsAvailable && (
              <div>
                <span className="sort_bar my-3 py-3">
                  Step <span id="stepNo">2</span>: Review Your Total Price and
                  Continue by Clicking Book It Now
                </span>

                <input
                  type="hidden"
                  name="arrivalDate"
                  defaultValue={arrivalDate}
                  ref={arrivalDateRef}
                />
                <input
                  type="hidden"
                  name="departureDate"
                  defaultValue={departureDate}
                  ref={departureDateRef}
                />
                <input
                  type="hidden"
                  name="noOfRooms"
                  defaultValue={noOfRooms}
                  ref={noOfRoomsRef}
                />
                <input
                  type="hidden"
                  name="noOfAdults"
                  defaultValue={noOfAdults}
                  ref={noOfAdultsRef}
                />
                <input
                  type="hidden"
                  name="noOfChildren"
                  defaultValue={noOfChildren}
                  ref={noOfChildrenRef}
                />
                <input
                  type="hidden"
                  name="childrenAge"
                  defaultValue={childrenAge}
                  ref={childrenAgeRef}
                />

                <div className="bg-color-price border mb-5 p-3 FS16 summaryTotal">
                  {(() => {
                    for (let i = 1; i <= roomsData.no_of_rooms; i++) {
                      // rooms types here
                      totalRoomTypeHTML.push(
                        <SummaryRoomType
                          i={i}
                          noOfRooms={noOfRooms}
                          // roomTypeIdRef={roomTypeIdRef}
                          // roomTypeNameRef={roomTypeNameRef}
                          // avgBaseRateRef={avgBaseRateRef}
                          // avgDiscountRateRef={avgDiscountRateRef}
                          currencySign={currencySign}
                        />
                      );
                    }
                  })()}
                  {totalRoomTypeHTML}

                  <input
                    type="hidden"
                    id="addPromoCharge"
                    defaultValue="0"
                    ref={addPromoChargeRef}
                  />
                  <input
                    type="hidden"
                    id="isPromoCodeApplied"
                    defaultValue="0"
                    ref={isPromoCodeAppliedRef}
                  />

                  <div className="d-flex bd-highlight">
                    <div className="p-2 flex-grow-1 bd-highlight">
                      Taxes &nbsp;
                      <span className="text-danger">
                        ({room_tax_percentile}%)
                      </span>
                    </div>
                    <div className="p-2 bd-highlight">
                    {ReactHtmlParser(currencySign)}<span id="tax">0.00</span>
                    </div>
                  </div>

                  {ReactHtmlParser(oneTimeFeeHTML)}
                  {ReactHtmlParser(nightlyFeeHTML)}

                  <div className="d-flex bd-highlight bg-white">
                    <div
                      className="p-2 flex-grow-1 bd-highlight subTotalToDisplay"
                      style={{ display: "none" }}
                    >
                      <span className="font-weight-bold">Sub Total</span>
                    </div>
                    <div
                      className="p-2 bd-highlight subTotalToDisplay"
                      style={{ display: "none" }}
                    >
                      {ReactHtmlParser(currencySign)}<span id="totalCharge">0.00</span>
                    </div>
                  </div>

                  <div className="d-flex bd-highlight addOnPara addOnDetails"></div>

                  <div className="d-flex bd-highlight bg-white">
                    <div className="p-2 flex-grow-1 bd-highlight">
                      <span className="font-weight-bold">Grand Total</span>
                    </div>
                    <div className="p-2 bd-highlight">
                    {ReactHtmlParser(currencySign)}<span id="grandTotal">0.00</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      id="trial"
                      title="BOOK IT NOW"
                      className="home-readmore-btn welcome-btn btn-style mt-3"
                    >
                      BOOK IT NOW
                    </button>
                  </div>
                </div>
              </div>)}
            </>
          )}
        </form>
      </div>
    </section>
  );
};

export default ReservationComponent;
export { ReservationContext };
