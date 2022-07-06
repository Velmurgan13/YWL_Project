import { atom } from 'recoil';
export const themeConfig = atom({
  key: 'themeConyfig',
  default: {
   
    yosemitewestgate: {
      url: 'https://beta.yosemitewestgate.com',
      theme: "yosemitewestgate",
      propertyId: '265',
      noCaptchaSiteKey: '6LdX5ggTAAAAAMEZInpJvEYoocLlK61Fg5qcdPZs',
      noCaptchaSecretKey: '6LdX5ggTAAAAACoiIaacDaFj-q1xZAKtafkycAAy',
      invisiblenoCaptchaSiteKey: '6LdtqnsUAAAAAEpaIIGPe80iNI3Xt12-CqeIIidV',
      invisiblenoCaptchaSecretKey: '6LdtqnsUAAAAAGiAFZ-LMeewztxkUY6Aw2EFZrkE',
      map_key: 'ABQIAAAAqCDNgkIOC5oYXLAJXwMixRT2yXp_ZAY8_ufC3CFXhHIE1NvwkxSDmlo6UM7cTjQpcTbBmVNgINHNZA',
      destination_id: '2',
      cdn_active:'No',
      bin:'1',
    }, 
    // dummy comment
    // montereystagecoachlodge: {
    //   url: 'https://beta.montereystagecoachlodge.com',
    //   theme: "montereystagecoachlodge",
    //   propertyId: '275',
    //   noCaptchaSiteKey: '6LdDoXMUAAAAAKunvYrVz9LrR2KWKfXfh-7IEww-',
    //   noCaptchaSecretKey: '6LdDoXMUAAAAAEawlCzWl1NbpvKxolgkXZMsUTPE',
    //   invisiblenoCaptchaSiteKey: '6Le_ViAaAAAAAMfu2SflJXe2PCOPU5vgpsNjvbje',
    //   invisiblenoCaptchaSecretKey: '6Le_ViAaAAAAAAcEXOzMWRfiSiWsMeTGSY4oZE_Q',
    //   destination_id: '2',
    //   cdn_active:'No',
    //   bin:'1',
    // },
  },
});

export const getThemeName = atom({
  key: 'getThemeName',
  default: 'yosemitewestgate',
});


export const propertyData = atom({
  key: 'propertyData',
  default: {}
});


export const seoThemeDetails = atom({
  key: 'seoThemeDetails',
  default: {
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
    pets: "57",
  }
});


