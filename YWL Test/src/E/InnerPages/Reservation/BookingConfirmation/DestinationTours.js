import React from "react";
import { Link } from "react-router-dom";
const DestinationGuided = () => {
    return (
<>
<h2 className="text-left FS20 px-3">
        Destination Guide For Groveland
      </h2>
      <div className="text-center destinationGuide">
        <p style={{ fontSize: "14px" }}>
          We handpicked the top attractions, sorted by distance from
          where you are staying. Discover the top tourist
          attractions, restaurants, bars, nightlife and
          transportation tips!
        </p>
        
        <Link to="/attractions" title="Click Here">
        <button
          className="border btn btn-success guideBtn"
          style={{
            padding: "10px 30px",
          }}
        >
          CLICK HERE
        </button>
        </Link>
      </div></>
    )
}

export default DestinationGuided;