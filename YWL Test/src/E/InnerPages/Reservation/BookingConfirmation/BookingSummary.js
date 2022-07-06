import React, { useState } from 'react'
import { useRecoilValue } from "recoil";
import ReactHtmlParser from "react-html-parser";

import { propertyDataSelector } from "../../../../Recoil/themeModule";
import RatePolicyModal from "../sections/popups/RatePolicyModal";
import Backdrop from "../sections/popups/backdrop";
import '../sections/popups/index.css';

// const BookingSummary = ({ data, subtotalWithoutExtraPerson, totalNumberOfGuests, rooms, totalADULTS, totalCHILDREN, noOfNights, currency, currencyMultiplicative, key }) => {
    const BookingSummary = ({ roomAmntOnly, totalExtraAdultChargePerDay, totalExtraChildChargePerDay, roomTotal, rooms, data, currency, noOfNights, currencyMultiplicative, otherDiscountName}) => {
    // console.log('log: ', data, subtotalWithoutExtraPerson, totalNumberOfGuests, rooms, totalADULTS, totalCHILDREN, noOfNights, currencyMultiplicative)
    // return false;
    // console.log('data: ', data)

    /*let discountArray = []
    let promoArray = []

    let discount_total_without_ext_person = 0
    
    let base_total2 = 0
    let total_tax = 0
    let total_add_fees = 0
    
    let tax = 0
    let total = 0
    let total_deal_amnt = 0
    let avgDiscountRate = 0

    for (let y = 0; y < data.payment.length; y++) {
        discount_total_without_ext_person += parseFloat(data.payment[y].discount_total_without_ext_person)

        base_total2 += parseFloat(data.payment[y].base_total)
        discountArray[y] = data.payment[y].discount_details
        total_deal_amnt += data.payment[y].discount_details.deal_data.discount_amount
    }

    let total_deal_per = data.payment[0].discount_details.deal_data.discount_percent
    discountArray = data.payment[0].discount_details.discount_data
    promoArray = data.payment[0].discount_details.promo_code_data
    total_add_fees += data.payment[0].add_fees

    let otherDiscountName = ''
    if (data.payment[0].discount_details.discount_data.name != '') {
        otherDiscountName = data.payment[0].discount_details.discount_data.name
    } else if (data.payment[0].discount_details.discount_data.type == 'promo') {
        otherDiscountName = 'Promotion Code'
    } else if (data.payment[0].discount_details.discount_data.type == 'special') {
        otherDiscountName = 'Special Code'
    } else if (data.payment[0].discount_details.discount_data.type == 'package') {
        otherDiscountName = 'Additional Amount'
    } else if (data.payment[0].discount_details.discount_data.type == 'apd') {
        otherDiscountName = 'Advance Purchase'
    }

    if (otherDiscountName == 'Best_Standard_Rate') {
        otherDiscountName = 'Best Standard Online Rate';
    }

    if (otherDiscountName == 'Best_Standard_Strike') {
        otherDiscountName = '';
    }

    let dailyRate = data.payment[0].base_total
    let DailyRateNew = dailyRate.split(".");


    let adults = 0;
    let children = 0;
    let subtotal = 0;

    let extraAdult = 0;
    let extraChild = 0;
    let roomTotal = 0;

    let totalExtraAdultChargePerDay = 0;
    let totalExtraChildChargePerDay = 0;
    let totalExtraPersonChargePerDay = 0

    adults = parseInt(data.no_of_adults)
    children = parseInt(data.no_of_childs)
    let personPerRoom = adults + children
    totalNumberOfGuests = totalNumberOfGuests + personPerRoom
    let baseOccupancy = parseInt(data.baseOccupancy)

    let extraAdultCharge = parseInt(data.extraAdultCharge);
    let extraChildCharge = parseInt(data.extraChildCharge);

    totalADULTS += parseInt(data.no_of_adults);
    totalCHILDREN += parseInt(data.no_of_childs);

    if (personPerRoom > baseOccupancy) {
        if (adults > baseOccupancy) {
            extraAdult = adults - baseOccupancy;
            totalExtraAdultChargePerDay = extraAdult * extraAdultCharge;
        }

        if(children > 0){
            extraChild=children;	
            if(adults<baseOccupancy){
                extraChild = children-(baseOccupancy-adults);
            }
            totalExtraChildChargePerDay = extraChild * extraChildCharge;
        }
        totalExtraPersonChargePerDay=totalExtraAdultChargePerDay+totalExtraChildChargePerDay;
    }

    if(parseInt(discountArray.is_discount_applied) === 1){
        if(parseFloat(discountArray.disc_dollar) > 0){
            avgDiscountRate = parseFloat(discountArray.disc_dollar)*noOfNights
        }

        if(parseFloat(discountArray.disc_percentage) > 0){
            avgDiscountRate = (base_total2 - (totalExtraPersonChargePerDay*noOfNights) - discount_total_without_ext_person);
        }
    }

    // console.log(avgDiscountRate)
    // console.log(promoArray)
    if(parseInt(promoArray.is_promo_code_applied) === 0){
        if(parseFloat(promoArray.pc_amount) > 0){
            avgDiscountRate = parseFloat(promoArray.pc_amount)*noOfNights
        }else if(parseFloat(promoArray.pc_percent) > 0){
            avgDiscountRate = (base_total2 - (totalExtraPersonChargePerDay*noOfNights) - discount_total_without_ext_person);
        }

        if(promoArray.type === 'package'){
            avgDiscountRate = -1 * avgDiscountRate
        }
    }

    let lowAvgRate2 = (base_total2 / noOfNights)

    let lowAvgRate = parseFloat((discount_total_without_ext_person+avgDiscountRate) / noOfNights).toFixed(2)
    let avgDailyRate = lowAvgRate.split('.');

    let roomAmntOnly = ((lowAvgRate*noOfNights)*currencyMultiplicative);
    subtotal +=(discount_total_without_ext_person+totalExtraPersonChargePerDay*noOfNights)*currencyMultiplicative;
    roomTotal = (discount_total_without_ext_person+totalExtraPersonChargePerDay*noOfNights)*currencyMultiplicative;
    
    if (typeof (Storage) !== "undefined") {
        if (localStorage.getItem('subtotal') === null) {
            window.localStorage.setItem('subtotal', parseInt(subtotal));
        }else{
            let tmpSubtotal = localStorage.getItem('subtotal');
            window.localStorage.setItem('subtotal', parseInt(tmpSubtotal)+parseInt(subtotal));
        }
        
    }

    if(roomAmntOnly < 0){
        roomAmntOnly = 0;
    }
    if(roomTotal < 0){
        roomTotal = 0;
    }
    if(subtotal < 0){
        subtotal = 0;
    }*/

    const [modalIsOpen, setModalIsOpen] = useState(false);
    function ratePolicyShow() {
        setModalIsOpen(true);
    }

    function ratePolicyHide() {
        setModalIsOpen(false);
    }


    const propertyData = useRecoilValue(propertyDataSelector);
    let title = '';
    let ratePolicyDesc = '';
    let ratePolicyPolicy = '';
    let ratePolicyCustomPolicy = '';
    let ratePolicyCustomHour = '';
    let isStandardDiscountNotExists = '';
    let ratePolicyCustomText = '';


    let ratepolicyText = 'Rate Policy'
    if(otherDiscountName !== ''){
        ratepolicyText = 'Rate Policy'
        isStandardDiscountNotExists = '';

        title = otherDiscountName;
        ratePolicyDesc = data.payment[0].discount_details.discount_data.rate_plan_desc;
        ratePolicyPolicy = data.payment[0].discount_details.discount_data.rate_plan_policy;

        if(parseInt(data.payment[0].discount_details.discount_data.customCancellationHour) > 0 || data.specialCancellationPolicyHour !== undefined){
            if(parseInt(data.payment[0].discount_details.discount_data.customCancellationHour) > 0){
                ratePolicyCustomPolicy = data.payment[0].discount_details.discount_data.custom_cancellation_desc
                ratePolicyCustomHour = data.payment[0].discount_details.discount_data.customCancellationHour
            }else if(data.specialCancellationPolicyHour !== undefined){
                ratePolicyCustomPolicy = data.specialCancellationPolicyDesc
            }
        }
    }else if(data.specialCancellationPolicyHour !== undefined){
        ratepolicyText = 'Cancellation Policy'
    }else if(propertyData.cancel_hours !== '' && propertyData.cancellation_policy !== ''){
        ratepolicyText = 'Rate Policy';
        isStandardDiscountNotExists = 1;

        title = data.room_type_name;
        // base rate policy popup content if no RACK or PHANTOM rate exists
        if(propertyData.cancel_hours){
            ratePolicyCustomHour = parseInt(propertyData.cancel_hours);
            ratePolicyCustomPolicy = propertyData.cancellation_policy;
        }
    }

    

    return <>
        <div className="d-flex">
            <div className="col-lg-7 col-md-5 col-sm-12 col-xs-12 PTB text-left PTB">
                Room {rooms} - {data.room_type_name}
                <br />
                <span><a style={{ color: "#337ab7", cursor: "pointer" }} onClick={ratePolicyShow}>
                    {ratepolicyText}
                </a></span>
            </div>
            {modalIsOpen && ( 
                <RatePolicyModal
                    title={title}
                    onCancel={ratePolicyHide}
                    ratePolicyDesc={ratePolicyDesc}
                    ratePolicyPolicy={ratePolicyPolicy}
                    ratePolicyCustomPolicy={ratePolicyCustomPolicy}
                    ratePolicyCustomHour={ratePolicyCustomHour}
                    isStandardDiscountNotExists={ isStandardDiscountNotExists }
                    ratePolicyCustomText={ratePolicyCustomText}
                />
            )}
            {modalIsOpen && <Backdrop onCancel={ratePolicyHide} />}

            <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 PTB LFbold black text-right PTB">
                {ReactHtmlParser(currency)+parseFloat(roomAmntOnly).toFixed(2)}
            </div>
        </div>
        <div className="d-flex">
            <div className="col-lg-7 col-md-5 col-sm-12 col-xs-12 PTB text-left ">
            {data.no_of_adults} {(parseInt(data.no_of_adults) > 1) ? 'Adults' : 'Adult'}, {data.no_of_childs} {(parseInt(data.no_of_childs) == 1) ? 'Child' : 'Children'}
            </div>
        </div>
        <div className="d-flex">
            <div className="col-lg-7 col-md-5 col-sm-12 col-xs-12 PTB text-left">
            Extra Adult Fees:
            </div>
            <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 PTB LFbold black text-right">
            {ReactHtmlParser(currency)+parseFloat(totalExtraAdultChargePerDay*noOfNights*currencyMultiplicative).toFixed(2)}
            </div>
        </div>
        <div className="d-flex">
            <div className="col-lg-7 col-md-5 col-sm-12 col-xs-12 PTB text-left">
            Extra Children Fees:
            </div>
            <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 PTB LFbold black text-right">
            {ReactHtmlParser(currency)+parseFloat(totalExtraChildChargePerDay*noOfNights*currencyMultiplicative).toFixed(2)}
            </div>
        </div>
        <div className="d-flex">
            <div className="col-lg-7 col-md-5 col-sm-12 col-xs-12 PTB text-left">
            <strong>Room {rooms} Total:</strong>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 PTB LFbold black text-right">
            {ReactHtmlParser(currency)+parseFloat(roomTotal).toFixed(2)}
            </div>
        </div>
        <div class="dottedborder pt-2"></div>
    </>

}

export default BookingSummary