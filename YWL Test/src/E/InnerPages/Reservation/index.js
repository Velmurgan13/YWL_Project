import React from 'react';
import BannerContainer from '../BannerComponent/BannerContainer';
import BannerImage from '../../../E/Yosemitewestgate/assets/images/BannerImages/_reservationdesk_1.webp';
import BannerImage1 from '../../../E/Yosemitewestgate/assets/images/BannerImages/reservationmob_2.webp';

const ReservationComponent = () => {

  return (
    <div className="container-fluid px-0 text-center">
     <BannerContainer
                bannerImageUrl={BannerImage}
                bannerImageUrlMobile={BannerImage1}
                HeadingTitle2="Lorem Ipsum Lorem Ipsum is simply dummy text of the printing"
                InnerPageTitle="Welcome to Reservation Page"
            />
    </div>
  )
}

export default ReservationComponent;

