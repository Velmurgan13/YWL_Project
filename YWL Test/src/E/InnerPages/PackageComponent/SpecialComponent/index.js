import React, { useState, useEffect } from "react";
import BannerContainer from "../../BannerComponent/BannerContainer";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
// import dummy from '../../Yosemitewestgate/assets/images/sanitizer.jpg'
import { motion } from "framer-motion";
import { seoThemeDetails } from "../../../../Recoil/themeModule";
import { useRecoilValue } from "recoil";
import {
  themeSelector,
  propertyDataSelector,
} from "../../../../Recoil/themeModule";
import {
  getPackagesInfoData,
  getSeoDescriptionData,
} from "../../../../DataLayer/datalayerUtilities";
// import { getSeoDescriptionData } from '../../../DataLayer/datalayerUtilities'
import "./index.scss";

const SpecialComponent = (props) => {
  const propertyData = useRecoilValue(propertyDataSelector);
  // console.log(propertyData);
  const { url: baseUrl } = useRecoilValue(themeSelector);
  // console.log(baseUrl);
  // console.log(props.propertyId);
  const { guestrooms: seoId } = useRecoilValue(seoThemeDetails);
  const [seoData, setPropertySeodata] = useState([]);
  const [packagesData, setPackagesData] = useState([]);

  useEffect(() => {
    fetchSeoProperties();
    fetchPackagesData();
  }, []);

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData(seoId);
    setPropertySeodata(response.data);
  };

  const fetchPackagesData = async () => {
    const response = await getPackagesInfoData();
     console.log("this is first", response.data);
    setPackagesData(response.data.package_details);
  };

  return (
    <div className="container-fluid px-0 text-center mb-5">
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.4 }}
      >
        <BannerContainer seoData={seoData} />
      </motion.div>
      <div className="container specialComponent px-0">
        <div className="row mx-0">
          {Object.values(packagesData).map((item) => (
            <div className="col-md-6 col-lg-4 col-xl-4 col-12 mt-3 mt-md-0 packageCard">
              <div className="EventBox mt-3 mb-4 pb-3 test">
                <a href="">
                  <img
                    className="w-100"
                    src={baseUrl + "/" + item.package_images[0].img_name}
                    alt="fff"
                    title={item.ptitle}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://beta.laquintasantacruz.com/gallery-images/default-vector-bedroom-image.jpg";
                    }}
                  />
                </a>
                <div className="card-body specialcls">
                  <div className="eventcontent">
                    <h3 className="title mb-0">{ReactHtmlParser(item.ptitle)}</h3>
                    {/* <div class="description">
                <p className="form-title">{ReactHtmlParser(item.short_description)}</p>
              </div> */}
                    <Link to={`/packages/${item.subdomain}`} className="">
                      <button
                        className="home-readmore-btn welcome-btn btn-style mt-3 btnPosition"
                        title={item.ptitle}
                      >
                        See Details
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

export default SpecialComponent;
