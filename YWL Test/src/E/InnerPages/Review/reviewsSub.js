import React, { useEffect, useState } from 'react';

import './index.scss';
import { BsStarFill } from 'react-icons/bs';


const ReviewSub = (props) => {

   console.log("sir", props.reviewData);

    return (
        <>
        
                {(() => {
                    switch (props.reviewData) {
                      case '0':
                        return <> </>;
                      case '1':
                        return <><BsStarFill size={20} /><span className="deafultColor"><BsStarFill size={20} /> </span><span className="deafultColor"><BsStarFill size={20} /> </span><span className="deafultColor"><BsStarFill size={20} /> </span><span className="deafultColor"><BsStarFill size={20} /> </span></>;
                      case '2':
                        return <> <BsStarFill size={20} /> <BsStarFill size={20} /><span className="deafultColor"><BsStarFill size={20} /> </span><span className="deafultColor"><BsStarFill size={20} /> </span><span className="deafultColor"><BsStarFill size={20} /> </span></>;
                      case '3':
                        return <><BsStarFill size={20} /> <BsStarFill size={20} /><BsStarFill size={20} /> <span className="deafultColor"><BsStarFill size={20} /> </span> <span className="deafultColor"><BsStarFill size={20} /> </span></>;
                      case '4':
                        return <><BsStarFill size={20} /> <BsStarFill size={20} /><BsStarFill size={20} /><BsStarFill size={20} /> <span className="deafultColor"><BsStarFill size={20} /> </span></>;
                      case '5':
                        return <><BsStarFill size={20} /> <BsStarFill size={20} /><BsStarFill size={20} /><BsStarFill size={20} /><BsStarFill size={20} /></>;

                      default:
                        return null;
                    }
                  })()}
                  

        </>
        
                         
                                             

    )
}

export default ReviewSub;


