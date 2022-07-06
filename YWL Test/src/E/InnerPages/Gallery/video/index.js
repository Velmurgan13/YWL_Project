import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//common images
import "../../Gallery/video/index.scss";
import BannerContainer from "../../../InnerPages/BannerComponent/BannerContainer";
import { useRecoilValue } from "recoil";
import {
  propertyDataSelector,
  seoThemeDetails,
} from "../../../../Recoil/themeModule";
import {
  getSeoDescriptionData,
  getPropVideoData,
} from "../../../../DataLayer/datalayerUtilities";
import { width } from "dom-helpers";

export default function VideoComponent() {
  const { video: seoId } = useRecoilValue(seoThemeDetails);
  const [seoData, setPropertySeodata] = useState([]);
  const [VideoData, setVideoData] = useState([]);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  useEffect(() => {
    fetchSeoProperties();
    fetchPropertyVideo();
  }, []);

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData(seoId);
    setPropertySeodata(response.data);
  };

  const fetchPropertyVideo = async () => {
    const response = await getPropVideoData();
    // console.log(Response);

    setVideoData(response.data.videos);

    console.log(response.data.videos);
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    swipeToSlide: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="p-0 mb-5">
      <BannerContainer seoData={seoData} />

      <div className="videoScss container ">
        <div className="col-md-12">
          <div className="row">
            <div className="col-12 my-auto pt-2 mx-4">
              <div className="pr-5 pt-2 pb-0 first-slide">
                <Slider asNavFor={nav1} ref={(slider2) => setNav2(slider2)}>
                  {Object.values(VideoData).map((item) => {
                    return (
                      <div className="col-12">
                        <div className="video-card video-height">
                          <div className="video-card-left">
                            <iframe
                              frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              title="video"
                              allowFullScreen
                              src={item.video_url}
                              // width="933"
                              // height="430"
                              className="HeightWid"
                            ></iframe>

                            {/* <video className="video-height"  loop controls autoPlay>
                              <source src={item.video_url} type="video/mp4" />
                            </video> */}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
            <div className="more-video pl-2 mb-3 mt-1">
            View More Videos
            </div> 
            <div className="col-12 video-card PR second">
              <Slider
                {...settings}
                asNavFor={nav2}
                ref={(slider1) => setNav1(slider1)}
              >
                {/* {Object.values(VideoData).map((item) => {
                  return (
                    <div className="col-12">
                      <div className="video-card">
                        <div className="col-6 video-card-left">
                        
                        <div class="grid11 aos-init aos-animate" data-aos="zoom-in" data-aos-duration="1400">
					<figure class="effect-julia">
						 <img
                              src={
                                "https://my.innstaging.com/" +
                                "user_images/properties/videos/thumbs/2/6/5/" +
                                item.video_thumb
                              }
                              alt=""
                              className="W100"
                            />
						<figcaption>
							<h2><span>appetizers</span></h2>
							<div class="text-center">
								<p class="menu_a"> view more</p>
							
								
							</div>
							
						</figcaption>			
					</figure>
        </div>
                        </div>
                        
                      </div>
                    </div>
                  );
                })} */}
                {Object.values(VideoData).map((item) => {
                  return (
                    <div class="grid11 aos-init aos-animate">
                      <figure class="effect-julia">
                        <img
                          src={
                            "https://my.innstaging.com/" +
                            "user_images/properties/videos/thumbs/2/6/5/" +
                            item.video_thumb
                          }
                          alt={item.video_caption}
                          title={item.video_caption}
                        />
                        <figcaption>
                          <h2>
                            <span>{item.video_caption}</span>
                          </h2>
                          <h3>
                            <span>{}</span>
                          </h3>
                          <div class="text-center">
                            <p class="menu_a">Play Now</p>
                          </div>
                        </figcaption>
                      </figure>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
