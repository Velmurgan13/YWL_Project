import React, { useState } from 'react';
import { Data } from './Data';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import '../../InnerPages/Entertainment/index.scss'
import InnerSlider from '../../InnerPages/Entertainment/innerSlider'
import Gmaps from '../../Yosemitewestgate/assets/images/innerpages/maps.png'


import BannerContainer from "../BannerComponent/BannerContainer";
import BannerImage from "../../../E/Yosemitewestgate/assets/images/BannerImages/faq-banner-desk.webp";
import BannerImage1 from "../../../E/Yosemitewestgate/assets/images/BannerImages/faq-banner-mob.webp";

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const AccordionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  // height: 100vh;
  background: #fff;
`;

const Wrap = styled.div`
  background: #272727;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: center;
  cursor: pointer;
  h1 {
    padding: 2rem;
    font-size: 2rem;
  }
  span {
    margin-right: 1.5rem;
  }
`;

const Dropdown = styled.div`
  background: #1c1c1c;
 
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-size: 2rem;
  }
`;

const EntertainmentPage = () => {
  const [clicked, setClicked] = useState(false);

  const toggle = index => {
    if (clicked === index) {
      //if clicked question is already active, then close it
      return setClicked(null);
    }
    setClicked(index);
  };

  return (
    <div className="container-fluid Entertainmen-style ">
     
    <IconContext.Provider value={{ color: '#00FFB9', size: '25px' }}>
        <BannerContainer
         bannerImageUrl={BannerImage}
        bannerImageUrlMobile={BannerImage1}
        HeadingTitle2="Lorem Ipsum Lorem Ipsum is simply dummy text of the printing"
        InnerPageTitle=" Frequently Asked Questions - Yosemite Southgate Hotel and Suites"
      />
    
      <AccordionSection>
        <div className="container w-100">
        <div className="text-muted fs-20 py-2">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
      </div>
      <div className="h-50">
          <img src={Gmaps} className="h-50" />
      </div>
          {Data.map((item, index) => {
            return (
              <>
                <Wrap className="col-12 bg-white border border-secondary my-3" onClick={() => toggle(index)} key={index}>
                 <div ><h5 className="text-dark pt-2">1. TESTING </h5></div>
                  <span>{clicked === index ? <IoIosArrowUp className="text-dark"/> : <IoIosArrowDown className="text-dark" />}</span>
                </Wrap>
                {clicked === index ? (
                  <Dropdown className="bg-white text-dark">
                  <InnerSlider />
                  </Dropdown>
                ) : null}
              </>
            );
          })}
        </div>
      </AccordionSection>
    </IconContext.Provider>
    </div>
  );
};

export default EntertainmentPage;