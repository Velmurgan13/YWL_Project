import React, { useState, useEffect } from 'react'
//common banner component
import BannerContainer from '../../BannerComponent/BannerContainer'
import './index.css'
import { Link } from 'react-router-dom'
import { FaDownload } from 'react-icons/fa'
import { useRecoilValue } from 'recoil'
import ReactHtmlParser from "react-html-parser";
import {
  propertyDataSelector,
  seoThemeDetails, themeSelector
} from '../../../../Recoil/themeModule'
import { getSeoDescriptionData, getPropPetsData } from '../../../../DataLayer/datalayerUtilities'
// import { themeSelector, propertyDataSelector } from '../../../../Recoil/themeModule'

const PetsComponent = (props) => {
  const propertyData = useRecoilValue(propertyDataSelector);
  // console.log(propertyData);
  // const [toggleState, setToggleState] = useState(1)
  const [clicked, setClicked] = useState(false)
    const { url: baseUrl } = useRecoilValue(themeSelector);
  const { pets: seoId } = useRecoilValue(seoThemeDetails)
  const [seoData, setPropertySeodata] = useState([]);
  // const [petsData, setPetsData] = useState([]);
 

  useEffect(() => {
    fetchSeoProperties();
    // fetchPetsDataProperties();
  }, [])

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData(seoId)
    setPropertySeodata(response.data)
  }

  // const fetchPetsDataProperties = async () => {
  //   const response = await getPropPetsData()
  //   console.log('this is first', response.data);
  //   setPetsData(response.data.policies)
  //   console.log(response.data.policies);
  // }


  return (
    <div>
      <BannerContainer seoData={seoData} />
      <div className="container">
      {/* {Object.values(petsData).map((item) => ( */}

      <><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="row">
            <div className="pets-content">
              <Link to="/">
                <img
                  className="pets-img"
                  title="pet-image"
                  alt="pet-image"
                  src="https://beta.yosemitesouthgate.com/gallery-images/properties/2/7/9/finalImage2.jpg"
                ></img>
              </Link>
             <div className='pt-3'>
             {ReactHtmlParser(propertyData.pet_policy)}
             </div>
          
            </div>
          </div>
        </div><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="pet-pdf text-center">
              <a
                href="https://my.innstaging.com/assets/documents/static_pages/credit_card/052d4396d92e48b354e0690957c0d5b2.pdf"
                title="Pets"
              >
                <button className="pdf-btn">
                  {' '}
                  <FaDownload className="btn-icon" /> Download
                </button>
              </a>
            </div>
          </div></>
        {/* ))} */}
     
      </div>
    </div>
  )
}
export default PetsComponent
