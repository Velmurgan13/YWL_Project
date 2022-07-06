import React, { useState, useEffect } from "react";
const RoomSuggestions = ({ roomsData }) => {
    // table body here
    var tableBody = Object.values(roomsData.availableRoomTypes).map(data => {
        if(typeof(data) == 'object'){
            if(data.vacant_rooms > 0){
                return <tr role="row">
                    <td role="cell">{data.name}</td>
                    <td role="cell">{data.no_of_guest}</td>
                    <td role="cell">Only {data.vacant_rooms} Room left</td>
                </tr>
            }
        }
    })

    return (
        <>
            <div className="text-center MB15">
                <strong>Please reconfigure your search above by splitting guests in different rooms or try another set of dates.</strong>
            </div>
            <table width="100%" cellpadding="10" border="1" className="cookiet">
                <thead role="rowgroup">
                    <tr role="row">
                        <th role="columnheader"><strong>Available Rooms</strong></th>
                        <th role="columnheader"><strong>Persons</strong></th>
                        <th role="columnheader"><strong>Availability</strong></th>
                    </tr>
                </thead>
                <tbody role="rowgroup">
                    {tableBody}
                </tbody>
            </table>
        </>
    )
}

export default RoomSuggestions