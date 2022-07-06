import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./MainFooter.scss";
import logoone from "../assets/Icons/ywl.webp";
// //icons
import TChoice from "../assets/Icons/tchoice.webp";
import TripAdv from "../assets/Icons/winner_certificates.jpg";
import GoogleTranslate from "../../languageTranslater/googleTranslateElement";
import pdf from "../../CommonAssets/Documents/download_info_sheet.pdf";
//social
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialSkype,
  TiSocialInstagram,
  TiSocialGooglePlus,
} from "react-icons/ti";

import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaSkype,
  FaInstagram,
  FaGooglePlusG,
  FaYelp,
  FaTripadvisor,
  FaFoursquare,
  FaPinterestP,
  FaLinkedinIn,
  FaYahoo,
  FaWheelchair,
} from "react-icons/fa";
import { SiTripadvisor } from "react-icons/si";
import { MdAccessible } from "react-icons/md";
// import { Translator, T, TF, LanguageList, Config } from 'react-translator-component'

const MainFooter = (allpropertydata) => {
  // useEffect(() => {
  //   var myspan = document.getElementById("google_translate_element").innerHTML = "gbshbgsbd";

  // }, []);

  const pathname = useLocation();
  const splitLocation = pathname.pathname.split("/");
  let propData = allpropertydata.propertyData;
  let alttitleImgfoot = `${propData.property_name} - ${propData.street_address}, ${propData.city}, ${propData.state}, ${propData.zip_code}`;

  // H1 Scroll Down Code start
  function h1scroll() {
    if (pathname.pathname.length > 1) {
      if (window.screen.availWidth > 991) {
        setTimeout(() => {
          let info1topoffset = document.querySelector("#info1").offsetTop;
          let checkAvail = document.querySelector("#showMe").clientHeight;
          window.scrollTo({
            top: info1topoffset - (checkAvail + 20),
            behavior: "smooth",
          });
        }, 2500);
      } else {
        setTimeout(() => {
          let info1topoffset = document.querySelector("#info1").offsetTop;
          window.scrollTo({
            top: info1topoffset - 20,
            behavior: "smooth",
          });
        }, 2500);
      }
    }
  }

  useEffect(() => {
    h1scroll();
  }, [pathname.pathname]);

  // H1 Scroll Down Code End
  return (
    <div className="Footer-Style position-relative row mx-0">
      <div className="container">
        <div className="col-12 Footer-logo text-center">
          <Link to="/">
            <img
              src={logoone}
              className="mt-4"
              height="159"
              width="152"
              alt={alttitleImgfoot}
              title={alttitleImgfoot}
              loading="lazy"
            />
            <figcaption className="foot-logo-caption">
              by BLINK HOTELS<sup>TM</sup>
            </figcaption>
          </Link>
        </div>
        <div className="Footer-content row mx-0">
          <div className="row col-6 Footer-mob FooterAllLinks">
            <div className="Footer-links col-6">
              <ul className="list-unstyled">
                {!allpropertydata.overview_status && (
                  <li>
                    <Link to="/overview" title="About us">
                      About us
                    </Link>
                  </li>
                )}

                <li>
                  {" "}
                  <Link to="/six-plus-booking" title="Group RFP">
                    Group RFP
                  </Link>
                </li>

                {/* {!allpropertydata.review_status && (
                  <Link to="/reviews" title="Reviews">
                    <li>Reviews</li>
                  </Link>
                )} */}
                {!allpropertydata.news_status && (
                  <li>
                    {" "}
                    <Link to="/news" title="News">
                      News
                    </Link>
                  </li>
                )}
                {!allpropertydata.job_status && (
                  <li>
                    <Link to="/jobs" title="Jobs">
                      Jobs
                    </Link>
                  </li>
                )}

                {!allpropertydata.faq_status && (
                  <li>
                    <Link to="/faq" title="FAQ">
                      FAQ's
                    </Link>
                  </li>
                )}
                <li>
                  <Link to="/sitemap" title="Sitemap">
                    Sitemap
                  </Link>
                </li>

                <li>
                  <Link to="/directions" title="Directions">
                    Directions
                  </Link>
                </li>
              </ul>
            </div>
            <div className="Footer-links col-6">
              <ul className="list-unstyled">
                  <li><Link to="/privacy-policy" title="Privacy Policy">Privacy Policy
                </Link></li>
                
                  <li><Link to="/terms-conditions" title="Terms and Condition">Terms and Condition
                </Link></li>
                
                {!allpropertydata.cleaning_protocols_status && (
                    <li><Link to="/cleaning-protocols" title="Cleaning Protocol">Cleaning Protocol
                    </Link></li>
                  
                )}
                  <li><Link to="/cookies" title="Cookie Policy">Cookie Policy
                </Link></li>
                
                {!allpropertydata.lost_and_found_status && (
                    <li><Link to="/lost-found" title="Lost And Found">Lost And Found
                    </Link></li>
                  
                )}
                  <li><Link
                  to="/personal-info-request-form"
                  title="Personal Data Request"
                >Personal Data Request
                </Link></li>
                <li>
                <a
                  href={pdf}
                  target="_blank"
                  rel="noreferrer"
                  className="infoSheet"
                >
                  Download Info Sheet
                </a>
                </li>
                
              </ul>
            </div>
          </div>
          <div className="Footer-social col-6 col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <div className="row Footer-social-content">
              <div className="social-icons col-12">
                {propData.facebook && (
                  <a
                    className="social-icon social-icon--facebook"
                    href={propData.facebook}
                    target="_blank"
                  >
                    <FaFacebookF size="50" className="text-center" />
                    <div className="tooltip">Facebook</div>
                  </a>
                )}

                {propData.google_url && (
                  <a
                    className="social-icon social-icon--googleplus"
                    href={propData.google_url}
                    target="_blank"
                  >
                    <FaGooglePlusG size="50" className="text-center" />
                    <div className="tooltip">Google Plus</div>
                  </a>
                )}

                {propData.twitter && (
                  <a
                    className="social-icon social-icon--twitter"
                    href={propData.twitter}
                    target="_blank"
                  >
                    <FaTwitter size="50" className="text-center" />
                    <div className="tooltip">Twitter</div>
                  </a>
                )}

                {propData.youtube_url && (
                  <a
                    className="social-icon social-icon--yTube"
                    href={propData.youtube_url}
                    target="_blank"
                  >
                    <FaYoutube size="50" className="text-center" />
                    <div className="tooltip">YouTube</div>
                  </a>
                )}

                {propData.yelp && (
                  <a
                    className="social-icon social-icon--yelp"
                    href={propData.yelp}
                    target="_blank"
                  >
                    <FaYelp size="50" className="text-center" />
                    <div className="tooltip">Yelp</div>
                  </a>
                )}

                {propData.tripadvisor && (
                  <a
                    className="social-icon social-icon--trip"
                    href={propData.tripadvisor}
                    target="_blank"
                  >
                    <FaTripadvisor size="50" className="text-center" />
                    <div className="tooltip">TripAdvisor</div>
                  </a>
                )}

                {propData.foresquare_code && (
                  <a
                    className="social-icon social-icon--foreSquare"
                    href={propData.foresquare_code}
                    target="_blank"
                  >
                    <FaFoursquare size="50" className="text-center" />
                    <div className="tooltip">Foursquare</div>
                  </a>
                )}

                {propData.pin_interest && (
                  <a
                    className="social-icon social-icon--pinInterest"
                    href={propData.pin_interest}
                    target="_blank"
                  >
                    <FaPinterestP size="50" className="text-center" />
                    <div className="tooltip">Pinterest</div>
                  </a>
                )}

                {propData.instagram_url && (
                  <a
                    className="social-icon social-icon--instagram"
                    href={propData.instagram_url}
                    target="_blank"
                  >
                    <FaInstagram size="50" className="text-center" />
                    <div className="tooltip">Instagram</div>
                  </a>
                )}

                {propData.linkedin_url && (
                  <a
                    className="social-icon social-icon--linkedin"
                    href={propData.linkedin_url}
                    target="_blank"
                  >
                    <FaLinkedinIn size="50" className="text-center" />
                    <div className="tooltip">Linkedin</div>
                  </a>
                )}

                {propData.yahoo_url && (
                  <a
                    className="social-icon social-icon--yahoo"
                    href={propData.yahoo_url}
                    target="_blank"
                  >
                    <FaYahoo size="50" className="text-center" />
                    <div className="tooltip">Yahoo</div>
                  </a>
                )}

                {propData.skype && (
                  <a
                    className="social-icon social-icon--skype"
                    href={`skype:${propData.skype}`}
                    target="_blank"
                  >
                    <FaSkype size="50" className="text-center" />
                    <div className="tooltip">Skype</div>
                  </a>
                )}
              </div>
              <div className="certificate row">
                <div className="col-6 col-xl-5 col-lg-5 col-md-12 col-sm-12 Footer-btns">
                  <div className="modifyButton">
                    <Link to="/personaldatarequest" title="Modify/Cancel">
                      <span className="BGModify mb-3 mt-0 px-2">
                        Modify / Cancel
                      </span>
                    </Link>
                  </div>
                  <div className="mt-md-0 footer-btns">
                    {!allpropertydata.accessibilty_status && (
                      <Link
                        to="/ada-accessibility-amenities-services-facilities"
                        title="Accessibility"
                        className="wheelchair my-3 px-1"
                      >
                        <FaWheelchair size="20" className="on-h-Icon" />{" "}
                        <span className="wheel-text">Accessibility</span>
                      </Link>
                    )}
                  </div>
                  {/* {splitLocation[1] !== "reservations" && <div className="PR lang-btn mt-3 mb-0" title="Languages">
                    <span className="langauge">Languages</span>
                    <div id="google_translate_element"></div>
                      <GoogleTranslate />
                  </div>} */}
                  <div className="PR lang-btn mt-3 mb-0" title="Languages">
                    <span className="langauge">Languages</span>
                    <div id="google_translate_element"></div>
                    <GoogleTranslate />
                  </div>
                </div>
                <div className="trip_card col-xl-7 col-lg-7 col-md-12 col-sm-12">
                  <div className="traveler-choice">
                    <a
                      target="_blank"
                      href="https://www.tripadvisor.com/Hotel_Review-g32460-d77135-Reviews-Yosemite_Westgate_Lodge-Groveland_California.html"
                    >
                      <img
                        className="trip-advsr p-1 lazyload"
                        src={TChoice}
                        alt="traveller choice"
                        title="Traveler's Choice Winner"
                        width="100%"
                        height="100%"
                        loading="lazy"
                      />

                      {/* <img
                        className="trip-advsr p-1 lazyload"
                        src={TChoice}
                        alt="traveller choice"
                        title="Traveler's Choice Winner"
                        width="100%"
                        height="100%"
                      /> */}
                    </a>
                  </div>
                  <div className="traveler-choice">
                    <a
                      target="_blank"
                      href="https://www.tripadvisor.in/Hotel_Review-g32460-d77135-Reviews-Yosemite_Westgate_Lodge-Groveland_California.html"
                    >
                      <img
                        className="p-1 trip-advsr lazyload"
                        src={TripAdv}
                        alt="traveller choice"
                        title="Trip Advisor"
                        width="100%"
                        height="100%"
                        loading="lazy"
                      />

                      {/* <img
                        className="p-1 trip-advsr lazyload"
                        src={TripAdv}
                        alt="traveller choice"
                        title="Trip Advisor"
                        width="100%"
                        height="100%"
                      /> */}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="draw-line mob-noLine"></hr>
        <div className="">
          <ul className="list-unstyled horizantal-links seo-links">
            <li>
              <Link to="/" title="Yosemite Hotels">
                Yosemite Hotels{" "}
              </Link>
            </li>
            <li>
              <Link to="/" title="Yosemite Guestrooms">
                Yosemite Guestrooms{" "}
              </Link>
            </li>

            <li>
              <Link to="/reservations" title="Yosemite Hotel Reservations">
                Yosemite Hotel Reservations
              </Link>
            </li>

            <li>
              <Link to="/Yosemite-attractions" title="Attractions in Yosemite">
                Attractions in Yosemite
              </Link>
            </li>

            <li>
              <Link to="/" title="Yosemite Packages">
                <li>Yosemite Packages</li>
              </Link>
            </li>
          </ul>
        </div>
        <hr className="draw-line"></hr>
        <div className="col-12 copyright-cont d-flex">
          <p className="copy-right-line">
            Website Design, Development, and Digital Marketing&nbsp;{" "}
            <a
              href="https://www.innsight.com/hospitality-website-design"
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              <i>Powered by INNsight.</i>
            </a>
          </p>
          <p className="copy-right-line cp-2">
            Copyright © {new Date().getFullYear()} INNsight.com, Inc.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainFooter;
