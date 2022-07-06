import React, { useState, useEffect } from "react";
import {
  getSeoDescriptionData,
  getPropWeatherPageData,
} from "../../../../DataLayer/datalayerUtilities";
import "./index.scss";
//icons
import { motion } from "framer-motion";
import { WiHumidity } from "react-icons/wi";
import { FiWind, FiCloudDrizzle } from "react-icons/fi";

import { useRecoilValue } from "recoil";
import {
  propertyDataSelector,
  seoThemeDetails,
} from "../../../../Recoil/themeModule";
//common banner component
import BannerContainer from "../../BannerComponent/BannerContainer";
import ReactHtmlParser from "react-html-parser";
// //icons
// import { FiCloudDrizzle } from 'react-icons/fi'


const WeatherComponent = () => {
  const [seoData, setPropertySeodata] = useState([]);
  const { weather: seoId } = useRecoilValue(seoThemeDetails);
  // const themeSelectorData = useRecoilValue(themeSelector);
  // console.log(themeSelectorData);
  const propertyData = useRecoilValue(propertyDataSelector);
  // console.log(propertyData);
  const [getWeatherData, setWeatherData] = useState([]);
  const [getForecastData, setForecastData] = useState([]);

  useEffect(() => {
    fetchSeoProperties();
    fetchWeatherData();
  }, []);

  const fetchSeoProperties = async () => {
    const response = await getSeoDescriptionData(seoId);
    setPropertySeodata(response.data);
  };

  const fetchWeatherData = async () => {
    const response = await getPropWeatherPageData();
    // console.log("rakesh success" , response);
    setWeatherData(response.data.weather);
    setForecastData(response.data.forecast);
  };

  // console.log("checking", getWeatherData);

  return (
    <div>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.4 }}
      >
        <BannerContainer seoData={seoData} />
      </motion.div>
      <div className="container Weather shadow mb-5">
        {/* <div className="container text-center">
                    <h3 className="primary-title text-center">WEATHER IN MONTEREY, CA - STAGE COACH LODGE</h3>
                </div> */}
        <div className="container Weather">
          <div className="row bg-light py-3">
            <div className="col-12 col-md-12 col-lg-4 col-xl-4 px-0">
              {getWeatherData.map((item) => {
                return (
                  <>
                    <div className="weather-bg">
                      <div className="temp pt-4 mb-0">
                        <span className="temp-value">
                          {ReactHtmlParser(item.temp_f)}°F{" "}
                        </span>
                      </div>

                      <div className="timLowTempDiv">
                        <div className="timing">
                          {" "}
                          {ReactHtmlParser(item.weather_desc)}
                        </div>
                        <div className="tempp">
                          <span className="high-temp">
                            Hi:{" "}
                            <span className="temp-value-one text-white pl-1">
                              {" "}
                              {ReactHtmlParser(item.feelslike_f)}°F{" "}
                              <span className="mx-1">/</span>
                            </span>
                          </span>
                          <span className="low-temp">
                            {" "}
                            Li:{" "}
                            <span className="temp-value-one text-white pl-1 ">
                              {ReactHtmlParser(item.feelslike_c)}
                            </span>
                          </span>
                        </div>
                      </div>

                      <div className="row text-white iconWeatherDiv">
                        <div className="humditiy humd">
                          <div className="col-3 mt-3">
                            <WiHumidity size="50" />
                          </div>
                          <div className="col-9 mt-3 humidity">
                            <div className="weather-title">Humidity</div>
                            <div className="weather-title">
                              {ReactHtmlParser(item.humidity_max)} % |{" "}
                              {ReactHtmlParser(item.humidity_min)} %
                            </div>
                          </div>
                        </div>

                        <div className="humditiy1 humd">
                          <div className="col-3 mt-3">
                            <FiWind size="50" />
                          </div>
                          <div className="col-9 mt-3 windSpeed">
                            <h4 className="weather-title">Wind Speed</h4>
                            <h4 className="text-white">
                              {ReactHtmlParser(item.wind_max)} kmh
                            </h4>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 weatherLocationDiv">
                        <h4 className="mt-4 weather-title">
                          {ReactHtmlParser(item.city)},{" "}
                          {ReactHtmlParser(item.state)}
                        </h4>
                        <h4 className="weather-title countryWeather">
                          [{ReactHtmlParser(item.country)}]
                        </h4>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>

            <div className="col-12 col-md-12 col-lg-8 col-xl-8 px-5 my-4">
              <div className="row">
                {getForecastData.slice(1, 7).map((item) => {
                  return (
                    <>
                      <div className="col-12 col-md-4 px-0 my-3 my-md-0">
                        <div className="card p-3 d-flex align-items-center">
                          <h3 className="dayne">
                            {ReactHtmlParser(item.day_name)}
                          </h3>
                          <p>{ReactHtmlParser(item.month_name)} </p>
                          <FiCloudDrizzle className="float-center" size="40" />
                          <p className="timing1">
                            {ReactHtmlParser(item.weather_desc)}
                          </p>
                          <p className="temp-value">
                            {ReactHtmlParser(item.temp_f)}°F |{" "}
                            {ReactHtmlParser(item.temp_c)}°C
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="mt-3">
                    <ConnectSocial />
                </div> */}
      </div>
    </div>
  );
};
export default WeatherComponent;
