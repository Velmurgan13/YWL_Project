import {
  getSeoDescriptionUrl,
  getYesomiteDescriptionUrl,
  getSubscribeEmailUrl,
  getPropAmenitiesUrl,
  getPropEventContactUrl,
  getPropNewsUrl,
  getPropReviewLikeUrl,
  getPropBlogPageUrl,
  getPropNewsDetailsUrl,
  getPropJobssUrl,
  getPropJobDetailssUrl,
  getPropLostAndFoundUrl,
  getPropLostFoundDetailsUrl,
  getPropPersonalInfoReqUrl,
  getPropCleanProtocolsUrl,
  getPropDestinationAttractionUrl,
  getPropJobFormPostUrl,
  getPropFaqsUrl,
  getPropContactUsUrl,
  getPropRoomsUrl,
  getPropAttractionDetailssUrl,
  getPropTopReasonToStayUrl,
  getPropAdaAccesibilityUrl,
  getPropEventsUrl,
  getPropReviewComponentUrl,
  getPropReviewLikeDislikeUrl,
  getPropFriendPageUrl,
  getPropEventsDetailsUrl,
  getPropVideoUrl,
  getPropPackageFormUrl,
  getThingToDoDetailsUrl,
  getPropDirectionMapUrl,
  getPropGuestRoomsUrl,
  getPropRoomDetailsUrl,
  getPropBlogDetailsUrl,
  getPropPackagesPageUrl,
  getPropPackagesDetailsPageUrl,
  getPropFriendDetailsPageUrl,
  getPropVirtualToursUrl,
  getPropEntertainmentUrl,
  getPropPetssUrl,
  getPropGalleryUrl,
  getPropReviewDetailsComponentUrl,
  getPropCountry,
  getPropWeatherUrl,
  getPropAddReviewsComponentUrl,
  getPropsParkingPageUrl,
  getPropFitnessDataUrl,
  getPropPoolPageUrl,
  getPropArtCultureUrl,
  getPropBookUrl,
  getBookingData,
  resendReservationMail,
  addCalendarURL,
  editReservationURL, 
  getEditGuestNameURL,
  getEmailToGuestURL,
  getCurrencyConverterURL,
  getSpecialRequestURL,
  getDietaryRestrictionURL,
  getPropSiteMapUrl,
  getSubmitEstimatedArrivalURL,
  getCurrencyUrl,
  getPropertyURL
} from "../Configuration/config_url";
import { postAPICall } from "./axiosMethodCalls";
import axios from "axios";


// const headers = {
//   Accept: "application/json",
//   "Content-Type": "application/json",
// };



export const getSeoDescriptionData = async (pageId) => {
  //console.log(pageId);
  try {
    const response = await postAPICall(
      getSeoDescriptionUrl,
      { pageid: pageId, isCheck: true },
      {
        headers: {
          origin: "*",
          methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
          preflightContinue: false,
          optionsSuccessStatus: 200,
        },
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
// Axios Get Call - Get all yesomite Data.
export const getYesomiteData = async (data) => {
  try {
    const response = await postAPICall(getYesomiteDescriptionUrl, {
      property_id: data,
    });
    return response.data[0];

    //   return response.then(
    //   function(value) {console.log('value',value);},
    //   function(error) {console.log('error',error);}
    // );
  } catch (error) {
    return error.response;
  }
};

export const getSubscribeEmailData = async (data) => {
  try {
    const response = await postAPICall(getSubscribeEmailUrl, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

// export const getPropReviewLikeData = async (data) => {
//   try {
//     console.log(data);
//     const response = await postAPICall(getPropReviewLikeUrl, {review_id: data.review_id, status: data.status});
//     console.log("utitilities" , response);
//     return response.data;
//   } catch (error) {
//     return error.response;
//   }
// };


export const getPropSiteMapData = async (data) => {
  try {
    // alert(data);
    const response = await postAPICall(getPropSiteMapUrl, {
      destination_id: 2,
    });
    console.log("sitemap" , response);
    return response;
  } catch (error) {
    return error.response;
  }
};


export const getPropWeatherPageData = async (data) => {
  try {
    const response = await postAPICall(getPropWeatherUrl, {
      destination_id: 2,
    });
    //console.log(response);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getPropAmenities = async () => {
  try {
    const response = await postAPICall(getPropAmenitiesUrl);
    //console.log(response);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getPropArtCultureData = async () => {
  try {
    const response = await postAPICall(getPropArtCultureUrl);
    //console.log(response);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getPropNewsData = async () => {
  try {
    const response = await postAPICall(getPropNewsUrl);
    //console.log(response);
    return response.data;
  } catch (error) {
    return error.response;
  }
};






export const getPropNewsDetailsData = async (data) => {
  try {
    const response = await postAPICall(
      getPropNewsDetailsUrl,
      { id: data.id, property_id: 265 }
      // ,{
      //     headers:{
      //             "Access-Control-Allow-Origin": "*",
      //             "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      //             "preflightContinue": false,
      //             "optionsSuccessStatus": 200
      //     }
      //     }
    );
    //console.log(response);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response;
  }
};


export const getPropBlogData = async (data) => {
  try {
    const response = await postAPICall(getPropBlogPageUrl, {blog_type : data.blog_type , blog_category : data.blog_category , blog_date : data.blog_date});
    console.log(response);
    return response;
  } catch (error) {
    return error.response;
  }
};


export const getPropBlogDetails = async (data) => {
  try {
    // console.log("dddddd" , data);
    const response = await postAPICall(getPropBlogDetailsUrl , { page_url: data.page_url})
  console.log("blog-details-data" , response);
    return response;
  } catch (error) {
    return error.response;
  }
};







export const getPropJobsData = async () => {
  try {
    const response = await postAPICall(getPropJobssUrl);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getPropJobDetailsData = async (data) => {
  try {
    const response = await postAPICall(
      getPropJobDetailssUrl,
      { jid: data.jid },
      { jtitle: data.jtitle },
      data
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getPackagesInfoData = async (data) => {
  try {
    const response = await postAPICall(getPropPackagesPageUrl, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getPackagesDetailsInfoData = async (data) => {
  try {
    const response = await postAPICall(getPropPackagesDetailsPageUrl, {
      packages_type_url: data.subdomain,
      form_data: data.form_data,
      property_id: 265,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};
export const  getEventContactDetailsFormData = async (data) => {
  try {
    const response = await postAPICall(getPropEventContactUrl, {
      form_data: data,
      property_id: 265,
    });
    return response
  } catch (error) {
    return error.reponse
  }
}

export const getPackagesDetailsFormData = async (data) => {
  try {
    const response = await postAPICall(getPropPackageFormUrl, {
      form_data: data,
      property_id: 265,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getPropJobFormPostData = async (data) => {
  try {
    const response = await postAPICall(
      getPropJobFormPostUrl,
      data,
      { jid: data.jid },
      { jtitle: data.jtitle }
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getPropFaqData = async () => {
  try {
    const response = await postAPICall(getPropFaqsUrl);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getPropReviewData = async (data) => {
  try {
    console.log(data)
    const response = await postAPICall(getPropReviewComponentUrl, {
      property_id: 265,
      page_no: data.page_no,
      ota_id:data.ota_id,
      trip_type : data.trip_type,
      traveled_with : data.traveled_with,
      traveled_date : data.traveled_date,
      ota_rating : data.ota_rating,
    });

    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getPropReviewLikeData = async (review_id,status) => {
  try {
    console.log(review_id);
    const response = await postAPICall(getPropReviewLikeDislikeUrl, {review_id,status});

    return response;
  } catch (error) {
    return error.response;
  }
};

export const getPropReviewDetailsData = async (data) => {
  try {
    const response = await postAPICall(getPropReviewDetailsComponentUrl, {
      review_title: data.ReviewTitle,
      review_id: data.review_id,
      property_id: 265,
    });

    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getPropAddReviewData = async (data) => {
  try {
    const response = await postAPICall(getPropAddReviewsComponentUrl, data);

    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getPropCountryviewData = async (data) => {
  try {
    const response = await postAPICall(getPropCountry);

    return response.data;
  } catch (error) {
    return error.response;
  } 
};

export const getPropEventsData = async (data) => {
  try {
    console.log("dd",data)
    const response = await postAPICall(getPropEventsUrl, {eventRangeSelect: data} );
    // {eventRangeSelect: data.eventRangeSelect}
    console.log("ddd" , response);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getPropVideoData = async () => {
  try {
    const response = await postAPICall(getPropVideoUrl);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getPropEntertainmentData = async () => {
  try {
    const response = await postAPICall(getPropEntertainmentUrl);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getPropVirtualToursData = async () => {
  try {
    const response = await postAPICall(getPropVirtualToursUrl);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getGalleryData = async (data) => {
  try {
    const response = await postAPICall(getPropGalleryUrl, {
      destination_id: 2,
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getPropPoolData = async () => {
  try {
    const response = await postAPICall(getPropPoolPageUrl);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getPropEventsDetailsData = async (data) => {
  try {
    //console.log(data);
    const response = await postAPICall(getPropEventsDetailsUrl, {
      event_name: data.event_name,
      property_id: 265,
    });
    //console.log(response);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getPropTopStayData = async () => {
  try {
    const response = await postAPICall(getPropTopReasonToStayUrl);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getPropFriendPageData = async () => {
  try {
    const response = await postAPICall(getPropFriendPageUrl);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getPropFriendDetailsPageData = async (data) => {
  try {
    //console.log(data);
    const response = await postAPICall(getPropFriendDetailsPageUrl, {
      friend_name: data.sub_url,
      property_id: 265,
    });
    //console.log(response);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getPropAdaAccesibilityData = async () => {
  try {
    const response = await postAPICall(getPropAdaAccesibilityUrl);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getContactform = async (data) => {
  try {
    const response = await postAPICall(getPropContactUsUrl, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getPropLostFoundData = async () => {
  try {
    const response = await postAPICall(getPropLostAndFoundUrl);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getPropLostFoundDetailsData = async (data) => {
  try {
    const response = await postAPICall(getPropLostFoundDetailsUrl, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getPropPersonalInfoReqData = async (data) => {
  try {
    const response = await postAPICall(getPropPersonalInfoReqUrl, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getPropCleanProtocolData = async () => {
  try {
    const response = await postAPICall(getPropCleanProtocolsUrl);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getPropDestinationAttractionData = async (data) => {
  try {
    const response = await postAPICall(getPropDestinationAttractionUrl, data);
    //console.log(response);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getPropAttractionsDetailsData = async (data) => {
  try {
    const response = await postAPICall(getPropAttractionDetailssUrl, {
      attraction_url: data.attraction_url,
      // dest_url:data.dest_url,
      property_id: 265,
      destination_id: 2,
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getThingToDoData = async (data) => {
  try {
    const response = await postAPICall(getThingToDoDetailsUrl, data);
    //console.log(response);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getPropDirectionMap = async () => {
  try {
    const response = await postAPICall(getPropDirectionMapUrl);
    //console.log(response);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getGuestRoomsData = async (data) => {
  try {
    const response = await postAPICall(getPropGuestRoomsUrl, {
      destination_id: 2,
    });

    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getPropRoomsDetailsData = async (data) => {
  try {
    const response = await postAPICall(getPropRoomDetailsUrl, {
      room_type_url: data.subdomain,
      destination_id: 2,
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

//Reservation Page START

function in_array(array, id) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== undefined) {
      if (array[i].name === id) {
        return array[i].value;
      }
    }
  }
  return "0";
}

//?room_check_in=2022-01-28&room_check_out=2022-01-29&promo_code=&rooms=2&room1=2-2-3-4&room2=5-1
//?room_check_in=2022-01-28&room_check_out=2022-01-29&promo_code=&rooms=2&room1=2&room2=2
export const getRoomsForReservation = async (roomObject) => {
  try {
    /*if(data){
            let roomObject = {}
            roomObject['room_check_in'] = (data === undefined) ? '2022-03-28' : data.room_check_in;
            roomObject['room_check_out'] = (data === undefined) ? '2022-03-29' : data.room_check_out;
            roomObject['promo_code'] = (data === undefined) ? '' : data.promo_code;
            roomObject['rooms'] = (data === undefined) ? '1' : data.no_of_rooms;

            for(let i=0; i<roomObject['rooms']; i++){
                if(data.adults[i].name === 'adults'+i){
                    let str = data.adults[i].value
                    let key = 0;
                    if(data.childs){
                        for(let c=0; c<data.childs.length; c++){
                            if(data.childs[c].name == 'child'+i){
                                key = c
                            }
                        }

                        for(let c=0; c<data.childs[key].value; c++){
                            let childVal = in_array(data.childsAge, 'childage_'+i+'_'+c)
                            if(childVal !== '0'){
                                str = str+'-'+childVal
                            }
                        }
                    }
                    roomObject['room'+(i+1)] = str
                }
            }
            console.log(roomObject);
        }        

        var room_check_in = '2022-03-28';
        var room_check_out = '2022-03-29';
        var promo_code = '';
        var rooms = '2'
        var room1 = '2';
        var room2 = '2';
        // const parameters={ room_check_in, room_check_out, promo_code, rooms, room1};
        const parameters={ room_check_in, room_check_out, promo_code, rooms, room1, room2};
        console.log(parameters)*/

    // const response = await axios.post(getPropRoomsUrl,parameters);
    const response = await axios.post(getPropRoomsUrl, roomObject);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const submitReservationData = async (data) => {
  //console.log("submit data: ", data);
  try {
    const response = await postAPICall(getPropBookUrl, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getQueryParams = async (data) => {
  try {
    if (data) {
      let roomObject = {};
      roomObject["room_check_in"] =
        data === undefined ? "2022-03-28" : data.room_check_in;
      roomObject["room_check_out"] =
        data === undefined ? "2022-03-29" : data.room_check_out;
      roomObject["promo_code"] = data === undefined ? "" : data.promo_code;
      roomObject["rooms"] = data === undefined ? "1" : data.no_of_rooms;

      for (let i = 0; i < roomObject["rooms"]; i++) {
        if (data.adults[i].name === "adults" + i) {
          let str = data.adults[i].value;
          let key = 0;
          if (data.childs) {
            for (let c = 0; c < data.childs.length; c++) {
              if (typeof data.childs[c] !== "undefined") {
                if (data.childs[c].name == "child" + i) {
                  key = c;
                }
              }
            }

            if (typeof data.childs[key] !== "undefined") {
              for (let c = 0; c < data.childs[key].value; c++) {
                let childVal = in_array(
                  data.childsAge,
                  "childage_" + i + "_" + c
                );
                if (childVal !== "0") {
                  str = str + "-" + childVal;
                }
              }
            }
          }
          roomObject["room" + (i + 1)] = str;
        }
      }
      let q = "";
      for (const obj in roomObject) {
        q += obj + "=" + roomObject[obj] + "&";
      }
      return q.slice(0, -1);
    }
  } catch (error) {
    return error.response;
  }
};

export const getReservationData = async (data) => {
  try {
    const response = await postAPICall(getBookingData, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const resendReservationMailFn = async (data) => {
  try {
    const response = await postAPICall(resendReservationMail, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const addReservationToCalendar = async (data) => {
  try {
    const response = await postAPICall(addCalendarURL, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const editReservation = async (data) => {
  try {
    const response = await postAPICall(editReservationURL, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const submitEditGuestName = async (data) => {
  try {
    const response = await postAPICall(getEditGuestNameURL, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const submitEmailToGuest = async (data) => {
  try {
    const response = await postAPICall(getEmailToGuestURL, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const submitCurrencyConverter = async (data) => {
  try {
    const response = await postAPICall(getCurrencyConverterURL, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const submitSpecialRequest = async (data) => {
    try {
        const response = await postAPICall(getSpecialRequestURL, data);
        return response;
    }
    catch (error) {
        return error.response;
    }
}

export const submitDietaryRestriction = async (data) => {
  try {
      const response = await postAPICall(getDietaryRestrictionURL, data);
      return response;
  }
  catch (error) {
      return error.response;
  }
}

export const submitEstimatedArrival = async (data) => {
  try {
      const response = await postAPICall(getSubmitEstimatedArrivalURL, data);
      return response;
  }
  catch (error) {
      return error.response;
  }
}

export const updateCurrecny = async (data) => {
  try {
      const response = await postAPICall(getCurrencyUrl, data);
      return response;
  }
  catch (error) {
      return error.response;
  }
}

export const getPropertyData = async (data) => {
  try {
    const response = await postAPICall(getPropertyURL, data);
    return response;
}
catch (error) {
    return error.response;
}
}

//Reservation Page END
