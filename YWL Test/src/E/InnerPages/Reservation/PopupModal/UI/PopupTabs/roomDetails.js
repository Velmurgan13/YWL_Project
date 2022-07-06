import React from "react";
import { BsPersonFill } from "react-icons/bs";
import { IoMdBed } from "react-icons/io";
import { RiHotelFill } from "react-icons/ri";

import ReactHtmlParser from "react-html-parser";

export default function RoomDetails({ valueRoomType, property }) {
  let roomSize = "";
  let included = "";
  let notIncluded = "";
  let roomTypeView = "";
  let floor = "";
  let extraBedConfig = "";

  if (
    valueRoomType.room_size_feet !== "" &&
    valueRoomType.room_size_meter !== ""
  ) {
    roomSize = `${valueRoomType.room_size_meter} m<sup>2</sup> / ${valueRoomType.room_size_feet} ft<sup>2</sup>`;
  } else if (valueRoomType.room_size_feet !== "") {
    roomSize = `${valueRoomType.room_size_feet} m<sup>2</sup> `;
  } else if (valueRoomType.room_size_meter !== "") {
    roomSize = `${valueRoomType.room_size_meter} ft<sup>2</sup>`;
  }

  if (valueRoomType.included !== "") {
    included = `${valueRoomType.included}`;
  }

  if (valueRoomType.not_included !== "") {
    notIncluded = `${valueRoomType.not_included}`;
  }

  if (valueRoomType.room_view_type !== "") {
    roomTypeView = `${valueRoomType.room_view_type}`;
  }

  if (valueRoomType.floor !== "") {
    floor = `${valueRoomType.floor}`;
  }

  if (valueRoomType.extra_bed_configurations_status === "1") {
    extraBedConfig = `${valueRoomType.extra_bed_configurations}`;
  }

  return (
    <div className="container mobileScroll">
      <div className="roomDetailCard border border-secondary py-1 px-0 text-left">
        <span className="grey1 text-white px-2 py-2 v-middle">
          ROOM DESCRIPTION
        </span>
        <div className="mt-2 px-2 text-justify room-desc-cont">
          {ReactHtmlParser(valueRoomType.description)}
        </div>
      </div>
      <div className="mt-2 text-justify">
        If you have any questions or would like to report any issues related to
        the accessibility features of our hotel’s website, please contact us at{" "}
        {property.email}
      </div>
      <div className="col-12 col-md-12 px-0">
        <div className="col-6 col-md-6 col-xl-8 col-lg-8 border border-secondary row p-2 mt-3 roomDetailSec">
          <div className="col-4 p-0 roomIconMob">
            <BsPersonFill size="30" className="mx-4" />
            <div>{valueRoomType.no_of_guest} Persons</div>
          </div>
          <div className="col-4 p-0 roomIconMob">
            <IoMdBed size="30" className="mx-4" />
            <div>{valueRoomType.name}</div>
          </div>
          {roomSize && (
            <div className="col-4 p-0 roomIconMob">
              <RiHotelFill size="30" className="mx-4" />
              <div className="">{ReactHtmlParser(roomSize)}</div>
            </div>
          )}
        </div>
        <div className="col-12 col-md-12 roomOtherDetails mt-4">
          <div className="col-12 P0 text-left">
            <span className="grey1 text-white px-2 py-2 v-middle d-Iblock ">
              OTHERS DETAILS
            </span>
          </div>
          <div className="mt-3 row mobViewOthers">
            {included && (
              <div className="col-6 text-left text-justify">
                {" "}
                <strong className="popUpInclusion">
                  Included:
                  {ReactHtmlParser(included)}
                </strong>
              </div>
            )}

            {notIncluded && (
              <div className="col-6 text-left text-justify">
                {" "}
                <strong className="popUpInclusion">
                  Not Included:
                  {ReactHtmlParser(notIncluded)}
                </strong>
              </div>
            )}

            {roomTypeView && (
              <div className="col-6 text-left text-justify">
                {" "}
                <strong className="popUpInclusion">
                  Room View:
                  <p>{ReactHtmlParser(roomTypeView)}</p>
                </strong>
              </div>
            )}

            {floor && (
              <div className="col-6 text-left text-justify">
                {" "}
                <strong className="popUpInclusion">
                  Floors:
                  <p>{ReactHtmlParser(floor)}</p>
                </strong>
              </div>
            )}

            {extraBedConfig && (
              <div className="col-6 text-left text-justify">
                <strong className="popUpInclusion">
                  Extra Bed:
                  <p>{ReactHtmlParser(extraBedConfig)}</p>
                </strong>
              </div>
            )}

            {extraBedConfig && (
              <div className="col-6 text-left text-justify">
                <strong className="popUpInclusion">
                  Extra Bed Policy:
                  <p>{ReactHtmlParser(valueRoomType.hotel_extra_bed_policy)}</p>
                </strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
