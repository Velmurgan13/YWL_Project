import React, { useEffect, useState } from "react";
import BannerContainer from "../../InnerPages/BannerComponent/BannerContainer";
import "../../InnerPages/TopReasonToStay/index.css";
import {
  getSeoDescriptionData,
  getPropTopStayData,
} from "../../../DataLayer/datalayerUtilities";
import { useRecoilValue } from "recoil";
import { seoThemeDetails } from "../../../Recoil/themeModule";
import ReactHtmlParser from "react-html-parser";
import Modal from "./modal";
import Backdrop from "./backdrop";

import GrFormClose from "react-icons/io";
const TopReasonToStay = () => {
  const { topstay: seoId } = useRecoilValue(seoThemeDetails);
  const [seoData, setPropertySeodata] = useState([]);
  const [stayData, setPropertyStaydata] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function deleteHandler() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    fetchPropertyStay();
    fetchSeoProperties();
  }, []);

  const fetchSeoProperties = async (props) => {
    const response = await getSeoDescriptionData(seoId);
    setPropertySeodata(response.data);
  };

  const fetchPropertyStay = async () => {
    const response = await getPropTopStayData();
    // console.log(response);
    setPropertyStaydata(response.data.topStayPageData);

    // console.log(response);
  };

  return (
    <>
      <BannerContainer seoData={seoData} />

      <div className="container MB30">
        <div className="row mx-0">
          {Object.values(stayData).map((item) => {
            //   const A = {ReactHtmlParser(item.shortdesc)}

            return (
              <div className="row rows shadow bg-light mx-0">
                <div className="col-12 col-md-5">
                  <img
                    src={"https://beta.yosemitewestgate.com/" + item.img_name}
                    alt=""
                    className="W100"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://beta.laquintasantacruz.com/gallery-images/default-vector-bedroom-image.jpg";
                    }}
                  />
                </div>

                <div className="col-12 col-md-7 MT30 MB30">
                  <h2>{item.title}</h2>
                  <p className="px-3"> {ReactHtmlParser(item.shortdesc)}</p>
                  <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 P0 text-center MT30-Mob mt-3">
                    <button
                      class="home-readmore-btn welcome-btn btn-style mt-3 text-uppercase"
                      title="Read More"
                      onClick={deleteHandler}
                    >
                      Read More{" "}
                    </button>
                  </div>
                  <div>
                    {modalIsOpen && (
                      <Modal
                        title={item.title}
                        name={ReactHtmlParser(item.shortdesc)}
                        onCancel={closeModalHandler}
                        onConfirm={closeModalHandler}
                      />
                    )}{" "}
                    {modalIsOpen && <Backdrop onCancel={closeModalHandler} />}{" "}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TopReasonToStay;
