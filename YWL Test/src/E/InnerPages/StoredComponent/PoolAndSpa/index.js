import React, { useState, useEffect } from "react";
import BannerContainer from "../../../InnerPages/BannerComponent/BannerContainer";
import {
    getSeoDescriptionData
} from "../../../../DataLayer/datalayerUtilities";

import { useRecoilValue } from "recoil";
import {
    seoThemeDetails,  propertyDataSelector
} from "../../../../Recoil/themeModule";
import ReactHtmlParser from "react-html-parser";

export default function CreditCardpage() {
    const { creditcard: seoId } = useRecoilValue(seoThemeDetails);
    const [seoData, setPropertySeodata] = useState([]);
    const propertyName = useRecoilValue(propertyDataSelector);
    
    useEffect(() => {
        fetchSeoProperties();
    }, []);
    // console.log(propertyName)

    const fetchSeoProperties = async () => {
        const response = await getSeoDescriptionData(seoId);
        setPropertySeodata(response.data);
    };


    return (
        <div>
            <BannerContainer seoData={seoData} />
            <div className="container CreditCard mb-5 mt-4">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 PB20 credit-card-div">
                    <div className="credit-card-para f-16 " style={{fontSize: '16px'}}>
                       {ReactHtmlParser(propertyName.general)} </div>
                </div>
               
            </div>
        </div>
    )
}
