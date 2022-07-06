// import React, { useState, useEffect } from "react";
// import "./index.scss";
// // import Demoimage from "../../../Yosemitewestgate/assets/Icons/eventdemo - Copy.webp";
// import { Link } from "react-router-dom";
// import ReactHtmlParser from "react-html-parser";
// import { Calendar, momentLocalizer } from 'react-big-calendar'
// import moment from 'moment'
// import "react-big-calendar/lib/css/react-big-calendar.css";
// // import events from "./events";
// import {TiWarningOutline} from 'react-icons/ti'
// // const localizer = momentLocalizer(moment)


// function CustomTab(props) {
//   console.log(props);
//   console.log(props.eventData);
//   let events;
//   const [toggleState, setToggleState] = useState(1);
//   const toggleTab = (index, ThisWeek) => {
//     setToggleState(index,ThisWeek);
//   };
//   {props.eventData.map((item) => (
//    events = [
//       {
//         'title': `${item.event_name}`,
//         'allDay': true,
//         'start': new Date(2022, 3, 11),
//         'end': new Date(2022, 3, 11)
//       }
//     ]
//   ))}

//   return (
//     <div className="container my-4 EventPage">
//       <div className="bloc-tabs row mx-1 mx-md-1">
//         <button
//           className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
//           onClick={() => toggleTab(1)}
//         >
//           ALL
//         </button>
//         <button
//           className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
//           onClick={() => toggleTab(2)}
//         >
//           THIS WEEK
//         </button>
//         <button
//           className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
//           onClick={() => toggleTab(3)}
//         >
//           NEXT 30 DAYS
//         </button>
//         <button
//           className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
//           onClick={() => toggleTab(4)}
//         >
//           NEXT 90 DAYS
//         </button>
//         <button
//           className={toggleState === 5 ? "tabs active-tabs" : "tabs"}
//           onClick={() => toggleTab(5)}
//         >
//           CALENDER
//         </button>
//       </div>

//       <div className="content-tabs bg-grey">
//         <div
//           className={toggleState === 1 ? "content  active-content" : "content"}
//         >
//           {props.eventData.map((item) => (
//             <div className="card col-lg-4 col-12 EventBox">
//               <a href="">
//                 <img
//                   src={item.event_images[0].img_name}
//                   alt="Card image cap"
//                   className="W100 card-img-top"
//                 />
//               </a>

//               <div className="card-body">
//                 <div className="eventcontent">
//                   <h3 className="title"> {ReactHtmlParser(item.event_name)} </h3>
//                   <div className="description">
//                     <p className="form-title">
//                       {ReactHtmlParser(item.short_desc)}{" "}
//                     </p>
//                   </div>
//                   <Link to={`/events/${item.subdomain}`} className="">
//                     <button
//                       className="home-readmore-btn welcome-btn btn-style mt-3"
//                       title="View details"
//                     >
//                       VIEW DETAILS
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div
//           className={toggleState === 2 ? "content  active-content" : "content"}
//         >
//           {/* <p className="text-danger text-center p-5 sry-font">
//            <TiWarningOutline size="30" /> Sorry, Yosemite Westgate Lodge currently has no events available.
//           </p> */}

// <div
//           className={toggleState === 2 ? "content  active-content" : "content"}
//         >
//           {props.eventData.map((item) => (
//             <div className="card col-lg-4 col-12 EventBox">
//               <a href="">
//                 <img
//                   src={item.event_images[0].img_name}
//                   alt="Card image cap"
//                   className="W100 card-img-top"
//                 />
//               </a>

//               <div className="card-body">
//                 <div className="eventcontent">
//                   <h3 className="title"> {ReactHtmlParser(item.event_name)} </h3>
//                   <div className="description">
//                     <p className="form-title">
//                       {ReactHtmlParser(item.short_desc)}{" "}
//                     </p>
//                   </div>
//                   <Link to={`/events/${item.subdomain}`} className="">
//                     <button
//                       className="home-readmore-btn welcome-btn btn-style mt-3"
//                       title="View details"
//                     >
//                       VIEW DETAILS
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>




//         </div>
//         <div
//           className={toggleState === 3 ? "content  active-content" : "content"}
//         >
//           <p className="text-danger text-center p-5 sry-font">
//           <TiWarningOutline size="30" /> Sorry, Yosemite Westgate Lodge currently has no events available.
//           </p>
//         </div>
//         <div
//           className={toggleState === 4 ? "content  active-content" : "content"}
//         >
//           <p className="text-danger text-center p-5 sry-font">
//           <TiWarningOutline size="30" /> Sorry, Yosemite Westgate Lodge currently has no events available.
//           </p>
//         </div>
//         <div
//           className={toggleState === 5 ? "content  active-content" : "content"}
//         >
//           <div style={{width: "100%"}}>
//             <Calendar
//               localizer={localizer}
//               events={events}
//               startAccessor="start"
//               endAccessor="end"
//               style={{ height: "500px" }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CustomTab;
