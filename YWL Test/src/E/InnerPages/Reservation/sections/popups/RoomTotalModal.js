import React from "react";
import "./index.css";
import ReactHtmlParser from "react-html-parser";
function RoomTotalModal({ onCancel, i, roomName, currency, roomTotalData }) {
  function roomTotalHide() {
    onCancel();
  }

  let Room_Adult_child_total =
    parseFloat(roomTotalData.roomDiscountCharge) *
      parseFloat(roomTotalData.noOfNights) +
    parseFloat(roomTotalData.extraAdultChargeForDiscount) *
      parseFloat(roomTotalData.noOfNights) +
    parseFloat(roomTotalData.extraChildChargeForDiscount) *
      parseFloat(roomTotalData.noOfNights);

  return (
    
    <div className="newModal text-left">
      <div className="modal-header text-center fs-16 ratePolicyBorder mb-3">
        TOTAL AMOUNT FOR YOUR STAY
      </div>

      <div className="border">
        <div className="d-flex">
          <div className="p-2 flex-grow-1">
            Room {i} - <span>{roomName}</span>
          </div>
          <div className="p-2">
            {ReactHtmlParser(currency)}
            <span>
              {(
                parseFloat(roomTotalData.roomDiscountCharge) *
                parseFloat(roomTotalData.noOfNights)
              ).toFixed(2)}
            </span>
          </div>
        </div>

        <div className="d-flex">
          <div className="p-2 flex-grow-1">
            {roomTotalData.BestDiscountName}
          </div>
        </div>

        <div className="d-flex">
          <div className="p-2 flex-grow-1">Extra Adult Fee</div>
          <div className="p-2">
            {ReactHtmlParser(currency)}
            <span>
              {(
                parseFloat(roomTotalData.extraAdultChargeForDiscount) *
                parseFloat(roomTotalData.noOfNights)
              ).toFixed(2)}
            </span>
          </div>
        </div>

        <div className="d-flex">
          <div className="p-2 flex-grow-1">Extra Child Fee</div>
          <div className="p-2">
            {ReactHtmlParser(currency)}
            <span>
              {(
                parseFloat(roomTotalData.extraChildChargeForDiscount) *
                parseFloat(roomTotalData.noOfNights)
              ).toFixed(2)}
            </span>
          </div>
        </div>

        <div className="d-flex bd-highlight bg-white">
          <div className="p-2 flex-grow-1 bd-highlight font-weight-bold bgPriceColor">
            Room {i} Total
          </div>
          <div className="p-2 bd-highlight font-weight-bold bgPriceColor">
            {ReactHtmlParser(currency)}
            <span>{Room_Adult_child_total.toFixed(2)}</span>
          </div>
        </div>

        <div className="d-flex bd-highlight">
          <div className="p-2 flex-grow-1 bd-highlight">
            Taxes
            <span className="text-danger">
              ({parseFloat(roomTotalData.roomTax).toFixed(2)}%)
            </span>
          </div>
          <div className="p-2 bd-highlight">
            {ReactHtmlParser(currency)}
            <span>{parseFloat(roomTotalData.propertyTaxAmountForDiscount).toFixed(2)}</span>
          </div>
        </div>

        {(roomTotalData.nightlyFeeForDiscount !== 0) && <div class="d-flex bd-highlight">
          <div class="p-2 flex-grow-1 bd-highlight">
            {roomTotalData.nightlyFeeName}
          </div>
          <div class="p-2 bd-highlight">
            {ReactHtmlParser(currency)}
            <span>
              {(
                parseFloat(roomTotalData.nightlyFeeForDiscount) /
                parseFloat(roomTotalData.noOfRooms)
              ).toFixed(2)}
            </span>
          </div>
        </div>}

        {(roomTotalData.oneTimeFeeForDiscount !== 0) && <div class="d-flex bd-highlight">
          <div class="p-2 flex-grow-1 bd-highlight">
            {roomTotalData.oneTimeFeeName}
          </div>
          <div class="p-2 bd-highlight">
            {ReactHtmlParser(currency)}
            <span>
              {(
                parseFloat(roomTotalData.oneTimeFeeForDiscount) /
                parseFloat(roomTotalData.noOfRooms)
              ).toFixed(2)}
            </span>
          </div>
        </div>}

        <div className="d-flex bd-highlight bg-white">
          <div className="p-2 flex-grow-1 bd-highlight font-weight-bold bgPriceColor">
            Grand Total
          </div>
          <div className="p-2 bd-highlight font-weight-bold bgPriceColor">
            {ReactHtmlParser(currency)}
            <span>
              {parseFloat(roomTotalData.totalAmountIncludingAllTaxes).toFixed(
                2
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="" onClick={roomTotalHide}>
        <button
          className=" btn--alt close p-4 text-dark btnClose"
          onClick={roomTotalHide}
        >
          <svg
            className="text-dark"
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            fill="currentColor"
            class="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default RoomTotalModal;
