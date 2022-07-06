import React, { useEffect, useState } from 'react';

import './index.scss';
import { BsStarFill } from 'react-icons/bs';


const ReviewDate = (props) => {

   

    return (
        <>
        
        {new Date(props.ReviewsDate).toLocaleDateString(undefined, {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                            })
                          }
                  

        </>
        
                         
                                             

    )
}

export default ReviewDate;


