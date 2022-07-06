import React, { useState, useEffect } from 'react'
//common banner component
import BannerContainer from '../BannerComponent/BannerContainer'
import './index.css'
import { Link } from 'react-router-dom'
import { FaDownload } from 'react-icons/fa'
import { useRecoilValue } from 'recoil'
import {
  propertyDataSelector,
  seoThemeDetails,
} from '../../../Recoil/themeModule'
import { getSeoDescriptionData } from '../../../DataLayer/datalayerUtilities'

const PetsComponent = () => {
  const propertyData = useRecoilValue(propertyDataSelector);
  const [toggleState, setToggleState] = useState(1)
  const [clicked, setClicked] = useState(false)
  const { pets: seoId } = useRecoilValue(seoThemeDetails)
  const [seoData, setPropertySeodata] = useState([]);

  useEffect(() => {
    fetchSeoProperties()
  }, [])

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData(seoId)
    setPropertySeodata(response.data)
  }
  const toggle = (index) => {
    if (clicked === index) {
      //if clicked question is already active, then close it
      return setClicked(null)
    }
    setClicked(index)
  }

  const toggleTab = (index) => {
    setToggleState(index)
  }

  return (
    <div>
      <BannerContainer seoData={seoData} />
      <div className="container">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="pets-para">
            <p className="ls-1 line-h-22">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries
            </p>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="pets-content">
            <h2>Lorem Ipsum Dolor Sit Amet</h2>
            <p>
              has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to
              make a type specimen book. It has survived not only five
              centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s
              with the release of Letraset sheets containing Lorem Ipsum
              passages, and more recently with desktop publishing software like
              Aldus PageMaker including versions of Lorem Ipsum..
            </p>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="row">
            <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4">
              <Link to="/">
                <img
                  className="pets-img"
                  title="pet-image"
                  alt="pet-image"
                  src="https://beta.yosemitesouthgate.com/gallery-images/properties/2/7/9/finalImage2.jpg"
                ></img>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
        </div>
      </div>
    </div>
  )
}
export default PetsComponent
