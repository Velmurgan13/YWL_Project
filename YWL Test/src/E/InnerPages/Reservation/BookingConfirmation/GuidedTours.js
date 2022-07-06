import react from "react";
import { Helmet } from "react-helmet";
const GuidedTours = () => {
  return (
    <>
      <h2 className="text-left FS20 px-3">Guided Tours For Purchase</h2>
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 PB20 credit-card-div">
        <div id="gyg-widget"></div>
        <Helmet>
          {" "}
          <script
            async
            defer
            src="https://cdn.getyourguide.com/pw/latest/client-loader/widget.js"
            onload="GYG.Widget(document.getElementById('gyg-widget'),
              {'numberOfItems':'20','q':'Groveland','partnerId':'KN3E1HF'});"
          ></script>
        </Helmet>
      </div>
    </>
  );
};

export default GuidedTours;
