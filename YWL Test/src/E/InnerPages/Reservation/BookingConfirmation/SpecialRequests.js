import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { FaConciergeBell, FaRegEdit } from "react-icons/fa";

import { submitSpecialRequest } from '../../../../DataLayer/datalayerUtilities'

const SpecialRequest = (props) => {
  const [count, setCount] = useState(2000);

  const splRqRef = useRef();
  const folioRef = useRef();
  const bookingIdRef = useRef();
  const isAsiRef = useRef();
  const [splReqMsg, setsplReqMsg] = useState('');
  const [splReqError, setSplReqError] = useState(false);
  const [splReqSuccess, setSplReqSuccess] = useState(false);
  
  const onClick = () => {
      props.setShowDiv(false); props.setDisableSplRq(true);
      setSplReqError(false); setSplReqSuccess(false); setsplReqMsg('');
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = async (event) => {
    event.preventDefault();
    
    if(splRqRef.current.value === ''){
      setSplReqSuccess(false); setSplReqError(true);
      setsplReqMsg('Please enter Special Request')
      return false;
    }

    let splReqData = {
      folio: folioRef.current.value,
      bookingId: bookingIdRef.current.value,
      isAsi: isAsiRef.current.value,
      special_instructions : splRqRef.current.value
    }
    
    const splReqResponse = await submitSpecialRequest(splReqData)
    if(splReqResponse.data.result === true){
      setSplReqError(false); setSplReqSuccess(true);
      setsplReqMsg('The Special Request has been successfully updated');
      props.setShowDiv(false); props.setDisableSplRq(true);
    }

    // set flag to False so that the message gets hidden after 6 seconds
    setTimeout(() => {
      setSplReqError(false); setSplReqSuccess(false); setsplReqMsg('');
    }, 6000);
  };

  return (
    <div id="temp">
      {/* special request error msg */}
      {splReqError && (
        <>
          <div className="alert alert-danger" role="alert">
            {splReqMsg}
          </div>
        </>
      )}

      {splReqSuccess && (
        <>
          <div className="alert alert-success" role="alert">
            {splReqMsg}
          </div>
        </>
      )}
      <form className="mt-4" onSubmit={onSubmit}>
        <div className="form-group">
          <textarea
            placeholder="Please Mention Your Special Request"
            maxLength="2000"
            onChange={(e) =>
              setCount(
                2000 - e.target.value.length <= 0 ? (
                  <span className="text-danger">
                    Special Requests cannot be greater than 2000 characters in length
                  </span>
                ) : (
                  2000 - e.target.value.length
                )
              )
            }
            className={`form-control ${errors.subject && "invalid"}`}
            rows="5"
            onKeyUp={() => {
              trigger("subject");
            }}
            ref={splRqRef}
            disabled={props.isDisableSplRq}
            defaultValue={
              (props.bookingDetails[0].special_instructions) ? props.bookingDetails[0].special_instructions : ''
            }
          ></textarea>

          <label className="custLabel">Subject</label>
          {errors.subject && (
            <small className="text-danger">{errors.subject.message}</small>
          )}
          <span className="char-count float-right">
            {count} Characters left
          </span>
          <input type='hidden' defaultValue={props.bookingDetails[0].folio_number} ref={folioRef} />
          <input type='hidden' defaultValue={props.bookingDetails[0].id} ref={bookingIdRef} />
          <input type='hidden' defaultValue={props.bookingDetails[0].is_asi} ref={isAsiRef} />
        </div>

        {!props.isDisableSplRq && <div className="specialBtn d-flex mt-5" style={{ justifyContent: "space-between" }}>
          <button className="ml-3 border btn btn-danger" type='button' onClick={onClick}>CANCEL</button>
          <button className="mr-3 border btn btn-success" type='submit'>ADD</button>
        </div>}
      </form>
    </div>
  );
};

export default SpecialRequest;
