import React, { useState, useEffect } from "react";
import ReactMapboxGl,{ Marker,ZoomControl,RotationControl,Popup } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactHtmlParser from "react-html-parser";
import hotelIcon from '../../../CommonAssets/Icons/hotel.svg';
import TouristIcon from "../../../CommonAssets/Icons/Tourist.svg";
import { getPropDirectionMap } from "../../../../DataLayer/datalayerUtilities";
import { useRecoilValue } from 'recoil';
import {
  propertyDataSelector,themeSelector
} from '../../../../Recoil/themeModule';

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiaW5udGVyYWN0MiIsImEiOiJjazhiaWh1M3MwYzd0M2V0cTNsaHVsajh3In0.cvdq8Buk7G9WAfnJhQIn3A",
});


const AttractionDetailsMapbox = (props) => {
  const attractionDetailsData = props.attractionDetails;
  const propertyData = useRecoilValue(propertyDataSelector);

  const themeSelectorData = useRecoilValue(themeSelector);

  // const Map = ReactMapboxGl({
  //   accessToken: themeSelectorData.map_key,
  // });

  const [Mapboxdata, setDirectionMapdata] = useState([]);
  const AttractionMarker = [props.attractionDetails[0].longitude,props.attractionDetails[0].latitude];
  
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
      <div className="">
        <Map
          style="mapbox://styles/mapbox/streets-v11"
          containerStyle={{
            height: '565px',
            width: '100%'
            }}
            Compass = "true"
          center={[ReactHtmlParser(propertyData.longitude), ReactHtmlParser(propertyData.latitude)]}
          zoom={[9]}
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

          <Popup
           className="bg-white"
            coordinates={[ReactHtmlParser(propertyData.longitude),ReactHtmlParser(propertyData.latitude)]}
            >
             <div id ='popup_data' className="mapBox_popup">
             <button type='button' onClick={closePopup}>X</button><br></br><strong>Property: </strong>{ReactHtmlParser(propertyData.property_name)}<br></br>{ReactHtmlParser(propertyData.street_address)},{ReactHtmlParser(propertyData.city)},{ReactHtmlParser(propertyData.state)},{ReactHtmlParser(propertyData.country)} 
             </div>
          </Popup>
            </>
            );
            })}
          {Object.values(attractionDetailsData).map((item) => {
          return (
            <>
          <Marker
            coordinates={AttractionMarker}
            anchor="bottom"
            onClick={openAttractionPopup}>
            <img src={TouristIcon} className="map-marker w-25"/>
          </Marker>

          <Popup
           className="bg-white"
            coordinates={AttractionMarker}
            >
             <div id ='AttractionPopup_data' className="mapBox_popup">
             <button type='button' onClick={closeAttractionPopup}>X</button><br></br><strong>Attraction Name:</strong>{ReactHtmlParser(item.name)}
             </div>
          </Popup>
          </>
        );
        })}
          
      </Map>
      </div>
    </>
  );
};
export default AttractionDetailsMapbox;