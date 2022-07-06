import React from "react";

import ReactHtmlParser from "react-html-parser";

import "./pop.scss";

function terms({ policies, splCancelPolicy, room_type_id }) {
  let splCancelPolicyStaus = false;
  let splCancelPolicyHTML = "";

  if (splCancelPolicy) {
    Object.values(splCancelPolicy).map((data) => {
      if (data.room_type_id === room_type_id) {
        splCancelPolicyStaus = true;
        let days =
          data.no_of_days <= 72
            ? data.no_of_days + " Hour"
            : parseInt(data.no_of_days) / 24 + " Day";
        splCancelPolicyHTML = `<ul>
          <li>Cancellation Hour: ${days}</li>
          <li>Description: ${data.cancellation_desc}</li>
        </ul>`;
      }
    });
  }

  return (
    <div className="container termScroll mobileScroll">
      <div className="termsCards text-left">
        <div className="border border-secondary py-1 px-0">
          <span className="grey1 text-white px-2 py-2 v-middle">
            POLICY DETAILS
          </span>
          <div className="col-12 terms-card">
            <div className="border border-secondary bg-light col-4 termsTime">
              <span className="check-details">CHECK IN TIME:</span>{" "}
              <span className="check-details">{policies.checkin_time}</span>
            </div>
            <div className="border border-secondary bg-light col-4 termsTime ml-5">
              <span className="check-details">CHECK OUT TIME:</span>{" "}
              <span className="check-details">{policies.checkout_time}</span>
            </div>
          </div>
          <div className="my-2 px-2">
            <strong className="text-left mt-3">
              Accepted Payment Methods:
            </strong>
            <span className="text-left pl-2">{policies.payment_methods}</span>
          </div>
        </div>

        <div className="border border-secondary py-1 px-0 cancel-details">
          <span className="grey1 text-white px-2 py-2 v-middle">
            CANCELLATION DETAILS
          </span>
          <div className="mt-3 px-2 cancel-desc">
            <h3 className="text-left">
              {splCancelPolicyStaus && ReactHtmlParser(splCancelPolicyHTML)}
              {!splCancelPolicyStaus &&
                ReactHtmlParser(policies.policy_details)}
            </h3>
          </div>
        </div>

        <div className="border border-secondary py-1 px-0 cancel-details">
          <span className="grey1 text-white px-2 py-2 v-middle">
            TERMS & CONDITIONS
          </span>
          <div className="mt-3 px-2 cancel-desc">
            <h3 className="text-left">
              {ReactHtmlParser(policies.terms_and_conditions)}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default terms;
