import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./index.scss";
import moment from "moment";
import { getPackagesDetailsFormData } from "../../../../DataLayer/datalayerUtilities";
import { useRecoilValue } from "recoil";
import {
  propertyDataSelector,
  themeSelector,
} from "../../../../Recoil/themeModule";
import ReCAPTCHA from "react-google-recaptcha";
import CustomCalendar from "../../../CommonAssets/Calnedar";
import ReactHtmlParser from "react-html-parser";
import packageForm from '../SpecialComponent/'
import CurrencyModal from "../../Reservation/sections/popups/CurrencyModal"
import { assetsUrl }  from "../../../../Configuration/config_url"
import Backdrop from "../../Reservation/sections/popups/backdrop"

export default function SpecialFormElement(props) {

  const propertyData = useRecoilValue(propertyDataSelector);

  const [count1, setCount1] = useState(2000);
  const [captcha, setCaptchaData] = useState([]);
  const [checkin_Date, setCheckin_Date] = useState(new Date());
  const [checkout_Date, setCheckout_Date] = useState(
    new Date(Date.now() + 3600 * 1000 * 24)
  );
  const themeSelectorData = useRecoilValue(themeSelector);
  const newcaptchakey = themeSelectorData.noCaptchaSiteKey;
  const recaptchaRef = React.createRef();
  const [currencyModalOpen, setCurrencyModalOpen] = useState(false);
  // console.log("this is item",  )
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
    trigger,
  } = useForm();

  function onChange(value) {
    setCaptchaData(value);
  }
  // ------------------------------------------------------
  function currencyModalShow() {
    setCurrencyModalOpen(true);
  }

  function currencyModalHide() {
    setCurrencyModalOpen(false);
  }

  console.log("sdghjsbdhbgk", props.currencyAbbr)
  // ------------------------------------------------------
  const onSubmit = async (data) => {
   
    const { property_id } = propertyData;

    const finalData = {
      ...data,
      captcha,
      checkin_Date,
      checkout_Date,
      property_id
    };
    //  console.log(packageForm);
// console.log("this is finalData", finalData)
    const response = await getPackagesDetailsFormData(packageForm);
    //  console.log(response.data);
    //  console.log("my data");
  };

  return (
    <>
      <div className="packageFormSec text-center">
        <h2 className="packageFormSecTitle text-center">
        Contact us about Specials & Packages
        </h2>
      <p className="packageFormCont">
        Please provide us your contact details and your inquiry below and we
        will get in touch with you to help you arrange any of our Specials,
        Events & Packages.
      </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="col-xs-12 col-lg-12 col-md-12 col-sm-12 packagesContactform p-0">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 packageForm">
              <p className=" packagedetail mt-2 mb-5 mx-2">Contact Information</p>
              <div className="form-group text-left col-lg-12 col-xl-12 col-md-12 col-sm-12">
                {/* <label className="col-form-label">Name:</label> */}{" "}
                <div className="floating-label-group inputDiv PR">
                  <input
                    className="ltr-border-none"
                    type="text"
                    placeholder="First Name *"
                    className={`form-control ltr-none ${
                      errors.firstname && "invalid"
                    }`}
                    {...register("firstname", {
                      required: "Please enter your first name",
                    })}
                    onKeyUp={() => {
                      trigger("firstname");
                    }}
                  />
                  <label className="custLabel">First Name</label>
                  {errors.firstname && (
                    <small className="text-danger">
                      {" "}
                      {errors.firstname.message}{" "}
                    </small>
                  )}{" "}
                </div>
              </div>{" "}
              <div className="form-group text-left col-lg-12 col-xl-12 col-md-12 col-sm-12">
                <div className="floating-label-group inputDiv PR">
                  <input
                    // className="form-control ltr-none bdr-left-rght-radius"
                    type="text"
                    placeholder="Last Name *"
                    className={`form-control  ltr-none ${
                      errors.lastname && "invalid"
                    }`}
                    {...register("lastname", {
                      required: "Please enter your last name",
                    })}
                    onKeyUp={() => {
                      trigger("lastname");
                    }}
                  />
                  <label className="custLabel">Last Name</label>
                  {errors.lastname && (
                    <small className="text-danger">
                      {errors.lastname.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="form-group text-left col-lg-12 col-xl-12 col-md-12 col-sm-12">
                <div className="floating-label-group inputDiv PR">
                  <input
                    placeholder="Phone *"
                    type="text"
                    className={`form-control ltr-none ${
                      errors.phone && "invalid"
                    }`}
                    {...register("phone", {
                      required: "Please enter your phone number",
                      pattern: {
                        value:
                          /^\s*(?:\+?(\d{1,3}))?[-. ]*(\d{3})[-.]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                        message: "Invalid phone number",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("phone");
                    }}
                  />
                  <label className="custLabel">Phone</label>
                  {errors.phone && (
                    <small className="text-danger">
                      {errors.phone.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="form-group text-left col-lg-12 col-xl-12 col-md-12 col-sm-12">
                <div className="floating-label-group inputDiv PR">
                  <input
                    placeholder="Email *"
                    type="email"
                    className={`form-control ltr-none ${
                      errors.email && "invalid"
                    }`}
                    {...register("email", {
                      required: "Please enter your email",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("email");
                    }}
                  />
                  <label className="custLabel">Email</label>
                  {errors.email && (
                    <small className="text-danger">
                      {errors.email.message}
                    </small>
                  )}
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 packageForm">
             <div className=""> <p className="packagedetail mt-2 mb-4 packageSpecial">
                Special, Event or Package Details
              </p>
              {/* <span className="packagedetail">Currency</span> */}
              {/* <div>
              <button
                  type="button"
                  className="btn text-secondary mx-4 mx-md-3 px-2 currencyChang"
                  onClick={currencyModalShow}
                  title="Currency"
                >
                 
                  <img
                    className="mr-1"
                    src={
                      assetsUrl +
                      "/flag/" +
                      props.currencyFlagAbbr.toLowerCase() +
                      ".gif"
                    }
                    alt={props.currencyAbbr + " Flag"}
                  />
                  {props.currencyAbbr}
                </button>
                {currencyModalOpen && (
                  <CurrencyModal
                    onCancel={currencyModalHide}
                    all_country_currency_code={props.all_country_currency_code}
                    setConvertPrice={props.setConvertPrice}
                    setCurrencySign={props.setCurrencySign}
                    setCurrencyAbbr={props.setCurrencyAbbr}
                    setCurrencyFlagAbbr={props.setCurrencyFlagAbbr}
                    currencyAbbr={props.currencyAbbr}
                  />
                )}
                {currencyModalOpen && <Backdrop onCancel={currencyModalHide} />}
              </div> */}
              </div>
              <div className="mt-3 packageCalendar">
              <CustomCalendar setDate={setCheckin_Date} setEndDate={setCheckout_Date} />
              <div className="form-group text-left col-lg-12 col-xl-12 col-md-12 col-sm-12">
                <div className="floating-label-group inputDiv PR">
                  <label className="mb-0">Package Amount</label>
                  <input
                    className="form-control checkincustometime "
                    value={`${"$" + props.price}`}
                    readOnly="readonly"
                    name="room_check_out"
                    id="eventEndDate"
                  />
                </div>
              </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 commentDiv bggrey bggrey1">
            <p className="packagedetail mt-2 mb-4">Comments or Questions</p>
            <div className="form-group text-left col-lg-12 col-xl-12 col-md-12 col-sm-12 packageForm packageAnyQues">
              <div className="floating-label-group inputDiv inputDiv2 PR">
                <textarea
                  {...register("comments", {})}
                  onKeyUp={() => {
                    trigger("comments");
                  }}
                  type="text"
                  placeholder="Please let us know if you have any comments, questions or special requests"
                  maxlength="2000"
                  onChange={(e) =>
                    setCount1(
                      2000 - e.target.value.length <= 0 ? (
                        <span className="text-danger">
                          You have reached the character limit for this field. 0
                        </span>
                      ) : (
                        2000 - e.target.value.length
                      )
                    )
                  }
                  className={`form-control ltr-none bdr-left-rght-radius mobCommentView  ${
                    errors.comments && "invalid"
                  }`}
                ></textarea>
                <label className="custLabel cust2">
                  Please let us know if you have any comments, questions or
                  special requests
                </label>
                {errors.comments && (
                  <small className="text-danger">
                    {errors.comments.message}
                  </small>
                )}
                <span className="char-count">{count1} Characters left</span>
              </div>
              <div
                id="recaptcha"
                className="d-flex text-center mt-5 g-recaptcha justify-content-center"
              >
                <div>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={props.noCaptchaSiteKey}
                    sitekey={newcaptchakey}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="text-center pb-3 pt-3 mb-2">
                <button
                  type="submit"
                  className="home-readmore-btn welcome-btn btn-style mt-3"
                  title="Submit"
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
