import React, { useState, useEffect } from "react";
import ReactMapboxGl,{ Marker,ZoomControl,RotationControl,Popup } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactHtmlParser from "react-html-parser";
import HotelIcon from '../../../CommonAssets/Icons/hotel.svg';
import BuildingIcon from '../../../CommonAssets/Icons/Building.svg';
import { getPropDirectionMap } from '../../../../DataLayer/datalayerUtilities';
import { useRecoilValue } from 'recoil';
import {
  propertyDataSelector,themeSelector
} from '../../../../Recoil/themeModule';


const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiaW5udGVyYWN0MiIsImEiOiJjazhiaWh1M3MwYzd0M2V0cTNsaHVsajh3In0.cvdq8Buk7G9WAfnJhQIn3A",
});

const FriendDetailsMapbox = (props) => {
  const propertyData = useRecoilValue(propertyDataSelector);

  const themeSelectorData = useRecoilValue(themeSelector);

  // const Map = ReactMapboxGl({
  //   accessToken: themeSelectorData.map_key,
  // });

  const friendsDetailsData = props.friendsDetailsData;
  const [Mapboxdata, setDirectionMapdata] = useState([]);
  const markerdata = [props.friendsDetailsData[0].longitude,props.friendsDetailsData[0].latitude];
  
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

  function openfriendPopup(){
    document.getElementById("friendpopup_data").style.display = "block";
  }

  function closefriendPopup(){
    document.getElementById("friendpopup_data").style.display = "none";
  }

  
  return (
      <div className="">
        <Map className="bdr-map container px-0"
          style="mapbox://styles/mapbox/streets-v11"
          containerStyle={{
            height: '565px',
            width: '100%'
            }}
            Compass = "true"
          center={[ReactHtmlParser(propertyData.longitude), ReactHtmlParser(propertyData.latitude)]}
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
            <img src={HotelIcon} className="map-marker w-25"/>
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
          {Object.values(friendsDetailsData).map((item) => {
          return (
            <>
          <Marker
            coordinates={markerdata}
            anchor="bottom"
            onClick={openfriendPopup}>
            <img src={BuildingIcon} className="map-marker w-25"/>
          </Marker>

          <Popup
            coordinates={markerdata}
            >
             <div id ='friendpopup_data' className="mapBox_popup">
             <button type='button' onClick={closefriendPopup}>X</button><br></br>{ReactHtmlParser(item.name)}<br></br>{ReactHtmlParser(item.address)}<br></br>{ReactHtmlParser(item.web_url)}
             </div>
          </Popup>
          </>
        );
        })}
          
      </Map>
    </div>
  );
};
export default FriendDetailsMapbox;