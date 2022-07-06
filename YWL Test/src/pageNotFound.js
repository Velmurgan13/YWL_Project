import React, { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil';
import { seoThemeDetails } from "./Recoil/themeModule";
import BannerContainer from "./E/InnerPages/BannerComponent/BannerContainer";
import { getSeoDescriptionData } from "./DataLayer/datalayerUtilities";
import Erroricon from './E/CommonAssets/images/pagenotfound-e.jpg'
import { Link } from 'react-router-dom'
import { AiOutlineSmallDash } from 'react-icons/ai'

export default function PageNotFound() {
  const { overview: seoId } = useRecoilValue(seoThemeDetails);
  const [seoData, setPropertySeodata] = useState([]);

  useEffect(() => {
    fetchSeoProperties();
  }, []);    

  const fetchSeoProperties = async () => {
    // console.log(seoId)
    const response = await getSeoDescriptionData(seoId);
    // alert(response);
    // console.log(response.data)
    setPropertySeodata(response.data);
  };

  return (
    <div className="container-fluid px-0">
      <BannerContainer seoData={seoData} />
      <div className="container error_box my-4">
      <div className="row">
          
              <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 mx-auto text-center">
                  <div> <img src={Erroricon} alt="404 " className="w-100 mt-5" /></div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
                <div className="text-center error_right py-4">
                  <div className="oops">Oops... Page Not Found!</div>
                
                  <ul className="mt-4 px-0 links-icon ">
                    <Link to="/"><li className='fs-16'>Home Page</li></Link>
                    <Link to="/contact-us"><li className='fs-16'> Contact Us</li></Link>
                    <Link to="/reservations"><li className='fs-16'> Reservations</li></Link>
                  </ul>
                </div>
                {/* <!--div class="text-center MT30"><button role="button" class="btn btn-success pdr1 M0" type="submit">Reservations</button></div--> */}
              </div>
            </div>
          </div>
        </div>
  )
}
