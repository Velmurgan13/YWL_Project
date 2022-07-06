import React from "react";
import ReactHtmlParser from "react-html-parser";
import "./index.css"
function RatePolicyModal(props) {
  console.log('props', props)
  function ratePolicyHide() {
    props.onCancel();
  }

  return (
    <div className="newModal" style={{ overflowY: "scroll" }}>
      <div className="modal-header text-center fs-16 ratePolicyBorder mb-4">
        Rate Policy for {props.title}
      </div>
      {!props.isStandardDiscountNotExists && (
        <div className="px-3 py-1 mt-0">
          <div>
            {/* <div className="sort_bar bg-dark text-white mx-2 mt-3">
              Rate Plan Description
            </div> */}
            <div className="mx-2 my-3 text-justify">
              <span class="bg-dark text-white px-2 py-2 ls-1">
                RATE PLAN DESCRIPTION
              </span>
            </div>
            <div className="text-left pl-4">{props.ratePolicyDesc}</div>
          </div>
          <div>
            {/* <div className="sort_bar bg-dark text-white mx-2 mt-3">
              Rate Plan Policies
            </div> */}
            <div className="mx-2 my-3 text-justify">
              <span class="bg-dark text-white px-2 py-2 ls-1">
                RATE PLAN POLICIES
              </span>
            </div>
            <div className="text-left pl-4">{props.ratePolicyPolicy}</div>
          </div>

          {props.ratePolicyCustomHour !== "0" && props.ratePolicyCustomHour !== "" && (
            <>
              <div>
                <div className="mx-2 my-3 text-justify">
                  <span class="bg-dark text-white px-2 py-2 ls-1">
                    CANCELLATION POLICY
                  </span>
                </div>
                <ul>
                  <li className="text-left">
                    Note the Selected {props.ratePolicyCustomText} has Special
                    Cancellation Policy &amp; should be cancelled before{" "}
                    {parseInt(props.ratePolicyCustomHour) <= 72
                      ? props.ratePolicyCustomHour + " Hour"
                      : parseInt(props.ratePolicyCustomHour) / 24 + " Day"}{" "}
                    of Arrival
                  </li>
                  {props.ratePolicyCustomPolicy && <li className="text-left">{props.ratePolicyCustomPolicy}</li>}
                </ul>
              </div>
            </>
          )}
        </div>
      )}
      {(props.isStandardDiscountNotExists !== 0  && props.isStandardDiscountNotExists !== "" ) && (
        <>
          <div className="mx-2 my-3 text-justify">
            <span className="bg-dark text-white px-2 py-2 ls-1">
              CANCELLATION POLICY
            </span>
          </div>
          <ul>
            <li className="text-left">
              Cancellation Hour:
              {parseInt(props.ratePolicyCustomHour) <= 72
                ? props.ratePolicyCustomHour + " Hour"
                : parseInt(props.ratePolicyCustomHour) / 24 + " Day"}
            </li>
            <li className="text-left">
              Description: {ReactHtmlParser(props.ratePolicyCustomPolicy)}
            </li>
          </ul>
        </>
      )}

      <div className="" onClick={ratePolicyHide}>
        <button
          className="btn--alt close p-4 text-dark btnClose"
          onClick={ratePolicyHide}
        >
          <svg
            className="text-dark"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
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

export default RatePolicyModal;
