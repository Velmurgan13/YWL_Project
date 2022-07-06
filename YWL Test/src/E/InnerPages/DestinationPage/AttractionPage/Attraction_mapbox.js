import React, { useState, useEffect } from "react";
import ReactMapboxGl, {
  Marker,
  ZoomControl,
  RotationControl,
  Popup
} from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactHtmlParser from "react-html-parser";
import hotelIcon from "../../../CommonAssets/Icons/hotel.svg";
import { getPropDirectionMap } from "../../../../DataLayer/datalayerUtilities";
import { propertyData } from "../../../../Recoil/themeModule";
import TouristIcon from "../../../CommonAssets/Icons/Tourist.svg";
import "../../DestinationPage/AttractionPage/index.scss";
import { useRecoilValue } from 'recoil';
import {
  propertyDataSelector,themeSelector
} from '../../../../Recoil/themeModule';

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiaW5udGVyYWN0MiIsImEiOiJjazhiaWh1M3MwYzd0M2V0cTNsaHVsajh3In0.cvdq8Buk7G9WAfnJhQIn3A",
});

const AttractionMapbox = (props) => {
  const NewDestinationData = props.DestinationData;
  const propertyData = useRecoilValue(propertyDataSelector);

  const themeSelectorData = useRecoilValue(themeSelector);

  // const Map = ReactMapboxGl({
  //   accessToken: themeSelectorData.map_key,
  // });

  const propertyMarker = [propertyData.longitude,propertyData.latitude];
  const [Mapboxdata, setDirectionMapdata] = useState([]);

  useEffect(() => {
    fetchDirectionMap();
  }, []);

  const fetchDirectionMap = async () => {
    const response = await getPropDirectionMap();
    setDirectionMapdata(response.map_data);
  };

  function closePopup(){
    document.getElementById("popup_data").style.display = "none";
  }
  function openPopup(){
    document.getElementById("popup_data").style.display = "block";
  }

  function openAttractionPopup(){
    document.getElementById("AttractionPopup_data").style.display = "block";
  }

  function closeAttractionPopup(){
    document.getElementById("AttractionPopup_data").style.display = "none";
  }

  return (
    <>
      <Map
        style="mapbox://styles/mapbox/streets-v11"
        containerStyle={{
          width: "100%",
          height: "405px",
        }}
        Compass="true"
        center={[ReactHtmlParser(propertyData.longitude), ReactHtmlParser(propertyData.latitude)]}
        zoom={[8]}
      >
        <ZoomControl />
        <RotationControl />

        {Object.values(propertyData).map(() => {
          return (
            <>
          <Marker
            coordinates={[ReactHtmlParser(propertyData.longitude),ReactHtmlParser(propertyData.latitude)]}
            anchor="bottom"
            onClick={openPopup}>
            <img src={hotelIcon} className="map-marker w-25"/>
          </Marker>
 
          <Popup className="bg-white"
            coordinates={[ReactHtmlParser(propertyData.longitude),ReactHtmlParser(propertyData.latitude)]}
            >
             <div id ='popup_data' className="mapBox_popup bg-white">
             <button type='button' onClick={closePopup}>X</button><br></br><strong>Property Name: </strong>{ReactHtmlParser(propertyData.property_name)}<br></br><strong>Location:</strong>{ReactHtmlParser(propertyData.street_address)}<br></br><strong>City:</strong>{ReactHtmlParser(propertyData.city)}<br></br><strong>State:</strong>{ReactHtmlParser(propertyData.state)}<br></br><strong>Country:</strong>{ReactHtmlParser(propertyData.country)} 
             </div>
          </Popup>
          </>
          );
          })}


        {/* <Cluster > */}
        {Object.values(NewDestinationData).map((item, index) => {
          return (
            <><Marker 
              // key={index}
              coordinates={[
                ReactHtmlParser(item.lon),
                ReactHtmlParser(item.lat),
              ]}
              onClick={openAttractionPopup} 
            >
              <img src={TouristIcon} className="map-marker w-25" />
            </Marker>
            <Popup 
                coordinates={[  
                  ReactHtmlParser(item.lon),
                  ReactHtmlParser(item.lat),]}
            >
                <div id='AttractionPopup_data' className="mapBox_popup">
                <button type='button' onClick={closeAttractionPopup}>X</button><br></br>{ReactHtmlParser(item.attraction_name)}<br></br>{ReactHtmlParser(item.address1)},{ReactHtmlParser(item.city)},{ReactHtmlParser(item.state)},{ReactHtmlParser(item.zip_code)}<br></br>Category:{ReactHtmlParser(item.cat_name)}
                </div>
              </Popup></>

          );
        })}
        {/* </Cluster> */}
      </Map>
    </>
  );
};
export default AttractionMapbox;
