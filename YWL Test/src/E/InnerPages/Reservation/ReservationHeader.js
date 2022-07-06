import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { GiHamburgerMenu, GiUsaFlag } from "react-icons/gi";
import ReactHtmlParser from "react-html-parser";
import "./reservation.css";
import { FaWheelchair } from "react-icons/fa";
// import { AiOutlineClose } from "react-icons/ai";
import GoogleTranslate from "../../languageTranslater/googleTranslateElement";
import { TiTick } from "react-icons/ti";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { VscWarning } from "react-icons/vsc"; 
import wheelIcon from "../../CommonAssets/Icons/wheelchair-solid.svg";
import xIcon from "../../CommonAssets/Icons/xmark-solid.svg";
import { assetsUrl } from "../../../Configuration/config_url";

import Backdrop from "./sections/popups/backdrop";
import CurrencyModal from "./sections/popups/CurrencyModal";

const ReservationHeader = (props) => {
  // console.log('props: ',props)

  const [currencyModalOpen, setCurrencyModalOpen] = useState(false);
  function currencyModalShow() {
    setCurrencyModalOpen(true);
  }

  function currencyModalHide() {
    setCurrencyModalOpen(false);
  }

  const [hide, setHide] = useState(true);
  var msgDiv, divIcon, classnameMsgDiv;

  const handleHide = () => {
    document.getElementById("myDiv").classList.add("closeMsg");
  };
  var closeIcon = <ImCross size="15" title="Close"></ImCross>;

  let roomsAvailable = true;
  if(props.suggestions === 1){
    roomsAvailable = false;
  }else if(props.isRoomsAvailable === false){
    roomsAvailable = false;
  }

  if (props.msgData) {
    if (props.msgData.message_status === "on") {
      if (props.msgData.message_type === "good_news") {
        divIcon = <TiTick size="25"></TiTick>;
        msgDiv = props.msgData.message_text;
        classnameMsgDiv = "text-justify d-flex good_news message";
      } else if (props.msgData.message_type === "attention") {
        divIcon = <VscWarning size="25"></VscWarning>;
        msgDiv = props.msgData.message_text;
        classnameMsgDiv = "text-justify d-flex warning-msg message";
      } else if (props.msgData.message_type === "bad_news") {
        divIcon = (
          <BsFillExclamationCircleFill size="25"></BsFillExclamationCircleFill>
        );
        msgDiv = props.msgData.message_text;
        classnameMsgDiv = "text-justify d-flex bad_news message";
      } else if (props.msgData.message_type === "ada_update") {
        divIcon = <FaWheelchair size="25"></FaWheelchair>;
        msgDiv = props.msgData.message_text;
        classnameMsgDiv = "text-justify d-flex attentinada message";
      }
    }
  }

  return (
    <section>
      <div className="container px-0">
        <div className="W100 MT20 msgContain">
          <div className={classnameMsgDiv} id="myDiv">
            <div className="WCIcon">{divIcon}</div>
            {ReactHtmlParser(msgDiv)}
            <div className="xIcon" onClick={handleHide}>
              {closeIcon}
            </div>
          </div>
        </div>
        {/* {ReactHtmlParser(msgDiv)} */}
        <div className="row mt-4 resView">
          {roomsAvailable && (
            <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12 ">
              <span className="sort_bar fs-20">
                Step 1: Mix & Match Your Rooms
              </span>
            </div>
          )}

          <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12 resFilterBtn">
            {/* <button
              type="button"
              className="btn text-secondary m-0"
              style={{ border: '1.5px solid black' }}
              to="/directions"
            >
              Languages
            </button> */}
            {roomsAvailable && (
              <>
              <div className="d-inline-block" title="Languages">
                    <span className="btn currencyChang">Languages</span>
                    <div id="google_translate_element"></div>
                      <GoogleTranslate />
                  </div>
                {/* <button
                  type="button"
                  className="btn currencyChang"
                  title="Languages"
                >
                  Languages
                </button> */}
                <button
                  type="button"
                  className="btn text-secondary mx-4 mx-md-3 px-2 currencyChang"
                  onClick={currencyModalShow}
                  title="Currency"
                >
                  <img
                    className="mr-1"
                    src={
                      assetsUrl +
                      "/flag/" +
                      props.currencyFlagAbbr.toLowerCase() +
                      ".gif"
                    }
                    alt={props.currencyAbbr + " Flag"}
                  />
                  {props.currencyAbbr}
                </button>
                {currencyModalOpen && (
                  <CurrencyModal
                    onCancel={currencyModalHide}
                    all_country_currency_code={props.all_country_currency_code}
                    setConvertPrice={props.setConvertPrice}
                    setCurrencySign={props.setCurrencySign}
                    setCurrencyAbbr={props.setCurrencyAbbr}
                    setCurrencyFlagAbbr={props.setCurrencyFlagAbbr}
                    currencyAbbr={props.currencyAbbr}
                  />
                )}
                {currencyModalOpen && <Backdrop onCancel={currencyModalHide} />}
                <Link
                  to="#"
                  className="hideMobileV slide_btn active d-none"
                  title="List View"
                >
                  <GiHamburgerMenu
                    size="30"
                    style={{ border: "1.5px solid black" }}
                  />
                </Link>
              </>
            )}
            {/* <Link
              to="/column-grid"
              className="hideMobileV slide_btn"
              title="Grid View"
            >
              <BsFillGrid3X3GapFill
                size="30"
                style={{ border: "1.5px solid black" }}
              />
            </Link> */}
            {/* <Link
              to="/reservation-slider"
              className="hideMobileV slide_btn "
              title="Slide View"
            >
              <GiHamburgerMenu
                size="30"
                className="r90deg"
                style={{ border: "1.5px solid black" }}
              />
            </Link> */}
          </div>
        </div>
        {roomsAvailable && (
          <div className="light-grey border-box p-3 mt-2 mb-0">
            <p className="mb-0 grey-text">
              Click on <strong>'Select Room'</strong> once you have made your
              room selection and Continue to Step 2
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReservationHeader;
