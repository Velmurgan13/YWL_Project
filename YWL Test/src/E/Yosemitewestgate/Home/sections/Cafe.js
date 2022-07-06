import React from "react";
// import './section.css';
import AOS from "aos";
import "aos/dist/aos.css";
import "./Cafe.scss";
//icons
import Burger from "../../assets/images/luckyBuckBg.webp";
// import Burger_Mob from "../../assets/images/burger_mob_view.jpg";
import CafeLogo from "../../assets/images/luckybuckCafe.webp";

const Cafe = (props) => {
  AOS.init();
  //console.log(props.propertyData);
  return (
    <section className="container-fluid CafeComponent px-0 Hm-Cafe">
      <div className="row px-0 mx-0">
        <div className="col-12 burger-img px-0">
          <img
            className="burger1 w-100 imageAuto"
            src={Burger}
            width="1500"
            height="675"
            alt=""
            title="Lucky Buck Cafe"
          />
          <img
            className="cafe-logo"
            src={CafeLogo}
            width="500"
            height="200"
            title="Lucky Buck Cafe"
            data-aos="fade-right"
            data-aos-duration="1000"
            alt=""
          />
        </div>
        <div className="col-12">
          <div className="container ipad-cafe">
            <div className="cafeHeading">
              <h4 className="cafeTitle">
                LUCKY BUCK CAFE SERVING AMERICAN COMFORT FOOD TO HUNGRY
                TRAVELERS
              </h4>
              <p className="cafeSubTitle">
                The Lucky Buck Cafe is nestled in the quaint town of Groveland,
                California, which rests on the western side of the Sierra Nevada
                Mountains. This historic Gold Rush town still holds the look of
                a bygone era and is the closest town visitors can enjoy before
                entering the crown jewel, Yosemite National Park.
              </p>
              <div className="d-flex cafe-bts">
                <a
                  href="https://www.luckybuckcafe.com/"
                  target="_blank"
                  className="text-dark"
                >
                  <button className="btn-style mr-3" title="View Restaurant">
                    VIEW RESTURANT
                  </button>
                </a>
                <a
                  href="https://www.luckybuckcafe.com/menu"
                  target="_blank"
                  className="text-dark"
                >
                  <button className="btn-style cafeBtn" title="See Menu">
                    SEE MENU
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cafe;
