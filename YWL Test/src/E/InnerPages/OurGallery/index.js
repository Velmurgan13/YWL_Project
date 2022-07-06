import React, { useState, useEffect, useCallback } from 'react'
import BannerContainer from '../BannerComponent/BannerContainer'
// import BannerImage from '../../../E/Yosemitewestgate/assets/images/BannerImages/rooms-banner-desk.webp';
// import BannerImage1 from '../../../E/Yosemitewestgate/assets/images/BannerImages/rooms-banner-mob.webp';
import { getSeoDescriptionData } from '../../../DataLayer/datalayerUtilities'
import { useRecoilValue } from 'recoil'
import ImageViewer from 'react-simple-image-viewer'
import {
  propertyDataSelector,
  seoThemeDetails,
} from '../../../Recoil/themeModule'
import './index.css'
import ReactHtmlParser from "react-html-parser";


const GalleryComponent = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const images = [
    'http://placeimg.com/1200/800/nature',
    'http://placeimg.com/800/1200/people',
    'http://placeimg.com/1920/1080/animals',
    'http://placeimg.com/1500/500/tech',
    'http://placeimg.com/1500/500/architecture'
  ]

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index)
    setIsViewerOpen(true)
  }, [])

  const closeImageViewer = () => {
    setCurrentImage(0)
    setIsViewerOpen(false)
  }
  const propertyData = useRecoilValue(propertyDataSelector)
  const { guestrooms: seoId } = useRecoilValue(seoThemeDetails)
  // console.log(guestrooms);
  const [seoData, setPropertySeodata] = useState([])

  useEffect(() => {
    fetchSeoProperties()
  }, [])

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData(seoId)
    setPropertySeodata(response.data)
  }

  return (
    <section>
      <BannerContainer seoData={seoData} />
      <div className="container">
        <div className='my-5 d-flex galleryImage'>
          {images.map((src, index) => (
            <img
              src={src}
              onClick={() => openImageViewer(index)}
                  width="200"
                  height="200"
              key={index}
              style={{ margin: '2px' }}
                  alt=""
                  className='mx-3 my-3 imagePosition'
            />
          ))}
          {isViewerOpen && (
            <ImageViewer
              src={images}
              currentIndex={currentImage}
              disableScroll={false}
              closeOnClickOutside={true}
              onClose={closeImageViewer}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default GalleryComponent

// import React, { useState, useCallback } from 'react';
// import { render } from 'react-dom';
// import ImageViewer from 'react-simple-image-viewer';

// const GalleryComponent = () => {
//   const [currentImage, setCurrentImage] = useState(0);
//   const [isViewerOpen, setIsViewerOpen] = useState(false);
//   const images = [
//     'http://placeimg.com/1200/800/nature',
//     'http://placeimg.com/800/1200/nature',
//     'http://placeimg.com/1920/1080/nature',
//     'http://placeimg.com/1500/500/nature',
//   ];

//   const openImageViewer = useCallback((index) => {
//     setCurrentImage(index);
//     setIsViewerOpen(true);
//   }, []);

//   const closeImageViewer = () => {
//     setCurrentImage(0);
//     setIsViewerOpen(false);
//   };

//   return (
//     <div>
//       {images.map((src, index) => (
//         <img
//           src={ src }
//           onClick={ () => openImageViewer(index) }
//           width="300"
//           key={ index }
//           style={{ margin: '2px' }}
//           alt=""
//         />
//       ))}

//       {isViewerOpen && (
//         <ImageViewer
//           src={ images }
//           currentIndex={ currentImage }
//           disableScroll={ false }
//           closeOnClickOutside={ true }
//           onClose={ closeImageViewer }
//         />
//       )}
//     </div>
//   );
// }

// export default GalleryComponent
