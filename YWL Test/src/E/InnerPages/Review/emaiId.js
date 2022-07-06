// import react from "react";
// import { useForm } from "react-hook-form";
// import { FaThumbsUp, FaArrowRight, FaLocationArrow } from "react-icons/fa";
// import React, { useEffect, useRef, useState, Suspense } from "react";
// import Addreviews from "../../InnerPages/Review/addreviews";
// import "./EmailId.scss";
// import "./addreviews.scss";
// import { Form } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";
// const EmailId = (props) => {
//   // const [Emailidd, setEmailid] = useState([]);
//   // const history = useHistory();

//   const [state, setState] = useState();

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;

//     setState((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   //     const {
//   //         register,
//   //         handleSubmit,
//   //         formState: { errors },
//   //     } = useForm();
//   //     const onSubmit = async(data) => {

//   //         try {
//   //             const ReviewEmail = { data };
//   //             setEmailid(ReviewEmail)

//   //        history.push({
//   //             pathname: '/add-reviews',
//   //               state: {"Emailid" : Emailidd.data.firstName} // your data array of objects
//   //           })

//   //         }catch  {
//   //         }
//   //     }

//   let regex = new RegExp("[a-z0-9]+@[a-z]+.edu.[a-z]{2,3}");
//   const Arrow =
//     state && state.Emailid.includes("@") && state.Emailid.includes(".com") ? (
//       <FaLocationArrow className="icon ion-android-arrow-forward" />
//     ) : (
//       <div className="validMail">Please Enter Valid Email</div>
//     );
    
//   const text = state ? (
//     <div className="enterMail mb-2">Enter Your Email </div>
//   ) : (
//     ""
//   );
//   // console.log(state)
//   return (
//     <>
//       <div className=" pt-4 pb-5 EmailId AddReviews">
//         <div className="bg-light text-left p-3 my-3">
//           <h5>WRITE A REVIEW</h5>
//         </div>
//         <div className="pt-5 pb-1">
//           <div>
//             {/* <form onSubmit={handleSubmit(onSubmit)}>

//                             <div class="webflow-style-input">
//                                 <input type="email" {...register("firstName", { required: true })} placeholder="Enter Your Email" />
//                                 <label className="custLabel">Email <span class="red">*</span></label>
//                                 <button type="submit"><FaLocationArrow className="icon ion-android-arrow-forward" /></button>
//                             </div>

                    
//                         </form> */}
//             {text}
//             <Form className="register-form webflow-style-input floating-label-group">
//               <Form.Group controlId="email" className="mb-0">
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter Your Email"
//                   name="Emailid"
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>

//               <Link
//                 className=""
//                 to={{
//                   pathname: "/add-reviews",
//                   state,
//                 }}
//               >
//                 {Arrow}
//               </Link>
//             </Form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EmailId;

import react from 'react';
import { useForm } from 'react-hook-form';
import { FaThumbsUp, FaArrowRight, FaLocationArrow } from 'react-icons/fa'
import React, { useEffect, useRef, useState, Suspense } from 'react';
import Addreviews from '../../InnerPages/Review/addreviews'
import './EmailId.scss';
import './addreviews.scss';
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import  { CgArrowRightR }  from 'react-icons/cg';

const EmailId = (props) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  let history = useHistory();

  // localStorage.getItem('user_email'); 

  const handlerSubmit = () => {
    if (emailValidation()) {
      console.log(email);
      // localStorage.setItem('user_email', email);
      history.push({
                    pathname: '/add-reviews',
                      state: {"Emailid" : email} // your data array of objects
                  })
    }
  };
  
  const emailValidation = () => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email || regex.test(email) === false) {
      setError('Email is not valid');
      return false;
    }
    return true;
  };
  
  return (
    <>
      <div className=" pt-4 pb-5 EmailId AddReviews">
        <div className="bg-light text-left p-3 my-3">
          <h5>WRITE A REVIEW</h5>
        </div>
        <div className="pt-3 pb-1">
          <div>
            {/* {text} */}
            <Form className="register-form webflow-style-input floating-label-group">

              <Form.Group controlId="email" className="mb-0">
                <Form.Control
                  type="email"
                  placeholder="Enter Your Email"
                  name="Emailid"
                  value={email}
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Group>
              {/* <Link
                className=""
                to={{
                  pathname: "/add-reviews",
                  state
                }}
              >
              
                {Arrow}
              </Link> */}
              <div> <button to={{ pathname: `/add-reviews`, state: { email } }} onClick={() => handlerSubmit()}><button><CgArrowRightR size="30" /></button></button></div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );


}

export default EmailId;