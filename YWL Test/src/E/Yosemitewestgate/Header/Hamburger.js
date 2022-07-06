import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import {
  staggerText,
  staggerReveal,
  fadeInUp,
  handleHover,
  handleHoverExit,
  // handleCityReturn,
  // handleCity,
  staggerRevealClose,
} from "./Animations";

import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";

const Hamburger = ({ state }) => {
  // Create varibles of our dom nodes
  let menuLayer = useRef(null);
  let reveal1 = useRef(null);
  let reveal2 = useRef(null);
  let cityBackground = useRef(null);
  let line1 = useRef(null);
  let line2 = useRef(null);
  let line3 = useRef(null);
  let info = useRef(null);

  useEffect(() => {
    // If the menu is open and we click the menu button to close it.
    if (state.clicked === false) {
      // If menu is closed and we want to open it.

      staggerRevealClose(reveal2, reveal1);
      // Set menu to display none
      gsap.to(menuLayer, { duration: 1, css: { display: "none" } });
    } else if (
      state.clicked === true ||
      (state.clicked === true && state.initial === null)
    ) {
      // Set menu to display block
      gsap.to(menuLayer, { duration: 0, css: { display: "block" } });
      //Allow menu to have height of 100%
      gsap.to([reveal1, reveal2], {
        duration: 0,
        opacity: 1,
        height: "100%",
      });
      staggerReveal(reveal1, reveal2);
      fadeInUp(info);
      staggerText(line1, line2, line3);
    }
  }, [state]);

  return (
    <div ref={(el) => (menuLayer = el)} className="hamburger-menu">
      <div
        ref={(el) => (reveal1 = el)}
        className="menu-secondary-background-color"
      ></div>
      <div ref={(el) => (reveal2 = el)} className="menu-layer">
        <div
          ref={(el) => (cityBackground = el)}
          className="menu-city-background"
        ></div>
        <div className="container px-0">
          <div className="wrapper">
            <div className="menu-links row mx-0">
              <div className="dropdown col-12">
                <nav>
                  <ul className="">
                    <li className="">
                      <Link
                        onMouseEnter={(e) => handleHover(e)}
                        onMouseOut={(e) => handleHoverExit(e)}
                        ref={(el) => (line1 = el)}
                        to="/"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="dropbtn">
                      <a
                        onMouseEnter={(e) => handleHover(e)}
                        onMouseOut={(e) => handleHoverExit(e)}
                        ref={(el) => (line2 = el)}
                        className="clickable click-about-us"
                      >
                        <span>About Us </span>{" "}
                        <IoMdArrowDropdown className="my-2 ml-1 arrow-none" />
                        {/* <HiChevronRight
                          size="25"
                          className="d-none d-sm-none d-md-none d-lg-block d-xl-block hamburger-right"
                        />
                        <HiChevronDown
                          size="25"
                          className="d-sm-block d-md-none d-lg-none d-xl-none hamburger-down"
                        /> */}
                      </a>
                      <div className="dropdown-content ">
                        <a className="dropdown-tabview" href="/overview">
                          <IoMdArrowDropright /> Overview
                        </a>
                        <a className="dropdown-tabview" href="/news">
                          <IoMdArrowDropright /> News
                        </a>
                        <a className="dropdown-tabview" href="/faq">
                          <IoMdArrowDropright /> FAQs
                        </a>
                        <a className="dropdown-tabview" href="/credit-card">
                          <IoMdArrowDropright /> Credit Card
                        </a>
                        <a className="dropdown-tabview" href="/pets">
                          <IoMdArrowDropright /> Pets
                        </a>
                        <a className="dropdown-tabview" href="/pool">
                          <IoMdArrowDropright /> Pool
                        </a>
                        <a
                          className="dropdown-tabview"
                          href="/top-reasons-to-stay"
                        >
                          <IoMdArrowDropright /> Top Reasons To Stay
                        </a>
                      </div>
                    </li>
                    <li>
                      <Link
                        onMouseEnter={(e) => handleHover(e)}
                        onMouseOut={(e) => handleHoverExit(e)}
                        ref={(el) => (line3 = el)}
                        to="/guestrooms"
                      >
                        Rooms
                      </Link>
                    </li>
                    <li className="dropbtn">
                      <a
                        onMouseEnter={(e) => handleHover(e)}
                        onMouseOut={(e) => handleHoverExit(e)}
                        ref={(el) => (line3 = el)}
                        className="clickable"
                      >
                        <span>Gallery</span>
                        <IoMdArrowDropdown className="my-2 ml-1 arrow-none" />
                        {/* <IoMdArrowDropright
                          size="25"
                          className="d-none d-sm-none d-md-none d-lg-block d-xl-block hamburger-right mb-2"
                        /> */}
                        {/* <HiChevronDown
                          size="25"
                          className="d-sm-block d-md-none d-lg-none d-xl-none hamburger-down"
                        /> */}
                      </a>
                      <div className="dropdown-content">
                        <a className="dropdown-tabview" href="/gallery">
                          <IoMdArrowDropright />
                          Pictures
                        </a>
                        <a className="dropdown-tabview" href="/videos">
                          <IoMdArrowDropright /> Videos
                        </a>
                        <a
                          className="dropdown-tabview"
                          href="/3d-virtual-tours"
                        >
                          <IoMdArrowDropright /> 3D Virtual Tours
                        </a>
                      </div>
                    </li>
                    <li className="dropbtn">
                      <a
                        onMouseEnter={(e) => handleHover(e)}
                        onMouseOut={(e) => handleHoverExit(e)}
                        ref={(el) => (line3 = el)}
                        className="clickable"
                      >
                        <span>Specials</span>
                        <IoMdArrowDropdown className="my-2 ml-1 arrow-none" />
                        {/* <HiChevronRight
                          size="25"
                          className="d-none d-sm-none d-md-none d-lg-block d-xl-block hamburger-right"
                        />
                        <HiChevronDown
                          size="25"
                          className="d-sm-block d-md-none d-lg-none d-xl-none hamburger-down"
                        /> */}
                      </a>
                      <div className="dropdown-content">
                        {/* <a className="dropdown-tabview" href="/">
                          Specials
                        </a> */}
                        <a className="dropdown-tabview" href="/friends">
                          <IoMdArrowDropright /> Friends
                        </a>
                        <a
                          className="dropdown-tabview"
                          href="/six-plus-booking"
                        >
                          <IoMdArrowDropright /> Yosemite Group Travel
                        </a>
                      </div>
                    </li>
                    <li className="dropbtn">
                      <a
                        onMouseEnter={(e) => handleHover(e)}
                        onMouseOut={(e) => handleHoverExit(e)}
                        ref={(el) => (line3 = el)}
                        className="clickable"
                      >
                        <span>Destination</span>
                        <IoMdArrowDropdown className="my-2 ml-1 arrow-none" />
                        {/* <HiChevronRight
                          size="25"
                          className="d-none d-sm-none d-md-none d-lg-block d-xl-block hamburger-right"
                        />
                        <HiChevronDown
                          size="25"
                          className="d-sm-block d-md-none d-lg-none d-xl-none hamburger-down"
                        /> */}
                      </a>
                      <div className="dropdown-content ">
                        <a className="dropdown-tabview" href="/attractions">
                          <IoMdArrowDropright className="mx-2" /> Attractions
                        </a>
                        <a className="dropdown-tabview" href="/things-to-do">
                          <IoMdArrowDropright className="mx-2" />
                          Things To Do
                        </a>
                        <a className="dropdown-tabview" href="/guided-tours">
                          <IoMdArrowDropright className="mx-2" /> Guided Tours
                        </a>
                        <a className="dropdown-tabview" href="/weather">
                          <IoMdArrowDropright className="mx-2" /> Weather
                        </a>
                        <a className="dropdown-tabview" href="/events">
                          <IoMdArrowDropright className="mx-2" />
                          Events
                        </a>
                      </div>
                    </li>
                    {/* <li>
                      <Link
                        onMouseEnter={(e) => handleHover(e)}
                        onMouseOut={(e) => handleHoverExit(e)}
                        ref={(el) => (line3 = el)}
                        to="/contact"
                      >
                        Contact Us
                      </Link>
                    </li> */}
                    <li>
                      <Link
                        onMouseEnter={(e) => handleHover(e)}
                        onMouseOut={(e) => handleHoverExit(e)}
                        ref={(el) => (line3 = el)}
                        to="/reservation"
                      >
                        Reservations
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div ref={(el) => (info = el)} className="info">
                {/* <h3>Our Promise</h3>
                <p>
                  The passage experienced a surge in popularity during the 1960s
                  when Letraset used it on their dry-transfer sheets, and again
                  during the 90s as desktop publishers bundled the text with
                  their software.
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hamburger;
