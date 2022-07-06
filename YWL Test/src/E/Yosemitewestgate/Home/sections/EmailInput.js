import React, { useState } from "react";
import "./Email.scss";
import { useForm } from "react-hook-form";
import { FormGroup } from "reactstrap";
import { getSubscribeEmailData } from "../../../../DataLayer/datalayerUtilities";
import { useRecoilValue } from "recoil";
import ReCAPTCHA from "react-google-recaptcha";

import { propertyDataSelector } from "../../../../Recoil/themeModule";

const EmailInput = (props) => {
  // console.log(props.propertyData)
  const propertyData = useRecoilValue(propertyDataSelector);
  // console.log(propertyData);

  const [captcha, setCaptchaData] = useState([]);

  const recaptchaRef = React.createRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  function onChange(value) {
    setCaptchaData(value);
  }

  const onSubmit = async (data) => {
    // console.log(data);
    //var image_url	= "https://www.yosemitewestgate.com/assets/themes/yosemite/img/";
    //const logo_path = image_url;
    const logo_path = "";
    const subscriber_name = "";
    var dateWhen = Date().toLocaleString();

    const { email, property_name } = propertyData;
    // const { property_name } = props.propertyData

    const finalData = {
      ...data,
      logo_path,
      subscriber_name,
      dateWhen,
      property_name,
      email,
      captcha,
    };

    // console.log(finalData);
    const response = await getSubscribeEmailData(finalData);

    // console.log("Thhis is response ", response);

    if (response.data === "success") {
      document.getElementById("success-msg").innerHTML =
        "Thank You! You have successfully subscribed to the mailing list.";
    } else if (response.data === "Erremail") {
      document.getElementById("success-msg").innerHTML =
        "Sorry, your email address is already subscribed. Please enter another email address.";
    } else if (response.data === "Invalid") {
      document.getElementById("success-msg").innerHTML =
        "Sorry, you have entered an invalid email address.";
    } else {
      document.getElementById("success-msg").innerHTML =
        "We are sorry, we have experienced a technical issue. Please try again after some time.";
    }

    // reset();
  };

  return (
    <section className="container px-0 mobile_view Hm-Email">
      <div className="emailHeading">
        {/* <div className="emailHeading text-center text-uppercase mb-3 pt-3">
            LETS STAY CONNECTED
          </div> */}
        <h4 className="wordCarousel">
          <span>LETS </span>
          <div className="emailContent">
            <ul className="flip3">
              <li className="color1">Stay Connected</li>
              <li className="color2">Grow Together</li>
              <li className="color3">Build Companionship</li>
            </ul>
          </div>
        </h4>
      </div>
      <div id="success-msg" className="msg-display mx-3 my-3"></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="col-12 mb-4 d-flex ipad-email">
          <FormGroup className="murgan">
            <input
              placeholder="Enter Your Mail Address"
              type="email"
              className={`form-controlled ltr-none ${
                errors.subscriber_email && "invalid"
              }`}
              {...register("subscriber_email", {
                required: "Enter your Email address.",
              })}
              onKeyUp={() => {
                trigger("subscriber_email");
              }}
            />
            {errors.subscriber_email && (
              <small className="text-danger">
                {errors.subscriber_email.message}
              </small>
            )}

            {/* <div id="recaptcha" className="d-flex mt-5 g-recaptcha">
              <div>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  size="invisible"
                  sitekey="6LdtqnsUAAAAAEpaIIGPe80iNI3Xt12-CqeIIidV"
                  onChange={onChange}
                />
              </div>
            </div> */}
          </FormGroup>
          <button className="btn-subscribed" type="submit">
            <svg
              className="emailArrow"
              xmlns="http:www.w3.org/2000/svg"
              width="85.468"
              height="35.337"
              viewBox="0 0 85.468 35.337"
            >
              <g
                id="Group_53"
                data-name="Group 53"
                transform="translate(0 0.035)"
              >
                <line
                  id="Line_7"
                  data-name="Line 7"
                  x2="85.468"
                  transform="translate(0 17.634)"
                  fill="none"
                  stroke="#1d7c4b"
                  strokeWidth="1"
                />
                <path
                  id="Path_736"
                  data-name="Path 736"
                  d="M2808,4931.738s1.23,17.634,17.634,17.634"
                  transform="translate(-2740.167 -4931.738)"
                  fill="none"
                  stroke="#1d7c4b"
                  strokeWidth="1"
                />
                <path
                  id="Path_737"
                  data-name="Path 737"
                  d="M2808,4949.372s1.23-17.634,17.634-17.634"
                  transform="translate(-2740.167 -4914.104)"
                  fill="none"
                  stroke="#1d7c4b"
                  strokeWidth="1"
                />
              </g>
            </svg>
          </button>
        </div>
      </form>
    </section>
  );
};

export default EmailInput;
