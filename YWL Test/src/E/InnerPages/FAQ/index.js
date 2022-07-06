import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { motion } from "framer-motion";
import { seoThemeDetails } from "../../../Recoil/themeModule";
import ReactHtmlParser from "react-html-parser";
import {
  getSeoDescriptionData,
  getPropFaqData,
} from "../../../DataLayer/datalayerUtilities";
import Accordion from "../../InnerPages/FAQ/Accordion";
import BannerContainer from "../../InnerPages/BannerComponent/BannerContainer";

const FaqComponent = () => {
  const { faq: seoId } = useRecoilValue(seoThemeDetails);
  const [seoData, setPropertySeodata] = useState([]);
  const [faqData, setPropertyFaqdata] = useState([]);

  let isOpen = true;
  if (window.location.href.includes("bookingConfirmation")) {
    isOpen = false;
  } else {
    isOpen = true;
  }


  useEffect(() => {
    fetchSeoProperties();
    fetchPropertyFaq();
  }, []);

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData(seoId);
    setPropertySeodata(response.data);
  };

  const fetchPropertyFaq = async () => {
    const response = await getPropFaqData();
    // console.log(response.data);
    setPropertyFaqdata(response.data);
  };

  return (
    <div>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.4 }}
      >
     
        <BannerContainer seoData={seoData}  />

      </motion.div>
      <div className="container mx-auto faqData pb-5">
        {faqData.map((item) => {
          return (
            <div>
              <Accordion
                title={ReactHtmlParser(item.question)}
                isOpenFlag={isOpen}
              >
                {ReactHtmlParser(item.answer)}
              </Accordion>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default FaqComponent;
