import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Collapse from "react-bootstrap/Collapse";

const OtherRatePlansButton = ({ i, val1, setOpensCollapse, opensCollapse }) => {
  const styleNone = {
    display: "none",
  };

  const toggleCollapse = function () {
    setOpensCollapse(!opensCollapse);
  };

  function viewMoreRatePlan(roomAndRoomTypeNo) {
    var f = document.getElementById("viewMoreRatePlans");
    var elements = document.getElementsByClassName(
      "ratePlanDivRoomTypeId_" + roomAndRoomTypeNo
    );
    document.getElementById(
      "viewLessRatePlans" + roomAndRoomTypeNo
    ).style.display = "inline-block";
    document.getElementById(
      "viewMoreRatePlans" + roomAndRoomTypeNo
    ).style.display = "none";
    toggleCollapse();
    return false;
  }

  function viewLessRatePlan(roomAndRoomTypeNo) {
    var elements = document.getElementsByClassName(
      "removeLess" + roomAndRoomTypeNo
    );
    document.getElementById(
      "viewMoreRatePlans" + roomAndRoomTypeNo
    ).style.display = "inline-block";
    document.getElementById(
      "viewLessRatePlans" + roomAndRoomTypeNo
    ).style.display = "none";
    toggleCollapse();
  }

  return (
    <>
      <button
        type="button"
        className={`moreRoomDetail my-3 viewMoreRatePlans${i}`}
        id={"viewMoreRatePlans" + i + val1.room_type}
        onClick={() => viewMoreRatePlan(`${i + val1.room_type}`)}
        title="View More Rate Plans"
        aria-expanded={opensCollapse}
        aria-controls="collapseviemore"
      >
        View More Rate Plans <FaPlus size="16" className="ml-2 mt--1" />
      </button>

      <button
        type="button"
        className="moreRoomDetail  my-3"
        id={"viewLessRatePlans" + i + val1.room_type}
        onClick={() => viewLessRatePlan(`${i + val1.room_type}`)}
        title="View Less Other Rate Plans"
        aria-expanded={opensCollapse}
        aria-controls="collapseviemore"
        style={styleNone}
      >
        View Less Rate Plans <FaMinus size="16" className="ml-2 mt--1" />
      </button>
    </>
  );
};

export default OtherRatePlansButton;
