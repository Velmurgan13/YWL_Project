import React, { useEffect, useState } from 'react';
import {
    getSeoDescriptionData, getPropReviewDetailsData
} from "../../../DataLayer/datalayerUtilities";
import './index.scss';
import { useHistory } from "react-router-dom";
// import { BsPersonCheck } from 'react-icons/bs';
// import { AiFillStar } from 'react-icons/ai';
import BannerContainer from '../BannerComponent/BannerContainer';
import { seoThemeDetails, propertyDataSelector } from "../../../Recoil/themeModule";
import { TiTick } from 'react-icons/ti';
// import { FaArrowRight } from 'react-icons/fa';
import { BsStarFill } from 'react-icons/bs';
import { useRecoilValue } from 'recoil';
import EmailId from '../../InnerPages/Review/emaiId';
import UserIcon from './../../CommonAssets/Icons/user.svg'

const ReviewDetailsPage = (props) => {

    const propertyData = useRecoilValue(propertyDataSelector);
    const { innsights: seoId } = useRecoilValue(seoThemeDetails);
    const [showInputField, setInputField] = useState(false);
    const [seoData, setPropertySeodata] = useState([])
    const [count, setCount] = useState(0)
    const [reviewDetailsData, setReviewDetailsData] = useState([]);
    const [reviewDetailsDataStar, setReviewDetailsDataStar] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        fetchSeoProperties()
        fetchReviewDetailsPageData()
    }, [])

    const fetchSeoProperties = async () => {
        const response = await getSeoDescriptionData(seoId)
        setPropertySeodata(response.data)

    }

    const fetchReviewDetailsPageData = async () => {

        const response = await getPropReviewDetailsData(props.match.params)

        setReviewDetailsData(response.review_details.review_data)
        console.log("red-", response.review_details.review_data[0].ota_id);
        setReviewDetailsDataStar(response.review_details.review_data.ratings)
    }


    const history = useHistory();
    // let Tags = Object.values(reviewDetailsData).map((item) =>{ return item.tags.split(',')});
    // console.log(Tags[0][0]);

    return (
        <div className="container-fluid px-0 text-center reviewStyles">
            <BannerContainer seoData={seoData} />

            {Object.values(reviewDetailsData).map((item, num) => {
                return (
                    <div className={"itemcheck itemcheck" + item.ota_id}>
                        <div className="container ">

                            <div className="review-rectangle-bdr p-3 my-3" >
                                <div class="d-flex bd-highlight mb-2">
                                    <div class="p-2 bd-highlight"><img src={UserIcon} /></div>
                                    <div class="p-2 fs-18 fs-bold name-writer">
                                        {item.fullname}</div>
                                    <div class="ml-auto p-2 bd-highlight text-warning">
                                        {(() => {
                                            switch (item.ratings["0"].points) {
                                                case '0':
                                                    return <> </>;
                                                case '1':
                                                    return <><BsStarFill size={20} /><span className="text-warning"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span></>;
                                                case '2':
                                                    return <> <BsStarFill size={20} /> <BsStarFill size={20} /><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span></>;
                                                case '3':
                                                    return <><BsStarFill size={20} /> <BsStarFill size={20} /><BsStarFill size={20} /> <span className="star-grey"><BsStarFill size={20} /> </span> <span className="star-grey"><BsStarFill size={20} /> </span></>;
                                                case '4':
                                                    return <><BsStarFill size={20} /> <BsStarFill size={20} /><BsStarFill size={20} /><BsStarFill size={20} /> <span className="star-grey"><BsStarFill size={20} /> </span></>;
                                                case '5':
                                                    return <><BsStarFill size={20} /> <BsStarFill size={20} /><BsStarFill size={20} /><BsStarFill size={20} /><BsStarFill size={20} /></>;

                                                default:
                                                    return null;
                                            }
                                        })()} </div>
                                </div>
                                <div className="text-secondary text-justify fs-16 px-4 text-wrap">
                                    <p className='fs-16 wrd-brk'>{item.comments}</p>
                                </div>
                            </div>
                            <div className="row">

                                {item.tags.replace(/[`~!@#$%^&*()_|+\-=?;:'s0-9",.<>\{\}\[\]\\\/]/gi, "") !== "" &&
                                    <>
                                        <div className="col-12 py-0 col-lg-8 col-md-12">
                                            <div className="fs-18 fs-bold py-4 tags mx-auto">Tags</div>

                                            <div className="row mx-0">
                                                <div className="col-6 col-lg-4 col-md-4 text-left">
                                                    <TiTick className="mx-1 " size="25" />
                                                    <span className="fs-16">{item.tags.replace(/[`~!@#$%^&*()_|+\-=?;:'s0-9",.<>\{\}\[\]\\\/]/gi, "")}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                                <div className="col-12 py-4 col-lg-4 col-md-12 text-center mx-auto paddIpd ">
                                    <div className="fs-18 fs-bold stay-details ">Stay Details</div>
                                    <div className="row mx-0 py-3 mx-auto">
                                        <div className="col-6 fs-16 lh-38">
                                            <p className='mb-0'>Date Of Stay:</p>
                                            {item.trip_type && <p>Trip Type:</p>}
                                            {item.traveled_with && <p className='mb-0'>Travelled With:</p>}
                                            {item.age_group && <p className='mb-0'>Age of Group:</p>}
                                        </div>
                                        <div className="col-6 fs-16 ls-2 lh-38">
                                            <div className="fs-16">{new Date(item.created_on).toLocaleDateString(undefined, {
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric"
                                            })
                                            }</div>
                                            <div className='fs-16'>{item.trip_type}</div>
                                            <div className='fs-16'>{item.traveled_with}</div>
                                            <div className='fs-16'>{item.age_group}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="review-rectangle-bdr pt-4 pb-4 my-0">
                                <div className="row mx-0 my-1">
                                    <div className="text-left fs-18 fs-bold review-rating col-12 pb-3">Total Reviews Ratings</div>
                                    <div className="col-md-4 col-6">
                                        {(item.ratings["1"].points) !== "" &&
                                            <div className="fs-16 py-2 dfs">Guest Room:
                                                <div className="pl-2">
                                                    <div class="ml-auto p-2 bd-highlight ">{(() => {
                                                        switch (Math.round(item.ratings["1"].points)) {
                                                            case '0':
                                                                return <> </>
                                                            case 1:
                                                                return <><BsStarFill size={20} /><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span></>
                                                            case 2:
                                                                return <> <BsStarFill size={20} /> <BsStarFill size={20} /><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span></>
                                                            case 3:
                                                                return <><BsStarFill size={20} /> <BsStarFill size={20} /><BsStarFill size={20} /> <span className="star-grey"><BsStarFill size={20} /> </span> <span className="star-grey"><BsStarFill size={20} /> </span></>
                                                            case 4:
                                                                return <><BsStarFill size={20} /> <BsStarFill size={20} /><BsStarFill size={20} /><BsStarFill size={20} /> <span className="star-grey"><BsStarFill size={20} /> </span></>;
                                                            case 5:
                                                                return <><BsStarFill size={20} /> <BsStarFill size={20} /><BsStarFill size={20} /><BsStarFill size={20} /><BsStarFill size={20} /></>;

                                                            default:
                                                                return null
                                                        }
                                                    })

                                                        ()}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className="col-md-4 col-6">
                                        <div className="fs-16 py-2 dfs">Service:
                                            <div className="pl-2">
                                                <div class="ml-auto p-2 bd-highlight">{(() => {
                                                    switch (Math.round(item.ratings["2"].points)) {
                                                        case '0':
                                                            return <> </>
                                                        case 1:
                                                            return <><BsStarFill size={20} /><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span></>
                                                        case 2:
                                                            return <> <BsStarFill size={20} /> <BsStarFill size={20} /><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span></>
                                                        case 3:
                                                            return <><BsStarFill size={20} /> <BsStarFill size={20} /><BsStarFill size={20} /> <span className="star-grey"><BsStarFill size={20} /> </span> <span className="star-grey"><BsStarFill size={20} /> </span></>
                                                        case 4:
                                                            return <><BsStarFill size={20} /> <BsStarFill size={20} /><BsStarFill size={20} /><BsStarFill size={20} /> <span className="star-grey"><BsStarFill size={20} /> </span></>;
                                                        case 5:
                                                            return <><BsStarFill size={20} /> <BsStarFill size={20} /><BsStarFill size={20} /><BsStarFill size={20} /><BsStarFill size={20} /></>;

                                                        default:
                                                            return null
                                                    }
                                                })()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-6">
                                        <div className="fs-16 py-2 dfs">Value:
                                            <div className="pl-2">
                                                <div class="ml-auto p-2 bd-highlight">{(() => {
                                                    switch (Math.round(item.ratings["3"].points)) {
                                                        case 0:
                                                            return <> </>
                                                        case 1:
                                                            return <><BsStarFill size={20} /><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span></>
                                                        case 2:
                                                            return <> <BsStarFill size={20} /> <BsStarFill size={20} /><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span></>
                                                        case 3:
                                                            return <><BsStarFill size={20} /> <BsStarFill size={20} /><BsStarFill size={20} /> <span className="star-grey"><BsStarFill size={20} /> </span> <span className="star-grey"><BsStarFill size={20} /> </span></>
                                                        case 4:
                                                            return <><BsStarFill size={20} /> <BsStarFill size={20} /><BsStarFill size={20} /><BsStarFill size={20} /> <span className="star-grey"><BsStarFill size={20} /> </span></>;
                                                        case 5:
                                                            return <><BsStarFill size={20} /> <BsStarFill size={20} /><BsStarFill size={20} /><BsStarFill size={20} /><BsStarFill size={20} /></>;

                                                        default:
                                                            return null
                                                    }
                                                })()}
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-md-4 col-6">
                                        {/* { console.log(Math.round(item.ratings["4"].points))} 
                                {console.log(Math.round(item.ratings["4"].points))} */}

                                        <div className="fs-16 py-2 dfs">Cleanliness:
                                            <div className="pl-2">
                                                <div class="ml-auto p-2 bd-highlight">{(() => {
                                                    switch (Math.round(item.ratings["5"].points)) {
                                                        case 0:
                                                            return <> </>
                                                        case 1:
                                                            return <><BsStarFill size={20} /><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span></>
                                                        case 2:
                                                            return <> <BsStarFill size={20} /> <BsStarFill size={20} /><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span></>
                                                        case 3:
                                                            return <><BsStarFill size={20} /> <BsStarFill size={20} /><BsStarFill size={20} /> <span className="star-grey"><BsStarFill size={20} /> </span> <span className="star-grey"><BsStarFill size={20} /> </span></>
                                                        case 4:
                                                            return <><BsStarFill size={20} /> <BsStarFill size={20} /><BsStarFill size={20} /><BsStarFill size={20} /> <span className="star-grey"><BsStarFill size={20} /> </span></>;
                                                        case 5:
                                                            return <><BsStarFill size={20} /> <BsStarFill size={20} /><BsStarFill size={20} /><BsStarFill size={20} /><BsStarFill size={20} /></>;

                                                        default:
                                                            return null
                                                    }
                                                })()}
                                                </div>
                                            </div>
                                        </div>

                                        {/* }    */}
                                    </div>
                                    <div className="col-md-4 col-6">
                                        {(item.ratings["5"].points) &&
                                            <>
                                                <div className="fs-16 py-2 dfs">Location:
                                                    <div className="pl-2">

                                                        <div class="ml-auto p-2 bd-highlight">{(() => {
                                                            switch (Math.round(item.ratings["6"].points)) {
                                                                case '0':
                                                                    return <> </>
                                                                case 1:
                                                                    return <><BsStarFill size={20} /><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span></>
                                                                case 2:
                                                                    return <> <BsStarFill size={20} /> <BsStarFill size={20} /><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span></>
                                                                case 3:
                                                                    return <><BsStarFill size={20} /> <BsStarFill size={20} /><BsStarFill size={20} /> <span className="star-grey"><BsStarFill size={20} /> </span> <span className="star-grey"><BsStarFill size={20} /> </span></>
                                                                case 4:
                                                                    return <><BsStarFill size={20} /> <BsStarFill size={20} /><BsStarFill size={20} /><BsStarFill size={20} /> <span className="star-grey"><BsStarFill size={20} /> </span></>;
                                                                case 5:
                                                                    return <><BsStarFill size={20} /> <BsStarFill size={20} /><BsStarFill size={20} /><BsStarFill size={20} /><BsStarFill size={20} /></>;

                                                                default:
                                                                    return null
                                                            }
                                                        })()}
                                                        </div>

                                                    </div>
                                                </div></>

                                        }
                                    </div>
                                    <div className="col-md-4 col-6">
                                        <div className="fs-16 py-2 dfs">Comfort:
                                            <div className="pl-2">
                                                <div class="ml-auto p-2 bd-highlight">{(() => {
                                                    switch (Math.round(item.ratings["6"].points)) {
                                                        case 0:
                                                            return <> </>
                                                        case 1:
                                                            return <><BsStarFill size={20} /><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span></>
                                                        case 2:
                                                            return <> <BsStarFill size={20} /> <BsStarFill size={20} /><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span><span className="star-grey"><BsStarFill size={20} /> </span></>
                                                        case 3:
                                                            return <><BsStarFill size={20} /> <BsStarFill size={20} /><BsStarFill size={20} /> <span className="star-grey"><BsStarFill size={20} /> </span> <span className="star-grey"><BsStarFill size={20} /> </span></>
                                                        case 4:
                                                            return <><BsStarFill size={20} /> <BsStarFill size={20} /><BsStarFill size={20} /><BsStarFill size={20} /> <span className="star-grey"><BsStarFill size={20} /> </span></>;
                                                        case 5:
                                                            return <><BsStarFill size={20} /> <BsStarFill size={20} /><BsStarFill size={20} /><BsStarFill size={20} /><BsStarFill size={20} /></>;

                                                        default:
                                                            return null
                                                    }
                                                })()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="fs-20 py-3 mt-md-5 mb-3 my-3">
                                {count} of 3 people found this review helpful. Did you? - <button title="Yes" className='bg-none' onClick={() => setCount(1)}>Yes </button> | <button title="No" className='bg-none' onClick={() => setCount(0)}>No </button>

                                {showInputField &&
                                    <div className="p-0">
                                        {/* <div className="bg-light text-left p-3 my-3">
                                    <h5>WRITE A REVIEW</h5>
                                </div> */}
                                        <div className="border rounded px-5">
                                            <EmailId />
                                        </div>
                                    </div>}
                                <div class="d-flex flex-row bd-highlight justify-content-center my-5">
                                    <button type="button" class="btn br-0 btn-white text-dark mx-3 mx-md-5 py-2 px-5 border border-secondary" onClick={() => history.goBack()}>BACK</button>
                                    <button type="button" class="py-1 px-4 default-btn " onClick={() => setInputField(!showInputField)} >  {showInputField ? 'WRITE A REVIEW' : 'WRITE A REVIEW'}</button>
                                </div>
                            </div>
                        </div>
                    </div>)
            })}
        </div>

    )
}

export default ReviewDetailsPage;


