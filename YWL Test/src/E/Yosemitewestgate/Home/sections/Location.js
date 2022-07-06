import React from "react";
// import './section.css';
import AOS from "aos";
import "aos/dist/aos.css";
//icons
import "./Location.scss";
import LocationMap from "./../../assets/images/location-image.jpg";
import LocationIcon from "./../../assets/images/locationIcon.png";
// const reactStringReplace = require('react-string-replace');
import { useRecoilValue } from "recoil";
import { propertyDataSelector } from "../../../../Recoil/themeModule";

const Location = (props) => {
  //var phonestr = reactStringReplace('/', ' ', (props.propertyData.primary_phone_no, i) => (props.propertyData.primary_phone_no));
  // const text = props.propertyData.primary_phone_no;
  // let replacedText = reactStringReplace(text, /#(\w+)/g, (match, i) => ({match}));
  const propertyData = useRecoilValue(propertyDataSelector);

  let alttitleImgLoc = `${propertyData.property_name} - ${propertyData.street_address}, ${propertyData.city}, ${propertyData.state}, ${propertyData.zip_code}`;
  let dtitle = `Get Directions for ${propertyData.property_name}`;
  return (
    <section
      className="container-fluid Hm-Location mt-5"
      data-aos-duration="1000"
    >
      <div className="row px-0 ipad-loc">
        <div className="col-12 col-md-8 location">
          <img
            className="location-img w-100"
            src={LocationMap}
            alt={alttitleImgLoc}
            height="536"
            width="1570"
            title={alttitleImgLoc}
          />
        </div>
        <div className="col-12 col-md-4 location-details location-icon">
          <div className="brdr bottom-corner mt-4">
            <h2 className="location-heading location-heading1">LOCATE US</h2>

            <div className="location-details1 mt-3">
              <h3 className="loc-title">
                {propertyData?.street_address},&nbsp;{propertyData?.city},&nbsp;
                {propertyData?.state},&nbsp;{propertyData?.zip_code},&nbsp;
                {propertyData?.country}
              </h3>
              {/* <span className="loc-subTitle">
                7633 State Highway 120, Groveland,
              </span> */}
              <br></br>
              {/* <span className="loc-subTitle">California 95321, USA</span> */}
              <br></br>
              <h3 className="loc-title loc-align1">Phone:</h3>
              <span className="loc-subTitle">
                {/* {props.propertyData && props.propertyData.primary_phone_no && props.propertyData.primary_phone_no.replace(/\//g, " ")} */}
                {propertyData &&
                  propertyData.primary_phone_no &&
                  propertyData.primary_phone_no.split("/")[1]}
              </span>
              <h3 className="loc-title loc-align2">Email:</h3>
              <span className="loc-subTitle">{propertyData.email}</span>
              <br></br>
              <button className="btn-style mt-3" title={dtitle}>
                GET DIRECTION
              </button>
            </div>
          </div>
          <div className="loc-icon">
            <img
              className="location_img"
              src={LocationIcon}
              width="230"
              height="335"
              alt={alttitleImgLoc}
              title={alttitleImgLoc}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
