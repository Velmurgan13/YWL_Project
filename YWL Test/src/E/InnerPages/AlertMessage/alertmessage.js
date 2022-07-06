import React from 'react';
import { UncontrolledAlert } from 'reactstrap';
import { FaWheelchair } from 'react-icons/fa';

function ReservationAlert() {
  return (
    <UncontrolledAlert className="fs-16 border"  style={{background: "#0563ae", color:"#fff"}}>
        <FaWheelchair className="mr-2" size="25"/>
    To book an accessible room, please select the appropriate room type, which can be found below (based on availability). Find all of our property's accessibility features listed here. Please contact us directly at Yosemite Southgate Hotel and Suites for any special requests and our friendly staff will be happy to assist.
    </UncontrolledAlert>
  );
}

export default ReservationAlert;