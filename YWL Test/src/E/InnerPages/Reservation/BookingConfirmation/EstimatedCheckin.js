import React, { useState, useRef } from "react";
import moment from "moment";
// import { useForm } from "react-hook-form";
// import { FaConciergeBell, FaRegEdit } from "react-icons/fa";

import { submitEstimatedArrival } from '../../../../DataLayer/datalayerUtilities'

const EstimatedCheckin = (props) => {
  const [estimatedTimeOfArrivalArr, setEstimatedTimeOfArrivalArr] = useState([]);

  let estimatedTimeRef = '';
  const folioRef = useRef();
  const bookingIdRef = useRef();
  const isAsiRef = useRef();
  const [checkinMsg, setCheckinMsg] = useState('');
  const [estimatedCheckinError, setEstimatedCheckinError] = useState(false);
  const [estimatedCheckinSuccess, setEstimatedCheckinSuccess] = useState(false);

  const estimatedCheckinChange = (e) => {
    estimatedTimeRef = e.target.value;
  }
  
  const onClickTimeCancel = () => {
      props.setShowDivCheckIn(false); props.setDisableCheckIn(true); props.setCheckInDisable(true);
      setEstimatedCheckinError(false); setEstimatedCheckinSuccess(false); setCheckinMsg('');
  };

  let start = new Date('2022-04-25 01:00:00');
  let estimatedTimeOfArrivalArrTmp = [];
  estimatedTimeOfArrivalArrTmp.push(start);

  for(let s=1; s<24; s++){
    estimatedTimeOfArrivalArrTmp.push(moment(start).add(60, 'm').toDate());
    start = estimatedTimeOfArrivalArrTmp[s];
  }

  if(estimatedTimeOfArrivalArrTmp.length === 24 && estimatedTimeOfArrivalArr.length === 0){
    setEstimatedTimeOfArrivalArr(estimatedTimeOfArrivalArrTmp);
  }
  
  // Object.values(estimatedTimeOfArrivalArr).map((data, key) => {
  //   console.log(data)
  // })
  
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  //   trigger,
  // } = useForm();

  const onSubmit = async (event) => {
    event.preventDefault();

    let estimatedTimeData = {
      folio: folioRef.current.value,
      bookingId: bookingIdRef.current.value,
      isAsi: isAsiRef.current.value,
      estimatedTime : (estimatedTimeRef !== '') ? estimatedTimeRef : document.getElementById('estimated-checkin').value
    }

    const estimatedTimeResponse = await submitEstimatedArrival(estimatedTimeData);    
    if(estimatedTimeResponse.data.result === true){ 
      setEstimatedCheckinError(false); setEstimatedCheckinSuccess(true);
      setCheckinMsg('Estimated Time of Arrival has been successfully updated');
      props.setShowDivCheckIn(false); props.setDisableCheckIn(true); props.setCheckInDisable(true);
    }

    // set flag to False so that the message gets hidden after 6 seconds
    setTimeout(() => {
      setEstimatedCheckinError(false); setEstimatedCheckinSuccess(false); setCheckinMsg('');
    }, 6000);
  };

  return (
    <div id="temp">
      {/* Dietary Restriction error msg */}
      {/* {estimatedCheckinError && (
        <>
          <div className="alert alert-danger" role="alert">
            {checkinMsg}
          </div>
        </>
      )} */}

      {estimatedCheckinSuccess && (
        <>
          <div className="alert alert-success" role="alert">
            {checkinMsg}
          </div>
        </>
      )}
      <form className="mt-4" onSubmit={onSubmit}>
        <div className="form-group">
          <select className='selectArrival'
          onChange={estimatedCheckinChange} 
          id='estimated-checkin' 
          defaultValue={props.bookingDetails[0].estimated_checkin}
          disabled={props.checkInDisable} >
            {estimatedTimeOfArrivalArr && Object.values(estimatedTimeOfArrivalArr).map((data, key) => {
              return <option value={moment(data).format("HH:mm:ss")} key={key}>{moment(data).format("h:mm A")}</option>
            })}
          </select>
          <span className="dropshadow"></span>
          {/* <label
            htmlFor="estimated-checkin"
            className="registerduser head_text1"
          >
            Estimated Time of Arrival
          </label> */}

          <input type='hidden' defaultValue={props.bookingDetails[0].folio_number} ref={folioRef} />
          <input type='hidden' defaultValue={props.bookingDetails[0].id} ref={bookingIdRef} />
          <input type='hidden' defaultValue={props.bookingDetails[0].is_asi} ref={isAsiRef} />
        </div>

        {!props.isDisableCheckIn && <div className="specialBtn d-flex mt-5" style={{ justifyContent: "space-between" }}>
          <button className="ml-3 border btn btn-danger" type='button' onClick={onClickTimeCancel}>CANCEL</button>
          <button className="mr-3 border btn btn-success" type='submit'>UPDATE</button>
        </div>}
      </form>
    </div>
  );
};

export default EstimatedCheckin;
