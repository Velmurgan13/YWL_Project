import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../PicturesPage/index.scss";
import GalleyImages from "../PicturesPage/galleryImages";
import BannerContainer from "../../../InnerPages/BannerComponent/BannerContainer";
import { useRecoilValue } from "recoil";
import { SRLWrapper } from "simple-react-lightbox";
import {
  propertyDataSelector,
  seoThemeDetails,
  themeSelector,
} from "../../../../Recoil/themeModule";
import {
  getSeoDescriptionData,
  getGalleryData,
} from "../../../../DataLayer/datalayerUtilities";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Collapsible } from 'react-hook-collapse';
import { Link, useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import "lightgallery.js/dist/css/lightgallery.css";
import { LightgalleryProvider } from "react-lightgallery";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import { HiMenuAlt1 } from "react-icons/hi";

export default function GalleyPage(props) {
  const { id } = useParams();
  const themeSelectorData = useRecoilValue(themeSelector);
  const { gallery: seoId } = useRecoilValue(seoThemeDetails);
  const [seoData, setPropertySeodata] = useState([]);
  const [GalleryData, setGalleryData] = useState([]);
  const [albumData, setAlbumdata] = useState([]);
  const [listShowImages, setListShowImages] = useState(false);
  const [showAlbumImages, setShowAlbumImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [path, setPath] = useState([]);
  let storeAlbumListImages = [];
  let history = useHistory();
  let pathName = useLocation();
  const [opensCollapse, setOpensCollapse] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobAlbumName, setMobAlbumName] = useState("All");

  useEffect(() => {
    fetchSeoProperties();
    fetchPropertyGallery();
    // callFunction();
  }, []);

  const options = {
    settings: {
      overlayColor: "rgb(25, 136, 124)",
      autoplaySpeed: 1500,
      transitionSpeed: 900,
    },
    buttons: {
      backgroundColor: "#1b5245",
      iconColor: "rgba(126, 172, 139, 0.8)",
    },
    caption: {
      captionColor: "#a6cfa5",
      captionFontFamily: "Raleway, sans-serif",
      captionFontWeight: "300",
      captionTextTransform: "uppercase",
    },
  };

  const toggleCollapse = function () {
    setOpensCollapse(!opensCollapse);
  };

  // useEffect(() => {
  //   callFunction();
  // }, [id]);

  const callFunction = () => {
    let splitDash;
    if (id) {
      splitDash = id.replaceAll("-", " ");
      if (document.getElementById(splitDash)) {
        document.getElementById(splitDash).click();
      }
    }
  };

  const fetchSeoProperties = async () => {
    setTimeout(async () => {
      const response = await getSeoDescriptionData(seoId);
      setPropertySeodata(response.data);
    }, 1000);
  };

  const fetchPropertyGallery = async () => {
    setTimeout(async () => {
      const response = await getGalleryData();
      setGalleryData(response.images.medium);
      setAlbumdata(response.images.album_list);
      callFunction();
    }, 1000);

    // console.log('albumData: ', albumData);
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     debugger;
  //     filterImages(GalleryData, pathName.pathname);
  //   }, 6000);

  //   console.log(pathName.pathname.split("/"), "pathename cLled");
  // }, [pathName.pathname]);

  // Code for Filter Images for Album list starts
  const filterImages = function (albumListDatas, evt) {
    let onUrlChangeActive = [...evt.target.classList].includes(
      "list-albumName"
    );

    setMobAlbumName(albumListDatas.album_name);

    let activeAlbums = document.querySelectorAll(".active-albmList");
    activeAlbums &&
      activeAlbums.forEach((actlist) => {
        actlist.classList.remove("active-albmList");
      });

    onUrlChangeActive
      ? evt.target.classList.add("active-albmList")
      : evt.target.parentElement.classList.add("active-albmList");
    // evt.target.parentElement.classList.add("active-albmList");
    GalleryData.forEach((e) => {
      albumListDatas.album_name == e.album_name && storeAlbumListImages.push(e);
    });
    setListShowImages(true);
    setShowAlbumImages(storeAlbumListImages);
    toggleCollapse();
  };

  const showAllImagesFn = function (evt) {
    // debugger;
    setMobAlbumName("All");
    let activeAlbums = document.querySelectorAll(".active-albmList");
    activeAlbums &&
      activeAlbums.forEach((actlist) => {
        actlist.classList.remove("active-albmList");
      });

    evt.target.parentElement.classList.add("active-albmList");
    listShowImages && setListShowImages(false);
    toggleCollapse();
  };
  // Code for Filter Images for Album list Ends

  // console.log(albumData, "Album Data");

  return (
    <div className="Gallery mb-5">
      <BannerContainer seoData={seoData} />

      <div className="container">
        <ul className="image-list-div hidden-sm hidden-xs hidden-md">
          {albumData ? (
            <>
              <li
                className="list-albumName active-albmList"
                onClick={(e) => {
                  showAllImagesFn(e);
                }}
              >
                <Link to="/gallery">All</Link>
              </li>
              {Object.values(albumData).map((list, id) => (
                <li
                  className="list-albumName"
                  id={list.album_name}
                  onClick={(e) => {
                    filterImages(list, e);
                  }}
                >
                  <Link
                    to={`/gallery/${list.album_name.replaceAll(" ", "-")}`}
                    key={id}
                  >
                    {list.album_name}
                  </Link>
                </li>
              ))}
            </>
          ) : (
            <li className="list-albumName active-albmList">
              <Link to="/gallery">All</Link>
            </li>
          )}
        </ul>

        <div className="hidden-lg galleryMenu text-center">
          <div
            className="galleryMobMenuDiv"
            onClick={() => toggleCollapse()}
            aria-expanded={opensCollapse}
            aria-controls="collapseIdAmenities"
          >
            {" "}
            <span className="mob-albumname">{mobAlbumName}</span>
            <HiMenuAlt1 size="35" className="menuIconDd"></HiMenuAlt1>
          </div>  
              {/* ------------------------------------------------------------------ */}
              <Collapsible
            expanded={opensCollapse}
            style={{ overflow: 'hidden', transition: '0.3s' }}
          >
            <ul className="mob-gallery-menu">
              {albumData ? (
                <>
                  <li
                    className="list-albumName active-albmList"
                    onClick={(e) => {
                      showAllImagesFn(e);
                    }}
                  >
                    <Link to="/gallery">All</Link>
                  </li>
                  {Object.values(albumData).map((list, id) => (
                    <li
                      className="list-albumName"
                      onClick={(e) => {
                        filterImages(list, e);
                      }}
                    >
                      <Link
                        to={`/gallery/${list.album_name.replaceAll(" ", "-")}`}
                        key={id}
                      >
                        {list.album_name}
                      </Link>
                    </li>
                  ))}
                </>
              ) : (
                <li className="list-albumName active-albmList">
                  <Link to="/gallery">All</Link>
                </li>
              )}
              {/* <>
                <div
                  className="galleryMobMenuDiv p-0"
                  onClick={() => setOpen(!open)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
                >
                  <span className="mob-albumname">{mobAlbumName}</span>
                  <HiMenuAlt1 size="35" className="menuIconDd"></HiMenuAlt1>
                </div>
              </> */}
              {/* <Collapse in={!isopen}>
                <div id="example-collapse-text">
                  {albumData ? (
                    <>
                      <li
                        className="list-albumName active-albmList"
                        onClick={(e) => {
                          showAllImagesFn(e);
                        }}
                      >
                        <Link to="/gallery">All</Link>
                      </li>
                      {Object.values(albumData).map((list, id) => (
                        <li
                          className="list-albumName"
                          onClick={(e) => {
                            filterImages(list, e);
                          }}
                        >
                          <Link
                            to={`/gallery/${list.album_name.replaceAll(
                              " ",
                              "-"
                            )}`}
                            key={id}
                          >
                            {list.album_name}
                          </Link>
                        </li>
                      ))}
                    </>
                  ) : (
                    <li className="list-albumName active-albmList">
                      <Link to="/gallery">All</Link>
                    </li>
                  )}
                </div>
              </Collapse> */}
            </ul>
          

          </Collapsible>
              {/* ------------------------------------------------------------------ */}

          {/* <Collapse in={opensCollapse}>
            <ul className="mob-gallery-menu">
              {albumData ? (
                <>
                  <li
                    className="list-albumName active-albmList"
                    onClick={(e) => {
                      showAllImagesFn(e);
                    }}
                  >
                    <Link to="/gallery">All</Link>
                  </li>
                  {Object.values(albumData).map((list, id) => (
                    <li
                      className="list-albumName"
                      onClick={(e) => {
                        filterImages(list, e);
                      }}
                    >
                      <Link
                        to={`/gallery/${list.album_name.replaceAll(" ", "-")}`}
                        key={id}
                      >
                        {list.album_name}
                      </Link>
                    </li>
                  ))}
                </>
              ) : (
                <li className="list-albumName active-albmList">
                  <Link to="/gallery">All</Link>
                </li>
              )}
              <>
                <div
                  className="galleryMobMenuDiv p-0"
                  onClick={() => setOpen(!open)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
                >
                  <span className="mob-albumname">{mobAlbumName}</span>
                  <HiMenuAlt1 size="35" className="menuIconDd"></HiMenuAlt1>
                </div>
              </>
              <Collapse in={open}>
                <div id="example-collapse-text">
                  {albumData ? (
                    <>
                      <li
                        className="list-albumName active-albmList"
                        onClick={(e) => {
                          showAllImagesFn(e);
                        }}
                      >
                        <Link to="/gallery">All</Link>
                      </li>
                      {Object.values(albumData).map((list, id) => (
                        <li
                          className="list-albumName"
                          onClick={(e) => {
                            filterImages(list, e);
                          }}
                        >
                          <Link
                            to={`/gallery/${list.album_name.replaceAll(
                              " ",
                              "-"
                            )}`}
                            key={id}
                          >
                            {list.album_name}
                          </Link>
                        </li>
                      ))}
                    </>
                  ) : (
                    <li className="list-albumName active-albmList">
                      <Link to="/gallery">All</Link>
                    </li>
                  )}
                </div>
              </Collapse>
            </ul>
          </Collapse> */}
        </div>
      </div>

      <div className="containerr">
        <LightgalleryProvider
          onBeforeOpen={() => console.info("onBeforeOpen")}
          onAfterOpen={() => console.info("onAfterOpen")}
          onSlideItemLoad={() => console.info("onSlideItemLoad")}
          onBeforeSlide={() => console.info("onBeforeSlide")}
          onAfterSlide={() => console.info("onAfterSlide")}
          onBeforePrevSlide={() => console.info("onBeforePrevSlide")}
          onBeforeNextSlide={() => console.info("onBeforeNextSlide")}
          onDragstart={() => console.info("onDragstart")}
          onDragmove={() => console.info("onDragmove")}
          onDragend={() => console.info("onDragend")}
          onSlideClick={() => console.info("onSlideClick")}
          onBeforeClose={() => console.info("onBeforeClose")}
          onCloseAfter={() => console.info("onCloseAfter")}
        >
          <GalleyImages
            GalleryData={GalleryData}
            albumData={albumData}
            listShowImages={listShowImages}
            showAlbumImages={showAlbumImages}
          ></GalleyImages>
        </LightgalleryProvider>
      </div>
    </div>
  );
}
