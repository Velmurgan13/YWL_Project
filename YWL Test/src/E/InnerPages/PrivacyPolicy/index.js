import React, { useState, useEffect, useRef } from "react";
import { getSeoDescriptionData } from "../../../DataLayer/datalayerUtilities";
import "../../../E/InnerPages/PrivacyPolicy/index.scss";
import "./index.css";
// import { motion } from 'framer-motion';
//common banner component
import BannerContainer from "../BannerComponent/BannerContainer";

const PrivacyPolicyComponent = () => {
  const [toggleState, setToggleState] = useState(1);
  const [clicked, setClicked] = useState(false);
  const [seoData, setPropertySeodata] = useState([]);
  //   document.getElementById("info_collect").scrollIntoView({
  //   behavior: 'smooth',
  // })
//  dummy line delete it 
  useEffect(() => {
    fetchSeoProperties();
  }, []);

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData("13");
    setPropertySeodata(response.data);
  };
  const toggle = (index) => {
    if (clicked === index) {
      //if clicked question is already active, then close it
      return setClicked(null);
    }
    setClicked(index);
  };

  const toggleTab = (index) => {
    setToggleState(index);
  };

  // const scrollToRef = (ref) => {
  //   if (window.screen.width > 1200 && window.screen.width < 4500) {
  //     window.scrollTo(0, ref.current.offsetTop + 500);
  //   } else if(window.screen.width < 767 ) {
  //     window.scrollTo(0, ref.current.offsetTop - 10);
  //   }
  // };

  const titleRef = useRef(null);
  const titleRefone = useRef(null);

  function handleBackClick(nav) {
    nav.current.scrollIntoView({ behavior: "smooth" });
    if (window.screen.width > 1200) {
      window.scrollTo(0, nav.current.offsetTop + 690);
    }
  }

  const one = () => handleBackClick(titleRef);
  const two = () => handleBackClick(titleRefone);

  const scrollToRef = (ref) => {
    window.screen.availWidth > 1199
      ? window.scrollTo(0, ref.current.offsetTop - 120)
      : window.scrollTo(0, ref.current.offsetTop - 0);
  };

  const myRef = useRef(null);
  const myRef1 = useRef(null);
  const myRef2 = useRef(null);
  const myRef3 = useRef(null);
  const myRef4 = useRef(null);
  const myRef5 = useRef(null);
  const myRef6 = useRef(null);
  const myRef7 = useRef(null);
  const myRef8 = useRef(null);
  const myRef9 = useRef(null);
  const myRef10 = useRef(null);
  const myRef11 = useRef(null);
  const myRef12 = useRef(null);
  const myRef13 = useRef(null);
  const myRef14 = useRef(null);
  const myRef15 = useRef(null);
  const myRef16 = useRef(null);

  const executeScroll = () => scrollToRef(myRef);
  const executeScroll1 = () => scrollToRef(myRef1);
  const executeScroll2 = () => scrollToRef(myRef2);
  const executeScroll3 = () => scrollToRef(myRef3);
  const executeScroll4 = () => scrollToRef(myRef4);
  const executeScroll5 = () => scrollToRef(myRef5);
  const executeScroll6 = () => scrollToRef(myRef6);
  const executeScroll7 = () => scrollToRef(myRef7);
  const executeScroll8 = () => scrollToRef(myRef8);
  const executeScroll9 = () => scrollToRef(myRef9);
  const executeScroll10 = () => scrollToRef(myRef10);
  const executeScroll11 = () => scrollToRef(myRef11);
  const executeScroll12 = () => scrollToRef(myRef12);
  const executeScroll13 = () => scrollToRef(myRef13);
  const executeScroll14 = () => scrollToRef(myRef14);
  const executeScroll15 = () => scrollToRef(myRef15);
  const executeScroll16 = () => scrollToRef(myRef16);

  return (
    <>
      {/* <motion.div
    initial={{ scaleY: 0 }}
    animate={{ scaleY: 1 }}
    exit={{ scaleY: 0 }}
    transition={{ duration: 0.4 }}
  > */}
      <BannerContainer seoData={seoData} />
      {/* </motion.div> */}
      <div className="Privacy-page container">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-justify P0 width100tabmob messages_bar MT10 postion-unset">
          <div className="termconditiosns">
            <p>
              We highly value your trust in choosing INNsight.com as your online
              reservation and accommodations search utility and hospitality
              business website host for hotels, restaurants, wineries, golf
              courses, and salons. Therefore, we will duly and diligently
              safeguard and protect the privacy and confidentiality of your
              personal details (including your credit card details). If you have
              any questions or concerns about our policy, or our practices with
              regards to your personal information, please contact us at
              <a href="mailto:legal@innsight.com" className="legal-action">
                {" "}
                legal@innsight.com.
              </a>
            </p>

            <p>
              When you visit our website(s) and use our services, you trust us
              with your personal information. We take your privacy very
              seriously. In this privacy notice, we describe our Privacy Policy.
              We seek to explain to you in the clearest way possible what
              information we collect, how we use it, and what rights you have in
              relation to it. We hope you take some time to read through it
              carefully. If there are any terms in this Privacy Policy that you
              do not agree with, please discontinue use of our products and
              services.
            </p>

            <p>
              This Privacy Policy applies to all information collected through
              our and/or any related services, sales, marketing, or events (we
              refer to them collectively in this Privacy Policy as the "
              <strong>Sites</strong>").{" "}
            </p>

            <p>
              <strong>
                Please read this Privacy Policy carefully as it will help you
                make informed decisions about sharing your personal information
                with us.{" "}
              </strong>
            </p>
            <div className="headingpri contactAlign">
              <strong>Table of Contents</strong>
            </div>
            <ul className="indexing pl-0">
              <li>
                <a className="info_collect" onClick={executeScroll}>
                  <strong>WHAT INFORMATION DO WE COLLECT?</strong>
                </a>
                <ul className="pl-0">
                  <li>
                    <a className="info_disclose" onClick={executeScroll1}>
                      Personal information you disclose to us
                    </a>
                  </li>
                  <li>
                    <a className="info_automatic" onClick={executeScroll2}>
                      Information automatically collected
                    </a>
                  </li>
                  <li>
                    <a className="info_other" onClick={executeScroll3}>
                      Information collected from other sources
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="indexing pl-0">
              <li>
                <a className="protect_info" onClick={executeScroll4}>
                  <strong>HOW DO WE PROTECT YOUR INFORMATION?</strong>
                </a>
              </li>
              <li>
                <a className="info_shared" onClick={executeScroll5}>
                  <strong>WILL YOUR INFORMATION BE SHARED WITH ANYONE?</strong>
                </a>
              </li>
              <li>
                <a className="info_transferred" onClick={executeScroll6}>
                  <strong>
                    IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?
                  </strong>
                </a>
              </li>
              <li>
                <a className="creditcard" onClick={executeScroll7}>
                  <strong>
                    Protect and Secure Your Credit Card Information
                  </strong>
                </a>
              </li>
              <li>
                <a className="privacy_rights" onClick={executeScroll8}>
                  <strong>WHAT ARE YOUR PRIVACY RIGHTS?</strong>
                </a>
              </li>
              <li>
                <a className="account_info" onClick={executeScroll9}>
                  <strong>Account Information</strong>
                </a>
              </li>
              <li>
                <a className="cal_privacy_rights" onClick={executeScroll10}>
                  <strong>
                    DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
                  </strong>
                </a>
              </li>
              <li>
                <a className="delete_data" onClick={executeScroll11}>
                  <strong>
                    HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT
                    FROM YOU?
                  </strong>
                </a>
              </li>
            </ul>

            <h2 className="headingpri contactAlign" ref={myRef}>
              <strong>WHAT INFORMATION DO WE COLLECT?</strong>
            </h2>
            <p>
              We collect information from you when you register on our Sites,
              search for accommodations, reserve a room, subscribe to our
              newsletters or emails, respond to a survey or fill out a form.
            </p>

            <p>
              When booking a reservation or registering on our Sites, as
              appropriate, you may be asked to enter your: name, e-mail address,
              mailing address, phone number or credit card information (i.e.
              credit card type and number, CVC code, expiration date, credit
              card holder name) and to the extent available, reservation
              preferences, guest details, and smoking preferences. &nbsp;This
              information is required to process, book and complete your
              reservation (including the sending of a confirmation email of the
              reservation to you). In certain cases, we might ask for your
              feedback or answers to subjective survey questions in order to
              improve our service or the service of Hotels whose websites we
              manage.
            </p>

            <p>
              You may, however, visit our Sites and search for accommodations
              anonymously.
            </p>

            <h2 ref={myRef1}>
              <strong>Personal information you disclose to us </strong>
            </h2>
            <p>
              <strong>
                <em>Summary:</em>
              </strong>{" "}
              <em>
                We collect personal information that you provide to us such as
                name, address, contact information, passwords and security data,
                and payment information in order to process bookings and deliver
                relevant advertising.
              </em>
            </p>

            <p>
              We collect personal information that you voluntarily provide to us
              when registering or &nbsp;expressing an interest in obtaining
              information about us or our products and services, when
              participating in activities on the (such as posting reviews or
              entering competitions, contests or giveaways) or otherwise
              contacting us.
            </p>

            <p>
              The personal information that we collect depends on the context of
              your interactions with the business, the choices you make and the
              products and features you use. The personal information we collect
              can include the following:
            </p>

            <p>
              <strong>Name and Contact Information:</strong> We collect your
              first and last name, email address, postal address, phone number,
              and other similar contact information.
            </p>

            <p>
              <strong>Credentials:</strong> We collect passwords, password
              hints, and similar security information used for authentication
              and account access. We do not store your passwords, but rather
              their cryptographic hashes.
            </p>

            <p>
              <strong>Payment Data:</strong> We collect data necessary to
              process your payment if you make purchases, such as your payment
              instrument number (such as a credit card number), and the security
              code associated with your payment instrument. All payment data is
              transmitted and stored using Payment Card Industry (PCI) Compliant
              processes and standards: SSL/TLS and data encryption at rest.
            </p>

            <p>
              All personal information that you provide to us must be true,
              complete and accurate, and you must notify us of any changes to
              such personal information.
            </p>

            <h2 ref={myRef2}>
              <strong>Information automatically collected </strong>
            </h2>
            <p>
              <strong>
                <em>In Short:</em>
              </strong>{" "}
              <em>
                Some information – such as IP address and/or browser and device
                characteristics – is collected automatically when you visit our
                websites.
              </em>
            </p>

            <p>
              We automatically collect certain information when you visit, use
              or navigate our websites. This information does not reveal your
              specific identity (like your name or contact information) but may
              include device and usage information, such as your IP address,
              browser and device characteristics, operating system, language
              preferences, referring URLs, device name, country, location,
              information about how and when you use our Sites and other
              technical information. This information is primarily needed to
              maintain the security and operation of our websites, and for our
              internal analytics and reporting purposes.{" "}
            </p>

            <p>
              Like many businesses, we also collect information through cookies
              and similar technologies.
            </p>

            <h2 ref={myRef3}>
              <strong>Information collected from other sources </strong>
            </h2>
            <p>
              <strong>
                <em>In Short:</em>
              </strong>
              <em>
                {" "}
                We may collect limited data from public databases, marketing
                partners, and other outside sources.{" "}
              </em>
            </p>

            <p>
              We may obtain information about you from other sources, such as
              public databases, joint marketing partners, as well as from other
              third parties. Examples of the information we receive from other
              sources include: social media profile information; marketing leads
              and search results and links, including paid listings (such as
              sponsored links).{" "}
            </p>

            {/* <h2 className="headingpri contactAlign" ref={myRef1}> */}
            <h2 className="headingpri contactAlign">
              <strong>WHAT DO WE USE YOUR INFORMATION FOR?</strong>
            </h2>
            <p>
              Any of the information we collect from you may be used in one of
              the following ways:{" "}
            </p>

            <p>
              <strong>
                <em>To personalize your experience</em>
              </strong>
            </p>
            <p>
              Your information helps us to better respond to your individual
              needs. &nbsp;We use answers to survey questions and/or browsing
              behavior to fine tune and personalize your experience with our
              accommodations search in order to find the perfect place to stay,
              dine at, or patronize.
            </p>

            <p>
              <strong>
                <em>To improve our website</em>
              </strong>
            </p>
            <p>
              In order to improve our service and product, we use temporary and
              persistent cookies, authorized third party cookies, web beacons
              and/or other technologies to collect non-personally identifiable
              data and to track browsing behavior.
            </p>

            <p>
              Furthermore, we will record and use your IP address, browser type
              and Internet Service Provider (ISP) for behavioral targeting,
              fraud, misuse, and criminal investigation purposes.
            </p>

            <p>
              <strong>
                <em>To improve customer service</em>
              </strong>
            </p>
            <p>
              Your information helps us to more effectively respond to your
              customer service requests and support needs.
            </p>

            <p>
              <strong>
                <em>To process reservations</em>
              </strong>
            </p>
            <p>
              In order to complete your reservation and save such details for
              disclosures required by law, criminal investigations, subpoenas or
              court orders, we will only disclose your name, contact details,
              personal preferences, and the credit card details to the relevant
              partner hospitality business with which a reservation is made.
              &nbsp;However, please note that from time to time, we may use
              third party distributors, which provide certain services and
              functions for and on our behalf. These third party distributors
              may have access to part of your personal information in order to
              perform their services and functions, but are subject to a
              confidentiality obligation pursuant to which they cannot use,
              share or disclose the information for any other purpose without
              prior written consent from INNsight.com on behalf of you.
            </p>

            <p>
              <strong>
                <em>
                  To administer a contest, promotion, survey, or improve site
                  features
                </em>
              </strong>
            </p>
            <p>
              In order to understand how people use our Sites and for marketing
              analysis and quality improvement purposes, we collect, record,
              process and use on an anonymous basis various data and
              information, such as the total amount of transactions, viewed web
              pages, referring/exit pages, platform type, date/time stamp
              information and details like the number and location of mouse
              clicks on a given page, mouse movements, scrolling activity and
              the search words and terms you use and the text you type while
              being on and using our website.
            </p>

            <p>
              <strong>
                <em>To send periodic emails</em>
              </strong>
            </p>
            <p>
              The email address you provide for order processing, will only be
              used to send you information and updates pertaining to your
              reservation, interactions, or searches.
            </p>

            <p>
              If you wish to subscribe to our newsletter or wish to receive
              promotional communications or other information from us in respect
              of our, our affiliated companies' or business partners' products
              or services, we offer you the option to "Opt in" for this service.
              If you no longer wish to receive our newsletter and other
              promotional communications, you can simply click on the
              “Unsubscribe” link in our emails.
            </p>

            <p>
              <strong>Note:</strong> If at any time you would like to
              unsubscribe from receiving future emails, we include detailed
              unsubscribe instructions at the bottom of each email.
            </p>

            <p>
              <strong>
                <em>
                  To complete reviews and share user feedback with the public{" "}
                </em>
              </strong>
            </p>
            <p>
              By completing a reservation, you agree to receive an invitation
              email to complete our guest review (INNsights) form, which we will
              send to you immediately after you check out from the hospitality
              business, which can be completed anonymously. By completing the
              guest review, you agree that the completed guest review can be
              uploaded to our website on the relevant business’ property
              information page for the sole purpose of informing future
              customers on the service and quality of the relevant business. We
              reserve the right to adjust, refuse or remove review forms at our
              sole discretion. The guest review form should be regarded as a
              survey and does not include any further commercial offers,
              invitations or incentives whatsoever.{" "}
            </p>
            <div>
              <h2 className="headingpri contactAlign" ref={myRef4}>
                <strong>HOW DO WE PROTECT YOUR INFORMATION?</strong>
              </h2>
              <p>
                <strong>
                  <em>In Short:</em>
                </strong>
                <em>
                  We aim to protect your personal information through a system
                  of organizational and technical security measures.
                </em>{" "}
                &nbsp;
              </p>

              <p>
                We have implemented appropriate technical and organizational
                security measures designed to protect the security of any
                personal information we process. However, please also remember
                that we cannot guarantee that the devices you use or the
                Internet itself is 100% secure. Although we will do our best to
                protect your personal information, transmission of personal
                information to and from our servers is at your own risk. You
                should only access the services within a secure environment.{" "}
              </p>
              <p>
                We implement a variety of security measures to maintain the
                safety of your personal information when you place an order or
                enter, submit, or access your personal information.{" "}
              </p>

              <p>
                We offer the use of a secure server for the transmission of most
                personally identifiable data. All supplied sensitive/credit
                information is transmitted via Transport Layer Security (TLS),
                also known as Secure Socket Layer (SSL) technology, and then
                encrypted into our Database to be only accessed by those
                authorized with special access rights to our systems, and who
                are required to keep the information confidential.
              </p>

              <p>
                After a transaction, your private information may be kept on
                file for more than 60 days, unless you have opted to remove your
                data in your My Account settings.{" "}
              </p>
            </div>
            <h2 className="headingpri contactAlign" ref={myRef5}>
              <strong>
                WILL YOUR INFORMATION BE SHARED WITH ANYONE? &nbsp;
              </strong>
            </h2>
            <p>
              <strong>
                <em>In Short:</em>
              </strong>
              <em>
                {" "}
                We only share information with your consent, to comply with
                laws, to protect your rights, or to fulfill business
                obligations.{" "}
              </em>
              &nbsp;&nbsp;
            </p>

            <p>
              We only share and disclose your information in the following
              situations:{" "}
            </p>

            <p>
              <strong>Compliance with Laws:</strong> We may disclose your
              information where we are legally required to do so in order to
              comply with applicable law, governmental requests, a judicial
              proceeding, court order, or legal process, such as in response to
              a court order or a subpoena (including in response to public
              authorities to meet national security or law enforcement
              requirements).
            </p>

            <p>
              <strong>Vital Interests and Legal Rights:</strong> We may disclose
              your information where we believe it is necessary to investigate,
              prevent, or take action regarding potential violations of our
              policies, suspected fraud, situations involving potential threats
              to the safety of any person and illegal activities, or as evidence
              in litigation in which we are involved. &nbsp;
            </p>

            <p>
              <strong>
                Vendors, Consultants and Other Third-Party Service Providers:
              </strong>{" "}
              We may share your data with third party vendors, service
              providers, contractors or agents who perform services for us or on
              our behalf and require access to such information to do that work.
              Examples include: payment processing, data analysis, email
              delivery, facsimile services, hosting services, customer service,
              and marketing efforts. We may allow selected third parties to use
              tracking technology on the websites, which will enable them to
              collect data about how you interact with the over time. This
              information may be used to, among other things, analyze and track
              data, determine the popularity of certain content and better
              understand user activity on our Sites. Unless described in this
              Policy, we do not share, sell, rent or trade any of your
              information with third parties for their promotional purposes.
            </p>

            <p>
              <strong>Business Transfers:</strong> We may share or transfer your
              information in connection with, or during negotiations of, any
              merger, sale of company assets, financing, or acquisition of all
              or a portion of our business to another company.
            </p>

            <p>
              <strong>Third-Party Advertisers:</strong> We may use third-party
              advertising companies to serve ads when you visit the website.
              These companies may use information about your visits to our
              Website(s) and other websites that are contained in web cookies
              and other tracking technologies in order to provide advertisements
              about goods and services of interest to you. &nbsp;
            </p>

            <p>
              <strong>Affiliates:</strong> We may share your information with
              our affiliates, in which case we will require those affiliates to
              honor this Privacy Policy. Affiliates include our parent company
              and any subsidiaries, joint venture partners or other companies
              that we control or that are under common control with us. &nbsp;
            </p>

            <p>
              <strong>Business Partners:</strong> We may share your information
              with our business partners to offer you certain products, services
              or promotions.
            </p>

            <p>
              <strong>With your Consent:</strong> We may disclose your personal
              information for any other purpose with your consent.
            </p>

            <p>
              <strong>Other Users:</strong> When you share personal information
              or otherwise interact with public areas of the website, such
              personal information may be viewed by all users and may be
              publicly distributed outside the platform in perpetuity. If you
              interact with other users of ours and register through a social
              network (such as Facebook), your contacts on the social network
              will see your name, profile photo, and descriptions of your
              activity. Similarly, other users will be able to view descriptions
              of your activity, communicate with you within our platform, and
              view your profile. &nbsp;
            </p>

            <h2 className="headingpri contactAlign">
              <strong>Do we use cookies or web beacons?</strong>
            </h2>
            <p>
              <strong className="F22">Yes.</strong>
            </p>

            <p>
              Cookies are text files stored in your computer, either temporarily
              or continuously on your hard drive. Cookies are used for
              authenticating, session tracking, and maintaining specific
              information about the use and users of our website, such as site
              preferences or the contents of their reservations. &nbsp;Cookie
              files may also be placed in your computer by our trusted
              third-party advertising companies for the purposes as set out in
              this paragraph. The data collected by these cookies are completely
              anonymous. If you prefer, you can delete all cookies that are
              already on your computer's hard drive by searching for files with
              "cookie" in it, or by using your web browser’s “Preferences”,
              “Options”, “Security Settings” or “Privacy Settings” or similarly
              named feature to view and then delete them; and for the future,
              you can edit your web browser options such that (future) cookies
              are blocked; however, please note that if you do this you may not
              be able to use the full functionality of our website. For more
              information about (the use and decline of) cookies, please visit:{" "}
            </p>

            <p>
              A web beacon consists of a small string of software code that
              represents a graphic image request on a Web page or email. There
              may or may not be a visible graphic image associated with the web
              beacon and often the image is designed to blend into the
              background of a Web page or email. Web beacons can be used for
              many purposes - including site traffic reporting, unique visitor
              counts, advertising auditing and reporting, and personalization.{" "}
            </p>

            <p>
              We use cookies and web beacons to help us remember your
              accommodations search and process your reservation, understand and
              save your preferences for future visits, keep track of
              advertisements and compile aggregate data about site traffic and
              site interaction so that we can offer better site experiences and
              tools to our users in the future. &nbsp;We may contract with
              third-party service providers to assist us in better understanding
              our site visitors. These service providers are not permitted to
              use the information collected on our behalf except to help us
              conduct and improve our business.
            </p>

            <p>
              If you prefer, you can choose to have your computer warn you each
              time a cookie is being sent, or you can choose to turn off all
              cookies via your browser settings. &nbsp;Like most websites, if
              you turn your cookies off, some of our services may not function
              properly.
            </p>

            <p>
              For detailed information about how we use Cookies, please see our
              .
            </p>

            <h2 className="headingpri" ref={myRef6}>
              <strong>IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?</strong>
            </h2>
            <p>
              <strong>
                <em>In Short:</em>
              </strong>
              <em>
                {" "}
                We may transfer, store, and process your information in
                countries other than your own.
              </em>{" "}
              &nbsp;
            </p>

            <p>
              Our servers are located on a cloud network architecture that may
              have components in several geographic locations around the world.
              If you are accessing our websites, please be aware that your
              information may be transferred to, stored, and processed by us in
              our facilities and by those third parties with whom we may share
              your personal information (see "WILL YOUR INFORMATION BE SHARED
              WITH ANYONE?" above), in the United States and other countries.{" "}
            </p>

            <p>
              If you are a resident in the European Economic Area, then these
              countries may not have data protection or other laws as
              comprehensive as those in your country. We will however take all
              necessary measures to protect your personal information in
              accordance with this Privacy Policy and applicable law. &nbsp;
            </p>

            <p>
              For the purposes of applicable EU data protection law (including
              the General Data Protection Regulation 2016/679 (the “GDPR”), we
              are a ‘data controller’ of your personal information.
            </p>

            <h2 className="headingpri">
              <strong>
                Do we disclose any information to outside parties?{" "}
              </strong>
            </h2>
            <p>
              We do NOT sell, trade, or otherwise transfer your personally
              identifiable information to outside parties. This does not include
              trusted third parties who assist us in operating our website,
              conducting our business, or servicing you, so long as those
              parties agree to keep this information confidential. We may also
              release your information when we believe release is appropriate to
              comply with the law, enforce our site policies, or protect our or
              others’ rights, property, or safety. However, non-personally
              identifiable visitor information may be provided to other parties
              for marketing, advertising, or other uses.
            </p>

            <h2 className="headingpri">
              <strong>Third Party Links</strong>
            </h2>
            <p>
              Occasionally, at our discretion, we may include or offer links to
              third party sites’ products or services on our Sites. These third
              party site products or services have separate and independent
              privacy policies. We therefore have no responsibility or liability
              for the content and activities of these linked sites. Nonetheless,
              we seek to protect the integrity of our site and welcome any
              feedback about these sites.
            </p>

            <h2 className="headingpri" ref={myRef7} >
              <strong>Protect and Secure Your Credit Card Information</strong>
            </h2>
            <p>
              In order to protect and safeguard the personal data provided to
              us, we have implemented and use appropriate business systems and
              procedures and strictly follow the internationally recognized
              Payment Card Industry (PCI) Security Standards. For example, your
              credit card information is transmitted to us through a secure
              server protocol, which encrypts all your personal and credit card
              details. The encryption method used is the latest industry
              standard "Transport Layer Security" (TLS) technology, also known
              as Secure Sockets Layer (SSL). Our SSL certificate has been issued
              by an industry leader, GoDaddy:{" "}
              <a target="blank" href="https://www.godaddy.com/">
                www.GoDaddy.com
              </a>
            </p>

            <p>
              Furthermore, we have implemented and use security procedures and
              technical and physical restrictions for accessing and using
              personal information. Only authorized employees are permitted to
              access personal information for performing their duties in respect
              of our services.
            </p>

            <p>
              INNkeepers, i.e. owners of hospitality properties and services who
              use our platform, are contractually obligated to safeguard all
              reservation details including credit card details and are also
              held accountable under Payment Card Industry (PCI) Security
              Standards as they apply to the lodging industry.
            </p>

            <p>
              Our server and network are protected by firewalls against
              unauthorized access and we have intrusion detection systems that
              monitor and detect unauthorized attempts to access to or misuse of
              our servers.
            </p>

            <h2 className="headingpri">
              <strong>
                Children’s Online Privacy Protection Act Compliance
              </strong>
            </h2>
            <p>
              We are in compliance with the requirements of COPPA (Children’s
              Online Privacy Protection Act), we do not collect any information
              from anyone under 13 years of age. Our website, products and
              services are all directed to people who are at least 18 years old
              or older as stated in our <em>Terms and Conditions of Use</em>.
            </p>

            <p>
              <strong>
                <em>In Short:</em>
              </strong>
              <em>
                {" "}
                We do not knowingly collect data from or market to children
                under 18 years of age.
              </em>{" "}
              &nbsp;
            </p>

            <p>
              We do not knowingly solicit data from or market to children under
              18 years of age. By using the website, you represent that you are
              at least 18 or that you are the parent or guardian of such a minor
              and consent to such minor dependent’s use of the website. If we
              learn that personal information from users less than 18 years of
              age has been collected, we will deactivate the account and take
              reasonable measures to promptly delete such data from our systems.
              If you become aware of any data our systems may have collected
              from children under age 18, please contact us
            </p>

            <h2 className="headingpri" ref={myRef8}>
              <strong>WHAT ARE YOUR PRIVACY RIGHTS?</strong>
            </h2>
            <p>
              <strong>
                <em>In Short:</em>
              </strong>
              <em>
                {" "}
                You may review, change, or terminate your account at any time.
              </em>{" "}
              &nbsp;&nbsp;&nbsp;
            </p>

            <p>
              If you are resident in the European Economic Area and you believe
              we are unlawfully processing your personal information, we provide
              a form specifically for you to ask us to take corrective action
              under the General Data Protection Regulation Act (GDPR). We will
              respond to you within 30 days of receipt of your complaint. You
              also have the right to complain to your local data protection
              supervisory authority. You can find their contact details here:{" "}
            </p>

            <h2 className="headingpri" ref={myRef9}>
              <strong>Account Information &nbsp;</strong>
            </h2>
            <p>
              If you would at any time like to review or change the information
              in your account or terminate your account, you can: &nbsp;
            </p>

            <p>
              <strong>Terminate your INNsight.com account:</strong> Upon your
              request to terminate your account, we will deactivate or delete
              your account and information from our active databases. However,
              some information may be retained in our files to prevent fraud,
              troubleshoot problems, assist with any investigations, enforce our
              Terms of Use and/or comply with legal requirements. &nbsp;
            </p>

            <p>
              <strong>Opt out of email marketing:</strong> You can unsubscribe
              from our marketing email list at any time by clicking on the
              unsubscribe link in the emails that we send or by contacting us
              using the details provided below. You will then be removed from
              the marketing email list – however, we will still need to send you
              service-related emails that are necessary for the administration
              and use of your account.
            </p>

            <h2 className="headingpri" ref={myRef10}>
              <strong>
                DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS? &nbsp;
              </strong>
            </h2>
            <p>
              <strong>
                <em>In Short:</em>
              </strong>
              <em>
                {" "}
                Yes, if you are a resident of California, you are granted
                specific rights regarding access to your personal information.{" "}
              </em>
              &nbsp;&nbsp;
            </p>

            <p>
              California Civil Code Section 1798.83, also known as the “Shine
              The Light” law, permits our users who are California residents to
              request and obtain from us, once a year and free of charge,
              information about categories of personal information (if any) we
              disclosed to third parties for direct marketing purposes and the
              names and addresses of all third parties with which we shared
              personal information in the immediately preceding calendar year.
              If you are a California resident and would like to make such a
              request, please submit your request in writing to us using the
              contact information provided below.{" "}
            </p>

            <p>
              If you are under 18 years of age, reside in California, and have a
              registered account with INNsight.com, you have the right to
              request removal of unwanted data that you publicly post on the
              websites. To request removal of such data, please contact us using
              the contact information provided below, and include the email
              address associated with your account and a statement that you
              reside in California. We will make sure the data is not publicly
              displayed on the websites, but please be aware that the data may
              not be completely or comprehensively removed from our systems.
            </p>

            <h2 className="headingpri">
              <strong>
                California Online Privacy Protection Act Compliance
              </strong>
            </h2>
            <p>
              Because we value your privacy we have taken the necessary
              precautions to be in compliance with the California Online Privacy
              Protection Act. We therefore will not distribute your personal
              information to outside parties without your consent.
            </p>

            <p>
              As part of the <em>California Online Privacy Protection Act</em>,
              all users of our site may make any changes to their information at
              anytime by logging into their control panel at My INNsight and
              going to the 'My Account' settings page.
            </p>

            <h2 className="headingpri" ref={myRef11}>
              <strong>
                HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
                YOU?{" "}
              </strong>
            </h2>
            <p>
              Based on the laws of some countries, you may have the right to
              request access to the personal information we collect from you,
              change that information, or delete it in some circumstances. To
              request to review, update, or delete your personal information,
              please submit a request form by clicking We will respond to your
              request within 30 days.{" "}
            </p>

            <h2 className="headingpri">
              <strong>Online Privacy Policy Only</strong>
            </h2>
            <p>
              This online Privacy Policy applies only to information collected
              through our website and not to information collected offline.
            </p>

            <h2 className="headingpri">
              <strong>Terms and Conditions</strong>
            </h2>
            <p>
              Please also visit our Terms and Conditions section establishing
              the use, disclaimers, and limitations of liability governing the
              use of our website at{" "}
            </p>

            <h2 className="headingpri">
              <strong>Your Consent</strong>
            </h2>
            <p>
              By using our Site(s), you consent to our website’s Privacy Policy.
            </p>

            <h2 className="headingpri">
              <strong>Changes to our Privacy Policy</strong>
            </h2>
            <p>
              <strong>
                <em>In Short:</em>
              </strong>
              <em>
                {" "}
                Yes, we will update this policy as necessary to stay compliant
                with relevant laws.
              </em>{" "}
              &nbsp;
            </p>

            <p>
              We may update this Privacy Policy from time to time. The updated
              version will be indicated by an updated “Revised” date and the
              updated version will be effective as soon as it is accessible. If
              we make material changes to this Privacy Policy, we may notify you
              either by prominently posting a notice of such changes or by
              directly sending you a notification. We encourage you to review
              this Privacy Policy frequently to be informed of how we are
              protecting your information.{" "}
            </p>

            <p>
              If we decide to change our Privacy Policy, we will post those
              changes on this page, send an email notifying you of any changes,
              and/or update the Privacy Policy modification date below.
            </p>

            <p>This policy was last modified on 5/25/2022.</p>

            <h2 className="contactAlign">
              <strong>Contacting Us </strong>
            </h2>
            <p>
              If there are any questions regarding this Privacy Policy, you may
              contact us using the information below{" "}
              {/* <a href="www.innsight.com " className="text-primary">www.innsight.com</a>. */}
              <a target="blank" href="https://www.innsight.com/">
              www.innsight.com
              </a>
            </p>
            <p>
              <strong>INNsight.com, Inc.</strong>
            </p>
            <p>
              2445 Ocean Avenue<br></br>San Francisco, California 94127<br></br>
              United States of America<br></br>
            </p>
            <p>&nbsp;</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default PrivacyPolicyComponent;
