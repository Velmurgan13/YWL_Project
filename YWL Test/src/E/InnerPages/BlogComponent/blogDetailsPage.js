import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import './index.scss'
import { Link } from 'react-router-dom';
import moment from 'moment';
import { seoThemeDetails, propertyDataSelector } from "../../../Recoil/themeModule";
import ReactHtmlParser from "react-html-parser";
import { AiOutlineSearch } from 'react-icons/ai';
import {
  getSeoDescriptionData,
  getPropBlogDetails,
} from "../../../DataLayer/datalayerUtilities";
import BannerContainer from "../../InnerPages/BannerComponent/BannerContainer";

const BlogDetailsPage = (props) => {
  console.log("pppppppp" , props)
  const propertyData = useRecoilValue(propertyDataSelector);
  console.log(propertyData);
  const { blog: seoId } = useRecoilValue(seoThemeDetails);
  const [seoData, setPropertySeodata] = useState([]);
   const [blogDetails, setPropertyBlogdetails] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [categoryData, setCategoryData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [archieveData, setArchieveData] = useState([]);

  useEffect(() => {
    fetchSeoProperties();
     fetchPropertyBlogDetails();
  }, []);

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData(seoId);
    setPropertySeodata(response.data);
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
      const filteredData = blogDetails.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
    }
    else {
      setFilteredResults(blogDetails)
      console.log(blogDetails);
    }
  }

  const fetchPropertyBlogDetails = async () => {
    const response = await getPropBlogDetails(props.match.params);
    console.log("check blog-detaisl", response.data);
    setPropertyBlogdetails(response.data.blogData);
  };

   return (
    <div>
      <BannerContainer seoData={seoData} />
      <div className="blogParent mb-5">
      <div className="container-fluid blog-container main-bg-white  ">
        <div className="row mx-xl-4 mx-lg-4">
          <div className="col-9">
          {/* <>
            {  blogDetails.map((item) => {
                    return (
                      <>
                       <div className="blog-title">
                          {ReactHtmlParser(item.blog_title)}
                        </div>
                        <div className="blog_date">
                          {ReactHtmlParser(moment(item.blogDate).format('MMMM D,YYYY'))}

                        </div>
                        <div>
                          {ReactHtmlParser(item.blog_desc)}
                          <div className="pt-0 text-center mb-1">
                            <Link to='/blog'>
                              <button
                                type="button"
                                title="BACK"
                                className="home-readmore-btn ls-1 welcome-btn btn-style mt-2 mb-3"
                              >
                                BACK
                              </button></Link>
                          </div>
                        </div>
               
                      </>
                    )
                  })}
          </> */}

          <>
               
               {searchInput.length > 1 ? (
                 filteredResults.map((item) => {
                   return (
                     <>
                       <div className="blog-title">
                         {ReactHtmlParser(item.blog_title)}
                       </div>
                       <div className="blog_date">
                         {ReactHtmlParser(moment(item.blogDate).format('MMMM D,YYYY'))}

                       </div>
                       {/* <div>
                       {ReactHtmlParser(item.blog_desc)}
                         <div className="pt-0  mb-1">
                           <Link to={`/blog/${item.page_url}`}>
                             <button
                               type="button"
                               title="Read More"
                               className="home-readmore-btn ls-1 welcome-btn btn-style mt-2 mb-3"
                             >
                               READ MORE
                             </button></Link>
                         </div>
                       </div> */}
                     </>
                   )
                 })
               ) : (
                blogDetails.map((item) => {
                   return (
                     <>
                       <div className="blog-title">
                         {ReactHtmlParser(item.blog_title)}
                       </div>
                       <div className="blog_date">
                         {ReactHtmlParser(moment(item.blogDate).format('MMMM D,YYYY'))}

                       </div>
                       <div>
                         {/* {ReactHtmlParser(item.blog_desc)} */}
                         {blogDetails &&
                           item.blog_desc &&
                           ReactHtmlParser(item.blog_desc)}
                          <div>
                          {ReactHtmlParser(item.blog_desc)}
                          <div className="pt-0 text-center mb-1">
                            <Link to='/blog'>
                              <button
                                type="button"
                                title="BACK"
                                className="home-readmore-btn ls-1 welcome-btn btn-style mt-2 mb-3"
                              >
                                BACK
                              </button></Link>
                          </div>
                        </div>
                       </div>
                     </>
                   )
                 })
               )}
             </>
        </div>
        <div className="col-12 col-md-12 col-lg-3 col-xl-3 d-none d-md-none d-lg-block d-xl-block">
              <div class="main">
                <input icon='search'
                className="search-btn"
                  placeholder='Search...'
                  onChange={(e) => searchItems(e.target.value)}
                />
              </div>
              <div className="">
                <div class="bdr-color">
                  <h3 className="text-center card-title">Archives</h3>
                  <ul>
                    <>
                      {Object.values(archieveData).map(item => {
                        return (

                          <Link to={`/blog/archieve/${item.yearadded}`}>
                            <li className="list-unstyled text-left py-3">
                              {/* {ReactHtmlParser(item.yearadded)} */}
                              {ReactHtmlParser(moment().add(6, 'M')(item.yearadded).format('months'))}
                            </li>
                          </Link>
                          //  </ul>
                        )

                      })}

                    </>
                  </ul>
                </div>
              </div>
              <div className="mt-4">
                <div class="bdr-color">
                  <h3 className="text-center card-title">Categories</h3>
                  <ul>
                    <>
                      {Object.values(categoryData).map(item => {
                        return (
                          // <ul className="pl-0">
                          <Link to={`/blog/category/${item.category}`}>
                          <li className="list-unstyled text-left py-2">
                            {ReactHtmlParser(item.category)}
                          </li>
                          </Link>
                          // </ul>
                        )
                      })}
                    </>
                  </ul>
                </div>
              </div>
            </div>
    
          </div>
      </div>
    </div>
    </div>
  );
};

export default BlogDetailsPage;
