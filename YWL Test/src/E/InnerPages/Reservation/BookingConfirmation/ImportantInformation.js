import React from "react";
import ReactHtmlParser from "react-html-parser";
import "./RoomConfirmation.css"

const ImportantInfo = ({bookingDetails}) => {
    
return (
    <div className="divBorder my-3 py-3 px-4">
        {ReactHtmlParser(bookingDetails[0].important_information)}  
    </div>
)
}
export default ImportantInfo;