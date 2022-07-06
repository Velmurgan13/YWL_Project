import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import MetaTags from 'react-meta-tags'
import { motion } from "framer-motion";
import DefaultImg  from './../../CommonAssets/images/default-imag.png'
import NoImage from "../../Yosemitewestgate/assets/images/innerpages/no-image.png";
import "./index.scss";
//common banner component
import BannerContainer from "../BannerComponent/BannerContainer";
import ReactHtmlParser from "react-html-parser";
import { NewsDate } from "./styledIndex";
import {
  getSeoDescriptionData,
  getPropNewsData,
} from "../../../DataLayer/datalayerUtilities";
import { useRecoilValue } from "recoil";
import {
  themeSelector,
  propertyDataSelector,
} from "../../../Recoil/themeModule";


const NewsComponent = (props) => {
  const propertyData = useRecoilValue(propertyDataSelector);
  // console.log(propertyData)
  const { url: baseUrl } = useRecoilValue(themeSelector);
  // console.log(baseUrl)
  // console.log(props.match)

  const [seoData, setPropertySeodata] = useState([]);
  const [NewsData, setPropertyNewsdata] = useState([]);

  // const getproNewsUrlWithId = async (id) => {
  //   const response = await getPropNewsData(id)
  //   console.log(response, "hellooooooooooooooo")
  // }

  useEffect(() => {
    fetchSeoProperties();
    fetchPropertyNews();
  }, []);

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData("31");
    setPropertySeodata(response.data);
  };

  const fetchPropertyNews = async () => {
    const response = await getPropNewsData();
    console.log(response, "this sis response ");
    setPropertyNewsdata(response.newsDetail);
  };

  // console.log(NewsData[0], "News Data");
  return (
    <div>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.4 }}
      >
        <BannerContainer seoData={seoData} />
      </motion.div>
      <div className="container mt-2 newsStyle ">
        <div className="row ">
          {
            // Object.values(NewsData).length > 0 ?
            <>
              {Object.values(NewsData).map((item) => {
                // console.log(item['news_title']);
                return (
                  <div className="col-md-6 col-12">
                    <div className=" p-1">
                      <div className="news_date"></div>
                      <NewsDate className="news_date">MAR 20, 2018</NewsDate>
                    </div>
                    <div className="px-1  ls-1">
                      <div className="news_image hello">
                        <img
                          className="w-100"

                          src={baseUrl + "/" + item.images[0].img_name}
                          title={item["news_title"]}
                          alt=""
                          onError={(e) => {
                            e.currentTarget.src =
                        DefaultImg
                          } } />
                      </div>
                      <div className="mt-5 col-lg-12 col-xl-12 col-md-12 col-sm-12 newsContDiv">
                        <div className="new-title-one py-3 pb-0 ">
                          {item["news_title"].toLowerCase()}
                        </div>

                        <div className="news_sum mb-0 line-clamp">
                          {ReactHtmlParser(item["news_desc"])}
                        </div>
                        <div className="my-3 mb-5 newsReadBtn ">
                          <Link to={`/news/${item.id}/${item.news_title}`}>
                            <button
                              type="button"
                              title="Read More"
                              class="home-readmore-btn welcome-btn btn-style mt-3"
                            >
                              READ MORE
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
         
          }
        </div>
      </div>
    </div>
  );
};

export default NewsComponent;
