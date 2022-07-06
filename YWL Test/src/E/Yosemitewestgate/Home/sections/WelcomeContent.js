import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WelcomeContent.scss";
import ReactHtmlParser from "react-html-parser";

const WelcomeHeading = () => {
  const [xmlpost, setxmlPost] = React.useState(null);
  const [showVisible, setHideVisible] = useState(false);

  useEffect(() => {
    axios
      .get("https://www.innstaging.com/property_xml/2/6/265.xml", {
        "Content-Type": "application/xml; charset=utf-8",
      })
      .then((response) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(response.data, "text/xml");
        const finalData =
          xml.querySelectorAll("description")[1].childNodes[0].nodeValue;

        function removeHTML(str) {
          var tmp = document.createElement("DIV");
          tmp.innerHTML = str;
          return tmp.textContent || tmp.innerText || "";
        }

        const onlyText = removeHTML(finalData);

        setxmlPost(onlyText);
      });
  }, []);

  //  console.log("hello this is xml data ",xmlpost);
  return (
    <div className="container-fluid welcome-tree  mt-3">
      <div
        className="container tree-position text-center px-0 mainTitle h2 strong a"
        data-aos="zoom-in"
        data-aos-duration="1000"
      >
        <span className="title-one mb-0 text-center">WELCOME TO</span>
        <h1 className="title-two text-uppercase mb-0 rail-font">
          YOSEMITE westgate
        </h1>
        <span className="title-one title-one1 text-center">LODGE</span>
        <div className="row px-0 welcome-ipad">
          <div
            className={`col-transitions bg-section mt-4 ${
              showVisible ? "col-12" : "col-12"
            }`}
          >
            <div className="cust-border">
              <div
                className={`overview-details  ${
                  showVisible ? "enable-parent-hm-child" : "parent-hm-child"
                }`}
              >
                {/* <p className="fs-12 content-title mb-0">
                  {ReactHtmlParser(xmlpost)}</p> */}

                <div className="welcomeTitle">
                  <div className="mainTitle">{ReactHtmlParser(xmlpost)} </div>
                </div>
              </div>

              <div className="btn-xs-read-more text-center">
                <button
                  title="Read More About Yosemite Westgate Lodge"
                  type="button"
                  className="home-readmore-btn ls-1 welcome-btn btn-style mt-3 "
                  onClick={() => setHideVisible(!showVisible)}
                >
                  {showVisible ? "READ LESS" : "READ MORE"}{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeading;
