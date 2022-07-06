import React from "react";
import { useForm } from "react-hook-form";
import './index.css'
// import styled from "styled-components";



import CommonBanner from '../../assets/images/BannerImages/banner2.jpg';
//banner Image
// import BannerContainer from '../../Components/BannerContainer';
// import CommonBanner from '../../../assets/images/banner4.jpg';
// import AccordionCard from '../../Components/Accordion';

// Create a Title component that'll render an <h1> tag with some styles
// const Title = styled.h1`
//   font-size: 1.5em;
//   text-align: center;
//   color: palevioletred;
// `;

const ContactComponent = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
    } = useForm();

    const onSubmit = (data) => {
        // console.log(data);
        reset();
    };
    return (
        <div>
            <BannerContainer
                // bannerImageUrl={CommonBanner}
                // welComeContent="WELCOME TO Contact Page"
            />
          
            {/* <Title>welcome to contact Page!</Title> */}
            <div className="container-fluid">
            <img className="w-100" src={CommonBanner} />
                <div className="row  shadow mb-3 py-4">
                    <div className="col-5">
                        <div className="bg-success">
                            <h3 className="font-weigth-bold text-white text-center p-2">CONNECT WITH US</h3>
                        </div>
                    </div>
                    <div className="col-7 round pb-3">
                        <h6 className="text-center">Please enter the message below that you would like to send to our hotel.<br></br>
                            A guest service agent will reply to your message in a timely manner.</h6>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                {/* <label className="col-form-label">Name:</label> */}
                                <input className="ltr-border-none"
                                    type="text"
                                    placeholder="First Name:"
                                    className={`form-control ${errors.firstname && "invalid"}`}
                                    {...register("firstname", { required: "firstname is Required" })}
                                    onKeyUp={() => {
                                        trigger("firstname");
                                    }}
                                />
                                {errors.firstname && (
                                    <small className="text-danger">{errors.firstname.message}</small>
                                )}
                            </div>
                            <div className="form-group">
                                {/* <label className="col-form-label">Name:</label> */}
                                <input className="ltr-border-none"
                                    type="text"
                                    placeholder="Last Name:"
                                    className={`form-control ${errors.lastname && "invalid"}`}
                                    {...register("lastname", { required: "lastname is Required" })}
                                    onKeyUp={() => {
                                        trigger("lastname");
                                    }}
                                />
                                {errors.lastname && (
                                    <small className="text-danger">{errors.lastname.message}</small>
                                )}
                            </div>
                            <div className="form-group">
                                {/* <label className="col-form-label">Email:</label> */}
                                <input
                                    placeholder="Email"
                                    type="text"
                                    className={`form-control ${errors.email && "invalid"}`}
                                    {...register("email", {
                                        required: "Email is Required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address",
                                        }
                                    })}
                                    onKeyUp={() => {
                                        trigger("email");
                                    }}
                                />
                                {errors.email && (
                                    <small className="text-danger">{errors.email.message}</small>
                                )}
                            </div>
                            <div className="form-group">
                                {/* <label className="col-form-label">Phone:</label> */}
                                <input
                                    placeholder="Phone"
                                    type="text"
                                    className={`form-control ${errors.phone && "invalid"}`}
                                    {...register("phone", {
                                        required: "Phone is Required",
                                        pattern: {
                                            value: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                                            message: "Invalid phone no",
                                        },
                                    })}
                                    onKeyUp={() => {
                                        trigger("phone");
                                    }}
                                />
                                {errors.phone && (
                                    <small className="text-danger">{errors.phone.message}</small>
                                )}
                            </div>
                            <div className="form-group">
                                {/* <label className="col-form-label">subject:</label> */}
                                <input
                                    placeholder="Subject"
                                    className={`form-control ${errors.subject && "invalid"}`}
                                    {...register("subject", {
                                        required: "subject is Required",
                                        minLength: {
                                            value: 50,
                                            message: "Minimum Required length is 50",
                                        },
                                        maxLength: {
                                            value: 250,
                                            message: "Maximum allowed length is 250 ",
                                        }
                                    })}
                                    onKeyUp={() => {
                                        trigger("subject");
                                    }}
                                ></input>
                                {errors.subject && (
                                    <small className="text-danger">{errors.subject.message}</small>
                                )}
                            </div>
                            <div className="form-group">
                                {/* <label className="col-form-label">Message:</label> */}
                                <textarea
                                    placeholder="Message"
                                    className={`form-control ${errors.message && "invalid"}`}
                                    {...register("message", {
                                        required: "Message is Required",
                                        minLength: {
                                            value: 50,
                                            message: "Minimum Required length is 50",
                                        },
                                        maxLength: {
                                            value: 250,
                                            message: "Maximum allowed length is 250 ",
                                        }
                                    })}
                                    onKeyUp={() => {
                                        trigger("message");
                                    }}
                                ></textarea>
                                {errors.message && (
                                    <small className="text-danger">{errors.message.message}</small>
                                )}
                            </div>
                            <input
                                type="submit"
                                className="btn btn-success my-3" title='Submit'
                                value="Send message"
                            />
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ContactComponent;