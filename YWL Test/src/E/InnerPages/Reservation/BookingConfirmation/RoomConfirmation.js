import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import {
  FaQuestionCircle,
  FaConciergeBell,
  FaInfoCircle,
  FaRegEdit,
} from "react-icons/fa";
import { ImSpoonKnife } from "react-icons/im";

import { RiTimeFill } from "react-icons/ri";
import {
  getSeoDescriptionData,
  getRoomsForReservation,
  submitReservationData,
  submitEditGuestName,
} from "../../../../DataLayer/datalayerUtilities";
import BannerContainer from "../../BannerComponent/BannerContainer";
import "./RoomConfirmation.css";
import { FaCheck, FaTwitter } from "react-icons/fa";
import { GrFacebookOption } from "react-icons/gr";
import GuestDetails from "./GuestDetails";
import PropertyDetails from "./PropertyDetails";
import EmailToGuest from "./EmailToGuest";
import CurrencyConverter from "./CurrencyConvertor";
import RentalCarService from "./CarRentalService";
import BookingSummary from "./BookingSummary";
import AddOnList from "./AddOnList";
import PrintBooking from "./PrintBookingDetails";
import { useReactToPrint } from "react-to-print";
import { propertyDataSelector } from "../../../../Recoil/themeModule";
// import {useReactToPrint} from 'react-to-print';
import {
  getReservationData,
  resendReservationMailFn,
  addReservationToCalendar,
  editReservation,
} from "../../../../DataLayer/datalayerUtilities";
import {
  addCalendarURL,
  getModificationURL,
  getNonModificationURL
} from "../../../../Configuration/config_url";

import FaqComponent from "../../FAQ";
import { fontWeight, style } from "@mui/system";
import ImportantInfo from "./ImportantInformation";
import SpecialRequest from "./SpecialRequests";
import DietaryRestrictions from "./DietaryRestrictions";
import EstimatedCheckin from "./EstimatedCheckin";
import DestinationGuided from "./DestinationTours";
import GuidedTours from "./GuidedTours";
const BookingConfirmation = ({ images }) => {
  const search = useLocation().search;
  const [seoData, setPropertySeodata] = useState([]);
  const [bookingData, setBookingDetails] = useState([]);
  const themeRef = useRef();
  const propertyIdRef = useRef();
  const sourceTypeRef = useRef();
  const travellerLoginRef = useRef();
  const travellerReservationIdRef = useRef();
  const travellerEmailIdRef = useRef();
  const [showDiv, setShowDiv] = useState(false);
  const [isDisableSplRq, setDisableSplRq] = useState(true);
  const [showDivDietary, setShowDivDietary] = useState(false);
  const [isDisableDietary, setDisableDietary] = useState(true);
  const [showDivCheckIn, setShowDivCheckIn] = useState(false);
  const [isDisableCheckIn, setDisableCheckIn] = useState(true);
  const [checkInDisable, setCheckInDisable] = useState(true);

  // Print Code SSTARTtart
  const componentRef = useRef(null);
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current
  // });

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const handlePrintStyle = React.useCallback(() => {
    return `
      #.rahul{color: blue}
    `;
  }, []);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle:
      bookingData.length !== 0
        ? bookingData.bookingDetails[0].folio_number
        : "Print Reservation",
    removeAfterPrint: true,
    pageStyle: handlePrintStyle,
  });

  // var printContents = document.getElementById("bookingParentDivs").innerHTML;
  // var originalContents = document.body.innerHTML;
  // document.body.innerHTML = printContents;
  // window.print();
  // document.body.innerHTML = originalContents;

  // Print Code END

  // const [updateCreditCard,  setUpdateCreditCard] = useState('')
  let updateCreditCard = "";

  const onClick = () => {
    setShowDiv(true);
    setDisableSplRq(false);
  };

  const onClickDiet = () => {
    setShowDivDietary(true);
    setDisableDietary(false);
  };

  const onClickEstimate = () => {
    setShowDivCheckIn(true);
    setDisableCheckIn(false);
    setCheckInDisable(false);
  };

  useEffect(() => {
    fetchSeoProperties();
    fetchBookingData();
  }, []);

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData("4");
    setPropertySeodata(response.data);
  };

  // fetch Booking data
  const params = useLocation().search;
  const fetchBookingData = async () => {
    let bookingId = new URLSearchParams(search).get("q");
    const response = await getReservationData({ bookingId: bookingId });
    setBookingDetails(response.data);
    console.log('bookingData: ', bookingData)
  };

  const propertyData = useRecoilValue(propertyDataSelector);
  // console.log('propertyData: ', propertyData) 

  const [resendReservationMail, setresendReservationStatus] = useState(false);
  const [errorResendMail, seterrorResendMail] = useState(false);
  const [addCalendarFlag, setAddCalendarFlag] = useState(false);

  let noOfNights = 0;
  let noOfRooms = 0;
  let promoCode = "";
  let currency = "";
  let currencyMultiplicative = 0;

  let baseOccupancy = 2;
  let propertytax = 1;
  let extraAdultCharge = 1;
  let extraChildCharge = 1;

  let subtotal = 0;
  let subtotalWithOther = 0;
  // const [subtotal, setSubtotal] = useState(0)
  let subtotalWithoutExtraPerson = 0;
  let totalNumberOfGuests = 0;
  let rooms = 0;
  let totalADULTS = 0;
  let totalCHILDREN = 0;
  let tax = 0;
  // let grandTotal = 0;
  const [grandTotal, setGrandTotal] = useState(0);
  let tmpGrandTotal = 0;
  var summary = [];
  var addonList = [];
  // window.localStorage.removeItem('subtotal');

  // let oneTimeFees = [];
  // let nightlyFees = [];
  // let oneTimeFeeName = "One Time Fee";
  // let nightlyFeeName = "Nightly Fee";
  const [oneTimeFees, setOneTimeFees] = useState([]);
  const [nightlyFees, setNightlyFees] = useState([]);
  const [oneTimeFeeName, setOneTimeFeeName] = useState("One Time Fee");
  const [nightlyFeeName, setNightlyFeeName] = useState("Nightly Fee");
  let oneTimeFeeHTML = "";
  let nightlyFeeHTML = "";
  // let addOns = []
  const [addOns, setAddOns] = useState([]);

  if (bookingData.bookingDetails) {
    // console.log("dataaaa: "); console.log(bookingData); console.log("dataaaa: ");
    noOfNights = parseInt(bookingData.bookingDetails[0].stay_days);
    noOfRooms = parseInt(bookingData.bookingDetails[0].no_of_rooms);
    promoCode = bookingData.bookingDetails[0].promoCode;

    if (bookingData.bookingDetails[0].currencySymbol !== "") {
      currency = bookingData.bookingDetails[0].currencySymbol;
      currencyMultiplicative =
        bookingData.bookingDetails[0].currencyConvertPrice;
    } else {
      currency = bookingData.bookingDetails[0].currency;
      currencyMultiplicative = 1;
    }

    for (
      let i = 0;
      i < parseInt(bookingData.bookingDetails[0].no_of_rooms);
      i++
    ) {
      // console.log(i)
      if (bookingData.bookingDetails[i].id) {
        rooms++;

        // calculations START
        let discountArray = [];
        let promoArray = [];

        let discount_total_without_ext_person = 0;
        let base_total2 = 0;
        let total_tax = 0;
        let total_add_fees = 0;
        let tax = 0;
        let total = 0;
        let total_deal_amnt = 0;
        let avgDiscountRate = 0;

        for (let y = 0; y < bookingData.bookingDetails[i].payment.length; y++) {
          discount_total_without_ext_person += parseFloat(
            bookingData.bookingDetails[i].payment[y]
              .discount_total_without_ext_person
          );

          base_total2 += parseFloat(
            bookingData.bookingDetails[i].payment[y].base_total
          );
          discountArray[y] =
            bookingData.bookingDetails[i].payment[y].discount_details;
          total_deal_amnt +=
            bookingData.bookingDetails[i].payment[y].discount_details.deal_data
              .discount_amount;
        }

        let total_deal_per =
          bookingData.bookingDetails[i].payment[0].discount_details.deal_data
            .discount_percent;
        discountArray =
          bookingData.bookingDetails[i].payment[0].discount_details
            .discount_data;
        promoArray =
          bookingData.bookingDetails[i].payment[0].discount_details
            .promo_code_data;
        total_add_fees += bookingData.bookingDetails[i].payment[0].add_fees;

        let otherDiscountName = "";
        if (
          bookingData.bookingDetails[i].payment[0].discount_details
            .discount_data.name != ""
        ) {
          otherDiscountName =
            bookingData.bookingDetails[i].payment[0].discount_details
              .discount_data.name;
        } else if (
          bookingData.bookingDetails[i].payment[0].discount_details
            .discount_data.type == "promo"
        ) {
          otherDiscountName = "Promotion Code";
        } else if (
          bookingData.bookingDetails[i].payment[0].discount_details
            .discount_data.type == "special"
        ) {
          otherDiscountName = "Special Code";
        } else if (
          bookingData.bookingDetails[i].payment[0].discount_details
            .discount_data.type == "package"
        ) {
          otherDiscountName = "Additional Amount";
        } else if (
          bookingData.bookingDetails[i].payment[0].discount_details
            .discount_data.type == "apd"
        ) {
          otherDiscountName = "Advance Purchase";
        }

        if (otherDiscountName == "Best_Standard_Rate") {
          otherDiscountName = "Best Standard Online Rate";
        }

        if (otherDiscountName == "Best_Standard_Strike") {
          otherDiscountName = "";
        }

        let dailyRate = bookingData.bookingDetails[i].payment[0].base_total;
        let DailyRateNew = dailyRate.split(".");

        let adults = 0;
        let children = 0;
        // let subtotal = 0;

        let extraAdult = 0;
        let extraChild = 0;
        let roomTotal = 0;

        let totalExtraAdultChargePerDay = 0;
        let totalExtraChildChargePerDay = 0;
        let totalExtraPersonChargePerDay = 0;

        adults = parseInt(bookingData.bookingDetails[i].no_of_adults);
        children = parseInt(bookingData.bookingDetails[i].no_of_childs);
        let personPerRoom = adults + children;
        totalNumberOfGuests = totalNumberOfGuests + personPerRoom;
        let baseOccupancy = parseInt(
          bookingData.bookingDetails[i].baseOccupancy
        );

        let extraAdultCharge = parseInt(
          bookingData.bookingDetails[i].extraAdultCharge
        );
        let extraChildCharge = parseInt(
          bookingData.bookingDetails[i].extraChildCharge
        );

        totalADULTS += parseInt(bookingData.bookingDetails[i].no_of_adults);
        totalCHILDREN += parseInt(bookingData.bookingDetails[i].no_of_childs);

        if (personPerRoom > baseOccupancy) {
          if (adults > baseOccupancy) {
            extraAdult = adults - baseOccupancy;
            totalExtraAdultChargePerDay = extraAdult * extraAdultCharge;
          }

          if (children > 0) {
            extraChild = children;
            if (adults < baseOccupancy) {
              extraChild = children - (baseOccupancy - adults);
            }
            totalExtraChildChargePerDay = extraChild * extraChildCharge;
          }
          totalExtraPersonChargePerDay =
            totalExtraAdultChargePerDay + totalExtraChildChargePerDay;
        }

        if (parseInt(discountArray.is_discount_applied) === 1) {
          if (parseFloat(discountArray.disc_dollar) > 0) {
            avgDiscountRate =
              parseFloat(discountArray.disc_dollar) * noOfNights;
          }

          if (parseFloat(discountArray.disc_percentage) > 0) {
            avgDiscountRate =
              base_total2 -
              totalExtraPersonChargePerDay * noOfNights -
              discount_total_without_ext_person;
          }
        }

        if (parseInt(promoArray.is_promo_code_applied) === 0) {
          if (parseFloat(promoArray.pc_amount) > 0) {
            avgDiscountRate = parseFloat(promoArray.pc_amount) * noOfNights;
          } else if (parseFloat(promoArray.pc_percent) > 0) {
            avgDiscountRate =
              base_total2 -
              totalExtraPersonChargePerDay * noOfNights -
              discount_total_without_ext_person;
          }

          if (promoArray.type === "package") {
            avgDiscountRate = -1 * avgDiscountRate;
          }
        }

        let lowAvgRate2 = base_total2 / noOfNights;

        let lowAvgRate = parseFloat(
          (discount_total_without_ext_person + avgDiscountRate) / noOfNights
        ).toFixed(2);
        let avgDailyRate = lowAvgRate.split(".");

        let roomAmntOnly = lowAvgRate * noOfNights * currencyMultiplicative;
        subtotal +=
          (discount_total_without_ext_person +
            totalExtraPersonChargePerDay * noOfNights) *
          currencyMultiplicative;
        roomTotal =
          (discount_total_without_ext_person +
            totalExtraPersonChargePerDay * noOfNights) *
          currencyMultiplicative;

        // if (typeof (Storage) !== "undefined") {
        //     if (localStorage.getItem('subtotal') === null) {
        //         window.localStorage.setItem('subtotal', parseInt(subtotal));
        //     }else{
        //         let tmpSubtotal = localStorage.getItem('subtotal');
        //         window.localStorage.setItem('subtotal', parseInt(tmpSubtotal)+parseInt(subtotal));
        //     }
        // }

        if (roomAmntOnly < 0) {
          roomAmntOnly = 0;
        }
        if (roomTotal < 0) {
          roomTotal = 0;
        }
        if (subtotal < 0) {
          subtotal = 0;
        }
        // calculations END

        summary.push(
          // <BookingSummary
          //   data={bookingData.bookingDetails[i]}
          //   subtotalWithoutExtraPerson={subtotalWithoutExtraPerson}
          //   totalNumberOfGuests={totalNumberOfGuests}
          //   rooms={rooms}
          //   totalADULTS={totalADULTS}
          //   totalCHILDREN={totalCHILDREN}
          //   noOfNights={noOfNights}
          //   currency={currency}
          //   currencyMultiplicative={currencyMultiplicative}
          //   key={i}
          // />
          <BookingSummary
            roomAmntOnly={roomAmntOnly}
            totalExtraAdultChargePerDay={totalExtraAdultChargePerDay}
            totalExtraChildChargePerDay={totalExtraChildChargePerDay}
            roomTotal={roomTotal}
            rooms={rooms}
            data={bookingData.bookingDetails[i]}
            currency={currency}
            noOfNights={noOfNights}
            currencyMultiplicative={currencyMultiplicative}
            otherDiscountName={otherDiscountName}
          />
        );
      }
    }

    if (addOns.length === 0) {
      setTimeout(() => {
        // if (subtotal === 0) {
        //   subtotal = parseFloat(localStorage.getItem("subtotal"));
        // }

        // setSubtotal(parseFloat(localStorage.getItem('subtotal')))
        tax =
          Math.round(
            parseFloat(bookingData.bookingDetails[0].tax) * parseFloat(subtotal)
          ) / 100;
        // Math.round(num * 100) / 100
        tmpGrandTotal = parseFloat(tax) + parseFloat(subtotal);
        // console.log('grandTotal: ', grandTotal)

        if (document.getElementById("sub-total")) {
          document.getElementById("sub-total").innerHTML =
            currency + parseFloat(subtotal).toFixed(2);
        }
        if (document.getElementById("tax")) {
          document.getElementById("tax").innerHTML =
            currency + parseFloat(tax).toFixed(2);
        }

        subtotalWithOther = subtotal + tax;
        // console.log('subtotalWithOther: '+subtotalWithOther+' = '+subtotal+' + '+tax);

        Object.values(bookingData.bookingDetails.additionaFeesDetails).map(
          (addFee) => {
            // console.log('before: ', grandTotal, subtotal)
            if (typeof addFee === "object") {
              if (
                addFee.type === "onetime" &&
                addFee.fee_name !== "" &&
                parseFloat(addFee.amount) > parseFloat(0.0)
              ) {
                // oneTimeFees = addFee
                // oneTimeFeeName = addFee.fee_name;
                setOneTimeFees(addFee);
                setOneTimeFeeName(addFee.fee_name);
                tmpGrandTotal =
                  parseFloat(tmpGrandTotal) +
                  parseFloat(addFee.amount) *
                    noOfRooms *
                    currencyMultiplicative;
                subtotalWithOther =
                  parseFloat(subtotalWithOther) +
                  parseFloat(addFee.amount) *
                    noOfRooms *
                    currencyMultiplicative;
                // setSubtotal(parseFloat(subtotal)+parseFloat(addFee.amount)*noOfRooms*currencyMultiplicative)
                //  tmpOneTimeFee = parseFloat(addFee.amount)
              }
              if (
                addFee.type === "nightly" &&
                parseFloat(addFee.amount) > parseFloat(0.0) &&
                addFee.fee_name !== ""
              ) {
                // nightlyFeeName = addFee.fee_name;
                setNightlyFees(addFee);
                setNightlyFeeName(addFee.fee_name);
                tmpGrandTotal =
                  parseFloat(tmpGrandTotal) +
                  parseFloat(addFee.amount) *
                    noOfRooms *
                    noOfNights *
                    currencyMultiplicative;
                subtotalWithOther =
                  parseFloat(subtotalWithOther) +
                  parseFloat(addFee.amount) *
                    noOfRooms *
                    noOfNights *
                    currencyMultiplicative;
                // setSubtotal(parseFloat(subtotal)+parseFloat(addFee.amount)*noOfRooms*noOfNights*currencyMultiplicative)
                // tmpNightlyFee = parseFloat(addFee.amount)
              }
            }
          }
        );
        setGrandTotal(tmpGrandTotal);

        // console.log('subtotalWithOther: ', subtotalWithOther)
        if (document.getElementById("roomsTotal")) {
          document.getElementById("roomsTotal").innerHTML =
            currency + parseFloat(subtotalWithOther).toFixed(2);
        }
        // console.log('grandTotal with other: ', grandTotal)

        if (bookingData.bookingDetails.addOnList) {
          if (Object.keys(bookingData.bookingDetails.addOnList).length > 0) {
            // console.log(addOns.length); console.log('addON: ', grandTotal, subtotal)
            if (addOns.length === 0) {
              setAddOns(bookingData.bookingDetails.addOnList);
            }
          }
        }
      }, 100);
    }

    baseOccupancy = bookingData.bookingDetails[0].baseOccupancy;
    propertytax = bookingData.bookingDetails[0].tax;
    extraAdultCharge = bookingData.bookingDetails[0].extraAdultCharge;
    extraChildCharge = bookingData.bookingDetails[0].extraChildCharge;
  }

  // resend email confirmation function
  const resend_reservation_mail = async (property_id, booking_id) => {
    const response = await resendReservationMailFn({
      property_id: property_id,
      bookingId: booking_id,
    });
    if (response.data.type === true) {
      setresendReservationStatus(true);
      seterrorResendMail(false);
    } else {
      seterrorResendMail(true);
      setresendReservationStatus(false);
    }

    // set flag to False so that the message gets hidden after 6 seconds
    setTimeout(() => {
      setresendReservationStatus(false);
      seterrorResendMail(false);
    }, 6000);
  };

  // add calendar icons options toggle function
  const addCalendarOptions = () => {
    addCalendarFlag === false
      ? setAddCalendarFlag(true)
      : setAddCalendarFlag(false);
  };

  // edit reservation form submit
  const editReservationClicked = () => {
    document.getElementById("editReservationSubmit").click();
  };

  const editReservationSubmit = async (event) => {
    event.preventDefault();
    try {
      const themeVal = themeRef.current ? themeRef.current.value : "";
      const propertyIdVal = propertyIdRef.current
        ? propertyIdRef.current.value
        : "";
      const sourceTypeVal = sourceTypeRef.current
        ? sourceTypeRef.current.value
        : "";
      const travellerLoginVal = travellerLoginRef.current
        ? travellerLoginRef.current.value
        : "";
      const travellerReservationIdVal = travellerReservationIdRef.current
        ? travellerReservationIdRef.current.value
        : "";
      const travellerEmailIdVal = travellerEmailIdRef.current
        ? travellerEmailIdRef.current.value
        : "";

      let editReservationData = {
        theme: themeVal,
        property_id: propertyIdVal,
        source_type: sourceTypeVal,
        traveller_login: travellerLoginVal,
        traveller_reservation_id: travellerReservationIdVal,
        traveller_email_id: travellerEmailIdVal,
        is_react: "1",
      };

      // additional data to append if clicked on edit Credit Card
      if (updateCreditCard !== "") {
        editReservationData["updatecreditcard"] = updateCreditCard;
      }

      const editResponse = await editReservation(editReservationData);
      console.log('editResponse: ', editResponse);
      if (editResponse.data.type === "success") {
        if(editResponse.data.params === "non-modifiable"){
          window.open(getNonModificationURL,"_self");
        }else{
          // reset this variable to empty string, so that next time when form is submitted
          // the value will not be passed if clicked on other links
          updateCreditCard = "";
          window.open(
            getModificationURL +
              "/" +
              editResponse.data.params +
              "/" +
              bookingData.bookingDetails[0].folio_number,
            "_blank"
          );
        }
      }
    } catch (e) {
      alert(`Error! ${e.message}`);
    }
  };
  // edit reservation form submit END

  const redirectToModify = (event) => {
    event.preventDefault();
    document.getElementById("editReservationSubmit").click();
  };

  const redirectToModifyCredit = (event) => {
    event.preventDefault();
    updateCreditCard = "creditcard";
    document.getElementById("editReservationSubmit").click();
  };

  // guest name details form START
  const scrollToGuestName = (eleName, r) => {
    let scrollToDiv = document.getElementById(eleName + r);
    scrollToDiv.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });
  };

  const [fnames, setfnames] = useState([""]);
  const [lnames, setlnames] = useState([""]);
  const [roomId, setRoomId] = useState([""]);
  const fnameRef = useRef();
  const lnameRef = useRef();
  const roomIdRef = useRef();
  const numberOfRoomsRef = useRef();
  const guestPropertyIdRef = useRef();
  const guestBookingIdRef = useRef();
  const is_asiRef = useRef();
  const [disabled, setDisabled] = useState(true);
  const [guestNameSuccess, setGuestNameSuccess] = useState(false);
  const [guestNameError, setGuestNameError] = useState(false);

  function handleClick() {
    setDisabled(!disabled);
  }

  const editGuestNameSubmit = async (event) => {
    event.preventDefault();
    let fnameAraay = {};
    let lnameAraay = {};
    let roomIdAraay = {};

    const inputRefs = document.querySelectorAll("#editGuestName input");
    for (let i = 0; i < inputRefs.length; i++) {
      if (!inputRefs[i].value && inputRefs[i].required) {
        inputRefs[i].focus();
        break;
      }
    }

    // validation
    for (let r = 0; r < parseInt(noOfRooms); r++) {
      // validate first names
      if (document.getElementById("div_guest_first_name_" + r)) {
        if (document.getElementById("div_guest_first_name_" + r).value === "") {
          document.getElementById("errorFirstName_" + r).innerText =
            "Please enter the guest's first name";
          document.getElementById(
            "div_guest_first_name_" + r
          ).style.borderColor = "red";
          scrollToGuestName("div_guest_first_name_", r);
          return false;
        } else if (
          document.getElementById("div_guest_first_name_" + r).length < 2
        ) {
          document.getElementById("errorFirstName_" + r).innerText =
            "The guest's first name must have at least two characters";
          document.getElementById(
            "div_guest_first_name_" + r
          ).style.borderColor = "red";
          scrollToGuestName("div_guest_first_name_", r);
          return false;
        } else if (
          document.getElementById("div_guest_first_name_" + r).length > 50
        ) {
          document.getElementById("errorFirstName_" + r).innerText =
            "First name is limited to 50 characters in length";
          document.getElementById(
            "div_guest_first_name_" + r
          ).style.borderColor = "red";
          scrollToGuestName("div_guest_first_name_", r);
          return false;
        } else {
          document.getElementById("errorFirstName_" + r).innerText = "";
          document.getElementById(
            "div_guest_first_name_" + r
          ).style.borderColor = "#dadce0";
        }
      }

      // validate last names
      if (document.getElementById("div_guest_last_name_" + r)) {
        if (document.getElementById("div_guest_last_name_" + r).value === "") {
          document.getElementById("errorLastName_" + r).innerText =
            "Please enter the guest's last name";
          document.getElementById(
            "div_guest_last_name_" + r
          ).style.borderColor = "red";
          scrollToGuestName("div_guest_last_name_", r);
          return false;
        } else if (
          document.getElementById("div_guest_last_name_" + r).length < 2
        ) {
          document.getElementById("errorLastName_" + r).innerText =
            "The guest's last name must have at least two characters";
          document.getElementById(
            "div_guest_last_name_" + r
          ).style.borderColor = "red";
          scrollToGuestName("div_guest_last_name_", r);
          return false;
        } else if (
          document.getElementById("div_guest_last_name_" + r).length > 50
        ) {
          document.getElementById("errorLastName_" + r).innerText =
            "Last name is limited to 50 characters in length";
          document.getElementById(
            "div_guest_last_name_" + r
          ).style.borderColor = "red";
          scrollToGuestName("div_guest_last_name_", r);
          return false;
        } else {
          document.getElementById("errorLastName_" + r).innerText = "";
          document.getElementById(
            "div_guest_last_name_" + r
          ).style.borderColor = "#dadce0";
        }
      }

      fnameAraay["guest_first_name_" + r] = fnames[r]
        ? fnames[r]
        : document.getElementById("div_guest_first_name_" + r).value;
      lnameAraay["guest_last_name_" + r] = lnames[r]
        ? lnames[r]
        : document.getElementById("div_guest_last_name_" + r).value;
      roomIdAraay[r] = roomId[r]
        ? roomId[r]
        : document.getElementById("room_id_" + r).value;
    }

    let numberOfRoomsVal = numberOfRoomsRef.current.value;
    let guestPropertyIdVal = guestPropertyIdRef.current.value;
    let guestBookingIdVal = guestBookingIdRef.current.value;
    let is_asiVal = is_asiRef.current.value;

    let guestNameData = {
      numberOfRooms: numberOfRoomsVal,
      guestPropertyId: guestPropertyIdVal,
      guestBookingId: guestBookingIdVal,
      is_asi: is_asiVal,
      fname: fnameAraay,
      lname: lnameAraay,
      roomId: roomIdAraay,
    };

    const response = await submitEditGuestName(guestNameData);
    if (response.data.updateStatus === "1") {
      setGuestNameError(false);
      setGuestNameSuccess(true);
      setDisabled(true);
    } else {
      setGuestNameError(true);
      setGuestNameSuccess(false);
    }

    // set flag to False so that the message gets hidden after 6 seconds
    setTimeout(() => {
      setGuestNameError(false);
      setGuestNameSuccess(false);
    }, 6000);
  };
  // guest name details form END

  const rentACar = (event) => {
    event.preventDefault();
    let scrollToDiv = document.getElementById("rentalCars");
    scrollToDiv.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });
  };

  /*function printPartOfPage(elementId, uniqueIframeId){
    const content = document.getElementById(elementId)
    let pri
    if (document.getElementById(uniqueIframeId)) {
        pri = document.getElementById(uniqueIframeId).contentWindow
    } else {
        const iframe = document.createElement('iframe')
        iframe.setAttribute('title', uniqueIframeId)
        iframe.setAttribute('id', uniqueIframeId)
        iframe.setAttribute('style', 'height: 0px; width: 0px; position: absolute;')
        document.body.appendChild(iframe)
        pri = iframe.contentWindow
    }
    pri.document.open()
    pri.document.write(content.innerHTML)
    pri.document.close()
    pri.focus()
    pri.print()
}*/

  return (
    <>
      {bookingData.bookingDetails && (
        <section>
          <BannerContainer seoData={seoData} />
          <div className="container">
            <div className="row px-0">
              <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ipadSec1">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 whitebg dropshadow text-center mb-4">
                  <p className="text-left head_text pb-2 dottedborder F18">
                    Booking Summary
                  </p>
                  <div className="d-flex">
                    <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 text-left PTB">
                      Check In Date:
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 PTB LFbold black text-right">
                      {moment(
                        new Date(bookingData.bookingDetails[0].arrival_date)
                      ).format("MMMM DD, YYYY")}
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 PTB text-left PTB">
                      Check Out Date:
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 PTB LFbold black text-right PTB">
                      {moment(
                        bookingData.bookingDetails[0].departure_date
                      ).format("MMMM DD, YYYY")}
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="col-lg-7 col-md-5 col-sm-12 col-xs-12 PTB text-left PTB">
                      Total Number of Nights:
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 PTB LFbold black text-right PTB">
                      {bookingData.bookingDetails[0].stay_days}
                    </div>
                  </div>
                  <div className="dottedborder pt-2"></div>
                  {/* rooms summary */}
                  <div className="roomDetail">{summary}</div>

                  {/* sub total */}
                  <div className="subTotal">
                    <div className="d-flex FS17">
                      <div className="col-lg-7 col-md-5 col-sm-12 col-xs-12 PTB text-left">
                        <strong>Subtotal</strong>
                      </div>
                      <div
                        id="sub-total"
                        className="col-lg-5 col-md-5 col-sm-12 col-xs-12 PTB LFbold black text-right"
                      >
                        {ReactHtmlParser(currency) +
                          parseFloat(subtotal).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="dottedborder"></div>

                  {/* taxes */}
                  <div className="d-flex">
                    <div className="col-lg-7 col-md-5 col-sm-12 col-xs-12 PTB text-left PTB">
                      Taxes: ({" "}
                      {parseFloat(bookingData.bookingDetails[0].tax).toFixed(2)}
                      %)
                    </div>
                    <div
                      id="tax"
                      className="col-lg-5 col-md-5 col-sm-12 col-xs-12 PTB LFbold black text-right PTB"
                    >
                      {ReactHtmlParser(currency) + tax}
                    </div>
                  </div>

                  {/* one time fee */}
                  {Object.keys(oneTimeFees).length > 0 && (
                    <div className="d-flex">
                      <div className="col-lg-7 col-md-5 col-sm-12 col-xs-12 PTB text-left PTB">
                        {oneTimeFees.name}
                      </div>
                      <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 PTB LFbold black text-right PTB">
                        {ReactHtmlParser(currency) +
                          (
                            parseFloat(oneTimeFees.amount) *
                            noOfRooms *
                            currencyMultiplicative
                          ).toFixed(2)}
                      </div>
                    </div>
                  )}

                  {/* nightly fee */}
                  {Object.keys(nightlyFees).length > 0 && (
                    <div className="d-flex">
                      <div className="col-lg-7 col-md-5 col-sm-12 col-xs-12 PTB text-left PTB">
                        {nightlyFees.name}
                      </div>
                      <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 PTB LFbold black text-right PTB">
                        {ReactHtmlParser(currency) +
                          (
                            parseFloat(nightlyFees.amount) *
                            noOfRooms *
                            noOfNights *
                            currencyMultiplicative
                          ).toFixed(2)}
                      </div>
                    </div>
                  )}

                  {/* Rooms Total */}
                  {addOns.length > 0 && (
                    <div className="d-flex">
                      <div className="col-lg-7 col-md-5 col-sm-12 col-xs-12 PTB text-left">
                        <strong>Room{noOfRooms > 1 ? "s" : ""} Total</strong>
                      </div>
                      <div
                        className="col-lg-5 col-md-5 col-sm-12 col-xs-12 PTB LFbold black text-right"
                        id="roomsTotal"
                      >
                        {ReactHtmlParser(currency) +
                          parseFloat(subtotalWithOther).toFixed(2)}
                      </div>
                    </div>
                  )}

                  {/* addons */}
                  {addOns.length > 0 && (
                    <>
                      <div className="d-flex">
                        <div className="col-lg-7 col-md-5 col-sm-12 col-xs-12 PTB text-left">
                          <strong>Add-Ons </strong>
                        </div>
                      </div>
                      <div className="dottedborder pt-2"></div>
                      {Object.values(addOns).map((data, key) => {
                        let addonQuantity = "";
                        if (
                          data.addon_quantity !== "" &&
                          data.addon_quantity !== 0
                        ) {
                          addonQuantity = `(${data.addon_quantity})...`;
                        } else if (data.addon_type === "per_night") {
                          addonQuantity = `(${
                            parseInt(
                              bookingData.bookingDetails[0].no_of_rooms
                            ) *
                            parseInt(bookingData.bookingDetails[0].stay_days)
                          })...`;
                        } else if (data.addon_type === "per_person") {
                          addonQuantity = `(${totalNumberOfGuests})...`;
                        }

                        addonList.push(
                          <AddOnList
                            val_addon={data}
                            addonQuantity={addonQuantity}
                            currency={currency}
                            currencyMultiplicative={currencyMultiplicative}
                            key={key}
                          />
                        );

                        tmpGrandTotal +=
                          parseFloat(data.addon_total_with_tax) *
                          currencyMultiplicative;
                      })}
                    </>
                  )}
                  {addonList}

                  {/* grand total */}
                  <div className="d-flex FS17 mt-2">
                    <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 PTB LFbold text-left">
                      Total
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 PTB LFbold black text-right">
                      {ReactHtmlParser(currency) +
                        parseFloat(tmpGrandTotal + grandTotal).toFixed(2)}
                    </div>
                  </div>
                </div>
                {/* end reservation summary */}

                <div className="MT20 col-lg-12 col-md-12 col-sm-12 col-xs-12 whitebg dropshadow sharelinks text-center mb-4">
                  <a
                    href=""
                    title="Edit Credit Card Info"
                    className="editCc"
                    onClick={redirectToModifyCredit}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 leftbox MB5 d-flex">
                      <div className="col-lg-3 col-md-3">
                        <img
                          src="https://beta.yosemitewestgate.com/assets/images/creditcard.png"
                          alt="Edit Credit Card Info"
                        />
                      </div>
                      <div className="col-lg-9 col-md-9 text-left FS16 cardText">
                        <span className="mb-1">Edit Credit Card Info</span>
                      </div>
                    </div>
                  </a>
                  <a
                    href=""
                    title="Modify Reservation"
                    className="editCc"
                    onClick={redirectToModify}
                  >
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 leftbox MB5 d-flex">
                      <div className="col-lg-3 col-md-3">
                        <img
                          src="https://beta.yosemitewestgate.com/assets/images/edit.png"
                          alt="Modify Reservation"
                        />
                      </div>
                      <div className="col-lg-9 col-md-9 text-left FS16 cardText">
                        <span className="mb-1">Modify Reservation</span>
                      </div>
                    </div>
                  </a>
                  <a
                    href=""
                    title="Cancel Reservation"
                    className="editCc"
                    onClick={redirectToModify}
                  >
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 leftbox MB5 d-flex">
                      <div className="col-lg-3 col-md-3">
                        <img
                          src="https://beta.yosemitewestgate.com/assets/images/cancel.png"
                          alt="Cancel Reservation"
                        />
                      </div>
                      <div className="col-lg-9 col-md-9 text-left FS16 cardText">
                        <span className="mb-1">Cancel Reservation</span>
                      </div>
                    </div>
                  </a>
                  <a href="" title="Contact Property" className="editCc">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 leftbox MB5 d-flex">
                      <div className="col-lg-3 col-md-3">
                        <img
                          src="https://beta.yosemitewestgate.com/assets/images/contact.png"
                          alt="Contact Property"
                        />
                      </div>
                      <div className="col-lg-9 col-md-9 text-left FS16 cardText">
                        <a
                          href="contact-us"
                          target="_blank"
                          title="Contact Property"
                        >
                          <span className="mb-1">Contact Property</span>
                        </a>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 dropshadow whitebg2 mb-5 ipadSec2">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 p-0 MB_mobile d-flex">
                  <p className="col-lg-7 col-md-7 col-sm-7 col-xs-12 text-left text-xs-center green my-3 FS30 p-0">
                    Congratulations!
                  </p>
                  <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12 mt-3 FS17 d-flex bookingSocialIcons">
                    {bookingData.property[0].website && <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 FS16 LFbold d-flex">
                      <a
                        href={`http://www.facebook.com/sharer.php?s=100&p[title]=${encodeURIComponent(
                          `I am visiting ${
                            bookingData.bookingDetails[0].billing_city
                          }, ${
                            bookingData.bookingDetails[0].billing_state
                          } on ${moment(new Date(bookingData.bookingDetails[0].arrival_date)).format("MMMM DD, YYYY")} & staying at ${bookingData.bookingDetails[0].name}`
                        )}&p[url]=${bookingData.property[0].website}`}
                        rel="nofollow"
                        target="_blank"
                        className="d-flex socialIcon"
                        title="Facebook"
                      >
                        <span className="">
                          <GrFacebookOption
                            size="25"
                            fill="#385c8e"
                            className=""
                            title="Facebook"
                          />
                        </span>
                        <span className="mt-2 FS14">Facebook</span>
                      </a>
                    </div>}
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 FS16 LFbold LFbold1 d-flex">
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                          `I am visiting ${
                            bookingData.bookingDetails[0].billing_city
                          }, ${
                            bookingData.bookingDetails[0].billing_state
                          } on ${moment(
                            new Date(bookingData.bookingDetails[0].arrival_date)
                          ).format("MMMM DD, YYYY")} & staying at ${
                            bookingData.bookingDetails[0].name
                          }`
                        )}`}
                        className="d-flex socialIcon"
                        title="Twitter"
                      >
                        <span className="mr-2">
                          <FaTwitter
                            size="25"
                            fill="#03a9f4"
                            className=""
                            title="Twitter"
                          />
                        </span>
                        <span className="mt-2 FS14">Twitter</span>
                      </a>
                    </div>
                  </div>
                </div>
                <p className="FS16">
                  Your reservation has been successfully booked. Please check
                  your email inbox (or junk mail folder) for your email
                  confirmation.
                </p>
                <div className="my-4">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 LFbold FS20 d-flex">
                    <span className="mr-2">
                      <FaCheck size="25" fill="green" className="" />
                    </span>
                    <span className="mr-1">You have reserved your stay at</span>
                    <span className="text-danger">
                      {bookingData.bookingDetails[0].name}
                    </span>
                  </div>
                </div>
                <div className="my-4">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 LFbold FS20 d-flex">
                    <span className="mr-2">
                      <FaCheck size="25" fill="green" className="" />
                    </span>
                    <span className="mr-1">
                      Your Reservation Confirmation ID is:
                    </span>
                    <span className="text-danger">
                      {bookingData.bookingDetails[0].folio_number}
                    </span>
                  </div>
                </div>

                {/* resend email success msg */}
                {resendReservationMail && (
                  <>
                    <div className="alert alert-success" role="alert">
                      Reservation Confirmation Email successfully sent. Please
                      check your email inbox (or junk mail folder) for your
                      email confirmation.
                    </div>
                  </>
                )}

                {/* resend email error msg */}
                {errorResendMail && (
                  <>
                    <div className="alert alert-danger" role="alert">
                      Oops! Well, this is really embarrassing. It looks like we
                      have run into an error. Please try again later
                    </div>
                  </>
                )}

                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center mt-5 d-flex iconMobView2">
                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                    <span
                      id="resend_mail12"
                      name="resend_mail"
                      title="Resend Your Confirmation / Reservation Email"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        resend_reservation_mail(
                          `${bookingData.bookingDetails[0].property_id}`,
                          `${bookingData.bookingDetails[0].id}`
                        )
                      }
                    >
                      <img
                        src="https://beta.yosemitewestgate.com/assets/images/message.svg"
                        width="34px"
                        height="34px"
                        alt="Resend Email"
                      />
                      <p className="black F13 pt-2 LFbold">Resend Email</p>
                    </span>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                    <span
                      id="resend_mail12"
                      name="resend_mail"
                      style={{ cursor: "pointer" }}
                      title="Print Your Reservations Confirmation"
                      onClick={handlePrint}
                      className="testprint"
                    >
                      <img
                        width="34px"
                        height="34px"
                        src="https://beta.yosemitewestgate.com/assets/images/printer.svg"
                        alt="Print"
                      />
                      <p className="black F13 pt-2 LFbold">Print</p>
                    </span>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                    <span
                      id="resend_mail12"
                      name="resend_mail"
                      style={{ cursor: "pointer" }}
                      title="Add to Calendar"
                      onClick={addCalendarOptions}
                    >
                      <img
                        width="34px"
                        height="34px"
                        src="https://beta.yosemitewestgate.com/assets/images/calendar.svg"
                        alt="Add to Calendar"
                      />
                      <p className="black F13 pt-2 LFbold">Add to Calendar</p>
                    </span>
                    {addCalendarFlag && (
                      <>
                        <div>
                          <a
                            href={`${addCalendarURL}/${bookingData.bookingDetails[0].folio_number}`}
                            target="blank"
                            title="Add to Apple Calendar"
                          >
                            Apple
                          </a>
                          <a
                            href={`${addCalendarURL}/${bookingData.bookingDetails[0].folio_number}/google`}
                            target="blank"
                            title="Add to Google Calendar"
                          >
                            Google <em>(online)</em>
                          </a>
                          <a
                            href={`${addCalendarURL}/${bookingData.bookingDetails[0].folio_number}`}
                            target="blank"
                            title="Add to Outlook Calendar"
                          >
                            Outlook
                          </a>
                          <a
                            href={`${addCalendarURL}/${bookingData.bookingDetails[0].folio_number}/outlook`}
                            target="blank"
                            title="Add to Outlook.com Calendar"
                          >
                            Outlook.com <em>(online)</em>
                          </a>
                          <a
                            href={`${addCalendarURL}/${bookingData.bookingDetails[0].folio_number}/yahoo`}
                            target="blank"
                            title="Add to Yahoo Calendar"
                          >
                            Yahoo <em>(online)</em>
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                    <span
                      id="resend_mail12"
                      name="resend_mail"
                      style={{ cursor: "pointer" }}
                      title="Edit Reservation"
                      onClick={editReservationClicked}
                    >
                      <img
                        width="34px"
                        height="34px"
                        src="https://beta.yosemitewestgate.com/assets/images/booking.svg"
                        alt="Edit Reservation"
                      />
                      <p className="black FS13 pt-2 LFbold">Edit Reservation</p>
                    </span>
                    <form
                      name="cancel_reservation_step4_right6"
                      id="cancel_reservation1121"
                      onSubmit={editReservationSubmit}
                    >
                      <input
                        type="hidden"
                        name="theme"
                        value={bookingData.api_data.api_theme}
                        ref={themeRef}
                      />
                      <input
                        type="hidden"
                        name="property_id"
                        value={bookingData.bookingDetails[0].property_id}
                        ref={propertyIdRef}
                      />
                      <input
                        type="hidden"
                        name="source_type"
                        value="Standalone"
                        ref={sourceTypeRef}
                      />
                      <input
                        type="hidden"
                        name="traveller_login"
                        value="1"
                        ref={travellerLoginRef}
                      />
                      <input
                        type="hidden"
                        name="traveller_reservation_id"
                        value={bookingData.bookingDetails[0].folio_number}
                        ref={travellerReservationIdRef}
                      />
                      <input
                        type="hidden"
                        name="traveller_email_id"
                        value={bookingData.bookingDetails[0].billing_email}
                        ref={travellerEmailIdRef}
                      />
                      <button
                        id="editReservationSubmit"
                        type="submit"
                        style={{ display: "none" }}
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
                <div className="dottedborder my-2"></div>
                <PropertyDetails
                  bookingDetails={bookingData.bookingDetails}
                  property={bookingData.property}
                  rentACar={rentACar}
                />

                {/* guest edit success msg */}
                {guestNameSuccess && (
                  <>
                    <div className="alert alert-success" role="alert">
                      Guest name and room preferences have been successfully
                      updated
                    </div>
                  </>
                )}

                {/* guest edit error msg */}
                {guestNameError && (
                  <>
                    <div className="alert alert-danger" role="alert">
                      Oops! Well, this is really embarrassing. It looks like we
                      have run into an error with your reservation. Please try
                      again later.
                    </div>
                  </>
                )}

                <GuestDetails
                  disabled={disabled}
                  handleClick={handleClick}
                  bookingDetails={bookingData.bookingDetails}
                  noOfRooms={noOfRooms}
                  fnameRef={fnameRef}
                  setfnames={setfnames}
                  fnames={fnames}
                  lnameRef={lnameRef}
                  setlnames={setlnames}
                  lnames={lnames}
                  roomIdRef={roomIdRef}
                  setRoomId={setRoomId}
                  roomId={roomId}
                  editGuestNameSubmit={editGuestNameSubmit}
                  numberOfRoomsRef={numberOfRoomsRef}
                  guestPropertyIdRef={guestPropertyIdRef}
                  guestBookingIdRef={guestBookingIdRef}
                  is_asiRef={is_asiRef}
                  property={bookingData.property_details}
                  policies={bookingData.policies}
                  currencyMultiplicative={currencyMultiplicative}
                  currency={currency}
                  splCancelPolicy={bookingData.special_cancellation_policy}
                />
                <div className="dottedborder my-3"></div>
                <EmailToGuest bookingDetails={bookingData.bookingDetails} />
                <div className="dottedborder my-3"></div>
                <CurrencyConverter
                  bookingDetails={bookingData.bookingDetails}
                  currencyData={bookingData.currencyData}
                />
                <div className="dottedborder my-3"></div>
                <RentalCarService />
                <div className="dottedborder my-3"></div>
                {/* DESTINATION GUIDE FOR GROVELAND  */}

                <div className="destinationGuideComp">
                  <DestinationGuided />
                </div>
                <div className="dottedborder my-3"></div>
                {/* GUIDED TOURS FOR PURCHASE  */}

                <div className="guideTours">
                  <GuidedTours />
                </div>
                <div className="dottedborder my-3"></div>
                {/* FAQ SECTION */}

                <div className="faqAtConfirmation mx-3">
                  <p
                    className="d-flex mb-0 FS20"
                    style={{ fontSize: "20px", fontWeight: "600" }}
                  >
                    <span>
                      <FaQuestionCircle className="mr-2" size="20" />
                    </span>
                    FAQ
                  </p>
                  <div className="faqComponent">
                    <FaqComponent className="FS20" />
                  </div>
                </div>
                <div className="dottedborder my-3"></div>
                {/* IMPORTANT INFORMATION */}

                <div className="impInformation mx-3">
                  <p
                    className="d-flex mb-0 FS20"
                    style={{ fontSize: "20px", fontWeight: "600" }}
                  >
                    <span>
                      <FaInfoCircle className="mr-2" size="20" />
                    </span>
                    Important Information
                  </p>
                  <ImportantInfo bookingDetails={bookingData.bookingDetails} />
                </div>
                {/* <div className="dottedborder my-3"></div> */}

                {/* SPECIAL REQUEST */}
                <div className="specialRequest mx-3">
                  <p
                    className="d-flex mb-0 PR FS20"
                    style={{ fontSize: "20px", fontWeight: "600" }}
                  >
                    <span>
                      <FaConciergeBell className="mr-2" size="25" />
                    </span>
                    Special Requests
                    <a onClick={onClick}>
                      {!showDiv && (
                        <FaRegEdit className="mr-2 editIcon" size="30" />
                      )}
                    </a>
                  </p>
                  {showDiv ||
                  bookingData.bookingDetails[0].special_instructions ? (
                    <SpecialRequest
                      showDiv={showDiv}
                      setShowDiv={setShowDiv}
                      bookingDetails={bookingData.bookingDetails}
                      isDisableSplRq={isDisableSplRq}
                      setDisableSplRq={setDisableSplRq}
                    />
                  ) : null}
                </div>
                {/* Dietary Restrictions */}
                {(bookingData.bookingDetails[0].dietary_restriction_status === '1') && (
                  <>
                    {/* <div className="dottedborder mt-3"></div> */}
                    <div className="specialRequest mx-3 mt-5 123">
                      <p
                        className="d-flex mb-0 PR FS20"
                        style={{ fontSize: "20px", fontWeight: "600" }}
                      >
                        <span>
                          <ImSpoonKnife className="mr-2" size="25" />
                        </span>
                        Dietary Restrictions
                        <a onClick={onClickDiet}>
                          {!showDivDietary && (
                            <FaRegEdit className="mr-2 editIcon" size="30" />
                          )}
                        </a>
                      </p>
                      {showDivDietary ||
                      bookingData.bookingDetails[0].dietary_restrictions ? (
                        <DietaryRestrictions
                          showDivDietary={showDivDietary}
                          setShowDivDietary={setShowDivDietary}
                          bookingDetails={bookingData.bookingDetails}
                          isDisableDietary={isDisableDietary}
                          setDisableDietary={setDisableDietary}
                        />
                      ) : null}
                    </div>
                  </>
                )}

                {/* time arrival */}
                {(bookingData.bookingDetails[0].estimated_checkin_status === '1') && (
                  <>
                    {/* <div className="dottedborder mt-3 mb-3"></div> */}
                    <div className="specialRequest mx-3 mt-5 123">
                      <p
                        className="d-flex mb-0 PR FS20"
                        style={{ fontSize: "20px", fontWeight: "600" }}
                      >
                        <span>
                          <RiTimeFill className="mr-2" size="25" />
                        </span>
                        Estimated Time of Arrival
                        <a onClick={onClickEstimate}>
                          {!showDivCheckIn && (
                            <FaRegEdit className="mr-2 editIcon" size="30" />
                          )}
                        </a>
                      </p>
                      {showDivCheckIn ||
                      bookingData.bookingDetails[0].estimated_checkin ? (
                        <EstimatedCheckin
                          showDivCheckIn={showDivCheckIn}
                          setShowDivCheckIn={setShowDivCheckIn}
                          bookingDetails={bookingData.bookingDetails}
                          isDisableCheckIn={isDisableCheckIn}
                          setDisableCheckIn={setDisableCheckIn}
                          checkInDisable={checkInDisable}
                          setCheckInDisable={setCheckInDisable}
                        />
                      ) : null}
                    </div>
                  </>
                )}

                {/* Booking PrintOut  */}
                <PrintBooking
                  bookingData={bookingData.bookingDetails}
                  api_data={bookingData.api_data}
                  property_details={bookingData.property_details}
                  currency={currency}
                  ref={componentRef}
                />
                {/* <div className="" >Test Print</div> */}
                {/* <PrintBooking ref={componentRef} /> */}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BookingConfirmation;
