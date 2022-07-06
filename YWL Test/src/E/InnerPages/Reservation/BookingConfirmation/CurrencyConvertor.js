import React, { useRef, useState } from 'react'
import './RoomConfirmation.css'

import { submitCurrencyConverter } from '../../../../DataLayer/datalayerUtilities'
import { GrDocumentConfig } from 'react-icons/gr';

const CurrencyConverter = ({ bookingDetails, currencyData }) => {
  const amountRef = useRef();
  let fromCurRef = '';
  let toCurRef = '';
  const [errorConvert, setErrorConvert] = useState(false);
  // const [successConvert, setSuccessConvert] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fromCurrencyChange = (e) => {
    fromCurRef = e.target.value;
  }

  const toCurrencyChange = (e) => {
    toCurRef = e.target.value;
  }

  const scrollToMSg = () =>{
    let scrollToDiv = document.getElementById('msgDiv');
    scrollToDiv.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });

    // set flag to False so that the message gets hidden after 6 seconds
    setTimeout(()=>{
      setErrorConvert(false); //setSuccessConvert(false);
    }, 6000)
  }

  const currencyConverterSubmit = async (event) => {
    event.preventDefault();
    let fromCur = fromCurRef ? fromCurRef : document.getElementById('fromcurrency').value
    let toCur = toCurRef ? toCurRef : document.getElementById('tocurrency').value

    if(amountRef.current.value === ''){
      setErrorConvert(true); setErrorMsg('Please enter amount need to be exchanged.'); 
      scrollToMSg(); return false;
    }

    // console.log()
    if(toCur === ''){
      setErrorConvert(true); setErrorMsg('Please select currency exchange type.'); 
      scrollToMSg(); return false;
    }

    let currencyConData = {
      'from' : fromCur,
      'to' : toCur,
      'amount' : amountRef.current.value
    }
    const response = await submitCurrencyConverter(currencyConData);
    if(response.data.type === 'success'){
      setErrorConvert(false);
      document.getElementById('resultCur').value = parseFloat(response.data.total).toFixed(2)
    }else{
      setErrorConvert(true); setErrorMsg('Something went wrong. Please try again later.'); 
      scrollToMSg(); return false;
    }
  }

  return (
    <>
      <div id='msgDiv'>
        {/* currency converter error msg */}
        {errorConvert && <>
          <div className="alert alert-danger" role="alert">
          {errorMsg}
          </div>
        </>}
      </div>
      <form onSubmit={currencyConverterSubmit}>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center mt-3 d-flex flex-column">
          <p className="text-left head_text FS20 my-0">Currency Converter</p>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-3 d-flex binform mt-5 mb-3">
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 SelectAmount">
              <input
                id="div_guest_first_name_1"
                placeholder="test"
                className="dropshadow"
                type="text"
                defaultValue={parseFloat(bookingDetails[0].total_charge).toFixed(2)}
                ref={amountRef}
              />
              <span className="dropshadow"></span>
              <label
                for="div_guest_first_name_1"
                className="registerduser head_text1"
              >
                Select Amount
              </label>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 convertIpadView">
              <select className='fromCurrency' onChange={fromCurrencyChange} id='fromcurrency'>
                {Object.values(currencyData).map((data, key) => {
                  return <option value={data.currency_code} key={key}>{data.currency_code}</option>
                })}
              </select>
              <span className="dropshadow"></span>
              <label
                for="fromcurrency"
                className="registerduser head_text1"
              >
                From
              </label>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 convertIpadView">
              <select className='toCurrency' onChange={toCurrencyChange} id='tocurrency'>
                <option value=''>Select</option>
                {Object.values(currencyData).map((data, key) => {
                  return <option value={data.currency_code} key={key}>{data.currency_code}</option>
                })}
              </select>
              <span className="dropshadow"></span>
              <label
                for="tocurrency"
                className="registerduser head_text1"
              >
                To
              </label>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 convertIpadView">
              <input
                id="resultCur"
                placeholder="test"
                className="dropshadow"
                type="text"
              />
              <span className="dropshadow"></span>
              <label
                for="resultCur"
                className="registerduser head_text1"
              >
                Result
              </label>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
            <button className="btnEffect" type='submit' title='Convert'>CONVERT</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default CurrencyConverter