import { selector } from 'recoil';
import { themeConfig, getThemeName, propertyData } from './index';


export const themeSelector = selector({
  key: 'themeSelector',
  get: ({ get }) => {
    let themeName = get(getThemeName);
    // let propertyId = get(getPropertyId);
    let themeConfiguration = get(themeConfig);
    return themeConfiguration[themeName];
  },
  set: ({ set }, newValue) => {
    set(getThemeName, newValue);
  } 
});
// dummy comment

export const propertyDataSelector = selector({
  key: 'propertyDataSelector',
  get: ({ get }) => {
    let propertyDetails = get(propertyData);
    return propertyDetails;
  },
  set: ({ set }, newPropertyData ) => {
     set(propertyData, newPropertyData);
  }
});


// export const destinationDataSelector = selector({
//   key: 'destinationDataSelector',
//   get: ({ get }) => {
//     let destinationDataId = get(getDestinationData);
//     return destinationDataId;
//   },
//   set: ({ set }, newDestinationData ) => {
//      set(getDestinationData, newDestinationData);
//   }
// });
