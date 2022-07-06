import React, { useState, useRef } from "react";
import { FiEdit } from "react-icons/fi";

import "./RoomConfirmation.css";
import { FaSmokingBan } from "react-icons/fa";

import EditGuestName from "./EditGuestName";

const GuestDetails = ({ disabled, handleClick, bookingDetails, noOfRooms, fnameRef, setfnames, fnames, lnameRef, setlnames, lnames, roomIdRef, setRoomId, roomId, editGuestNameSubmit, numberOfRoomsRef, guestPropertyIdRef, guestBookingIdRef, is_asiRef, property, policies, currencyMultiplicative, currency, splCancelPolicy }) => {
  
  let editRoomsArray = []

  for (let i = 0; i < parseInt(noOfRooms); i++) {
    if(typeof bookingDetails[i] === 'object'){
      editRoomsArray.push(<EditGuestName i={i} bookingDetails={bookingDetails[i]} disabled={disabled}
                            fnameRef={fnameRef} setfnames={setfnames} fnames={fnames} 
                            lnameRef={lnameRef} setlnames={setlnames} lnames={lnames}
                            roomIdRef={roomIdRef} setRoomId={setRoomId} roomId={roomId}
                            property={property} policies={policies} currencyMultiplicative={currencyMultiplicative}
                            currency={currency} splCancelPolicy={splCancelPolicy} key={i}/>)
    }
  }

  return (
    <>
    <form onSubmit={editGuestNameSubmit} id='editGuestName'>
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 justify-content-between mt-3 d-flex px-0">
        <h4 className="text-left head_text FS20">Enter Your Guest Name</h4>
        <a className="text-right head_text editIcon" onClick={handleClick}>
          {disabled && <FiEdit size="30" className="" />}
        </a>
        {!disabled && <button className="btn btn-success" type="submit">Update All</button>}
      </div>
      <input type='hidden' defaultValue={noOfRooms} name="numberOfRooms" id="numberOfRooms" ref={numberOfRoomsRef} />
      <input type='hidden' defaultValue={bookingDetails[0].property_id} name="guestPropertyId" id="guestPropertyId" ref={guestPropertyIdRef} />
      <input type='hidden' defaultValue={bookingDetails[0].id} name="guestBookingId" id="guestBookingId" ref={guestBookingIdRef} />
      <input type='hidden' defaultValue={bookingDetails[0].is_asi} name="is_asi" id="is_asi" ref={is_asiRef} />
      
      <div className="graybox mt-3">
      {editRoomsArray}
      </div>
    </form>
    </>
  );
};
export default GuestDetails;
