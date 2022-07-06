import React, { useEffect, useRef, useState, Suspense } from 'react';
import Thumpsup from '../../CommonAssets/Icons/thumbsup.svg'
import Totalstar from '../../CommonAssets/Icons/total-star.svg'
import loadingIcon from "./../../CommonAssets/Icons/review-loader.gif";
import ReactHtmlParser from 'react-html-parser'
import useCollapse from 'react-hook-collapse';
import { Collapsible } from 'react-hook-collapse';
import { motion } from 'framer-motion';
import {
  getSeoDescriptionData, getPropReviewData, getPropReviewLikeData
} from "../../../DataLayer/datalayerUtilities";
import CircleProgressiveBar from '../Review/progressBar/CircleProgressiveBar'
import './index.scss';
import { FaThumbsUp, FaArrowRight } from 'react-icons/fa'
import { TiWarningOutline } from 'react-icons/ti'
import { useRecoilValue } from 'recoil';
import { seoThemeDetails, propertyDataSelector } from "../../../Recoil/themeModule";
import './selectionoption.scss'
import { Link } from 'react-router-dom';
import BannerContainer from '../../InnerPages/BannerComponent/BannerContainer';
import { BsStarFill } from 'react-icons/bs';
import Yelpicon from '../../CommonAssets/Icons/yelp.svg'
import Tripicon from '../../CommonAssets/Icons/trip.svg'
import Expediaicon from '../../CommonAssets/Icons/expe.svg'
import { GoPlus } from 'react-icons/go';
import EmailId from '../../InnerPages/Review/emaiId';
import ReviewSub from '../../InnerPages/Review/reviewsSub';
import ReviewChannel from '../../InnerPages/Review/channelImgs';
import ReviewDate from '../../InnerPages/Review/dateReviews';
// import { Empty } from 'antd';


const ReviewComponent = () => {
  const propertyData = useRecoilValue(propertyDataSelector);
  const { innsights: seoId } = useRecoilValue(seoThemeDetails);
  const [seoData, setPropertySeodata] = useState([]);
  // const { overview: seoId } = useRecoilValue(seoThemeDetails);
  const [reviewData, setReviewData] = useState([]);

  const [PriviousreviewData, setPreviousReviewData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef();
  const [sortState, setsortState] = useState(false);
  const [writeReviewAState, setWriteReviewAState] = useState(false);
  const [NewReviewPageData, setNewReviewPageData] = useState([]);

  const [state, setState] = useState({
    ota_id: "",
    page_no: "1",
    trip_type: "",
    traveled_with: "",
    traveled_date: "",
    ota_rating: ""
  });

  const [countmore, setpage_no] = useState(2);
  const children = []

  // const [isLoading, setIsLoading] = useState(false);
  useCollapse(ref, sortState);




  useEffect(() => {
    fetchReviewPageData(state, "default-data");
    fetchSeoProperties();
    fetchReviewLikeData();
  }, [state])

  function handleSelectChange(event) {
    // event.stopPropagation();
    event.preventDefault();
    setState(() => ({
      ...state,
      ['page_no']: 1,
      [event.target.name]: event.target.value,
    }));
    fetchReviewPageData(state);
  }





  function changepagenumber(countvalue = "2") {
    // alert(countvalue);
    setState(() => ({
      ...state,
      ['page_no']: countvalue,
    }));
    setpage_no(Number(countvalue) + Number(1));
    // console.log(state)
    fetchReviewPageData(state);
  }

  const fetchReviewPageData = async (data, type = "sort-review") => {
    console.log(data.page_no);
    setIsLoading(true);
    console.log(type)
    const response = await getPropReviewData(data)
    console.log(response.review_details.review_data)
    // console.log("ota id == " , response.review_details.review_data.review_id)

    if (data.page_no > 1 && type == "default-data") {
      let newReviewData = { ...reviewData };
      console.log("else if condition", newReviewData, response.review_details.review_data)
      setReviewData(newReviewData)
      setNewReviewPageData(response.review_details.review_data)
      setIsLoading(false)
      if ((response.review_details.review_data).length > '14') {
        document.getElementById("viewmoreButton").style.display = "block";
      } else {
        document.getElementById("viewmoreButton").style.display = "none";
      }

      // if((response.review_details.review_data).length == 0 || isLoading=='true'){
      //     document.getElementById("review_message").style.display = "block";
      //   }else{
      //     document.getElementById("review_message").style.display = "none";
      //   }

    } else
      if (type == "default-data") {
        console.log("else if-2 condition", response.review_details.review_data)
        setReviewData(response.review_details.review_data)
        setNewReviewPageData('')
        setIsLoading(false)
        if ((response.review_details.review_data).length > '14') {

          document.getElementById("viewmoreButton").style.display = "block";
        } else {
          document.getElementById("viewmoreButton").style.display = "none";
        }

        // if((response.review_details.review_data).length == 0 || isLoading=='true'){
        //     document.getElementById("review_message").style.display = "block";
        //   }else{
        //     document.getElementById("review_message").style.display = "none";
        //   }

      }

  }

  // const result = Object.values(reviewData);
  // if((result).length == 0 && isLoading=='true'){
  //   document.getElementById("review_message").style.display = "block";
  // }else{
  //   document.getElementById("review_message").style.display = "none";
  // }

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData(seoId)
    console.log(response);
    setPropertySeodata(response.data)
  }

  const fetchReviewLikeData = async (reviewId, status) => {
    const response = await getPropReviewLikeData(reviewId, status)
  }



  const Google = 'https://beta.yosemitewestgate.com/images/ReportLogospng/shortLogos/RMS-google-icons.svg';
  // const result = Object.values(reviewData).slice(0, 1).map((item, num) => {

  //   return (
  //     <div className='text-danger my-4'> <p className='text-danger'><span><TiWarningOutline size="35" className='ml-2'/></span> Sorry, there is no reviews to display, please retry sorting with a different option.
  //     </p></div>
  //   );
  // })

  return (
    <>
      <div className="container-fluid px-0 text-center  mb-5" id="myElmentID">

        <BannerContainer seoData={seoData} />
        <div className='container not-f reviewStyles'>
          <div className='row mx-0'>
            <div className='col-12 col-md-12 col-lg-8 col-xl-8 px-0'>
              <div className='progress-circle'>
                <div className=''>
                  <div className='total-bg-color text-white'><img src={Totalstar} className="mx-1" /><span>Total Review Ratings</span></div>
                </div>
                <div className=''>

                  <div className='row pgr-title p-4 pt-5'>
                    <div className="col-md-2 col-6">
                      <div className="h-100 pt-3">
                        <span className='mx-3 pgr-title'>Guest</span>
                        <CircleProgressiveBar
                          progressBarColor="green" />
                      </div>
                    </div>
                    <div className="col-md-2 col-6">
                      <div className=" h-100 pt-3">
                        <span className='mx-3 pgr-title'>Service</span>
                        <CircleProgressiveBar
                          progressBarColor="blue" />
                      </div>
                    </div>
                    <div className="col-md-2 col-6">
                      <div className="h-100 pt-3">
                        <span className='mx-3 pgr-title'>Value</span>
                        <CircleProgressiveBar
                          progressBarColor="purple" />
                      </div>
                    </div>

                    <div className="col-md-2 col-6">
                      <div className="h-100 pt-3">
                        <span className='mx-3 pgr-title'>Cleanline</span>
                        <CircleProgressiveBar
                          progressBarColor="yellow" />
                      </div>
                    </div>
                    <div className="col-md-2 col-6">
                      <div className="h-100 pt-3">
                        <span className='mx-3 pgr-title'>Location</span>
                        <CircleProgressiveBar
                          progressBarColor="red" />
                      </div>
                    </div>

                    <div className="col-md-2 col-6">
                      <div className=" text-center h-100 pt-3">
                        <span className='mx-3 pgr-title'>Comfort</span>
                        <CircleProgressiveBar
                          progressBarColor="dark-blue" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div className='col-12 col-md-8 col-lg-4 col-xl-4 px-0 px-md-2 mx-auto'>
              <div className='progress-circle mt-3 mt-md-23 mt-lg-0 mt-xl-0'>
                <div className='py-4 pt-3'>
                  <h2 className='mb-0'>100%</h2>
                  <div className='reviw-title-name'>
                    Guest Recommended

                  </div>
                </div>
                <div className='bg-geniune-content'>
                  <img src={Thumpsup} /> <span className='reviw-title-geniune-name my-4'>Geniune Guest Reviews</span>
                </div>
              </div>
            </div>
          </div>
          <div className='row mt-4 '>
            <div className='col-12 col-md-7 pt-3 pb-3'>
              <span className='reviw-authentic-title'>{reviewData.length} Authentic Reviews from our Guests</span>
            </div>
            <div className='col-12 col-md-5 px-0'>
              {/* <button type="button" className="m-3 read-wrt-btn-review c-pointer" title="Sort Reviews">Sort Reviews</button>
  <button type="button" className="m-3 read-wrt-btn-review c-pointer" title="Write a Review">Write a Review</button> */}
              <section className='d-inline'>



                <button type="button" className="m-3 global-btn-ywl" title="Sort Reviews"
                  onClick={() => {
                    setsortState(!sortState);
                  }}
                >
                  Sort Reviews
                </button>

                <button type="button" className="m-3 default-btn" title="Write a Review"
                  onClick={() => {
                    setWriteReviewAState(!writeReviewAState);
                  }}
                >
                  Write a Review
                </button>
              </section>
            </div>
          </div>
          <div>
            <Collapsible
              expanded={writeReviewAState}
              style={{ overflow: 'hidden', transition: '0.3s' }}
            >

              <EmailId />

            </Collapsible>
          </div>

          <form>
            <div className='container px-0 mt-3 selectionReviews' ref={ref} style={{ overflow: 'hidden', transition: '0.3s' }}>
              <div className='mb-2 '>
                <div className='row py-4 progress-circle px-3'>
                  <div className=''>
                    <div className='select-title'>By Channel Type</div>
                    <div className="selectt">
                      <select onChange={handleSelectChange} name="ota_id" className="" aria-label="Default select example">
                        <option value="">Choose Option</option>
                        <option value="0">INNsight</option>
                        <option value="1">Google</option>
                        <option value="2">Yelp</option>
                        <option value="3">Tripadvisor</option>
                        <option value="5">Booking.com</option>
                        <option value="6">Expedia</option>
                        <option value="7">Hotels.com</option>
                        <option value="8">Travelocity</option>
                        <option value="9">Orbitz</option>
                        <option value="10">CheapTickets</option>
                        <option value="11">Wotif</option>
                        <option value="12">eBookers</option>

                      </select>
                    </div>

                  </div>
                  <div className=''>
                    <div className='select-title'>By Trip Type</div>
                    <div className="selectt">
                      <select onChange={handleSelectChange} name="trip_type" className="" aria-label="Default select example">
                        <option value="">Choose Option</option>
                        <option value="Business">Business</option>
                        <option value="Leisure">Leisure</option>
                        <option value="Romantic">Romantic</option>
                        <option value="Family">Family</option>
                        <option value="Wedding">Wedding </option>
                        <option value="Luxury">Luxury</option>
                      </select>
                    </div>
                  </div>


                  <div className=''>
                    <div className='select-title'>By Travel With</div>
                    <div className="selectt">
                      <select onChange={handleSelectChange} name="traveled_with" className="" aria-label="Default select example">
                        <option value="">Choose Option</option>
                        <option value="Couples">Couples</option>
                        <option value="Solo Travelers">Solo Travel</option>
                        <option value="Young Children">Young Children</option>
                        <option value="Families">Families</option>
                        <option value="Get together">Get together</option>
                        <option value="Groups of Friends">Groups of Friends</option>
                        <option value="Family with Teenagers">Family with Teenagers</option>
                      </select>
                    </div>
                  </div>

                  <div className=''>
                    <div className='select-title'>By Date</div>
                    <div className="selectt">
                      <select onChange={handleSelectChange} name="traveled_date" className="" aria-label="Default select example">
                        <option value="">Choose Option</option>
                        {/* <option value="DateFilter">One Week</option> */}
                        <option value="30">One Month</option>
                        <option value="60">Two Months</option>
                        <option value="90">Three Months</option>
                        <option value="180">Six Months</option>
                        <option value="270">Nine Months</option>
                        <option value="365">One Year</option>
                        <option value="500">Oldest</option>
                      </select>
                    </div>
                  </div>


                  <div className=''>
                    <div className='select-title'>By Ratings Type</div>
                    <div className="selectt ">
                      <select onChange={handleSelectChange} name="ota_rating" className="" aria-label="Default select example">
                        <option value="">Choose Option</option>
                        <option value="1">One Star</option>
                        <option value="2">Two Star</option>
                        <option value="3">Three Star</option>
                        <option value="4">Four Star</option>
                        <option value="5">Five Star</option>
                      </select>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </form>
          {reviewData.length == 0 && !isLoading && <><div className='text-danger my-4'> <p id='review_message' className='text-danger'><span><TiWarningOutline size="35" className='ml-2' /></span> Sorry, there is no reviews to display, please retry sorting with a different option.
          </p></div></>}
          <>
            {Object.values(reviewData).map((item, num) => {
              // console.log(item)
              return (
                // item == "" && item == undefined
                //   ? <p> navv        </p> :
                <div className={"itemcheck itemcheck" + item.ota_id}>


                  <div className={num % 2 == 0 ? "even review-rectangle-bdr  mb-4 pt-4" : "odd review-rectangle-bdr  mb-4 pt-3"}>
                    <div className='my-2 d-flex text-center justify-content-center'>
                      <ReviewSub reviewData={item.avg_ratings} />
                    </div>
                    <div>
                      <div className='px-2'>
                        <div className='reviw-title-name mt-3'>{ReactHtmlParser(item['ReviewTitle'])}</div>

                        <div className='r-date my-2'>

                          <ReviewDate ReviewsDate={item.created_on} />
                        </div>
                        <p className='r-content px-5'>{item.comments &&
                          ReactHtmlParser(item.comments.substr(0, 350))}....</p>
                        <div className='reviw-name'>{item.fullname}</div>
                        <div className='reviw-name review-country mt-2'>{item.country}</div>
                        <div>

                          {item.ReviewTitle !== "" ? <Link to={`reviews/${(item.ReviewTitle)}/${item.review_id}`}><button type="button" className="button_bg-review my-3" title="Read More">Read More</button></Link>
                            : <Link to={`reviews`}><button type="button" className="button_bg-review my-3 c-pointer" title="Read More">Read More</button></Link>} </div>
                      </div>
                      <div className=' mt-4 '>
                        <p className="plate-bg-color py-2 text-white px-0 cursor-pointer ">
                          {item.i_like_count} of {(Number(item.i_like_count) + Number(item.total_dislike_count))} people found this review helpful. Did you? - <button className='bg-none' onClick={() => fetchReviewLikeData(item.review_id, 1)}>YES </button> | <button className='bg-none' onClick={() => fetchReviewLikeData(item.review_id, 0)}>NO </button>
                        </p>  </div>
                    </div>
                    <div className="position-abs">
                      <ReviewChannel Channel={item.ota_id} />
                    </div>
                  </div>
                </div>

              );
            })}
          </>

          <>
            {Object.values(NewReviewPageData).map((item, num) => {
              // console.log(item)
              return (
                // item == "" && item == undefined
                //   ? <p> navv        </p> :
                <div className={"itemcheck itemcheck" + item.ota_id}>


                  <div className={num % 2 == 0 ? "even review-rectangle-bdr  mb-4 pt-4" : "odd review-rectangle-bdr  mb-4 pt-3"}>
                    <div className='my-2 d-flex text-center justify-content-center'>
                      <ReviewSub reviewData={item.avg_ratings} />
                    </div>
                    <div>
                      <div className='px-2'>
                        <div className='reviw-title-name mt-3'>{ReactHtmlParser(item['ReviewTitle'])}</div>

                        <div className='r-date my-2'>

                          <ReviewDate ReviewsDate={item.created_on} />
                        </div>
                        <p className='r-content px-5'>{item.comments &&
                          ReactHtmlParser(item.comments.substr(0, 350))}....</p>
                        <div className='reviw-name'>{item.fullname}</div>
                        <div className='reviw-name review-country mt-2'>{item.country}</div>
                        <div>

                          {item.ReviewTitle !== "" ? <Link to={`reviews/${(item.ReviewTitle)}/${item.review_id}`}><button type="button" className="button_bg-review my-3" title="Read More">Read More</button></Link>
                            : <Link to={`reviews`}><button type="button" className="button_bg-review my-3 c-pointer" title="Read More">Read More</button></Link>} </div>
                      </div>
                      <div className=' mt-4 '>
                        <p className="plate-bg-color py-2 text-white px-0 cursor-pointer ">
                          {item.i_like_count} of {(Number(item.i_like_count) + Number(item.total_dislike_count))} people found this review helpful. Did you? - <button className='bg-none' onClick={() => fetchReviewLikeData(item.review_id, 1)}>YES </button> | <button className='bg-none' onClick={() => fetchReviewLikeData(item.review_id, 0)}>NO </button>
                        </p>  </div>
                    </div>
                    <div className="position-abs">
                      <ReviewChannel Channel={item.ota_id} />
                    </div>
                  </div>
                </div>
              );
            })}
          </>
          <div className='d-flex flex-column col-10 col-md-5 mx-auto px-0'>
            {isLoading ? <span><img src={loadingIcon} className="w-25" /></span> : fetchReviewPageData}
            <a
              id="viewmoreButton"
              type="button"
              name="page_no"
              className="default-btn1 mx-3 mx-md-5 text-uppercase my-3 px-1 cursor-pointer c-pointer" title="Show More Guest
          Reviews"
              // value={countmore}
              onClick={() => changepagenumber(`${countmore}`)}  >
              Show More Guest
              Reviews  <GoPlus className='font-weight-bold' />
            </a>
          </div>
          <div className='my-3'>
            <div className='read-write-section p-3'>
              <div className='row'>
                <div className='col-12 col-md-4 col-lg-4 my-2 mt-small'>
                  <img src={Tripicon} />
                  <div className='my-1'>
                    <button type="button" className="btn m-3 read-wrt-btn" title="Read" ><a href={propertyData.tripadvisor} target="_blank">Read</a></button>
                    <button type="button" className="btn  m-3 read-wrt-btn " title="Write"><a href={propertyData.tripadvisor_write_review_link} target="_blank">Write</a></button>
                  </div>
                </div>
                <div className='col-12 col-md-4 col-lg-4 my-2 mt-small'>
                  <img src={Google} width="100px" />
                  <div className='my-1'>
                    <button type="button" className="btn m-3 read-wrt-btn" title="Read"><a href={propertyData.google_url} target="_blank">Read</a></button>
                    <button type="button" className="btn  m-3 read-wrt-btn " title="Write"><a href={propertyData.google_url} target="_blank">Write</a></button>
                  </div>
                </div>
                <div className='col-12 col-md-4 col-lg-4 my-2 mt-small'>
                  <img src={Yelpicon} />
                  <div className='my-1'>
                    <button type="button" className="btn m-3 read-wrt-btn" title="Read"><a href={propertyData.yelp} target="_blank">Read</a></button>
                    <button type="button" className="btn  m-3 read-wrt-btn " title="Write"><a href={propertyData.yelp_id} target="_blank">Write</a></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div></>
  )
}

export default ReviewComponent;