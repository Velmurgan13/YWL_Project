import React from "react";
import { FaYelp, FaTripadvisor, FaFacebookF } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
//import { getThemeProperty } from '../../../DataLayer/axiosMethodCalls'
import "./index.css";
import { useRecoilValue } from "recoil";
import { propertyDataSelector } from "../../../Recoil/themeModule";
import EmailIcon from '../../CommonAssets/Icons/email.svg'
import LocationIcon from '../../CommonAssets/Icons/location.svg'
import PhoneIcon from '../../CommonAssets/Icons/phone.svg'

const ConnectUs = (props) => {
  const propertyData = useRecoilValue(propertyDataSelector);


  // console.log(props.propertyData);
  return (
    <div>
      <div className="connect custom-shadow rounded p-4 my-3 my-md-4">
        {/* <div class="d-flex bd-highlight px-3 py-3 connect-us-bg left-radius">
                    <h2 class="p-2 flex-grow-1 text-white mb-0">CONNECT WITH US</h2>
                    <div class="p-2"><TiSocialFacebook size="35" className="mr-3 mr-md-5" /> <FaYelp size="35" className="mr-3 mr-md-5" /> <SiTripadvisor size="35" className="mr-3 mr-md-5" /> </div>
                </div> */}
        <div className="row connect-us-bg left-radius cust-contact-title">
          <div className="col-12 col-md-8 col-xl-9 col-lg-9 p-0">
            <div className=" mb-0">
              <p className="text-white mb-0 connect-title">CONNECT WITH US</p>
            </div>
          </div>
          <div className="col-12 col-md-4 col-lg-3 col-xl-3 pl-md-0 pl-xl-5 pl-5 py-1 py-md-0 pr-0 contactSocialIconDiv">
            <div className="text-white mb-0">
              <ul className="social-networks list-unstyled d-flex">
                <li className="">
                  <a target="_blank"
                  href="https://www.facebook.com/yosemitewestgate"
                    className="icon-facebook text-white c-pointer"
                    title="Facebook"
                  >
                    <FaFacebookF size="45" className="footSocialIcons" />{" "}
                  </a>
                </li>
                <li className="">
                  <a href="https://www.yelp.com/biz/yosemite-westgate-lodge-groveland" className="icon-yelp text-white c-pointer" title="Yelp">
                    <FaYelp size="45" className="footSocialIcons" />{" "}
                  </a>
                </li>
                <li className="">
                  <a
                  href="https://www.tripadvisor.com/Hotel_Review-g32460-d77135-Reviews-Yosemite_Westgate_Lodge-Groveland_California.html"
                    className="icon-tripAdvisor text-white c-pointer"
                    title="TripAdvisor"
                  >
                    <FaTripadvisor size="45" className="footSocialIcons" />{" "}
                  </a>
                </li>
              </ul>

              {/* < size="38" className="c-pointer mr-3 mr-md-4" />{" "}
              < size="38" className=" c-pointer mr-3 mr-md-4" /> */}
            </div>
          </div>
        </div>





        <div className="py-md-4 pt-4 pb-0">
          <div className="row">
            <div className="col-12 d-flex my-2">
              <div className="col-2 pd-xs-0 i_set">
                {/* <GoLocation
                  size="50"
                  className="ml-md-3 ml-xl-5 ml-lg-5 ml-0 p-2 p-md-0"
                /> */}


                <div className="hvr-float-shadow i_set" title="Address">
                  <img src={LocationIcon} className="ml-md-3 ml-xl-5 ml-lg-5 ml-0 p-2 p-md-0" />
                </div>
              </div>
              <div className="col-10 connect-fs-18 align-self-center px-4 px-md-3 px-lg-0 px-lg-0">
                <span className="pl-md-0 pl-xl-0 pl-lg-0 ">
                  {" "}
                  {propertyData.property_name}{" "}
                </span>
                {propertyData.street_address},{propertyData.city},
                {props.propertyData.state},{props.propertyData.zip_code},
                {props.propertyData.country}
              </div>
            </div>
            <div className="col-12 d-flex my-2">
              <div className="col-2 mt-2 pd-xs-0">
                {/* <FiPhoneCall
                  size="50"
                  className="ml-md-3 ml-xl-5 ml-lg-5 ml-0 p-2 p-md-0"
                /> */}
                <div className="hvr-float-shadow i_set mt-1" title="Phone">
                  <img src={PhoneIcon} className="ml-md-3 ml-xl-5 ml-lg-5 ml-0 p-2 p-md-0" />
                </div>
              </div>
              <div className="col-10 connect-fs-18 align-self-center px-4 px-md-3 px-lg-0 px-lg-0 d-xs-flex">
                <span className="col-md-4 col-xl-3 col-lg-3 col-12 px-0 py-0 ml-0 ml-md-0">
                  <strong className="cust-address-title ml-0 ml-md-0 ml-lg-0 ml-xl-0 ml-sm-0 c-pointer">
                    Tel
                  </strong>
                  :{" "}
                  <a
                    className="text-dark c-pointer"
                    href={`tel:${propertyData &&
                      propertyData.primary_phone_no &&
                      propertyData.primary_phone_no.split("/")[1]
                      }`}
                  >
                    {propertyData &&
                      propertyData.primary_phone_no &&
                      propertyData.primary_phone_no.split("/")[1]}
                  </a>
                </span>
                <span className="col-md-4 col-xl-3 col-lg-3 col-12 px-0 py-0">
                  {/* <strong className="cust-address-title">Reservations</strong>:{" "} */}
                  {/* propertyData && propertyData.primary_phone_no && propertyData.primary_phone_no.split('/')[1] */}
                  <span className="ml-3 mt-2 ml-xs-0">
                    <strong className="cust-address-title ">Fax</strong>:{" "}

                      <a className="text-dark"  href={`tel:${propertyData &&
                      propertyData.primary_phone_no &&
                      propertyData.facsimile_phone_no.split("/")[1]
                      }`}>{propertyData &&
                        propertyData.primary_phone_no &&
                        propertyData.facsimile_phone_no.split("/")[1]}</a>

                    
                  </span>
                </span>
              </div>
            </div>
            <div className="col-12 d-flex my-2">
              <div className="col-2 pd-xs-0 i_set my-auto">
                <div className="hvr-float-shadow i_set" title="Email">
                  <img src={EmailIcon} className="ml-md-3 ml-xl-5 ml-lg-5 ml-0 p-2 p-md-0" />
                </div>
              </div>
              <div className="col-10 connect-fs-18 align-self-center px-4 px-md-3 px-lg-0 px-lg-0">
                <div className="my-2">
                  <strong className="cust-address-title ml-0 ml-md-0 ml-lg-0 ml-xl-0 ml-sm-0 c-pointer">
                    Property Email
                  </strong>
                  :{" "}
                  <a
                    href={`mailto: ${props.propertyData.email}`}
                    className="contactEmail ml-md-2 ml-0"
                  >
                    {props.propertyData.email}
                  </a>
                </div>
                <div className="my-2">
                  <strong className="cust-address-title ml-0 ml-md-0 ml-lg-0 ml-xl-0 ml-sm-0 c-pointer">General Manager Email</strong>:{" "}
                  <a  href={`mailto: ${props.propertyData.general_manager_email}`} className="contactEmail ml-md-2 ml-0 c-pointer">  {props.propertyData.general_manager_email}</a>
                </div>
                <div className="my-2">
                  <strong className="cust-address-title ml-0 ml-md-0 ml-lg-0 ml-xl-0 ml-sm-0 c-pointer">Sales Email</strong>: <a   href={`mailto: ${props.propertyData.sales_email}`} className="c-pointer contactEmail ml-2">{props.propertyData.sales_email}</a>
                </div>
                <div className="my-2">
                  <strong className="cust-address-title ml-0 ml-md-0 ml-lg-0 ml-xl-0 ml-sm-0 c-pointer">Group Booking Email</strong>:{" "}
                  <a href={`mailto: ${props.propertyData.groups_email}`}  className="contactEmail ml-md-2 ml-0 c-pointer">  {props.propertyData.groups_email}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConnectUs;
