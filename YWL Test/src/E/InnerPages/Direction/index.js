import React, { useEffect, useState, useRef } from "react";
import "../../InnerPages/Direction/index.scss";
import { Form } from "react-bootstrap";
import { AiFillCar } from "react-icons/ai";
import { FaWalking } from "react-icons/fa";
import { IoMdBicycle } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
// import  MdOutlineDoubleArrow from "react-icons/md";
import { FaHotel } from "react-icons/fa";
import { getSeoDescriptionData } from "../../../DataLayer/datalayerUtilities";
import Mapbox from "../../InnerPages/Direction/MapboxGLMap.js";
import "mapbox-gl/dist/mapbox-gl.css";
import BannerContainer from "../BannerComponent/BannerContainer";
import { useRecoilValue } from "recoil";
import {
  propertyDataSelector,
  seoThemeDetails,
} from "../../../Recoil/themeModule";
import { motion } from "framer-motion";

import $ from "jquery";

import ReactMapboxGl, {
  Marker,
  ZoomControl,
  RotationControl,
  Popup,
} from "react-mapbox-gl";

const DirectionComponent = () => {
  const propertyData = useRecoilValue(propertyDataSelector);
  const { contactus: seoId } = useRecoilValue(seoThemeDetails);
  const [seoData, setPropertySeodata] = useState([]);
  const [fName, setfName] = useState('');
  const inputRef = useRef(null);

  var isFromDirectionsPage = "true";

  var [zoom, setZoom] = useState(9);
  var [map_type, setMapType] = useState("streets-v11");

  var lng = propertyData.longitude;
  var lat = propertyData.latitude;
  const address = [(propertyData.street_address) , (propertyData.city) , (propertyData.state) , (propertyData.zip_code) , (propertyData.country)];

  useEffect(() => {
    fetchSeoProperties();
  }, []);

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData(seoId);
    setPropertySeodata(response.data);
  };

  function titleCase(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  }

  ReactMapboxGl.accessToken =
    "pk.eyJ1IjoiaW5udGVyYWN0MiIsImEiOiJjazhiaWh1M3MwYzd0M2V0cTNsaHVsajh3In0.cvdq8Buk7G9WAfnJhQIn3A";

  const map = new ReactMapboxGl({
    container: "map",
    style: "mapbox://styles/mapbox/" + map_type,
    center: [lng, lat], // starting position
    zoom: { zoom },
  });

  function get_lat_lng() {
    var fromAddress = $('#fromAddress').val().trim();
    // var mapboxClient = ReactMapboxGl({
    //   accessToken: ReactMapboxGl.accessToken
    // });

    var mapboxClient = ReactMapboxGl.accessToken;

    mapboxClient.geocoder
      .forwardGeocode({
        query: fromAddress,
        autocomplete: false,
        limit: 1
      })
      .send()
      .then(function(response) {
        if (
          response &&
          response.body &&
          response.body.features &&
          response.body.features.length
        ) {
          var feature = response.body.features[0];
          var destination = feature.center;
          getRoute(destination);
          //new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
        } else {
          setTimeout(function() {
            $('#error').show().html("Sorry, your directions request was not successfully processed. Please try another address.");
            $("#direction_div_show, #bor_left, #printmap").hide();
            return false;
          }, 500);
        }
      });
  }


  function getRoute(end) {

    var end = [-110.059727, 37.817299];
    if (end == undefined) {
      return false;
    }
    var tripInstructions = [];
    var fromAddress = $('#fromAddress').val().trim();
    var modeid = $('#mode').val().trim();
    console.log(modeid);

    var start = [lng, lat];

    if (!isFromDirectionsPage) {
      var url =
        "https://api.mapbox.com/directions/v5/mapbox/" +
        modeid +
        "/" +
        start[0] +
        "," +
        start[1] +
        ";" +
        end[0] +
        "," +
        end[1] +
        "?steps=true&geometries=geojson&access_token=" +
        ReactMapboxGl.accessToken;
      var from = address;
      var to = titleCase(fromAddress);
    } else {
      var url =
        "https://api.mapbox.com/directions/v5/mapbox/" +
        modeid +
        "/" +
        end[0] +
        "," +
        end[1] +
        ";" +
        start[0] +
        "," +
        start[1] +
        "?steps=true&geometries=geojson&access_token=" +
        ReactMapboxGl.accessToken;
      var from = titleCase(fromAddress);
      var to = address;
    }

    var options = {
      units: "miles",
    };

    var req = new XMLHttpRequest();
    req.responseType = "json";
    req.open("GET", url, true);
    req.onload = function () {
      if (req.response.code != "Ok") {
        // setTimeout(function() {
        // $("#direction_div_show, #bor_left, #printmap").hide();
        //  document.getElementById('printmap').style.display = "hide";
        $("#printmap").hide();
        // }

        // $('#error').show().html(req.response.message);
        //   return false;
        // }, 500);
      } else {
        // $("#direction_div_show, #bor_left, #printmap").show();
        document.getElementById("printmap").display = "block";
      }

      var data = req.response.routes[0];
      var route = data.geometry.coordinates;

      var geojson = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: route,
        },
      };

      // map.addLayer({
      //   id: 'route',
      //   type: 'line',
      //   source: {
      //     type: 'geojson',
      //     data: {
      //       type: 'Feature',
      //       properties: {},
      //       geometry: {
      //         type: 'LineString',
      //         coordinates: geojson
      //       }
      //     }
      //   },
      //   layout: {
      //     'line-join': 'round',
      //     'line-cap': 'round'
      //   },
      //   paint: {
      //     'line-color': '#3887be',
      //     'line-width': 5,
      //     'line-opacity': 0.75
      //   }
      // });
      // map.getSource('route').setData(geojson);

      // if (map.getLayer('route')) {
      //   map.getSource('route').setData(geojson);
      // } else { // otherwise, make a new request
      // }

      var steps = data.legs[0].steps;

      for (var i = 0; i < steps.length; i++) {
        tripInstructions.push(
          "<li>" +
          steps[i].maneuver.instruction+
          "</li>"
        );
      }

      var durationInMinutes = Math.floor(data.duration / 60);
      var mins = durationInMinutes > 0 ? "mins" : "min";

      //  $('#map').removeClass('initialmapwd');

      $("#bor_left")
        .show()
        .html(
          '<p class="duration mt-5 mb-3">Trip duration:  ' +
          durationInMinutes +
          " " +
          mins +
          " for " +
          modeid +
          "</p> </br></br>" +
          "<ul>" +
          tripInstructions +
          ".</ul></br>"
        );

      var buttonRow =
        '<div class="moreDirection"><button class="moreDirection__btn btn bookbtn detailsBtn2 roomBtnStyle2" id="showMoreDirection" title="View More">View More</button></div>';

      if ($("#bor_left li").length > 4) {
        $("#bor_left").append(buttonRow);
        $("#bor_left li:eq(3)").nextAll("#bor_left li").toggle();
        $("#bor_left li:eq(4)").prevAll("#bor_left li").addClass("before");
        var initialHeight = 0;
        $("#bor_left .before").each(function () {
          initialHeight = initialHeight + $(this).height();
        });
        initialHeight =
          initialHeight +
          $(".duration").height() +
          $(".moreDirection").height() +
          20;
        $("#bor_left").css("minHeight", initialHeight);
      }

      $("#showMoreDirection").click(function () {
        $("#bor_left").toggleClass("expanded");
        $("#bor_left li:eq(3)").nextAll("#bor_left li").toggle("slow");
        $(this).text($(this).text() == "View More" ? "View Less" : "View More");
        $(this).attr("title", $(this).text());
      });

      var from_address = titleCase(fromAddress);
      $("#from_address_show").text(from_address);
      var to_address = address;
      $("#to_address_show").text(to_address);
      $("#direction_div_show, #inserttt").show();
      $("#printRoute").html("");

      $("#printRoute").append(
        '<div style="display: inline-block;"><span style="font-weight: bold; font-size: 15px; text-align: center;">From: ' +
        from +
        '</span></br><span style="font-weight: bold; font-size: 15px; text-align: center;">To: ' +
        to +
        '</span></br></br><span style="font-weight: bold; font-size: 15px; text-align: center;">Trip duration: ' +
        durationInMinutes +
        " " +
        mins +
        " for " +
        modeid +
        '</span><div style="margin-top: 15px;">' +
        $.trim(tripInstructions) +
        ".<br></div></div>"
      );
    };

    req.send();
  }

  return (
    <>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.4 }}
      >
        <BannerContainer seoData={seoData} />
      </motion.div>

      {/* <>
        <div id="printRoute" class="hidden"></div>
        <a href="" target="_blank" style="display:none;" id="downloadsSteps" download>Download</a>
        <div class="clearfix"></div>
        </> */}

      <div className="container px-0 direcMap direction">
        <Mapbox />
        {/* <div id="map"></div>  */}
        <div className="col-12 mb-5">
          <div className="mx-auto col-10 card-position">
            <div className="mapBoxShadow p-3 my-3">
              <div className="row px-3 py-3 connect-us-bg left-right-radius mx-auto mapIcon">
                <div className="text-white directIcon">
                  <a
                    href="javascript:void('0');"
                    onclick="setMode('DRIVING');"
                    title="Driving"
                    id="DRIVING"
                  >
                    {" "}
                    <AiFillCar size="50" className="mr-5 mr-md-5" />
                  </a>
                  <a
                    href="javascript:void('0');"
                    onclick="setMode('WALKING');"
                    title="Walking"
                    id="WALKING"
                  >
                    {" "}
                    <FaWalking size="50" className="mr-5 mr-md-5" />
                  </a>
                  <a
                    href="javascript:void('0');"
                    onclick="setMode('BICYCLING');"
                    title="Bicycling"
                    id="BICYCLING"
                  >
                    <IoMdBicycle size="50" className="mr-5 mr-md-5" />
                  </a>
                </div>
              </div>
              <div className="mx-auto col-8 pt-5 mb-2 directMOb">
           <div>     <label className="mapFormLabel px-0">From</label></div>
                {/* <Form.Control
                  name="fromAddress"
                  id="fromAddress"
                  className="ltr-none mapFormInput"
                  type="text"
                  placeholder="Example: 10 Market Street, San Francisco, CA 94105"
                  value=""
                /> */}

<input type="text" className="ltr-none w-100" id="fromAddress" placeholder="Eg: 2445 Ocean Ave, San Francisco, CA 94127" onChange={e => setfName(e.target.value)} />
                <br />
              <div>  <input type="hidden" value="driving" id="mode" /></div>
              </div>
              <div className="pt-3 text-center mb-1">
                <button
                  type="button"
                  className="home-readmore-btn ls-1 welcome-btn btn-style mt-3 "
                  title="Get Directions"
                  onClick={getRoute}
                  // onClick={() => setInput(inputRef.current.value)}
                >
                  GET DIRECTIONS
                </button>
              </div>
            </div>
          </div>

          <div className="dfs">
          <>
      {/* <button onClick={() => setShowIcon(prev => !prev)}>Click</button> */}
      {/* {showIcon && <div>This is your component</div>} */}
    </>
            <IoLocationSharp size="35" className="mx-2"/>
            <h2 class="M10 F25">
              <em class="fas fa-map-marker-alt MR10 F30"></em>
              <span id="from_address_show"></span>
              <span class="hide"></span>
            </h2>
            {/* <p>{input}</p> */}
            {/* <MdOutlineDoubleArrow size="35" className="mx-5"/> */}
           
            <FaHotel size="35" className="mx-2"/>
            <h2 class="M10 F25">
              <em class="fas fa-building MR10 F30"></em>
              <span id="to_address_show"></span>
              <span class="hide"></span>
            </h2>
          </div>
          <div id="printmap" class="link newdirect text-left"></div>
          <div id="bor_left" class="col-lg-12 col-md-12 col-sm-12 initialdhide MB20">
            <span id="directions"> </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default DirectionComponent;
