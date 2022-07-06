import React from 'react';
//common banner component
import BannerContainer from '../BannerComponent/BannerContainer';
import BannerImage from '../../../E/Yosemitewestgate/assets/images/BannerImages/weatherbanner.webp';

//icons
//icons
import { WiHumidity } from 'react-icons/wi'
import { FiWind, FiCloudDrizzle } from 'react-icons/fi'

const WeatherComponent = () => {
    return (
        <div>
            <BannerContainer
                bannerImageUrl={BannerImage}
                HeadingTitle2="Lorem Ipsum Lorem Ipsum is simply dummy text of the printing"
                InnerPageTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"
            />
             <div className="container Weather shadow my-5">
                <div className="row bg-light py-3">
                    <div className="col-12 col-md-4 px-0 ">
                        <div className="weather-bg text-center">
                           <h6 className="pt-3 px-4 ls-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</h6>
                           <h1 className="pt-5">87.7°F</h1>
                        </div>
                        <div className="text-center">
                        <h6 className="pt-3 px-4 ls-1">Lorem ipsum dolor sit </h6>
                        <h6 className="pt-3 px-4 ls-1">Lorem ipsum dolor sit </h6>
                        <h6 className="pt-3 px-4 ls-1">Lorem ipsum dolor sit </h6>
                        <h6 className="pt-3 px-4 ls-1">Lorem ipsum dolor sit </h6>
                        </div>
                    </div>
                    <div className="col-12 col-md-8 px-5">
                        <div className="row">
                            <div className="col-12 col-md-4 px-0">
                            <div className="card p-3 d-flex align-items-center">
                                    <h3 className="dayne">Tomorrow</h3>
                                    <p>MAY 05</p>
                                    <FiCloudDrizzle className="float-center" size="40" />
                                    <p className="timing1">Clear Skies</p>
                                    <p className="temp-value">52°F | 11.1°C</p>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 px-0">
                            <div className="card p-3 d-flex align-items-center">
                                    <h3 className="dayne">Tomorrow</h3>
                                    <p>MAY 05</p>
                                    <FiCloudDrizzle className="float-center" size="40" />
                                    <p className="timing1">Clear Skies</p>
                                    <p className="temp-value">52°F | 11.1°C</p>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 px-0">
                            <div className="card p-3 d-flex align-items-center">
                                    <h3 className="dayne">Tomorrow</h3>
                                    <p>MAY 05</p>
                                    <FiCloudDrizzle className="float-center" size="40" />
                                    <p className="timing1">Clear Skies</p>
                                    <p className="temp-value">52°F | 11.1°C</p>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 px-0">
                            <div className="card p-3 d-flex align-items-center">
                                    <h3 className="dayne">Tomorrow</h3>
                                    <p>MAY 05</p>
                                    <FiCloudDrizzle className="float-center" size="40" />
                                    <p className="timing1">Clear Skies</p>
                                    <p className="temp-value">52°F | 11.1°C</p>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 px-0">
                            <div className="card p-3 d-flex align-items-center">
                                    <h3 className="dayne">Tomorrow</h3>
                                    <p>MAY 05</p>
                                    <FiCloudDrizzle className="float-center" size="40" />
                                    <p className="timing1">Clear Skies</p>
                                    <p className="temp-value">52°F | 11.1°C</p>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 px-0">
                            <div className="card p-3 d-flex align-items-center">
                                    <h3 className="dayne">Tomorrow</h3>
                                    <p>MAY 05</p>
                                    <div className="text-center">
                                    <FiCloudDrizzle size="40" />
                                    </div>
                                    <p className="timing1">Clear Skies</p>
                                    <p className="temp-value">52°F | 11.1°C</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WeatherComponent;