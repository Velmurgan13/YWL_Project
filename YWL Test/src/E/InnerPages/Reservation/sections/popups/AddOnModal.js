import React from "react";
import ReactHtmlParser from "react-html-parser";

import "./index.css"
import { myURL } from '../../../../../Configuration/config_url'

function AddOnModal(props) {
    // console.log('props: ', props)
    function addonModalHide() {
        props.onCancel();
    }

    let typeName = ''
    if(props.type === 'per_item'){
        typeName = 'Per Item'
    }else if(props.type === 'per_person'){
        typeName = 'Per Person'
    }else{
        typeName = 'Per Night'
    }

    return (
        <div className="newModal" style={{ overflowY: "scroll" }}>
            <div className="modal-header text-center fs-16 ratePolicyBorder mb-4">
                Add On - {props.title}
            </div>
            <div className="max-content">
                {props.imgName && <img alt={props.title} align="left" 
                                    src={`${myURL}/assets/user_images/properties/addon/thumbs/2/6/5/${props.imgName}`} />}
                <div className="clearfix visible-sm"></div>
                <div className="ML20 text-left mt-2">
                    {props.desc}
                    <br /><br />
                    <strong>Price</strong>: {props.currency+parseFloat(props.price).toFixed(2)+' '+typeName} <br/>
                    {props.tax && ReactHtmlParser(`<strong>Tax</strong>: ${props.tax}%`) }
                </div>
            </div>
            <div className="" onClick={addonModalHide}>
                <button
                    className="btn--alt close p-4 text-dark btnClose"
                    onClick={addonModalHide}
                >
                    <svg
                        className="text-dark"
                        xmlns="http://www.w3.org/2000/svg"
                        width="34"
                        height="34"
                        fill="currentColor"
                        class="bi bi-x"
                        viewBox="0 0 16 16"
                    >
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default AddOnModal;