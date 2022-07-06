import React, { useState } from "react";
import { FaPlusSquare, FaMinusSquare } from "react-icons/fa";
import {
  AccordionSection,
  Wrap,
  Dropdown,
  FaqReadmore,
  FaqMain,
  Faqcard,
  FaqData,
} from "./styledIndex";
import ReactHtmlParser from "react-html-parser";
import Collapse from "react-bootstrap/Collapse";

// import { getCollapseProps, getToggleProps, isExpanded } from 'react-collapsed'
const AddOnAccordion = ({
  val2,
  keyAddon,
  convertPrice,
  updateGrandTotal,
  addonids /*addOnAmountRef, addOnQuantityRef*/,
  perNightAddonRef,
  addOnModalPopup,
  setAddonPerItemButtonFlag,
  addonPerItemButtonFlag
}) => {
  // function handleChange(i){
  //     addOnAmountRef.current[i+1].focus();
  // }

  function selectAddon(id, addName, tax, addonPrice) {
    let currency = document.getElementById("currencySign").value;
    let noOfNight = document.getElementById("noOfNights").value;
    let noOfRooms = document.getElementById("noOfRooms").value;
    let addonMinus = document.getElementById("addonsminus_"+id);

    if (document.getElementById("perItemAddon_" + id).checked) {
      let addon_quantity;
      if (document.getElementById("addOnQuantity_" + id) !== null) {
        addon_quantity = document.getElementById("addOnQuantity_" + id).value;
      }

      var price;
      if (document.getElementById("addon_total_price_" + id) !== null) {
        price = document.getElementById("addon_total_price_" + id).value;
      }

      if (document.getElementById("Add_Addon_" + id).value != "Remove") {
        if (document.getElementById("perItemAddon_" + id) !== null) {
          if (document.getElementById("perItemAddon_" + id).checked) {
            document.getElementById("removeAddonPerItem_" + id).style.display =
              "block";
              setAddonPerItemButtonFlag(false);
            document.getElementById("Add_Addon_" + id).style.display = "none";
            if(addonMinus){
              addonMinus.style.display = "none";
            }
            
          }
        }

        if (document.getElementById("hideShowAddOn_" + id) !== null) {
          document.getElementById("hideShowAddOn_" + id).style.display = "none";
        }

        let counterAddon = parseInt(
          document.getElementById("addon-added-counter").value
        );
        counterAddon++;
        document.getElementById("addon-added-counter").value = counterAddon;

        let taxPercent = tax;
        let html_extra = "";
        let quantityHtml = "";

        if (document.getElementById("perItemAddon_" + id) !== null) {
          if (document.getElementById("perItemAddon_" + id).checked) {
            price = price * addon_quantity;
            document.getElementById("perItemAddon_" + id).value = "1";
            quantityHtml = " (" + addon_quantity + ")...";
          }
        } else if (document.getElementById("perPersonAddon_" + id) !== null) {
          if (document.getElementById("perPersonAddon_" + id).checked) {
            let totalGuests =
              document.getElementById("totalGuestPersons").value;
            price = price * totalGuests;
            document.getElementById("perPersonAddon" + id).value = "1";
            quantityHtml = " (" + totalGuests + ")...";
          }
        } else {
          price = price * noOfNight * noOfRooms;
          document.getElementById("perNightAddon" + id).value = "1";
          quantityHtml = " (" + noOfRooms * noOfNight + ")...";
        }

        console.log(addon_quantity, price)
        // if(addon_quantity !== undefined){
        document.getElementById("addon_quantity_" + id).value = addon_quantity;
        // }
        document.getElementById("addon_total_price_" + id).value = price;

        document
          .getElementById("Add_Addon_" + id)
          .classList.remove("btn-success");
        document.getElementById("Add_Addon_" + id).classList.add("btn-danger", "removeAddon");
        document.getElementById("Add_Addon_" + id).value = "Remove";

        if (document.getElementById("addOnQuantity_" + id) !== null) {
          document
            .getElementById("addOnQuantity_" + id)
            .removeAttribute("enabled", "");
          document
            .getElementById("addOnQuantity_" + id)
            .setAttribute("disabled", "");
        }

        if (document.getElementById("perItemAddon_" + id) !== null) {
          document
            .getElementById("perItemAddon_" + id)
            .removeAttribute("enabled", "");
          document
            .getElementById("perItemAddon_" + id)
            .setAttribute("disabled", "");
        }

        if (document.getElementById("perNightAddon_" + id) !== null) {
          document
            .getElementById("perNightAddon_" + id)
            .removeAttribute("enabled", "");
          document
            .getElementById("perNightAddon_" + id)
            .setAttribute("disabled", "");
        }

        if (document.getElementById("perPersonAddon_" + id) !== null) {
          document
            .getElementById("perPersonAddon_" + id)
            .removeAttribute("enabled", "");
          document
            .getElementById("perPersonAddon_" + id)
            .setAttribute("disabled", "");
        }

        let addonRatePolicyHtml;
        if (document.getElementById("exampleModal" + id)) {
          addonRatePolicyHtml = document.getElementById(
            "exampleModal" + id
          ).innerHTML;
        }

        let html =
          '<div class="" id="' + addName.replace(/\s+|\&|[_\W]+/g, "_") + '">';
        html +=
          '<div class="p-2 flex-grow-1 bd-highlight text-left PT2 PB2">Add On - ' +
          addName +
          quantityHtml +
          "";
        html +=
          '<a style="display:inline-block" class="addOnModal" id="addOnModal_'+id+'" href="javascript:void(0)" data-toggle="modal" title="View Rate Policy" data-target="#viewAddonRatePolicy' +
          id +
          '">Policy</a>';
        // html +=
        //   '<div class="modal fade" id="viewAddonRatePolicy' + id + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="display: none;" >' +
        //   addonRatePolicyHtml +
        //   "</div>";
        html += "</div>";
        html +=
          '<div class="p-2 bd-highlight">' +
          currency +
          '<span id="addOnFeesTotal' +
          counterAddon +
          '">' +
          price.toFixed(2) +
          "</span></div>";
        if (tax != "0.00") {
          tax = (price * tax) / 100;
          html +=
            '<div class="p-2 flex-grow-1 bd-highlight text-left PT2 PB2">' +
            addName +
            " Taxes</div>";
          html +=
            '<div class="p-2 bd-highlight col-lg-6 col-xs-5">' +
            currency +
            '<span id="addOnFeesTax' +
            counterAddon +
            '">' +
            tax.toFixed(2) +
            "</span></div>";
          // html += '<input type="hidden" name="addon_tax_percent_' + id + '[]" value="' + taxPercent + '"/>';
          // html += '<input type="hidden" name="addon_tax_amount_' + id + '[]" value="' + tax + '"/>';
          document.getElementById("addon_tax_percent_" + id).value = taxPercent;
          document.getElementById("addon_tax_amount_" + id).value = tax;
        }
        html += html_extra;
        // html += <><input type="hidden" id="addOnId" name="addOnId[]" defaultValue={id}  ref={ref=>addOnIdRef.current.push(ref)} onChange={()=>handleChangeSix(incr)} /></>
        document.getElementById("addOnId_" + id).value = id;

        document.getElementById("isAddOnFeesExist").value = "1";
        document.getElementById("addOnChargesAdded").value = counterAddon;
        let aP = document.getElementsByClassName("addOnPara");
        for (let a = 0; a < aP.length; a++) {
          aP[a].insertAdjacentHTML("beforeend", html);
        }

        updateGrandTotal();

        /* addon ids stored in localstorage START */
        if (typeof Storage !== "undefined") {
          addonids.push(id);
          let random1 = Math.floor(Math.random() * (90 - 65) + 65);
          let random2 = Math.floor(Math.random() * (122 - 97) + 97);
          let random3 = Math.floor(Math.random() * (90 - 65) + 65);
          let r = String.fromCharCode(random1);
          let j = String.fromCharCode(random2);
          let k = String.fromCharCode(random3);
          let enc = window.btoa(addonids) + r + j + k;
          window.localStorage.setItem("addons", enc);
        }
        /* addon ids stored in localstorage END */
      } else {
        if (document.getElementById("perItemAddon_" + id)) {
          if (document.getElementById("perItemAddon_" + id).checked) {
            document.getElementById("removeAddonPerItem_" + id).style.display =
              "none";
              setAddonPerItemButtonFlag(true);
            document.getElementById("Add_Addon_" + id).style.display = "block";
          }
        }

        document
          .getElementById(addName.replace(/\s+|\&|[_\W]+/g, "_"))
          .remove();

        if (document.getElementById("hideShowAddOn_" + id)) {
          document.getElementById("hideShowAddOn_" + id).style.display =
            "block";
          document.getElementById("hideShowAddOn_" + id).click();
        }

        document.getElementById("Add_Addon_" + id).classList.add("btn-success");
        document
          .getElementById("Add_Addon_" + id)
          .classList.remove("btn-danger", "removeAddon");
        document.getElementById("Add_Addon_" + id).value = "ADD";

        if (document.getElementById("addOnQuantity_" + id) !== null) {
          document
            .getElementById("addOnQuantity_" + id)
            .removeAttribute("disabled", "");
          document
            .getElementById("addOnQuantity_" + id)
            .setAttribute("enabled", "");
        }

        if (document.getElementById("perItemAddon_" + id) !== null) {
          document
            .getElementById("perItemAddon_" + id)
            .removeAttribute("disabled", "");
          document
            .getElementById("perItemAddon_" + id)
            .setAttribute("enabled", "");
        }

        if (document.getElementById("perNightAddon_" + id) !== null) {
          document
            .getElementById("perNightAddon_" + id)
            .removeAttribute("disabled", "");
          document
            .getElementById("perNightAddon_" + id)
            .setAttribute("enabled", "");
        }

        if (document.getElementById("perPersonAddon_" + id) !== null) {
          document
            .getElementById("perPersonAddon_" + id)
            .removeAttribute("disabled", "");
          document
            .getElementById("perPersonAddon_" + id)
            .setAttribute("enabled", "");
        }

        document.getElementById("addon_total_price_" + id).value = addonPrice;

        if (document.getElementsByClassName("anchorTagDiv_" + id)) {
          let aT = document.getElementsByClassName("anchorTagDiv_" + id);
          for (let a = 0; a < aT.length; a++) {
            aT[a].style.display = "none";
          }
        }

        if (document.getElementsByClassName("anchorTagPara_" + id)) {
          let aT = document.getElementsByClassName("anchorTagPara_" + id);
          for (let a = 0; a < aT.length; a++) {
            aT[a].style.innerHTML = "";
          }
        }

        let grandTotal = document.getElementById("grandTotal").innerHTML;
        let priceToRemove = price;

        if (tax != "0.00") {
          let taxToRemove = (priceToRemove * tax) / 100;
          priceToRemove = parseFloat(price) + parseFloat(taxToRemove);
        }

        let aOP = document.getElementsByClassName("addOnPara");
        for (let z = 0; z < aOP.length; z++) {
          if (aOP[z].innerHTML === "") {
            let sTD = document.getElementsByClassName("subTotalToDisplay");
            for (let s = 0; s < sTD.length; s++) {
              sTD[s].style.display = "none";
            }
          }
        }

        grandTotal = grandTotal - priceToRemove;
        document.getElementById("grandTotal").innerHTML = grandTotal.toFixed(2);

        /* unselected addon ids removed from localstorage START */
        if (typeof Storage !== "undefined") {
          for (let i = 0; i < addonids.length; i++) {
            if (addonids[i] === id) {
              addonids.splice(i, 1);
            }
          }
          let random1 = Math.floor(Math.random() * (90 - 65) + 65);
          let random2 = Math.floor(Math.random() * (122 - 97) + 97);
          let random3 = Math.floor(Math.random() * (90 - 65) + 65);
          let r = String.fromCharCode(random1);
          let j = String.fromCharCode(random2);
          let k = String.fromCharCode(random3);
          let enc = window.btoa(addonids) + r + j + k;
          window.localStorage.setItem("addons", enc);
        }
        /* unselected addon ids removed from localstorage END */
        document.getElementById("addOnId_" + id).value = "0";
        document.getElementById("addon_tax_percent_" + id).value = "0";
        document.getElementById("addon_tax_amount_" + id).value = "0";

        document.getElementById("perItemAddon" + id).value = "0";
        document.getElementById("perPersonAddon" + id).value = "0";
        document.getElementById("perNightAddon" + id).value = "0";
      }
      // open modal from summary
      if(document.getElementById('addOnModal_'+id)){
        document.getElementById('addOnModal_'+id).addEventListener('click', function(){
          addOnModalPopup(id);
        });
      }

    } else {
      alert("Oops, Addon Type is not mentioned!!");
      return false;
    }
  }

  const [clicked, setClicked] = useState(false);

  const toggle = (keyAddon) => {
    if (clicked === keyAddon) {
      //if clicked accordion is already active, then close it
      return setClicked(null);
    }
    setClicked(keyAddon);
  };

  let price = parseFloat(convertPrice) * parseFloat(val2.Price);
  let options = "";
  for (let k = 1; k <= parseInt(val2.Maximum_Buy); k++) {
    options += `<option value="${k}">${k}</option>`;
  }

  const [openaddonCollapse, setaddonCollapse] = useState(false);

  const toggleCollapse = function (keyAddon) {
    setaddonCollapse(!openaddonCollapse);
    toggle(keyAddon);
  };

  return (
    <>
      {/* <div>
        <Toggle as="div" {...getToggleProps()}>
          {isExpanded ? "Close" : "Open"}
        </Toggle>
        <Collapse {...getCollapseProps()}>{excerpt}</Collapse>
      </div> */}

      <div className="addOn-btn col-xl-1 col-lg-1 col-md-2 col-sm-12 addOn-priceDetails floatL text-xs-center">
        {/* <input type='hidden' id={'addOnAmount_' + keyAddon} name={'addOnAmount_' + keyAddon} defaultValue={price} ref={ref=>addOnAmountRef.current.push(ref)} onChange={()=>handleChange(keyAddon)} /> */}
        <input
          type="hidden"
          id={"addOnAmount_" + keyAddon}
          name={"addOnAmount_" + keyAddon}
          defaultValue={price}
        />

        <div
          className="addonsList"
          onClick={() => toggleCollapse(keyAddon)}
          aria-expanded={openaddonCollapse}
          aria-controls="collapseIdAddons"
        >
          {clicked === keyAddon ? (
            <FaMinusSquare size="40" id={"addonsminus_" + val2.Id} className='addonsminus' />
          ) : (
            <FaPlusSquare size="40" id={"addonsplus_" + val2.Id} />
          )}
        </div>
      </div>
      <Collapse in={openaddonCollapse}>
        <div className="pull-right col-12 floatL text-right quantityDiv">
          <span>Select Quantity</span>
          {/* onChange={()=>handleChangeTwo(keyAddon)} */}
          {/* <select id={'addOnQuantity_' + val2.Id} name={'addOnQuantity' + val2.Id} ref={ref=>addOnQuantityRef.current.push(ref)} > */}
          <select
            id={"addOnQuantity_" + val2.Id}
            name={"addOnQuantity" + val2.Id}
          >
            {ReactHtmlParser(options)}
          </select>
          {addonPerItemButtonFlag && <input
            id={"Add_Addon_" + val2.Id}
            value="ADD"
            type="button"
            className="border btn btn-success btn-lg"
            onClick={() =>
              selectAddon(
                `${val2.Id}`,
                `${val2.Name}`,
                `${val2.tax}`,
                `${price}`
              )
            }
          />}

          {/* <input type='hidden' id={'addon_total_price_' + val2.Id} name={'addon_total_price_' + val2.Id} defaultValue={price} ref={ref=>addon_total_priceRef.current.push(ref)} onChange={()=>handleChangeThree(keyAddon)} />
                                            <input type='hidden' id={'addon_quantity_' + val2.Id} name={'addon_quantity_' + val2.Id} defaultValue='1' ref={ref=>addon_quantityRef.current.push(ref)} onChange={()=>handleChangeFour(keyAddon)} />
                                            <input type='hidden' name={'addon_price_' + val2.Id} defaultValue={price} ref={ref=>addon_priceRef.current.push(ref)} onChange={()=>handleChangeFive(keyAddon)} /> */}
        </div>
      </Collapse>
    </>
  );
};
export default AddOnAccordion;
