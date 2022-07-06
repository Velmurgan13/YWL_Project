import React, {useState, useEffect} from "react";
import {
  getSeoDescriptionData,getPropLostFoundData,getPropLostFoundDetailsData,
} from '../../../DataLayer/datalayerUtilities';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import '../../Yosemitewestgate/style/common.css';
import "./index.scss";
import ReactHtmlParser from 'react-html-parser'
import { useForm } from "react-hook-form";
import BannerContainer from '../BannerComponent/BannerContainer';

const LostAndFoundComponent = (props) => {
    const [toggleState, setToggleState] = useState(1);
    const [clicked, setClicked] = useState(false);
    const [seoData, setPropertySeodata] = useState([])
    const [LostFoundData, setLostAndFoundData] = useState([])
    
    useEffect(() => {
      fetchSeoProperties()
      fetchLostAndFoundData()
    }, [])

    const fetchSeoProperties = async () => {
      const response = await getSeoDescriptionData('33')
      setPropertySeodata(response.data)
    }

    const fetchLostAndFoundData = async () => {
        const response = await getPropLostFoundData()
        setLostAndFoundData(response)
      }

    const toggle = index => {
      if (clicked === index) {
        //if clicked question is already active, then close it
        return setClicked(null);
      }
      setClicked(index);
    };
  
    const toggleTab = (index) => {
      setToggleState(index);
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
    } = useForm();

    
    const onSubmit = async (data) => {
        // console.log(data);
      const { property_name,email} = props.propertyData
      const finalData = { ...data, property_name, email }
    //   console.log(finalData)
      const response = await getPropLostFoundDetailsData(finalData)
    //   console.log(response)
        //reset();
    };
    return (
        <section>
            <BannerContainer  seoData={seoData}/>
            {/* <div className="text-center">
                <h5 className="primary-title">LOST ITEM DETAILS</h5>
            </div> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container px-3 px-md-0 lostNFound">

                    <div className="shadow border rounded my-5 pt-xs-20">
                        <div className="row mx-0">
                            <div className="col-12 col-md-6 px-md-3 px-2 py-4">
                                <Form className="input-form1">
                                    <FormGroup>
                                        <Label className="input-label" for="exampleDate">Lost Date</Label>
                                        <Input
                                            className="ltr-none"
                                            type="date"
                                            name="date"
                                            id="lostDate"
                                            placeholder="Select Date"
                                        />
                                    </FormGroup>
                                </Form >
                            </div>
                             
                            <div className="col-12 col-md-6 px-md-3 px-2 py-4">
                            <FormGroup className="input-form2">
                                <Label className="input-label" for="exampleSelect">Select types of items</Label>
                                <Input className="ltr-none" type="select" name="select" id="item" required="pleas">
                                    <option>Select Lost Item Type</option>
                                    {Object.values(LostFoundData).map(item => {
                            return (
                                    <option>{ReactHtmlParser(item['item'])}</option>
                                    )
                                })}
                                </Input>
                            </FormGroup>
                        </div>
                         
                        </div>
                        <div className="col-12 px-md-3 px-2 pb-4">
                            <FormGroup className="input-area">
                                <Input className="ltr-none" type="textarea" placeholder="where was your item first" name="text" id="last_seen" />
                            </FormGroup>
                            <FormGroup className="input-area">
                                <Input className="ltr-none" type="textarea" placeholder="description of Item" name="text" id="item_description" />
                            </FormGroup>
                        </div>
                    </div>
                    <div>
                    </div>
                    <div className="text-center">
                        <h5 className="primary-title">SHIPPING DETAILS</h5>
                    </div>
                    <div className="shadow border rounded my-5 py-4">
                        <div className="shipping-details row mx-0">
                            <div className="col-12 col-md-6 px-md-5 px-3 py-4">
                                <FormGroup>
                                    <Input
                                        className="ltr-none"
                                        type="text"
                                        name="first Name"
                                        id="first_name"
                                        placeholder="First Name*"
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-12 col-md-6 px-md-5 px-3 py-4">
                                <FormGroup>
                                    <Input
                                        className="ltr-none"
                                        type="text"
                                        name="last Name"
                                        id="last_name"
                                        placeholder="Last Name*"
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-12 col-md-4 px-md-5 px-3 pb-2">
                                <FormGroup>
                                    <Input
                                        className="ltr-none"
                                        type="text"
                                        name="adress"
                                        id="street_address"
                                        placeholder="Street Address*"
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-12 col-md-4 px-md-5 px-3 pb-2">
                                <FormGroup>
                                    <Input
                                        className="ltr-none"
                                        type="text"
                                        name="city"
                                        id="city"
                                        placeholder="City*"
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-12 col-md-4 px-md-5 px-3 pb-2">
                                <FormGroup>
                                    <Input
                                        className="ltr-none"
                                        type="text"
                                        name="state"
                                        id="state"
                                        placeholder="state*"
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-12 col-md-4 px-md-5 px-md-5 px-3 pt-2 pb-3">
                                <FormGroup>
                                    <Input
                                        className="ltr-none"
                                        type="text"
                                        name="country"
                                        id="country"
                                        placeholder="country*"
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-12 col-md-4 px-3 px-md-5 pt-2 pb-3">
                                <FormGroup>
                                    <Input className="ltr-none" type="text" name="zip" id="zip_code" placeholder="zip*" />
                                </FormGroup>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <h5 className="primary-title">CONTACT DETAILS</h5>
                    </div>
                    <div className="shadow border rounded my-5 py-4">

                        <div className="contact-details row mx-0">
                            <div className="col-12 col-md-6 px-md-5 py-4">
                                <FormGroup>
                                    <Input
                                        className="ltr-none"
                                        type="text"
                                        name="Guest Name"
                                        id="guest_name"
                                        placeholder="Guest Name*"
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-12 col-md-6 px-md-5 py-4">
                                <FormGroup>
                                    <Input
                                        className="ltr-none"
                                        type="number"
                                        name="Reservation Id"
                                        id="folio_number"
                                        placeholder="Reservation Id*"
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-12 col-md-6 px-md-5 py-4">
                                <FormGroup>
                                    <Input
                                        className="ltr-none"
                                        type="number"
                                        name="Room"
                                        id="room_no"
                                        placeholder="Room Number*"
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-12 col-md-6 px-md-5 py-4">
                                <FormGroup>
                                    <Input
                                        className="ltr-none"
                                        type="email"
                                        name="email"
                                        id="email1"
                                        placeholder="Email*"
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-12 col-md-6 px-md-5 py-4">
                                <FormGroup>
                                    <Input
                                        className="ltr-none"
                                        type="email"
                                        name="email"
                                        id="re_email"
                                        placeholder="confirm Email*"
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-12 col-md-6 px-md-5 py-4">
                                <FormGroup>
                                    <Input
                                        className="ltr-none"
                                        type="number"
                                        name="number"
                                        id="phone"
                                        placeholder="Phone Number*"
                                    />
                                </FormGroup>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="text-center py-4">
                    <button className="button_bg py-2 mt-2 px-4 text-white rounded" type="submit">SUBMIT</button>
                </div>
            </form>
        </section>
    );
}

export default LostAndFoundComponent;