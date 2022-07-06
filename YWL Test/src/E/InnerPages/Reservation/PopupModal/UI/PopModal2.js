// import React from 'react'
// import { Container, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap'
// import { Collapse, Navbar, Nav, NavItem, NavLink } from 'reactstrap'
// import { Tabs, Tab } from 'react-bootstrap'
// import { BsPersonFill } from 'react-icons/bs'
// import { IoMdBed } from 'react-icons/io'
// import { RiHotelFill } from 'react-icons/ri'
// import { FaSmokingBan } from 'react-icons/fa'
// import { BiFridge } from 'react-icons/bi'
// import { ImMenu } from 'react-icons/im'
// import classes from './PopModal.module.scss'

// const Button = props => {
//   return (
//     <button
//       className={classes.button}
//       type={props.type || 'button'}
//       onClick={props.onClick}
//     >
//       {props.children}
//     </button>
//   )
// }

// const PopModal = props => {
//   return (
//     <div>
//       <div className={classes.backdrop} onClick={props.onConfirm} />
//       <div className={classes.modal}>
//         <header className={classes.actions}>
//           <Button onClick={props.onConfirm}>X</Button>
//         </header>
//         <div className='container MT50 MB20'>
//           <Tabs
//             defaultActiveKey='home'
//             id='uncontrolled-tab-example'
//             className='mb-3'
//           >
//             <Tab
//               eventKey='home'
//               title='ROOM DETAILS'
//               style={{ 'min-height': '400px', color: '#000' }}
//             >
//               <div className='customlbl border border-secondary py-1 px-0'>
//                 <div>
//                   <span className='bg-dark text-white px-2 py-2'>
//                     ROOM DESCRIPTION
//                   </span>
//                   <div className='mt-2 px-2'>
//                     The King Mini Suite Accessible Room is a spacious room with
//                     a California King Size bed with wheelchair access route
//                     around. Our mini suites, at nearly 520 square feet, are some
//                     of the largest rooms in the Yosemite area. The King Mini
//                     Suite has a vanity, private bathroom with tub with grab
//                     bars, hairdryer, wet bar, microwave/refrigerator, Keurig
//                     coffee maker, direct dial phones, desk, iron/ironing board,
//                     color satellite High Definition TV with HBO and wireless
//                     Internet. All rooms are non-smoking, have heat and air
//                     conditioning, and RFID electronic locks. Our rooms feature
//                     brand new 46 inch LED HDTVs, in-room safe, brand new
//                     furniture with modern decor. All accessible room types are
//                     booked and assured at check in, but are subject to limited
//                     availability.
//                   </div>
//                 </div>
//               </div>
//               <div className='mt-2'>
//                 If you have any questions or would like to report any issues
//                 related to the accessibility features of our hotel’s website,
//                 please contact us at yosemitesouthgatehotel@innsight.com
//               </div>
//               <div className='col-6 col-md-6 px-0'>
//                 <div className='border border-secondary row p-2 mt-2'>
//                   <div>
//                     <BsPersonFill size='30' className='mx-4' />
//                     <div>4 Persons</div>
//                   </div>
//                   <div className=''>
//                     <IoMdBed size='30' className='mx-4' />
//                     <div>King Mini Suite Accessible</div>
//                   </div>

//                   <div className=''>
//                     <RiHotelFill size='30' className='mx-4' />
//                     <div className='pl-3'>500 ft2</div>
//                   </div>
//                 </div>
//                 <div>
//                   <div className='mt-3'>
//                     <strong>
//                       Included:
//                       <p>
//                         Free WIFI, Cable TV, In-room Coffee, Bagged Breakfast
//                         Items
//                       </p>
//                     </strong>
//                   </div>
//                 </div>
//               </div>

//             </Tab>
//             <Tab
//               eventKey='profile'
//               title='AMENITIES'
//               style={{ 'min-height': '400px' }}
//             >
//               <div className='customlbl'>
//                 <div className='bg-light py-2 row'>
//                   <div className='ml-5'>
//                     <FaSmokingBan size='30' />
//                     <div>Non Smoking</div>
//                   </div>
//                   <div className='ml-5'>
//                     <BiFridge size='30' />
//                     <div> Refrigerator</div>
//                   </div>
//                   <div className='ml-5'>
//                     <FaSmokingBan size='30' />
//                     <div>Microwave</div>
//                   </div>
//                   <div className='ml-5'>
//                     <BiFridge size='30' />
//                     <div>Ironing Board</div>
//                   </div>
//                   <div className='ml-5'>
//                     <BiFridge size='30' />
//                     <div>Air Conditioner</div>
//                   </div>
//                 </div>
//                 <span className='bg-dark text-white px-2 py-2'>
//                   <ImMenu />
//                   General Services
//                 </span>
//               </div>

//             </Tab>
//             <Tab
//               eventKey='contact'
//               title='RATE CALENDAR'
//               style={{ 'min-height': '400px' }}
//             >
//               <div className='customlbl'>RATE CALENDAR</div>
//             </Tab>
//             <Tab
//               eventKey='contactt'
//               title='TERMS'
//               style={{ 'min-height': '400px' }}
//             >

//               <div className='customlbl border border-secondary py-1 px-0'>
//                 <div>
//                   <span className='bg-dark text-white px-2 py-2'>
//                     ROOM DESCRIPTION
//                   </span>
//                   <div className='row'>
//                     <div className='border bg-light col-4'>
//                       <span>CHECK IN TIME:</span> <span>16:00:00</span>
//                     </div>
//                     <div className='border bg-light col-4'>
//                       <span>CHECK IN TIME:</span> <span>16:00:00</span>
//                     </div>
//                   </div>
//                   <div className='mt-2 px-2'>
//                     <strong>Accepted Payment Methods:</strong> Visa, MasterCard,
//                     American Express, Discover, Cash. This hotel reserves the
//                     right to pre-authorize credit cards prior to arrival.
//                   </div>
//                 </div>
//               </div>

//             </Tab>
//             <Tab
//               eventKey='contacttt'
//               title='ACCESSIBILITY'
//               style={{ 'min-height': '400px' }}
//             >
//               <div className='customlbl'>ACCESSIBILITY</div>
//             </Tab>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PopModal
