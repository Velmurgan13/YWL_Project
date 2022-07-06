import React, { useState } from "react";
import "./index.css";

const Accordion = ({ title, children, isOpenFlag }) => {
  const [isOpen, setOpen] = useState(isOpenFlag);

  return (
    <div className="accordion-wrapper">
      <div
        className={`accordion-title panel-title FaqHeading ${
          isOpen ? "open" : ""
        }`}
        onClick={() => setOpen(!isOpen)}
      >
        <div className="row">
          {/* <div className="col-1">
              <p>Q.</p>
              </div> */}
          <div className="col-10 d-flex align-center qTitleDiv">
            <span className="mr-3">Q.</span>
            <span className="qTitle">{title}</span>
          </div>
          {/* <div className="col-1"></div> */}
        </div>
      </div>
      <div
        className={`accordion-item  border-top-0 ${!isOpen ? "collapsed" : ""}`}
      >
        <p className="accordion-content mb-0">{children}</p>
      </div>
    </div>
  );
};

export default Accordion;
