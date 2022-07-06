import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import "../../DestinationPage/AttractionPage/index.scss";
import {
  getSeoDescriptionData,
  getPropAttractionsDetailsData,
} from "../../../../DataLayer/datalayerUtilities";
import {
  propertyDataSelector,
  seoThemeDetails,
} from "../../../../Recoil/themeModule";
import pointericon from '../../../CommonAssets/Icons/pointer.png'
//common banner component
import BannerContainer from "./../../../InnerPages/BannerComponent/BannerContainer";
import './index.scss'
import AttractionDetailsMapbox from "../AttractionPage/AttractionDetailsMapbox.js";


export default function AttractionDetailsPage(props) {
  console.log("attra", props)
  const propertyData = useRecoilValue(propertyDataSelector);
  const { overview: seoId } = useRecoilValue(seoThemeDetails);
  const [seoData, setPropertySeodata] = useState([]);
  const [attractionDetails, setAttractionDetails] = useState([]);
  useEffect(() => {
    fetchSeoProperties();
    fetchAttractionDetails();
  }, []);

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData(seoId);
    // alert(response);
    setPropertySeodata(response.data);
  };

  const fetchAttractionDetails = async () => {
    console.log(props.match.params);
    const response = await getPropAttractionsDetailsData(props.match.params);
    setAttractionDetails(response.attraction);
    console.log(response.attraction);
  };

  return (
    <div>
      <BannerContainer seoData={seoData} />
      {Object.values(attractionDetails).map((item) => {
        return (
          <>
            {item.address != null ? (
              <div className="container-fluid p-0 attraction ">
                <div className="col-12 col-xl-9 col-lg-9 col-md-11 offset-md-1 mx-auto">

                <div className="cust-xs-shadow border my-3 mt-0 d-block d-md-block d-xl-none d-lg-none row mx-0  p-2 p-md-4 position-relative">
                   <div className="row  mx-auto">
                   <div className="friendsdvbxhight">
                      <img src={pointericon} className="img-fluid friendsdvbxhight2" />
                    </div>
                    <div className="col-12 col-md-12 py-3 pl-3">
                      <div className="my-auto att_property">{item.name}</div>
                    </div>
                    <div className="col-12 col-md-12 py-3 px-3">
                      <h6 className="font-weight-bold">ADDRESS: </h6>
                      <p className="ls-1 fs-16">{item.address}</p>
                    </div>
                    <div className="col-12 col-md-12 py-3 px-3">
                      <h6 className="font-weight-bold">PHONE NO: </h6>
                      <p className="ls-1 fs-16">NA</p>
                    </div>
                    <div className="col-12 col-md-12 py-3 px-3">
                      <h6 className="font-weight-bold">WEBSITE URL : </h6>
                      <Link
                        to={item.website_url}
                        target="_blank"
                        className="ls-1 fs-16 attractUrl"
                      >
                        {item.website_url}
                      </Link>
                    </div>
                   </div>
                  </div>

                  <div className="p-2 p-md-3 bg-attractions ">
                    <AttractionDetailsMapbox attractionDetails={attractionDetails} />
                  </div>




          

                  <div className="cust-shadow mt-3 d-none d-md-none d-xl-block d-lg-block row mx-0  p-2 p-md-4 position-relative">
                  <div className="row">
                   <div className="friendsdvbxhight">
                      <img src={pointericon} className="img-fluid friendsdvbxhight2" />
                    </div>
                    <div className="col-12 col-md-3 py-3 pl-3">
                      <div className="my-auto att_property">{item.name}</div>
                    </div>
                    <div className="col-12 col-md-4 py-3 px-3">
                      <h6 className="font-weight-bold">ADDRESS: </h6>
                      <p className="ls-1 fs-16">{item.address}</p>
                    </div>
                    <div className="col-12 col-md-2 py-3 px-3">
                      <h6 className="font-weight-bold">PHONE NO: </h6>
                      <p className="ls-1 fs-16">NA</p>
                    </div>
                    <div className="col-12 col-md-3 py-3 px-3">
                      <h6 className="font-weight-bold">WEBSITE URL : </h6>
                      <Link
                        to={item.website_url}
                        target="_blank"
                        className="ls-1 fs-16 attractUrl"
                      >
                        {item.website_url}
                      </Link>
                    </div>
                   </div>
                  </div>

                  <div>
                    <div class="d-flex justify-content-around pb-md-5 mt-4 mt-md-0 pt-md-0 py-xl-5 py-lg-5 pt-0 pb-5">
                      <Link to="/directions">
                        {" "}
                        <button
                          type="button"
                          class="home-readmore-btn welcome-btn btn-style mt-4 viewMore"
                          title="Get Directions"
                        >
                          GET DIRECTIONS
                        </button>
                      </Link>
                      <Link
                        to="/attractions"
                        title="Back"
                        class="back-custm-btn mt-4"
                      >
                        BACK
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              " "
            )}
          </>
        );
      })}
    </div>
  );
}
