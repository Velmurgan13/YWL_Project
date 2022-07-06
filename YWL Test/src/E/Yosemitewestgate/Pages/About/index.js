// import React, { useState, useEffect } from 'react';
// import { getSeoDescriptionData, getYesomiteData } from './../../../../DataLayer/datalayerUtilities';
// import InnerBanner from '../../assets/images/BannerImages/inner-banner.jpg'

// const AboutComponent = () => {
//   const initialState = {
//     SeoDetailsContent: '',
//     isLoading: true
//   }
//   const initialStateYesomite = {
//     YesomiteDetailsContent: '',
//     isLoadingg: true
//   }

//   const [{ SeoDetailsContent, isLoading }, setSeoDescription] = useState(initialState);
//   const [{ YesomiteDetailsContent, isLoadingg }, setyesomiteDescription] = useState(initialStateYesomite);

//   const handlerSeoDetailsContent = async () => {
//     const responseData = await getSeoDescriptionData();
//     setSeoDescription(prevObject => ({ ...prevObject, 'SeoDetailsContent': responseData, 'isLoading': false }));
//   }

//   const handlerYesomiteDetailsContent = async () => {
//     const responseData = await getYesomiteData();
//     setyesomiteDescription(prevObject => ({ ...prevObject, 'YesomiteDetailsContent': responseData, 'isLoadingg': false }));
//   }

//   useEffect(() => {
//     handlerSeoDetailsContent();
//     handlerYesomiteDetailsContent();

//   }, [])

//   return (
//     <div className="container-fluid px-0 text-center">
//       <img src={InnerBanner} className="w-100" />
//       <div className="">
//         <h1>Successfully Api call is done !!!!!!!!!!!!!!</h1>
//         <h1>Welcome to ABout Page</h1>
//       </div>
//       <div className="col-6">
//         <h3>This is sample Api call of Seo</h3>
//         {isLoading ?
//           <div>Loading.....ICON</div>
//           :
//           SeoDetailsContent.map((data, index) => (
//             <div key={index}>
//               <h6>{data.hdata}</h6>
//               <p>{data.data}</p>
//             </div>
//           ))
//         }
//       </div>
//       <div>
//         <h6>This is sample Api call of Yesomite Website Api</h6>
//         <div className="col-6">
//           {isLoadingg ?
//             <div>Loading.....ICON</div>
//             :
//             YesomiteDetailsContent.map((data, index) => (
//               <div key={index}>
//                 <h6>{data.late_check_out}</h6>
//                 <p>{data.internet}</p>
//               </div>
//             ))
//           }
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AboutComponent;