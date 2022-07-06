import React, { useState, useEffect } from 'react'
import BannerContainer from '../../InnerPages/BannerComponent/BannerContainer'
import { getSeoDescriptionData } from '../../../DataLayer/datalayerUtilities'
import '../../../E/InnerPages/CreditCard/index.scss'
import { useRecoilValue } from 'recoil'
import {
  seoThemeDetails,
  propertyDataSelector,
} from '../../../Recoil/themeModule'

export default function CreditCardpage() {
  const { creditcard: seoId } = useRecoilValue(seoThemeDetails)
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
      <BannerContainer seoData={seoData} />
      <div className="container CreditCard mb-5">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 PB20 credit-card-div">
          <div className="credit-card-para">
            <p>
              {propertyName.property_name} &amp; Suites accepts all major credit
              cards, including Visa, MasterCard, Discover, and American
              Express.&nbsp; We also accept cash, however require a valid credit
              card and identification are required as a security deposit.&nbsp;
              Guest name on the credit card used as method of payment must match
              the guest name on the folio at check in.&nbsp; All customers are
              validated with a drivers license or state issued ID at time of
              check in.&nbsp; Credit cards used at the time of booking are used
              solely as a method of guaranteeing your booking unless you have
              prepaid your reservation as a term of your booking.&nbsp;
            </p>

            <p>
              Below, you will find our Credit Card Authorization Form, which is
              required for payment of a guest folio by a third party or
              individual who is not present at the time of check-in.&nbsp;
              Please download the Credit Card Authorization Form, complete it in
              full with all personally identifiable information including your
              method of payment details and return back to the hotel via fax at
              559-683-3836 along with a copy of the payee's picture
              identification and credit card (front and back).
            </p>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  my-5 ">
          <div className="accept-method-div ">
            <h2 className="mb-4">Accepted payment methods</h2>
            <p>
              Visa, MasterCard, American Express, Discover, Cash. This hotel
              reserves the right to pre-authorize credit cards prior to arrival.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
