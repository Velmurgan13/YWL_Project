import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import classes from "./PopModal.module.scss";
import RoomDetails from "./PopupTabs/roomDetails";
import Amenities from "./PopupTabs/anemeties";
import RateCalender from "./PopupTabs/rateCalender";
import Terms from "./PopupTabs/terms";
import Accessibility from "./PopupTabs/accessibility";
import xIcon from "../../../../CommonAssets/Icons/xmark-solidPopup.svg";
import Navbar from "react-bootstrap/Navbar";
import { Container, Nav } from "react-bootstrap";
import "./PopMobileView.css";
import "../UI/PopupTabs/pop.scss";
import Collapse from "react-bootstrap/Collapse";
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className="popuptabName"
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function PopModal(props) {
  // console.log(props)
  // console.log(props.property_details)
  const [value, setValue] = React.useState(0);
  const [opensCollapseMenu, setOpensCollapseMenu] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const toggleCollapse = () => {
    setOpensCollapseMenu(!opensCollapseMenu);
  };
  const toggleTab = (index, name) => {
    toggleCollapse();
  };
  return (
    <div className="asd" id="asd">
      <div className={classes.backdrop} onClick={props.onConfirm} />
      <div className={classes.modal}>
        {/* <header className={classes.actions}>
          <Button onClick={props.onConfirm}>X</Button>
        </header> */}
        <div className="container MT50 MB20 d-none d-xl-block d-lg-block d-md-block d-sm-none d-xs-none P0">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="ROOM DETAILS" {...a11yProps(0)} />
                <Tab label="AMENITIES" {...a11yProps(1)} />
                <Tab label="RATE CALENDER" {...a11yProps(2)} />
                <Tab label="TERMS" {...a11yProps(3)} />
                <Tab label="ACCESSIBILITY" {...a11yProps(4)} />
                <a onClick={props.onConfirm} style={{ cursor: "pointer" }}>
                  <img src={xIcon} width="30" className="popUpClose" />
                </a>
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <RoomDetails
                valueRoomType={props.data}
                property={props.property_details}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Amenities valueRoomType={props.data} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <RateCalender
                valueRoomType={props.data}
                input_params={props.input_params}
                i={props.i}
                isStandardDiscountNotExists={props.isStandardDiscountNotExists}
                currency={props.currency}
                convertPrice={props.convertPrice}
              />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Terms
                policies={props.policies}
                splCancelPolicy={props.splCancelPolicy}
                room_type_id={props.data.id}
              />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Accessibility valueRoomType={props.data} />
            </TabPanel>
          </Box>
        </div>
        <div className="d-xl-none d-lg-none d-md-none d-sm-block d-xs-block">
          {/* <div
            class="testMenu"
            onClick={() => toggleCollapse()}
            aria-expanded={opensCollapseMenu}
            aria-controls="collapseIdPop"
          >
            Menu
          </div> */}
          {/* <Collapse in={opensCollapseMenu}>
            <div id="collapseIdPop">
              <ul>
                <li label="ROOM DETAILS"
                        onClick={() => toggleTab()}
                        {...a11yProps(0)}>ROOM DETAILS</li>
                <li label="AMENITIES"
                        onClick={() => toggleTab()}
                        {...a11yProps(1)}>AMENITIES</li>
                <li label="RATE CALENDER"
                        onClick={() => toggleTab()}
                        {...a11yProps(2)}>RATE CALENDER</li>
                <li label="TERMS"
                        onClick={() => toggleTab()}
                        {...a11yProps(3)}>TERMS</li>
                <li label="ACCESSIBILITY"
                        onClick={() => toggleTab()}
                        {...a11yProps(4)}>ACCESSIBILITY</li>
              </ul>
            </div>
            aria-controls="basic-navbar-nav"
          </Collapse> */}
          <Navbar bg="light" expand="lg">
            <Container className="popUpMenuDiv">
              <Navbar.Toggle
                className="popUpMenuDivBtn"
                onClick={() => toggleCollapse()}
                aria-expanded={opensCollapseMenu}
                aria-controls="collapseIdPop"
              />
              <Nav className="me-auto test">
                <Collapse in={opensCollapseMenu}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    className="tabButton"
                    id="collapseIdPop"
                  >
                    <Tab
                      label="ROOM DETAILS"
                      onClick={() => toggleTab()}
                      {...a11yProps(0)}
                    />
                    <Tab
                      label="AMENITIES"
                      onClick={() => toggleTab()}
                      {...a11yProps(1)}
                    />
                    <Tab
                      label="RATE CALENDER"
                      onClick={() => toggleTab()}
                      {...a11yProps(2)}
                    />
                    <Tab
                      label="TERMS"
                      onClick={() => toggleTab()}
                      {...a11yProps(3)}
                    />
                    <Tab
                      label="ACCESSIBILITY"
                      onClick={() => toggleTab()}
                      {...a11yProps(4)}
                    />
                    <Link>
                      <img src={xIcon} width="30" className="popUpClose" />
                    </Link>
                  </Tabs>
                </Collapse>
              </Nav>
            </Container>
          </Navbar>
        </div>

        <div className="container MT50 MB20 d-xl-none d-lg-none d-md-none d-sm-block d-xs-block mobileView ">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                className="popupTitle"
              >
                <Tab label="ROOM DETAILS" {...a11yProps(0)} />
                <Tab label="AMENITIES" {...a11yProps(1)} />
                <Tab label="RATE CALENDER" {...a11yProps(2)} />
                <Tab label="TERMS" {...a11yProps(3)} />
                <Tab label="ACCESSIBILITY" {...a11yProps(4)} />
                <Link>
                  <img src={xIcon} width="30" className="popUpClose" />
                </Link>
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <RoomDetails
                valueRoomType={props.data}
                property={props.property_details}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Amenities valueRoomType={props.data} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <RateCalender
                valueRoomType={props.data}
                input_params={props.input_params}
                i={props.i}
                isStandardDiscountNotExists={props.isStandardDiscountNotExists}
                currency={props.currency}
                convertPrice={props.convertPrice}
              />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Terms
                policies={props.policies}
                splCancelPolicy={props.splCancelPolicy}
                room_type_id={props.data.id}
              />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Accessibility valueRoomType={props.data} />
            </TabPanel>
          </Box>
        </div>
      </div>
    </div>
  );
}
