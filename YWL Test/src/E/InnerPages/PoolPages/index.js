import React from 'react'
//common images
import BannerContainer from '../BannerComponent/BannerContainer';
import BannerImage from '../../../E/Yosemitewestgate/assets/images/BannerImages/pool-banner.webp';
import BannerImage1 from '../../../E/Yosemitewestgate/assets/images/BannerImages/pool-banner-mob.webp';
import DishImg from '.././../Yosemitewestgate/assets/images/innerpages/parking-img.jpg'

export default function PoolPage() {
    return (
        <div>
            <BannerContainer
                bannerImageUrl={BannerImage}
                bannerImageUrlMobile={BannerImage1}
                HeadingTitle2="Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print,"
                InnerPageTitle="TAKE A RELAXING DIP IN OUR POOL"
            />
            <div className="container">
                <div className="">
                    <h4>Testing Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</h4>
                </div>
                <div className="fs-20">
                    Has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
                <div className="pt-4">
                    <h4>Testing Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</h4>
                </div>
                <div className="fs-20">
                    Has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
                <div className="col-4 pt-3 cursor-pointer">
                    <img src={DishImg} className="w-100 " />
                </div>
            </div>

        </div>
    )
}

