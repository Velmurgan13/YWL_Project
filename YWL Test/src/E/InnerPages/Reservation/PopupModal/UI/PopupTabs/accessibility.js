import React from "react";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import ReactHtmlParser from "react-html-parser";
import { BiFridge } from "react-icons/bi";
import { ImMenu } from "react-icons/im";
import Collapse from "react-bootstrap/Collapse";
import { BsChevronRight } from "react-icons/bs";
import "./pop.scss";

export default function Amenities({ valueRoomType }) {
  const [toggleState, setToggleState] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [opensCollapse, setOpensCollapse] = useState(false);

  const toggleCollapse = function () {
    setOpensCollapse(!opensCollapse);
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
  let amenitiesADAFlag = false;
  let amenities = {};
  let amenityName = "";
  // let count = 0;

  if (valueRoomType) {
    // removing empty objects and amenities that are not ADA
    valueRoomType.amenities && Object.values(valueRoomType.amenities).map((val, key) => {
      if (val.aminities.length !== 0 && !val.group_name.indexOf("ADA")) {
        tempAmenities[key] = val;
      }
    });

    // removing empty objects
    valueRoomType.ADAamenities && Object.values(valueRoomType.ADAamenities).map((val, key) => {
      if (val.aminities.length !== 0) {
        tempAmenitiesADA[key] = val;
      }
    });

    if (Object.keys(tempAmenitiesADA).length > 0 && Object.keys(tempAmenities).length > 0) {
      if (valueRoomType.is_handicap === "1") {
        amenities = merge(tempAmenitiesADA, tempAmenities);
      } else {
        amenities = merge(tempAmenities, tempAmenitiesADA);
      }
    } else if (Object.keys(tempAmenitiesADA).length > 0) {
      amenities = tempAmenitiesADA;
    } else if (Object.keys(tempAmenities).length > 0) {
      amenities = tempAmenities;
    }



    Object.values(amenities).map((val, key) => {
      if (!val.group_name.indexOf("ADA")) {
        amenitiesADAFlag = true;
        if (amenityName === "") {
          amenityName = val.group_name;
        }
      }
    });

  }

  const toggleTab = (index, name) => {
    setToggleState(index);
    document.getElementById("group-name").innerText = name;
    toggleCollapse();
  };

  return (
    <div className="container mobileScroll">
      {!amenitiesADAFlag &&
        ReactHtmlParser(`<span class="text-danger">Sorry, no amenities are available</span>`)
      }
      <div className="anemeties text-left ">
        {amenitiesADAFlag && (
          <div className="mainAdaCont">
            <div
              className="grey1 text-white px-2 py-2 v-middle d-Iblock collapseAmeities"
              onClick={() => toggleCollapse()}
              aria-expanded={opensCollapse}
              aria-controls="collapseIdAda"
            >
              <ImMenu className="drpdwn-icon" />
              <span id="group-name">{amenityName}</span>
            </div>

            <Collapse in={opensCollapse}>
              <div id="collapseIdAda">
                <ul>
                  {amenities &&
                    Object.values(amenities).map((val, key) => {
                      return (
                        <li
                          className={
                            toggleState === key ? "tabs active-tabs" : "tabs"
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
                        ? "content  active-content w-100"
                        : "content w-100"
                    }
                  >
                    <ul className="anemitiesList">
                      {Object.values(val.aminities).map((v) => {
                        return (
                          <li className="col-6 p-2 text-left">{v.name}</li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
