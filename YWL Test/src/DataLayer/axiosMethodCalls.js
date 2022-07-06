import axios from 'axios';
// import configData from '../theme.json'
import { headerConfiguration } from './headersConfiguration';

export const postAPICall = (url, data=null) => {
    let parameters = headerConfiguration(data);
    console.log(parameters, url);
    // console.log();
    return axios.post(url, parameters);
}

// export const getThemeProperty = () =>{
//     let theme = "yosemitewestgate";
//     let property_id = configData[theme]['PROPERTYID'];
//     let pageid = '44';
//     const parameters={property_id,pageid};  
//     return parameters;
// }
