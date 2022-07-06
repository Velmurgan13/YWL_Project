import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import './index.scss'
import { Link } from 'react-router-dom';
import { seoThemeDetails, propertyDataSelector } from "../../../Recoil/themeModule";
import ReactHtmlParser from "react-html-parser";
import { AiOutlineSearch } from 'react-icons/ai';
import FilterModal from './MobileFilterModal'
import Collapse from 'react-bootstrap/Collapse'

import {
  getSeoDescriptionData,
  getPropBlogData,
} from "../../../DataLayer/datalayerUtilities";
//import FilterModal from './MobileFilterModal'
import moment from 'moment';
import BannerContainer from "../../InnerPages/BannerComponent/BannerContainer";
// import { FaFilter } from 'react-icons/fa';

import {
  Button, Modal, ModalFooter,
  ModalHeader, ModalBody
} from "reactstrap"
import { TiFilter } from 'react-icons/ti';




const BlogComponent = () => {
  const propertyData = useRecoilValue(propertyDataSelector);
  console.log(propertyData);
  const { blog: seoId } = useRecoilValue(seoThemeDetails);
  const [seoData, setPropertySeodata] = useState([]);
  const [blogData, setPropertyBlogdata] = useState([]);
  const [archieveDate, setArchieveDate] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  // Modal open state
  const [modal, setModal] = React.useState(false);

  // Toggle for Modal
  const toggle = () => setModal(!modal);

  console.log("searchInput " + searchInput)
  useEffect(() => {
    fetchSeoProperties();
    fetchPropertyBlogData();
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
      const filteredData = blogData.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
    }
    else {
      setFilteredResults(blogData)
      console.log(blogData);
    }
  }

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData(seoId);
    setPropertySeodata(response.data);
  };

  const fetchPropertyBlogData = async (data,value) => {

    if(value=='category'){
      var blog_type = value;
      var blog_category = data;

      console.log(`value is ${blog_type} and date is ${blog_category}`);
    }
    else if(value=='archieve')
    {
      var blog_type = value;
      var blog_date = data;
      console.log(`value is ${blog_type} and category is ${blog_date}`);
    }
    
    const final_data = {blog_type,blog_category, blog_date};
    const response = await getPropBlogData(final_data);
    console.log("check here", response);
    setPropertyBlogdata(response.data.blogData);
    setArchieveDate(response.data.getArchieveMonth[0]);
    console.log("month", response.data.getArchieveMonth[0])
    setCategoryData(response.data.blogcategoryData);
  };

console.log("navnath" +archieveDate)

  return (
    <div>
      <BannerContainer seoData={seoData} />
      <div className="blogParent mb-5">
        <div className="container-fluid blog-container main-bg-white px-0 ">
          <div className="row mx-1 mx-md-4">
            <div className="col-12 col-md-12 col-lg-9 col-xl-9">
              <>

                {searchInput.length > 1 ? (
                  filteredResults.map((item) => {
                    console.log(ReactHtmlParser(item));
                    return (
                      <>
                        <div className="blog-title">
                          {ReactHtmlParser(item.blog_title)}
                        </div>
                        <div className="blog_date">
                          {ReactHtmlParser(moment(item.blogDate).format('MMMM D,YYYY'))}
                      
                        </div>
                        <div>
                          {blogData &&
                            item.blog_desc &&
                            ReactHtmlParser(item.blog_desc.substr(0, 400))}
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
                        </div>
                      </>
                    )
                  })
                ) : (
                  blogData.map((item) => {
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
                          {blogData &&
                            item.blog_desc &&
                            ReactHtmlParser(item.blog_desc.substr(0, 400))}
                          <div className="pt-0 text-center text-md-right my-3 md-my-1">
                            <Link to={`/blog/${item.page_url}`}>
                              <button
                                type="button"
                                title="Read More"
                                className="home-readmore-btn ls-1 welcome-btn btn-style mt-2 mb-3"
                              >
                                READ MORE
                              </button></Link>
                          </div>
                        </div>
                      </>
                    )
                  })
                )}
              </>

              <div className="d-block d-md-block d-xl-none d-lg-none">
                {/* <FilterModal /> */}
              </div>
              {/* <div className="d-block d-md-block d-xl-none d-lg-none filter_icon">
                <FilterModal size="100" className="px-1 px-md-2"/>
              </div> */}
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
                      {Object.values(archieveDate).map((item, key) => {
                        return(
                          
                          <Link to={`/blog/archieve/${item}`}
                          onClick={() =>  fetchPropertyBlogData(item, 'archieve')}>
                            <div className="text-dark fs-18 font-weight py-2">{ReactHtmlParser(item)}</div>
                          </Link>
                        )
                      })} 

                    </>
                    <Link to="/blog/archive_list">
                      <div className="text-dark fs-18 font-weight py-2">Show all</div>
                    </Link>
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
                          <Link to={`/blog/category/${item.category}`}
                          onClick={() => fetchPropertyBlogData(item.category,'category')}>
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


            <div>
    <div  className="d-block d-md-block d-xl-none d-lg-none">
      <>
        <div>		<TiFilter color="danger"
          onClick={toggle}></TiFilter></div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader
            toggle={toggle}>FILTER</ModalHeader>
          <ModalBody>
            <div class="main">
              <input icon='search'
                className="search-btn w-100"
                placeholder='Search...'
              // onChange={(e) => searchItems(e.target.value)}
              />
            </div>
          
      

<>
<div className='my-3'>  <Button className='bg-success'
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        Archives
      </Button></div>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <ul>
          {Object.values(archieveDate).map((item, key) => {
                        return(
                          
                          <Link to={`/blog/archieve/${item}`}
                          onClick={() =>  fetchPropertyBlogData(item, 'archieve')}>
                            <li className="text-dark fs-18 font-weight py-2" onClick={toggle}>{ReactHtmlParser(item)}</li>
                          </Link>
                        )
                      })} 
          </ul>
        </div>
      </Collapse>
    </>



    <>
    <div className='my-3'>  <Button className='bg-success'
        onClick={() => setOpen1(!open1)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
       Categories
      </Button></div>
      <Collapse in={open1}>
        <div id="example-collapse-text">
          <ul>
          {Object.values(categoryData).map(item => {
                        return (
                          // <ul className="pl-0">
                          <Link to={`/blog/category/${item.category}`}
                          onClick={() => fetchPropertyBlogData(item.category,'category')}>
                            <li className="list-unstyled text-left py-2" onClick={toggle}>
                              {ReactHtmlParser(item.category)}
                            </li>
                          </Link>
                          // </ul>
                        )
                      })}
          </ul>
        </div>
      </Collapse>
    </>



          </ModalBody>
          <ModalFooter>
            <div className="mx-auto">
              <Button color="danger" onClick={toggle}>CLOSE</Button>
            </div>
          </ModalFooter>
        </Modal>
      </>
    </div>
    </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogComponent;
