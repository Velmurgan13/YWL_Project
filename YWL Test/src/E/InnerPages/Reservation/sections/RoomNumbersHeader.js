import React from "react";
import ReactHtmlParser from "react-html-parser";
// import { BsFillCaretDownFill } from "react-icons/bs";

const RoomNumbersHeader = ({ noOfRooms, inputParams }) => {
  let rows = [];
  let adults = [];
  let children = [];
  let totalGuests = 0;

  // adults array
  if (inputParams) {
    Object.values(inputParams.adults).map((data) => {
      adults.push(data);
    });

    // children array
    Object.values(inputParams.children).map((data) => {
      children.push(data);
    });
  }

  return (
    <>
      <ul className="mt-3 PR P0 tabHeadRoomDetails d-flex">
        {(() => {
          for (let i = 1; i <= noOfRooms; i++) {
            rows.push(`<li id=${"tab_head_room_" + i} class="${
              i == 1 ? "active" : "disbaled"
            } tab_head_room mr-3" ${i == 1 ? "" : "disabled"}>
                                    
                                        <span >
                                        Room ${i}: ${adults[i - 1]} Adults, ${
              children[i - 1]
            } Children
                                        </span>
                                    
                                    </li>`);
            totalGuests =
              totalGuests + parseInt(adults[i - 1]) + parseInt(children[i - 1]);
          }
        })()}

        {ReactHtmlParser(rows.join(""))}
        <input
          type="hidden"
          id="totalGuestPersons"
          defaultValue={totalGuests}
        />
        {/* <BsFillCaretDownFill size="25" className="caretDownIcon" /> */}
      </ul>
    </>
  );
};

export default RoomNumbersHeader;
