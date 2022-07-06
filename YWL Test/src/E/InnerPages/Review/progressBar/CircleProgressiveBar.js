import React from 'react';
import './progressCircleStyle.css';

const CircleProgressiveBar = (props) => {
    return (
        <div className="circular-progress-bar mt-3" data-percentage="100">
            <span className="progress-left">
                <span className={`progress-bar progress-bar-${props.progressBarColor}`}></span>
            </span>
            <span className="progress-right">
                <span className={`progress-bar progress-bar-${props.progressBarColor}`}></span>
            </span>
            <div className="progress-value">
                <div className='r-date'>
                    100%
                </div>
            </div>
        </div>
    )
}

export default CircleProgressiveBar;