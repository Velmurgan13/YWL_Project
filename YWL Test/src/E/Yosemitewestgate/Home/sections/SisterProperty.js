import React from "react";
// import './section.css'
import AOS from "aos";
import "aos/dist/aos.css";
//images
import Ysh from "../../assets/Icons/ysh.webp";
import buck from "../../assets/Icons/buck.webp";
import stage from "../../assets/Icons/stage.webp";
import tree from "../../assets/Icons/tree.webp";
import { TiSocialInstagram, TiSocialFacebook } from "react-icons/ti";
import { SiTripadvisor } from "react-icons/si";
import { FaGlobe } from "react-icons/fa";
// import Ywl from '../../assets/icons/ywl.webp';
// import Ywl from '../../assets/Icons/ywl.png'
import "./SisterProperty.scss";
// import SisterBackgroundImg from "../../../Yosemitewestgate/assets/images/BannerImages/sister-bg-img.webp";

const SisterProperty = () => {
  AOS.init();
  return (
    <section
      className="sisterproperty text-center mb-1 Hm-SisterProperty"
      data-aos-duration="1000"
    >
      <div className="sisterprop-title">
        {/* <img
          className="bg-img-sisters"
          src={SisterBackgroundImg}
          alt="sister-img"
          height="172"
          width="172"
        /> */}
        <h3
          className="subtwo-title mb-0 overflow-hidden"
          // data-aos="fade-right"
          // data-aos-duration="1000"
        >
          SISTER
        </h3>
        <div
          className="title-fs-sister-81 text-center rail-font overflow-hidden"
          // data-aos="fade-left"
          // data-aos-duration="1000"
        >
          PROPERTIES
        </div>
      </div>
      <div className="container sisterprop-description mt-3">
        <h6 className="px-1 px-md-0 sisPropDesc1 ls-1">
          When travelling to top tourist destinations in California, we've got
          covered!
        </h6>
        <div className="sisPropDesc">
          <h6 className="px-1 px-md-0 ls-1 sisPropDesc">
            Stay at either of our hotels at the Westgate or Southgate when
            travelling to Yosemite National Park. If you are planning on
            visiting the California Coast, stay at the quaint Stage Coach Lodge
            which is located in Downtown Monterey.
          </h6>
        </div>
      </div>
      <div className="sisterprop-details mt-3 mb-2 px-1 px-md-0">
        <h5 className="pb-4">BOOK DIRECTLY WITH US AND SAVE!</h5>
      </div>
      <div className="container px-1">
        <div className="row mx-0 sisPropCards">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mobCards">
            <div className="our-team cardShadow">
              <div className="picture">
                <a
                  href="https://www.yosemitesouthgate.com/"
                  title="Yosemite Southgate Hotel"
                >
                  <img
                    className="img-fluid sister-card"
                    src={Ysh}
                    alt=""
                    width="100%"
                    height="100%"
                  />
                </a>
              </div>
              <div className="team-content">
                <a
                  href="https://www.yosemitesouthgate.com/"
                  title="Yosemite Southgate Hotel"
                >
                  <h3 className="name">YOSEMITE SOUTHGATE</h3>
                  <h4 className="title">HOTEL</h4>
                </a>
              </div>
              <ul className="social">
                <li>
                  <a
                    href="https://www.yosemitesouthgate.com/"
                    className="social-icon3"
                    title="Website"
                  >
                    <FaGlobe size="25" className="text-center" />
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.facebook.com/YosemiteSouthgateHotel"
                    className="social-icon2"
                    title="Facebook"
                  >
                    <TiSocialFacebook size="30" className="text-center" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/yosemitesouthgatehotel/"
                    className="social-icon1"
                    title="Instagram"
                  >
                    <TiSocialInstagram size="30" className="text-center" />
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.tripadvisor.com/Hotel_Review-g32809-d113568-Reviews-Shilo_Inn_Yosemite_Southgate_Hotel-Oakhurst_California.html"
                    className="social-icon4"
                  >
                    <SiTripadvisor
                      size="30"
                      className="text-center"
                      title="Trip Advisor"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mobCards">
            <div className="our-team cardShadow  buckMeadows">
              <div className="picture">
                <a
                  href="https://www.buckmeadowslodge.com/"
                  title="Buck Meadows Lodge"
                >
                  <img
                    className="img-fluid sister-card"
                    src={buck}
                    alt=""
                    width="100%"
                    height="100%"
                  />
                </a>
              </div>
              <div className="team-content">
                <a
                  href="https://www.buckmeadowslodge.com/"
                  title="Buck Meadows Lodge"
                >
                  <h3 className="name">BUCK MEADOWS</h3>
                  <h4 className="title">LODGE</h4>
                </a>
              </div>
              <ul className="social">
                <li>
                  <a
                    href="https://www.buckmeadowslodge.com/"
                    className="social-icon3"
                    title="Website"
                  >
                    <FaGlobe size="25" className="text-center" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/pages/Buck-Meadows-Lodge/1557680041168638?sk=timeline"
                    className="social-icon2"
                    title="Facebook"
                  >
                    <TiSocialFacebook size="30" className="text-center" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/buckmeadowslodge/"
                    className="social-icon1"
                    title="Instagram"
                  >
                    <TiSocialInstagram size="30" className="text-center" />
                  </a>
                </li>

                <li>
                  <a
                    href="http://www.tripadvisor.com/Hotel_Review-g32460-d3539405-Reviews-Buck_Meadows_Lodge-Groveland_California.html"
                    className="social-icon4"
                    title="Gmail"
                  >
                    <SiTripadvisor
                      size="30"
                      className="text-center"
                      title="Trip Advisor"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mobCards">
            <div className="our-team cardShadow stageCoach">
              <div className="picture">
                <a
                  href="https://www.montereystagecoachlodge.com/"
                  title="Monterey Stage Coach Lodge"
                >
                  <img
                    className="img-fluid sister-card"
                    src={stage}
                    alt=""
                    width="100%"
                    height="100%"
                  />
                </a>
              </div>
              <div className="team-content">
                <a
                  href="https://www.montereystagecoachlodge.com/"
                  title="Monterey Stage Coach Lodge"
                >
                  <h3 className="name">STAGE COACH</h3>
                  <h4 className="title">LODGE</h4>
                </a>
              </div>
              <ul className="social">
                <li>
                  <a
                    href="https://www.montereystagecoachlodge.com/"
                    className="social-icon3"
                    title="Website"
                  >
                    <FaGlobe size="25" className="text-center" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/StageCoachLodgeMonterey"
                    className="social-icon2"
                    title="Facebook"
                  >
                    <TiSocialFacebook size="30" className="text-center" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/stagecoachlodge"
                    className="social-icon1"
                    title="Instagram"
                  >
                    <TiSocialInstagram size="30" className="text-center" />
                  </a>
                </li>

                <li>
                  <a
                    href="http://www.tripadvisor.com/Hotel_Review-g32737-d227544-Reviews-Americas_Best_Value_Stage_Coach_Lodge-Monterey_Monterey_Peninsula_California.html"
                    className="social-icon4"
                    title="Gmail"
                  >
                    <SiTripadvisor
                      size="30"
                      className="text-center"
                      title="Trip Advisor"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mobCards">
            <div className="our-team cardShadow sugarPine">
              <div className="picture">
                <a
                  href="https://www.sugarpineranch.com/"
                  title="Sugar Pine Ranch"
                >
                  <img
                    className="img-fluid sister-card"
                    src={tree}
                    alt=""
                    width="100%"
                    height="100%"
                  />
                </a>
              </div>
              <div className="team-content">
                <a
                  href="https://www.sugarpineranch.com/"
                  title="Sugar Pine Ranch"
                >
                  <h3 className="name">SUGAR PINE</h3>
                  <h4 className="title">RANCH</h4>
                </a>
              </div>
              <ul className="social">
                <li>
                  <a
                    href="https://www.sugarpineranch.com/"
                    className="social-icon3"
                    title="Website"
                  >
                    <FaGlobe size="25" className="text-center" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/sugarpineranchyosemite/"
                    className="social-icon2"
                    title="Facebook"
                  >
                    <TiSocialFacebook size="30" className="text-center" />
                  </a>
                </li>
                <li>
                  <a
                    href=" https://www.instagram.com/sugarpineranchyosemite"
                    className="social-icon1"
                    title="Instagram"
                  >
                    <TiSocialInstagram size="30" className="text-center" />
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.tripadvisor.com/Hotel_Review-g32460-d8508938-Reviews-Sugar_Pine_Ranch-Groveland_California.html"
                    className="social-icon4"
                    title="Gmail"
                  >
                    <SiTripadvisor
                      size="30"
                      className="text-center"
                      title="Trip Advisor"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SisterProperty;
