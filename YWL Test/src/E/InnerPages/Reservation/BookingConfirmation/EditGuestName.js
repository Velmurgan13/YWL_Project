import React, { useState } from "react";

import { FaSmokingBan } from "react-icons/fa";
import PopModal from '../PopupModal/UI/PopModal';
import moment from 'moment'

const EditGuestName = ({ i, bookingDetails, disabled, fnameRef, setfnames, fnames, lnameRef, setlnames, lnames, roomIdRef, setRoomId, roomId, property, policies, currencyMultiplicative, currency, splCancelPolicy }) => {

    // View Room Details modal START
    const [error, setError] = useState();

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
        // console.log(error);
        setError(null);
    };

    let isStandardDiscountNotExists = 1;
    let input_params = {
        'room_check_in' : moment(new Date(bookingDetails.arrival_date)).format("MM/DD/YYYY"),
        'room_check_out' : moment(new Date(bookingDetails.departure_date)).format("MM/DD/YYYY"),
        'promo_code' : bookingDetails.promo_code_by_get
    }

    if(bookingDetails.promo_code_by_get === ''){
        isStandardDiscountNotExists = 1;
    }
    // View Room Details modal END

    function handleChange(j, event) {
        const values = [...fnames];
        values[j] = event.target.value;
        setfnames(values);
    }

    function handleChangeTwo(j, event) {
        const values = [...lnames];
        values[j] = event.target.value;
        setlnames(values);
    }

    function handleChangeThree(j, event) {
        const values = [...roomId];
        values[j] = event.target.value;
        setRoomId(values);
    }

    let imgName = '';
    if (bookingDetails.roomTypeDetails[0].room_type_images[0].image_id) {
        imgName = bookingDetails.roomTypeDetails[0].room_type_images[0].image_url.replace("/thumbs/", "/medium/")
    } else {
        imgName = 'https://www.innstaging.com/assets/images/bin/default-no-room-image.png'
    }

    return (<>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-3 d-flex roomCardDetails1">
            <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 p-0 m-0">
                <img className="w-100 HEIGHTFIX"
                    src={imgName}
                    alt={bookingDetails.roomTypeDetails[0].room_type_images[0].image_caption}
                />
            </div>
            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 roomCount">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 P0_mobile">
                    <strong className="FS18">Room {i + 1}:</strong>
                    <span className="ml-2">{bookingDetails.no_of_adults} Adults, {bookingDetails.no_of_childs} Children</span>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 LFbold pt-3 P0_mobile d-flex">
                    <FaSmokingBan size="30" fill="red" className="smokeIcon mr-2" title="Non Smoking" />
                    <span className="pt-1">{bookingDetails.room_type_name}</span>
                </div>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-12 details MT_mobile BR text-center P0_mobile mt-4 px-0">
                    {error && (
                    <PopModal
                      onConfirm={errorHandler}
                      data={bookingDetails.roomTypeDetails[0]}
                      property_details={property}
                      policies={policies}
                      splCancelPolicy={splCancelPolicy}
                      input_params={input_params}
                      i={i+1}
                      isStandardDiscountNotExists={isStandardDiscountNotExists}
                      currency={currency}
                      convertPrice={currencyMultiplicative}
                    >
                      <div style={"height: 300px"}></div>
                    </PopModal>
                  )}
                    <a href="#" title="View Room Details" onClick={addUserHandler}>
                        View Room Details
                    </a>
                </div>
            </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-3 d-flex binform mt-5 mb-3">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 guestFirstName">
                <input
                    id={"div_guest_first_name_" + i} name={"guest_first_name_" + i}
                    type="text"
                    disabled={disabled}
                    defaultValue={bookingDetails.guest_fname}
                    ref={fnameRef}
                    onChange={(e) => handleChange(i, e)}
                />
                <span className="dropshadow"></span>
                <label for={"div_guest_first_name_" + i} className="registerduser">
                    <span className="text-danger">* </span> First Name
                </label>
                <span id={'errorFirstName_' + i} style={{ color: 'red' }}></span>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 guestLastName">
                <input
                    id={"div_guest_last_name_" + i} name={"guest_last_name_" + i}
                    type="text"
                    disabled={disabled}
                    defaultValue={bookingDetails.guest_lname}
                    ref={lnameRef}
                    onChange={(e) => handleChangeTwo(i, e)}
                />
                <span className="dropshadow"></span>
                <label for={"div_guest_last_name_" + i} className="registerduser">
                    <span className="text-danger">* </span> Last Name
                </label>
                <span id={'errorLastName_' + i} style={{ color: 'red' }}></span>
            </div>

            <input type='hidden' defaultValue={bookingDetails.room_id} id={'room_id_' + i} ref={roomIdRef} onChange={(e) => handleChangeThree(i, e)} />
        </div>

    </>)
};

export default EditGuestName;
