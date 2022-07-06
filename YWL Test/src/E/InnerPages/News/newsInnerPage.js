import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import { Link } from 'react-router-dom'
import NewsImage from "../../Yosemitewestgate/assets/images/BannerImages/press-releases-img.png";
import { FaPinterest, FaFacebookF, FaTwitter } from "react-icons/fa";
import "./index.scss";
//common banner component
import ReactHtmlParser from "react-html-parser";
import BannerContainer from "../BannerComponent/BannerContainer";

import {
  getSeoDescriptionData,
  getPropNewsDetailsData,
} from "../../../DataLayer/datalayerUtilities";
import { useRecoilValue } from "recoil";
import {
  themeSelector,
  propertyDataSelector,
} from "../../../Recoil/themeModule";
//social
import { TiSocialFacebook, TiSocialTwitter } from "react-icons/ti";
import { ImPinterest } from "react-icons/im";

const NewsInnerPage = (props) => {
  console.log(props);
  const propertyData = useRecoilValue(propertyDataSelector);
  const { url: baseUrl } = useRecoilValue(themeSelector);
  // console.log(propertyData)
  // console.log(props.match)
  const history = useHistory();
  const [seoData, setPropertySeodata] = useState([]);
  const [NewsDetail, setPropNewsDetailsdata] = useState([]);

  useEffect(() => {
    fetchSeoProperties();
    fetchPropNewsDetails();
  }, []);

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData("31");
    setPropertySeodata(response.data);
  };

  const fetchPropNewsDetails = async () => {
    const response = await getPropNewsDetailsData(props.match.params);
    // console.log(response);
    setPropNewsDetailsdata(response.newsDetail);
    console.log(response.newsDetail);
  };

  return (
    <div>
      <BannerContainer seoData={seoData} />
      <div className="container newsStyle">
        <div className="p-0 card-details">
          <div className="">
            <div className="col-12 ">
              {/* <div className="shadow-lg">
                <img className="p-1" src={NewsImage} alt="inner-page" />
              </div> */}
              {Object.values(NewsDetail).map((item) => {
                return (
                  <div className="">
                    <div className="mt-md-0 mt-5 align-items-center row mt-xs-10">
                      <div className="news_image-details  p-0  col-12 col-md-12 col-lg-12 col-xl-12">
                        <img
                          className="w-100"
                          src={baseUrl + "/" + item.images[0].img_name}
                          alt=""
                          title={item["news_title"]}
                          // onError={e => {
                          //   e.currentTarget.src =
                          //     'https://beta.laquintasantacruz.com/gallery-images/default-vector-bedroom-image.jpg'
                          // }}
                        />
                      </div>
                      <div className="mt-3 col-12 col-md-12 col-lg-12 col-xl-12 mt px-md-3 pr-md-0">
                        <em
                          className="fab fa-facebook-f"
                          aria-hidden="true"
                        ></em>
                        <div className="new-title-one-detail text-center font-weight col-12 min-h-0 my-4 px-0">
                          {ReactHtmlParser(item["news_title"])}
                        </div>
                        <div className="news_date_inner min-h-0">
                          <p className="mb-0">MAR 20, 2018</p>
                        </div>
                        <div className="social-icons col-12 ">
                          <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https://www.yosemitewestgate.com/news/267/IMPACTS%20OF%20WAR%20CONFLICTS%20IN%20THE%20TOURISM%20INDUSTRY" className="social-icon social-icon--facebook mx-3">
                            <TiSocialFacebook
                              size="30"
                              className="text-center"
                              title="Facebook"
                            />
                            <div className="tooltip">Facebook</div>
                          </a>
                          <a target="_blank" href="https://twitter.com/intent/tweet?url=https://alpha.yosemitewestgate.com/news/267/IMPACTS%20OF%20WAR%20CONFLICTS%20IN%20THE%20TOURISM%20INDUSTRY"  className="social-icon social-icon--twitter mx-3">
                            <TiSocialTwitter
                              size="30"
                              className="text-center"
                              title="Twitter"
                            />
                            <div className="tooltip">Twitter</div>
                          </a>

                          <a target="_blank" href="http://pinterest.com/pin/create/button/?url=https://alpha.yosemitewestgate.com/news/267/IMPACTS%20OF%20WAR%20CONFLICTS%20IN%20THE%20TOURISM%20INDUSTRY&description=news"  className="social-icon social-icon--pinterest mx-3">
                            <ImPinterest size="30" className="text-center" title="Pinterest" />
                            <div className="tooltip">Skype</div>
                          </a>
                        </div>

                        <div className="news_sum details mx-1 mx-md-3 mx-lg-5 mx-xl-5 mb-5">
                          {ReactHtmlParser(item["news_desc"])}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="text-center py-3 mb-3">
          <button
            type="button"
            onClick={() => history.goBack()}
            className="back-custm-btn my-5"
            title="Back"
          >
            BACK
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsInnerPage;
