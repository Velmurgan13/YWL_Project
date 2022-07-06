"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.seoThemeDetails = exports.propertyData = exports.getThemeName = exports.themeConfig = void 0;

var _recoil = require("recoil");

var themeConfig = (0, _recoil.atom)({
  key: 'themeConfig',
  "default": {
    yosemitewestgate: {
      url: 'https://beta.yosemitewestgate.com',
      theme: "yosemitewestgate",
      propertyId: '265'
    },
    montereystagecoachloadge: {
      url: 'https://www.montereystagecoachloadge.com',
      theme: "montereystagecoachloadge",
      propertyId: '275'
    }
  }
});
exports.themeConfig = themeConfig;
var getThemeName = (0, _recoil.atom)({
  key: 'getThemeName',
  "default": 'yosemitewestgate'
});
exports.getThemeName = getThemeName;
var propertyData = (0, _recoil.atom)({
  key: 'propertyData',
  "default": ["yosemitewestgate"]
});
exports.propertyData = propertyData;
var seoThemeDetails = (0, _recoil.atom)({
  key: 'seoThemeDetails',
  "default": {
    home: "1",
    overview: "2",
    guestrooms: "3",
    reservations: "4",
    innsights: "5",
    specialspackages: "6",
    thingstodo: "7",
    attractions: "8",
    events: "9",
    directions: "10",
    gallery: "11",
    termsconditions: "12",
    privacypolicy: "13",
    sitemap: "15",
    signin: "16",
    register: "17",
    contactus: "18",
    weather: "20",
    video: "21",
    friendspage: "22",
    jobsection: "23",
    deals: "24",
    groupondeals: "25",
    dvirtualtours: "26",
    review: "27",
    sixplus: "28",
    yourguide: "29",
    faq: "30",
    news: "31",
    whatsnearby: "32",
    lostandfound: "33",
    menu: "34",
    nearbyhotels: "35",
    blog: "36",
    categorylist: "38",
    archivelist: "39",
    cookies: "40",
    personalinforequestform: "41",
    ada: "42",
    restaurantsmenu: "43",
    hotelhousekeeping: "44",
    cleaningprotocols: "45",
    pool: "46",
    parking: "47",
    creditcard: "48",
    fitnessroom: "49",
    localservices: "50",
    entertainment: "51",
    transportcommunte: "52",
    shoppingguide: "53",
    locationguide: "54",
    guestroomdetails: "55",
    topstay: "56",
    pets: "57"
  }
});
exports.seoThemeDetails = seoThemeDetails;