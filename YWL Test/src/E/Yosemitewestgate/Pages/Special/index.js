import React from 'react';

//banner Image
import BannerContainer from '../../Components/BannerContainer';
import CommonBanner from '../../../assets/images/main-slider.webp';

const SpecialComponent = () => {
    return (
        <>
            <BannerContainer bannerImageUrl={CommonBanner} 
            welComeContent="WELCOME TO Special Page"
        />
        </>
    )
}
export default SpecialComponent;

