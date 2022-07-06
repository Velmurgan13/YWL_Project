import React, { useState } from "react";
import { Radio, Input, Space } from "antd";
import './index.scss'
const RequestDataForm = (props) => {
  const [state, setState] = useState(1)
  const onChange = (e) => {
    // console.log("radio checked", e.target.value);
    setState(e.target.value);
  };
  const onChangeRadio = (e) => {
    props.setRadioValue(e.target.value)
  };
  const onChangeEdit = (e) => {
    // console.log("Input checked", e.target.value);
    props.setCurrentValue(e.target.value)
  };
  const onChangeTransfer = (e) => {
    props.setCurrentValue(e.target.value)
  };
  const onChangeDelete = (e) => {
    props.setCurrentValue(e.target.value)
  };


    return (
      <>
      <div className="dd">
        <Radio.Group onChange={onChange} value={state}>
          <Space  direction="horizontal" className="alignRadio" onChange={onChangeRadio} >
            <Radio value="View">View</Radio>
            <Radio value="Edit">Edit</Radio>
            <Radio value="Transfer">Transfer</Radio>
            <Radio value="Delete">Delete</Radio>
          </Space>
        </Radio.Group>
       <div>
       <div className="mt-3">
          {state === "Edit" ? (
            <textarea
            onChange={onChangeEdit}
              className="form-control ltr-none bdr-left-rght-radius undefined"
              placeholder="What data would you like to edit? &amp; Please be as specific as possible."
              
               />
               
          ) : null}
        </div>
        <div className="mt-3 placeholder-brk">
          {state === "Transfer" ? (
            <textarea
            onChange={onChangeTransfer}
              placeholder="Where would you like to transfer your data? Please be as specific as possible."
              className="form-control ltr-none bdr-left-rght-radius undefined"
              
            />
          ) : null}
        </div>
        <div className="mt-3 inputAni">
          {state === "Delete" ? (
            <textarea
            onChange={onChangeDelete}
              placeholder="Would you like to delete your data? Please be as specific as possible."
              className="form-control ltr-none bdr-left-rght-radius undefined"
              
            />
          ) : null}
           <>
            <label className="custLabel">Would you like to delete your data? Please be as specific as possible.</label>
          </>
        </div>
       </div>
       </div>
      </>
    );
  // }
}

export default RequestDataForm;


{/* <div className="form-group py-4 px-md-0 px-0 mb-0 mx-3">   
                    <div className="floating-label-group inputAni">
                      <input
                        className="ltr-border-none"
                        type="text"
                        placeholder="First Name *"
                        className={`form-control ltr-none bdr-left-rght-radius ${
                          errors.firstname && "invalid"
                        }`}
                      
                        onKeyUp={() => {
                          trigger("firstname");
                        }}
                      />
                      <label className="custLabel">First Name</label>
                    </div>
                    
                  </div> */}