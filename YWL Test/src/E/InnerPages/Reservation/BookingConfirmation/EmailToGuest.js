import React, {useState, useRef} from 'react'
import './RoomConfirmation.css'

import { submitEmailToGuest } from '../../../../DataLayer/datalayerUtilities'

const EmailToGuest = ({ bookingDetails }) => {
  let billingExtraEmails = []
  if(bookingDetails[0].billing_extra_emails){
    billingExtraEmails = bookingDetails[0].billing_extra_emails.split(",");
  }

  const emailOneRef = useRef();
  const emailTwoRef = useRef();
  const emailThreeRef = useRef();
  const propertyIdRef = useRef();
  const bookingIdRef = useRef();
  const folioRef = useRef();

  const [emailGuestSuccess, setEmailGuestSuccess] = useState(false);
  const [emailGuestError, setEmailGuestError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const EmailToGuestSubmit = async (event) => {
    event.preventDefault();

    const scrollToError = () =>{
      let scrollToDiv = document.getElementById('errorScroll');
      scrollToDiv.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }

    // validation START
    if(emailOneRef.current.value === '' && emailTwoRef.current.value === '' && emailThreeRef.current.value === ''){
      setEmailGuestSuccess(false); setEmailGuestError(true); setErrorMsg('Enter at least one email address');
      scrollToError(); return false;
    }else{
      let regEx = /^.{1,}@.{2,}\..{2,}/;
      let extraEmail = '';
      let commaseprates = '';

      if(emailOneRef.current.value){
        if(!regEx.test(emailOneRef.current.value)){
          setEmailGuestSuccess(false); setEmailGuestError(true); setErrorMsg('Invalid email address 1');
          scrollToError(); return false;
        }
        extraEmail += emailOneRef.current.value;
        commaseprates = ', ';
      }

      if(emailTwoRef.current.value){
        if(!regEx.test(emailTwoRef.current.value)){
          setEmailGuestSuccess(false); setEmailGuestError(true); setErrorMsg('Invalid email address 2');
          scrollToError(); return false;
        }

        if(emailTwoRef.current.value === emailOneRef.current.value){
          setEmailGuestSuccess(false); setEmailGuestError(true); setErrorMsg('Email addresses should not be the same');
          scrollToError(); return false;
        }
        extraEmail += commaseprates+emailTwoRef.current.value;
        commaseprates = ', ';
      }

      if(emailThreeRef.current.value){
        if(!regEx.test(emailThreeRef.current.value)){
          setEmailGuestSuccess(false); setEmailGuestError(true); setErrorMsg('Invalid email address 3');
          scrollToError(); return false;
        }

        if((emailThreeRef.current.value === emailOneRef.current.value) || (emailThreeRef.current.value === emailTwoRef.current.value)){
          setEmailGuestSuccess(false); setEmailGuestError(true); setErrorMsg('Email addresses should not be the same');
          scrollToError(); return false;
        }
        extraEmail += commaseprates+emailThreeRef.current.value;
      }

      setEmailGuestError(false);  setErrorMsg('');
    // validation END  

      let emailToGuestData = {
        property_id : propertyIdRef.current.value,
        booking_id : bookingIdRef.current.value,
        extraEmails : extraEmail
      }
      
      const response = await submitEmailToGuest(emailToGuestData);
      // console.log('response: ', response.data)
      if(response.data.type === 'success'){
        setEmailGuestSuccess(true); setEmailGuestError(false);
        setErrorMsg('Reservation Confirmation Email successfully sent. Please check your email inbox (or junk mail folder) for your email confirmation.'); 
        scrollToError(); 
        document.getElementById('extraemail1').value = '';
        document.getElementById('extraemail2').value = '';
        document.getElementById('extraemail3').value = '';
      }else{
        setEmailGuestSuccess(false); setEmailGuestError(true); 
        setErrorMsg('Oops! Well, this is really embarrassing. It looks like we have run into an error with your reservation. Please try again later.'); 
        scrollToError();
      }

      // set flag to False so that the message gets hidden after 6 seconds
      setTimeout(()=>{
        setEmailGuestSuccess(false); setEmailGuestError(false);
      }, 6000)
    }
  }

  return (
    <>
    <p id='errorScroll'></p>
    {/* email guest success msg */}
    {emailGuestSuccess && <>
      <div className="alert alert-success" role="alert">
      {errorMsg}
      </div>
    </>}

    {/* email guest error msg */}
    {emailGuestError && <>
      <div className="alert alert-danger" role="alert">
      {errorMsg}
      </div>
    </>}
    <form onSubmit={EmailToGuestSubmit}>
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center mt-3 d-flex flex-column">
        <p className="text-left head_text FS20 my-0">
          Email This Reservation Confirmation To Other Guests
        </p>
        <p className="FS13 ml-3 text-justify">
          Would you like to send this information to other email addresses?
          Please Note: Additional itineraries will contain pricing information.
        </p>
      </div>
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 d-flex flex-wrap binform guestEmail1 mt-3 mb-3">
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 guestFirstName">
          <input
            id="extraemail1"
            placeholder="Email Address 1"
            className="dropshadow"
            type="text"
            defaultValue={billingExtraEmails[0] && billingExtraEmails[0]}
            ref={emailOneRef}
          />
          <span className="dropshadow"></span>
          {/* <label for="div_guest_first_name_1" className="registerduser">
            Email Address 1
          </label> */}
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 roomCount">
          <input
            id="extraemail2"
            placeholder="Email Address 2"
            className="dropshadow"
            type="text"
            defaultValue={billingExtraEmails[1] && billingExtraEmails[1]}
            ref={emailTwoRef}
          />
          <span className="dropshadow"></span>
          {/* <label for="div_guest_first_name_1" className="registerduser">
            Email Address 2
          </label> */}
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 mt-4 roomCount">
          <input
            id="extraemail3"
            placeholder="Email Address 3"
            className="dropshadow"
            type="text"
            defaultValue={billingExtraEmails[2] && billingExtraEmails[2]}
            ref={emailThreeRef}
          />
          <span className="dropshadow"></span>
          {/* <label for="div_guest_first_name_1" className="registerduser">
            Email Address 3
          </label> */}
        </div>
      </div>
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
        {/* <a className="btnEffect" title='Send Mail'>SEND MAIL</a> */}
        <button type='submit' className="btnEffect" title='Send Mail'>SEND MAIL</button>
      </div>
      <input type="hidden" value={bookingDetails[0].property_id} id="emailpropertyId" ref={propertyIdRef} />
      <input type="hidden" value={bookingDetails[0].id} id="emailbookingId" ref={bookingIdRef} />
      <input type="hidden" value={bookingDetails[0].folio_number} id="eFolioNumber" ref={folioRef} />
    </form>
    </>
  )
}

export default EmailToGuest
