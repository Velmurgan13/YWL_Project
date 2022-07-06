import React from "react";
// import './section.css';
import AOS from "aos";
import "aos/dist/aos.css";
import "./Attractions.scss";
import { Link } from "react-router-dom";
//icons
// import Burger_Mob from "../../assets/images/burger_mob_view.jpg";
import Attraction from "../../assets/images/Attraction.webp";

const Attractions = ({ porpertyData }) => {
  AOS.init();
  let atitleName = `View More Attractions for ${porpertyData.city}, ${porpertyData.state}`;
  return (
    <section className="container-fluid Hm-Attraction">
      <div className="row px-0">
        <div className="col-12 attraction-img">
          <img
            className="w-100 imageAuto"
            src={Attraction}
            width="1500"
            height="675"
            alt=""
            title="Attraction Image"
          />
          <div
            className="attraction-content"
            data-aos="zoom-in"
            data-aos-duration="1500"
          >
            <h2 className="attract-tittle">ATTRACTIONS</h2>
            <h5 className="attract-subTitle">
              BEING OUR GUEST AT THE YOSEMITE WESTGATE LODGE
            </h5>

            {/* <h4 className="text-center">
              EXPLORE THE BEST OF GROVELAND, CA BY
            </h4> */}

            <Link to="/attractions" title={atitleName}>
              <button className="attraction-btn btn-style">VIEW MORE</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Attractions;
