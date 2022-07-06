


import React, { useEffect, useState } from 'react';

// import './index.scss';
import { BsStarFill } from 'react-icons/bs';


const StarRating = (props) => {

    // console.log("sir", props.tabName);

    return (
        <>

            {(() => {
                    switch (props.tabName) {
                      case 0:
                        return <> </>;
                      case 1:
                        return <> <BsStarFill  size={18} /><span className="deafultColor"><BsStarFill size={18} /> </span><span className="deafultColor"><BsStarFill size={18} /> </span><span className="deafultColor"><BsStarFill size={18} /> </span><span className="deafultColor"><BsStarFill size={18} /> </span></>;
                      case 2:
                        return <> <BsStarFill  size={18} /> <BsStarFill size={18} /><span className="deafultColor"><BsStarFill size={18} /> </span><span className="deafultColor"><BsStarFill size={18} /> </span><span className="deafultColor"><BsStarFill size={18} /> </span></>;
                      case 3:
                        return <><BsStarFill   size={18} /> <BsStarFill size={18} /><BsStarFill size={18} /> <span className="deafultColor"><BsStarFill size={18} /> </span> <span className="deafultColor"><BsStarFill size={18} /> </span></>;
                      case 4:
                        return <><BsStarFill   size={18} /> <BsStarFill size={18} /><BsStarFill size={18} /><BsStarFill size={18} /> <span className="deafultColor"><BsStarFill size={18} /> </span></>;
                      case 5:
                        return <><BsStarFill size={18} /> <BsStarFill size={18} /><BsStarFill size={18} /><BsStarFill size={18} /><BsStarFill size={18} /></>;

                      default:
                        return null;
                    }
                  })()}
           




        </>




    )
}

export default StarRating;



