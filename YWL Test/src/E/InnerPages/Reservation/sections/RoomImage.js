import React from "react";
import { SRLWrapper } from "simple-react-lightbox";
import { BsCamera } from "react-icons/bs";
import "./RoomData.scss";
const RoomImage = ({ images }) => {
  // console.log("this is data", images);

  return (
    <>
      <SRLWrapper>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 PR mt-3 roomBoxHeight containerr p-0">
          {Object.values(images).map((image, key) => (
            <div className="imgGridView" key={key} >
              <img
                key={image.image_id}
                // srl_gallery_image="true"
                className="w-100 pl-3 pr-0 pd-xs-15" 
                src={
                  // image.image_url
                  "https://beta.yosemitewestgate.com/gallery-images/properties/medium/" +
                  image.image_name
                }
                title={image.image_caption}
              />

              <BsCamera size="25" className="cameraIcon" />
            </div>
          ))}
        </div>
      </SRLWrapper>

      {/* <SRLWrapper>
    {images && (
        <div
          key={images[0].image_id}
          className="col-lg-12 col-md-12 col-sm-12 col-xs-12 PR mt-3 roomBoxHeight"
        >
          <img
            key={images[0].image_id}
            className="w-100"
            src={
              images[0].image_url.includes("default-vector-bedroom-image.jpg")
                ? "https://www.innstaging.com/assets/images/bin/default-no-room-image.png"
                : images[0].image_url.replace("/thumbs/", "/")
            }
            // alt={images[0].image_caption}
          />
          <BsCamera size="25" className="cameraIcon" />
        </div>
      )}
    </SRLWrapper> */}
    </>
  );
};

export default RoomImage;
