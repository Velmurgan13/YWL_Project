// import React, { useState } from 'react';
// import '../../Home/sections/CheckAvailibilty/checkavailibity.css';
// import AdultsChid from '../../Home/sections/CheckAvailibilty/AdultsChildren';
// import BookingComponent from '../../Home/sections/CheckAvailibilty/calender';
// import { DatePicker } from 'antd';
// import moment from 'moment';

// //icons
// import { IconContext } from "react-icons";
// import { GrSend } from 'react-icons/gr';

// const WrappperCheckAvailibility = () => {
//     const [showInputField, setInputField] = useState(false);
//     return(
//         <div className="row mx-0">
//         <div className="mx-auto bg-color-datepicker px-4 py-4 shadow-lg">
//             <div className="row justify-content-center mx-0">
//                 <div className="col-md-6 col-lg-6 col-12 px-1">
//                 <DatePicker className="w-100 py-2 my-2" onChange={BookingComponent} 
//                 placeholder="Arrival Date"
//                 />
//                 </div>
//                 <div className="col-md-6 col-lg-6 col-12 px-1">
//                 <DatePicker className="w-100 py-2 my-2" onChange={BookingComponent} 
//                  placeholder="Arrival Date"
//                 />
//                 </div>
//                 <div className="col-md-6 col-lg-6 col-12 px-1">
//                     <div className="w-100">
//                         <input className="form-control w-100 mt-3" placeholder="PROMO CODE" id="inputlg" type="text"></input>
//                     </div>
//                 </div>
//                 <div className="col-md-6 col-lg-6 col-12 px-1">
//                     <div className="w-100">
//                         <input className="form-control w-100 mt-3"  onClick={() => setInputField(!showInputField)} placeholder="1 Rooms 2 adults 1 children" id="inputlg" type="text"></input>
//                     </div>
//                     {showInputField &&
//                         <div className="bg-light p-5">
//                           <AdultsChid />
//                         </div>}
//                 </div>
//                 <div className="send-icon">
//                     <IconContext.Provider
//                         value={{ color: 'red', size: '30px' }}
//                     >
//                         <div className="send-color">
//                             <GrSend  />
//                         </div>
//                     </IconContext.Provider>
//                 </div>
//             </div>
//         </div>

//     </div>
//     )
// }

// export default WrappperCheckAvailibility;