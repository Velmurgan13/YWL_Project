// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import ReactHtmlParser from "react-html-parser";
// import { motion } from "framer-motion";
// import {
//   getSeoDescriptionData,
//   getThingToDoData,
// } from "../../../../DataLayer/datalayerUtilities";
// import "./index.css";
// import ThingToDoMapbox from "./things_to_do_Mapbox";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import {
//   FaCocktail,
//   FaCoffee,
//   FaStar,
//   FaGasPump,
//   FaMapMarkerAlt,
//   FaPlusCircle,
//   FaShoppingBag,
//   FaSpa,
//   FaUniversity,
//   FaUtensils,
// } from "react-icons/fa";
// import { HiMenuAlt1 } from "react-icons/hi";
// //common images
// import BannerContainer from "../../../InnerPages/BannerComponent/BannerContainer";
// import { useRecoilValue } from "recoil";
// import Slider from "react-slick";
// import {
//   propertyDataSelector,
//   seoThemeDetails,
// } from "../../../../Recoil/themeModule";
// import { Dropdown, DropdownButton } from "react-bootstrap";


// export default function ThingsToDoPage(props) {
//   const propertyData = useRecoilValue(propertyDataSelector);
//    console.log(propertyData);
//   const { thingstodo: seoId } = useRecoilValue(seoThemeDetails);
//   const [thingsToDoData, setThingsToDoData] = useState([]);
//   const [toggleState, setToggleState] = useState(1);
//   const [clicked, setClicked] = useState(false);
//   const [seoData, setPropertySeodata] = useState([]);
//   const [tabName, setActiveTabName] = useState("Resturants");
//   const [dropDName, setdropDName] = useState("Resturant");
//   var settings = {
//     dots: false,
//     arrows: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     rows: 2,
//     slidesToScroll: 1,

//     responsive: [
//       {
//         breakpoint: 900,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   useEffect(() => {
//     fetchSeoProperties();
//   }, []);

//   useEffect(() => {
//     fetchThingsToDoData();
//   }, [tabName]);

//   const fetchSeoProperties = async () => {
//     const response = await getSeoDescriptionData(seoId);
//     setPropertySeodata(response.data);
//   };

//   const fetchThingsToDoData = async () => {
//     const response = await getThingToDoData({ search_yelp: tabName });
//      console.log(response.yelp.businesses);
//     setThingsToDoData("hello", response.yelp.businesses);
//    console.log("hii", response.yelp.businesses);
//   };

//   const toggle = (index) => {
//     if (clicked === index) {
//       return setClicked(null);
//     }
//     setClicked(index);
//   };

//   const toggleTab = (index, activeTabName, e) => {
//     setToggleState(index);
//     setActiveTabName(activeTabName);
//     setdropDName(e.target.innerHTML);
//   };

//   return (
//     <div>
//       <motion.div
//         initial={{ scaleY: 0 }}
//         animate={{ scaleY: 1 }}
//         exit={{ scaleY: 0 }}
//         transition={{ duration: 0.4 }}
//       >
//         <BannerContainer seoData={seoData} />
//       </motion.div>
//       <div>
//         <ThingToDoMapbox thingsToDoData={thingsToDoData} toggleState={toggleState}/>
//       </div>
//       <div className="container px-0">
//         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 container thingstodo  test">
//           {/* <div className="p-5 border shadow">
//             <div className="py-5">
//               <div className="text center ">
//                 <h3>Add Map</h3>
//               </div>
//             </div>
//           </div> */}

//           <div className="row px-0 my-4 d-flex justify-content-center hidden-sm hidden-xs hidden-md">
//             <div
//               className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
//               onClick={(e) => toggleTab(1, "Resturants", e)}
//             >
//               <div className="featured-icon icon">
//                 <FaUtensils />
//               </div>
//               <h2 className="tab-main-title">
//                 <a className="active" title="Restaurants">
//                   Restaurants
//                 </a>
//               </h2>
//             </div>
//             <div
//               className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
//               onClick={(e) => toggleTab(2, "Banks", e)}
//             >
//               <div className="featured-icon icon">
//                 <FaUniversity />
//               </div>
//               <h2 className="tab-main-title">
//                 <a className="active" title="Restaurants">
//                   Banks
//                 </a>
//               </h2>
//             </div>
//             <div
//               className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
//               onClick={(e) => toggleTab(3, "Bars", e)}
//             >
//               <div className="featured-icon icon">
//                 <FaCocktail />
//               </div>
//               <h2 className="tab-main-title">
//                 <a className="active" title="Restaurants">
//                   Bars
//                 </a>
//               </h2>
//             </div>
//             <div
//               className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
//               onClick={(e) => toggleTab(4, "Coffee_Tea", e)}
//             >
//               <div className="featured-icon icon">
//                 <FaCoffee />
//               </div>
//               {/* <div>Coffee & Tea</div> */}
//               <h2 className="tab-main-title">
//                 <a className="active" title="Restaurants">
//                   Coffee & Tea
//                 </a>
//               </h2>
//             </div>
//             <div
//               className={toggleState === 5 ? "tabs active-tabs" : "tabs"}
//               onClick={(e) => toggleTab(5, "Drugstores", e)}
//             >
//               <div className="featured-icon icon">
//                 <FaPlusCircle />
//               </div>

//               <h2 className="tab-main-title">
//                 <a className="active" title="Restaurants">
//                   Drugstores
//                 </a>
//               </h2>
//             </div>
//             <div
//               className={toggleState === 6 ? "tabs active-tabs" : "tabs"}
//               onClick={(e) => toggleTab(6, "Gas_Stations", e)}
//             >
//               <div className="featured-icon icon">
//                 <FaGasPump />
//               </div>

//               <h2 className="tab-main-title">
//                 <a className="active" title="Restaurants">
//                   Gas Stations
//                 </a>
//               </h2>
//             </div>
//             <div
//               className={toggleState === 7 ? "tabs active-tabs" : "tabs"}
//               onClick={(e) => toggleTab(7, "Nightlife", e)}
//             >
//               <div className="featured-icon icon">
//                 <FaUtensils />
//               </div>

//               <h2 className="tab-main-title">
//                 <a className="active" title="Restaurants">
//                   Nightlife
//                 </a>
//               </h2>
//             </div>
//             <div
//               className={toggleState === 8 ? "tabs active-tabs" : "tabs"}
//               onClick={(e) => toggleTab(8, "Shopping", e)}
//             >
//               <div className="featured-icon icon">
//                 <FaShoppingBag />
//               </div>
//               <h2 className="tab-main-title">
//                 <a className="active" title="Restaurants">
//                   Shopping
//                 </a>
//               </h2>
//             </div>
//             <div
//               className={toggleState === 9 ? "tabs active-tabs" : "tabs"}
//               onClick={(e) => toggleTab(9, "Beauty_Spa", e)}
//             >
//               <div className="featured-icon icon">
//                 <FaSpa />
//               </div>
//               <h2 className="tab-main-title mx-1">
//                 <a className="active" title="Restaurants">
//                   Beauty & Spa's
//                 </a>
//               </h2>
//             </div>
//             <div
//               className={toggleState === 10 ? "tabs active-tabs" : "tabs"}
//               onClick={(e) => toggleTab(10, "Local_Services", e)}
//             >
//               <div className="featured-icon icon">
//                 <FaMapMarkerAlt />
//               </div>
//               <h2 className="tab-main-title">
//                 <a className="active" title="Restaurants">
//                   Local Services
//                 </a>
//               </h2>
//             </div>
//           </div>

//           <div className="hidden-lg mobileMenu text-center">
//             <Dropdown className="my-md-3">
//               <Dropdown.Toggle
//                 variant="success"
//                 id="dropdown-basic"
//                 className="resturantMenuDd"
//               >
//                 {dropDName}
//                 <HiMenuAlt1 size="35" className="menuIconDd"></HiMenuAlt1>
//               </Dropdown.Toggle>

//               <Dropdown.Menu>
//                 <Dropdown.Item
//                   className={toggleState === 1 ? "menuDd active" : "menuDd"}
//                   onClick={(e) => toggleTab(1, "Resturants", e)}
//                 >
//                   Restaurants
//                 </Dropdown.Item>
//                 <Dropdown.Item
//                   className={toggleState === 2 ? "menuDd active" : "menuDd"}
//                   onClick={(e) => toggleTab(2, "Banks", e)}
//                 >
//                   Banks
//                 </Dropdown.Item>
//                 <Dropdown.Item
//                   className={toggleState === 3 ? "menuDd active" : "menuDd"}
//                   onClick={(e) => toggleTab(3, "Bars", e)}
//                 >
//                   Bars
//                 </Dropdown.Item>
//                 <Dropdown.Item
//                   className={toggleState === 4 ? "menuDd active" : "menuDd"}
//                   onClick={(e) => toggleTab(4, "Coffee & Tea")}
//                 >
//                   Coffee & Tea
//                 </Dropdown.Item>
//                 <Dropdown.Item
//                   className={toggleState === 5 ? "menuDd active" : "menuDd"}
//                   onClick={(e) => toggleTab(5, "Drugstores", e)}
//                 >
//                   Drugstores
//                 </Dropdown.Item>
//                 <Dropdown.Item
//                   className={toggleState === 6 ? "menuDd active" : "menuDd"}
//                   onClick={(e) => toggleTab(6, "Gas Stations", e)}
//                 >
//                   Gas Stations
//                 </Dropdown.Item>
//                 <Dropdown.Item
//                   className={toggleState === 7 ? "menuDd active" : "menuDd"}
//                   onClick={(e) => toggleTab(7, "Nightlife", e)}
//                 >
//                   Nightlife
//                 </Dropdown.Item>
//                 <Dropdown.Item
//                   className={toggleState === 8 ? "menuDd active" : "menuDd"}
//                   onClick={(e) => toggleTab(8, "Shopping", e)}
//                 >
//                   Shopping
//                 </Dropdown.Item>
//                 <Dropdown.Item
//                   className={toggleState === 9 ? "menuDd active" : "menuDd"}
//                   onClick={(e) => toggleTab(9, "Beauty & Spa's", e)}
//                 >
//                   Beauty & Spa's
//                 </Dropdown.Item>
//                 <Dropdown.Item
//                   className={toggleState === 10 ? "menuDd active" : "menuDd"}
//                   onClick={(e) => toggleTab(10, "Local Services", e)}
//                 >
//                   Local Services
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </div>
//           <div className="col-lg-12 col-sm-12 col-xs-12 content-tabs container px-0">
//             {/* ******** Resturants Cards Details ********* */}
//             <div
//               className={
//                 toggleState === 1
//                   ? "content  active-content pb-0 px-0"
//                   : "content"
//               }
//             >
//               <div className="col-12 row px-0 cardContainer">
//                 <Slider {...settings}>
//                   {thingsToDoData.map((item) => {
//                     return (
//                       <div className="cardItem col-12">
//                         <div className="col-12 row mx-0 pl-1 pr-3 summary">
//                           <div className="col-12 px-1 col-md-12 col-xl-5 col-lg-12 imdDivdropd">
//                             <img
//                               src={item.image_url}
//                               title="Denny's"
//                               alt="Denny's"
//                               className="w-100 h-100 pl-1 img-fluid obj-fit"
//                             />
//                           </div>
//                           <div className="col-12 col-md-12 col-lg-12 col-xl-7 px-1 cardContent">
//                             <div className="title">
//                               <div>
//                                 <h3 className="thiname text-left  my-1 py-2 ml-1 ">
//                                   {ReactHtmlParser(item.name)}
//                                 </h3>
//                               </div>
//                               <div className="reviews-count ml-1">
//                                 {ReactHtmlParser(Math.round(item.rating))}

                       
          
//                               </div>
//                               <div className="reviews-count ml-1">
//                                 {ReactHtmlParser(item.review_count)}
//                                 <span className="ml-2">reviews</span>
//                               </div>
//                               <div className="thing-to-do-view-btn text-left text-left">
//                                 <a 
//                                   className="text-left"
//                                   target="_blank"
//                                   href={ReactHtmlParser(item.url)}
//                                 >
//                                   + See More
//                                 </a>
//                               </div>
//                               <div className="thing-details my-2">
//                                 <div className="text-center bot_link col-lg-12 px-0 mx-1">
//                                   <a
//                                     target="_blank"
//                                     href="https://www.yosemitesouthgate.com/directions/40650+Hwy+41+Oakhurst%2C+CA+93644"
//                                     title=""
//                                   >
//                                     Get Directions
//                                   </a>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </Slider>
//               </div>
//             </div>

//             {/* ******** Bank Cards Details ********* */}
//             <div
//               className={
//                 toggleState === 2
//                   ? "content  active-content pb-0 px-0"
//                   : "content"
//               }
//             >
//               <div className="col-12 row px-0 cardContainer">
//                 <Slider {...settings}>
//                   {thingsToDoData.map((item) => {
//                     return (
//                       <div className="cardItem col-12">
//                         <div className="col-12 row mx-0 pl-1 pr-3 summary">
//                           <div className="col-12 px-1 col-md-12 col-xl-5 col-lg-12 imdDivdropd my-2 p-md-0">
//                             <img
//                               src={item.image_url}
//                               title="Denny's"
//                               alt="Denny's"
//                               className="w-100 h-100 pl-1 img-fluid obj-fit"
//                             />
//                           </div>
//                           <div className="col-12 col-md-12 col-lg-12 col-xl-7 px-1">
//                             <div className="title">
//                               <h3 className="thiname text-left  my-1 py-2 ml-1 ">
//                                 {" "}
//                                 {ReactHtmlParser(item.name)}
//                               </h3>
//                               <div className="reviews-count ml-1">
//                                 {ReactHtmlParser(Math.round(item.rating))}
//                                 <FaStar />
//                                 <FaStar />{" "}
//                               </div>
//                               <div className="reviews-count ml-1">
//                                 {ReactHtmlParser(item.review_count)}
//                                 <span className="ml-2">reviews</span>
//                               </div>

//                               <div className="thing-to-do-view-btn text-left">
//                                 <a
//                                   target="_blank"
//                                   href={ReactHtmlParser(item.url)}
//                                 >
//                                   + See More
//                                 </a>
//                               </div>
//                               <div className="thing-details my-2">
//                                 <div className="text-center bot_link col-lg-12">
//                                   <a
//                                     target="_blank"
//                                     href="https://www.yosemitesouthgate.com/directions/40650+Hwy+41+Oakhurst%2C+CA+93644"
//                                     title=""
//                                   >
//                                     Get Directions
//                                   </a>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </Slider>
//               </div>
//             </div>

//             {/* ******** Bars Cards Details ********* */}
//             <div
//               className={
//                 toggleState === 3
//                   ? "content  active-content pb-0 px-0"
//                   : "content"
//               }
//             >
//               <div className="col-12 row px-0 cardContainer">
//                 <Slider {...settings}>
//                   {thingsToDoData.map((item) => {
//                     return (
//                       <div className="cardItem col-12">
//                         <div className="col-12 row mx-0 pl-1 pr-3 summary">
//                           <div className="col-12 px-1 col-md-12 col-xl-5 col-lg-12 imdDivdropd my-2 p-md-0">
//                             <img
//                               src={item.image_url}
//                               title="Denny's"
//                               alt="Denny's"
//                               className="w-100 h-100 pl-1 img-fluid obj-fit"
//                             />
//                           </div>
//                           <div className="col-12 col-md-12 col-lg-12 col-xl-7 px-1">
//                             <div className="title">
//                               <h3 className="thiname text-left  my-1 py-2 ml-1 ">
//                                 {" "}
//                                 {ReactHtmlParser(item.name)}
//                               </h3>
//                               <div className="reviews-count ml-1">
//                                 {ReactHtmlParser(Math.round(item.rating))}
//                                 <FaStar />
//                                 <FaStar />{" "}
//                               </div>
//                               <div className="reviews-count ml-1">
//                                 {ReactHtmlParser(item.review_count)}
//                                 <span className="ml-2">reviews</span>
//                               </div>

//                               <div className="thing-to-do-view-btn text-left">
//                                 <a
//                                   target="_blank"
//                                   href={ReactHtmlParser(item.url)}
//                                 >
//                                   + See More
//                                 </a>
//                               </div>
//                               <div className="thing-details my-2">
//                                 <div className="text-center bot_link col-lg-12">
//                                   <a
//                                     target="_blank"
//                                     href="https://www.yosemitesouthgate.com/directions/40650+Hwy+41+Oakhurst%2C+CA+93644"
//                                     title=""
//                                   >
//                                     Get Directions
//                                   </a>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </Slider>
//               </div>
//             </div>

//             {/* ******** Coffee Cards Details ********* */}
//             <div
//               className={
//                 toggleState === 4
//                   ? "content  active-content pb-0 px-0"
//                   : "content"
//               }
//             >
//               <div className="col-12 row px-0 cardContainer">
//                 <Slider {...settings}>
//                   {thingsToDoData.map((item) => {
//                     return (
//                       <div className="cardItem col-12">
//                         <div className="col-12 row mx-0 pl-1 pr-3 summary">
//                           <div className="col-12 px-1 col-md-12 col-xl-5 col-lg-12 imdDivdropd my-2 p-md-0">
//                             <img
//                               src={item.image_url}
//                               title="Denny's"
//                               alt="Denny's"
//                               className="w-100 h-100 pl-1 img-fluid obj-fit"
//                             />
//                           </div>
//                           <div className="col-12 col-md-12 col-lg-12 col-xl-7 px-1">
//                             <div className="title">
//                               <h3 className="thiname text-left  my-1 py-2 ml-1 ">
//                                 {" "}
//                                 {ReactHtmlParser(item.name)}
//                               </h3>
//                               <div className="reviews-count ml-1">
//                                 {ReactHtmlParser(Math.round(item.rating))}
//                                 <FaStar />
//                                 <FaStar />{" "}
//                               </div>
//                               <div className="reviews-count ml-1">
//                                 {ReactHtmlParser(item.review_count)}
//                                 <span className="ml-2">reviews</span>
//                               </div>

//                               <div className="thing-to-do-view-btn text-left">
//                                 <a
//                                   target="_blank"
//                                   href={ReactHtmlParser(item.url)}
//                                 >
//                                   + See More
//                                 </a>
//                               </div>
//                               <div className="thing-details my-2">
//                                 <div className="text-center bot_link col-lg-12">
//                                   <a
//                                     target="_blank"
//                                     href="https://www.yosemitesouthgate.com/directions/40650+Hwy+41+Oakhurst%2C+CA+93644"
//                                     title=""
//                                   >
//                                     Get Directions
//                                   </a>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </Slider>
//               </div>
//             </div>

//             {/* ******** Drugstore Cards Details ********* */}
//             <div
//               className={
//                 toggleState === 5
//                   ? "content  active-content pb-0 px-0"
//                   : "content"
//               }
//             >
//               <div className="col-12 row px-0 cardContainer">
//                 <Slider {...settings}>
//                   {thingsToDoData.map((item) => {
//                     return (
//                       <div className="cardItem col-12">
//                         <div className="col-12 row mx-0 pl-1 pr-3 summary">
//                           <div className="col-12 px-1 col-md-12 col-xl-5 col-lg-12 imdDivdropd my-2 p-md-0">
//                             <img
//                               src={item.image_url}
//                               title="Denny's"
//                               alt="Denny's"
//                               className="w-100 h-100 pl-1 img-fluid obj-fit"
//                             />
//                           </div>
//                           <div className="col-12 col-md-12 col-lg-12 col-xl-7 px-1">
//                             <div className="title">
//                               <h3 className="thiname text-left  my-1 py-2 ml-1 ">
//                                 {" "}
//                                 {ReactHtmlParser(item.name)}
//                               </h3>
//                               <div className="reviews-count ml-1">
//                                 {ReactHtmlParser(Math.round(item.rating))}
//                                 <FaStar />
//                                 <FaStar />{" "}
//                               </div>
//                               <div className="reviews-count ml-1">
//                                 {ReactHtmlParser(item.review_count)}
//                                 <span className="ml-2">reviews</span>
//                               </div>

//                               <div className="thing-to-do-view-btn text-left">
//                                 <a
//                                   target="_blank"
//                                   href={ReactHtmlParser(item.url)}
//                                 >
//                                   + See More
//                                 </a>
//                               </div>
//                               <div className="thing-details my-2">
//                                 <div className="text-center bot_link col-lg-12">
//                                   <a
//                                     target="_blank"
//                                     href="https://www.yosemitesouthgate.com/directions/40650+Hwy+41+Oakhurst%2C+CA+93644"
//                                     title=""
//                                   >
//                                     Get Directions
//                                   </a>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </Slider>
//               </div>
//             </div>

//             {/* ******** Gas Stations Cards Details ********* */}
//             <div
//               className={
//                 toggleState === 6
//                   ? "content  active-content pb-0 px-0"
//                   : "content"
//               }
//             >
//               <div className="col-12 row px-0 cardContainer">
//                 <Slider {...settings}>
//                   {thingsToDoData.map((item) => {
//                     return (
//                       <div className="cardItem col-12">
//                         <div className="col-12 row mx-0 pl-1 pr-3 summary">
//                           <div className="col-12 px-1 col-md-12 col-xl-5 col-lg-12 imdDivdropd my-2 p-md-0">
//                             <img
//                               src={item.image_url}
//                               title="Denny's"
//                               alt="Denny's"
//                               className="w-100 h-100 pl-1 img-fluid obj-fit"
//                             />
//                           </div>
//                           <div className="col-12 col-md-12 col-lg-12 col-xl-7 px-1">
//                             <div className="title">
//                               <h3 className="thiname text-left  my-1 py-2 ml-1 ">
//                                 {" "}
//                                 {ReactHtmlParser(item.name)}
//                               </h3>
//                               <div className="reviews-count ml-1">
//                                 {ReactHtmlParser(Math.round(item.rating))}
//                                 <FaStar />
//                                 <FaStar />{" "}
//                               </div>
//                               <div className="reviews-count ml-1">
//                                 {ReactHtmlParser(item.review_count)}
//                                 <span className="ml-2">reviews</span>
//                               </div>

//                               <div className="thing-to-do-view-btn text-left">
//                                 <a
//                                   target="_blank"
//                                   href={ReactHtmlParser(item.url)}
//                                 >
//                                   + See More
//                                 </a>
//                               </div>
//                               <div className="thing-details my-2">
//                                 <div className="text-center bot_link col-lg-12">
//                                   <a
//                                     target="_blank"
//                                     href="https://www.yosemitesouthgate.com/directions/40650+Hwy+41+Oakhurst%2C+CA+93644"
//                                     title=""
//                                   >
//                                     Get Directions
//                                   </a>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </Slider>
//               </div>
//             </div>

//             {/* ******** Night Life Cards Details ********* */}
//             <div
//               className={
//                 toggleState === 7
//                   ? "content  active-content pb-0 px-0"
//                   : "content"
//               }
//             >
//               <div className="col-12 row px-0 cardContainer">
//                 <Slider {...settings}>
//                   {thingsToDoData.map((item) => {
//                     return (
//                       <div className="cardItem col-12">
//                         <div className="col-12 row mx-0 pl-1 pr-3 summary">
//                           <div className="col-12 px-1 col-md-12 col-xl-5 col-lg-12 imdDivdropd my-2 p-md-0">
//                             <img
//                               src={item.image_url}
//                               title="Denny's"
//                               alt="Denny's"
//                               className="w-100 h-100 pl-1 img-fluid obj-fit"
//                             />
//                           </div>
//                           <div className="col-12 col-md-12 col-lg-12 col-xl-7 px-1">
//                             <div className="title">
//                               <h3 className="thiname text-left  my-1 py-2 ml-1 ">
//                                 {" "}
//                                 {ReactHtmlParser(item.name)}
//                               </h3>
//                               <div className="reviews-count ml-1">
//                                 {ReactHtmlParser(Math.round(item.rating))}
//                                 <FaStar />
//                                 <FaStar />{" "}
//                               </div>
//                               <div className="reviews-count ml-1">
//                                 {ReactHtmlParser(item.review_count)}
//                                 <span className="ml-2">reviews</span>
//                               </div>

//                               <div className="thing-to-do-view-btn text-left">
//                                 <a
//                                   target="_blank"
//                                   href={ReactHtmlParser(item.url)}
//                                 >
//                                   + See More
//                                 </a>
//                               </div>
//                               <div className="thing-details my-2">
//                                 <div className="text-center bot_link col-lg-12">
//                                   <a
//                                     target="_blank"
//                                     href="https://www.yosemitesouthgate.com/directions/40650+Hwy+41+Oakhurst%2C+CA+93644"
//                                     title=""
//                                   >
//                                     Get Directions
//                                   </a>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </Slider>
//               </div>
//             </div>

//             {/* ******** Shopping Cards Details ********* */}
//             <div
//               className={
//                 toggleState === 8
//                   ? "content  active-content pb-0 px-0"
//                   : "content"
//               }
//             >
//               <div className="col-12 row px-0 cardContainer">
//                 <Slider {...settings}>
//                   {thingsToDoData.map((item) => {
//                     return (
//                       <div className="cardItem col-12">
//                         <div className="col-12 row mx-0 pl-1 pr-3 summary">
//                           <div className="col-12 px-1 col-md-12 col-xl-5 col-lg-12 imdDivdropd my-2 p-md-0">
//                             <img
//                               src={item.image_url}
//                               title="Denny's"
//                               alt="Denny's"
//                               className="w-100 h-100 pl-1 img-fluid obj-fit"
//                             />
//                           </div>
//                           <div className="col-12 col-md-12 col-lg-12 col-xl-7 px-1">
//                             <div className="title">
//                               <h3 className="thiname text-left my-2 py-3 px-2 mx-2">
//                                 {" "}
//                                 {ReactHtmlParser(item.name)}
//                               </h3>
//                               <div className="reviews-count ml-1">
//                                 {ReactHtmlParser(Math.round(item.rating))}
//                                 <FaStar />
//                                 <FaStar />{" "}
//                               </div>
//                               <div className="reviews-count ml-1">
//                                 {ReactHtmlParser(item.review_count)}
//                                 <span className="ml-2">reviews</span>
//                               </div>

//                               <div className="thing-to-do-view-btn text-left">
//                                 <a
//                                   target="_blank"
//                                   href={ReactHtmlParser(item.url)}
//                                 >
//                                   + See More
//                                 </a>
//                               </div>
//                               <div className="thing-details my-2">
//                                 <div className="text-center bot_link col-lg-12">
//                                   <a
//                                     target="_blank"
//                                     href="https://www.yosemitesouthgate.com/directions/40650+Hwy+41+Oakhurst%2C+CA+93644"
//                                     title=""
//                                   >
//                                     Get Directions
//                                   </a>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </Slider>
//               </div>
//             </div>

//             {/* ******** Spa & Beauty Cards Details ********* */}
//             <div
//               className={
//                 toggleState === 9
//                   ? "content  active-content pb-0 px-0"
//                   : "content"
//               }
//             >
//               <div className="col-12 row px-0 cardContainer">
//                 <Slider {...settings}>
//                   {thingsToDoData.map((item) => {
//                     return (
//                       <div className="cardItem col-12">
//                         <div className="col-12 row mx-0 pl-1 pr-3 summary">
//                           <div className="col-12 px-1 col-md-12 col-xl-5 col-lg-12 imdDivdropd my-2 p-md-0">
//                             <img
//                               src={item.image_url}
//                               title="Denny's"
//                               alt="Denny's"
//                               className="w-100 h-100 pl-1 img-fluid obj-fit"
//                             />
//                           </div>
//                           <div className="col-12 col-md-12 col-lg-12 col-xl-7 px-1">
//                             <div className="title">
//                               <h3 className="thiname text-left my-2 py-3 px-2 mx-2">
//                                 {" "}
//                                 {ReactHtmlParser(item.name)}
//                               </h3>
//                               <div className="reviews-count ml-1">
//                                 {ReactHtmlParser(Math.round(item.rating))}
//                                 <FaStar />
//                                 <FaStar />{" "}
//                               </div>
//                               <div className="reviews-count ml-1">
//                                 {ReactHtmlParser(item.review_count)}
//                                 <span className="ml-2">reviews</span>
//                               </div>

//                               <div className="thing-to-do-view-btn text-left">
//                                 <a
//                                   target="_blank"
//                                   href={ReactHtmlParser(item.url)}
//                                 >
//                                   + See More
//                                 </a>
//                               </div>
//                               <div className="thing-details my-2">
//                                 <div className="text-center bot_link col-lg-12">
//                                   <a
//                                     target="_blank"
//                                     href="https://www.yosemitesouthgate.com/directions/40650+Hwy+41+Oakhurst%2C+CA+93644"
//                                     title=""
//                                   >
//                                     Get Directions
//                                   </a>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </Slider>
//               </div>
//             </div>

//             {/* ******** Local Services Cards Details ********* */}
//             <div
//               className={
//                 toggleState === 10
//                   ? "content  active-content pb-0 px-0"
//                   : "content"
//               }
//             >
//               <div className="col-12 row px-0 cardContainer">
//                 <Slider {...settings}>
//                   {thingsToDoData.map((item) => {
//                     return (
//                       <div className="cardItem col-12">
//                         <div className="col-12 row mx-0 pl-1 pr-3 summary">
//                           <div className="col-12 px-1 col-md-12 col-xl-5 col-lg-12 imdDivdropd my-2 p-md-0">
//                             <img
//                               src={item.image_url}
//                               title="Denny's"
//                               alt="Denny's"
//                               className="w-100 h-100 pl-1 img-fluid obj-fit"
//                             />
//                           </div>
//                           <div className="col-12 col-md-12 col-lg-12 col-xl-7 px-1">
//                             <div className="title">
//                               <h3 className="thiname text-left my-2 py-3 px-2 mx-2">
//                                 {" "}
//                                 {ReactHtmlParser(item.name)}
//                               </h3>
//                               <div className="reviews-count ml-1">
//                                 {ReactHtmlParser(Math.round(item.rating))}
//                                 <FaStar />
//                                 <FaStar />{" "}
//                               </div>
//                               <div className="reviews-count ml-1">
//                                 {ReactHtmlParser(item.review_count)}
//                                 <span className="ml-2">reviews</span>
//                               </div>

//                               <div className="thing-to-do-view-btn text-left">
//                                 <a
//                                   target="_blank"
//                                   href={ReactHtmlParser(item.url)}
//                                 >
//                                   + See More
//                                 </a>
//                               </div>
//                               <div className="thing-details my-2">
//                                 <div className="text-center bot_link col-lg-12">
//                                   <a
//                                     target="_blank"
//                                     href="https://www.yosemitesouthgate.com/directions/40650+Hwy+41+Oakhurst%2C+CA+93644"
//                                     title=""
//                                   >
//                                     Get Directions
//                                   </a>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </Slider>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="text-center mb-3 pb-2 pt-2 mb-1 mt-0">
//         <a
//           href="https://www.yelp.com/"
//           target="_blank"
//           title="(Powered by Yelp)"
//         >
//           <img
//             src="https://cdn.yosemitesouthgate.com/assets/images/yelp.png"
//             alt="(Powered by Yelp)"
//             className="boxyelp MT20XS"
//             loading="lazy"
//           ></img>
//         </a>
//         <div className="powered">Powered by Yelp</div>
//       </div>
//     </div>
//   );
// }



//navnath sir code


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { motion } from "framer-motion";
import {
  getSeoDescriptionData,
  getThingToDoData,
} from "../../../../DataLayer/datalayerUtilities";
import "./index.scss";
import ThingToDoMapbox from "./things_to_do_Mapbox";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DefaultImg  from '../../../CommonAssets/images/default-imag.png'
import {
  FaCocktail,
  FaCoffee,
  FaStar,
  FaGasPump,
  FaMapMarkerAlt,
  FaPlusCircle,
  FaShoppingBag,
  FaSpa,
  FaUniversity,
  FaUtensils,
} from "react-icons/fa";
import { HiMenuAlt1 } from "react-icons/hi";
//common images
import BannerContainer from "../../../InnerPages/BannerComponent/BannerContainer";
import { useRecoilValue } from "recoil";
import Slider from "react-slick";
import {
  propertyDataSelector,
  seoThemeDetails,
} from "../../../../Recoil/themeModule";
import { Dropdown, DropdownButton } from "react-bootstrap";
import StarRating from './starRating'


export default function ThingsToDoPage(props) {
  const propertyData = useRecoilValue(propertyDataSelector);
  // console.log(propertyData);
  const { thingstodo: seoId } = useRecoilValue(seoThemeDetails);
  const [thingsToDoData, setThingsToDoData] = useState([]);
  const [toggleState, setToggleState] = useState(1);
  const [clicked, setClicked] = useState(false);
  const [seoData, setPropertySeodata] = useState([]);
  const [tabName, setActiveTabName] = useState("Resturants");
  const [dropDName, setdropDName] = useState("Resturant");
  var settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    rows: 2,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    fetchSeoProperties();
  }, []);

  useEffect(() => {
    fetchThingsToDoData();
  }, [tabName]);

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData(seoId);
    setPropertySeodata(response.data);
  };

  const fetchThingsToDoData = async () => {
    const response = await getThingToDoData({ search_yelp: tabName });
    console.log(response.yelp.businesses);
    setThingsToDoData(response.yelp.businesses);
    // console.log(response.yelp.businesses);
  };

  const toggle = (index) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
  };

  const toggleTab = (index, activeTabName, e) => {
    setToggleState(index);
    setActiveTabName(activeTabName);
    setdropDName(e.target.innerHTML);
  };

  return (
    <div className="thingsToDoStyle">
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.4 }}
      >
        <BannerContainer seoData={seoData} />
      </motion.div>
      <div>
        <ThingToDoMapbox thingsToDoData={thingsToDoData} toggleState={toggleState}/>
      </div>
      <div className="container px-0">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 container thingstodo  test">
          {/* <div className="p-5 border shadow">
            <div className="py-5">
              <div className="text center ">
                <h3>Add Map</h3>
              </div>
            </div>
          </div> */}





          <div className="row px-0 my-4 d-flex justify-content-center hidden-sm hidden-xs hidden-md">
            <div
              className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
              onClick={(e) => toggleTab(1, "Resturants", e)}
            >
              <div className="featured-icon icon">
                <FaUtensils />
              </div>
              <h2 className="tab-main-title">
                <a className="active" title="Restaurants">
                  Restaurants
                </a>
              </h2>
            </div>
            <div
              className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
              onClick={(e) => toggleTab(2, "Banks", e)}
            >
              <div className="featured-icon icon">
                <FaUniversity />
              </div>
              <h2 className="tab-main-title">
                <a className="active" title="Restaurants">
                  Banks
                </a>
              </h2>
            </div>
            <div
              className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
              onClick={(e) => toggleTab(3, "Bars", e)}
            >
              <div className="featured-icon icon">
                <FaCocktail />
              </div>
              <h2 className="tab-main-title">
                <a className="active" title="Restaurants">
                  Bars
                </a>
              </h2>
            </div>
            <div
              className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
              onClick={(e) => toggleTab(4, "Coffee_Tea", e)}
            >
              <div className="featured-icon icon">
                <FaCoffee />
              </div>
              {/* <div>Coffee & Tea</div> */}
              <h2 className="tab-main-title">
                <a className="active" title="Restaurants">
                  Coffee & Tea
                </a>
              </h2>
            </div>
            <div
              className={toggleState === 5 ? "tabs active-tabs" : "tabs"}
              onClick={(e) => toggleTab(5, "Drugstores", e)}
            >
              <div className="featured-icon icon">
                <FaPlusCircle />
              </div>

              <h2 className="tab-main-title">
                <a className="active" title="Restaurants">
                  Drugstores
                </a>
              </h2>
            </div>
            <div
              className={toggleState === 6 ? "tabs active-tabs" : "tabs"}
              onClick={(e) => toggleTab(6, "Gas_Stations", e)}
            >
              <div className="featured-icon icon">
                <FaGasPump />
              </div>

              <h2 className="tab-main-title">
                <a className="active" title="Restaurants">
                  Gas Stations
                </a>
              </h2>
            </div>
            <div
              className={toggleState === 7 ? "tabs active-tabs" : "tabs"}
              onClick={(e) => toggleTab(7, "Nightlife", e)}
            >
              <div className="featured-icon icon">
                <FaUtensils />
              </div>

              <h2 className="tab-main-title">
                <a className="active" title="Restaurants">
                  Nightlife
                </a>
              </h2>
            </div>
            <div
              className={toggleState === 8 ? "tabs active-tabs" : "tabs"}
              onClick={(e) => toggleTab(8, "Shopping", e)}
            >
              <div className="featured-icon icon">
                <FaShoppingBag />
              </div>
              <h2 className="tab-main-title">
                <a className="active" title="Restaurants">
                  Shopping
                </a>
              </h2>
            </div>
            <div
              className={toggleState === 9 ? "tabs active-tabs" : "tabs"}
              onClick={(e) => toggleTab(9, "Beauty_Spa", e)}
            >
              <div className="featured-icon icon">
                <FaSpa />
              </div>
              <h2 className="tab-main-title mx-1">
                <a className="active" title="Restaurants">
                  Beauty & Spa's
                </a>
              </h2>
            </div>
            <div
              className={toggleState === 10 ? "tabs active-tabs" : "tabs"}
              onClick={(e) => toggleTab(10, "Local_Services", e)}
            >
              <div className="featured-icon icon">
                <FaMapMarkerAlt />
              </div>
              <h2 className="tab-main-title">
                <a className="active" title="Restaurants">
                  Local Services
                </a>
              </h2>
            </div>
          </div>

          <div className="hidden-lg mobileMenu text-center">
          <Dropdown className="mt-md-4 mb-md-3 mt-3 mb-2 dropdown">
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                className="resturantMenuDd"
              >
                {dropDName}
                <HiMenuAlt1 size="35" className="menuIconDd"></HiMenuAlt1>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  className={toggleState === 1 ? "menuDd active" : "menuDd"}
                  onClick={(e) => toggleTab(1, "Resturants", e)}
                >
                  Restaurants
                </Dropdown.Item>
                <Dropdown.Item
                  className={toggleState === 2 ? "menuDd active" : "menuDd"}
                  onClick={(e) => toggleTab(2, "Banks", e)}
                >
                  Banks
                </Dropdown.Item>
                <Dropdown.Item
                  className={toggleState === 3 ? "menuDd active" : "menuDd"}
                  onClick={(e) => toggleTab(3, "Bars", e)}
                >
                  Bars
                </Dropdown.Item>
                <Dropdown.Item
                  className={toggleState === 4 ? "menuDd active" : "menuDd"}
                  onClick={(e) => toggleTab(4, "Coffee & Tea")}
                >
                  Coffee & Tea
                </Dropdown.Item>
                <Dropdown.Item
                  className={toggleState === 5 ? "menuDd active" : "menuDd"}
                  onClick={(e) => toggleTab(5, "Drugstores", e)}
                >
                  Drugstores
                </Dropdown.Item>
                <Dropdown.Item
                  className={toggleState === 6 ? "menuDd active" : "menuDd"}
                  onClick={(e) => toggleTab(6, "Gas Stations", e)}
                >
                  Gas Stations
                </Dropdown.Item>
                <Dropdown.Item
                  className={toggleState === 7 ? "menuDd active" : "menuDd"}
                  onClick={(e) => toggleTab(7, "Nightlife", e)}
                >
                  Nightlife
                </Dropdown.Item>
                <Dropdown.Item
                  className={toggleState === 8 ? "menuDd active" : "menuDd"}
                  onClick={(e) => toggleTab(8, "Shopping", e)}
                >
                  Shopping
                </Dropdown.Item>
                <Dropdown.Item
                  className={toggleState === 9 ? "menuDd active" : "menuDd"}
                  onClick={(e) => toggleTab(9, "Beauty & Spa's", e)}
                >
                  Beauty & Spa's
                </Dropdown.Item>
                <Dropdown.Item
                  className={toggleState === 10 ? "menuDd active" : "menuDd"}
                  onClick={(e) => toggleTab(10, "Local Services", e)}
                >
                  Local Services
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col-lg-12 col-sm-12 col-xs-12 content-tabs container px-0">
            {/* ******** Resturants Cards Details ********* */}
            <div
              className={
                toggleState === 1
                  ? "content  active-content pb-0 px-0"
                  : "content"
              }
            >
              <div className="col-12 row px-0 cardContainer">
                
                <Slider {...settings}  className="first-slide">
            
                  {thingsToDoData.map((item) => {
                    return (
                      <div className="cardItem col-12">
                        <div className="col-12 row mx-0 pl-1 pr-3 summary">
                          <div className="col-12 px-1 col-md-12 col-xl-5 col-lg-12 imdDivdropd">
                          <div className="media">
                           <img
                              src={item.image_url}
                              title="Denny's"
                              alt="Denny's"
                              className="w-100 h-100 pl-1 img-fluid obj-fit"
                              onError={(e) => {
                                e.currentTarget.src =
                            DefaultImg
                              } } />
                           </div>
                          </div>
                          <div className="col-12 col-md-12 col-lg-12 col-xl-7 px-1 cardContent">
                            <div className="title">
                              <div>
                                <h3 className="thiname text-left  my-1 py-2  ">
                                  {ReactHtmlParser(item.name)}
                                </h3>
                              </div>
                              <div className="reviews-count ml-0">
                                {/* {ReactHtmlParser(Math.round(item.rating))} */}

                                <StarRating tabName={(Math.round(item.rating))} />
                              </div>
                              <div className="reviews-count ">
                                {ReactHtmlParser(item.review_count)}
                                <span className="">reviews</span>
                              </div>
                              <div className="thing-to-do-view-btn text-left ml-1 my-2">
                                <a
                                  target="_blank"
                                  href={ReactHtmlParser(item.url)}
                                >
                                  + See More
                                </a>
                              </div>
                              <div className="thing-details mx-1">
                                <div className="text-center bot_link col-lg-12 px-0 c-pointer">
                                  <a
                                    target="_blank"
                                    href={`/directions/${item.location.address1}/${item.location.city}/${item.location.state}/${item.location.zip_code}`}
                                    title="Get directions"
                                  >
                                    Get Directions
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                </Slider>
              </div>
           
            </div>
          

            {/* ******** Bank Cards Details ********* */}
            <div
              className={
                toggleState === 2
                  ? "content  active-content pb-0 px-0"
                  : "content"
              }
            >
              <div className="col-12 row px-0 cardContainer">
              <Slider {...settings}  className="first-slide">
                  {thingsToDoData.map((item) => {
                    return (
                      <div className="cardItem col-12">
                        <div className="col-12 row mx-0 pl-1 pr-3 summary">
                          <div className="col-12 px-1 col-md-12 col-xl-5 col-lg-12 imdDivdropd my-2 p-md-0">
                           <div className="media">
                           <img
                              src={item.image_url}
                              title="Denny's"
                              alt="Denny's"
                              className="w-100 h-100 pl-1 img-fluid obj-fit"
                              onError={(e) => {
                                e.currentTarget.src =
                            DefaultImg
                              } } />
                           </div>
                          </div>
                          <div className="col-12 col-md-12 col-lg-12 col-xl-7 px-1">
                            <div className="title">
                              <h3 className="thiname text-left  my-1 py-2 ml-1 ">
                                {" "}
                                {ReactHtmlParser(item.name)}
                              </h3>
                              <div className="reviews-count ml-1">
                              <StarRating tabName={(Math.round(item.rating))} />
                                {/* <FaStar />
                                <FaStar />{" "} */}
                              </div>
                              <div className="reviews-count ml-1">
                                {ReactHtmlParser(item.review_count)}
                                <span className="ml-2">reviews</span>
                              </div>

                              <div className="thing-to-do-view-btn text-left ml-2">
                                <a
                                  target="_blank"
                                  href={ReactHtmlParser(item.url)}
                                >
                                  + See More
                                </a>
                              </div>
                              <div className="thing-details m-2">
                                <div className="text-center bot_link col-lg-12 c-pointer">
                                  <a
                                    target="_blank"
                                    href={`/directions/${item.location.address1}/${item.location.city}/${item.location.state}/${item.location.zip_code}`}
                                    title="Get directions"
                                  >
                                    Get Directions
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>

            {/* ******** Bars Cards Details ********* */}
            <div
              className={
                toggleState === 3
                  ? "content  active-content pb-0 px-0"
                  : "content"
              }
            >
              <div className="col-12 row px-0 cardContainer">
              <Slider {...settings}  className="first-slide">
                  {thingsToDoData.map((item) => {
                    return (
                      <div className="cardItem col-12">
                        <div className="col-12 row mx-0 pl-1 pr-3 summary">
                          <div className="col-12 px-1 col-md-12 col-xl-5 col-lg-12 imdDivdropd my-2 p-md-0">
                          <div className="media">
                           <img
                              src={item.image_url}
                              title="Denny's"
                              alt="Denny's"
                              className="w-100 h-100 pl-1 img-fluid obj-fit"
                              onError={(e) => {
                                e.currentTarget.src =
                            DefaultImg
                              } } />
                           </div>
                          </div>
                          <div className="col-12 col-md-12 col-lg-12 col-xl-7 px-1">
                            <div className="title">
                              <h3 className="thiname text-left  my-1 py-2 ml-1 ">
                                {" "}
                                {ReactHtmlParser(item.name)}
                              </h3>
                              <div className="reviews-count ml-1">
                              <StarRating tabName={(Math.round(item.rating))} />
                              </div>
                              <div className="reviews-count ml-1">
                                {ReactHtmlParser(item.review_count)}
                                <span className="ml-2">reviews</span>
                              </div>
 
                              <div className="thing-to-do-view-btn text-left ml-2">
                                <a
                                  target="_blank"
                                  href={ReactHtmlParser(item.url)}
                                >
                                  + See More
                                </a>
                              </div>
                              <div className="thing-details m-2">
                                <div className="text-center bot_link col-lg-12 c-pointer">
                                  <a
                                    target="_blank"
                                    href={`/directions/${item.location.address1}/${item.location.city}/${item.location.state}/${item.location.zip_code}`}
                                    title="Get directions"
                                  >
                                    Get Directions
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>

            {/* ******** Coffee Cards Details ********* */}
            <div
              className={
                toggleState === 4
                  ? "content  active-content pb-0 px-0"
                  : "content"
              }
            >
              <div className="col-12 row px-0 cardContainer">
              <Slider {...settings}  className="first-slide">
                  {thingsToDoData.map((item) => {
                    return (
                      <div className="cardItem col-12">
                        <div className="col-12 row mx-0 pl-1 pr-3 summary">
                          <div className="col-12 px-1 col-md-12 col-xl-5 col-lg-12 imdDivdropd my-2 p-md-0">
                          <div className="media">
                           <img
                              src={item.image_url}
                              title="Denny's"
                              alt="Denny's"
                              className="w-100 h-100 pl-1 img-fluid obj-fit"
                              onError={(e) => {
                                e.currentTarget.src =
                            DefaultImg
                              } } />
                           </div>
                          </div>
                          <div className="col-12 col-md-12 col-lg-12 col-xl-7 px-1">
                            <div className="title">
                              <h3 className="thiname text-left  my-1 py-2 ml-1 ">
                                {" "}
                                {ReactHtmlParser(item.name)}
                              </h3>
                              <div className="reviews-count ml-1">
                              <StarRating tabName={(Math.round(item.rating))} />
                              </div>
                              <div className="reviews-count ml-1">
                                {ReactHtmlParser(item.review_count)}
                                <span className="ml-2">reviews</span>
                              </div>

                              <div className="thing-to-do-view-btn text-left ml-2">
                                <a
                                  target="_blank"
                                  href={ReactHtmlParser(item.url)}
                                >
                                  + See More
                                </a>
                              </div>
                              <div className="thing-details m-2">
                                <div className="text-center bot_link col-lg-12 c-pointer">
                                  <a
                                    target="_blank"
                                    href={`/directions/${item.location.address1}/${item.location.city}/${item.location.state}/${item.location.zip_code}`}
                                    title="Get directions"
                                  >
                                    Get Directions
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>

            {/* ******** Drugstore Cards Details ********* */}
            <div
              className={
                toggleState === 5
                  ? "content  active-content pb-0 px-0"
                  : "content"
              }
            >
              <div className="col-12 row px-0 cardContainer">
              <Slider {...settings}  className="first-slide">
                  {thingsToDoData.map((item) => {
                    return (
                      <div className="cardItem col-12">
                        <div className="col-12 row mx-0 pl-1 pr-3 summary">
                          <div className="col-12 px-1 col-md-12 col-xl-5 col-lg-12 imdDivdropd my-2 p-md-0">
                          <div className="media">
                           <img
                              src={item.image_url}
                              title="Denny's"
                              alt="Denny's"
                              className="w-100 h-100 pl-1 img-fluid obj-fit"
                              onError={(e) => {
                                e.currentTarget.src =
                            DefaultImg
                              } } />
                           </div>
                          </div>
                          <div className="col-12 col-md-12 col-lg-12 col-xl-7 px-1">
                            <div className="title">
                              <h3 className="thiname text-left  my-1 py-2 ml-1 ">
                                {" "}
                                {ReactHtmlParser(item.name)}
                              </h3>
                              <div className="reviews-count ml-1">
                              <StarRating tabName={(Math.round(item.rating))} />
                              </div>
                              <div className="reviews-count ml-1">
                                {ReactHtmlParser(item.review_count)}
                                <span className="ml-2">reviews</span>
                              </div>

                              <div className="thing-to-do-view-btn text-left ml-2">
                                <a
                                  target="_blank"
                                  href={ReactHtmlParser(item.url)}
                                >
                                  + See More
                                </a>
                              </div>
                              <div className="thing-details m-2">
                                <div className="text-center bot_link col-lg-12 c-pointer">
                                  <a
                                    target="_blank"
                                    href={`/directions/${item.location.address1}/${item.location.city}/${item.location.state}/${item.location.zip_code}`}
                                    title="Get directions"
                                  >
                                    Get Directions
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>

            {/* ******** Gas Stations Cards Details ********* */}
            <div
              className={
                toggleState === 6
                  ? "content  active-content pb-0 px-0"
                  : "content"
              }
            >
              <div className="col-12 row px-0 cardContainer">
              <Slider {...settings}  className="first-slide">
                  {thingsToDoData.map((item) => {
                    return (
                      <div className="cardItem col-12">
                        <div className="col-12 row mx-0 pl-1 pr-3 summary">
                          <div className="col-12 px-1 col-md-12 col-xl-5 col-lg-12 imdDivdropd my-2 p-md-0">
                          <div className="media">
                           <img
                              src={item.image_url}
                              title="Denny's"
                              alt="Denny's"
                              className="w-100 h-100 pl-1 img-fluid obj-fit"
                              onError={(e) => {
                                e.currentTarget.src =
                            DefaultImg
                              } } />
                           </div>
                          </div>
                          <div className="col-12 col-md-12 col-lg-12 col-xl-7 px-1">
                            <div className="title">
                              <h3 className="thiname text-left  my-1 py-2 ml-1 ">
                                {" "}
                                {ReactHtmlParser(item.name)}
                              </h3>
                              <div className="reviews-count ml-1">
                              <StarRating tabName={(Math.round(item.rating))} />
                              </div>
                              <div className="reviews-count ml-1">
                                {ReactHtmlParser(item.review_count)}
                                <span className="ml-2">reviews</span>
                              </div>

                              <div className="thing-to-do-view-btn text-left ml-2">
                                <a
                                  target="_blank"
                                  href={ReactHtmlParser(item.url)}
                                >
                                  + See More
                                </a>
                              </div>
                              <div className="thing-details m-2">
                                <div className="text-center bot_link col-lg-12 c-pointer">
                                  <a
                                    target="_blank"
                                    href={`/directions/${item.location.address1}/${item.location.city}/${item.location.state}/${item.location.zip_code}`}
                                    title="Get directions"
                                  >
                                    Get Directions
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>

            {/* ******** Night Life Cards Details ********* */}
            <div
              className={
                toggleState === 7
                  ? "content  active-content pb-0 px-0"
                  : "content"
              }
            >
              <div className="col-12 row px-0 cardContainer">
              <Slider {...settings}  className="first-slide">
                  {thingsToDoData.map((item) => {
                    return (
                      <div className="cardItem col-12">
                        <div className="col-12 row mx-0 pl-1 pr-3 summary">
                          <div className="col-12 px-1 col-md-12 col-xl-5 col-lg-12 imdDivdropd my-2 p-md-0">
                          <div className="media">
                           <img
                              src={item.image_url}
                              title="Denny's"
                              alt="Denny's"
                              className="w-100 h-100 pl-1 img-fluid obj-fit"
                              onError={(e) => {
                                e.currentTarget.src =
                            DefaultImg
                              } } />
                           </div>
                          </div>
                          <div className="col-12 col-md-12 col-lg-12 col-xl-7 px-1">
                            <div className="title">
                              <h3 className="thiname text-left  my-1 py-2 ml-1 ">
                                {" "}
                                {ReactHtmlParser(item.name)}
                              </h3>
                              <div className="reviews-count ml-1">
                              <StarRating tabName={(Math.round(item.rating))} />
                              </div>
                              <div className="reviews-count ml-1">
                                {ReactHtmlParser(item.review_count)}
                                <span className="ml-2">reviews</span>
                              </div>

                              <div className="thing-to-do-view-btn text-left ml-2">
                                <a
                                  target="_blank"
                                  href={ReactHtmlParser(item.url)}
                                >
                                  + See More
                                </a>
                              </div>
                              <div className="thing-details m-2">
                                <div className="text-center bot_link col-lg-12 c-pointer">
                                  <a
                                    target="_blank"
                                    href={`/directions/${item.location.address1}/${item.location.city}/${item.location.state}/${item.location.zip_code}`}
                                    title="Get directions"
                                  >
                                    Get Directions
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>

            {/* ******** Shopping Cards Details ********* */}
            <div
              className={
                toggleState === 8
                  ? "content  active-content pb-0 px-0"
                  : "content"
              }
            >
              <div className="col-12 row px-0 cardContainer">
              <Slider {...settings}  className="first-slide">
                  {thingsToDoData.map((item) => {
                    return (
                      <div className="cardItem col-12">
                        <div className="col-12 row mx-0 pl-1 pr-3 summary">
                          <div className="col-12 px-1 col-md-12 col-xl-5 col-lg-12 imdDivdropd my-2 p-md-0">
                          <div className="media">
                           <img
                              src={item.image_url}
                              title="Denny's"
                              alt="Denny's"
                              className="w-100 h-100 pl-1 img-fluid obj-fit"
                              onError={(e) => {
                                e.currentTarget.src =
                            DefaultImg
                              } } />
                           </div>
                          </div>
                          <div className="col-12 col-md-12 col-lg-12 col-xl-7 px-1">
                            <div className="title">
                              <h3 className="thiname text-left  my-1 py-2 ml-1 ">
                                {" "}
                                {ReactHtmlParser(item.name)}
                              </h3>
                              <div className="reviews-count ml-1">
                              <StarRating tabName={(Math.round(item.rating))} />
                              </div>
                              <div className="reviews-count ml-1">
                                {ReactHtmlParser(item.review_count)}
                                <span className="ml-2">reviews</span>
                              </div>

                              <div className="thing-to-do-view-btn text-left ml-2">
                                <a
                                  target="_blank"
                                  href={ReactHtmlParser(item.url)}
                                >
                                  + See More
                                </a>
                              </div>
                              <div className="thing-details m-2">
                                <div className="text-center bot_link col-lg-12 c-pointer">
                                  <a
                                    target="_blank"
                                    href={`/directions/${item.location.address1}/${item.location.city}/${item.location.state}/${item.location.zip_code}`}
                                    title="Get directions"
                                  >
                                    Get Directions
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>

            {/* ******** Spa & Beauty Cards Details ********* */}
            <div
              className={
                toggleState === 9
                  ? "content  active-content pb-0 px-0"
                  : "content"
              }
            >
              <div className="col-12 row px-0 cardContainer">
              <Slider {...settings}  className="first-slide">
                  {thingsToDoData.map((item) => {
                    return (
                      <div className="cardItem col-12">
                        <div className="col-12 row mx-0 pl-1 pr-3 summary">
                          <div className="col-12 px-1 col-md-12 col-xl-5 col-lg-12 imdDivdropd my-2 p-md-0">
                          <div className="media">
                           <img
                              src={item.image_url}
                              title="Denny's"
                              alt="Denny's"
                              className="w-100 h-100 pl-1 img-fluid obj-fit"
                              onError={(e) => {
                                e.currentTarget.src =
                            DefaultImg
                              } } />
                           </div>
                          </div>
                          <div className="col-12 col-md-12 col-lg-12 col-xl-7 px-1">
                            <div className="title">
                              <h3 className="thiname text-left  my-1 py-2 ml-1 ">
                                {" "}
                                {ReactHtmlParser(item.name)}
                              </h3>
                              <div className="reviews-count ml-1">
                              <StarRating tabName={(Math.round(item.rating))} />
                              </div>
                              <div className="reviews-count ml-1">
                                {ReactHtmlParser(item.review_count)}
                                <span className="ml-2">reviews</span>
                              </div>

                              <div className="thing-to-do-view-btn text-left ml-2">
                                <a
                                  target="_blank"
                                  href={ReactHtmlParser(item.url)}
                                >
                                  + See More
                                </a>
                              </div>
                              <div className="thing-details m-2">
                                <div className="text-center bot_link col-lg-12 c-pointer">
                                  <a
                                    target="_blank"
                                    href={`/directions/${item.location.address1}/${item.location.city}/${item.location.state}/${item.location.zip_code}`}
                                    title="Get directions"
                                  >
                                    Get Directions
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>

            {/* ******** Local Services Cards Details ********* */}
            <div
              className={
                toggleState === 10
                  ? "content  active-content pb-0 px-0"
                  : "content"
              }
            >
              <div className="col-12 row px-0 cardContainer">
              <Slider {...settings}  className="first-slide">
                  {thingsToDoData.map((item) => {
                    return (
                      <div className="cardItem col-12">
                        <div className="col-12 row mx-0 pl-1 pr-3 summary">
                          <div className="col-12 px-1 col-md-12 col-xl-5 col-lg-12 imdDivdropd my-2 p-md-0">
                          <div className="media">
                           <img
                              src={item.image_url}
                              title="Denny's"
                              alt="Denny's"
                              className="w-100 h-100 pl-1 img-fluid obj-fit"
                              onError={(e) => {
                                e.currentTarget.src =
                            DefaultImg
                              } } />
                           </div>
                          </div>
                          <div className="col-12 col-md-12 col-lg-12 col-xl-7 px-1">
                            <div className="title">
                              <h3 className="thiname text-left  my-1 py-2 ml-1 ">
                                {" "}
                                {ReactHtmlParser(item.name)}
                              </h3>
                              <div className="reviews-count ml-1">
                              <StarRating tabName={(Math.round(item.rating))} />
                              </div>
                              <div className="reviews-count ml-1">
                                {ReactHtmlParser(item.review_count)}
                                <span className="ml-2">reviews</span>
                              </div>

                              <div className="thing-to-do-view-btn text-left ml-2">
                                <a
                                  target="_blank"
                                  href={ReactHtmlParser(item.url)}
                                >
                                  + See More
                                </a>
                              </div>
                              <div className="thing-details m-2">
                                <div className="text-center bot_link col-lg-12 c-pointer">
                                  <Link
                                    target="_blank"
                                    href={`/directions/${item.location.address1}/${item.location.city}/${item.location.state}/${item.location.zip_code}`}
                                    title="Get directions"
                                  >
                                    Get Directions
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
           
            </div>
          
          </div>
        </div>
      </div>
      <div className="container">
                <div className="hr-cross-line"></div>
              </div>
      <div className="text-center mb-3 pb-2 pt-2 mb-1 mt-3">
        <a
          href="https://www.yelp.com/"
          target="_blank"
          title="(Powered by Yelp)"
        >
          <img
            src="https://cdn.yosemitesouthgate.com/assets/images/yelp.png"
            alt="(Powered by Yelp)"
            className="boxyelp MT20XS shadow"
            loading="lazy"
          ></img>
        </a>
        <div className="powered">Powered by Yelp</div>
      </div>
    </div>
  );
}
