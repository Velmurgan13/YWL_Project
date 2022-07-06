import React, { useState, useEffect } from "react";
import BannerContainer from "../../../InnerPages/BannerComponent/BannerContainer";
import {
    getSeoDescriptionData, getPropVirtualToursData
} from "../../../../DataLayer/datalayerUtilities";
import "../virtualTours/index.scss";
import { useRecoilValue } from "recoil";
import {
    seoThemeDetails, propertyDataSelector
} from "../../../../Recoil/themeModule";

export default function VirtualToursPage() {

    const { dvirtualtours: seoId } = useRecoilValue(seoThemeDetails);
    const [seoData, setPropertySeodata] = useState([]);
    const [VirtualToursData, setVirtualToursData] = useState([]);

    const [xmlurl, setxmlurl] = useState("https://www.innsight.com/virtual/index.php?value=yosemite.xml");


    useEffect(() => {
        fetchSeoProperties();
    }, []);

    useEffect(() => {
        fetchVirtualTours();
        
    }, []);

    const fetchSeoProperties = async () => {
        const response = await getSeoDescriptionData(seoId);
        setPropertySeodata(response.data);
    };

    const fetchVirtualTours = async () => {
        const response = await getPropVirtualToursData();
        setVirtualToursData(response.data.panographics);
    };

    
    
    return (
        <div className="Virtualpage">
            <div className="">
                <BannerContainer seoData={seoData}
                />  
                <div className="container mt-4 mt-50">
                    <iframe width="100%" height="434" src={"https://www.innsight.com/virtual/index.php?value=" + xmlurl} title="Video"></iframe>
                </div>
                <div className="container">
                    <div className="row mx-1 my-3">
                        {Object.values(VirtualToursData).map((item) => {
                            return (
                                <a onClick={() => setxmlurl(item.panographicurl !== "" ? item.panographicurl : item.panographicxml)} className="px-2 py-3 col-12 col-md-6 col-xl-3 col-lg-3 fix-height"> <div className="col-12 col-md-12 mx-0 border border-secondary p-5"><img src={
                                    "https://my.innstaging.com/" +
                                    "assets/user_images/properties/panographic/thumbs/" +
                                    item.img_name
                                }
                                    alt={item.name}
                                    className="W100"
                                />
                                </div>
                                </a>

                            );
                        })} </div>
                </div>
            </div>
        </div>
    )
}



