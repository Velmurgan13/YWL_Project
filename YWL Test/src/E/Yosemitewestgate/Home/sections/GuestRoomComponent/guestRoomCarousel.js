// import React, { useState } from "react";
// import Carousel from "react-simply-carousel";
// import room_image from "../../../assets/images/sections/guest-room-bed.jpg";

// function GuestRoomCarousel() {
//   const [activeSlide, setActiveSlide] = useState(0);

//   return (
//     <div>
//       <Carousel
//         updateOnItemClick
//         containerProps={{
//           style: {
//             width: "100%",
//             justifyContent: "space-between"
//           }
//         }}
//         activeSlideIndex={activeSlide}
//         // activeSlideProps={{
//         //   style: {
//         //     background: "white"
//         //   }
//         // }}
//         onRequestChange={setActiveSlide}
//         forwardBtnProps={{
//           children: ">",
//           style: {
//             width: 60,
//             height: 40,
//             minWidth: 40,
//             alignSelf: "center",
//             marginBottom: 40,
//             marginLeft: 10,
//           }
//         }}
//         backwardBtnProps={{
//           children: "<",
//           style: {
//             width: 60,
//             height: 40,
//             minWidth: 40,
//             alignSelf: "center",
//             marginBottom: 40,
//             marginRight: 10,
//           }
//         }}
//         itemsToShow={1}
//         speed={400}
//       >
//         {Array.from({ length: 80 }).map((item, index) => (
//           <div
//             style={{
//               width: 500,
//               height: 300,
//               textAlign: "center",
//               lineHeight: "240px",
//               boxSizing: "border-box",
//               maxHeight:250
//             }}
//             key={index}
//           >
//             {/* {index} */}
//             <div className="">
//                 <img src={room_image}  className="m-0"/>
//             </div>
//           </div>
//         ))}
//       </Carousel>
//     </div>
//   );
// }

// export default GuestRoomCarousel;

// import SimpleImageSlider from "react-simple-image-slider";
// import room_image from "../../../assets/images/sections/guest-room-bed.jpg";
// const images = [
//   { url: "" },
//   { url: "images/2.jpg" },
//   { url: "images/3.jpg" },
//   { url: "images/4.jpg" },
//   { url: "images/5.jpg" },
//   { url: "images/6.jpg" },
//   { url: "images/7.jpg" },
// ];

// const GuestRoomCarousel = () => {
//   return (
//     <div>
//       <SimpleImageSlider
//         width={896}
//         height={504}
//         images={images}
//       />
//     </div>
//   );
// }

// export default GuestRoomCarousel;

