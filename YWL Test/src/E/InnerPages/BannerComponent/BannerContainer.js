import { React, useEffect, useRef } from "react";
import MetaTags from "react-meta-tags";
import "./bannerContainerStyles.css";
import ReactHtmlParser from "react-html-parser";
import WrappperCheckAvailibility from "../../CheckAvailibilty/WrapperCheckAvailibity";
import { useRecoilValue } from "recoil";
import { themeSelector } from "../../../Recoil/themeModule";
import { LazyLoadImage } from "react-lazy-load-image-component";

import DefaultImg from "../../CommonAssets/images/df.jpg";

const BannerContainer = (props) => {
  // const [ stateImage, setStateImage ] =useState(false);

   
  //  console.log('banner: ', props);
  // const onSrollPage = function () {
  //   if (document.querySelector(".App")) {
  //     let headerSmaller = document.querySelector(".App");
  //     let screenWidth = window.screen.availWidth;
  //     if (screenWidth > 1199) {
  //       if (window.pageYOffset > 500) {
  //         headerSmaller.classList.add("smaller");
  //       } else {
  //         headerSmaller.classList.remove("smaller");
  //       }
  //     }
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", onSrollPage);
  // });
  // ----------------------------------------------------------------------
  // function handleBackClick(nav) {
  //   nav.current.scrollIntoView({ behavior: "smooth" });
  //   if (window.screen.width > 1200) {
  //     window.scrollTo(0, nav.current.offsetTop + 690);
  //   }
  // }
  // const scrollToRef = (ref) => {
  //   window.screen.availWidth > 1199
  //     ? window.scrollTo(0, ref.current.offsetTop - 100)
  //     : window.scrollTo(0, ref.current.offsetTop - 0);
  // };

  // const myRef = useRef(null);
  // const myRef1 = useRef(null);

  // const executeScroll = () => scrollToRef(myRef);
  // const executeScroll1 = () => scrollToRef(myRef1);
  // -------------------------------------------------------------------------
  const { url: baseUrl } = useRecoilValue(themeSelector);
  //const pageUrl = useRecoilValue(globalPageUrl)
  const CurrentWebUrl = window.location.href;
  //console.log(CurrentWebUrl);
  //console.log(props.seoData);
  return (
    <div className="displayCA">
      <div className="position-relative overlay-bg-layer">
        {/* <div className="overlay-bg-layer"></div> */}
        <div className="text-white banner-title-bg-color d-inline-block mt-2 fs-xs-16 px-0 px-md-4 ls-2 position-absolute mb-2">
          <span>{ReactHtmlParser(props.seoData.slider_img_text)}</span>
        </div>

        <picture>
          <source
            className="w-100 h-100 banner-xs banner-xl-size mx-0 mt-0 d-none d-md-block d-lg-block d-xl-block"
            src={
              baseUrl +
              "/gallery-images/properties/" +
              ReactHtmlParser(props.seoData.slider_img)
            }
            
            type="image/webp"
          ></source>
          <source
            className="w-100 h-100 banner-xs banner-xl-size mx-0 mt-0 d-none d-md-block d-lg-block d-xl-block"
            src={
              baseUrl +
              "/gallery-images/properties/" +
              ReactHtmlParser(props.seoData.slider_img)
            }
            type="image/jpg"
            onError={(e) => {
              e.currentTarget.src =
          DefaultImg
            } }
          ></source>
          <img
            className="w-100 h-100 banner-xs banner-xl-size mx-0 mt-0 d-none d-md-block d-lg-block d-xl-block"
            src={
              baseUrl +
              "/gallery-images/properties/" +
              ReactHtmlParser(props.seoData.slider_img)
            }
            onError={(e) => {
              e.currentTarget.src =
          DefaultImg
            } }
            alt="loading banner image..."
          />
          {/* {console.log(
            baseUrl +
              "/gallery-images/properties/" +
              ReactHtmlParser(props.seoData.slider_img)
          )} */}
          <img
            className="w-100 h-100 banner-xs mx-0  mt-0 d-block d-md-none d-lg-none d-xl-none"
            // src={
            //   baseUrl +
            //   "/gallery-images/properties/" +
            //   ReactHtmlParser(props.seoData.slider_img_mobile)
            // }
            onError={(e) => {
              e.currentTarget.src =
          DefaultImg
            } }
            alt="banner-overiew"
          />
          <div className="inner-text-overlay"></div>
        </picture>

        {/* <div>
         
          className="w-100 h-100 banner-xs banner-xl-size mx-0 mt-0 d-none d-md-block d-lg-block d-xl-block"
          src={
            baseUrl +
            '/gallery-images/properties/' +
            ReactHtmlParser(props.seoData.slider_img)
          }
          alt="Loading..."
          onError={e => {
            e.currentTarget.src =
              'https://beta.laquintasantacruz.com/gallery-images/default-vector-bedroom-image.jpg'
          }}
          height={542}
          width={1500}
          />
                 <LazyLoadImage
          className="w-100 h-100 banner-xs mx-0  mt-0 d-block d-md-none d-lg-none d-xl-none"
          src={
            baseUrl +
            '/gallery-images/properties/' +
            ReactHtmlParser(props.seoData.slider_img_mobile)
          }
          alt="banner-overiew"
          height={542}
          width={1500}
        
       
      </div> */}
        <div className="wrapCA" id="showMe">
          {props.inputParams && <WrappperCheckAvailibility inputParams={props.inputParams} setcheckAvailability={props.setcheckAvailability}/>}
          {!props.inputParams && <WrappperCheckAvailibility inputParams={props.inputParams} setcheckAvailability={props.setcheckAvailability}/>}
        </div>
      </div>

      {/* <div className='ipadFlip'> */}

      <MetaTags>
        <title>{ReactHtmlParser(props.seoData.meta_title)}</title>
        <meta
          name="description"
          content={ReactHtmlParser(props.seoData.meta_desc)}
        />
        <meta
          property="og:title"
          content={ReactHtmlParser(props.seoData.meta_title)}
        />
        <meta
          property="og:description"
          content={ReactHtmlParser(props.seoData.meta_desc)}
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={CurrentWebUrl} />
        <meta
          property="og:image"
          content={
            baseUrl +
            "/gallery-images/properties/" +
            ReactHtmlParser(props.seoData.slider_img)
          }
        />
        <meta
          name="twitter:image"
          content={
            baseUrl +
            "/gallery-images/properties/" +
            ReactHtmlParser(props.seoData.slider_img)
          }
        />
        <meta property="og:site_name" content="Yosemite westgate lodge" />
        <meta
          name="twitter:title"
          content={ReactHtmlParser(props.seoData.meta_title)}
        />
        <meta
          name="twitter:description"
          content={ReactHtmlParser(props.seoData.meta_desc)}
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={CurrentWebUrl} />
        <link rel="canonical" href={CurrentWebUrl} />
      </MetaTags>
      {window.location.href.includes("overview") ?  <div className="text-center">
        <ul className="nav justify-content-center infoLayer py-3">
          <li className="">
            <a className="nav-link" id="1" >
              Information
            </a>
          </li>
          <li className="">
            <a className="nav-link"  id="2"> 
              Amenities
            </a>
          </li>
          <li className="">
            <a className="nav-link"  id="3">
              Policies
            </a>
          </li>
          <li className="">
            <a className="nav-link" id="4">Terms & Conditions</a>
          </li>
        </ul>
      </div> : null}
     
      <div className="text-center">
        {props.seoData.h1 && (
          <h1 className="about primary-title" id="info1">
            {props.seoData.h1}
          </h1>
        )}
        <div className="container ">
          <div className="col-lg-12">
            <p className="mt-3">
              {" "}
              {ReactHtmlParser(props.seoData.property_content)}
            </p>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default BannerContainer;
