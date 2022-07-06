// import React, { useState, useEffect } from "react";
// //import { faqContentObject } from "../../../Data/faqData";
// // import styled from 'styled-components'
// import { IconContext } from "react-icons";
// import Accordion from 'react-bootstrap/Accordion'
// import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
// import "./index.css";
// import {
//   AccordionSection,
//   Wrap,
//   Dropdown,
//   FaqReadmore,
//   FaqMain,
//   Faqcard,
//   FaqData,
// } from "./styledIndex";
// import {
//   getSeoDescriptionData,
//   getPropFaqData,
// } from "../../../DataLayer/datalayerUtilities";
// import { useRecoilValue } from 'recoil';
// import { propertyDataSelector, seoThemeDetails } from "../../../Recoil/themeModule";
// import ReactHtmlParser from "react-html-parser";
// import BannerContainer from "../BannerComponent/BannerContainer";
// const FaqComponent = () => {
//   const [clicked, setClicked] = useState(false);
//   const { faq: seoId } = useRecoilValue(seoThemeDetails);
//   const [seoData, setPropertySeodata] = useState([]);
//   const [faqData, setPropertyFaqdata] = useState([false]);
//   useEffect(() => {
//     fetchSeoProperties();
//     fetchPropertyFaq();
//   }, []);
//    const fetchSeoProperties = async () => {
//     const response = await getSeoDescriptionData(seoId)
//     setPropertySeodata(response.data)
//   }
//   const fetchPropertyFaq = async () => {
//     const response = await getPropFaqData();
//     console.log(response.data);
//     setPropertyFaqdata(response.data);
//   };
//   return (
//     <div>
//         <BannerContainer seoData={seoData} />
//       <IconContext.Provider value={{ color: "#215f35", size: "25px" }}>
//         <AccordionSection className="faqCardDetails">
//           <div className="container my-5">
//             {/* {faqData.map((item, index) => { */}
//               {/* return ( */}
//                 <>
//                   <Accordion defaultActiveKey="0" flush>
//   <Accordion.Item eventKey="0">
//     <Accordion.Header> hello</Accordion.Header>
//     <Accordion.Body>
//     {/* {ReactHtmlParser(item.answer)} */}
//       helllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
//     </Accordion.Body>
//   </Accordion.Item>
//   <Accordion.Item eventKey="1">
//     <Accordion.Header>Accordion Item #2</Accordion.Header>
//     <Accordion.Body>
//     {/* {ReactHtmlParser(item.answer)} */}
//     ajwhdhadhawdlihlaaaaaak
//     </Accordion.Body>
//   </Accordion.Item>
// </Accordion>
//                 </>
//               {/* );
//             })} */}
//           </div>
//         </AccordionSection>
//       </IconContext.Provider>
//     </div>
//   );
// };
// export default FaqComponent;
"use strict";