import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  getSeoDescriptionData,
  getPropPersonalInfoReqData,
} from "../../../DataLayer/datalayerUtilities";
import "../../InnerPages/personalDataRequest/index.scss";
//common banner component
import BannerContainer from "../BannerComponent/BannerContainer";
import { useRecoilValue } from "recoil";
import {
  propertyDataSelector,
  seoThemeDetails,
} from "../../../Recoil/themeModule";
import { motion } from "framer-motion";
import RequestDataForm from "../../InnerPages/personalDataRequest/requestDataForm";
import ReCAPTCHA from "react-google-recaptcha";
import { Input } from "antd";



const PersonalDataRequestComponent = (props) => {
  const [currentValue, setCurrentValue] = useState("");
  const [showGoTop, setShowGoTop] = useState(false)
  const [radioValue, setRadioValue] = useState("");
  const { personalinforequestform: seoId } = useRecoilValue(seoThemeDetails);
  const [seoData, setPropertySeodata] = useState([]);
  const [captcha, setCaptchaData] = useState([]);
  const recaptchaRef = React.createRef();

  useEffect(() => {
    fetchSeoProperties();
  }, []);

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData(seoId);
    setPropertySeodata(response.data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
    trigger,
  } = useForm();


  const handleVisibleButton = () => {
    setShowGoTop(window.pageYOffset > 50)
  }

  const handleScrollUp = (e) => {
    e.preventDefault();
    window.scrollTo({ left: 0, top: 250, behavior: 'smooth' })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleVisibleButton)
  }, [])


  // handleChange
  const handleChange = (data) => {
    let { name, value } = data.target;

    setCurrentValue(name);
    var elem = document.getElementById("currentValue");
    if (typeof elem !== "undefined" && elem !== null) {
      document.getElementById("currentValue").value = "";
    } 
  };




  function onChange(value) {
    setCaptchaData(value);
  }

  const onSubmit = async (data) => {
    const { email, property_name } = props.propertyData;
    const finalData = {
      ...data,
      email,
      property_name,
      // pinfo: Input,
      captcha,
      radioValue,
      currentValue
    };




    window.location.reload(false);

    console.log("this is final data", finalData );
    const response = await getPropPersonalInfoReqData(finalData);
    // console.log(response.data);
    setRadioValue("")
    setCurrentValue("")
  
    if (response.data === "success") {
      document.getElementById("success-msg").innerHTML =
        "Your message has been sent successfully! A member of our customer service team will contact you shortly.";
    }
    //  else if (response.data === "Erremail") {
    //   document.getElementById("success-msg").innerHTML =
    //     "";
    // }
    else if (response.data === "Invalid") {
      document.getElementById("success-msg").innerHTML =
        "Sorry, you have entered an invalid email address.";
    } 
    
    else {
      document.getElementById("success-msg").innerHTML =
        "Captcha ERROR";
  };
  
  
  };







  return (
    <div className="personal">
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.4 }}
      >
        <BannerContainer seoData={seoData} />
      </motion.div>
      
      <div className="container">
        <p className="personal-content  fs-16 px-1">
          We respect your personal data and go to great lengths to protect your
          privacy. As part of this process, we want to give you control over
          personal data collected by us. If you would like to view, edit,
          delete, or move your personal data from our platform, please provide
          your instructions below. The website administrator or data protection
          officer will be notified immediately and will have 30 days to respond
          to your data request.
        </p>
        <div className="container shadowcustom h-100 my-4 mt-5">
          <div className="row h-100 justify-content-center align-items-center vh-50">
            <form onSubmit={handleSubmit(onSubmit)} className="px-3 px-md-0">
              <div className="col-12 px-0">
                <label className="font-weight-bold mt-4 fs-16">
                  Website <span className="text-danger">*</span>
                </label>

                <input
                  readonly="readonly"
                  value="https://www.yosemitewestgate.com/"
                  placeholder="https://www.yosemitewestgate.com/"
                  // type="text"
                  className={`form-control ltr-none bdr-left-rght-radius ${
                    errors.website && "invalid"
                  }`}
                  {...register("website", {
                    // required: 'Website is Required',
                    pattern: {
                      value: "https://www.montereystagecoachlodge.com/",
                      message: "Invalid Website",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("website");
                  }}
                />
                {errors.website && (
                  <small className="text-danger">
                    {errors.website.message}
                  </small>
                )}

                <label className="pt-4 font-weight-bold fs-16">
                  What email do you use for the above website?
                  <span className="text-danger mx-0 pl-2">*</span>
                </label>

                <input
               
                  type="email"
                  className={`form-control ltr-none bdr-left-rght-radius ${
                    errors.email1 && "invalid"
                  }`}
                  {...register("email1", {
                    required: "Please enter your email.",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Sorry, you have entered an invalid email address.",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("email1");
                  }}
                />
                 <label className="custLabel">First Name</label>
                {errors.email1 && (
                  <small className="text-danger">{errors.email1.message}</small>
                )}
              </div>
              <label className="font-weight-bold mt-4 fs-16">
                I would to perform the following action on the personal
                information collected from me:{" "}
                <span className="text-danger">*</span>
              </label>{" "}
              <br></br>
              <div className="col-12 mt-2 requestformdata px-0 ddd">
                <RequestDataForm setCurrentValue={setCurrentValue} setRadioValue={setRadioValue}  />
              </div>
              <div className="clearfix mt-3"> </div>
              <div id="recaptcha" className="d-flex mt-4 g-recaptcha mt-5">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LdX5ggTAAAAAMEZInpJvEYoocLlK61Fg5qcdPZs"
                  onChange={onChange}
                />
              </div>
              <div className="text-center pb-3 pt-3 mb-4" onClick={handleScrollUp}>
                <button
                  type="submit"
                  className="home-readmore-btn welcome-btn btn-style mt-3 px-4"
                  title="Submit"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
          <div className="mb-5"></div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDataRequestComponent;
