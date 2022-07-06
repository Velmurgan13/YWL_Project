import Carousel from "react-bootstrap/Carousel";
import "./Reviews.scss";
import { Link } from "react-router-dom";

function ReviewHomeComponent() {
  return (
    <div className="container-fluid bg-review pt-3 pb-1 ReviewHome Hm-Review">
      <div className="container px-0 text-center">
        <div className="mx-auto text-white reviewIcon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="66"
            height="179"
            viewBox="0 0 66 179"
          >
            <text
              id="_"
              data-name="“"
              transform="translate(65 44) rotate(180)"
              fill="none"
              stroke="#fff"
              strokeWidth="1"
              font-size="160"
              font-family="MrEavesModOT-Reg, Mr Eaves Mod OT"
              letter-spacing="0.05em"
            >
              <tspan x="0" y="0">
                “
              </tspan>
            </text>
          </svg>
        </div>
        <Carousel className="reviewSlide">
          <Carousel.Item>
            <Carousel.Caption className="text-dark">
              <p className="review-title">Great Place Will Be Back.</p>
              <p className="review-content">
                I was concerned about the hygiene and security of the facility
                after reading the other reviews. When we arrived at the hotel,
                they informed us that there had been an error on our
                reservation, and they were quick to assist us with our family's
                rooms. This was a last-minute vacation to San Diego, and I was
                quite pleased with the hotel's price and cleanliness..
              </p>
              <div className="review-add">- Ricky</div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Carousel.Caption className="text-dark">
              <p className="review-title">Perfect Place Will Be Back.</p>
              <p className="review-content">
                I was concerned about the hygiene and security of the facility
                after reading the other reviews. When we arrived at the hotel,
                they informed us that there had been an error on our
                reservation, and they were quick to assist us with our family's
                rooms. This was a last-minute vacation to San Diego, and I was
                quite pleased with the hotel's price and cleanliness..
              </p>
              <div className="review-add">- Ricky</div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Carousel.Caption className="text-dark">
              <p className="review-title">Awesome Place Will Be Back.</p>
              <p className="review-content">
                I was concerned about the hygiene and security of the facility
                after reading the other reviews. When we arrived at the hotel,
                they informed us that there had been an error on our
                reservation, and they were quick to assist us with our family's
                rooms. This was a last-minute vacation to San Diego, and I was
                quite pleased with the hotel's price and cleanliness..
              </p>
              <div className="review-add"> - Ricky</div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div className="">
          <Link to="/reviews">
            <button
              type="button"
              className="btn-review mb-5"
              title="View All Reviews Of Yosemite Westgate Lodge"
            >
              View All
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ReviewHomeComponent;
