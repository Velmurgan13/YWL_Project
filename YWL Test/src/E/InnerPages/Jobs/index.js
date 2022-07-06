import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getSeoDescriptionData,
  getPropJobsData,
} from "../../../DataLayer/datalayerUtilities";
import "../../InnerPages/Jobs/index.css";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
//common banner component
import BannerContainer from "../BannerComponent/BannerContainer";
import { RiHandbagFill } from "react-icons/ri";
import { IoLocationSharp } from "react-icons/io5";
import { object } from "yup";
import {
  CurrentJobTitle,
  CurrentJobLine,
  CustomTitleJobs,
  JobTitle,
} from "./styledIndex";
import { useRecoilValue } from "recoil";
import {
  propertyDataSelector,
  seoThemeDetails,
} from "../../../Recoil/themeModule";

const JobsComponent = () => {
  // const [toggleState, setToggleState] = useState(1);
  const propertyData = useRecoilValue(propertyDataSelector);
  const { overview: seoId } = useRecoilValue(seoThemeDetails);
  const [clicked, setClicked] = useState(false);
  const [seoData, setPropertySeodata] = useState([]);
  const [jobsData, setPropertyJobsdata] = useState([]);
  const [jobsListing, setPropertyjobsListingdata] = useState([]);

  useEffect(() => {
    fetchSeoProperties();
    fetchPropertyJobs();
  }, []);

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData("23");
    setPropertySeodata(response.data);
  };
  const toggle = (index) => {
    if (clicked === index) {
      //if clicked question is already active, then close it
      return setClicked(null);
    }
    setClicked(index);
  };

  const fetchPropertyJobs = async () => {
    const response = await getPropJobsData();
    // console.log(response);
    setPropertyJobsdata(response.property_general_info);
    setPropertyjobsListingdata(response.current_opening_list);
  };

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
      <div className="container mb-3">
        {Object.values(jobsData).map((item) => {
          return (
            <CustomTitleJobs className="boxShadow my-3 bg-light p-3">
              {ReactHtmlParser(item)}
            </CustomTitleJobs>
          );
        })}
        <div className="">
          <CurrentJobTitle className="py-1 jobOpenTitle">
            CURRENT JOB OPENINGS
          </CurrentJobTitle>
          <CurrentJobLine></CurrentJobLine>
        </div>
        <div className="row mx-0">
          {Object.values(jobsListing).map((item) => (
            <div className="col-6 col-md-12 col-lg-6 col-xl-6 bor my-3">
              <div className="shadow p-4 jobs-card">
                <div className="data_con F14-mob text-left">
                  <div className="F18 pt-1 j-title text-uppercase">
                    {ReactHtmlParser(item["jtitle"])}
                  </div>
                  <span className="job_id">
                    JOB ID: {ReactHtmlParser(item["jid"])}
                  </span>
                </div>
                <div className="row mx-0 jobIpad mt-2">
                  <div className="col-7 px-0 mx-0 jobFeature">
                    <div className="data_con data_con_inner">
                      <RiHandbagFill
                        className="mb-1 jobs-icon-color"
                        size="25"
                      />
                      {ReactHtmlParser(item["jexp_from"])}-
                      {ReactHtmlParser(item["jexp_to"])} Years
                    </div>
                    <div className="data_con data_con_inner2">
                      <IoLocationSharp
                        className="mb-1 jobs-icon-color"
                        size="25"
                      />
                      <span className="">
                        {" "}
                        {ReactHtmlParser(item["jcity"])}
                      </span>
                      <span className="">
                        {" "}
                        {ReactHtmlParser(item["jstate"])}
                      </span>
                      <span className="">
                        {" "}
                        {ReactHtmlParser(item["jcountry"])}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-5 col-12 w100 px-0 mx-0 text-center jobs-btn1">
                    <Link to={`/Jobs-Details/${item.id}/${item.job_sub_url}`}>
                      <button
                        type="button"
                        className="home-readmore-btn welcome-btn btn-style mt-4 viewMore"
                        title="VIEW DETAILS"
                      >
                        VIEW DETAILS
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobsComponent;
