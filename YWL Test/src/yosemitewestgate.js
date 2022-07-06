import React, { useEffect, useState } from "react";
import "./App.css";
//components Imports:
import MainHeader from "./E/Yosemitewestgate/Header/MainHeader";
import MainFooter from "./E/Yosemitewestgate/Footer/MainFooter";
import AppRouting from "./Approuting";
import "./E/Yosemitewestgate/style/common.css";
import "./GlobalStyle/buttonStyle.scss";
//  import SmoothScrollLoader from './PageScroll/smoothScrolLoader';
// import HeaderComponent from './E/Yosemitewestgate/header1/hamburger'



{
  /* <link rel="shortcut icon" id="favicon-yestgate" href="%PUBLIC_URL%/favicon1.ico"></link> */
}

// function getFaviconEl() {
//   return document.getElementById("favicon");
// }

// import WrappperCheckAvailibility from './E/CheckAvailibilty/WrapperCheckAvailibity';
// import loadingIcon from './E/Yosemitewestgate/assets/images/sections/Loading_icon/loading-imag.gif'
function App(props) {
  // const handleGoogle = () => {
  //   const favicon = getFaviconEl(); // Accessing favicon element
  //   favicon.href = "https://www.google.com/favicon.ico";
  // };

  // const handlefaviconDynamic = () => {
  //   const favicon = getFaviconEl();
  //   favicon.href = " https://s.ytimg.com/yts/img/favicon-vfl8qSV2F.ico";
  // };

  //alert(props.propertyData);
  //console.log(props.propertyData);

    if (window.matchMedia("(max-width: 500px)").matches) {
      if(document.getElementById("goUp")){
        document.getElementById("goUp").addEventListener("click", () => {
          var scrollDiv = document.getElementById("checkAvailability").offsetTop;
          window.scrollTo({ top: scrollDiv+455, behavior: 'smooth'});
        });
      }
    } else {
      if(document.getElementById("goUp")){
        document.getElementById("goUp").addEventListener("click", () => {
          var scrollDiv = document.getElementById("checkAvailability").offsetTop;
          window.scrollTo({ top: scrollDiv+350, behavior: 'smooth'});
        });
      }
    }



  return (
    <div className="App">
      <div className="container-fluid px-0">
        {/* <SmoothScrollLoader /> */}

        {/* <MainHeader allpropertydata={dataParentToChild} /> */}
        <MainHeader />
        {/* <HeaderComponent /> */}
        {/* <Navbar propertyData={props.propertyData} /> */}
        <AppRouting propertyData={props.propertyData} />
        {/* <WrappperCheckAvailibility /> */}
        <MainFooter propertyData={props.propertyData} />
        <div className="fixedReservationBtn reservationDiv d-xl-none d-lg-none d-md-block d-sm-block d-xs-block" id="goUp">
          <a>
            Reservations
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
