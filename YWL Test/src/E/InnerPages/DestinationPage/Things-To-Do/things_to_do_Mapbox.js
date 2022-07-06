import React, { useState, useEffect } from "react";
import ReactMapboxGl,{ Layer, Feature , Marker,ZoomControl,RotationControl,Popup } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import hotelIcon from '../../../CommonAssets/Icons/hotel.svg';
import Resturants from '../../../CommonAssets/Icons/Restro.svg';
import Banks from '../../../CommonAssets/Icons/Bank.svg';
import Bars from '../../../CommonAssets/Icons/Bar.svg';
import Coffee_Tea from '../../../CommonAssets/Icons/Cafe.svg';
import Drugstores from '../../../CommonAssets/Icons/Medical.svg';
import Gas_Stations from '../../../CommonAssets/Icons/Petrol pump.svg';
import Nightlife from '../../../CommonAssets/Icons/NightLife.svg';
import Shopping from '../../../CommonAssets/Icons/Shoping Bag.svg';
import Beauty_Spa from '../../../CommonAssets/Icons/Spa.svg';
import Local_Services from '../../../CommonAssets/Icons/Tour guide.svg';
import { getPropDirectionMap } from "../../../../DataLayer/datalayerUtilities";
import ReactHtmlParser from "react-html-parser";
import { useRecoilValue } from 'recoil';
import {
  propertyDataSelector,themeSelector
} from '../../../../Recoil/themeModule';

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiaW5udGVyYWN0MiIsImEiOiJjazhiaWh1M3MwYzd0M2V0cTNsaHVsajh3In0.cvdq8Buk7G9WAfnJhQIn3A",
});

const ThingToDoMapbox = (props) => {

  const datanew=[Resturants,Banks,Bars,Coffee_Tea,Drugstores,Gas_Stations,Nightlife,
    Shopping,Beauty_Spa , Local_Services];

  const themeSelectorData = useRecoilValue(themeSelector);

  // const Map = ReactMapboxGl({
  //   accessToken: themeSelectorData.map_key,
  // });

  const NewthingsToDoData = props.thingsToDoData;
  const NewTabIndex = props.toggleState;
  const propertyData = useRecoilValue(propertyDataSelector);
  const [Mapboxdata, setDirectionMapdata] = useState([]);

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

  function openThingsToDoPopup(){
    document.getElementById("Things_to_do_Popup_data").style.display = "block";
  }

  function closeThingsToDoPopup(){
    document.getElementById("Things_to_do_Popup_data").style.display = "none";
  }
  
  return (
    <>
      <>
 <div className="container px-0">
 <Map className="w-100"
          style={'mapbox://styles/mapbox/'+map_type}
          containerStyle={{
            height: '400px',
            // width: '100%',
            border:'1px solid'
            }}
            Compass = "true"
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
            <img src={hotelIcon} className="map-marker"/>
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


        {Object.values(NewthingsToDoData).map((item, index) => {
          return (
            <><Marker
              // key={index}
              anchor="bottom"
              coordinates={[
                ReactHtmlParser(item.coordinates.longitude),
                ReactHtmlParser(item.coordinates.latitude),
              ]}
              onClick={openThingsToDoPopup}
            >
              <img src={datanew[NewTabIndex-1]} className="map-marker" />
            </Marker>
            <Popup
                coordinates={[  
                  ReactHtmlParser(item.coordinates.longitude),
                ReactHtmlParser(item.coordinates.latitude),]}
            >
                <div id='Things_to_do_Popup_data' className="mapBox_popup">
                <button type='button' onClick={closeThingsToDoPopup}>X</button><br></br>{ReactHtmlParser(item.name)}<br></br>{ReactHtmlParser(item.location.address1)},<br></br>{ReactHtmlParser(item.location.city)},{ReactHtmlParser(item.location.state)},{ReactHtmlParser(item.location.zip_code)}<br></br>
                <a
                                    target="_blank"
                                    href={`/directions`}
                                    title="Get directions"
                                  >
                                    Get Directions
                                  </a> |
                <a
                                  target="_blank"
                                  href={ReactHtmlParser(item.url)}
                                >
                                See More
                                </a>
                </div>
              </Popup></>

          );
        })}

      </Map>
 </div>

    </>
    </>
  );
};
export default ThingToDoMapbox;