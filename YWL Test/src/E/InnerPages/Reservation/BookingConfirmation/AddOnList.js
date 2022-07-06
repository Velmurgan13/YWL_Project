import React, { useState } from "react";
import AddOnModal from '../sections/popups/AddOnModal';
import Backdrop from "../sections/popups/backdrop";
import '../sections/popups/index.css';

const AddOnList = ({ val_addon, addonQuantity, currency, currencyMultiplicative }) => {
    const [addonModalOpen, setAddonModalOpen] = useState(false);
    function addonModalShow() {
        setAddonModalOpen(true);
    }

    function addonModalHide() {
        setAddonModalOpen(false);
    }

    return <>
        <div className="d-flex">
            <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 text-left PTB">
                Add-On - {val_addon.addon_name+addonQuantity}
                <br/><span> <a style={{ color: "#337ab7", cursor: "pointer" }}  onClick={addonModalShow}> (Policy) </a> </span>
            </div>
            {addonModalOpen && (
                <AddOnModal onCancel={addonModalHide} 
                            title={val_addon.addon_name} 
                            imgName={val_addon.addon_image}
                            desc={val_addon.addon_description}
                            currency={currency}
                            price={val_addon.addon_price}
                            type={val_addon.addon_type}
                            tax={val_addon.addon_tax_percent}
                            />
                )}
            {addonModalOpen && <Backdrop onCancel={addonModalHide} />}
            <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 PTB LFbold black text-right">
                {currency+(parseFloat(val_addon.addon_total_price)*currencyMultiplicative).toFixed(2)}
            </div>
        </div>
        {(parseFloat(val_addon.addon_tax) > parseFloat(0.0)) ? <div className="d-flex">
            <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 text-left PTB">
                {val_addon.addon_name + ' Taxes'}
            </div>
            <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 PTB LFbold black text-right">
                {currency+(parseFloat(val_addon.addon_tax)*currencyMultiplicative).toFixed(2)}
            </div>
        </div> : null}
        <div class="dottedborder pt-2"></div>
    </>
}

export default AddOnList;