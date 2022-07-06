import React from 'react'
//common images
import BannerContainer from '../BannerComponent/BannerContainer';
import BannerImage from '../../../E/Yosemitewestgate/assets/images/BannerImages/parking-banner-desk.webp';
import BannerImage1 from '../../../E/Yosemitewestgate/assets/images/BannerImages/parking-banner-mob.webp';

import DishImg from '.././../Yosemitewestgate/assets/images/innerpages/parking-img.jpg'
import NewsImage from "../../Yosemitewestgate/assets/images/BannerImages/press-releases-img.png";

export default function ParkingPage() {
    return (
        <div>
               <BannerContainer
                bannerImageUrl={BannerImage}
                bannerImageUrlMobile={BannerImage1}
                HeadingTitle2="Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print,"
                InnerPageTitle="LET US HANDLE THE PARKING 1"
            />
            <div className="container">
                <h4>Testing Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</h4>
                <div className="fs-20 ls-1">Test has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
                <h4 className="pt-4">Testing Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</h4>
                <div className="fs-20 ls-1">Test has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
                <div className="pt-4">
                    <img src={DishImg} alt='' />
                </div>
                <div className="row mx-0 pt-4">
                    <div className="col-4">
                    <img src={DishImg} className="w-100" alt='' />
                
                    </div>
                    <div className="col-4">
                    <img src={DishImg} className="w-100" alt='' />
                    </div>
                   
                </div>
            </div>
        </div>
    )
}
