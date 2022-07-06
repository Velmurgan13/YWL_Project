
import React, { useState, useEffect } from "react";
import BannerContainer from '../../../InnerPages/BannerComponent/BannerContainer';

import {
    getSeoDescriptionData, getPropParkingData
} from "../../../../DataLayer/datalayerUtilities";
import ReactHtmlParser from "react-html-parser";
import { useRecoilValue } from "recoil";
import {
    seoThemeDetails,  propertyDataSelector, propertyData
} from "../../../../Recoil/themeModule";

export default function ParkingPage() {
    const { parking: seoId } = useRecoilValue(seoThemeDetails);
    const [seoData, setPropertySeodata] = useState([]);
    const propertyData = useRecoilValue(propertyDataSelector);
// console.log(propertyData);
    useEffect(() => {
        fetchSeoProperties();
    }, []);
  

    const fetchSeoProperties = async () => {
        const response = await getSeoDescriptionData(seoId);
        setPropertySeodata(response.data);
    };

    return (
        <div>
               <BannerContainer seoData= {seoData}
            />
            <div className="container">
           <div className='pt-3 fs-16'>
             {ReactHtmlParser(propertyData.guest_parking)}
             </div>
            </div>
        </div>
    )
}
