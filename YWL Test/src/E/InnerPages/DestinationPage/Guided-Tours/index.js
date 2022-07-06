import React, { useState, useEffect } from 'react'
import BannerContainer from '../../../InnerPages/BannerComponent/BannerContainer'
import { getSeoDescriptionData } from '../../../../DataLayer/datalayerUtilities'
import './index.scss'
import { useRecoilValue } from 'recoil'
import { Helmet } from 'react-helmet'
import {
  seoThemeDetails,
  propertyDataSelector,
} from '../../../../Recoil/themeModule'
import { motion } from 'framer-motion';

export default function CreditCardpage() {
  const { yourguide: seoId } = useRecoilValue(seoThemeDetails)
  const [seoData, setPropertySeodata] = useState([])
  const propertyName = useRecoilValue(propertyDataSelector)

  useEffect(() => {
    fetchSeoProperties()
  }, [])
  // console.log(propertyName)

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData(seoId)
    setPropertySeodata(response.data)
  }

  return (
    <div>
     <motion.div
    initial={{ scaleY: 0 }}
    animate={{ scaleY: 1 }}
    exit={{ scaleY: 0 }}
    transition={{ duration: 0.4 }}
  >
        <BannerContainer seoData={seoData} />
        </motion.div>
      <div className="container CreditCard mb-5">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 PB20 credit-card-div">
          <div id="gyg-widget"></div>
          <Helmet>
            {' '}
            <script
              async
              defer
              src="https://cdn.getyourguide.com/pw/latest/client-loader/widget.js"
              onload="GYG.Widget(document.getElementById('gyg-widget'),
                {'numberOfItems':'20','q':'Groveland','partnerId':'KN3E1HF'});"
            ></script>
          </Helmet>
        </div>
      </div>
    </div>
  )
}
