
import React from 'react';
//common banner component
import BannerContainer from '../BannerComponent/BannerContainer';
import BannerImage from '../../../E/Yosemitewestgate/assets/images/BannerImages/jobs-banner.jpg';
import BannerImage1 from '../../../E/Yosemitewestgate/assets/images/BannerImages/jobs-banner-mob.webp';
import Accordion from 'react-bootstrap/Accordion'

const ArtCulturePage = () => {
    return (
        <div>
            <BannerContainer
                bannerImageUrl={BannerImage}
                bannerImageUrlMobile={BannerImage1}
                HeadingTitle2="Lorem Ipsum Lorem Ipsum is simply dummy text of the printing"
                InnerPageTitle="JOB OPENINGS AT YOSEMITE SOUTHGATE HOTEL AND SUITES, OAKHURST, CALIFORNIA"
            />
            <div className="container">
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Accordion Item #1</Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                            est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Accordion Item #2</Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                            est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    )
}
export default ArtCulturePage;