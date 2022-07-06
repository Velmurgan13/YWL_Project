import React from "react";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { anemetiesIcons } from "../../../../../../Configuration/config_url";
import { ImMenu } from "react-icons/im";
import Collapse from "react-bootstrap/Collapse";
import { BsChevronRight } from "react-icons/bs";
import { ImWarning } from "react-icons/im";
import "./pop.scss";

export default function Amenities({ valueRoomType }) {
  // console.log('valueRoomType: ', valueRoomType);

  const [toggleState, setToggleState] = useState(0);
  const [opensCollapse, setOpensCollapse] = useState(false);

  const toggleCollapse = function () {
    setOpensCollapse(!opensCollapse);
  };

  const toggleTab = (index, name) => {
    setToggleState(index);
    document.getElementById("group-name").innerText = name;
    toggleCollapse();
  };

  // Merging Objects START
  function colorMap(obj) {
    var map = {};

    Object.keys(obj).forEach(function (key) {
      map[obj[key].color] = true;
    });

    return map;
  }

  function merge(one, two) {
    var map = colorMap(one),
      index = Object.keys(one).length;

    Object.keys(two).forEach(function (key) {
      if (map[two[key].color]) one[++index] = two[key];
    });

    return one;
  }
  // Merging Objects END

  let tempAmenities = {};
  let tempAmenitiesADA = {};
  let amenities = {};
  let count = 1;

  if (valueRoomType) {
    // removing empty objects
    valueRoomType.amenities && Object.values(valueRoomType.amenities).map((val, key) => {
      if (val.aminities.length !== 0) {
        tempAmenities[key] = val;
      }
    });

    // removing empty objects
    valueRoomType.ADAamenities && Object.values(valueRoomType.ADAamenities).map((val, key) => {
      if (val.aminities.length !== 0) {
        tempAmenitiesADA[key] = val;
      }
    });

    if (valueRoomType.is_handicap === "1") {
      amenities = merge(tempAmenitiesADA, tempAmenities);
    } else {
      amenities = merge(tempAmenities, tempAmenitiesADA);
    }
  }
  // console.log('amenities: ', amenities)

  return (
    <div className="container P0 amenetySec mobileScroll">
      <div className="anemeties">
        <div className="bg-light py-2 row mx-0 anemtiesIcon">
          
          {amenities &&
            Object.values(amenities).map((val, key) => {
              if (typeof val === "object") {
                return Object.values(val.aminities).map((v) => {
                  if (count < 7 && (v.amenity_icon !== '' && v.amenity_icon !== null)) {
                    count++;
                    return (
                      <div className="text-center">
                        <div>
                          <img
                            src={`${anemetiesIcons}${v.amenity_icon}`}
                            alt={v.name}
                            width="50"
                            height="50"
                            className="mb-2 mx-3 aniMobIcon"
                          />
                          <div className="aniMobName"> {v.name} </div>
                        </div>
                      </div>
                    )
                  }
                });
              }
            })}
        </div>
        {(Object.keys(amenities).length !== 0) ?
        <div className="px-0 py-2">
          <div className="col-12 P0 text-left">
            <div
              className="grey1 text-white px-2 py-2 v-middle d-Iblock collapseAmeities"
              onClick={() => toggleCollapse()}
              aria-expanded={opensCollapse}
              aria-controls="collapseIdAmenities"
            >
              <ImMenu className="drpdwn-icon" />
              <span id="group-name"> {amenities[0].group_name} </span>
            </div>
            <Collapse in={opensCollapse}>
              <div id="collapseIdAmenities">
                <ul>
                  
                  {amenities &&
                    Object.values(amenities).map((val, key) => {
                      return (
                        <li
                          className={
                            toggleState === key
                              ? "tabs active-tabs text-left ml-2 p-2"
                              : "tabs text-left ml-2 p-2"
                          }
                          onClick={() => toggleTab(key, val.group_name)}
                        >
                          <BsChevronRight size="25" />
                          <span>{val.group_name}</span>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </Collapse>
            {amenities &&
              Object.values(amenities).map((val, key) => {
                return (
                  <div
                    className={
                      toggleState === key
                        ? "content  active-content text-justify"
                        : "content"
                    }
                  >
                    <ul className="anemitiesList">
                      {Object.values(val.aminities).map((v) => {
                        return (
                          <li className="col-4 p-2 text-left"> {v.name} </li>
                        );
                      })}  
                    </ul>
                  </div>
                );
              })}
          </div>
        </div> : <div className="text-danger"> <span> <ImWarning size="34" /></span> Sorry, no amenities are available </div>}
      </div>
    </div>
  );
}