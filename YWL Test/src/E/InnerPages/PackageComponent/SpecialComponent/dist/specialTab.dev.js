// import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import ReactHtmlParser from 'react-html-parser'
// import dummy from '../../Yosemitewestgate/assets/images/sanitizer.jpg'
// import { useRecoilValue } from 'recoil';
// import { themeSelector, propertyDataSelector } from '../../../Recoil/themeModule'
// function SpecialTab(props) {
//      const { url: baseUrl } = useRecoilValue(themeSelector);
//   return (
//     <div className="container">
//       <div className="row mx-0">
//         {props.packagesData.map((item) => (
//           <div className="col-4">
//             <div className='EventBox my-3 pb-3'>
//               <a href="">
//                 {/* <img
//                             src={baseUrl +
//                                 item.package_images[0].name}
//                   alt="Card image cap"
//                   className="W100 card-img-top"
//                 /> */}
//                         <img
//                           className='w-100'
//                           src={item.package_images[0].img_name}
//                           alt=''
//                           onError={e => {
//                             e.currentTarget.src =
//                               'https://beta.laquintasantacruz.com/gallery-images/default-vector-bedroom-image.jpg'
//                           }}
//                         />
//               </a>
//               <div class="card-body">
//                 <div class="eventcontent">
//                   <h3 class="title">{ReactHtmlParser(item.ptitle)}</h3>
//                   {/* <div class="description">
//                 <p className="form-title">{ReactHtmlParser(item.short_description)}</p>
//               </div> */}
//                   <Link to={`/packages/${item.subdomain}`} className="">  
//                     <button className="home-readmore-btn welcome-btn btn-style mt-3">
//                       VIEW MORE DETAILS
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
// export default SpecialTab
"use strict";