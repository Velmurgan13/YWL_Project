import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import HeaderComponent from "../header1/NewHamburger";
import SlideMenuComponent from "../slidemenu/slidemenu";
import { FaConciergeBell } from "react-icons/fa";

import logoone from "../assets/Icons/ywl.webp";
import "./sideApp.scss";
import { FaArrowUp } from "react-icons/fa";
import AOS from "aos";
import { propertyDataSelector } from "../../../Recoil/themeModule";
import { useRecoilValue } from "recoil";

// import '../../Yosemitewestgate/Header/SidebarStyle.css'
// import './Sidebar.css'

// import '../../Yosemitewestgate/Header'
// import './Sidebar.css'

const Header = ({ history }) => {
  const [visible, setVisible] = useState(false);
  const propertyData = useRecoilValue(propertyDataSelector);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  let logoTitle = `${propertyData.property_name} - ${propertyData.street_address}, ${propertyData.city}, ${propertyData.state}, ${propertyData.zip_code}`;
  return (
    <header className="PR">
      <div className="container container-mob-view px-0">
        <div className="inner-header">
          <div className="headMenuLogoDiv">
            <div className="logo col-xl-2 col-lg-2">
              <figure className="PR">
                <Link to="/">
                  <img
                    src={logoone}
                    className="ywg-logo img-fluid"
                    width="100%"
                    height="100%"
                    alt={logoTitle}
                    title={logoTitle}
                    loading="lazy"
                  />
                  <figcaption className="logo-caption">
                    by BLINK HOTELS<sup>TM</sup>
                  </figcaption>
                </Link>
              </figure>
            </div>
          </div>
          <div className="menuReserDiv">
            <div className="humburgMenuDiv">
              <SlideMenuComponent />
            </div>
            <div className="reservDiv">
              <div className="reservationBtn">
                <Link to="/reservations" title="Reservations">
                  Reservations
                </Link>
              </div>

              <div className="hidden-md hidden-lg mobReservBtn">
                <Link to="/reservations" title="Reservations">
                  <FaConciergeBell
                    size="40"
                    className="hidden-md hidden-lg bellIcon"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div data-aos="zoom-in-up" data-aos-duration="1000" className="scrollBtn">
          <button className="scrolBtnStyle">
          <FaArrowUp
            onClick={scrollToTop}
            // style={{ display: visible ? "inline" : "none" }}
          />
        </button>
      </div>
        </div>
        
      </div>
    </header>
  );
};

export default withRouter(Header);
