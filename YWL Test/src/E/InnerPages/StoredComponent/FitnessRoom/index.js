
import React, { useState, useEffect } from "react";
//common banner component
import BannerContainer from "../../BannerComponent/BannerContainer";
import {
  getSeoDescriptionData, getPropFitnessData
} from "../../../../DataLayer/datalayerUtilities";
import ReactHtmlParser from "react-html-parser";
import { useRecoilValue } from "recoil";
import {
  seoThemeDetails,  propertyDataSelector, propertyData
} from "../../../../Recoil/themeModule";
import "./index.css";

const FitnessRoomComponent = () => {
  const { parking: seoId } = useRecoilValue(seoThemeDetails);
    const [seoData, setPropertySeodata] = useState([]);
    const [fitnessData, setfitnessData] = useState([]);
    const propertyData = useRecoilValue(propertyDataSelector);


// console.log(propertyData);


useEffect(() => {
        fetchSeoProperties();
        fetchFitnessDataProperties();
    }, []);
  
    const fetchSeoProperties = async () => {
      const response = await getSeoDescriptionData(seoId);
      setPropertySeodata(response.data);
  };


   const fetchFitnessDataProperties = async () => {
    const response = await getPropFitnessData()
    // console.log('this is fitness', response);
    setfitnessData(response.data)
    // console.log(response);
  }

  return (
    <div>
  <BannerContainer seoData= {seoData} />
      <div className="container">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="fs-16">
          {ReactHtmlParser(propertyData.general)}
          </div>
        </div>
        
      </div>
    </div>
  );
};
export default FitnessRoomComponent;
