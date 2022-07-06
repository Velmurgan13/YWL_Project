import React, { useState, useEffect, useContext } from "react";
import {ReservationContext } from "../MainReservation";

const RoomSelectPromoButton = ({ selectPromoButton, selectPromoButtonHidden, updateGrandTotal, showDiscountDiv, scrollWindow, checkAvailabilityData }) => {
    useEffect(() => {
        // when clicked on SEARCH in CHECK-AVAILABILITY
        reRenderComponent();
    }, [checkAvailabilityData]);

    /*
    when clicked on SEARCH in CHECK-AVAILABILITY
    ==============================================
    this rerenderComponent() function is added to display all SELECT ROOM button
    when there is only one CANCEL ROOM button on the page and all 
    SELECT ROOM button are hidden.
    */
    const reRenderComponent = () => {
        let findSelectedButtons = document.getElementsByClassName('promoSelectButton');
        for (let f = 0; f < findSelectedButtons.length; f++) {
            if (findSelectedButtons[f].value === 'Cancel Room') {
                document.getElementById(findSelectedButtons[f].id).click();
            }
        }

        // if there is any "Not Available" room button then hide that room
        let notAvailableRoomButtons = document.getElementsByClassName('notAvailableRoom');
        for (let f = 0; f < notAvailableRoomButtons.length; f++) {
            notAvailableRoomButtons[f].style.display = 'none';
        }

        document.getElementById('tab_head_room_'+1).click();
        contentContext.setContentHTML([]);
    }

    const contentContext = useContext(ReservationContext);

    var contentHtml;
    var min_room = 0;
    var promoName = '';
    var promoCounter = 0;
    var otherRateIdMin = 0;
    let tmpArray = [];

    function showOnlyOneRatePlanIfAvailable(postFixId, roomLeft, discountLeft, discountPerDayLeft) {
        // console.log(`showOnlyOneRatePlanIfAvailable p: ${postFixId},${roomLeft},${discountLeft},${discountPerDayLeft}`)

        let numOfRooms = parseInt(document.getElementById('noOfRooms').value) - 1
        let isRoomSelected = 0;

        let roomSelected = document.getElementsByClassName('isRoomSelected')
        for (let r = 0; r < roomSelected.length; r++) {
            if (roomSelected[r].value === '1') {
                isRoomSelected++
            }
        }

        if (postFixId.match(/_/g) && isRoomSelected === 1) {
            let postFixIdNew = postFixId.split("_");
            let tmp = document.getElementById('min_room_count_' + postFixIdNew[1]).getAttribute('name');
            let roomType = document.getElementById(tmp).value

            // console.log('roomTypeAssignedToRatePlan'+ postFixIdNew[1])
            // let roomType = document.getElementById('roomTypeAssignedToRatePlan'+ postFixIdNew[1]).value

            if ((discountLeft >= numOfRooms || discountLeft == 'unlimited') && (discountPerDayLeft >= numOfRooms || discountPerDayLeft == 'unlimited') && roomType == 'all') {
                document.getElementById('showOnlyRatePlanForOtherRoom').value = '1'

                for (let e = 2; e <= document.getElementById('noOfRooms').value; e++) {
                    let promoHide = document.getElementsByClassName('ratePlanDivRoom_' + e)
                    for (let p = 0; p < promoHide.length; p++) {
                        promoHide[p].style.display = 'none';
                    }

                    let baseHide = document.getElementsByClassName('standardRateDivRoom_' + e)
                    for (let b = 0; b < baseHide.length; b++) {
                        baseHide[b].style.display = 'none';
                    }

                    let displayPromo = document.getElementsByClassName('showOnlyRatePlan_' + e + '_' + postFixIdNew[1])
                    for (let di = 0; di < displayPromo.length; di++) {
                        displayPromo[di].style.display = 'block'
                    }

                    let cl = document.getElementsByClassName('viewMoreRatePlans' + e)
                    for (let p = 0; p < cl.length; p++) {
                        cl[p].style.display = 'none'
                    }
                }
            }
        }
    }

    function roomSelection(i, idPostfix, valueRoomTypeId, nextId, isDealApplied, data) {
        // console.log('roomSelection: ', i, idPostfix, valueRoomTypeId, nextId, isDealApplied, data);

        let noOfRooms = parseInt(document.getElementById('noOfRooms').value)

        if (document.getElementById('radio' + idPostfix).value === '1') {
            if (nextId != 'step2') {
                document.getElementById(nextId).style.display = 'none'
            }

            /*if ($("#promoCodeRemoveButton").is(":visible")) {
                alert('Please remove the promotion code in order to cancel room.');
                return false;
            }*/

            let sel = document.getElementsByClassName('selectRoom' + i)
            for (let s = 0; s < sel.length; s++) {
                sel[s].style.display = 'block'
            }

            if (nextId == 'selectAddOnDiv') {
                document.getElementById('selectAddOnDiv').style.display = 'none'
                document.getElementById('stepNo').innerHTML = '2'
                document.getElementById('proceedCheckout').style.display = 'none'
            }

            document.getElementById('radio' + idPostfix).value = '0'

            if (idPostfix.match(/_/g)) {
                let postFixIdNew = idPostfix.split("_");
                document.getElementById('buttonAvailable' + i + valueRoomTypeId + '_' + postFixIdNew[1]).style.display = 'block'
                document.getElementById('buttonAvailable' + i + valueRoomTypeId + '_' + postFixIdNew[1]).classList.remove('btn-danger')
                document.getElementById('buttonAvailable' + i + valueRoomTypeId + '_' + postFixIdNew[1]).classList.add('btn-success')
                document.getElementById('buttonAvailable' + i + valueRoomTypeId + '_' + postFixIdNew[1]).value = 'Select Room'

                document.getElementById('OtherRate' + i).value = '0'
            } else {
                document.getElementById('buttonAvailable' + i + valueRoomTypeId).style.display = 'block'
                document.getElementById('buttonAvailable' + i + valueRoomTypeId).classList.remove('btn-danger')
                document.getElementById('buttonAvailable' + i + valueRoomTypeId).classList.add('btn-success')
                document.getElementById('buttonAvailable' + i + valueRoomTypeId).value = 'Select Room'
            }

            document.getElementById('roomRate' + i).innerHTML = '0.00'
            document.getElementById('roomTypeName' + i).innerHTML = ''
            document.getElementById('isRoomSelected' + i).value = '0'
            document.getElementById('extraAdultCharge' + i).innerHTML = '0.00'
            document.getElementById('extraChildCharge' + i).innerHTML = '0.00'

            if (document.getElementById('isDiscountSelected' + i).value === '1') {
                document.getElementById('isDiscountSelected' + i).value = '0'
                document.getElementById('discountCharge' + i).innerHTML = '0.00'
                document.getElementById('discountName' + i).innerHTML = ''

                let dis = document.getElementsByClassName('discountButton' + i)
                for (let d = 0; d < dis.length; d++) {
                    dis[d].classList.remove('cancel-room-btn')
                    dis[d].innerHTML = 'Select'
                    dis[d].style.display = 'block'
                }
            }

            if (document.getElementById('selectDiscountDiv' + i) !== null) {
                document.getElementById('selectDiscountDiv' + i).style.display = 'none'
            }

            if (document.getElementById('isOneTimeFeesExist').value === '1') {
                let oneTimeFeesTotal = parseFloat(document.getElementById('oneTimeFeesTotal').innerHTML) - parseFloat(document.getElementById('oneTimeFees').value) / noOfRooms
                document.getElementById('oneTimeFeesTotal').innerHTML = oneTimeFeesTotal.toFixed(2)
            }

            if (document.getElementById('isNightlyFeesExist').value === '1') {
                let oneTimeFeesTotal = parseFloat(document.getElementById('nightlyFeesTotal').innerHTML) - parseFloat(document.getElementById('nightlyFees').value) / noOfRooms
                document.getElementById('nightlyFeesTotal').innerHTML = oneTimeFeesTotal.toFixed(2)
            }

            let roomLeft = parseInt(document.getElementById('roomLeft' + valueRoomTypeId).value)
            roomLeft = roomLeft + 1
            document.getElementById('roomLeft' + valueRoomTypeId).value = roomLeft

            if (roomLeft > 0) {
                for (let rL = 1; rL <= noOfRooms; rL++) {
                    if (rL != i && document.getElementById('isRoomSelected' + rL).value === '0') {

                        let na = document.getElementsByClassName('naRoomTypeId' + rL + valueRoomTypeId)
                        for (let n = 0; n < na.length; n++) {
                            na[n].style.display = 'none'
                        }

                        let sl = document.getElementsByClassName('selectRoomTypeId' + rL + valueRoomTypeId)
                        for (let s = 0; s < sl.length; s++) {
                            sl[s].style.display = 'block'
                        }

                        if (document.getElementById('buttonNotAvailable' + rL + valueRoomTypeId)) {
                            document.getElementById('buttonNotAvailable' + rL + valueRoomTypeId).style.display = 'none'
                        }

                        if (document.getElementById('buttonAvailable' + rL + valueRoomTypeId)) {
                            document.getElementById('buttonAvailable' + rL + valueRoomTypeId).style.display = 'block'
                        }

                        let content = 'undefined'
                        if (document.getElementById('divTobeRemove' + rL)) {
                            content = document.getElementById('divTobeRemove' + rL).innerHTML
                        }
                        // let content = document.getElementById('divTobeRemove' + rL).innerHTML
                        if (content !== 'undefined') {
                            let contentHtml = `<div class="row m-xs-5">${content}</div>`

                            let eel = document.getElementById("roomTypeDivSelect" + rL);
                            let first; let firstId;

                            if (eel) {
                                for (let o = 0; o < eel.length; o++) {
                                    if (eel[o].style.display !== 'none') {
                                        first = o
                                    }
                                }
                            }

                            if (first) {
                                firstId = eel[first - 1].id
                            }

                            tmpArray.push(...contentContext.contentHTML, {
                                id: firstId,
                                html: contentHtml
                            });

                            contentContext.setContentHTML(tmpArray);

                            // ===== NEED TO BE DONE LATER start =====
                            // var myobj = document.getElementById('divTobeRemove' + rL);
                            // myobj.remove(); 
                            // document.getElementById(firstId).after(contentHtml)
                            // ===== NEED TO BE DONE LATER end =====

                        }
                    }

                    if (roomLeft == 1) {
                        document.getElementById('roomLeftText' + rL + valueRoomTypeId).innerHTML = `Only ${roomLeft} Room left`
                        document.getElementById('roomLeftText' + rL + valueRoomTypeId).style.display = 'block'
                    } else {
                        if (document.getElementById('roomLeftText' + rL + valueRoomTypeId)) {
                            document.getElementById('roomLeftText' + rL + valueRoomTypeId).innerHTML = `Only ${roomLeft} Rooms left`
                            document.getElementById('roomLeftText' + rL + valueRoomTypeId).style.display = 'block'
                        }
                    }
                }
            }

            if (idPostfix.match(/_/g)) {
                let postFixIdNew = idPostfix.split("_");

                let discountLeft = parseInt(document.getElementById('discountLeft' + postFixIdNew[1]).value)
                if (typeof (discountLeft) === 'number') {
                    discountLeft = discountLeft + 1;
                }

                if (discountLeft > 0) {
                    document.getElementById('discountLeft' + postFixIdNew[1]).value = discountLeft

                    for (let r = 1; r <= noOfRooms; r++) {
                        if (r != i && document.getElementById('isRoomSelected' + r).value === '0') {
                            let slD = document.getElementsByClassName('selectDiscount' + r + postFixIdNew[1])
                            for (let s = 0; s < slD.length; s++) {
                                slD[s].style.display = 'block'
                            }

                            let naD = document.getElementsByClassName('naDiscount' + r + postFixIdNew[1])
                            for (let n = 0; n < naD.length; n++) {
                                naD[n].style.display = 'none'
                            }
                        }

                        if (discountLeft === 1) {
                            let dLS = document.getElementsByClassName('discountLeftSentence' + r + postFixIdNew[1])
                            for (let d = 0; d < dLS.length; d++) {
                                dLS[d].innerHTML = `Only ${discountLeft} discount remaining`
                                dLS[d].style.display = 'block'
                            }
                        } else {
                            let dLS = document.getElementsByClassName('discountLeftSentence' + r + postFixIdNew[1])
                            for (let d = 0; d < dLS.length; d++) {
                                dLS[d].innerHTML = `Only ${discountLeft} discounts remaining`
                                dLS[d].style.display = 'block'
                            }
                        }
                    }
                }

                postFixIdNew = idPostfix.split("_");
                let discountPerDayLeft = document.getElementById('discountPerDayLeft' + postFixIdNew[1]).value

                if (typeof (discountPerDayLeft) === 'number' || discountPerDayLeft !== 'notAvailable') {
                    discountPerDayLeft = discountPerDayLeft + 1;
                } else if (discountPerDayLeft === 'notAvailable') {
                    discountPerDayLeft = 1;
                }

                if (discountPerDayLeft > 0) {

                    for (let r = 0; r <= noOfRooms; r++) {
                        if (r != i && document.getElementById('isRoomSelected' + r).value === '0') {
                            let slD = document.getElementsByClassName('selectDiscount' + r + postFixIdNew[1])
                            for (let s = 0; s < slD.length; s++) {
                                slD[s].style.display = 'block'
                            }

                            let naD = document.getElementsByClassName('naDiscount' + r + postFixIdNew[1])
                            for (let n = 0; n < naD.length; n++) {
                                naD[n].style.display = 'none'
                            }
                        }

                        if (discountPerDayLeft === 1) {
                            let dLS = document.getElementsByClassName('todaysDiscountLeftSentence' + r + postFixIdNew[1])
                            for (let d = 0; d < dLS.length; d++) {
                                dLS[d].innerHTML = `Only ${discountPerDayLeft} discount remaining`
                                dLS[d].style.display = 'block'
                            }
                        } else {
                            let dLS = document.getElementsByClassName('todaysDiscountLeftSentence' + r + postFixIdNew[1])
                            for (let d = 0; d < dLS.length; d++) {
                                dLS[d].innerHTML = `Only ${discountPerDayLeft} discounts remaining`
                                dLS[d].style.display = 'block'
                            }
                        }
                    }
                }
            }

            let el = document.getElementById('otherDiscountName' + i)
            if (el.style.display !== 'none') {
                document.getElementById('otherDiscountName' + i).style.display = 'none'
                document.getElementById('otherDiscountName' + i).innerHTML = ''
            }

            let showOnlyRatePlanForOtherRoom = document.getElementById('showOnlyRatePlanForOtherRoom').value
            if (showOnlyRatePlanForOtherRoom === '1') {
                document.getElementById('showOnlyRatePlanForOtherRoom').value = '0'

                for (let e = 2; e <= document.getElementById('noOfRooms').value; e++) {
                    let promoShow = document.getElementsByClassName('first-two')
                    for (let p = 0; p < promoShow.length; p++) {
                        promoShow[p].style.display = 'block';
                    }

                    let baseHide = document.getElementsByClassName('standardRateDivRoom_' + e)
                    for (let b = 0; b < baseHide.length; b++) {
                        baseHide[b].removeAttribute('style')
                    }
                }

                let cl = document.getElementsByClassName('viewMoreRatePlans' + i)
                for (let p = 0; p < cl.length; p++) {
                    cl[p].style.display = 'block'
                }
            }

            document.getElementById('otherDiscountName' + i).style.display = 'none'
            document.getElementById('specialCancellationPolicy' + i).style.display = 'none'
            document.getElementById('standardPolicy' + i).style.display = 'none'

            let isAllRoomSelected = 1;
            for (let j = 1; j <= noOfRooms; j++) {
                if (document.getElementById('isRoomSelected' + j).value === '0') {
                    isAllRoomSelected = 0;
                    break;
                }
            }

            if (isAllRoomSelected == 0 && i == 1) {
                let addOnPara = document.getElementsByClassName('addOnPara')
                for (let add = 0; add < addOnPara.length; add++) {
                    addOnPara[add].innerHTML = ''
                }

                let subTotalToDisplay = document.getElementsByClassName('subTotalToDisplay')
                for (let sub = 0; sub < subTotalToDisplay.length; sub++) {
                    subTotalToDisplay[sub].style.display = 'none'
                }

                document.getElementById('isAddOnFeesExist').value = '0'
                // $("input[id^='Add_Addon_']").val('ADD').removeClass('btn-danger').addClass('btn-success').show();
                // $("select[id^='addOnQuantity_']").val('1').trigger('change').removeAttr('disabled','');
                // $("input[id^='removeAddonPerItem_']").hide();
            }

            updateGrandTotal()

        } else {
            document.getElementById(nextId).style.display = 'block'
            i = parseInt(i);
            let isPreviousRoomSelected = 1;
            for (let j = 1; j < i; j++) {
                if (document.getElementById('isRoomSelected' + j).value === '0') {
                    isPreviousRoomSelected = 0;
                    break;
                }
            }

            if (isPreviousRoomSelected === 0) {
                let previousRoomNumber = i - 1;
                alert('Please select a room type assignment for Room ' + previousRoomNumber);

                let scrollToDiv = document.getElementById('selectRoomDiv' + previousRoomNumber);
                scrollToDiv.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
                return false;
            }

            if (nextId === 'selectAddOnDiv') {
                document.getElementById('selectAddOnDiv').style.display = 'block'
                document.getElementById('stepNo').innerHTML = '3'
                document.getElementById('proceedCheckout').style.display = 'block'
            }

            var selectRoomButtons = document.getElementsByClassName('selectRoom' + i);
            for (var j = 0; j < selectRoomButtons.length; j++) {
                selectRoomButtons[j].style.display = 'none';
            }

            if (idPostfix.match(/_/g)) {
                let idPostfixNew = idPostfix.split("_");

                document.getElementById('buttonAvailable' + i + valueRoomTypeId + '_' + idPostfixNew[1]).style.display = 'block'
                let element = document.getElementById("buttonAvailable" + i + valueRoomTypeId + "_" + idPostfixNew[1]);
                element.classList.remove("btn-success");
                element.classList.add("btn-danger");
                element.value = 'Cancel Room';
                element.style.display = 'block';

                document.getElementById('OtherRate' + i).value = idPostfixNew[1];
            } else {
                document.getElementById('buttonAvailable' + i + valueRoomTypeId).style.display = 'block';
                let element = document.getElementById('buttonAvailable' + i + valueRoomTypeId);
                element.classList.remove("btn-success");
                element.classList.add("btn-danger");
                element.value = 'Cancel Room';
                element.style.display = 'block';
            }

            document.getElementById('isRoomSelected' + i).value = '1'

            /*if (isDealApplied == 0) {
                document.getElementById('selectDiscountDiv' + i).style.display = 'block'
            }else {
                document.getElementById('selectDiscountDiv' + i).style.display = 'none'
            }*/

            let roomLeft = parseInt(document.getElementById('roomLeft' + valueRoomTypeId).value) - 1;
            document.getElementById('roomLeft' + valueRoomTypeId).value = roomLeft

            if (roomLeft === 0) {

                for (let k = 1; k <= noOfRooms; k++) {

                    if (document.getElementById('roomLeftText' + k + valueRoomTypeId)) {
                        document.getElementById('roomLeftText' + k + valueRoomTypeId).innerHTML = ''
                        document.getElementById('roomLeftText' + k + valueRoomTypeId).style.display = 'none'
                    }

                    if (k !== i && document.getElementById('isRoomSelected' + k).value === '0') {

                        let el = document.getElementsByClassName('naRoomTypeId' + k + valueRoomTypeId);
                        for (let c = 0; c < el.length; c++) {
                            el[c].style.display = 'block';
                            el[c].classList.add("selectRoom" + k);
                        }

                        let ele = document.getElementsByClassName('selectRoomTypeId' + k + valueRoomTypeId);
                        for (let c = 0; c < ele.length; c++) {
                            ele[c].style.display = 'none';
                        }

                        if (document.getElementById('buttonNotAvailable' + k + valueRoomTypeId)) {
                            let elem = document.getElementById('buttonNotAvailable' + k + valueRoomTypeId);
                            for (let c = 0; c < elem.length; c++) {
                                elem[c].style.display = 'block';
                                elem[c].classList.add("selectRoom" + k);
                            }
                        }

                        if (document.getElementById('buttonAvailable' + i + valueRoomTypeId)) {
                            document.getElementById('buttonAvailable' + i + valueRoomTypeId).style.display = 'none';
                        }

                        let content = '';
                        let elemem = document.getElementsByClassName('div' + k + valueRoomTypeId);
                        for (let c = 0; c < elemem.length; c++) {
                            content = elemem[c].innerHTML
                        }

                        if (typeof (content) !== 'undefined') {
                            contentHtml = `<div id="divTobeRemove${k}" class="row m-xs-5">${content}</div>`

                            let eel = document.getElementsByClassName("roomTypeDivSelect" + k);
                            let last; let lastId;

                            if (eel) {
                                for (let o = 0; o < eel.length; o++) {
                                    if (eel[o].style.display !== 'none') {
                                        last = o
                                    }
                                }
                            }

                            if (last) {
                                lastId = eel[last - 1].id
                            }

                            tmpArray.push(...contentContext.contentHTML, {
                                id: lastId,
                                html: contentHtml
                            });

                            contentContext.setContentHTML(tmpArray);

                            // ===== NEED TO BE DONE LATER start =====
                            var myobj = document.getElementById('roomTypeDivToToggle' + k + valueRoomTypeId);
                            myobj.remove(); 
                            // document.getElementById(lastId).after(contentHtml)
                            // ===== NEED TO BE DONE LATER end =====
                        }

                        let e = document.getElementById('buttonAvailable' + k + valueRoomTypeId)
                        e.classList.remove('selectRoom' + k);
                        let cl = document.getElementsByClassName('roomSelection' + k + valueRoomTypeId)
                        for (let jk = 0; jk < cl.length; jk++) {
                            cl[jk].classList.remove('selectRoom' + k)
                        }

                    }
                }
            } else {
                for (let n = 1; n <= noOfRooms; n++) {
                    if (roomLeft === 1) {
                        document.getElementById('roomLeftText' + n + valueRoomTypeId).innerText = 'Only ' + roomLeft + ' Room left'
                    } else {
                        if (document.getElementById('roomLeftText' + n + valueRoomTypeId) != null) {
                            document.getElementById('roomLeftText' + n + valueRoomTypeId).innerText = 'Only ' + roomLeft + ' Rooms left'
                        }
                    }
                }
            }

            if (idPostfix.match(/_/g)) {
                let postFixIdNew = idPostfix.split("_");
                var discountLeft = 'unlimited';

                if (document.getElementById('discountLeft' + postFixIdNew[1]).value !== '0' && document.getElementById('discountLeft' + postFixIdNew[1]).value !== 'unlimited') {
                    discountLeft = parseInt(document.getElementById('discountLeft' + postFixIdNew[1]).value) - 1
                    document.getElementById('discountLeft' + postFixIdNew[1]).value = discountLeft

                    if (discountLeft === 0) {
                        for (let n = 1; n <= noOfRooms; n++) {
                            if (n != i && document.getElementById('isRoomSelected' + n).value === '0') {

                                let z = document.getElementsByClassName('selectDiscount' + n + postFixIdNew[1])
                                for (let i = 0; i < z.length; i++) {
                                    z[i].style.display = 'none'
                                }

                                let z1 = document.getElementsByClassName('naDiscount' + n + postFixIdNew[1])
                                for (let i = 0; i < z1.length; i++) {
                                    z1[i].style.display = 'block'
                                    z1[i].classList.add("selectRoom" + i);
                                }
                            }

                            let discLeft = document.getElementsByClassName('discountLeftSentence' + n + postFixIdNew[1])
                            for (let d = 0; d < discLeft.length; d++) {
                                discLeft[d].innerHTML = ''
                                discLeft[d].style.display = 'none'
                            }
                        }
                    } else {
                        for (let n = 1; n <= noOfRooms; n++) {
                            let discLeft = document.getElementsByClassName('discountLeftSentence' + n + postFixIdNew[1])
                            if (discountLeft === 1) {
                                for (let d = 0; d < discLeft.length; d++) {
                                    discLeft[d].innerHTML = 'Only ' + discountLeft + ' discount remaining'
                                    discLeft[d].style.display = 'block'
                                }
                            } else {
                                for (let d = 0; d < discLeft.length; d++) {
                                    discLeft[d].innerHTML = 'Only ' + discountLeft + ' discounts remaining'
                                    discLeft[d].style.display = 'block'
                                }
                            }
                        }
                    }
                }

                postFixIdNew = idPostfix.split("_");
                var discountPerDayLeft = 'unlimited';

                if (document.getElementById('discountPerDayLeft' + postFixIdNew[1]).value !== '0' && document.getElementById('discountPerDayLeft' + postFixIdNew[1]).value !== 'unlimited') {
                    if (document.getElementById('discountPerDayLeft' + postFixIdNew[1]).value !== '1' && document.getElementById('discountPerDayLeft' + postFixIdNew[1]).value !== 'notAvailable') {
                        discountPerDayLeft = parseInt(document.getElementById('discountPerDayLeft' + postFixIdNew[1]).value) - 1;
                    } else {
                        discountPerDayLeft = 'notAvailable';
                    }
                    document.getElementById('discountPerDayLeft' + postFixIdNew[1]).value = discountPerDayLeft

                    if (discountPerDayLeft === 0 || discountPerDayLeft == 'notAvailable') {
                        for (let n = 1; n <= noOfRooms; n++) {
                            if (n != i && document.getElementById('isRoomSelected' + n).value == '0') {

                                let discPerCount = document.getElementsByClassName('selectDiscount' + n + postFixIdNew[1])
                                for (let d = 0; d < discPerCount.length; d++) {
                                    discPerCount[d].style.display = 'none'
                                    discPerCount[d].classList.remove('selectRoom' + n)
                                }

                                let discPerCounts = document.getElementsByClassName('naDiscount' + n + postFixIdNew[1])
                                for (let d = 0; d < discPerCounts.length; d++) {
                                    discPerCounts[d].style.display = 'block'
                                    discPerCounts[d].classList.add('selectRoom' + n)
                                }
                            }

                            let t = document.getElementsByClassName('todaysDiscountLeftSentence' + n + postFixIdNew[1])
                            for (let n = 0; n < t.length; n++) {
                                t[n].innerHTML = ''
                                t[n].style.display = 'none'
                            }
                        }
                    } else {
                        for (let n = 1; n <= noOfRooms; n++) {
                            let c = document.getElementsByClassName('todaysDiscountLeftSentence' + n + postFixIdNew[1])
                            if (discountPerDayLeft === 1) {
                                for (let m = 0; m < c.length; m++) {
                                    c[m].innerHTML = 'Only ' + discountPerDayLeft + ' discount remaining for today'
                                    c[m].style.display = 'block'
                                }
                            } else {
                                for (let m = 0; m < c.length; m++) {
                                    c[m].innerHTML = 'Only ' + discountPerDayLeft + ' discounts remaining for today'
                                    c[m].style.display = 'block'
                                }
                            }
                        }
                    }

                }
            }

            if (i === 1 && idPostfix.match(/_/g)) {
                showOnlyOneRatePlanIfAvailable(idPostfix, roomLeft, discountLeft, discountPerDayLeft);
            }

            document.getElementById('isDealSelected' + i).value = isDealApplied
            document.getElementById('selectedRoomTypeId' + i).value = valueRoomTypeId
            document.getElementById('radio' + idPostfix).value = '1'
            document.getElementById('radio' + idPostfix).click()

            var nextRoomNo = nextId.replace(/[^0-9]/g, '');
            if (nextRoomNo !== '') {
                // console.log(typeof (nextRoomNo))
                let c = document.getElementById('tab_head_room_' + nextRoomNo)
                c.classList.remove('disabled')
                c.addEventListener('click', function () {
                    showDiscountDiv(nextRoomNo, noOfRooms);
                })
            }

            scrollWindow(nextId, i)
        }

        if (noOfRooms > 1) {
            if (parseInt(document.getElementById('OtherRate' + i).value) !== 0) {
                let otherRateId = document.getElementById('OtherRate' + i).value

                if (parseInt(document.getElementById('min_room_count_' + otherRateId).value) !== 0) {
                    for (let r = 1; r <= noOfRooms; r++) {
                        let promoID = document.getElementById('OtherRate' + r).value;

                        if (document.getElementById('min_room_count_' + promoID).value !== 0) {
                            let tempRoom = document.getElementById('min_room_count_' + promoID).value
                            let tempName = document.getElementById('min_room_count_' + promoID).getAttribute("name")

                            if (document.getElementById('min_room_count_' + promoID).value === undefined) {
                                tempRoom = min_room;
                                tempName = promoName;
                                promoID = otherRateIdMin;
                            }

                            if (min_room == 0) {
                                min_room = tempRoom;
                                promoName = tempName;
                                otherRateIdMin = promoID;
                            } else if (tempRoom >= min_room) {
                                min_room = tempRoom;
                                promoName = tempName;
                                otherRateIdMin = promoID;
                            } else if (tempRoom != min_room) {

                                if (tempRoom == 0) {
                                    if (tempName == 'phantom' || tempName == 'rack' || tempName == 'base') {
                                        let newCounter = 0;
                                        for (let s = 1; s <= noOfRooms; s++) {
                                            var customID = document.getElementById('OtherRate' + s).value;
                                            if (document.getElementById('min_room_count_' + customID).getAttribute("name") === 'phantom'
                                                || document.getElementById('min_room_count_' + customID).getAttribute("name") === 'rack'
                                                || document.getElementById('min_room_count_' + customID).getAttribute("name") === 'base') {
                                                newCounter++;
                                            }
                                        }
                                        if (newCounter == noOfRooms) {
                                            min_room = 0;
                                            promoName = '';
                                            otherRateIdMin = customID;
                                            return false;
                                        } else {
                                            tempRoom = min_room;
                                            tempName = promoName;
                                            promoID = otherRateIdMin;
                                        }
                                    } else {
                                        let roomCount = [];
                                        for (var s = 1; s <= noOfRooms; s++) {
                                            promoID = document.getElementById('OtherRate' + s).value;
                                            if (min_room <= document.getElementById('min_room_count_' + promoID).value) {
                                                otherRateIdMin = document.getElementById('OtherRate' + s).value;
                                                min_room = document.getElementById('min_room_count_' + promoID).value;
                                                promoName = document.getElementById('min_room_count_' + promoID).getAttribute("name");
                                            } else {
                                                promoID = document.getElementById('OtherRate' + s).value

                                                if (promoID === undefined) {
                                                    roomCount.push(parseInt("0"));
                                                } else {
                                                    var value = document.getElementById('min_room_count_' + promoID).value;
                                                    roomCount.push(parseInt(value));
                                                }
                                            }
                                        }

                                        let status = 0;
                                        for (let num = 0; num < noOfRooms; num++) {
                                            if (roomCount[num] == 0) {
                                                status++;
                                            }
                                        }

                                        if (status == noOfRooms) {
                                            min_room = 0;
                                            promoName = '';
                                            otherRateIdMin = '';
                                        }
                                    }
                                } else if (tempRoom < min_room && tempRoom > 0) {
                                    for (let s = 1; s <= noOfRooms; s++) {
                                        if (document.getElementById('OtherRate' + s).value == otherRateIdMin) {
                                            return false;
                                        }
                                    }

                                    min_room = document.getElementById('min_room_count_' + promoID).value;
                                    promoName = document.getElementById('min_room_count_' + promoID).getAttribute('name');
                                    otherRateIdMin = promoID;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    function popupOpenPromo(id, roomNumber, noOfRooms) {
        let current = 0;

        let tab = document.getElementsByClassName('tab_head_room')
        for (let c = 0; c < tab.length; c++) {
            if (tab[c].classList.contains('active')) {
                current = c + 1;
            }
            if (current !== 0) {
                break;
            }
        }

        let x = document.getElementById('selectRoomDiv' + roomNumber);
        if (window.getComputedStyle(x).display === "none") {
            showDiscountDiv(roomNumber, noOfRooms);
        }
        document.getElementById(id).click()

        if (parseInt(roomNumber) !== parseInt(current)) {
            showDiscountDiv(current, noOfRooms);
        }
    }

    function updatePriceTable(roomNumber, avgBaseRate, avgDiscountRate, extraAdultCharge, extraChildCharge, roomTypeName, roomTypeId, otherDiscountName, otherDiscountID) {
        // console.log(roomNumber, avgBaseRate, avgDiscountRate, extraAdultCharge, extraChildCharge, roomTypeName, roomTypeId, otherDiscountName, otherDiscountID);

        let noOfNights = parseInt(document.getElementById('noOfNights').value)
        let noOfRooms = parseInt(document.getElementById('noOfRooms').value)

        avgBaseRate = parseFloat(avgBaseRate);
        avgDiscountRate = parseFloat(avgDiscountRate);
        extraAdultCharge = parseFloat(extraAdultCharge);
        extraChildCharge = parseFloat(extraChildCharge);

        document.formReservation.elements['roomTypeId' + roomNumber].value = roomTypeId;
        document.formReservation.elements['roomTypeName' + roomNumber].value = roomTypeName;
        document.formReservation.elements['avgBaseRate' + roomNumber].value = avgBaseRate.toFixed(2);
        document.formReservation.elements['avgDiscountRate' + roomNumber].value = avgDiscountRate.toFixed(2);

        document.getElementById('roomTypeName' + roomNumber).innerHTML = roomTypeName;
        document.getElementById('roomRate' + roomNumber).innerHTML = (avgDiscountRate * noOfNights).toFixed(2);
        document.getElementById('baseRate' + roomNumber).innerHTML = avgBaseRate.toFixed(2);
        document.getElementById('discountRate' + roomNumber).innerHTML = avgDiscountRate.toFixed(2);

        document.getElementById('extraAdultCharge' + roomNumber).innerHTML = (extraAdultCharge * noOfNights).toFixed(2);
        document.getElementById('extraChildCharge' + roomNumber).innerHTML = (extraChildCharge * noOfNights).toFixed(2);

        if (otherDiscountName != 'undefined') {
            let i = otherDiscountName.indexOf('(');
            let discountname = otherDiscountName.substring(0, i);
            if (discountname == '') {
                discountname = otherDiscountName;
            }

            let specialCancellationPolicy = ''
            // let specialCancelElement = document.getElementById('special_cancellation_policy_'+roomTypeId);
            // console.log(specialCancelElement);
            if (document.getElementById('special_cancellation_policy_' + roomTypeId) != null) {
                specialCancellationPolicy = parseInt(document.getElementById('special_cancellation_policy_' + roomTypeId).value);
            }


            let hmtlToAdd = otherDiscountName + `<a href="javascript:void(0)" id=${'showPolicyPromo_' + roomNumber}> Rate Policy</a>`;
            /*
            let hmtlToAdd = otherDiscountName + ' <a href="javascript:void(0)" data-toggle="modal" data-target="#showPolicy_' + roomNumber + '" >Rate Policy</a>';
            hmtlToAdd += '<div class="red P0">';
            hmtlToAdd += '<div class="modal fade" id="showPolicy_' + roomNumber + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="display: none;">';
            hmtlToAdd += '<div class="modal-dialog" role="document">';
            hmtlToAdd += '<div class="modal-content">';
            hmtlToAdd += '<div class="modal-header">';
            hmtlToAdd += '<div class="modal-title text-uppercase black PB15 BB text-center F20" id="exampleModalLabel"><div>Rate Policy for ' + discountname + '</div></div>';
            hmtlToAdd += '<button type="button" class="close" data-dismiss="modal" aria-label="Close" title="Close">';
            hmtlToAdd += '<img src="assets/images/close.jpg" alt="Close" title="Close" />';
            hmtlToAdd += '</button>';
            hmtlToAdd += '</div>';
            hmtlToAdd += '<div class="max-content"><div class="light_grey MR20 ML20 text-left black MB20 P0">'
            hmtlToAdd += '<div class="PT10 PB10 PL10 PR10 grey1 white inline-block text-uppercase" align="left" id="">Rate Plan Description</div>'

            if (document.getElementById('is_mews_property') != null) {
                if (document.getElementById('is_mews_property').length > 0 && document.getElementById('is_mews_property').value === '1') {
                    if (document.getElementById('ratePlanDesc_' + roomNumber + '_' + roomTypeId + '_' + otherDiscountID) != null) {
                        hmtlToAdd += '<div class="modal-body text-justify black PT10">' + document.getElementById('ratePlanDesc_' + roomNumber + '_' + roomTypeId + '_' + otherDiscountID).innerText + '</div>';
                    }
                }
            } else {
                if (document.getElementById('ratePlanDesc_' + otherDiscountID) != null) {
                    hmtlToAdd += '<div class="modal-body text-justify black PT10">' + document.getElementById('ratePlanDesc_' + otherDiscountID).innerText + '</div>';
                }
            }

            hmtlToAdd += '</div>';
            hmtlToAdd += '<div class="light_grey MR20 ML20 text-left black MB20 P0">'
            hmtlToAdd += '<div class="PT10 PB10 PL10 PR10 grey1 white inline-block text-uppercase" align="left" id="">Rate Plan Policies</div>';

            if (document.getElementById('is_mews_property') != null) {
                if (document.getElementById('is_mews_property').length > 0 && document.getElementById('is_mews_property').value === '1') {
                    if (document.getElementById('ratePlanPolicy_' + roomNumber + '_' + roomTypeId + '_' + otherDiscountID) != null) {
                        hmtlToAdd += '<div class="modal-body text-justify black PT10">' + document.getElementById('ratePlanPolicy_' + roomNumber + '_' + roomTypeId + '_' + otherDiscountID).innerText + '</div></div>';
                    }
                }
            } else {
                if (document.getElementById('ratePlanPolicy_' + otherDiscountID) != null) {
                    hmtlToAdd += '<div class="modal-body text-justify black PT10">' + document.getElementById('ratePlanPolicy_' + otherDiscountID).innerText + '</div></div>';
                }
            }

            if (document.getElementById('ratePlanCustomCancellationPolicy_' + otherDiscountID) != null) {
                if (document.getElementById('ratePlanCustomCancellationPolicy_' + otherDiscountID).length != 0) {
                    hmtlToAdd += '<div class="light_grey MR20 ML20 text-left black MB20 P0"><div class="PT10 PB10 PL10 PR10 grey1 white inline-block text-uppercase" id="" align="left">Cancellation Policy</div><div class="modal-body text-justify black PT10">';
                    hmtlToAdd += '' + document.getElementById('ratePlanCustomCancellationPolicy_' + otherDiscountID).innerHTML + '</div></div>';
                }
            }
            else if (!isNaN(specialCancellationPolicy)) {
                hmtlToAdd += '<div class="light_grey MR20 ML20 text-left black MB20 P0"><div class="PT10 PB10 PL10 PR10 grey1 white inline-block text-uppercase" id="" align="left">Cancellation Policy</div><div class="modal-body text-justify black PT10"><ul class="PL15"><li>';
                hmtlToAdd += 'We have a ';
                if (specialCancellationPolicy <= 72) {
                    hmtlToAdd += specialCancellationPolicy + ' Hour';
                }
                else {
                    hmtlToAdd += specialCancellationPolicy / 24 + ' Day';
                }

                if (document.getElementById('specialCancellationPolicyDesc_' + otherDiscountID) != null) {
                    hmtlToAdd += ' Cancellation Policy</li><li>' + document.getElementById('specialCancellationPolicyDesc_' + otherDiscountID).innerHTML + '</li></ul>';
                }
            }
            hmtlToAdd += '</div></div>';
            hmtlToAdd += '</div></div></div>';
            */

            if (document.getElementById('otherDiscountName' + roomNumber) != null) {
                document.getElementById('otherDiscountName' + roomNumber).innerHTML = hmtlToAdd
                document.getElementById('otherDiscountName' + roomNumber).style.display = 'block'
            }

            document.getElementById('showPolicyPromo_' + roomNumber).addEventListener('click', function () {
                popupOpenPromo(roomNumber + otherDiscountID, roomNumber, document.getElementById('noOfRooms').value);
            })
        } else {
            let specialCancellationPolicy = 0
            if (document.getElementById('special_cancellation_policy_' + roomTypeId) != null) {
                specialCancellationPolicy = parseInt(document.getElementById('special_cancellation_policy_' + roomTypeId).value)
            }

            if (!isNaN(specialCancellationPolicy) && specialCancellationPolicy !== 0) {
                let hmtlToAdd = `<a href='javascript:void(0)' id=${'cancelPolicyPromo' + roomNumber + roomTypeId} >Cancellation Policy</a>`;
                /*
                let hmtlToAdd = ' <a  href="javascript:void(0)" data-toggle="modal" data-target="#showCancellationPolicy_' + roomNumber + '" >Cancellation Policy</a>';
                hmtlToAdd += '<div class="P0">';
                hmtlToAdd += '<div class="modal fade" id="showCancellationPolicy_' + roomNumber + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="display: none;">';
                hmtlToAdd += '<div class="modal-dialog" role="document">';
                hmtlToAdd += '<div class="modal-content">';
                hmtlToAdd += '<div class="modal-header">';
                hmtlToAdd += '<div class="modal-title text-uppercase black PB15 BB text-center F20" id="exampleModalLabel"><div>Special Cancellation Policy</div></div>';
                hmtlToAdd += '<button type="button" class="close" data-dismiss="modal" aria-label="Close" title="Close">';
                hmtlToAdd += '<img src="assets/images/close.jpg" alt="Close" title="Close" />';
                hmtlToAdd += '</button>';
                hmtlToAdd += '</div>';
                hmtlToAdd += '<div class="PT10 PB10 PL10 PR10 grey1 white inline-block text-uppercase ML20" id="" align="left">Cancellation Policy</div>';
                hmtlToAdd += '<div class="max-content"><div class="light_grey MR20 ML20 text-left black MB20 P0"><div class="modal-body text-justify black PT10">'
                hmtlToAdd += '<ul class="MT10 PL15"><li class="MT5">We have a ';
                if (specialCancellationPolicy <= 72) {
                    hmtlToAdd += specialCancellationPolicy + ' Hour';
                } else {
                    hmtlToAdd += specialCancellationPolicy / 24 + ' Day';
                }


                if (document.getElementById('specialCancellationPolicyDesc_' + roomTypeId) != null) {
                    hmtlToAdd += ' Cancellation Policy</li><li class="MT5">' + document.getElementById('specialCancellationPolicyDesc_' + roomTypeId).innerHTML + '</li></ul></div>';
                }
                hmtlToAdd += '</div>';
                hmtlToAdd += '</div></div>';
                hmtlToAdd += '</div></div></div></div>';
                */

                if (document.getElementById('specialCancellationPolicy' + roomNumber) != null) {
                    document.getElementById('specialCancellationPolicy' + roomNumber).innerHTML = hmtlToAdd
                    document.getElementById('specialCancellationPolicy' + roomNumber).style.display = 'block'
                }

                document.getElementById('cancelPolicyPromo' + roomNumber + roomTypeId).addEventListener('click', function () {
                    popupOpenPromo(roomNumber + otherDiscountID, roomNumber, document.getElementById('noOfRooms').value);
                })
            } else {
                let hmtlToAdd = `<a href='javascript:void(0)' id=${'standardPolicyPromo_' + roomNumber}> Rate Policy</a>`;
                /*
                let hmtlToAdd = ' <a  href="javascript:void(0)" data-toggle="modal" data-target="#standardPolicy_' + roomNumber + '" >Rate Policy</a>';
                hmtlToAdd += '<div class="P0">';
                hmtlToAdd += '<div class="modal fade" id="standardPolicy_' + roomNumber + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="display: none;">';
                hmtlToAdd += '<div class="modal-dialog" role="document">';
                hmtlToAdd += '<div class="modal-content">';
                hmtlToAdd += '<div class="modal-header">';
                hmtlToAdd += '<div class="modal-title text-uppercase black PB15 BB text-center F20" id="exampleModalLabel"><div>Cancellation Details</div></div>';
                hmtlToAdd += '<button type="button" class="close" data-dismiss="modal" aria-label="Close" title="Close">';
                hmtlToAdd += '<img src="assets/images/close.jpg" alt="Close" title="Close" />';
                hmtlToAdd += '</button>';
                hmtlToAdd += '</div>';
                hmtlToAdd += '<div class="PT10 PB10 PL10 PR10 grey1 white inline-block text-uppercase ML20" id="" align="left">Cancellation Details</div>';
                hmtlToAdd += '<div class="max-content"><div class="light_grey MR20 ML20 text-left black MB20 P0"><div class="modal-body text-justify black PT10">'

                if (document.getElementById('standardHour_' + roomNumber + '_' + roomTypeId) != null) {
                    hmtlToAdd += '<ul class="MT10 PL15"><li class="MT5">' + document.getElementById('standardHour_' + roomNumber + '_' + roomTypeId).innerHTML + '</li>';
                }
                if (document.getElementById('standardDesc_' + roomNumber + '_' + roomTypeId) != null) {
                    hmtlToAdd += '<ul class="MT10 PL15"><li class="MT5">' + document.getElementById('standardDesc_' + roomNumber + '_' + roomTypeId).innerHTML + '</li>';
                }

                hmtlToAdd += '</div>';
                hmtlToAdd += '</div></div>';
                hmtlToAdd += '</div></div></div></div>';
                */

                if (document.getElementById('standardPolicy' + roomNumber) != null) {
                    document.getElementById('standardPolicy' + roomNumber).innerHTML = hmtlToAdd
                    document.getElementById('standardPolicy' + roomNumber).style.display = 'block'
                }

                document.getElementById('standardPolicyPromo_' + roomNumber).addEventListener('click', function () {
                    popupOpenPromo(roomNumber + otherDiscountID, roomNumber, document.getElementById('noOfRooms').value);
                })
            }
        }

        if (document.getElementById('isOneTimeFeesExist').value === '1') {
            let oneTimeFeesTotal = parseFloat(document.getElementById('oneTimeFeesTotal').innerText) + parseFloat(document.getElementById('oneTimeFees').value) / noOfRooms
            document.getElementById('oneTimeFeesTotal').innerHTML = (oneTimeFeesTotal).toFixed(2)
        }

        if (document.getElementById('isNightlyFeesExist').value === '1') {
            let nightlyFeesTotal = parseFloat(document.getElementById('nightlyFeesTotal').innerText) + parseFloat(document.getElementById('nightlyFees').value) / noOfRooms
            document.getElementById('nightlyFeesTotal').innerHTML = (nightlyFeesTotal).toFixed(2)
        }

        updateGrandTotal()
    }


    if (selectPromoButton && selectPromoButton.length > 0) {
        var i = selectPromoButton[0]
        var idPostfix = selectPromoButton[1]
        var valueRoomTypeId = selectPromoButton[2]
        var nextId = selectPromoButton[3]
        var isDealApplied = selectPromoButton[4]
        // console.log('selectButtonArray', i);
    }

    if (selectPromoButtonHidden && selectPromoButtonHidden.length > 0) {
        var roomBaseCharge = selectPromoButtonHidden[1]
        var roomDiscountCharge = selectPromoButtonHidden[2]
        var extraAdultCharge = selectPromoButtonHidden[3]
        var extraChildCharge = selectPromoButtonHidden[4]
        var valueRoomTypeName = selectPromoButtonHidden[5]
        if (selectPromoButtonHidden[7] != '') {
            var BestDiscountName = selectPromoButtonHidden[7]
        } else {
            var BestDiscountName = ''
        }
        if (selectPromoButtonHidden[8] != '') {
            var pc_id = selectPromoButtonHidden[8]
        } else {
            var pc_id = ''
        }
        // console.log('selectButtonHiddenArray', selectButtonHidden);
    }


    return (
        <>
            <input type="hidden"
                onClick={() => updatePriceTable(`${i}`, `${roomBaseCharge}`, `${roomDiscountCharge}`, `${extraAdultCharge}`, `${extraChildCharge}`, `${valueRoomTypeName}`, `${valueRoomTypeId}`, `${BestDiscountName}`, `${pc_id}`)}
                Value="0" id={'radio' + idPostfix + '_' + pc_id} />

            <input type="button"
                onClick={() => roomSelection(`${i}`, `${idPostfix + '_' + pc_id}`, `${valueRoomTypeId}`, `${nextId}`, `${isDealApplied}`, this)}
                Value={"Select Room"} title="Select Room" id={'buttonAvailable' + i + valueRoomTypeId + '_' + pc_id} className={`selectRoomTypeId${i}${valueRoomTypeId} selectRoom${i} btn btn-success but_bg1 F16 notranslate roomSelection${i}${valueRoomTypeId} promoSelectButton`} />

        </>
    )

}

export default RoomSelectPromoButton