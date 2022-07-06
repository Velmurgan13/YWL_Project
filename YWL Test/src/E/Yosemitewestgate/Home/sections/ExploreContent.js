import React from "react";
//images

import ExplrImage2 from "../../assets/images/sections/hiking.webp";
import "./ExploreContent.scss";
import AOS from "aos";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";

const ExploreContent = ({ porpertyData }) => {
  AOS.init();
  let etitleName = `View More Attractions for ${porpertyData.city}, ${porpertyData.state}`;
  return (
    <section className="container explore-section Hm-Explore my-5">
      <div className="row px-0 exp-ipad">
        <div
          className="col-12 col-md-4 explore-details"
          data-aos="fade-bottom"
          data-aos-duration="1000"
        >
          <hr className="hr-line" />
          <h2 className="exp-title-1">EXPLORE OUR</h2>
          <h3 className="exp-title-2">Groveland, CA</h3>
          <p className="exp-content">
            Our Yosemite hotel offers a wide array of amenities that you would
            expect in a hotel located in a major metropolitan city, but in close
            proximity to one of The Natural Wonders of The World.
          </p>
          <Link className="link-color" to="/attractions">
            <button
              className="btn-style cafe-view-btn ipad-btn-no d-none d-md-block"
              title={etitleName}
            >
              VIEW MORE
            </button>
          </Link>
          {/* <button className="explore-btn cafe-view-btn ipad-btn-no d-none d-md-block">
            VIEW MORE
          </button> */}
        </div>
        <div className="col-12 col-md-8 exp-image pr-0">
          <div className="exploreImg">
            <img
              src={ExplrImage2}
              className=""
              width="100%"
              height="464"
              alt="EXPLORE BASS LAKE"
              title="Best Hikes in Yosemite National Park"
            />
          </div>

          {/* 
            <Carousel.Item>
              <div className="exploreImg">
                <img
                  src={ExplrImage2}
                  className=""
                  width="100%"
                  height="464"
                  alt="EXPLORE BASS LAKE"
                   title="EXPLORE BASS LAKE"
                />
              </div>
            </Carousel.Item>

            <Carousel.Item>
              <div className="exploreImg">
                <img
                  src={ExplrImage2}
                  className=""
                  width="100%"
                  height="464"
                  alt="EXPLORE BASS LAKE"
                   title="EXPLORE BASS LAKE"
                />
              </div>
            </Carousel.Item>

            <Carousel.Item>
              <div className="exploreImg">
                <img
                  src={ExplrImage2}
                  className=""
                  width="100%"
                  height="464"
                  alt="EXPLORE BASS LAKE"
                   title="EXPLORE BASS LAKE"
                />
              </div>
            </Carousel.Item> */}

          <div className="guest-btn-yes">
            <button
              className="btn-style cafe-view-btn1 d-block d-md-none d-lg-none d-sm-none mx-auto mx-md-0 mt-4 mt-md-0"
              title={etitleName}
            >
              VIEW MORE
            </button>
            <button className="guest-btn cafe-view-btn d-block d-md-none d-lg-none d-sm-none mx-auto mx-md-0 mt-4 mt-md-0">
              VIEW MORE
            </button>
          </div>
          <div className="ipad-btn-yes">
            <button
              className="btn-style cafe-view-btn d-none d-md-block d-lg-none d-sm-block"
              title={etitleName}
            >
              VIEW MORE
            </button>
            <button className="explore-btn cafe-view-btn2 d-none d-md-block d-lg-none d-sm-block">
              VIEW MORE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreContent;
