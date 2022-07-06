import React, {useState} from "react";

import AddOnPerNightButton from './AddOnPerNightButton';

const AddOnAddButton = ({ val2, updateGrandTotal, addonids, handleperNightAddon, addOnModalPopup }) => {
  const [buttonFlag, setButtonFlag] = useState(true);

  function selectAddon(id, addName, tax, addonPrice) {
    let currency = document.getElementById("currencySign").value;
    let noOfNight = document.getElementById("noOfNights").value;
    let noOfRooms = document.getElementById("noOfRooms").value;

    if (
      document.getElementById("perNightAddon_" + id).checked ||
      document.getElementById("perItemAddon_" + id).checked ||
      document.getElementById("perPersonAddon_" + id).checked
    ) {
      let addon_quantity;
      if (document.getElementById("addOnQuantity_" + id) !== null) {
        addon_quantity = document.getElementById("addOnQuantity_" + id).value;
      }

      var price;
      if (document.getElementById("addon_total_price_" + id) !== null) {
        price = document.getElementById("addon_total_price_" + id).value;
      }

      if (document.getElementById("Add_Addon_" + id).value !== "Remove") {
        if (document.getElementById("perItemAddon_" + id) !== null) {
          if (document.getElementById("perItemAddon_" + id).checked) {
            document.getElementById("removeAddonPerItem_" + id).style.display =
              "block";
            document.getElementById("Add_Addon_" + id).style.display = "none";
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
            document.getElementById("perItemAddon" + id).value = "1";
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

        // if(addon_quantity !== undefined){
        document.getElementById("addon_quantity_" + id).value = addon_quantity;
        // }
        document.getElementById("addon_total_price_" + id).value = price;

        /*document
          .getElementById("Add_Addon_" + id)
          .classList.remove("btn-success");
        document.getElementById("Add_Addon_" + id).classList.add("btn-danger", "removeAddon");
        document.getElementById("Add_Addon_" + id).value = "Remove";*/

        /*if PERNIGHT addon then hide the ADD button and show the REMOVE button.
          This is done because when the popup was clicked the REMOVE button 
          would get change to ADD button because of state change */
        if(document.getElementById("perNightAddon" + id) !== null){
          setButtonFlag(false);
          // document.getElementById("Add_Addon_" + id).style.display='none';
          // document.getElementById("Add_Addon_Remove_" + id).style.display='block';
        }
          

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

        document
          .getElementById("perNightAddon_" + id)
          .removeAttribute("enabled", "");
        document
          .getElementById("perNightAddon_" + id)
          .setAttribute("disabled", "");

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
          '<div class="d-flex bd-highlight" id="' + addName.replace(/\s+|\&|[_\W]+/g, "_") + '">';
        html +=
          '<div class="p-2 flex-grow-1 bd-highlight">Add On - ' +
          addName +
          quantityHtml +
          "";
        html +=
          '<a style="display:inline-block" class="addOnModal" id="addOnModal_'+id+'" href="javascript:void(0)" data-toggle="modal" title="View Rate Policy" data-target="#viewAddonRatePolicy' +
          id +
          '">Policy</a>';
        // html +=
        //   '<div class="modal fade" id="viewAddonRatePolicy' +
        //   id +
        //   '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="display: none;" >' +
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
        // html += '<input type="hidden" id="addOnId" name="addOnId[]" value="' + id + '"/></div>'
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
        console.log(addName)
        if (document.getElementById("perItemAddon_" + id)) {
          if (document.getElementById("perItemAddon_" + id).checked) {
            document.getElementById("removeAddonPerItem_" + id).style.display =
              "none";
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

        /*document.getElementById("Add_Addon_" + id).classList.add("btn-success");
        document
          .getElementById("Add_Addon_" + id)
          .classList.remove("btn-danger", "removeAddon");
        document.getElementById("Add_Addon_" + id).value = "ADD";*/
        /*if PERNIGHT addon then hide the ADD button and show the REMOVE button.
          This is done because when the popup was clicked the REMOVE button 
          would get change to ADD button because of state change */
          if(document.getElementById("perNightAddon" + id) !== null){
            setButtonFlag(true);
            // document.getElementById("Add_Addon_" + id).style.display='block';
            // document.getElementById("Add_Addon_Remove_" + id).style.display='none';
          }

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

        if (tax !== "0.00") {
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

  return (
    <div className="col-xl-1 col-lg-1 col-md-2 col-sm-12 addOn-priceDetails floatL text-center  p-0 text-xs-center">
      {buttonFlag === false && <AddOnPerNightButton Id={val2.Id} Name={val2.Name} tax={val2.tax} Price={val2.Price} selectAddon={selectAddon}/>}
      {buttonFlag && <input
        type="button"
        id={"Add_Addon_" + val2.Id}
        value="ADD"
        className="border btn btn-success btn-lg addOn-btn"
        onClick={() =>
          selectAddon(
            `${val2.Id}`,
            `${val2.Name}`,
            `${val2.tax}`,
            `${val2.Price}`
          )
        }
      />}
    </div>
  );
};
export default AddOnAddButton;
