import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
import BannerContainer from "../../InnerPages/BannerComponent/BannerContainer";
import ReactHtmlParser from "react-html-parser";
import {
  getSeoDescriptionData,
  getPropAdaAccesibilityData,
} from "../../../DataLayer/datalayerUtilities";
import { motion } from 'framer-motion';
import { useRecoilValue } from "recoil";
import { seoThemeDetails, propertyDataSelector } from "./../../../Recoil/themeModule";
 import { Link } from "react-router-dom";
// import CommonBanner from "../../Yosemitewestgate/assets/images/BannerImages/main-slider.webp";
import "./index.scss";
import { FiPhoneCall } from 'react-icons/fi'
import { HiOutlineMail } from 'react-icons/hi'
import { GoLocation } from 'react-icons/go'
import WaveImg from './../../CommonAssets/Icons/wave.png'
import { BiHandicap } from 'react-icons/bi'

const AccessibilityComponent = (props) => {
  // console.log(props)
  const propertyData = useRecoilValue(propertyDataSelector);
   console.log(propertyData);
  const { ada: seoId } = useRecoilValue(seoThemeDetails);
  const [seoData, setPropertySeodata] = useState([]);
  const [adaAccessDataOne, setPropertyAdaDataOne] = useState([]);
  // const [adaAccessDataTwo, setPropertyAdaDataTwo] = useState([]);

  useEffect(() => {
    fetchSeoProperties();
    fetchPropertyAdaAccessbility();
  }, []);

  const fetchSeoProperties = async () => {
    // console.log(seoId);
    const response = await getSeoDescriptionData(seoId);
    // alert(response);
    // console.log(response);
    setPropertySeodata(response.data);
  };

  const fetchPropertyAdaAccessbility = async () => {
    const response = await getPropAdaAccesibilityData();
    // console.log(response);
    setPropertyAdaDataOne(response);
    console.log("acc", response)
    // setPropertyAdaDataTwo(response.property_amenity);
  };

  return (
    <section className="container-fluid px-0 AccessbilityStyle">
        <motion.div
    initial={{ scaleY: 0 }}
    animate={{ scaleY: 1 }}
    exit={{ scaleY: 0 }}
    transition={{ duration: 0.4 }}
  >
        <BannerContainer seoData={seoData} />
        </motion.div>
      <div className="container PT10">
        <div className="col-lg-12 col-md-12 col-sm-12  col-xs-12 acessbg accessible2 ">
          <p>
            Our goal is to provide hospitality to all people who travel to
            Oakhurst. This means everyone. Our mission is to make it as easy as
            possible for all people including those with hearing, vision, or any
            other disability to learn about our property and book their stay if
            they so desire.
          </p>
     

          <p className="MB20">
            If you have difficulty learning about or booking our hotel, we
            invite you to contact us via telephone or email and our friendly
            staff will gladly assist you.
          </p>
          <div className="row px-1 pt-3">
            <div className="col-12 col-md-12 col-xl-4 col-lg-4 px-0 my-2 my-md-2 my-xl-0 my-lg-0">
            
                <div className="ada-address-details">
                 <FiPhoneCall size="27" className="mx-2 mx-md-3" /> Phone Number:
                </div>
                <div className="fs-500 text-dark ml-5 c-pointer pl-0 pl-md-3 pb-2 mt-2" title="Yosemite Westgate Lodge  Contact Number" > {ReactHtmlParser( propertyData &&
                  propertyData.primary_phone_no &&
                  propertyData.primary_phone_no.split("/")[1])}</div>
            </div>
            <div className="col-12 col-md-12 col-xl-4 col-lg-4 px-0 my-2 my-md-2 my-xl-0 my-lg-0">
            
            <div className="ada-address-details">
            <HiOutlineMail size="30" className="mx-2 mx-md-3" /> Email Address:
            </div>
            <div className="fs-500 text-dark mt-2 ml-0 c-pointer mt-2 pb-2 pl-0 pl-md-0 pl-xl-2 pl-lg-2"><Link  t0="/qualityassurance@innsight.com" className="fs-500 text-dark pt-2 ml-5 pl-0 pl-md-3 c-pointer pb-2 " title="Yosemite Westgate Lodge Email Info"> {ReactHtmlParser(propertyData.email)}</Link></div>
         
        </div>
        <div className="col-12 col-md-12 col-xl-4 col-lg-4 px-0 my-2 my-md-2 my-xl-0 my-lg-0">
            
            <div className="ada-address-details">
          <GoLocation size="30" className="mx-2 mx-md-3"  /> Address:
            </div>
            <div className="fs-500 text-dark mt-2 ml-5 c-pointer mt-2 pb-2 pl-0 pl-md-3"> <Link className="text-dark" to="/directions" title=""> {ReactHtmlParser(propertyData.street_address)}, {ReactHtmlParser(propertyData.city)}, {ReactHtmlParser(propertyData.state)} </Link></div>
        </div>
          </div>
        </div>
        <div className="mt-5">
          <p className="acesssfour custom-p">
            We work very hard to provide an easy-to-use online experience for
            all guests. We believe all of our website visitors should be able to
            easily research online on
            <a className="px-2" href="https://alpha.yosemitewestgate.com/">
            https://alpha.yosemitewestgate.com/
            </a>
            regardless of device type and whether an individual requires
            assistive technology like a screen reader, font magnification,
            translation or voice recognition software.
          </p>
          <p className="custom-p">
            To ensure this, Yosemite westgate Hotel and Suitess is committed to
            compliance with Level AA success criteria of the
            <strong className="pl-2">
              Website Content Accessibility Guidelines 2.1 (WCAG 2.1),
            </strong>
            an international standard measure of accessibility success. Our
            website and digital marketing has been developed after carefully
            parsing these particular guidelines and is continuously being
            enhanced to make our technology more accessible and user-friendly.
          </p>
          <p className="custom-p">
            We have tested our hotel’s website to ensure that we meet or exceed
            Level AA checkpoints of the WCAG 2.1 Standard.
          </p>
          <p className="acesssfour custom-p">
            Our hotel website allows visitors to search for accessibility
            featured guest rooms with ease and details our property’s
            accessibility features on our Hotel Overview page which can be found
            here:
            <a className="WB pl-2" href="https://alpha.yosemitewestgate.com/overview">
              Click Here
            </a>
          </p>

          <p className="custom-p">
            Our hotel has the appropriate policies, best practices, and
            procedures in place to ensure that individuals with disabilities can
            make reservations for accessible guest rooms during the same hours
            and in the same manner as individuals who do not need accessible
            rooms.
          </p>
          <p>As part of our reservation processes, we:</p>
          <ul className="access-ul-li pl-4 pr-1">
            <li>
              Modify our policies, practices, or procedures to ensure that
              individuals with disabilities can make reservations for accessible
              guest rooms during the same hours and in the same manner as
              individuals who do not need accessible rooms
            </li>
            <li>
              Identify and describe accessible features at our place of lodging
              and guest rooms offered through our reservations system in enough
              detail to reasonably permit individuals with disabilities to
              assess independently whether a given place of lodging or guest
              room meets his/her accessibility needs
            </li>
            <li>
              Ensure that accessible guest rooms are held for use by individuals
              with disabilities until all other guest rooms of that type have
              been rented and the accessible room requested is the only
              remaining room of that type
            </li>
            <li>
              Reserve, upon request, accessible guest rooms or specific types of
              guest rooms and ensure that the guest rooms requested are blocked
              and removed from all reservations systems
            </li>
            <li>
              Guarantee that the specific accessible guest room reserved through
              our reservations system is held for the reserving guest,
              regardless of whether a specific room is held in response to
              reservations made by others.
            </li>
          </ul>
          <p className="acesssfour">
            If you require any assistance with booking your reservation, please
            contact us directly via email, phone, or social media, which you
            will find on our
            <a
              href="https://alpha.yosemitewestgate.com/contact-us"
              target="blank"
              title="Contact Us"
              className="contactmob px-2"
            >
              Contact Us
            </a>
            page.
          </p>
          <p className="acesssfour">
            If you have any questions or would like to report any issues related
            to the accessibility features of our hotel’s website, please contact
            us at
            <a className="WB pl-2" href="mailto:yosemitewestgatehotel@innsight.com">
              yosemitewestgatehotel@innsight.com
            </a>
          </p>
          <p className="acesssfour">
            You can learn more about W3C’s Web Accessibility Initiative (WAI)
            <a 
            className="pl-2"
              title="Web Accessibility Initiative "
              target="_blank"
              href="https://www.w3.org/WAI/"
            >
              HERE
            </a>
          </p>

          <div className="MT50 adasub mt-5">
            <em
              title="Yosemite westgate Hotel and Suites Accessibility Services "
              aria-hidden="true"
              className="fa fa-wheelchair F40 fs-500"
            ></em>
            <strong>
            <BiHandicap size="35"/>  Our Hotel Offers The Following Accessibility Features
            </strong>
          </div>
          

          <h3 className="MT30 adasub mt-4 mb-5">
            <strong> Property Accessibility Features </strong>
          </h3>
          <div className="property-acc-fea-div">
            <ul className="onlythis Bathroom-acces-feature-ul">
              {adaAccessDataOne.property_amenity?.property.map(
                (item, index) => {
                  return (
                    <>
                      <li className="">{ReactHtmlParser(item.name)}</li>
                    </>
                  );
                }
              )}
            </ul>
          </div>

          <h3 className="MT30 adasub mb-5 mt-4">
            <strong> Guest Room Accessibility Features </strong>
          </h3>
          <div className="property-acc-fea-div">
            <ul className="onlythis Bathroom-acces-feature-ul">
              {adaAccessDataOne.property_amenity?.room.map((item, index) => {
                return (
                  <>
                    <li className="">{ReactHtmlParser(item.name)}</li>
                  </>
                );
              })}
            </ul>
          </div>

          <h3 className="MT30 adasub mt-4 mb-5">
            <strong> Bathroom Accessibility Features </strong>
          </h3>
          <div className="property-acc-fea-div">
            <ul className="onlythis Bathroom-acces-feature-ul">
              {adaAccessDataOne.property_amenity?.bathroom.map(
                (item, index) => {
                  return (
                    <>
                      <li className="">{ReactHtmlParser(item.name)}</li>
                    </>
                  );
                }
              )}
            </ul>
          </div>
          
          <div className="col-lg-12 text-center">
            <a
              className=" text-center"
              target="_blank"
              href="https://alpha.yosemitewestgate.com/reservations"
            >
             <button type="button" title="CLICK HERE TO CHECK AVAILABILITY" className="opp-btn-style my-3"> CLICK HERE TO CHECK AVAILABILITY</button>
            </a>
          </div>

          <div className="website-acce-feat MT50">
            <h3 className="mt-3 mb-5 adasub">
              <strong>Hotel Website Accessibility Features </strong>
            </h3>
            {/* <div className="ada_line"></div> */}
            <div className="acessbg accessible2">
              <p>
                This hotel website for Yosemite westgate Hotel and Suites is
                designed to be fully accessible to all and is designed according
                to W3C Web Content Accessibility Guidelines (WCAG) 2.1 and
                conforms to most priority checkpoints which entail some of the
                following elements:
              </p>

              <p className="MT30">
                <strong> Navigation Shortcuts </strong>
              </p>
              <p>
                Our hotel’s website can be navigated by using the tab key to
                traverse the elements of each page and by using the enter key to
                activate a highlighted link.
              </p>

              <p className="MT30">
                <strong> Structured, Semantic Markup </strong>
              </p>
              <p className="acesssfour">
                HTML heading tags are used to convey the document structure.
                Navigation menus are tagged as HTML maps so that the menu title
                can be read out, and the menu items are presented as a group.
                Please see our Site Map for easy navigation at:
                <a
                  className="WB pl-2"
                  target="_blank"
                  href="https://alpha.yosemitewestgate.com/sitemap"
                >
                  https://alpha.yosemitewestgate.com/sitemap
                </a>
              </p>

              <p className="MT30">
                <strong> Images Visibility </strong>
              </p>
              <p>
                All content images include descriptive ALT attributes and all
                purely decorative graphics include null ALT attributes.
              </p>

              <p className="MT30">
                <strong> Standards Compliance </strong>
              </p>

              <p>
                The site is designed to conform to Level AA compliance as
                specified by the Web Content Accessibility Guidelines. All pages
                validate as XHTML 1.0 and use structured semantic markup.
              </p>

              <p className="MT30">
                <strong> Accessibility References </strong>
              </p>
              <ul>
                <li>
                  <a
                    title="Web Content Accessibility Guidelines (WCAG) 2.1"
                    target="_blank"
                    href="https://www.w3.org/WAI/"
                  >
                    Web Content Accessibility Guidelines (WCAG) 2.1
                  </a>
                  , which explains the reasons behind each guideline.
                </li>
                <li>
                  <a
                    title="Section 508 of the Rehabilitation Act"
                    target="_blank"
                    href="https://section508.gov/"
                  >
                    Section 508
                  </a>
                  , Information and news about the accessibility standards
                  introduced by Section 508 of the Rehabilitation Act.
                </li>
              </ul>

              <p className="MT30">
                <strong> Accessibility Software and Services </strong>
              </p>
              <p>
                The following tools and services are available for free to
                assist you with viewing and interacting with our website:
              </p>
              <ul>
                <li>
                  Click Here for
                  <a
                    title="Validate Web Pages"
                    target="_blank"
                    href="http://validator.w3.org/"
                  >
                    HTML Validator
                  </a>
                  , a free service for checking that web pages conform to
                  published HTML standards.
                </li>
                <li>
                  Click Here for
                  <a
                    title="Web Page Backward Compatibility Viewer"
                    target="_blank"
                    href="http://www.delorie.com/web/wpbcv.html"
                  >
                    Web Page Backward Compatibility Viewer
                  </a>
                  , a tool for viewing your web pages <em>without </em> a
                  variety of modern browser features.
                </li>
                <li>
                  Click Here for
                  <a
                    title="A Free Text-Only Web Browser"
                    target="_blank"
                    href="http://lynx.browser.org/"
                  >
                    Lynx
                  </a>
                  , a free text-only web browser.
                </li>
              </ul>

              <p className="MT30">
                <strong> Browser Help </strong>
              </p>

              <p>
                Optimize the way you view your web browser. If you have
                difficulty in reading the Yosemite westgate Hotel and Suites
                website on your screen, you may be able to change the settings
                on your browser to help you improve readability and visibility
                of each webpage:
              </p>
              <p>
                Learn about the Accessibility features of these major Internet
                Browsers below:
              </p>
              <ul>
                <li>
                  <strong>Mozilla Firefox:</strong> Click Here for
                  <a
                    title="Mozilla Firefox Accessibility Features"
                    target="_blank"
                    href="https://support.mozilla.org/en-US/kb/accessibility-features-firefox-make-firefox-and-we"
                  >
                    Mozilla Firefox Accessibility Features
                  </a>
                </li>
                <li>
                  <strong>Google Chrome:</strong> Click Here for
                  <a
                    title="Google Accessibility Features"
                    target="_blank"
                    href="https://www.google.com/accessibility/products-features.html"
                  >
                    Google Accessibility Features
                  </a>
                </li>
                <li>
                  <strong>Internet Explorer:</strong> Click Here for
                  <a
                    title="Microsoft Internet Explorer Ease of Access Options"
                    target="_blank"
                    href="https://support.microsoft.com/en-us/help/17456/windows-internet-explorer-ease-of-access-options"
                  >
                    Microsoft Internet Explorer Ease of Access Options
                  </a>
                </li>
                <li>
                  <strong>Apple Safari:</strong> Click Here for
                  <a
                    title="Apple Accessibility Support"
                    target="_blank"
                    href="https://support.apple.com/accessibility"
                  >
                    Apple Accessibility Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-12 text-center my-5">
            <div className="main-bg-white PB20 acesssfour">
              <strong>
                This Hotel's Website Has Passed W3C WCAG 2.1 Level AA
                Self-Certification*
              </strong>
              <br></br>
              <a
                target="blank" 
                href="http://wave.webaim.org/report?url=https://alpha.yosemitewestgate.com/"
              >
                <img
                  loading="lazy"
                  className="MT10 MB10 my-3"
                  title="W3C WCAG 2.1 Level AA Self-Certification"
                  src={WaveImg}
                  alt="W3C WCAG 2.1 Level AA Self-Certification"
                  width="182"
                  height="69"
                />
              </a>
              <br></br>
              <span className="F12 ">
                *Note: W3C has not developed a certification program or
                authorized any other program to certify conformance to W3C
                standards.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccessibilityComponent;
