import React, { useState, useEffect } from "react";
import "../PicturesPage/index.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { LightgalleryItem } from "react-lightgallery";
import { ImSearch } from "react-icons/im";

export default function GalleyImages(props) {
  const [loading, setLoading] = useState(true);
  let GalleryData = props.GalleryData;
  let albumData = props.albumData;
  let listShowImages = props.listShowImages;
  let showAlbumImages = props.showAlbumImages;

  // Code for sekleton Timeout starts
  (function () {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  })();
  // Code for sekleton Timeout ends

  console.log(props);
  return (
    <>
      {listShowImages ? (
        <>
          {Object.values(showAlbumImages).map((images) => (
            <div key={images.id} className="image-card">
              {loading ? (
                <Skeleton count={10} />
              ) : (
                <LightgalleryItem
                  group="any"
                  subHtml={`<div class="gallery-caption">${images.image_caption}</div>`}
                  src={"https://beta.yosemitewestgate.com/" + images.image}
                  downloadUrl="false"
                  title={images.image_caption}
                >
                  <img
                    className="image"
                    src={"https://beta.yosemitewestgate.com/" + images.image}
                    alt={images.image_caption}
                    title={images.image_caption}
                  />
                  <ImSearch size="50" className="gallSearchicon" />
                </LightgalleryItem>
              )}
            </div>
          ))}
        </>
      ) : (
        <>
          {Object.values(GalleryData).map((images) => (
            <div key={images.id} className="image-card">
              {loading ? (
                <Skeleton count={10} />
              ) : (
                <LightgalleryItem
                  group="any"
                  subHtml={`<div class="gallery-caption">${images.image_caption}</div>`}
                  src={"https://beta.yosemitewestgate.com/" + images.image}
                  downloadUrl="false"
                  title={images.image_caption}
                >
                  <img
                    className="image"
                    src={"https://beta.yosemitewestgate.com/" + images.image}
                    alt={images.image_caption}
                    title={images.image_caption}
                  />
                  <ImSearch size="50" className="gallSearchicon" />
                </LightgalleryItem>
              )}
            </div>
          ))}
        </>
      )}
    </>
  );
}
