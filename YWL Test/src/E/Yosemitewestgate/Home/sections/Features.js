import React from 'react'
// import './section.css';
import AOS from 'aos'
import 'aos/dist/aos.css'
import './Features.scss'
//icons
import Dollar from '../../assets/images/dollar.png'
import Beverage from '../../assets/images/beverage.png'
import Wifi from '../../assets/images/wifi.png'
import Spa from '../../assets/images/spa.png'
import Key from '../../assets/images/key.png'
const Features = (props) => {
  AOS.init()
  //console.log(props.propertyData);
  return (
    <section className="mt-0 Hm-Features">
      <div className='feature-component'>
        <div className="container row px-0">
        {/* <div className="feature-title col-12 text-center">
          <h3 className="Feature-Heading">Why Book Directly With Us</h3>
        </div> */}
        <div className="col-12 text-center feature-heading mt-2">
          <div className='w-100'>
            <div className='w-100 feature-title pb-3'>
             Why Book Directly With Us
            </div>
          </div>
        </div>
        <div className="feature-benefits col-12">
          <ul className="featureStyle">
            <li className="text-center feature-list">
              <img
                className=""
                src={Dollar}
                width="78"
                height="78"
                title="Best Rates"
                data-aos="flip-left"
                data-aos-duration="1000"
                alt=''
              />
              <h3 className="feature-name">Best Rates</h3>
            </li>
            <li className="text-center feature-list">
              <img
                className="cursor-pointer"
                src={Beverage}
                width="78"
                height="78"
                title="F&B Benefits"
                data-aos="flip-right"
                data-aos-duration="1000"
                alt=''
              />
              <h3 className="feature-name">F&B Benefits</h3>
            </li>
            <li className="text-center feature-list">
              <img
                className=""
                src={Wifi}
                width="78"
                height="78"
                title="Free Wi-Fi"
                data-aos="flip-left"
                data-aos-duration="1000"
                alt=''
              />
              <h3 className="feature-name">Free Wi-Fi</h3>
            </li>
            <li className="text-center feature-list">
              <img
                className=""
                src={Spa}
                width="78"
                height="78"
                title="Spa Benefits"
                data-aos="flip-right"
                data-aos-duration="1000"
                alt=''
              />
              <h3 className="feature-name">Spa Benefits</h3>
            </li>
            <li className="text-center feature-list">
              <img
                className=""
                src={Key}
                width="78"
                height="78"
                title="Flexible Check in & Check Out"
                data-aos="flip-left"
                data-aos-duration="1000"
                alt=''
              />
              <h3 className="feature-name feature-4">
                Flexible Check in <br />& Check Out
              </h3>
            </li>
          </ul>
        </div>
      </div>
      </div>
    </section>
  )
}

export default Features
