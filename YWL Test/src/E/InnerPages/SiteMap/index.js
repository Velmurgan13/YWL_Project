import React, { useState, useEffect } from "react";
import { getSeoDescriptionData, getPropSiteMapData } from "../../../DataLayer/datalayerUtilities";
import { Link } from "react-router-dom"
import "./index.scss"
import BannerContainer from "../BannerComponent/BannerContainer";
import ReactHtmlParser from "react-html-parser";
import { object } from "yup";

const SiteMapComponent = () => {
  const [seoData, setPropertySeodata] = useState([]);
  const [siteMapData, setSiteMapData] = useState([]);
  const [siteRoomData, setSiteRoomData] = useState([]);
  const [sitePackageData, setSitePackageData] = useState([]);
  const [siteCustomData, setSiteCustomData] = useState([]);

  useEffect(() => {
    fetchSeoProperties();
    fetchSiteMapData();
  }, []);

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData("15");
    setPropertySeodata(response.data);
  };

  const fetchSiteMapData = async () => {
    const response = await getPropSiteMapData();
    // console.log(response.data);
    setSiteMapData(response.data.attractions);
    setSiteRoomData(response.data.room_details);
    setSitePackageData(response.data.package_details);
    setSiteCustomData(response.data.customPages);
    console.log("hhh", response.data)
  };


  return (
    <>
      <BannerContainer seoData={seoData} />
      <div className="Sitemap-page container mb-5">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-justify P0 width100tabmob messages_bar MT10 ">
          <div className="termconditiosns">
            <ul className="indexing outerUl">
              <li>
                <Link className="info_collect" to="/">
                  <strong>Yosemite Westgate Lodge Homepage</strong>
                </Link>
              </li>
              <li>
                <Link className="info_collect" to="/overview">
                  <strong>Overview for the Yosemite Westgate Lodge</strong>
                </Link>
              </li>
              <li>
                <Link className="info_collect" to="/page">
                  <strong>Entry Reservation - Yosemite Westgate Lodge</strong>
                </Link>
              </li>


              <li>
                <Link className="info_collect" to="reviews">
                  <strong>Groveland Hotel Guest Rooms</strong>
                </Link>
              </li>
              <ul>


                <>
                  {/* {Object.values(siteMapData).slice(1, 32).map((item) => {
                                return ( */}
                  {Object.values(siteRoomData).slice(1, 7).map((item) => {
                    return (
                      <>

                        <li>
                          <Link className="info_collect" to={`/guestrooms/${item.subdomain}`}>
                              {ReactHtmlParser(item.room_name)}
                          </Link>
                        </li>
                      </>
                    );
                  })}
                </>
              </ul>


              <li>
                <a className="info_collect">
                  <strong>Groveland, CA Destination Guide</strong>
                </a>
              </li>
              <ul>
                <li>
                  <Link to="/attractions/dest_url" className="info_disclose" href="#info_disclose">
                  Groveland, CA Attractions
                  </Link>
                </li>
                <ul>
                  <>

                
                
                             {Object.values(siteMapData).slice(1, 32).map((item) => {
                                return (
                        <>

                          <li> 
                            <Link to={`/attractions/${item.attraction_url}`} className="info_disclose" href="#info_disclose">
                            {ReactHtmlParser(item.address1)}
                            </Link>
                          </li>
                        </>
                      );
                    })}
                  </>
                </ul>
              </ul>





              {/* <>
{Object.values(siteMapData).map((item) => {
              return (
                <>
                  <div className="mt-4">
                    <strong class="static-line mt-4">
                      {ReactHtmlParser(item.address1)}
                    </strong>
                 
                  </div>
                </>
              );
            })}
</> */}

              {/* <ul>
                  <li>
                    <a className="info_disclose" href="#info_disclose">
                      2 Queen Standard
                    </a>
                  </li>
                  <li>
                    <a className="info_automatic" href="#info_automatic">
                      2 Queen Standard Accessible
                    </a>
                  </li>
                  <li>
                    <a className="info_other" href="#info_other">
                      2 Queen Deluxe
                    </a>
                  </li>
                  <li>
                    <a className="info_other" href="#info_other">
                      King Standard
                    </a>
                  </li>
                  <li>
                    <a className="info_other" href="#info_other">
                      King Standard Accessible
                    </a>
                  </li>
                </ul> */}
              {/* </li> */}
              {/* <li>
                <a className="info_collect">
                  <strong>Groveland Hotel Reviews</strong>
                </a>
              </li>
              <li>
                <Link className="info_collect" to="/friends">
                  <strong>Friends</strong>
                </Link>
              </li>
              <li>
                <a className="info_collect">
                  <strong>Yosemite Westgate Lodge Gallery</strong>
                </a>
              </li> */}
              {/* <ul>
                <li>
                  <Link to="/gallery" className="info_disclose" href="#info_disclose">
                    Yosemite Westgate Lodge Pictures
                  </Link>
                </li>
                <li>
                  <Link to="/3d-virtual-tours" className="info_disclose" href="#info_disclose">
                    Yosemite Westgate Lodge 3D Virtual Tours
                  </Link>
                </li>
              </ul> */}





              {/* <>
{Object.values(siteRoomData).map((item) => {
              return (
                <>
                  <div className="mt-4">
                    <strong class="static-line mt-4">
                      {ReactHtmlParser(item.room_name)}
                    </strong>
                 
                  </div>
                </>
              );
            })}
</> */}

              <li>
                <a className="info_collect">
                  <strong>Groveland, CA Packages</strong>
                </a>
              </li>
              <ul>
                <li>
                  <Link to="/attractions" className="info_disclose" href="#info_disclose">
                  Groveland, CA Specials & Packages
                  </Link>
                </li>
                <ul>
                  <>
                    {Object.values(sitePackageData).map((item) => {
                      return (
                        <>

                          <li>
                            <Link to={`/packages/${item.subdomain}`} className="info_disclose" href="#info_disclose">
                              {ReactHtmlParser(item.ptitle)}
                            </Link>
                          </li>
                        </>
                      );
                    })}
                  </>
                </ul>
              </ul>

              <li>
                <a className="info_collect">
                  <strong>Friends</strong>
                </a>
              </li>

              <li>
                <Link to="/attractions" className="info_disclose" href="#info_disclose">
                  Yosemite Westgate Lodge Gallery
                </Link>
              </li>
              <ul>
                <li>
                  <a className="info_collect">
                    Yosemite Westgate Lodge Pictures
                  </a>
                </li>
                <li>
                  <a className="info_collect">
                    Yosemite Westgate Lodge Videos
                  </a>
                </li>
                <li>
                  <a className="info_collect">
                    Yosemite Westgate Lodge 3D Virtual Tours
                  </a>
                </li>
              </ul>

              <li>
                <Link className="info_collect" to="/directions">
                  <strong>Directions to the Yosemite Westgate Lodge</strong>
                </Link>
              </li>
              <li>
                <Link className="info_collect" to="/contact-us">
                  <strong>Contact Us</strong>
                </Link>
              </li>
              <li>
                <Link className="info_collect" to="/reservations">
                  <strong>
                    Hotel Reservations at the Yosemite Westgate Lodge
                  </strong>
                </Link>
              </li>
              <li>
                <a className="info_collect">
                  <strong>Yosemite Family Adventures</strong>
                </a>
              </li>
              <li>
                <a className="info_collect">
                  <strong>Best Hikes in Yosemite National Park</strong>
                </a>
              </li>
              <li>
                <a className="info_collect">
                  <strong>EV Charging</strong>
                </a>
              </li>
              <li>
                <Link className="info_collect" to="/news">
                  <strong>News</strong>
                </Link>
              </li>
              <li>
                <Link className="info_collect" to="/jobs">
                  <strong>Jobs</strong>
                </Link>
              </li>
              <li>
                <a className="info_collect">
                  <strong>Blog</strong>
                </a>
              </li>
              <li>
                <Link className="info_collect" to="/lost-found">
                  <strong>Lost & Found</strong>
                </Link>
              </li>
              <li>
                <Link className="info_collect" to="/faq">
                  <strong>FAQs</strong>
                </Link>
              </li>
              <li>
                <Link className="info_collect" to="/cookies">
                  <strong>
                    Cookies Information and Policy - Yosemite Westgate Lodge
                  </strong>
                </Link>
              </li>
              <li>
                <Link className="info_collect" to="/privacy-policy">
                  <strong>
                    Privacy Policy for the Yosemite Westgate Lodge
                  </strong>
                </Link>
              </li>
              <li>
                <Link className="info_collect" to="/terms-conditions">
                  <strong>
                    Terms & Conditions for the Yosemite Westgate Lodge
                  </strong>
                </Link>
              </li>
              <li>
                <Link className="info_collect" to="/personal-info-request-form">
                  <strong>Personal Data Request</strong>
                </Link>
              </li>
              <li>
                <Link className="info_collect" to="/ada-accessibility-amenities-services-facilities">
                  <strong>Accessibility</strong>
                </Link>
              </li>
              <li>
                <Link className="info_collect" to="/cleaning-protocols">
                  <strong>Cleaning Protocols</strong>
                </Link>
              </li>
              <>
                {Object.values(siteCustomData).map((item) => {
                  return (
                    <>
                      <li>
                        <Link className="info_collect" to="/cleaning-protocols">
                          <strong> {ReactHtmlParser(item.page_name)}</strong>
                        </Link>
                      </li>
                    </>
                  );
                })}
              </>
              <li>
                <Link className="info_collect" to="/">
                  <strong>Modify/Cancel</strong>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteMapComponent;
