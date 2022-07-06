// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';

// const SidebarLink = styled(Link)`
//   display: flex;
//   color: #e1e9fc;
//   justify-content: space-between;
//   align-items: center;
//   padding: 20px;
//   list-style: none;
//   height: 60px;
//   text-decoration: none;
//   font-size: 18px;

//   &:hover {
//     background: #1a563a;
//     border-left: 4px solid #1a563a;
//     cursor: pointer;
//   }
// `;

// const SidebarLabel = styled.span`
//   margin-left: 16px;
//   &:hover {
//     background: #1a563a;
//     cursor: pointer;
//     color:#fff;
//   }
// `;

// const DropdownLink = styled(Link)`
//   background: #c8d2ce;
//   height: 60px;
//   padding-left: 3rem;
//   display: flex;
//   align-items: center;
//   text-decoration: none;
//   color: #000;
//   font-size: 18px;

//   &:hover {
//     background: #1a563a;
//     cursor: pointer;
//     color:#fff;
//   }
// `;

// const SubMenu = ({ item, handlerCloseIcon }) => {
//   const [subnav, setSubnav] = useState(false);

//   const showSubnav = () => setSubnav(!subnav);

//   const closeSideNav = (event) => {
//     if(item?.subNav?.length > 0){
//       event.preventDefault();
//       showSubnav();
//       return;
//     }
//     handlerCloseIcon(false);
//   }

//   return (
//     <>
//       <SidebarLink to={item.path} onClick={(event) => closeSideNav(event)}>
//         <div>
//           {item.icon}
//           <SidebarLabel>{item.title}</SidebarLabel>
//         </div>
//         <div>
//           {item.subNav && subnav
//             ? item.iconOpened
//             : item.subNav
//             ? item.iconClosed
//             : null}
//         </div>
//       </SidebarLink>
//       {subnav &&
//         item.subNav.map((item, index) => {
//           return (
//             <DropdownLink onClick={() => handlerCloseIcon(false)} to={item.path} key={index}>
//               {item.icon}
//               <SidebarLabel>{item.title}</SidebarLabel>
//             </DropdownLink>
//           );
//         })}
//     </>
//   );
// };

// export default SubMenu;
