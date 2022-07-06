import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { ImCross } from "react-icons/im";
import "bootstrap/dist/css/bootstrap.css";
import "./slidemenu.scss";

const SlideMenuComponent = () => {
  const { pathname } = useLocation();
  const splitLocation = pathname.split("/");
  const [open, setopen] = useState(false);

  const toggleMenu = function () {
    let toggleMenuActive = document.querySelector(".fullmenuslideDiv");
    document.querySelector(".humBurger-menu").classList.toggle("close");
    toggleMenuActive.classList.toggle("open");
    setopen(!open);
  };

  const DropDownprevent = (e) => {
    e.preventDefault();
    let ddList = e.target.offsetParent;
    if (ddList.className.includes("dropDownList")) {
      ddList.classList.toggle("open-menu");
    }
  };

  useEffect(() => {
    if (open) {
      toggleMenu();
    }
    // let openMenusList = document.querySelectorAll(".open-menu");
    // for (let j = 0; j < openMenusList.length; j++) {
    //   openMenusList[j].classList.remove("open-menu");
    // }
  }, [pathname]);

  return (   
    <>
      <div className="humBurger-menu" onClick={toggleMenu} title="Menu">
        <span className="bar bar1"></span>
        <span className="bar bar2"></span>
        <span className="bar bar3"></span>
      </div>

      <div className="fullmenuslideDiv">
        <div className="block" id="theme_slide"></div>
        <div className="block" id="black_slide"></div>
        <ImCross
          size="30"
          className="closeBtn"
          title="Close"
          onClick={toggleMenu}
        ></ImCross>
        <div className="nav_container">
          <ul className="menuMainLink">
            <li
              className={[
                splitLocation[1] === "" ? "active" : "",
                "nav_link",
              ].join(" ")}
            >
              <Link to="/" title="Home">
                Home
              </Link>
            </li>

            <li
              className={[
                splitLocation[1] === "overview" ? "" : "",
                "nav_link dropDownList",
              ].join(" ")}
            >
              <Link
                title="About Us"
                to=""
                onClick={(e) => {
                  DropDownprevent(e);
                }}
              >
                About Us
              </Link>
              <ul className="dropdown-menus">
                <li className={splitLocation[1] === "overview" ? "active" : ""}>
                  <Link to="/overview" title="Overview">
                    Overview
                  </Link>
                </li>

                <li className={splitLocation[1] === "news" ? "active" : ""}>
                  <Link to="/news" title="News">
                    News
                  </Link>
                </li>

                <li
                  className={
                    splitLocation[1] === "cleaning-protocols" ? "active" : ""
                  }
                >
                  <Link to="/cleaning-protocols" title="Cleaning Protocol">
                    Cleaning Protocol
                  </Link>
                </li>

                <li className={splitLocation[1] === "faq" ? "active" : ""}>
                  <Link to="/faq" title="FAQ's">
                    FAQ's
                  </Link>
                </li>

                {/* <li className={splitLocation[1] === "parking" ? "active" : ""}>
                  <Link to="/parking" title="Parking">
                    Parking
                  </Link>
                </li>

                <li
                  className={splitLocation[1] === "fitnessroom" ? "active" : ""}
                >
                  <Link to="/fitnessroom" title="Fitness Room">
                    Fitness Room
                  </Link>
                </li>

                <li className={splitLocation[1] === "pool" ? "active" : ""}>
                  <Link to="/pool" title="Pool">
                    Pool
                  </Link>
                </li>

                <li
                  className={splitLocation[1] === "credit-card" ? "active" : ""}
                >
                  <Link to="/credit-card" title="Credit Card">
                    Credit Card
                  </Link>
                </li>

                <li className={splitLocation[1] === "pets" ? "active" : ""}>
                  <Link to="/pets" title="Pets">
                    Pets
                  </Link>
                </li>

                <li
                  className={
                    splitLocation[1] === "top-reasons-to-stay" ? "active" : ""
                  }
                >
                  <Link to="/top-reasons-to-stay" title="Top Reasons To Stay">
                    Top Reasons To Stay
                  </Link>
                </li> */}
              </ul>
            </li>

            <li
              className={
                splitLocation[1] === "reviews" ? "nav_link active" : "nav_link"
              }
            >
              <Link title="Reviews" to="/reviews">
                Reviews
              </Link>
            </li>

            <li
              className={
                splitLocation[1] === "guestrooms"
                  ? "nav_link active"
                  : "nav_link"
              }
            >
              <Link title="Rooms" to="/guestrooms">
                Room
              </Link>
            </li>

            <li
              className={[
                splitLocation[1] === "gallery" ? "active" : "",
                "nav_link",
              ].join(" ")}
            >
              <Link title="Gallery" to="/gallery">
                Gallery
              </Link>
            </li>

            <li
              className={[
                splitLocation[1] === "packages" ||
                splitLocation[1] === "friends"
                  ? ""
                  : "",
                "nav_link dropDownList",
              ].join(" ")}
            >
              <Link
                to=""
                onClick={(e) => {
                  DropDownprevent(e);
                }}
              >
                {" "}
                Specials
              </Link>
              <ul className="dropdown-menus">
                <li className={splitLocation[1] === "packages" ? "active" : ""}>
                  <Link to="/packages" title="Specials">
                    {" "}
                    Packages
                  </Link>
                </li>
                <li className={splitLocation[1] === "friends" ? "active" : ""}>
                  <Link to="/friends" title="Friends">
                    {" "}
                    Friends
                  </Link>
                </li>
              </ul>
            </li>

            <li
              className={[
                splitLocation[1] === "attractions" ||
                splitLocation[1] === "things-to-do" ||
                splitLocation[1] === "guided-tours" ||
                splitLocation[1] === "weather" ||
                splitLocation[1] === "events"
                  ? ""
                  : "",
                "nav_link dropDownList",
              ].join(" ")}
            >
              <Link
                to=""
                title="Destination"
                onClick={(e) => {
                  DropDownprevent(e);
                }}
              >
                Destination
              </Link>

              <ul className="dropdown-menus">
                <li
                  className={splitLocation[1] === "attractions" ? "active" : ""}
                >
                  <Link to="/attractions" title="Attractions">
                    Attractions
                  </Link>
                </li>
                <li
                  className={
                    splitLocation[1] === "things-to-do" ? "active" : ""
                  }
                >
                  <Link to="/things-to-do" title="Things To Do">
                    Things To Do
                  </Link>
                </li>
                <li
                  className={
                    splitLocation[1] === "guided-tours" ? "active" : ""
                  }
                >
                  <Link to="/guided-tours" title="Guided Tours">
                    Guided Tours
                  </Link>
                </li>
                <li className={splitLocation[1] === "weather" ? "active" : ""}>
                  <Link to="/weather" title="Weather">
                    Weather
                  </Link>
                </li>
                <li className={splitLocation[1] === "events" ? "active" : ""}>
                  <Link to="/events" title="Events">
                    Events
                  </Link>
                </li>
              </ul>
            </li>

            {/* <li
              className={[
                splitLocation[1] === "local-services" ||
                splitLocation[1] === "entertainment" ||
                splitLocation[1] === "transport-commute" ||
                splitLocation[1] === "shopping-guide" ||
                splitLocation[1] === "location-guide"
                  ? ""
                  : "",
                "nav_link dropDownList",
              ].join(" ")}
            >
              <Link
                to=""
                title="What's Nearby"
                onClick={(e) => {
                  DropDownprevent(e);
                }}
              >
                What's Nearby
              </Link>

              <ul className="dropdown-menus">
                <li
                  className={
                    splitLocation[1] === "local-services" ? "active" : ""
                  }
                >
                  <Link to="/local-services" title="Local Services">
                    Local Services
                  </Link>
                </li>
                <li
                  className={
                    splitLocation[1] === "entertainment" ? "active" : ""
                  }
                >
                  <Link to="/entertainment" title="Entertainment">
                    Entertainment
                  </Link>
                </li>

                <li
                  className={
                    splitLocation[1] === "transport-commute" ? "active" : ""
                  }
                >
                  <Link to="/transport-commute" title="Transport Commute">
                    Transport Commute
                  </Link>
                </li>

                <li
                  className={
                    splitLocation[1] === "shopping-guide" ? "active" : ""
                  }
                >
                  <Link to="/shopping-guide" title="Shopping Guide">
                    Shopping Guide
                  </Link>
                </li>
                <li
                  className={
                    splitLocation[1] === "location-guide" ? "active" : ""
                  }
                >
                  <Link to="/location-guide" title="Location Guide">
                    Location Guide
                  </Link>
                </li>
              </ul>
            </li> */}

            <li
              className={[
                splitLocation[1] === "contact-us" ? "active" : "",
                "nav_link",
              ].join(" ")}
            >
              <Link title="Contact Us" to="/contact-us">
                Contact Us
              </Link>
            </li>

            <li
              className={[
                splitLocation[1] === "directions" ? "active" : "",
                "nav_link",
              ].join(" ")}
            >
              <Link title="Directions" to="/directions">
                Directions
              </Link>
            </li>

            <li
              className={[
                splitLocation[1] === "reservations" ? "active" : "",
                "nav_link",
              ].join(" ")}
            >
              <Link title="Reservation" to="/reservations">
                Reservation
              </Link>
            </li>

            <li
              className={[
                splitLocation[1] === "jobs" ? "active" : "",
                "nav_link ",
              ].join(" ")}
            >
              <Link title="Jobs" to="/jobs">
                Jobs
              </Link>
            </li>

            <li
              className={[
                splitLocation[1] === "blog" ? "active" : "",
                "nav_link ",
              ].join(" ")}
            >
              <Link title="Blog" to="/blog">
                Blog
              </Link>
            </li>

            <li
              className={[
                splitLocation[1] === "lost-found" ? "active" : "",
                "nav_link ",
              ].join(" ")}
            >
              <Link title="Lost & Found" to="/lost-found">
                Lost & Found
              </Link>
            </li>

            <li
              className={[
                splitLocation[1] === "sitemap" ? "active" : "",
                "nav_link ",
              ].join(" ")}
            >
              <Link title="SiteMap" to="/sitemap">
                SiteMap
              </Link>
            </li>

            <li
              className={[
                splitLocation[1] ===
                "ada-accessibility-amenities-services-facilities"
                  ? "active"
                  : "",
                "nav_link ",
              ].join(" ")}
            >
              <Link
                title="Accessibility"
                to="/ada-accessibility-amenities-services-facilities"
              >
                Accessibility
              </Link>
            </li>

            <li
              className={[
                splitLocation[1] === "cookies" ? "active" : "",
                "nav_link ",
              ].join(" ")}
            >
              <Link title="Cookie Policy" to="/cookies">
                Cookie Policy
              </Link>
            </li>

            <li
              className={[
                splitLocation[1] === "privacy-policy" ? "active" : "",
                "nav_link ",
              ].join(" ")}
            >
              <Link title="Privacy Policy" to="/privacy-policy">
                Privacy Policy
              </Link>
            </li>

            <li
              className={[
                splitLocation[1] === "terms-conditions" ? "active" : "",
                "nav_link ",
              ].join(" ")}
            >
              <Link title="Terms and Condition" to="/terms-conditions">
                Terms and Condition
              </Link>
            </li>

            <li
              className={[
                splitLocation[1] === "personal-info-request-form"
                  ? "active"
                  : "",
                "nav_link ",
              ].join(" ")}
            >
              <Link
                title="Personal Data Request"
                to="/personal-info-request-form"
              >
                Personal Data Request
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SlideMenuComponent;
