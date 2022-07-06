import React from "react";
import ReactHtmlParser from "react-html-parser";

const NotAvailableRooms = ({ html }) => {
    return <>{ReactHtmlParser(html)}</>
}

export default NotAvailableRooms;