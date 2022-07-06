import React from "react";

import ReactHtmlParser from "react-html-parser";

const SummaryRoomType = ({
  i,
  noOfRooms,
  // roomTypeIdRef,
  // roomTypeNameRef,
  // avgBaseRateRef,
  // avgDiscountRateRef,
  currencySign
}) => {
  // function handleChangeSummary(i) {
  //   roomTypeIdRef.current[i + 1].focus();
  // }

  // function handleChangeSummaryTwo(i) {
  //   roomTypeNameRef.current[i + 1].focus();
  // }

  // function handleChangeSummaryThree(i) {
  //   avgBaseRateRef.current[i + 1].focus();
  // }

  // function handleChangeSummaryFour(i) {
  //   avgDiscountRateRef.current[i + 1].focus();
  // }

  return (
    <>
      {/* <input
        type="text"
        name={"roomTypeId" + i}
        value=""
        ref={(ref) => roomTypeIdRef.current.push(ref)}
        onChange={() => handleChangeSummary(i)}
      />
      <input
        type="text"
        name={"roomTypeName" + i}
        value=""
        ref={(ref) => roomTypeNameRef.current.push(ref)}
        onChange={() => handleChangeSummaryTwo(i)}
      />
      <input
        type="text"
        name={"avgBaseRate" + i}
        value=""
        ref={(ref) => avgBaseRateRef.current.push(ref)}
        onChange={() => handleChangeSummaryThree(i)}
      />
      <input
        type="text"
        name={"avgDiscountRate" + i}
        value=""
        ref={(ref) => avgDiscountRateRef.current.push(ref)}
        onChange={() => handleChangeSummaryFour(i)}
      /> */}

      <div className="d-flex bd-highlight">
        <div className="p-2 flex-grow-1 bd-highlight">
          Room {i}: <span id={"roomTypeName" + i}></span>
          <div
          className="flex-grow-1 bd-highlight"
          id={"standardPolicy" + i}
          style={{ display: "none" }}
        ></div>
          <div
          className="flex-grow-1 bd-highlight"
          id={"otherDiscountName" + i}
          style={{ display: "none" }}
        ></div>
        </div>
       
        <div className="p-2 bd-highlight">
          {ReactHtmlParser(currencySign)}<span id={"roomRate" + i}>0.00</span>
        </div>
       

        <div
          className="p-2 flex-grow-1 bd-highlight"
          id={"specialCancellationPolicy" + i}
          style={{ display: "none" }}
        ></div>
      </div>

      <div className="d-flex bd-highlight">
        <div
          className="p-2 flex-grow-1 bd-highlight"
          id={"discountDivLeft" + i}
          style={{ display: "none" }}
        >
          <span id={"discountName" + i}></span>
        </div>
        <div
          className="p-2 bd-highlight"
          id={"discountDivRight" + i}
          style={{ display: "none" }}
        >
          {ReactHtmlParser(currencySign)}<span id={"discountCharge" + i}>0.00</span>
        </div>
      </div>

      <div className="d-flex bd-highlight">
        <div className="p-2 flex-grow-1 bd-highlight">Extra Adult Fee</div>
        <div className="p-2 bd-highlight">
          {ReactHtmlParser(currencySign)}<span id={"extraAdultCharge" + i}>0.00</span>
        </div>
      </div>

      <div className="d-flex bd-highlight">
        <div className="p-2 flex-grow-1 bd-highlight">Extra Child Fee</div>
        <div className="p-2 bd-highlight">
          {ReactHtmlParser(currencySign)}<span id={"extraChildCharge" + i}>0.00</span>
        </div>
      </div>

      <div className="d-flex bd-highlight bg-white">
        <div className="p-2 flex-grow-1 bd-highlight font-weight-bold">
          Room {i} Total
        </div>
        <div className="p-2 bd-highlight">
          {ReactHtmlParser(currencySign)}<span id={"roomTotal" + i}>0.00</span>
        </div>
      </div>
    </>
  );
};

export default SummaryRoomType;
