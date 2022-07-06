import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Components from "./componentIndex";
import { getYesomiteData } from "./DataLayer/datalayerUtilities";
import { useRecoilState } from "recoil";
import { themeSelector, propertyDataSelector } from "./Recoil/themeModule";
import {Helmet} from "react-helmet";
import adawidget from './adawidget';
// import useRctScript from '../src/hooks/ScriptComponent/useMultipleScript'

//  import {themeScriptSelector} from './Recoil/themeModule' 
// import {
//   getSeoDescriptionData
// } from "./DataLayer/datalayerUtilities";
// import { useRecoilValue } from 'recoil';
// import { seoThemeDetails } from "./Recoil/themeModule";

const Main = () => {
  const [themeData, setThemeData] = useRecoilState(themeSelector);
  console.log("app ka data", themeData);
  const [propertyData, setPropertydata] = useRecoilState(propertyDataSelector);
  console.log("eighteen ???", propertyData);
  //  const [scriptData, setScriptData] = useRecoilState(themeScriptSelector);
  //  console.log(scriptData);
  // const {home:seoId} = useRecoilValue(seoThemeDetails);
  // const [seoData, setPropertySeodata] = useState([])

  // const parse = require('html-react-parser');

  const getCurrentTheme = () => {
    //var domainname = window.location.hostname.split('.').slice(1, -1).join('.');
    //  alert(domainname);
    //  setThemeData(domainname);
    setThemeData("yosemitewestgate");
    sessionStorage.setItem("propertyId", themeData.propertyId);
  };

  useEffect(() => {
    getCurrentTheme();
  }, []);

  useEffect(() => {
    fetchProperties();
    // fetchSeoProperties();
  }, []);

  const fetchProperties = async () => {
    // console.log("test")
    const response = await getYesomiteData();
    // console.log(response);
    setPropertydata(response);
  };

  // console.log(themeData);
  // console.log(propertyData)

  // const fetchSeoProperties = async () => {
  //   // console.log(seoId)
  //   const response = await getSeoDescriptionData(seoId);
  //   // alert(response);
  //   // console.log(response)
  //   // setPropertySeodata(response.data);
  // };
  //   const fetchSeoProperties = async () => {
  //     const response = await getSeoDescriptionData('2')
  //     // alert(response);
  //     setPropertySeodata(response.data)
  //   }

  // return(
  // var domainname = window.location.hostname.split('.').slice(1, -1).join('.');
  // var websiteurl = configData[domainname]['URL'];
  // var theme = configData[domainname]['THEME'];
  // var theme = "yosemitewestgate";
  // var propertyid = configData[theme]['PROPERTYID'];
  // var websiteurl = configData[theme]['URL'];
  //console.log(themeData.theme);
  const ComponentToRender = Components[themeData.theme];
  //console.log(ComponentToRender);
  // console.log(propertyData);
  return (
    <>
      {/* {useRctScript('https://www.innstaging.com/adawidget/widgets/?', scriptData )} */}
      <ComponentToRender propertyData={propertyData} />
      
      <Helmet>
          <adawidget propertyData={propertyData}/>  
      </Helmet>
    </>
  );
  //}
  //)
};

export default Main;
