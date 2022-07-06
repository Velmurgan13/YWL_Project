import React, { useState, useEffect } from "react";
import { getSeoDescriptionData } from "../../../DataLayer/datalayerUtilities";
import "../../InnerPages/CookiePolicy/index.scss";
// image import statement:
import {Link} from 'react-router-dom'
import BannerContainer from "../BannerComponent/BannerContainer";
import { useRecoilValue } from "recoil";
import {
  propertyDataSelector,
  seoThemeDetails,
} from "../../../Recoil/themeModule";
import { motion } from 'framer-motion';

const CookiePolicyComponent = () => {
  const propertyData = useRecoilValue(propertyDataSelector);
  const { cookies: seoId } = useRecoilValue(seoThemeDetails);
  const [toggleState, setToggleState] = useState(1);
  const [clicked, setClicked] = useState(false);
  const [seoData, setPropertySeodata] = useState([]);
  useEffect(() => {
    fetchSeoProperties();
  }, []);

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData(seoId);
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
      <div className="container Cookie-page">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-justify  width100tabmob messages_bar MT10 fontresize cookietxt">
          <div class="F30">Cookie Policy</div>
          <p>
            This Cookie Policy explains how INNsight.com, Inc. (collectively "
            <strong>INNsight</strong>", "<strong>we</strong>", "
            <strong>us</strong>", and "<strong>ours</strong>") use Cookies and
            similar technologies to recognize you when you visit our websites at
            www.innsight.com, ("<strong>us</strong>"). This Policy explains what
            these technologies are and why we use them, as well as your rights
            to control our use of them.
          </p>

          <p>
            In some cases, we may use Cookies to collect personal information,
            or data that could become personal information if we combine it with
            other data points. In such cases our <strong>Privacy Policy</strong>{" "}
            (
            <a
              className=""
              target="_blank"
              href="http://www.innsight.com/privacy-policy"
            >
              www.innsight.com/privacy-policy
            </a>{" "}
            or{" "}
            <a
              className=""
              target="_blank"
              href="https://www.yosemitewestgate.com/privacy-policy"
            >
              www.yosemitewestgate.com/privacy-policy
            </a>
            ) will apply in addition to this <strong>Cookie Policy</strong>.
          </p>
          <h2>What Are Cookies?</h2>

          <p>
            Cookies are small data files that are placed on your computer or
            mobile device when you visit a website. Cookies are widely used by
            website owners in order to make their websites work, or to work more
            efficiently, as well as to provide reporting information.
          </p>

          <p>
            Cookies set by the website owner (in this case, INNsight or are
            called "first party Cookies". Cookies set by parties other than the
            website owner are called "third party Cookies". Third party Cookies
            enable third party features or functionality to be provided on or
            through the website (e.g. like advertising, interactive content and
            analytics). The parties that set these third party Cookies can
            recognize your computer both when it visits the website in question
            and also when it visits certain other websites.
          </p>
          <h2>Why Do We Use Cookies?</h2>

          <p>
            We use first and third party Cookies for several reasons. Some
            Cookies are required for technical reasons in order for our websites
            to operate, and we refer to these as "essential" or "strictly
            necessary" Cookies. Other Cookies also enable us to track and target
            the interests of our users to enhance the experience on our Online
            Properties. Third parties serve Cookies through our websites for
            advertising, analytics, and other purposes. This is described in
            more detail below.
          </p>
          <h2>Processing Purposes:</h2>
          <p>
            We use your information, including personal data, collected through
            Cookies for the following purposes:
          </p>
          <p>
            <strong>Provide usage of our website(s):</strong> We use information
            that we collect through Cookies to let you use the website(s) for
            the primary purpose of providing our services.
          </p>
          <p>
            <strong>
              Perform analytics regarding the use of our services:
            </strong>{" "}
            We use information that we collect through Cookies to analyze how
            our website is used and to prepare reports on the use of our
            website. We also use Cookies to keep track of your use of the
            website, and to improve your user experience and the quality of the
            website. It is our legitimate business interest to use Cookies for
            these purposes.
          </p>
          <p>
            <strong>Providing targeted advertisements:</strong> We use certain
            third-party services who collect information through Cookies to
            pursue our legitimate interests by providing targeted advertising
            suggesting tourism-related local businesses such as hotels,
            restaurants, salons, spas, wineries, golf courses, attractions,
            resorts, guided tours and other recreational activities. Where
            necessary, we will obtain prior consent before Cookies are placed
            for this purpose. If consent is given, you can withdraw it at any
            time. In addition, you can object to our processing of your personal
            data for advertising purposes at any time.
          </p>
          <p>
            <strong>Market Research:</strong> We use common third-party services
            like Google Analytics that we collect information through Cookies to
            pursue our legitimate interests to engage in anonymous market
            research (including the analysis of market segmentation or trends,
            preferences and behaviors, research about products or services, or
            the effectiveness of marketing or advertising) or product
            development (including the analysis of the characteristics of a
            market segment or group of customers or the performance of our
            website, in order to improve our website).
          </p>
          <p>
            If you prefer to opt out of the use of Cookies described in this
            section and no opt-out mechanism is available to you directly (e.g.
            in your browser settings), you can contact us at{" "}
            <a className="" href="mailto:legal@innsight.com">
              legal@innsight.com
            </a>
            .
          </p>
          <h2>Data Sharing:</h2>
          <p>
            <strong>
              <u>Sharing with Third Parties:</u>
            </strong>{" "}
            We share your personal data with third parties as permitted by law
            and as described below, including service providers acting on our
            behalf. We do not sell or rent your personal data.
          </p>
          <p>
            <strong>
              <u>Competent Authorities:</u>
            </strong>{" "}
            We disclose personal data to law enforcement and other governmental
            authorities insofar as is required by law or is strictly necessary
            for the prevention, detection, or prosecution of criminal acts and
            fraud.
          </p>
          <p>
            The specific types of first and third party Cookies served through
            our websites and the purposes they perform are described below
            (please note that the specific Cookies served may vary depending on
            the specific Online Properties you visit):
          </p>
          <h2>Essential Cookies:</h2>
          <p>
            These Cookies are strictly necessary to provide you with services
            available through our websites and to use some of its features, such
            as access to secure areas and to book accommodations.
          </p>
          <p>
            <strong>Who serves these Cookies:</strong>
          </p>
          <p>
            <strong>Cookie Provider:</strong> INNsight.com
          </p>
          <p>
            <strong>URL: </strong>
            <a
              className=""
              target="_blank"
              href="https://www.innsight.com"
            >
              www.innsight.com
            </a>
            , <a className="">my.innsight.com</a>, and or{" "}
            <a className="">www.yosemitewestgate.com</a>
          </p>
          <p>
            INNsight.com (by itself, or on behalf of uses Cookies to help make
            its website(s) work and deliver services for users to research,
            connect, and reserve guest accommodations by navigating around web
            pages or accessing secure areas of the website. Without such
            Cookies, the website(s) cannot function properly. These essential
            Cookies are required for user management and to cache data for
            preference management, security authentication, session state
            maintenance, and to process services.
          </p>
          <p>
            <strong>Cookie Names:</strong> Apache, PHPSESSID, ci_session,
            innsight_ci_session
          </p>
          <p>
            <strong>How to refuse:</strong>Because these Cookies are strictly
            necessary to deliver the websites to you, the websites will not
            function as normally expected if you refuse or block these. You can
            block or delete them by changing your browser settings however, as
            described below under the heading "
            <a className="">How can I control Cookies?</a>".
          </p>
          <h2>Performance and Functionality Cookies:</h2>
          <p>
            These Cookies are used to enhance the performance and functionality
            of our websites but are non-essential to their use. However, without
            these Cookies, certain functionality (like videos) may become
            unavailable.
          </p>
          <p>
            <strong>Who serves these Cookies?</strong>
          </p>
          <p>
            <strong>Cookie Provider:</strong>Google Translate
          </p>
          <p>
            <strong>URL: </strong>
            <a
              className=""
              target="_blank"
              href="https://policies.google.com/technologies/cookies"
            >
              policies.google.com/technologies/Cookies
            </a>
          </p>
          <p>
            Our website(s) use Google Translate functionality to quickly and
            accurately translate our website content to a variety of
            international languages to improve user engagement and usability for
            people who may have a different primary language than English. We
            use cookie data to improve the ability to display translated content
            to users throughout their entire experience while on our website(s).
          </p>
          <p>
            <strong>Cookie Names:</strong> googtrans
          </p>
          <p>
            <strong>How to refuse?</strong>To refuse these Cookies, please
            follow the instructions below under the heading "
            <a className="">How can I control Cookies?</a>".
          </p>
          <p>
            <strong>Cookie Provider:</strong>Google Currency
          </p>
          <p>
            <strong>URL:</strong>{" "}
            <a
              className=""
              target="_blank"
              href="https://policies.google.com/technologies/cookies"
            >
              policies.google.com/technologies/Cookies
            </a>
          </p>
          <p>
            Our website(s) use Google Currency API functionality to quickly and
            accurately translate our website&rsquo;s currency display and
            calculations to a variety of international currencies to provide a
            localized experience for travelers who may be booking their travel
            in a foreign country&rsquo;s denomination. We leverage cookie data
            to ensure that currency conversion is displayed and carried through
            the entire reservation process accurately and displayed accordingly
            to the user from inception of an availability check the completion
            of a reservation on our platform.
          </p>
          <p>
            <strong>Cookie Names:</strong> NID
          </p>
          <p>
            <strong>How to refuse:</strong>To refuse these Cookies, please
            follow the instructions below under the heading "
            <Link>How can I control Cookies?</Link>". Alternatively, please visit the
            relevant opt-out link:{" "}
            <a
              className=""
              target="_blank"
              href="https://support.google.com/analytics/answer/181881"
            >
              support.google.com/analytics/answer/181881
            </a>
          </p>
          <p>
            More details on controlling your data on Google&rsquo;s services can
            be found here:{" "}
            <a
              className=""
              target="_blank"
              href="https://support.google.com/analytics/topic/2919631"
            >
              support.google.com/analytics/topic/2919631
            </a>
          </p>
          <p>
            <strong>Cookie Provider:</strong> Tawk.to
          </p>
          <p>
            <strong>URL:</strong>
            <a
              className=""
              target="_blank"
              href="https://www.tawk.to/privacy-policy/"
            >
              www.tawk.to/privacy-policy
            </a>
          </p>
          <p>
            Our website(s) use the online chat support service provided by
            Tawk.to. Cookies set by the Tawk.to widget and scripts are necessary
            to provide the functionality of chat support service and optionally
            to send a transcript of the chat and send any files that a user
            might upload in connection with any issue for which they need
            support. Tawk.to has a clear data protection policy which can be
            found at
            <a className="">www.tawk.to/data-protection</a>/ that
            states that they are not involved in any kind of data mining,
            collection or advertising.
          </p>
          <p>
            <strong>Cookie Names:</strong> __tawkuuid, TawkConnectionTime, ss,
            __cfduid
          </p>
          <h2>Analytics and Customization Cookies:</h2>
          <p>
            These Cookies collect information that is used either in aggregate
            form to help us understand how our websites are being used or how
            effective our marketing campaigns are, or to help us customize our
            websites for you.
          </p>
          <p>
            <strong>Cookie Provider:</strong>Google Analytics
          </p>
          <p>
            <strong>URL:</strong>
            <a
              className=""
              target="_blank"
              href="https://policies.google.com/technologies/cookies"
            >
              policies.google.com/technologies/Cookies
            </a>
          </p>
          <p>
            Our website(s) use Google Analytics, a service that transmits
            website traffic data to Google servers. Google Analytics does not
            identify individual users or associate your IP Address with other
            data held in Google&rsquo;s database. We use the analytics reports
            generated by Google to better understand website traffic and guest
            user behavior and conversion data to improve the performance of our
            websites.
          </p>
          <p>
            <strong>Cookie Names:</strong> NID, _ga, _gid, gat_gtag_[ID of
            website], __utma, __utmb, __utmc, __utmt, __utmz
          </p>
          <p>
            <strong>How to refuse:</strong> To refuse these Cookies, please
            follow the instructions below under the heading How can I control
            Cookies?". Alternatively, please visit the relevant opt-out link:
            <a
              className=""
              target="_blank"
              href="https://support.google.com/analytics/answer/181881"
            >
              support.google.com/analytics/answer/181881
            </a>
          </p>
          <p>
            More details on controlling your data on Google&rsquo;s services can
            be found here:
            <a
              className=""
              target="_blank"
              href="https://support.google.com/analytics/topic/2919631"
            >
              support.google.com/analytics/topic/2919631
            </a>
          </p>
          <h2>Advertising Cookies:</h2>
          <p>
            These Cookies are used to make advertising messages more relevant to
            you. They perform functions like preventing the same ad from
            continuously reappearing, ensuring that ads are properly displayed
            for advertisers, and in some cases selecting advertisements that are
            based on your interests.
          </p>
          <p>
            <strong>Who Serves These Cookies:</strong>
          </p>
          <p>
            <strong>Cookie Provider:</strong>Sojern.com
          </p>
          <p>
            <strong>URL: </strong>
            <a
              className=""
              target="_blank"
              href="https://www.sojern.com/privacy/trackingtechnologies/"
            >
              www.sojern.com/privacy/trackingtechnologies
            </a>
          </p>
          <p>
            Our website(s) use Sojern, a service that provides remarketing
            technology to display online advertising on third-party websites and
            drive targeted traffic to the website to increase conversion. Sojern
            does not identify the individual user, but does display relevant
            advertising on multiple third-party websites.
          </p>
          <p>
            <strong>Cookie Names:</strong> _ga, _gid, gid, apnid, cid,
            _dc_gtm_[ID of website], dc-adv, tapid, optimizelySegments,
            optimizelyBuckets, optimizelyEndUserId, _mkto_trk
          </p>
          <p>
            <strong>How to refuse?</strong>To refuse these Cookies, please
            follow the instructions found here:
            <a
              className=""
              target="_blank"
              href="https://preferences-mgr.truste.com/?pid=sojern01&amp;aid=%20sojern03&amp;type=sojern_product"
            >
              preferences-mgr.truste.com/?pid=sojern01&aid=%20sojern03&type=sojern_product
            </a>
          </p>
          <p>
            <strong>Cookie Provider:</strong> AppNexus
          </p>
          <p class="xtra">
            <strong>URL: </strong>
            <a
              className=""
              target="_blank"
              href="https://www.appnexus.com/"
            >
              www.appnexus.com
            </a>
            (www.appnexus.com/en/company/cookie-policy)
          </p>
          <p>
            Third Party, Sojern, uses AppNexus Cookies to provide personalized
            content, social media features, and traffic analysis for its
            retargeting of online advertising.
          </p>
          <p>
            <strong>Cookie Names:</strong> anj, uuid2
          </p>
          <p class="xtra">
            <strong>How to refuse?</strong>To refuse these Cookies, please
            follow the instructions found here:
            <a
              className=""
              target="_blank"
              href="https://www.appnexus.com/en/company/platform-privacy-policy#choices"
            >
              www.appnexus.com/en/company/platform-privacy-policy#choices
            </a>
          </p>
          <p>
            <strong>Cookie Provider:</strong> Tapad.com
          </p>
          <p>
            <strong>URL:</strong>
            <a
              className=""
              target="_blank"
              href="http://www.tapad.com"
            >
              www.tapad.com
            </a>
          </p>
          <p>
            Third Party, Sojern, uses Tapad Cookies to provide personalized
            content, social media features, and traffic analysis for its
            retargeting of online advertising.
          </p>
          <p>
            <strong>Cookie Names:</strong> TapAd_TTD_SYNC, TapAd_DID, TapAd_TS
          </p>
          <p>
            <strong>How to refuse?</strong>To refuse these Cookies, please
            follow the instructions found here:
            <a
              className=""
              target="_blank"
              href="https://www.tapad.com/us-privacy-notice"
            >
              www.tapad.com/us-privacy-notice
            </a>
          </p>
          <h2>Social Networking and Sharing Cookies:</h2>
          <p>
            These Cookies are used to enable you to share pages and content that
            you find interesting on our websites through third-party social
            networking and other websites. These Cookies may also be used for
            advertising purposes, too.
          </p>
          <p>
            <strong>Who Serves These Cookies?:</strong>
          </p>
          <p>
            <strong>Cookie Provider:</strong> AddThis
          </p>
          <p>
            <strong>URL:</strong>{" "}
            <p>
              <a
                className=""
                target="_blank"
                href="http://www.addthis.com"
              >
                www.addthis.com
              </a>
            </p>
          </p>
          <p>
            Our websites use social media sharing tools provided by Add This, a
            subsidiary of Oracle, Inc., to enable visitors of our websites to
            share and follow online content around the Internet.
          </p>
          <p>
            <strong>Cookie Names:</strong> loc, mus, na_tc, ouid, uid, uvc,
            __atuvc, __atuvs, km_ai, km_lv, km_vs, kvcd, _gid
          </p>
          <p>
            <strong>How to refuse?</strong>To refuse these Cookies, please
            follow this link:
            <a
              className=""
              target="_blank"
              href="http://www.addthis.com/privacy/opt-out"
            >
              www.addthis.com/privacy/opt-out
            </a>
          </p>
          <p>
            <strong>Cookie Provider:</strong> ShareThis
          </p>
          <p>
            <strong>
              URL:
              <a
                className=""
                target="_blank"
                href="http://www.sharethis.com"
              >
                www.sharethis.com
              </a>
            </strong>{" "}
          </p>
          <p>
            Our websites use social media tools provided by ShareThis, Inc. to
            connect our websites with social media sites and allow visitors to
            share content across the Internet.
          </p>
          <p>
            <strong>Cookie Names:</strong> __sharethis_cookie_test__, __unam
          </p>
          <p>
            <strong>How to refuse?</strong>To refuse these Cookies, please
            follow this link:
            <a
              className=""
              target="_blank"
              href="https://www.sharethis.com/privacy/"
            >
              www.sharethis.com/privacy
            </a>
          </p>
          <h2>Cookies Summary Table</h2>
          <div class="smallview">
            <table class="cookiet">
              <thead role="rowgroup">
                <tr role="row">
                  <th className="columnheader" role="columnheader">Provider</th>
                  <th className="columnheader"  role="columnheader">Name</th>
                  <th className="columnheader"  role="columnheader">Purpose</th>
                </tr>
              </thead>
              <tbody role="rowgroup">
                <tr role="row">
                  <td role="cell">INNsight.com</td>
                  <td role="cell">innsight_ci_session</td>
                  <td role="cell">
                    Session Data (e.g. login, application state)
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">
                    <div class="cookietable">INNsight.com</div>
                  </td>
                  <td role="cell">PHPSESSID</td>
                  <td role="cell">
                    Session Data (e.g. login, application state)
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">
                    <div class="cookietable">INNsight.com</div>
                  </td>
                  <td role="cell">ci_session</td>
                  <td role="cell">
                    Session Data (e.g. login, application state)
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">
                    <div class="cookietable">INNsight.com</div>
                  </td>
                  <td role="cell">Apache</td>
                  <td role="cell">Logging visitor IP for legal purposes</td>
                </tr>
                <tr role="row">
                  <td role="cell">Google</td>
                  <td role="cell">NID</td>
                  <td role="cell">
                    Per-user personalization/ customization functionality
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">
                    <div class="cookietable">Google</div>
                  </td>
                  <td role="cell">_ga</td>
                  <td role="cell">Analytics - Website views statistics</td>
                </tr>
                <tr role="row">
                  <td role="cell">
                    <div class="cookietable">Google</div>
                  </td>
                  <td role="cell">_gid</td>
                  <td role="cell">
                    Analytics cookie to identify returning visitors
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">
                    <div class="cookietable">Google</div>
                  </td>
                  <td role="cell">gat_gtag_[ID of website]</td>
                  <td role="cell">
                    Analytics cookie for tracking visits to website
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">
                    <div class="cookietable">Google</div>
                  </td>
                  <td role="cell">__utma, __utmb, __utmc, __utmt, __utmz</td>
                  <td role="cell">
                    Analytics Cookies used to distinguish users and sessions,
                    new sessions/visits, to throttle request rate, to track how
                    a user reached the site, etc.
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">
                    <div class="cookietable">Google</div>
                  </td>
                  <td role="cell">IDE, DSID, 1P_JAR</td>
                  <td role="cell">Doubleclick.net tracking and advertising</td>
                </tr>
                <tr role="row">
                  <td role="cell">
                    <div class="cookietable">Google</div>
                  </td>
                  <td role="cell">__sonar</td>
                  <td role="cell">Doubleclick.net targeting and advertising</td>
                </tr>
                <tr role="row">
                  <td role="cell">
                    <div class="cookietable">Google</div>
                  </td>
                  <td role="cell">googtrans</td>
                  <td role="cell">
                    Translate cookie saves language preferences
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">Tawk.to</td>
                  <td role="cell">
                    __tawkuuid, TawkConnectionTime, ss, __cfduid
                  </td>
                  <td role="cell">
                    Strictly to maintain session and provide functionality for
                    chat support widget on Tawk.to platform (no tracking).
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">ShareThis.com</td>
                  <td role="cell">__sharethis_cookie_test__, __unam</td>
                  <td role="cell">Social Media sharing tracking</td>
                </tr>
                <tr role="row">
                  <td role="cell">Sojern.com</td>
                  <td role="cell">
                    _ga, _gid, gid, apnid, cid, _dc_gtm_[ID of website], dc-adv,
                    tapid, optimizelySegments, optimizelyBuckets,
                    optimizelyEndUserId, _mkto_trk
                  </td>
                  <td role="cell">Tracking and Advertising Cookies</td>
                </tr>
                <tr role="row">
                  <td role="cell">AppNexus</td>
                  <td role="cell">anj, uuid2</td>
                  <td role="cell">
                    Sojern uses AppNexus tracking with these Cookies
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">Tapad.com</td>
                  <td role="cell">TapAd_TTD_SYNC, TapAd_DID, TapAd_TS</td>
                  <td role="cell">
                    Sojern uses Tapad.com to track mobile users using these
                    Cookies
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">AddThis.com</td>
                  <td role="cell">
                    loc, mus, na_tc, ouid, uid, uvc, __atuvc, __atuvs, km_ai,
                    km_lv, km_vs, kvcd, _gid
                  </td>
                  <td role="cell">Social Media sharing tracking</td>
                </tr>
                <tr role="row">
                  <td role="cell">INNsight.com</td>
                  <td role="cell">adaenablemonocromes</td>
                  <td role="cell">
                    Maintain session in Ada tray to enable Monocromes
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">INNsight.com</td>
                  <td role="cell">enableinvert</td>
                  <td role="cell">
                    Maintain session in Ada tray to enable Invert
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">INNsight.com</td>
                  <td role="cell">adazoom</td>
                  <td role="cell">
                    Maintain session in Ada tray to enable Zoom
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">INNsight.com</td>
                  <td role="cell">resizeText</td>
                  <td role="cell">
                    Maintain session in Ada tray to resize text
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">INNsight.com</td>
                  <td role="cell">adahighlightslinks</td>
                  <td role="cell">
                    Maintain session in Ada tray to activate highlights links
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">INNsight.com</td>
                  <td role="cell">adahighighlightstitles</td>
                  <td role="cell">
                    Maintain session in Ada tray to enable Reader View
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">INNsight.com</td>
                  <td role="cell">adaenablesepia</td>
                  <td role="cell">
                    Maintain session in Ada tray to enable Sepia
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">INNsight.com</td>
                  <td role="cell">adaenablehighcontrast</td>
                  <td role="cell">
                    Maintain session in Ada tray to enable High Constrast
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">INNsight.com</td>
                  <td role="cell">adaenableblackyellow</td>
                  <td role="cell">
                    Maintain session in Ada tray to enable WCAG Constrast
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">INNsight.com</td>
                  <td role="cell">adaenablegrayscale</td>
                  <td role="cell">
                    Maintain session in Ada tray to enable Gray Scale
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">INNsight.com</td>
                  <td role="cell">adaenableboldfonts</td>
                  <td role="cell">
                    Maintain session in Ada tray to enable Reader Fonts
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">INNsight.com</td>
                  <td role="cell">adaincreasezoom</td>
                  <td role="cell">
                    Maintain session in Ada tray to Increase Zoom
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">INNsight.com</td>
                  <td role="cell">adadecreasezoom</td>
                  <td role="cell">
                    Maintain session in Ada tray to Decrease Zoom
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">INNsight.com</td>
                  <td role="cell">adablackcursor</td>
                  <td role="cell">
                    Maintain session in Ada tray to enable Black Cursor
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">INNsight.com</td>
                  <td role="cell">adawhitecursor</td>
                  <td role="cell">
                    Maintain session in Ada tray to enable White Cursor
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">INNsight.com</td>
                  <td role="cell">enabletoolbarslide</td>
                  <td role="cell">
                    Maintain session in Ada tray to enable Toolbar
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">INNsight.com</td>
                  <td role="cell">disabletoolbar</td>
                  <td role="cell">
                    Maintain session in Ada tray to disable Toolbar
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">INNsight.com</td>
                  <td role="cell">enabletootlip</td>
                  <td role="cell">
                    Maintain session in Ada tray to enable Tooltip
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">INNsight.com</td>
                  <td role="cell">readerView</td>
                  <td role="cell">
                    Maintain session in Ada tray to enable Reader View
                  </td>
                </tr>
                <tr role="row">
                  <td role="cell">INNsight.com</td>
                  <td role="cell">enableKeyboardNav</td>
                  <td role="cell">
                    Maintain session in Ada tray to enable Keyboard Navigation
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="text-center col-lg-12 F16 MT10 MB15">
            Table 1: Cookies Used By INNsight.com
          </div>
          <h2>What about other tracking technologies, like web beacons?</h2>
          <p>
            Cookies are not the only wayto recognize or track visitors to a
            website. We may use other, similar technologies from time to time,
            like web beacons (sometimes called "tracking pixels" or "clear
            gifs"). These are tiny graphics files that contain a unique
            identifier that enable us to recognize when someone has visited our
            websites or opened an e-mail that we have sent them. This allows us,
            for example, to monitorthe traffic patterns of users from one page
            within our website to another, to deliver or communicate with
            Cookies, to understand whether you have come to our website from an
            online advertisement displayed on a third-party website, to improve
            site performance, and to measure the success of e-mail marketing
            campaigns. In many instances, these technologies are reliant on
            Cookies to function properly, and so declining Cookies will impair
            their functionality.
          </p>
          <h2>Do you use Flash Cookies or Local Shared Objects?</h2>
          <p>
            Our websites may also use so-called "Flash Cookies" (also known as
            Local Shared Objects or "LSOs") to, among other things, collect and
            store information about your use of our services, fraud prevention,
            and for other site operations.
          </p>

          <p>
            If you do not want Flash Cookies stored on your computer, you can
            adjust the settings of your Flash player to block Flash Cookies
            storage using the tools contained in the
            <a
              className=""
              target="_blank"
              href="https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html"
            >
              Storage Settings Panel
            </a>
            . You can also control Flash Cookies by going to the
            <a
              className=""
              target="_blank"
              href="https://helpx.adobe.com/flash-player/kb/disable-third-party-local-shared.html"
            >
              Global Storage Settings Panel
            </a>{" "}
            andfollowing the instructions (which may include instructions that
            explain, for example, how to delete existing Flash Cookies (referred
            to "information" on the Macromedia site), how to prevent Flash LSOs
            from being placed on your computer without your being asked, and
            (for Flash Player 8 and later) how to block Flash Cookies that are
            not being delivered by the operator of the page you are on at the
            time).
          </p>

          <p>
            Please note that setting the Flash Player to restrict or limit
            acceptance of Flash Cookies may reduce or impede the functionality
            of some Flash applications, including, potentially, Flash
            applications used in connection with our services or online content.
          </p>
          <h2>Do you serve targeted advertising?</h2>
          <p>
            Third parties may serve Cookies on your computer or mobile device to
            serve advertising through our websites. These companies may use
            information about your visits to this and other websites in order to
            provide relevant advertisements about goods and services that you
            may be interested in. They may also employ technology that is used
            to measure the effectiveness of advertisements. This can be
            accomplished by them using Cookies or web beacons to collect
            information about your visits to this and other sites in order to
            provide relevant advertisements about goods and services of
            potential interest to you. The information collected through this
            process does not enable us or Third Parties to identify your name,
            contact details, or other details that directly identify you unless
            you choose to provide these.
          </p>
          <h2>
            <span id="section2"> </span>How can I control Cookies?
          </h2>
          <p>
            You have the right to decide whether to accept or reject Cookies.
            You can exercise your cookie preferences by clicking on the
            appropriate opt-out links provided in the cookie table above.
          </p>

          <p>
            You can set or amend your web browser controls to accept or refuse
            Cookies. If you choose to reject Cookies, you may still use our
            website though your access to some functionality and areas of our
            website may be restricted. As the means by which you can refuse
            Cookies through your web browser controls vary from
            browser-to-browser, you should visit your browser's help menu for
            more information.
          </p>

          <p>
            In addition, most advertising networks offer you a way to opt out of
            targeted advertising. If you would like to find out more
            information, please visit
            <a
              className=""
              target="_blank"
              href="http://www.aboutads.info/choices/"
            >
              www.aboutads.info/choices/
            </a>{" "}
            or
            <a
              className=""
              target="_blank"
              href="http://www.youronlinechoices.com"
            >
              www.youronlinechoices.com.{" "}
            </a>
            .
          </p>
          <h2>Data Retention</h2>
          <p>
            There is a difference between Session Cookies and Permanent Cookies.
            Session Cookies only exist until you close your browser. Permanent
            Cookies have a longer lifespan and are not automatically deleted
            once you close your browser. We strive to keep Strictly Necessary
            Cookies only as Session Cookies and avoid Cookies with retention of
            more than 1 year.
          </p>
          <h2>How often will you update this Cookie Policy?</h2>
          <p>
            We may updatethis Cookie Policy from time to time in order to
            reflect, for example, changes to the Cookies we use or for other
            operational, legal, or regulatory reasons. Please therefore re-visit
            this Cookie Policy regularly to stay informed about our use of
            Cookies and related technologies.
          </p>

          <p>
            The date at the top of this Cookie Policy indicates when it was last
            updated.
          </p>
          <h2>Where can I get further information?</h2>
          <p>
            If you have any questions about our use of Cookies or other
            technologies, please email us at {" "}
            <a
              className=""
              href="mailto:legal@innsight.com?subject=Cookie%20Policy"
            >
              legal@innsight.com
            </a>{" "}
            or by post to:
          </p>
          <h3>
            <br /> <strong className="iNNFont">INNsight.com, Inc.</strong>
            
          </h3>
          <p>2445 Ocean Avenue </p>
          <p>San Francisco, CA 94127</p>
          <p className="mb-5">United States</p>
        </div>
      </div>
    </section>
  );
};

export default CookiePolicyComponent;
