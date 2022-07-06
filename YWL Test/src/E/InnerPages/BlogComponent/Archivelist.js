import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
import { useRecoilValue } from "recoil";
import './index.scss';
import moment from 'moment';
import ReactHtmlParser from "react-html-parser";
import { seoThemeDetails, propertyDataSelector } from "../../../Recoil/themeModule";
import {
    getSeoDescriptionData,
    getPropBlogData,
} from "../../../DataLayer/datalayerUtilities";
import BannerContainer from "../BannerComponent/BannerContainer";
import { Link } from 'react-router-dom';

export default function Archivelist() {
    const propertyData = useRecoilValue(propertyDataSelector);
    const [archieveDate, setArchieveDate] = useState([]);
    const [seoData, setPropertySeodata] = useState([]);
    console.log(propertyData);
    const { blog: seoId } = useRecoilValue(seoThemeDetails);

    useEffect(() => {
        fetchSeoProperties();
        fetchPropertyBlogData();
    }, []);

    const fetchSeoProperties = async () => {
        const response = await getSeoDescriptionData(seoId);
        setPropertySeodata(response.data);
    };
    const fetchPropertyBlogData = async (data, datevalue ) => {
        // var blog_type = value;
        var blog_category = data;
         var blog_date = datevalue
        const final_data = {blog_category, blog_date};
        const response = await getPropBlogData(final_data);
        console.log("check here", response);
        setArchieveDate(response.data.getArchieveYear);
      };
    

    return (
        <div >
            <BannerContainer seoData={seoData} />
     <div className="container blogParent">
     <>
                      {Object.values(archieveDate).map(item => {
                        return (
                          <Link to={`/blog/archieve/September-${item.yearadded}`}
                          onClick={() => fetchPropertyBlogData(item.yearadded,'yearadded')}>
                            <li className="list-unstyled text-left text-dark fs-16 d-flex">
                              {ReactHtmlParser(item.yearadded)}
                              <ul className="d-flex months-style list-unstyled mx-3">
                                {/* <p className="text-dark mx-5 unstyled-none"> {moment.months()}</p> */}
                                  <li>jan</li>
                                  <li>feb</li>
                                  <li>March</li>
                                  <li>April</li>
                                  <li>May</li>
                                  <li>June</li>
                                  <li>july</li>
                                  <li>Aug</li>
                                  <li>Sept</li>
                                  <li>oct</li>
                                  <li>nov</li>
                                  <li>dec</li>
                              </ul>
                            </li>
                          </Link>
                          
                        )
                      })}
                    </>
     </div>
            </div>
    )
}
