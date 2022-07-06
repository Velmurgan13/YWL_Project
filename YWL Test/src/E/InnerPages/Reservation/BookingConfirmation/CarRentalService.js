import React from "react";

const RentalCarService = () => {
    return (
        <div className="rentalCars" id="rentalCars">
        <h2 className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-left FS20 mt-3 d-flex flex-column">Lowest Price Car Rentals</h2>
        <iframe
          id="carapiss"
          src="https://www.rentalcars.com/partners/integrations/stand-alone-us/?affiliateCode=innsight"
          scrolling="no"
          frameBorder="0"
          height="370"
          width="100%"
        ></iframe>
      </div>
    )
}

export default  RentalCarService;