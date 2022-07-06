import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import "./newStyle.css";
import { Link } from "react-router-dom";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";

const COLORS = {
  primaryDark: "#bdb5a7",
  primaryLight: "#fff",
};

const MenuLabel = styled.label`
  // background-color: ${COLORS.primaryLight};
  position: absolute;
  top: 60px;
  right: 0px;
  // border-radius: 50%;
  height: 52px;
  width: 52px;
  cursor: pointer;
  z-index: 1000;
  // box-shadow: 0 1rem 3rem rgba(182, 237, 200, 0.3);
  text-align: center;
  @media (max-width: 768px) {
    top: 2rem !important;
    right: 2rem;
  }
`;

const NavBackground = styled.div`
  position: fixed;
  top: 2rem;
  right: 16rem;
  background-image: radial-gradient(
    ${COLORS.primaryDark},
    ${COLORS.primaryLight}
  );
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  z-index: 600;
  transform: ${(props) => (props.clicked ? "scale(80)" : "scale(0)")};
  transition: transform 0.8s;
`;

const Icon = styled.span`
  position: relative;
  background-color: ${(props) => (props.clicked ? "transparent" : "black")};
  width: 2rem;
  height: 2px;
  display: inline-block;
  margin-top: 10px 10px;
  transition: all 0.7s;
  &::before,
  &::after {
    content: "";
    background-color: black;
    width: 2rem;
    height: 2px;
    display: inline-block;
    position: absolute;
    left: 0;
    transition: all 0.7s;
  }

  &::before {
    top: ${(props) => (props.clicked ? "0" : "-0.8rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }

  &::after {
    top: ${(props) => (props.clicked ? "0" : "0.8rem")};

    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }

  ${MenuLabel}:hover &::before {
    top: ${(props) => (props.clicked ? "0" : "-1rem")};
  }
  ${MenuLabel}:hover &::after {
    top: ${(props) => (props.clicked ? "0" : "0.5rem")};
  }
`;

const Navigation = styled.nav`
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 600;
  width: ${(props) => (props.clicked ? "100%" : "0")};
  opacity: ${(props) => (props.clicked ? "1" : "0")};
  transition: width 0.8s, opacity 0.8s;
`;

const List = styled.ul`
  position: absolute;
  list-style: none;
  display: flex;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
  @media (max-width: 991px) {
    display: inline-block;
  }
`;

const ItemLink = styled(NavLink)`
  display: inline-block;
  font-size: 1.8rem;
  font-weight: 500;
  text-decoration: none;
  color: rgb(33 85 58);
  padding: 1rem 2rem;
  background-size: 240%;
  transition: all 0.4s;
  &:hover,
  &:active {
    background-position: 100%;
    color: rgb(33 85 58);
    transform: translateX(0.5rem);
  }
  @media (max-width: 1366px) {
    font-size: 1.5rem;
    padding: 0px 4px 0px 14px;
  }
  @media (max-width: 768px) {
    font-size: 1.3rem;
    padding: 30px 4px 0px 14px;
  }
`;

const HeaderComponent = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  return (
    <>
      <MenuLabel
        htmlFor="navi-toggle"
        className="humburger-icon"
        onClick={handleClick}
      >
        <Icon clicked={click}>&nbsp;</Icon>
      </MenuLabel>
      <NavBackground clicked={click}>&nbsp;</NavBackground>

      <Navigation className="hamburgerStyle" clicked={click}>
        <List>
          <li>
            <ItemLink className="hamburgerStyle" onClick={handleClick} to="/">
              Home
            </ItemLink>
          </li>
          <li>
            <div className="dropdown">
              <div className="dropbtn">About Us</div>
              <div className="dropdown-content">
                <Link onClick={handleClick} to="/overview">
                  Overview
                </Link>
                <Link onClick={handleClick} to="/faq">
                  FAQ
                </Link>
                {/* <Link onClick={handleClick} to="/cleaning-protocols">Cleaning Protocols</Link> */}
              </div>
            </div>
          </li>
          <li>
            <ItemLink onClick={handleClick} to="/guestrooms">
              Room
            </ItemLink>
          </li>
          <li>
            <ItemLink onClick={handleClick} to="/gallery">
              Gallery
            </ItemLink>
          </li>

          <li>
            <div className="dropdown">
              <div className="dropbtn">Specials</div>
              <div className="dropdown-content">
                <Link onClick={handleClick} to="/packages">
                  Specials
                </Link>
                <Link onClick={handleClick} to="/friends">
                  Friends
                </Link>
                {/* <Link onClick={handleClick} to="/yosemite-group-travel">Yosemite Group Travel</Link> */}
              </div>
            </div>
          </li>
          <li>
            <div className="dropdown">
              <div className="dropbtn">Destination</div>
              <div className="dropdown-content">
                <Link onClick={handleClick} to="/attractions">
                  Attractions
                </Link>
                <Link onClick={handleClick} to="/things-to-do">
                  Things To Do
                </Link>
                <Link onClick={handleClick} to="/guided-tours">
                  Guided Tours
                </Link>
                <Link onClick={handleClick} to="/weather">
                  Weather
                </Link>
                <Link onClick={handleClick} to="/events">
                  Events
                </Link>
              </div>
            </div>
          </li>
          <li>
            <ItemLink onClick={handleClick} to="/contact">
              Contact
            </ItemLink>
          </li>
          <li>
            <ItemLink onClick={handleClick} to="/reservations">
              Reservation
            </ItemLink>
          </li>
        </List>
      </Navigation>
    </>
  );
};

export default HeaderComponent;
