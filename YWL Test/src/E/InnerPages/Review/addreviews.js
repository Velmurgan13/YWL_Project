


import React, { useEffect, useState } from "react";
import {
  getSeoDescriptionData,
  getPropAddReviewData,
  getPropCountryviewData,
} from "../../../DataLayer/datalayerUtilities";
import { useForm } from "react-hook-form";
import "./addreviews.scss";
import BannerContainer from "../BannerComponent/BannerContainer";
import {
  seoThemeDetails,
  propertyDataSelector,
} from "../../../Recoil/themeModule";
import { useRecoilValue } from "recoil";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import FileUplaodnDrag from "./fileUploader";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import ReCAPTCHA from "react-google-recaptcha";
import Reviews from "../Review/index";
import EmailId from "../../InnerPages/Review/emaiId";
import { borderRadius } from "@mui/system";
import LikeOrDislike from "./likeDlike";

const ReviewDetailsPage = (props) => {
  const { innsights: seoId } = useRecoilValue(seoThemeDetails);
  const [seoData, setPropertySeodata] = useState([]);
  const [guestroom, setguestroom] = useState("5");
  const [cleanliness, setcleanliness] = useState("5");
  const [service, setservice] = useState("5");
  const [value, setvalue] = useState("5");
  const [location, setlocation] = useState("5");
  const [comfort, setcomfort] = useState("5");
  const [addreviewData, setAddReviewData] = useState([]);
  const [counrty, setCounrty] = useState([]);
  const [count1, setCount1] = React.useState(200);
  const [count2, setCount2] = React.useState(2000);
  const [count3, setCount3] = React.useState(2000);
  const [check1, setCheck1] = React.useState();
  const [captcha, setCaptchaData] = useState([]);
  const [isActive, setActive] = useState(false);
  const [isActivee, setActivee] = useState(false);
  const [iselegant, setelegant] = useState(false);
  const [isComfortable, setComfortable] = useState(false);
  const [isCozy, setCozy] = useState(false);
  const [isPlush, setPlush] = useState(false);
  const [isTrendy, setTrendy] = useState(false);
  const [isHiddenGem, setHiddenGem] = useState(false);
  const [isRoomy, setRoomy] = useState(false);
  const [isCharming, setCharming] = useState(false);
  const [isRomantic, setRomantic] = useState(false);
  const [isNoFrills, setNoFrills] = useState(false);
  const [isBeautiful, setBeautiful] = useState(false);
  const [isHotSpot, setHotSpot] = useState(false);
  const [isNoisy, setNoisy] = useState(false);

  const recaptchaRef = React.createRef();
  const Dataa = "";
  useEffect(() => {
    fetchSeoProperties();
    fetchReviewDetailsPageData();
    fetchCounrty();
  }, []);

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData(seoId);
    setPropertySeodata(response.data);
  };

  const fetchReviewDetailsPageData = async () => {
    // console.log(props.placeholder)
    const response = await getPropAddReviewData();
    console.log("hello" , response);
    setAddReviewData(response.countries);
    // console.log(response.countries);
  };

  const fetchCounrty = async () => {
    // console.log(props.placeholder)
    const response = await getPropCountryviewData();
     console.log(response);
    setCounrty(response.countries);
    // console.log(response.countries);
  };

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  // console.log(props.Emailid)

  const onSubmit = async (data) => {
    data["GuestRoom"] = guestroom;
    data["Cleanliness"] = cleanliness;
    data["Service"] = service;
    data["Value"] = value;
    data["Location"] = location;
    data["Comfort"] = comfort;
    data["reviewer_email"] = props.location.state.Emailid;
    data[
      "about_style"
    ] = `${isActive}, ${isActivee}, ${iselegant}, ${isComfortable}, ${isCozy}, ${isPlush}, ${isTrendy}, ${isHiddenGem} , ${isRoomy}, ${isCharming}, ${isRomantic}, ${isNoFrills}, ${isBeautiful}, ${isHotSpot}, ${isNoisy}`;
    // = Dataa.replace('false','')
    // data = {data, "reviewone": guestroom, "cleanliness": cleanliness, "tag" : [isActive, isActivee] }
    const ReviewEmail = { data };
    // console.log(ReviewEmail);
    const response = await getPropAddReviewData(data);
    // console.log(response);
  };

  function onChange(value) {
    setCaptchaData(value);
  }

  const handleSelectTripes = (event) => {
    setguestroom(event.target.value);
  };

  const handleSelectClean = (event) => {
    setcleanliness(event.target.value);
  };

  const handleSelectservice = (event) => {
    setservice(event.target.value);
  };

  const handleSelectvalue = (event) => {
    setvalue(event.target.value);
  };

  const handleSelectlocation = (event) => {
    setlocation(event.target.value);
  };

  const handleSelectcomfort = (event) => {
    setcomfort(event.target.value);
  };

  const Check1 = (event) => {
    setCheck1(event.target.value);
  };

  const toggleClass = (event) => {
    setActive(!isActive && event.target.value);
  };

  const toggleClasss = (event) => {
    setActivee(!isActivee && event.target.value);
  };

  const elegant = (event) => {
    setelegant(!iselegant && event.target.value);
  };

  const Comfortable = (event) => {
    setComfortable(!isComfortable && event.target.value);
  };

  const Cozy = (event) => {
    setCozy(!isCozy && event.target.value);
  };

  const Trendy = (event) => {
    setTrendy(!isTrendy && event.target.value);
  };

  const Plush = (event) => {
    setPlush(!isPlush && event.target.value);
  };

  const HiddenGem = (event) => {
    setHiddenGem(!isHiddenGem && event.target.value);
  };

  const Roomy = (event) => {
    setRoomy(!isRoomy && event.target.value);
  };

  const Charming = (event) => {
    setCharming(!isCharming && event.target.value);
  };

  const Romantic = (event) => {
    setRomantic(!isRomantic && event.target.value);
  };

  const NoFrills = (event) => {
    setNoFrills(!isNoFrills && event.target.value);
  };

  const Beautiful = (event) => {
    setBeautiful(!isBeautiful && event.target.value);
  };

  const HotSpot = (event) => {
    setHotSpot(!isHotSpot && event.target.value);
  };

  const Noisy = (event) => {
    setNoisy(!isNoisy && event.target.value);
  };

  // const Dtt = props.location.pathname;
  // console.log(props.location.state);

  // const {email} =
  //   (props.location && props.location.state) || {};
  //   console.log(email)

  return (
    <div className="text-center mb-5 reviewStyles">
      <BannerContainer seoData={seoData} />
      <div className="container AddReviews">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center mb-5 hotelStar">
            <div className="section-title MB20 MT20 pb-0 mt-0 pt-0">Rate this hotel</div>
            <div className="add-review_bar-1"></div>
          </div>

          <div className="bg-white shadow ">
            <div className="col-lg-12 row col-md-12 col-sm-12 d-grid pt-4 pb-2">
              <div className="col-lg-4 col-md-4 align-items-center row">
                <div className="text-left">Guest Room :</div>

                <Stack spacing={1}>
                  <Rating
                    name="size-large"
                    defaultValue={guestroom}
                    onClick={handleSelectTripes}
                  />
                </Stack>
              </div>

              <div className="col-lg-4 col-md-4 align-items-center row">
                <div className="text-left">Cleanliness :</div>

                <Stack spacing={1}>
                  <Rating
                    name="size-large"
                    defaultValue={cleanliness}
                    onClick={handleSelectClean}
                  />
                </Stack>
              </div>

              <div className="col-lg-4 col-md-4 align-items-center row">
                <div className="text-left">Service :</div>

                <Stack spacing={1}>
                  <Rating
                    name="size-large"
                    defaultValue={service}
                    onClick={handleSelectservice}
                  />
                </Stack>
              </div>

              <div className="col-lg-4 col-md-4 align-items-center row">
                <div className="text-left">Value :</div>

                <Stack spacing={1}>
                  <Rating
                    name="size-large"
                    defaultValue={value}
                    onClick={handleSelectvalue}
                  />
                </Stack>
              </div>

              <div className="col-lg-4 col-md-4 align-items-center row">
                <div className="text-left">Location :</div>

                <Stack spacing={1}>
                  <Rating
                    name="size-large"
                    defaultValue={location}
                    onClick={handleSelectlocation}
                  />
                </Stack>
              </div>

              <div className="col-lg-4 col-md-4 align-items-center row">
                <div className="text-left">Comfort :</div>

                <Stack spacing={1}>
                  <Rating
                    name="size-large"
                    defaultValue={comfort}
                    onClick={handleSelectcomfort}
                  />
                </Stack>
              </div>
            </div>
          </div>

          <div className="text-center my-5 writeReview">
            <div className="section-title MB20 MT20  pb-0 ">WRITE YOUR REVIEW</div>
            <div className="add-review_bar-2"></div>
          </div>

          <div className="col-lg-12 row shadow form-data  pt-3 pb-1 px-4">
            <div className="col-lg-6 text-left reviewInput">
              <h3 className="lnf-title lnfD1">
                Date you Travelled <span class="red">*</span>
              </h3>
              <input
                className="ltr-border-none ltr-none"
                type="date"
                placeholder="Select Date"
                className={`form-control ltr-none ${errors.travelled_date && "invalid"
                  }`}
                {...register("travelled_date", {
                  required: "Date is Required",
                })}
              />
              {errors.travelled_date && (
                <small className="text-validate-color">
                  {errors.travelled_date.message}
                </small>
              )}
            </div>

            <div className="col-lg-6 text-left reviewInput">
              <h3 className="lnf-title lnfD1">
                Select Country <span class="red">*</span>
              </h3>
              <select
                {...register("country", { required: "Country is Required" })}
                className={`form-control ltr-none ${errors.item && "invalid"}`}
              >
                {Object.values(counrty).map((item, keys) => {
                  return <option value={item}>{item}</option>;
                })}
              </select>
              {errors.country && (
                <small className="text-validate-color">{errors.country.message}</small>
              )}
            </div>

            <div className="col-lg-6 text-left reviewInput">
              <h3 className="lnf-title lnfD1">
                Travelled With <span class="red">*</span>
              </h3>
              <select
                {...register("travelled_with", { required: "Please select who you traveled with." })}
                className={`form-control ltr-none ${errors.travelled_with && "invalid"}`}
              >
                <option value="">Select</option>
                <option value="Business Colleagues">Business Colleagues</option>
                <option value="Couples">Couples</option>
                <option value="Solo Travelers">Solo Travelers</option>
                <option value="Young Children">Young Children</option>
                <option value="Families">Families</option>
                <option value="Get together">Get together</option>
                <option value="Groups of Friends">Groups of Friends</option>
                <option value="Family with Teenagers">
                  Family with Teenagers
                </option>
              </select>
              {errors.travelled_with && (
                <small className="text-validate-color">{errors.travelled_with.message}</small>
              )}
            </div>

            {/* <div className="col-lg-6 text-left">
              <h3 className="lnf-title lnfD1">
                Select Country <span class="red">*</span>
              </h3>
              <select
                {...register("country", { required: "Country is Required" })}
                className={`form-control ltr-none ${errors.item && "invalid"}`}
              >
                {Object.values(counrty).map((item, keys) => {
                  return <option value={item}>{item}</option>;
                })}
              </select>
              {errors.country && (
                <small className="text-validate-color">{errors.country.message}</small>
              )}
            </div> */}



            <div className="col-lg-6 text-left">
              <h3 className="lnf-title lnfD1">
                Age Group <span class="red">*</span>
              </h3>
              <select
                {...register("age_group", { required: "Please select the age group." })}
                className={`form-control ltr-none ${errors.age_group && "invalid"}`}
              >
                <option value="">Select</option>
                <option value="0-5">0-5</option>
                <option value="5-15">5-15</option>
                <option value="15-25">15-25</option>
                <option value="25-35">25-35</option>
                <option value="35-45">35-45</option>
                <option value="45-55">45-55</option>
                <option value="55-65">55-65</option>
                <option value="65+">65+</option>
              </select>
              {errors.age_group && (
                <small className="text-validate-color">{errors.age_group.message}</small>
              )}
            </div>

            {/* <div className="col-lg-6 text-left">
              <h3 className="lnf-title lnfD1">
                Age Group <span class="red">*</span>
              </h3>
              <select
                {...register("age_group")}
                className={`form-control ltr-none ${errors.item && "invalid"}`}
              >
                <option value="">Select</option>
                <option value="0-5">0-5</option>
                <option value="5-15">5-15</option>
                <option value="15-25">15-25</option>
                <option value="25-35">25-35</option>
                <option value="35-45">35-45</option>
                <option value="45-55">45-55</option>
                <option value="55-65">55-65</option>
                <option value="65+">65+</option>
              </select>
              {errors.age_group && (
                <small className="text-validate-color">{errors.age_group.message}</small>
              )}
            </div> */}

            <div className="col-lg-6 inputAni text-left">
              <input
                type="text"
                placeholder="First Name"
                className={`form-control ltr-none ltr-border-none ${errors.firstname && "invalid"
                  }`}
                {...register("first_name", {
                  required: "Firstname is Required",
                })}
                onKeyUp={() => {
                  trigger("first_name");
                }}
              />
              <label className="custLabel ml-3 mb-0">
                First Name <span class="red">*</span>
              </label>
              {errors.firstname && (
                <small className="text-validate-color">
                  {errors.firstname.message}
                </small>
              )}
            </div>
            <div className="col-lg-6 inputAni text-left">
              <input
                type="text"
                placeholder="Last Name"
                className={`form-control ltr-none ltr-border-none ${errors.lastname && "invalid"
                  }`}
                {...register("last_name", {
                  required: "Lastname is Required",
                })}
                onKeyUp={() => {
                  trigger("last_name");
                }}
              />
              <label className="custLabel ml-3 mb-0">
                Last Name <span class="red">*</span>
              </label>
              {errors.lastname && (
                <small className="text-validate-color">{errors.lastname.message}</small>
              )}
            </div>

            {/* <div className="col-lg-12">
              <div className="lnf-form">
                <div className="px-md-3 px-2 inputAni text-left">
                  <textarea
                    {...register("review_title", {
                      required: "titel is Required",
                    })}
                    className="ltr-border-none"
                    type="text"
                    maxlength="200"
                    onChange={(e) =>
                      setCount1(
                        200 - e.target.value.length <= 0 ? (
                          <span>
                            <span className="text-validate-color">
                              You have reached the character limit for this
                              field.
                            </span>
                            <span className="text-black"> 0</span>
                          </span>
                        ) : (
                          200 - e.target.value.length
                        )
                      )
                    }
                    placeholder="Title Your Review"
                    className={`form-control ltr-none ${
                      errors.review_title && "invalid"
                    }`}
                    onKeyUp={() => {
                      trigger("review_title");
                    }}
                  />
                  <label className="custLabel mb-2 mb-0">
                    Title Your Review <span class="red">*</span>
                  </label>
                  {errors.last_seen && (
                    <small className="text-validate-color">
                      {errors.review_title.message}
                    </small>
                  )}
                  {count1 >= 0 ? (
                    <span className="char-count">{count1} Characters left</span>
                  ) : (
                    <span className="text-validate-color">
                      You have reached the character limit for this field.
                    </span>
                  )}
                </div>
              </div>
            </div> */}



            <div className="col-lg-12 inputAni text-left writeDesc">
              <div className="lnf-form ">
                <div className="px-md-3 px-2 my-1 inputAni writeDesc1">
                  <textarea
                    placeholder="Title Your Review *"
                    maxlength="150"
                    type="text"
                    className={`form-control ltr-none bdr-left-rght-radius ${errors.review_title && "invalid"
                      }`}
                    {...register("review_title", {
                      required: "Please enter a title for this review.",
                    })}
                    onKeyUp={(e) => {
                      trigger("review_title");
                      setCount1(
                        150 - e.target.value.length <= 0 ? (
                          <span className="text-validate-color">
                            You have reached the character limit for this
                            field. 0
                          </span>
                        ) : (
                          150 - e.target.value.length
                        )
                      )
                    }}
                  ></textarea>
                  <label className="custLabel">Title Your Review *</label>
                </div>
                {errors.review_title && (
                  <small className="text-validate-color ml-3">
                    {errors.review_title.message}
                  </small>
                )}
                <span className="char-count float-right mt-1">
                  {count1} Characters left
                </span>
              </div>
            </div>

            {/* <div className="col-lg-12">
              <div className="lnf-form">
                <div className="px-md-3 px-2  inputAni text-left">
                  <textarea
                    {...register("special_tips")}
                    className="ltr-border-none"
                    type="text"
                    maxlength="2000"
                    onChange={(e) =>
                      setCount2(
                        2000 - e.target.value.length <= 0 ? (
                          <span className="text-validate-color">
                            You have reached the character limit for this field.
                            0
                          </span>
                        ) : (
                          2000 - e.target.value.length
                        )
                      )
                    }
                    placeholder="Any Special Tips"
                    className={`form-control ltr-none mt-2 ${
                      errors.title && "invalid"
                    }`}
                    onKeyUp={() => {
                      trigger("special_tips");
                    }}
                  />
                  <label className="custLabel mb-2 mb-0">
                    Any Special Tips
                  </label>
                  {errors.special_tips && (
                    <small className="text-validate-color">
                      {errors.special_tips.message}
                    </small>
                  )}
                  {count2 >= 0 ? (
                    <span className="char-count">{count2} Characters left</span>
                  ) : (
                    <span className="text-validate-color">
                      You have reached the character limit for this field.
                    </span>
                  )}
                </div>
              </div>
            </div> */}



            <div className="col-lg-12 inputAni text-left writeDesc">
              <div className="lnf-form ">
                <div className="px-md-3 px-2 my-1 inputAni writeDesc1">
                  <textarea
                    placeholder="Any Special Tips "
                    maxlength="2000"
                    type="text"
                    className={`form-control ltr-none bdr-left-rght-radius ${errors.special_tips && "invalid"
                      }`}
                    // {...register("special_tips", {
                    //   required: "special_tips is Required",
                    // })}
                    onKeyUp={(e) => {
                      trigger("special_tips");
                      setCount2(
                        2000 - e.target.value.length <= 0 ? (
                          <span className="text-validate-color">
                            You have reached the character limit for this
                            field. 0
                          </span>
                        ) : (
                          2000 - e.target.value.length
                        )
                      )
                    }}
                  ></textarea>
                  <label className="custLabel">Any Special Tips
                  </label>
                </div>
                {errors.special_tips && (
                  <small className="text-validate-color">
                    {errors.special_tips.message}
                  </small>
                )}
                <span className="char-count float-right mt-1">
                  {count2} Characters left
                </span>
              </div>
            </div>

            <div className="col-lg-12 inputAni text-left writeDesc">
              <div className="lnf-form ">
                <div className="px-md-3 px-2 my-1 inputAni writeDesc1">
                  <textarea
                    placeholder="Your Review"
                    maxlength="2000"
                    type="text"
                    className={`form-control ltr-none bdr-left-rght-radius ${errors.your_review && "invalid"
                      }`}
                    {...register("your_review", {
                      required: "Please enter your hotel review.",
                    })}
                    onKeyUp={(e) => {
                      trigger("your_review");
                      setCount3(
                        2000 - e.target.value.length <= 0 ? (
                          <span className="text-validate-color">
                            You have reached the character limit for this
                            field. 0
                          </span>
                        ) : (
                          2000 - e.target.value.length
                        )
                      )
                    }}
                  ></textarea>
                  <label className="custLabel">Your Review <span class="red">*</span></label>
                </div>
                {errors.your_review && (
                  <small className="text-validate-color ml-3">
                    {errors.your_review.message}
                  </small>
                )}
                <span className="char-count float-right mt-1">
                  {count3} Characters left
                </span>
              </div>
            </div>

            <div className="col-lg-6 text-left">
              <h3 className="lnf-title lnfD1 recom">
                Would you recommend this hotel to a friend:
              </h3>
              <div className="thumb">
                <LikeOrDislike />
              </div>
            </div>

          


            <div className="col-lg-6 text-left">
              <h3 className="lnf-title lnfD1">
                Recommended For:  <span class="red">*</span>
              </h3>

              <select
                {...register("recommended_for", { required: "Please select Recommended For group." })}
                className={`form-control ltr-none selectCountry ${errors.recommended_for && "invalid"}`}
              >
                <option value="">Select</option>
                <option value="None">None</option>
                <option value="Business Trips">Business Trips</option>
                <option value="children">Children</option>
                <option value="Couples">Couples</option>
                <option value="everyone" selected="selected">
                  Everyone
                </option>
                <option value="family">Family</option>
                <option value="solo traveler">Solo Traveler</option>
                <option value="teen">Teens</option>
                <option value="wheelchair">Wheelchair</option>
              </select>

              {errors.recommended_for && (
                <small className="text-validate-color">{errors.recommended_for.message}</small>
              )}
            </div>
          </div>

          <div className="text-center my-5 notForMob">
            <div className="section-title MB20 MT20  pb-0 ">
              TELL OTHER TRAVELERS MORE ABOUT THIS HOTEL
            </div>

            <div className="add-review_bar-3"></div>
          </div>

          <div className="form-group about_h PT10 has-feedback clearfix text-left notForMob">
            <div className="row shadow pt-4 p-3 checkClass">
              <div className="col-lg-2 col-xs-6 col-sm-2  col-md-3">
                {/* <input {...register("tag")} type="checkbox" value="Quiet" name="checkbox-1" /> */}
                <button
                  onClick={toggleClass}
                  className={isActive ? "checkbox-custom-label" : null}
                  Value="Quiet"
                >
                  Quiet{" "}
                </button>
              </div>
              <div className="col-lg-2 col-xs-6 col-sm-2  col-md-3">
                {/* <input {...register("tag")} type="checkbox" value="Incredible Staff" /> */}
                <button
                  onClick={toggleClasss}
                  className={isActivee ? "checkbox-custom-label" : null}
                  value="Incredible Staff"
                >
                  Incredible Staff
                </button>
                {/* <button for="checkbox-1" className="">Incredible Staff</button> */}
              </div>
              <div className="col-lg-2 col-xs-6 col-sm-2  col-md-3">
                {/* <input {...register("tag")} type="checkbox" value="Elegant" className="checkbox-custom" name="checkbox-1" /> */}
                <button
                  value="Elegant"
                  onClick={elegant}
                  className={iselegant ? "checkbox-custom-label" : null}
                >
                  Elegant
                </button>
              </div>

              <div className="col-lg-2 col-xs-6 col-sm-2  col-md-3">
                {/* <input {...register("tag")} type="checkbox" value="Comfortable" className="checkbox-custom" name="checkbox-1" /> */}
                <button
                  onClick={Comfortable}
                  className={isComfortable ? "checkbox-custom-label" : null}
                  value="Comfortable"
                >
                  Comfortable{" "}
                </button>
              </div>
              <div className="col-lg-2 col-xs-6 col-sm-2  col-md-3">
                {/* <input {...register("tag")} type="checkbox" value="Cozy" className="checkbox-custom" name="checkbox-1" /> */}
                <button
                  onClick={Cozy}
                  className={isCozy ? "checkbox-custom-label" : null}
                  value="Cozy"
                >
                  Cozy
                </button>
              </div>
              <div className="col-lg-2 col-xs-6 col-sm-2  col-md-3">
                {/* <input {...register("tag")} type="checkbox" value="Trendy" className="checkbox-custom" name="checkbox-1" /> */}
                <button
                  onClick={Trendy}
                  className={isTrendy ? "checkbox-custom-label" : null}
                  value="Trendy"
                >
                  Trendy
                </button>
              </div>

              <div className="col-lg-2 col-xs-6 col-sm-2  col-md-3">
                {/* <input {...register("tag")} type="checkbox" value="Plush" className="checkbox-custom" name="checkbox-1" /> */}
                <button
                  onClick={Plush}
                  className={isPlush ? "checkbox-custom-label" : null}
                  value="Plush"
                >
                  Plush
                </button>
              </div>
              <div className="col-lg-2 col-xs-6 col-sm-2  col-md-3">
                {/* <input {...register("tag")} type="checkbox" value="Hidden Gem" className="checkbox-custom" name="checkbox-1" /> */}
                <button
                  onClick={HiddenGem}
                  className={isHiddenGem ? "checkbox-custom-label" : null}
                  value="Hidden Gem"
                >
                  Hidden Gem
                </button>
              </div>
              <div className="col-lg-2 col-xs-6 col-sm-2  col-md-3">
                {/* <input {...register("tag")} type="checkbox" value="Roomy" className="checkbox-custom" name="checkbox-1" /> */}
                <button
                  onClick={Roomy}
                  className={isRoomy ? "checkbox-custom-label" : null}
                  value="Roomy"
                >
                  Roomy
                </button>
              </div>

              <div className="col-lg-2 col-xs-6 col-sm-2  col-md-3">
                {/* <input {...register("tag")} type="checkbox" value="Charming" className="checkbox-custom" name="checkbox-1" /> */}
                <button
                  onClick={Charming}
                  className={isCharming ? "checkbox-custom-label" : null}
                  value="Charming"
                >
                  Charming
                </button>
              </div>

              <div className="col-lg-2 col-xs-6 col-sm-2  col-md-3">
                {/* <input {...register("tag")} type="checkbox" value="No Frills" className="checkbox-custom" name="checkbox-1" /> */}
                <button
                  onClick={NoFrills}
                  className={isNoFrills ? "checkbox-custom-label" : null}
                  value="No Frills"
                >
                  No Frills
                </button>
              </div>
              <div className="col-lg-2 col-xs-6 col-sm-2  col-md-3">
                {/* <input {...register("tag")} type="checkbox" value="Beautiful" className="checkbox-custom" name="checkbox-1" /> */}
                <button
                  onClick={Beautiful}
                  className={isBeautiful ? "checkbox-custom-label" : null}
                  value="Noisy"
                >
                  Beautiful
                </button>
              </div>
              <div className="col-lg-2 col-xs-6 col-sm-2  col-md-3">
                {/* <input {...register("tag")} type="checkbox" value="Hot Spot" className="checkbox-custom" name="checkbox-1" /> */}
                <button
                  onClick={HotSpot}
                  className={isHotSpot ? "checkbox-custom-label" : null}
                  value="Hot Spot"
                >
                  Hot Spot
                </button>
              </div>
              <div className="col-lg-2 col-xs-6 col-sm-2  col-md-3">
                {/* <input {...register("tag")} type="checkbox" value="Noisy" className="checkbox-custom" name="checkbox-1" /> */}
                <button
                  onClick={Noisy}
                  className={isNoisy ? "checkbox-custom-label" : null}
                  value="Noisy"
                >
                  Noisy
                </button>
              </div>
            </div>
          </div>

          <div className="text-center my-5 notForMob">
            <div className="section-title MB20 MT20  pb-0 ">TRIP TYPE</div>
            <div className="add-review_bar-4"></div>
          </div>

          <div class="form-group about_h PT20 has-feedback notForMob">
            <div className="row shadow radioClass p-4 radios">
              <div class="col-lg-2 col-xs-12 col-sm-3 ">
                <input {...register("trip_type")} type="radio" value="Luxury" />
                <label>Luxury</label>
              </div>
              <div class="col-lg-2 col-xs-12 col-sm-3 ">
                <input
                  {...register("trip_type")}
                  type="radio"
                  value="Business"
                />
                <label>Business</label>
              </div>
              <div class="col-lg-2 col-xs-12 col-sm-3 ">
                <input
                  {...register("trip_type")}
                  type="radio"
                  value="Leisure"
                />
                <label>Leisure</label>
              </div>
              <div class="col-lg-2 col-xs-12 col-sm-3 ">
                <input
                  {...register("trip_type")}
                  type="radio"
                  value="Romantic"
                />
                <label>Romantic</label>
              </div>
              <div class="col-lg-2 col-xs-12 col-sm-3 ">
                <input {...register("trip_type")} type="radio" value="Family" />
                <label>Family</label>
              </div>
              <div class="col-lg-2 col-xs-12 col-sm-3 ">
                <input
                  {...register("trip_type")}
                  type="radio"
                  value="Wedding"
                />
                <label>Wedding</label>
              </div>

              <div class="clearfix"></div>
              <input type="hidden" id="trip_type" name="trip_type" value="" />
            </div>
          </div>

          <div class="top_color_shipping FBwet mt-5 ">
            <div className="MB20 MT20 uploadImg">Upload Images</div>
            <div class="bar_overview"></div>
          </div>

          <p class="MT10 col-lg-12 FNO">
            Upload high-quality images of the item or equipment. We recommend
            that you upload many photographs with highly descriptive captions so
            you can identify and track the item accurately.
          </p>
          <div className="my-5">
            <FileUplaodnDrag />
          </div>
          <div class="BN PMSmarkdownInn B0 lfimgwdmrgwh pdbmt0 text-left">
            <div class="ML10 F18 text-left img-dimension">
              Image Dimensions &amp; File Types:
            </div>
            <div class="PMSBlueFontBox">
              <ul class="P010">
                <li class="M5 P5 FNO F15">GIF or JPEG only.</li>
                <li class="M5 P5 FNO F15">
                  Minimum image dimensions are 640 pixels X 480 pixels. Maximum
                  image file size of 15 MB is allowed. Larger images will be
                  scaled to fit within recommended dimensions while retaining an
                  appropriate aspect ratio so as not to distort the image.{" "}
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-12 col-sm-12 MB30 text-left iaccept">
            <input type="checkbox" />
            <label class="custom-checkbox FNO ml-3">
              I am the owner of these photos, and my posting them on INNsight
              does not infringe upon the rights of any third party.
              <br /> I accept{" "}
              <a
                href="terms-conditions"
                className="fws"
              >
                INNsight.com's Terms of Use
              </a>
            </label>
          </div>

          <div id="recaptcha" className="d-flex mt-5 g-recaptcha">
            <div>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LdX5ggTAAAAAMEZInpJvEYoocLlK61Fg5qcdPZs"
                onChange={onChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="home-readmore-btn welcome-btn btn-style px-4 mt-5"
            title="Submit Review"
          >
            {" "}
            Submit Review{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewDetailsPage;
