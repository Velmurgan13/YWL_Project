import React from "react";
import { GoLocation } from "react-icons/go";
import { FiPhoneCall } from "react-icons/fi";
import { VscMail } from "react-icons/vsc";
import { AiOutlineCar } from "react-icons/ai";
import { GrMapLocation } from "react-icons/gr";
import "./RoomConfirmation.css"

const PropertyDetails = ({ bookingDetails, property, rentACar }) => {
  let tmp = property[0].reservation_phone_no
  let myarr = tmp.split("-");
  let tmparr = myarr[0].split("/")

  return (
    <div className="propertyDetails">
      <div className="text-left head_text FS20">Property Details</div>
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 my-4 black propertyLocation">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-0">
          <a
            href={property[0].website}
            target="_blank"
            className="black loctionMb"
          >
            <span className="col-lg-1 col-md-1 col-sm-1 col-xs-2 text-right">
              <GrMapLocation size="30" className="" />
            </span>
            <span className="col-lg-11 col-md-11 col-sm-11 col-xs-10 text-left">
              {bookingDetails[0].address1+' '+bookingDetails[0].property_city+' '+bookingDetails[0].property_state+' '+bookingDetails[0].zip_code+' '+bookingDetails[0].country}
            </span>
          </a>
        </div>
      </div>
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 my-4 black d-flex propertyDirection">
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 px-0">
          <a
            href="/directions"
            target="_blank"
            className="black"
          >
            <span className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-right">
              <GoLocation size="30" className="" />
            </span>
            <span className="col-lg-10 col-md-10 col-sm-10 col-xs-10 text-left propertyMobile">
              Show Directions
            </span>
          </a>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 px-0 propertyEmail1">
          <a
            href={'mailto:'+property[0].email}
            target="_blank"
            className="black"
          >
            <span className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-right">
              <VscMail size="30" className="" />
            </span>
            <span className="col-lg-10 col-md-10 col-sm-10 col-xs-10 text-left propertyEmail">
              {property[0].email}
            </span>
          </a>
        </div>
      </div>
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 my-4 black d-flex propertyDirection">
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 px-0">
          <a href={"tel:"+tmparr[1]+' '+myarr[1]+'-'+myarr[2]} target="_blank" className="black">
            <span className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-right">
              <FiPhoneCall size="30" className="" />
            </span>
            <span className="col-lg-10 col-md-10 col-sm-10 col-xs-10 text-left propertyMobile">
              {tmparr[1]+' '+myarr[1]+'-'+myarr[2]}
            </span>
          </a>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 propertyCar">
          <a
            href="https://alpha.yosemitewestgate.com/"
            target="_blank"
            className="black"
            onClick={rentACar} 
          >
            <span className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-right px-0">
              <AiOutlineCar size="30" className=""/>
            </span>
            <span className="col-lg-10 col-md-10 col-sm-10 col-xs-10 text-left">
              Rent a Car
            </span>
          </a>
        </div>
      </div>
      <div className="dottedborder my-2"></div>
    </div>
  );
};

export default PropertyDetails;
