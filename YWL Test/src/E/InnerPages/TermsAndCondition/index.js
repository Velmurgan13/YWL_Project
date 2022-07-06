import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { getSeoDescriptionData } from "../../../DataLayer/datalayerUtilities";
import "./index.css";
import BannerContainer from "../BannerComponent/BannerContainer";
import { motion } from "framer-motion";
// FaqObject data:
// import { faqContentObject } from '../../../E/Yosemitewestgate/Data/faqData'

const TermsAndConditionComponent = () => {
  const [seoData, setPropertySeodata] = useState([]);
  useEffect(() => {
    fetchSeoProperties();
  }, []);

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData("12");
    setPropertySeodata(response.data);
  };

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
    <section>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.4 }}
      >
        <BannerContainer seoData={seoData} />
      </motion.div>
      <div className="container px-4 px-md-1">
        <div className="l-height">
          <p className="mb-0">
            <strong className="agreeTitle">
              Agreement Between Customer and INNsight.com, Inc.
            </strong>
          </p>
          <p className="agreeTitle">
            {" "}
            Welcome to the hospitality business website for Stage Coach Lodge{" "}
            <em>Powered by INNsight.com</em> (the "Website"). This Website is
            provided solely to assist customers in gathering travel information,
            determining the availability of lodging-related goods and services,
            making legitimate reservations or otherwise transacting business
            with Stage Coach Lodge and for no other purposes.
          </p>
          <p className="agreeTitle">
            This Website and its pages, the content and infrastructure of these
            pages, and the online reservation service provided on these pages
            and through this Website (the "service") are owned, operated and
            provided by INNsight.com, Inc. ("INNsight.com", "us", "we" or "our")
            and licensed to Stage Coach Lodge. This Website is provided for your
            personal, non-commercial use only, subject to the terms and
            conditions set out below. The term "you" refers to the customer
            visiting and searching for accommodations or engaging in business
            activities with Stage Coach Lodge via the Website and/or booking a
            reservation through us on this Website, or through our customer
            service agents.
          </p>
          <p className="agreeTitle" s>
            These Terms and Conditions – as may be amended from time to time –
            apply to all of our services directly or indirectly (through
            distributors) made available online, by email or by telephone. By
            accessing, browsing and using our Website and/or by completing a
            reservation, you acknowledge and agree to have read, understood and
            agreed to the terms and conditions set out below (including the{" "}
            <a
              href="https://alpha.yosemitewestgate.com/privacy-policy"
              target="blank"
            >
              Privacy Statement
            </a>
            ). If you do not accept all of these terms and conditions, please do
            not use this Website. Be sure to return to this page periodically to
            review the most current version of the Agreement. We reserve the
            right at any time, at our sole discretion, to change or otherwise
            modify the Agreement without prior notice, and your continued access
            or use of this Website signifies your acceptance of the updated or
            modified Agreement.
          </p>
        </div>
        <div class="headingpri">
          <strong>INNsight.com Terms &amp; Conditions</strong>
        </div>
        <ul class="indexing MT10">
          <li>
            <a class="one" onClick={executeScroll}>
              <strong>1. Scope of Our Service</strong>
            </a>
          </li>
          <li>
            <a class="two" onClick={executeScroll1}>
              <strong>2. Use of The Website</strong>
            </a>
          </li>
          <li>
            <a class="three" onClick={executeScroll2}>
              <strong>3. Rates and Lowest Price Promise</strong>
            </a>
          </li>
          <li>
            <a class="four" onClick={executeScroll3}>
              <strong>4. Privacy</strong>
            </a>
          </li>
          <li>
            <a class="five" onClick={executeScroll4}>
              <strong>5. Free of Charge</strong>
            </a>
          </li>
          <li>
            <a class="six" onClick={executeScroll5}>
              <strong>6. Credit Card Security Standards</strong>
            </a>
          </li>
          <li>
            <a class="seven" onClick={executeScroll6}>
              <strong>7. Reviews aka INNsights</strong>
            </a>
          </li>
          <li>
            <a class="eight" onClick={executeScroll7}>
              <strong>8. Reservation Cancellations</strong>
            </a>
          </li>
          <li>
            <a class="nine" onClick={executeScroll8}>
              <strong>9. Currency Converter</strong>
            </a>
          </li>
          <li>
            <a class="ten" onClick={executeScroll9}>
              <strong>10. Copyright and Trademark Notices</strong>
            </a>
          </li>
          <li>
            <a class="eleven" onClick={executeScroll10}>
              <strong>11. Travel Destinations</strong>
            </a>
          </li>
          <li>
            <a class="twelve" onClick={executeScroll11}>
              <strong>12. Limited Liability Disclaimer</strong>
            </a>
          </li>
          <li>
            <a class="thirteen" onClick={executeScroll12}>
              <strong>13. Software Available On This Website</strong>
            </a>
          </li>
          <li>
            <a class="fourteen" onClick={executeScroll13}>
              <strong>14. Indemnification</strong>
            </a>
          </li>
          <li>
            <a class="fifteen" onClick={executeScroll14}>
              <strong>15. Miscellaneous</strong>
            </a>
          </li>
          <li>
            <a class="sixteen" onClick={executeScroll15}>
              <strong>16. About INNsight.com</strong>
            </a>
          </li>
          <li>
            <a class="seventeen" onClick={executeScroll16}>
              <strong>17. Service Help</strong>
            </a>
          </li>
        </ul>
        <h5 class="fs-24" ref={myRef}>
          {" "}
          1. Scope of our Service
        </h5>
        <p className="l-height">
          Through this standalone hospitality Website Powered by INNsight, we
          (INNsight.com) provide an online digital marketing and reservations
          platform through which Stage Coach Lodge can advertise their products
          and services, and through which visitors to the Website can make
          reservations and engage or communicate with the business. By making a
          reservation through INNsight.com, you enter into a direct and legally
          binding contractual relationship with Stage Coach Lodge. From the
          point at which you make your reservation, we act solely as an
          intermediary between you and Stage Coach Lodge, transmitting the
          details of your reservation to Stage Coach Lodge and sending you a
          confirmation email for and on behalf of the business. Your
          confirmation email is your contract between Stage Coach Lodge and
          yourself.
        </p>
        <p className="l-height">
          When rendering our services, the information that we disclose is based
          on the information provided to us by Stage Coach Lodge. As such, Stage
          Coach Lodge is given access to an extranet through which they are
          fully responsible for updating all property and service description
          content, rates, availability and other information which is displayed
          on our Website. Although we will use reasonable skill and care in
          performing our services we will not verify if, and cannot guarantee
          that, all information is accurate, complete or correct, nor can we be
          held responsible for any errors including manifest and typographical
          errors, any interruptions whether due to any temporary and/or partial
          breakdown, repair, upgrade or maintenance of our Website or otherwise,
          inaccurate, misleading or untrue information or non-delivery of
          information. Stage Coach Lodge remains responsible at all times for
          the accuracy, completeness, and correctness of the descriptive
          information including the rates and availability displayed on our
          Website based on a contractual agreement between Stage Coach Lodge or
          third party data provider and INNsight.com. INNsight.com does not
          constitute and should not be regarded as a recommendation or
          endorsement of the quality, service level or rating of Stage Coach
          Lodge. INNsight.com does not guarantee adherence to The Americans with
          Disabilities Act (ADA) Title III or Website Content Accessibility
          Guidelines (WCAG) 2.1 on behalf of Stage Coach Lodge.
        </p>
        <h5 class="fs-24" ref={myRef1}>
          2. Use of the Website
        </h5>
        As a condition of your use of this Website, you warrant that:
        <div className="l-height">
          <p>
            1. You possess the legal authority to create a binding legal
            obligation,
          </p>
          <p>2. You will use this Website in accordance with this Agreement,</p>
          <p>
            3. You will only use this Website to make legitimate reservations
            for you or for another person for whom you are legally authorized to
            act,
          </p>
          <p>
            4. All information supplied by you on this Website is true,
            accurate, current and complete, and
          </p>
          <p>
            5. If you have an INNsight.com account, you will safeguard your
            account information and will supervise and be completely responsible
            for any use of your account by anyone other than you. We retain the
            right at our sole discretion to deny access to anyone to this
            Website and the services we offer, at any time and for any reason,
            including, but not limited to, for violation of this Agreement
          </p>

          <p className="mt-2">
            Our services are made available for personal and non-commercial use
            only. Therefore, you are not allowed to re-sell, deep-link, use,
            copy, monitor (e.g. spider, scrape), display, download or reproduce
            any content or information, software, products or services available
            on our Website for any commercial or competitive activity or
            purpose.
          </p>
        </div>
        <h5 class="fs-24" ref={myRef2}>
          3. Rates and Lowest Price Promise
        </h5>
        <div className="l-height">
          <p>
            The prices or rates on our site are highly competitive. All
            lodging-related rates on the INNsight.com platform/Website are per
            room for your entire stay and are displayed including transient or
            lodging tax and all other taxes per the property, unless stated
            otherwise on our Website or in the confirmation email.
          </p>
          <p></p>Sometimes cheaper rates are available at our Website for a
          specific stay or service at a hospitality business, however, these
          rates made by the business may carry special restrictions and
          conditions, for example in respect of cancellation and refund. Please
          check the rate details thoroughly for any such conditions prior to
          making your reservation.
          <p>
            In the event of a strike-thru rate, where we have struck through the
            original price and offered a discounted rate, we have simply relayed
            a deal that the business has set up in the extranet based on their
            parameters of deal length, duration, and discount percentage or
            amount savings. We cannot guarantee the authenticity of the
            mark-down percentage but will render and provide the ability to book
            at the purported price.
          </p>
          <p>
            We want you to pay the lowest price possible for your stay at a
            hospitality business. Should you find your room or accommodations,
            with the same reservations conditions, at a lower rate on the
            Internet after you have made a reservation through us, we will match
            the difference between our rate and the lower rate. Under the terms
            and conditions of the INNsight.com Lowest Price Promise, if you find
            a lower rate on a competitor's site up until your Cancellation
            Period, we will work with the business to match the lower discovered
            rate.
          </p>
          <p>
            Please Note: The Lowest Price Promise will be ineligible in the
            event that you are redirected to a third-party booking engine from
            Stage Coach Lodge’s hospitality Website Powered by INNsight.
          </p>
          <p>
            In order to contest a lower published rate elsewhere, you will need
            to contact INNsight at help@innsight.com with the details of where
            and when you came across the lower published rate. Upon review for
            accuracy, customer service will edit your reservation's rate to
            reflect the discount, and resend you an updated reservation
            confirmation.
          </p>
          <h5 class="fs-24" ref={myRef3}>
            4. Privacy
          </h5>
          <p>
            INNsight.com uses high ethical standards and respects your privacy.
            Except for disclosures required by law in any relevant jurisdiction
            and the disclosure of your name, email address and your credit card
            details for completing your reservation with the relevant business
            of your choice, we will not disclose your personal information to
            third parties without your consent. Please have a look at our
            Privacy Policy for further information. All partner businesses are
            required contractually to maintain the privacy rights of guests and
            guard their personally identifiable information with strict
            adherence to hospitality industry legal standards. INNsight.com
            works in earnest to address the Privacy Rights detailed in The
            European Union’s General Data Protection Regulation (GDPR) and The
            State of California’s Privacy Protection Laws on behalf of all of
            our users.
          </p>
        </div>
        <div className="l-height">
          <h5 class="fs-24" ref={myRef4}>
            5. Free of charge
          </h5>
          <p>
            Our service to customers who are looking to discover places to stay,
            venues to dine and be entertained is free of charge. Unlike many of
            our competitors, we will not charge you for our service or add any
            additional reservation or booking fees to the rates displayed on our
            site. We will not charge your credit card, as you will pay Yosemite
            Southgate Hotel and Suites or 3rd Party Data Provider directly for
            your stay or service. We are simply a search and booking platform
            for business with the simple goal of finding the right place for
            your stay, dine, or be entertained at the right price.
          </p>
        </div>
        <div className="l-height">
          <h5 class="fs-24" ref={myRef5}>
            6. Credit Card Security Standards
          </h5>
          <p>
            Many partner businesses require credit card details in order to
            guarantee your reservation. As such, we will send your credit card
            information directly to Yosemite Southgate Hotel and Suites at which
            your booking is made and we may verify (i.e. pre-authorize) your
            credit card as well. In order to safeguard and encrypt your credit
            card information when in transit to us, we use Secure Socket Layer
            (SSL) and Transport Layer Security (TLS) technology provided by
            industry leader GoDaddy, Inc. for our services..
          </p>
          <p>
            For certain rates or special offers, please note that your credit
            card may be pre-authorized or charged (sometimes without any option
            for refund) upon reservation and confirmation of the reservation by
            Yosemite Southgate Hotel and Suites or 3rd Party Data Provider.
            Please check the property and purchase details thoroughly for any
            such conditions prior to making your reservation. In some cases,
            INNsight.com reserves the right to resell products or services
            provided by 3rd Party Data Providers such as Priceline Partner
            Network upon which you will additionally be subject to the said
            party’s terms of use and conditions.
          </p>
          <p>
            In the event of credit card fraud or unauthorized use of your credit
            card by third parties, most banks and credit card companies bear the
            risk and cover all the charges resulting from such fraud or misuse,
            which may sometimes be subject to a deductible. In the event that
            your credit card company or bank charges you for the deductible
            because of unauthorized transactions resulting from a reservation
            made on our Website, we will pay you this deductible, up to an
            aggregate amount of USD $50 (or the equivalent in your local
            currency). In order to be indemnified, please make sure that you
            report this fraud to your credit card provider (in accordance with
            its reporting rules and procedures) and contact us immediately by
            email at customerservice@INNsight.com. Please state 'credit card
            fraud' in the subject line of your email and provide us with
            evidence of the charged deductible (e.g. policy of the credit card
            company). This indemnification only applies to credit card
            reservations made using INNsight.com’s secure server and does not
            cover the unauthorized use of your credit card as a result of your
            default or negligence and through no fault of our own while using
            the secure server.
          </p>
        </div>
        <div className="l-height">
          <h5 class="fs-24" ref={myRef6}>
            7. Reviews aka INNsights
          </h5>
          <p>
            We appreciate the sharing of our community's insights. Please be
            aware that by submitting content to this Website by electronic mail,
            postings on this Website or otherwise, including any business
            reviews aka INNsights, photographs, video, questions, comments,
            suggestions, ideas or the like contained in any submissions
            (collectively, "Submissions"), you (a) grant INNsight.com and its
            affiliates a non-exclusive, royalty-free, perpetual, transferable,
            irrevocable and fully sub-licensable right to use, reproduce,
            modify, adapt, translate, distribute, publish, create derivative
            works from and publicly display and perform such Submissions
            throughout the world in any media, now known or hereafter devised;
            and (b) grant INNsight.com and its affiliates and sub-licensees the
            right to use the name that you submit in connection with such
            Submission, if they choose. However, you acknowledge that
            INNsight.com may choose to provide attribution of your comments or
            reviews (for example, listing your name and hometown on an INNsight
            review that you submit) at our discretion. You further grant
            INNsight.com the right to pursue at law any person or entity that
            violates your or INNsight.com rights in the Submissions by a breach
            of this Agreement. We take no responsibility and assume no liability
            for any Submissions posted or submitted by you. If you do not agree
            to these terms and conditions, please do not provide us with any
            Submissions..
          </p>
          <p>
            You are fully responsible for the content of your Submissions,
            specifically including, but not limited to, reviews posted to this
            Website. You are prohibited from posting or transmitting to or from
            this Website:
          </p>
          <ol type="I" className="pl-3">
            <li>
              {" "}
              any unlawful, threatening, libelous, defamatory, obscene,
              pornographic, or other material or content that would violate
              rights of publicity and/or privacy or that would violate any law;
            </li>
            <li>
              any commercial material or content including, but not limited to,
              solicitation of funds, advertising, or marketing of any goods or
              services;
            </li>
            <li>
              any material or content that infringes, misappropriates or
              violates any copyright, trademark, patent right or other
              proprietary rights of any third party. You shall be solely liable
              for any damages resulting from any violation of the foregoing
              restrictions, or any other harm resulting from your posting of
              content to this Website.
            </li>
          </ol>
          <p>
            You acknowledge that INNsight.com has the right to control (e.g.
            use, publish, remove) any content you submit without notice to you.
            If you submit more than one review for the same business, we reserve
            the right to choose the most eligible submission for use.
          </p>
          <p>
            If you believe in good faith that materials hosted by us infringe
            your copyright, you (or your agent) may send us a written notice
            that includes the following information:
          </p>

          <ol type="1" className="pl-3">
            <li>
              A clear identification of the copyrighted work you claim was
              infringed.
            </li>
            <li>
              A clear identification of the material you claim is infringing the
              copyrighted work and information that will allow us to locate that
              material on the Website, such as a link to the infringing
              material.
            </li>
            <li>
              Your contact information so that we can reply to your complaint,
              preferably including an email address and telephone number.
            </li>
            <li>
              . A statement that you have a "good faith belief that the material
              that is claimed as copyright infringement is not authorized by the
              copyright owner, its agent, or the law."
            </li>
            <li>
              A statement that "the information in the notification is accurate,
              and under penalty of perjury, the complaining party is authorized
              to act on behalf of the owner of an exclusive right that is
              allegedly infringed."
            </li>
            <li>
              The notice must be signed by the person authorized to act on
              behalf of the owner of an exclusive right that is allegedly
              infringed.
            </li>
            <li className="font-weight-bold">
              Notices with respect to this Website should be sent to:
            </li>
          </ol>
          <p className="mb-0 pb-1">
            INNsight.com, Inc., 2445 Ocean Avenue, San Francisco, CA 94127;
            legal@INNsight.com
          </p>
          <p className="mb-0 pb-1">
            We will review and address all notices that comply with the
            requirements above.
          </p>
          <p className="mb-0 pb-1">
            We suggest that you consult your legal advisor before filing a
            notice or counter-notice. Also, be aware that you may be liable for
            damages if you make a false claim of copyright infringement.
          </p>
        </div>
        <div className="l-height">
          <h5 class="fs-24" ref={myRef7}>
            8. Reservation Cancellations
          </h5>
          <p>
            By making a reservation with Yosemite Southgate Hotel and Suites,
            you accept and agree to the relevant cancellation and no-show policy
            of Yosemite Southgate Hotel and Suites, and to any additional
            (delivery) terms and conditions of the business that may apply to
            your reservation or during your stay, including for services
            rendered and/or products offered by the business (the delivery terms
            and conditions of a business can be obtained from Yosemite Southgate
            Hotel and Suites). The general cancellation and no-show policy of
            Yosemite Southgate Hotel and Suites are made available on our
            Website at the business information pages, during the reservation
            procedure, and in the confirmation email. Please note that certain
            rates or special offers are not eligible for cancellation or change.
            Please check the details thoroughly for any such conditions prior to
            making your reservation.
          </p>
          <p>
            If you wish to review, adjust or cancel your reservation, please
            revert to the confirmation email and follow the instructions
            therein. Please note that you may be charged for your cancellation
            in accordance with the business’ cancellation and no-show policy. We
            recommend that you read the cancellation and no-show policy of the
            business carefully prior to making your reservation.
          </p>
        </div>
        <div className="l-height">
          {" "}
          <h5 class="fs-24" ref={myRef8}>
            9 Currency Converter
          </h5>
          <p>
            By making a reservation with Yosemite Southgate Hotel and Suites,
            you accept and agree to the relevant cancellation and no-show policy
            of Yosemite Southgate Hotel and Suites, and to any additional
            (delivery) terms and conditions of the business that may apply to
            your reservation or during your stay, including for services
            rendered and/or products offered by the business (the delivery terms
            and conditions of a business can be obtained from Yosemite Southgate
            Hotel and Suites). The general cancellation and no-show policy of
            Yosemite Southgate Hotel and Suites are made available on our
            Website at the business information pages, during the reservation
            procedure, and in the confirmation email. Please note that certain
            rates or special offers are not eligible for cancellation or change.
            Please check the details thoroughly for any such conditions prior to
            making your reservation.
          </p>
          <p>
            Currency rates are based on various publicly available sources and
            should be used as guidelines only. Rates are not verified as
            accurate, and actual rates may vary. Currency quotes are not
            necessarily updated every day. Check the date on the currency
            converter feature for the day that currency was last updated. The
            information supplied by this application is believed to be accurate,
            but INNsight.com does not warrant or guarantee such accuracy. When
            using this information for any financial purpose, we advise you to
            consult a qualified professional to verify the accuracy of the
            currency rates. We do not authorize the use of this information for
            any purpose other than your personal use
          </p>
        </div>
        <div className="l-height">
          {" "}
          <h5 class="fs-24" ref={myRef9}>
            10. Copyright and Trademark Notices
          </h5>
          <p>
            By making a reservation with Yosemite Southgate Hotel and Suites,
            you accept and agree to the relevant cancellation and no-show policy
            of Yosemite Southgate Hotel and Suites, and to any additional
            (delivery) terms and conditions of the business that may apply to
            your reservation or during your stay, including for services
            rendered and/or products offered by the business (the deliver y
            terms and conditions of a business can be obtained from Yosemite
            Southgate Hotel and Suites). The general cancellation and no-show
            policy of Yosemite Southgate Hotel and Suites are made available on
            our Website at the business information pages, during the
            reservation procedure, and in the confirmation email. Please note
            that certain rates or special offers are not eligible for
            cancellation or change. Please check the details thoroughly for any
            such conditions prior to making your reservation.
          </p>
          <p>
            Further, each member agrees that we may reproduce in whole or in
            part any photographic material supplied by such member in the
            promotion of either such member's property or the promotion of the
            Site
          </p>
          <p>
            All contents of this Website are copyrighted ©2021 INNsight.com,
            Inc. INNsight.com is not responsible for content on Websites
            operated by parties other than INNsight.com. The INNsight.com logo
            and the term INNsight are registered trademarks in the U.S. and/or
            other countries of INNsight.com, Inc. Other product and company
            names mentioned herein may be the trademarks of their respective
            owners.
          </p>
          <p>
            If you are aware of an infringement of our brand, please let us know
            by emailing us at: legal@innsight.com.
          </p>
          <p>
            You can learn more about the permissible use of the INNsight brand
            here: https://www.innsight.com/share-code
          </p>
        </div>
        <div className="l-height">
          <h5 class="fs-24" ref={myRef10}>
            11. Travel Destinations
          </h5>
          <p>
            Although most travel, including travel to international
            destinations, is completed without incident, travel to certain
            destinations may involve greater risk than others. INNsight.com
            urges passengers to review travel prohibitions, warnings,
            announcements and advisories issued by the United States Government
            prior to booking travel to international destinations. Information
            on conditions in various countries and the level of risk associated
            with travel to particular international destinations can be found at
            www.state.gov, www.tsa.gov, www.dot.gov, www.faa.gov, www.cdc.gov,
            www.treas.gov/ofac and www.cbp.gov.
          </p>
        </div>
        <div className="l-height">
          <h5 class="fs-24" ref={myRef11}>
            12. Limited Liability Disclaimer
          </h5>
          <p>
            <strong className="my-5">
              IN NO EVENT WILL THE WEBSITE, OUR PARENT (INNsight.com, Inc.)
            </strong>{" "}
            or any of our officers, directors, employees, representatives,
            subsidiaries, affiliated companies, distributors, affiliate
            (distribution) partners, licensees, agents or others involved in
            creating, sponsoring, promoting, or otherwise making available the
            site and its contents shall be liable for:
          </p>
          <ol type="I" className="pl-3">
            <li>
              (i) any punitive, special, indirect or consequential loss or
              damages, any loss of production, loss of profit, loss of revenue,
              loss of contract, loss of or damage to goodwill or reputation,
              loss of claim,
            </li>
            <li>
              any inaccuracy relating to the (descriptive) information
              (including rates, availability and ratings) of the business as
              made available on our Website(s),
            </li>
            <li>
              the services rendered or the products offered by the business,
            </li>
            <li>
              any (direct, indirect, consequential or punitive) damages, losses
              or costs suffered, incurred or paid by you, pursuant to, arising
              out of or in connection with the use, inability to use or delay of
              our Website, or
            </li>
            <li>
              for any (personal) injury, death, property damage, or other
              (direct, indirect, special, consequential or punitive) damages,
              losses or costs suffered, incurred or paid by you, whether due to
              (legal) acts, errors, breaches, (gross) negligence, willful
              misconduct, omissions, non-performance, misrepresentations, tort
              or strict liability by or (wholly or partly) attributable to the
              business (its employees, directors, officers, agents,
              representatives or affiliated companies), including any (partial)
              cancellation, overbooking, strike, force majeure or any other
              event beyond our control.
            </li>
          </ol>
        </div>
        <div className="l-height">
          <h5 class="fs-24" ref={myRef12}>
            13. Software Available On This Website
          </h5>
          <p>
            Any software that is made available to download from this Website
            ("Software") is the copyrighted work of INNsight.com. Your use of
            such Software is governed by the terms of the End User License
            Agreement, if any, which accompanies, or is included with, the
            Software ("License Agreement"). You may not install or use any
            Software that is accompanied by or includes a License Agreement
            unless you first agree to the License Agreement terms. For any
            Software made available for download on this Website not accompanied
            by a License Agreement, we hereby grant to you, the user, a limited,
            personal, non-transferable license to use the Software for viewing
            and otherwise using this Website in accordance with these terms and
            conditions and for no other purpose.
          </p>
          <p>
            Please note that all Software, including, without limitation, all
            HTML code and LAMP controls contained on this Website, is owned by
            the INNsight.com, Inc. and is protected by copyright laws and
            international treaty provisions. Any reproduction or redistribution
            of the Software is expressly prohibited and may result in severe
            civil and criminal penalties. Violators will be prosecuted to the
            maximum extent possible.
          </p>
          <p>
            WITHOUT LIMITING THE FOREGOING, COPYING OR REPRODUCTION OF THE
            SOFTWARE TO ANY OTHER SERVER OR LOCATION FOR FURTHER REPRODUCTION OR
            REDISTRIBUTION IS EXPRESSLY PROHIBITED. THE SOFTWARE IS WARRANTED,
            IF AT ALL, ONLY ACCORDING TO THE TERMS OF THE LICENSE AGREEMENT.
          </p>
        </div>
        <div className="l-height">
          <h5 class="fs-24" ref={myRef13}>
            14. Indemnification
          </h5>
          <p>
            You agree to defend and indemnify INNsight.com, Inc., and/or their
            respective suppliers and/or distributors and any of their officers,
            directors, employees and agents from and against any claims, causes
            of action, demands, recoveries, losses, damages, fines, penalties or
            other costs or expenses of any kind or nature including but not
            limited to reasonable legal and accounting fees, brought by third
            parties as a result of:
          </p>
          <p>
            (a) Your breach of this Agreement or the documents referenced
            herein;
          </p>
          <p>
            (b) Your violation of any law or the rights of a third party; or
          </p>
          <p>(c) Your use of this Website.</p>
          <p className="ls-2">
            YOU HEREBY AGREE TO INDEMNIFY, DEFEND AND HOLD THE SITE AND ANY
            MEMBER OF INNsight.com, Inc. HARMLESS FROM AND AGAINST ANY AND ALL
            LIABILITY AND COSTS INCURRED BY THE INDEMNIFIED PARTIES IN
            CONNECTION WITH ANY CLAIM ARISING OUT OF YOUR USE OF THE SITE OR
            OTHERWISE RELATING TO THE BUSINESS WE CONDUCT ON THE SITE
            (INCLUDING, WITHOUT LIMITATION, ANY POTENTIAL OR ACTUAL
            COMMUNICATION, TRANSACTION OR DISPUTE BETWEEN YOU AND ANY OTHER USER
            OR THIRD PARTY), ANY CONTENT POSTED BY YOU OR OTHER USERS OF YOUR
            ACCOUNT TO THE SITE OR ANY BREACH BY YOU OF THESE TERMS OR THE
            REPRESENTATIONS, WARRANTIES AND COVENANTS MADE BY YOU HEREIN,
            INCLUDING, WITHOUT LIMITATION, ATTORNEYS' FEES AND COSTS. YOU SHALL
            COOPERATE AS FULLY AS REASONABLY REQUIRED IN THE DEFENSE OF ANY
            CLAIM. WE RESERVE THE RIGHT, AT OUR OWN EXPENSE, TO ASSUME THE
            EXCLUSIVE DEFENSE AND CONTROL OF ANY MATTER OTHERWISE SUBJECT TO
            INDEMNIFICATION BY YOU AND YOU SHALL NOT, IN ANY EVENT, SETTLE ANY
            MATTER WITHOUT OUR WRITTEN CONSENT.
          </p>
        </div>
        <div className="l-height">
          <h5 class="fs-24" ref={myRef14}>
            15. Miscellaneous
          </h5>
          <p>
            Unless stated otherwise, the software required for our services or
            available at or used by our Website and the intellectual property
            rights (including the copyrights) of the contents, information, and
            material on our Website are owned by INNsight.com, Inc., its
            suppliers or providers.
          </p>
          <p>
            These terms and conditions and the provision of our services shall
            be governed by and construed in accordance with United States of
            America law and any dispute arising out of these general terms and
            conditions and our services shall exclusively be submitted to the
            competent courts in the State of California, United States of
            America.
          </p>
          <p>
            <strong>Your Record of These Terms:</strong>We do not separately
            file the Terms entered into by each user of the Site. Please make a
            copy of these Terms for your records by printing and/or saving a
            downloaded copy of these Terms on your personal computer.
          </p>
          <p>
            <strong>No Agency:</strong> Our relationship is that of independent
            contractors, and no agency, partnership, joint venture,
            employee-employer or franchisor-franchisee relations is intended or
            created by these Terms or your use of the Site.
          </p>
          <p>
            If any provision of these terms and conditions is or becomes
            invalid, unenforceable or non-binding, you shall remain bound by all
            other provisions hereof. In such event, such invalid provision shall
            nonetheless be enforced to the fullest extent permitted by
            applicable law, and you will at least agree to accept a similar
            effect as the invalid, unenforceable or non-binding provision, given
            the contents and purpose of these terms and conditions.
          </p>
          <p>
            <strong>Enforcement of These Terms:</strong>Enforcement of These
            Terms: We may immediately terminate any user's access to or use of
            the Site due to such user's breach of these Terms or any other
            unauthorized use of the Site. However, we do not guarantee that we
            will take action against all breaches of these Terms. Our failure to
            take immediate action with respect to a breach by you or others does
            not waive our right to act with respect to such breach or any other
            breach. Any action or inaction by us in response to any breach of
            these Terms does not limit our rights with respect to actions we may
            take in response to any other similar or different type of breach.
          </p>
        </div>
        <div className="l-height">
          <h5 class="fs-24" ref={myRef15}>
            16. About INNsight.com
          </h5>
          <p>
            All services are rendered by INNsight.com, Inc., which is a
            corporation, incorporated under the laws of The State of Delaware,
            United States of America and having its corporate offices at 2445
            Ocean Avenue, San Francisco, CA 94127.
          </p>
          <p>
            INNsight.com has its headquarters in San Francisco, California and
            has a true subsidiary in Mumbai, India. The branch office located at
            310 Quantum Towers, Ram Baug in Mumbai, Maharashtra, India, provides
            an exclusive supporting role to and for the benefit of INNsight.com.
            The branch office does not have any power or authority to render the
            service, to represent INNsight.com or to enter into any contract in
            the name of, for or on behalf of INNsight.com.
          </p>
        </div>
        <div className="mb-5">
          <h5 class="fs-24" ref={myRef16}>
            17. Service Help
          </h5>
          <div>
            For quick answers to your questions or ways to contact us, visit our
            FAQs. Or, you can write to us at:
          </div>
          <div>Attn: Customer Service INNsight.com</div>
          <div>help@innsight.com</div>
          <div>2445 Ocean Avenue</div>
          <div>San Francisco, CA 94127</div>
          <p>Revised and Effective as of May 25, 2021</p>
          <p>© 2021 INNsight.com, Inc.</p>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditionComponent;
