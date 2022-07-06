export const headerConfiguration = (configObject) => {
    configObject = {...configObject, 'property_id': sessionStorage && sessionStorage.getItem('propertyId')};
    if(configObject?.isCheck){
        // console.log(configObject)
        return configObject;
    }
     console.log(configObject);
    return configObject;
}