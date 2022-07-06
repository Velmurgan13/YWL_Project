import React, { useState } from "react";
import ReactHtmlParser from "react-html-parser";

import AddOnAddButton from "./AddOnAddButton";
import AddOnPerItemButton from "./AddOnPerItemButton";
import AddOnAccordion from "./AddOnAccordion";
import "./index.css";

import AddOnModal from '../popups/AddOnModal';
import Backdrop from '../popups/backdrop';
import '../popups/index.css';

// import Collapse from "react-bootstrap/Collapse";
const AddOn = ({
  convertPrice,
  val2,
  keyAddon,
  updateGrandTotal,
  addonids,
  /*addOnAmountRef, addOnQuantityRef,*/ addon_total_priceRef,
  addon_quantityRef,
  addon_priceRef,
  addOnIdRef,
  addon_tax_percentRef,
  addon_tax_amountRef,
  perNightAddonRef,
  perItemAddonRef,
  perPersonAddonRef,
  currencySign
}) => {
  const [addonModalOpen, setAddonModalOpen] = useState(false);
  const [addonPerItemButtonFlag, setAddonPerItemButtonFlag] = useState(true);

  function addonModalShow() {
      setAddonModalOpen(true);
  }

  function addonModalHide() {
      setAddonModalOpen(false);
  }

  let addonAddButtonHTML = "";
  let accord = false;
  let accordionHTML = "";
  let price = parseFloat(convertPrice) * parseFloat(val2.Price);
  let check1 = "";
  let check2 = "";
  let check3 = "";

  function handleChange(i) {
    addOnIdRef.current[i + 1].focus();
  }

  function handleChangeTwo(i) {
    addon_tax_percentRef.current[i + 1].focus();
  }

  function handleChangeThree(i) {
    addon_tax_amountRef.current[i + 1].focus();
  }

  function handleChangeFour(i) {
    addon_total_priceRef.current[i + 1].focus();
  }

  function handleChangeFive(i) {
    addon_quantityRef.current[i + 1].focus();
  }

  function handleChangeSix(i) {
    addon_priceRef.current[i + 1].focus();
  }

  function handleperItemAddon(i) {
    perItemAddonRef.current[i + 1].focus();
  }

  function handleperPersonAddon(i) {
    perPersonAddonRef.current[i + 1].focus();
  }

  function handleperNightAddon(i) {
    perNightAddonRef.current[i + 1].focus();
  }

  // open modal from booking summary
  function addOnModalPopup(id){
    document.getElementById('addon-'+id).click();
  }

  if (val2.addon_type !== "per_night" && val2.addon_type !== "per_person") {
    if (val2.addon_type === "per_item") {
      // ADDON remove button
      addonAddButtonHTML = (
        <AddOnPerItemButton
          val2={val2}
          updateGrandTotal={updateGrandTotal}
          addonids={addonids}
          perNightAddonRef={perNightAddonRef}
          handleperNightAddon={handleperNightAddon}
          addOnModalPopup={addOnModalPopup}
          setAddonPerItemButtonFlag={setAddonPerItemButtonFlag}
        />
      );
    }
    accord = true;
    accordionHTML = (
      <AddOnAccordion
        val2={val2}
        keyAddon={keyAddon}
        convertPrice={convertPrice}
        updateGrandTotal={updateGrandTotal}
        addonids={addonids}
        /*addOnAmountRef={addOnAmountRef} 
                            addOnQuantityRef={addOnQuantityRef}*/ perNightAddonRef={
          perNightAddonRef
        }
        handleperNightAddon={handleperNightAddon}
        addOnModalPopup={addOnModalPopup}
        setAddonPerItemButtonFlag={setAddonPerItemButtonFlag}
        addonPerItemButtonFlag={addonPerItemButtonFlag}
      />
    );
  } else {
    accord = false;
    accordionHTML = "";
    addonAddButtonHTML = (
      <AddOnAddButton
        val2={val2}
        updateGrandTotal={updateGrandTotal}
        addonids={addonids}
        perNightAddonRef={perNightAddonRef}
        handleperNightAddon={handleperNightAddon}
        addOnModalPopup={addOnModalPopup}
      />
    );
  }

  if (val2.addon_type == "per_night") {
    check1 = (
      <>
        <input
          type="checkbox"
          id={"perNightAddon_" + val2.Id}
          name={"perNightAddon" + val2.Id + "[]"}
          style={{ display: "none" }}
          value="0"
          defaultChecked="checked"
        />
      </>
    );
  } else {
    check1 = "";
  }

  if (val2.addon_type == "per_person") {
    check2 = (
      <>
        <input
          type="checkbox"
          id={"perPersonAddon_" + val2.Id}
          name={"perPersonAddon" + val2.Id + "[]"}
          style={{ display: "none" }}
          value="0"
          defaultChecked="checked"
        />
      </>
    );
  } else {
    check2 = "";
  }

  if (val2.addon_type == "per_item") {
    check3 = (
      <>
        <input
          type="checkbox"
          id={"perItemAddon_" + val2.Id}
          name={"perItemAddon" + val2.Id + "[]"}
          style={{ display: "none" }}
          value="0"
          defaultChecked="checked"
        />
      </>
    );
  } else {
    check3 = "";
  }

  return (
    <>
      <div className="row border bg-light mx-0 mt-3 addOn-div1">
        <div className="col-12 mt-3 mb-xs-16">
          <div className="addonsDiv">
            <div className="col--xl-8 col-lg-8 col-md-6 col-sm-12 floatL text-xs-center">
              <h3 className="addOn-title">{val2.Name}</h3>
              <p>
                {val2.Description.substring(0, 80)}
                {val2.Description.length >= 80 ? "... " : " "}-{" "}
                <a id={`addon-${val2.Id}`} onClick={addonModalShow}>more</a>
                {addonModalOpen && (
                <AddOnModal onCancel={addonModalHide} 
                            title={val2.Name} 
                            imgName={val2.image}
                            desc={val2.Description}
                            currency={currencySign}
                            price={val2.Price}
                            type={val2.addon_type}
                            tax={val2.tax}
                            />
                )}
                {addonModalOpen && <Backdrop onCancel={addonModalHide} />}
              </p>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 addOn-priceDetails textEnd floatL text-right text-xs-center">
              <h3 className="addOn-price">
                {ReactHtmlParser(currencySign)+price.toFixed(2)}
                {val2.addon_type === "per_item"
                  ? " Per Item"
                  : val2.addon_type === "per_person"
                  ? " Per Person"
                  : " Per Night"}
              </h3>
            </div>
            {accord && accordionHTML}
            {addonAddButtonHTML}
            {check1} {check2} {check3}
            <input
              type="hidden"
              id={"addOnId_" + val2.Id}
              name={"addOnId_" + val2.Id}
              value="0"
              ref={(ref) => addOnIdRef.current.push(ref)}
              onChange={() => handleChange(keyAddon)}
            />
            <input
              type="hidden"
              id={"addon_tax_percent_" + val2.Id}
              name={"addon_tax_percent_" + val2.Id}
              value="0"
              ref={(ref) => addon_tax_percentRef.current.push(ref)}
              onChange={() => handleChangeTwo(keyAddon)}
            />
            <input
              type="hidden"
              id={"addon_tax_amount_" + val2.Id}
              name={"addon_tax_amount_" + val2.Id}
              value="0"
              ref={(ref) => addon_tax_amountRef.current.push(ref)}
              onChange={() => handleChangeThree(keyAddon)}
            />
            <input
              type="text"
              id={"addon_total_price_" + val2.Id}
              name={"addon_total_price_" + val2.Id}
              defaultValue={price.toFixed(2)}
              ref={(ref) => addon_total_priceRef.current.push(ref)}
              onChange={() => handleChangeFour(keyAddon)}
              className="addon_total_price"
            />
            <input
              type="text"
              id={"addon_quantity_" + val2.Id}
              name={"addon_quantity_" + val2.Id}
              defaultValue="1"
              ref={(ref) => addon_quantityRef.current.push(ref)}
              onChange={() => handleChangeFive(keyAddon)}
              className="addon_quantity"
            />
            <input
              type="hidden"
              id={"addon_price_" + val2.Id}
              name={"addon_price_" + val2.Id}
              value={price.toFixed(2)}
              ref={(ref) => addon_priceRef.current.push(ref)}
              onChange={() => handleChangeSix(keyAddon)}
            />
            <input
              type="hidden"
              id={"perItemAddon" + val2.Id}
              name={"perItemAddon" + val2.Id}
              value="0"
              ref={(ref) => perItemAddonRef.current.push(ref)}
              onChange={() => handleperItemAddon(val2.Id)}
            />
            <input
              type="hidden"
              id={"perPersonAddon" + val2.Id}
              name={"perPersonAddon" + val2.Id}
              value="0"
              ref={(ref) => perPersonAddonRef.current.push(ref)}
              onChange={() => handleperPersonAddon(val2.Id)}
            />
            <input
              type="hidden"
              id={"perNightAddon" + val2.Id}
              name={"perNightAddon" + val2.Id}
              defaultValue="0"
              ref={(ref) => perNightAddonRef.current.push(ref)}
              onChange={() => handleperNightAddon(val2.Id)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddOn;
