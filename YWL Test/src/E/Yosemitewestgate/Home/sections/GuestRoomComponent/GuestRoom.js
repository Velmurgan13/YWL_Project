import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import room_image from "../../../assets/images/sections/room1.webp";
import room_image2 from "../../../assets/images/sections/room2.webp";
import room_image3 from "../../../assets/images/sections/room3.webp";
import { Link } from "react-router-dom";

import Carousel from "react-bootstrap/Carousel";
import "./GuestRoom.scss";

const GuestRoom = ({ porpertyData }) => {
  AOS.init();
  let gtitleName = `View More Rooms for ${porpertyData.property_name}`;
  return (
    <section className="container guest-room HmGuestRoom HmGuestRoom1">
      <div className="row px-0 guest-ipad">
        <div className="col-12 col-md-8 mt-5 mt-md-0 d-block d-md-none guest-details">
          <hr className="hr-line" />
          <h2 className="guest-title-1">EXPLORE OUR</h2>
          <h3 className="guest-title-2">GUEST ROOMS</h3>
          <p className="guest-content">
            At Hotel YOSEMITE SOUTHGATE , we provide ultimate comfort so you can
            experience the best of Yosemite National Park, California.
          </p>
          {/* <button className="guest-btn cafe-view-btn guest-btn-no">VIEW MORE</button> */}
        </div>

        <div className="col-12 col-md-8 guest-img pl-0 pr-5">
          <Carousel className="guest-carousel">
            <Carousel.Item>
              <div className="guestImg">
                <img
                  src={room_image2}
                  className="room2 w-100"
                  alt="Yosemite WESTgate - 1 King Standard Perfect for Business Travelers"
                  title="Yosemite WESTgate - 1 King Standard Perfect for Business Travelers"
                  width="730"
                  height="464"
                />
              </div>
            </Carousel.Item>

            <Carousel.Item>
              <div className="guestImg">
                <img
                  src={room_image3}
                  className="w-100"
                  alt="Yosemite Westgate - 2 Queen Standard Family Friendly Room"
                  title="Yosemite Westgate - 2 Queen Standard Family Friendly Room"
                  width="730"
                  height="464"
                />
              </div>
            </Carousel.Item>

            <Carousel.Item>
              <div className="guestImg">
                <img
                  src={room_image}
                  className="w-100"
                  alt="Yosemite Westgate - 2 Queen Standard Dining Table and Chairs"
                  title="Yosemite Westgate - 2 Queen Standard Dining Table and Chairs"
                  width="730"
                  height="464"
                />
              </div>
            </Carousel.Item>

            <Carousel.Item>
              <div className="guestImg">
                <img
                  src={room_image2}
                  className="room2 w-100"
                  alt="Yosemite Westgate - Accessible King Room"
                  title="Yosemite Westgate - Accessible King Room"
                  width="730"
                  height="464"
                />
              </div>
            </Carousel.Item>
          </Carousel>
          <div className="guest-btn-yes  pt-4 pt-md-0 d-md-none">
            <Link to="/rooms">
              <button
                className="guest-btn cafe-view-btn d-block d-md-none d-lg-none d-sm-none mx-auto mx-md-0 mt-4 mt-md-0"
                title={gtitleName}
              >
                VIEW MORE
              </button>
            </Link>
          </div>

          <div className="guest-btn-yes">
            <Link to="/rooms">
              <button
                className="guest-btn cafe-view-btn d-none d-md-block d-lg-none d-sm-block"
                title={gtitleName}
              >
                VIEW MORE
              </button>
            </Link>
          </div>
        </div>

        <div
          className="col-12 col-md-4 d-none d-md-block guest-details"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <hr className="hr-line" />
          <h2 className="guest-title-1">EXPLORE OUR</h2>
          <h3 className="guest-title-2">GUEST ROOMS</h3>
          <p className="guest-content">
            At Hotel Yosemite Westgate, we provide ultimate comfort so you can
            experience the best of Yosemite National Park, California.
          </p>
          <Link to="/guestrooms" title={gtitleName} className="d-sm-none">
            <button className="guest-btn cafe-view-btn btn-style">
              VIEW MORE
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GuestRoom;
