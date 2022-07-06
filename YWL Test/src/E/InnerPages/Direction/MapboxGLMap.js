import React, { useState, useEffect } from "react";
import ReactMapboxGl,{ Layer, Feature , Marker,ZoomControl,RotationControl,Popup } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import hotelIcon from '../../CommonAssets/Icons/hotel.svg';
import { getPropDirectionMap } from "../../../DataLayer/datalayerUtilities";
import ReactHtmlParser from "react-html-parser";
import { useRecoilValue } from 'recoil';
import {
  propertyDataSelector,themeSelector
} from '../../../Recoil/themeModule';

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiaW5udGVyYWN0MiIsImEiOiJjazhiaWh1M3MwYzd0M2V0cTNsaHVsajh3In0.cvdq8Buk7G9WAfnJhQIn3A",
});

const Mapbox = () => {
  const propertyData = useRecoilValue(propertyDataSelector);

  const themeSelectorData = useRecoilValue(themeSelector);

  // const Map = ReactMapboxGl({
  //   accessToken: themeSelectorData.map_key,
  // });
  
  const [Mapboxdata, setDirectionMapdata] = useState([]);
  const [lng, setLng] = useState();
  const [lat, setLat] = useState();
  
  useEffect(() => {
    fetchDirectionMap();
  }, []);
  

  const fetchDirectionMap = async () => {
    const response = await getPropDirectionMap();
    setDirectionMapdata(response.map_data);
  };
  var map_type = 'streets-v11';

  function closePopup(){
    document.getElementById("popup_data").style.display = "none";
  }
  function openPopup(){
    document.getElementById("popup_data").style.display = "block";
  
  }
  
  return (
    <>
      <>
        <Map
          style={'mapbox://styles/mapbox/'+map_type}
          containerStyle={{
            height: '550px',
            width: '100%',
            border:'1px solid'
            }}
            Compass = "true"
          center={[ReactHtmlParser(propertyData.longitude), ReactHtmlParser(propertyData.latitude)]}
          zoom={[12]}
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
            coordinates={[ReactHtmlParser(propertyData.longitude),ReactHtmlParser(propertyData.latitude)]}
            >
             <div id ='popup_data' className="mapBox_popup">
             <button type='button' onClick={closePopup}>X</button><br></br><strong>Property Name: </strong>{ReactHtmlParser(propertyData.property_name)}<br></br><strong>Location:</strong>{ReactHtmlParser(propertyData.street_address)}<br></br><strong>City:</strong>{ReactHtmlParser(propertyData.city)}<br></br><strong>State:</strong>{ReactHtmlParser(propertyData.state)}<br></br><strong>Country:</strong>{ReactHtmlParser(propertyData.country)} 
             </div>
          </Popup>
          </>
          );
          })}

      </Map>

    </>
    </>
  );
};
export default Mapbox;