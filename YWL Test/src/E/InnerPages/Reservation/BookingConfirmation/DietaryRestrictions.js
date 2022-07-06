import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
// import { FaConciergeBell, FaRegEdit } from "react-icons/fa";

import { submitDietaryRestriction } from '../../../../DataLayer/datalayerUtilities'

const DietaryRestrictions = (props) => {
  const [count, setCount] = useState(2000);

  const dietRestrictRef = useRef();
  const folioRef = useRef();
  const bookingIdRef = useRef();
  const isAsiRef = useRef();
  const [dietaryMsg, setDietaryMsg] = useState('');
  const [dietaryRestrictError, setDietaryRestrictError] = useState(false);
  const [dietaryRestrictSuccess, setDietaryRestrictSuccess] = useState(false);
  
  const onClick = () => {
      props.setShowDivDietary(false); props.setDisableDietary(true);
      setDietaryRestrictError(false); setDietaryRestrictSuccess(false); setDietaryMsg('');
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
    
    if(dietRestrictRef.current.value === ''){
      setDietaryRestrictSuccess(false); setDietaryRestrictError(true);
      setDietaryMsg('Please enter Dietary Restriction')
      return false;
    }

    let dietaryRestrictData = {
      folio: folioRef.current.value,
      bookingId: bookingIdRef.current.value,
      isAsi: isAsiRef.current.value,
      dietary_restriction : dietRestrictRef.current.value
    }
    
    const dietaryRestrictResponse = await submitDietaryRestriction(dietaryRestrictData)
    if(dietaryRestrictResponse.data.result === true){
      setDietaryRestrictError(false); setDietaryRestrictSuccess(true);
      setDietaryMsg('The Dietary Restriction has been successfully updated');
      props.setShowDivDietary(false); props.setDisableDietary(true);
    }

    // set flag to False so that the message gets hidden after 6 seconds
    setTimeout(() => {
      setDietaryRestrictError(false); setDietaryRestrictSuccess(false); setDietaryMsg('');
    }, 6000);
  };

  return (
    <div id="temp">
      {/* Dietary Restriction error msg */}
      {dietaryRestrictError && (
        <>
          <div className="alert alert-danger" role="alert">
            {dietaryMsg}
          </div>
        </>
      )}

      {dietaryRestrictSuccess && (
        <>
          <div className="alert alert-success" role="alert">
            {dietaryMsg}
          </div>
        </>
      )}
      <form className="mt-4" onSubmit={onSubmit}>
        <div className="form-group">
          <textarea
            placeholder="Please Mention Your Dietary Restriction"
            maxLength="2000"
            onChange={(e) =>
              setCount(
                2000 - e.target.value.length <= 0 ? (
                  <span className="text-danger">
                    Dietary Restrictions cannot be greater than 2000 characters in length
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
            ref={dietRestrictRef}
            disabled={props.isDisableDietary}
            defaultValue={
              (props.bookingDetails[0].dietary_restrictions) ? props.bookingDetails[0].dietary_restrictions : ''
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

        {!props.isDisableDietary && <div className="specialBtn d-flex mt-5" style={{ justifyContent: "space-between" }}>
          <button className="ml-3 border btn btn-danger" type='button' onClick={onClick}>CANCEL</button>
          <button className="mr-3 border btn btn-success" type='submit'>ADD</button>
        </div>}
      </form>
    </div>
  );
};

export default DietaryRestrictions;
