import React, { useEffect, useState } from 'react';

import './index.scss';
import tripIcon from '../../CommonAssets/Icons/Tripadvisor.svg'

const ReviewChannel = (props) => {

  // const TripAdvisor = '../../CommonAssets/Icons/Tripadvisor.svg';
  const Booking = 'https://beta.yosemitewestgate.com/images/ReportLogospng/shortLogos/RMS-bookings-icons.svg';
  const Expedia = 'https://beta.yosemitewestgate.com/images/ReportLogospng/shortLogos/RMS-expedia-icons.svg';
  const Yelp = 'https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_design_cdn/7ef71bf77a33/assets/img/brand/logo_desktop.svg';
  const Google = 'https://beta.yosemitewestgate.com/images/ReportLogospng/shortLogos/RMS-google-icons.svg';
  const INNsight = 'https://www.innsight.com/assets/images/static_new/logo.svg';
  const Hotelscom = ' https://beta.yosemitesouthgate.com/images/ReportLogospng/RMS-Hotelscom.svg';
  const Orbitz = 'https://beta.yosemitesouthgate.com/images/ReportLogospng/RMS-Orbitz.svg';
  const EBookers = ' https://beta.yosemitesouthgate.com/images/ReportLogospng/RMS-eBookers.svg';
  const Travelocity = 'https://beta.yosemitesouthgate.com/images/ReportLogospng/RMS-Travelocity.svg';
  const CheapTickets = ' https://beta.yosemitesouthgate.com/images/ReportLogospng/RMS-CheapTickets.svg';
  const Wotif = ' https://beta.yosemitesouthgate.com/images/ReportLogospng/RMS-Wotif.svg';


    return (
        <>
        
               {(() => {
                           switch (props.Channel) {
                             case '0':
                               return <img src={INNsight} className="mx-1 innsight-icon" />;
                             case '1':
                               return <img src={Google} className="mx-1 google-icon" />;
                             case '2':
                               return <img src={Yelp} className="mx-1 yelp-icon" />;
                             case '3':
                               return <img src={tripIcon} className="mx-1 trip-icon" />;
                             case '4':
                               return <img src={INNsight} className="mx-1 innsight-icon" />;
                             case '5':
                               return <img src={Booking} className="mx-1 booking-icon" />;
                             case '6':
                               return <img src={Expedia} className="mx-1 expedia-icon" />;
                             case '7':
                               return <img src={Hotelscom} className="mx-1 hotel-icon" />;
                             case '8':
                               return <img src={Travelocity} className="mx-1 travel-icon" />;
                             case '9':
                               return <img src={Orbitz} className="mx-1 orb-icon" />;
                             case '10':
                               return <img src={CheapTickets} className="mx-1 cheap-icon" />;
                             case '11':
                               return <img src={Wotif} className="mx-1 wot-icon" />;
                             case '12':
                               return <img src={EBookers} className="mx-1 ebookers-icon" />;
 
                             default:
                               return <img className="mx-1" />;
 
                           }
                         })()}
        </>
        
                         
                                             

    )
}

export default ReviewChannel;


