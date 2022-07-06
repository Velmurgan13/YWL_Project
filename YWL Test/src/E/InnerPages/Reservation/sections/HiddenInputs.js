import React from "react";

const HiddenInputs = ({ isRoomSelectedRef, isDealSelectedRef,
    isDiscountSelectedRef, selectedRoomTypeIdRef,
    baseRateRef,
    discountRateRef,
    OtherRateRef, showOnlyRatePlanForOtherRoomRef, counter,
    roomTypeIdRef, roomTypeNameRef, avgBaseRateRef, avgDiscountRateRef }) => {

    function handleChange(i) {
        isRoomSelectedRef.current[i + 1].focus();
    }

    function handleChangeOne(i) {
        isDealSelectedRef.current[i + 1].focus();
    }

    function handleChangeTwo(i) {
        isDiscountSelectedRef.current[i + 1].focus();
    }

    function handleChangeThree(i) {
        selectedRoomTypeIdRef.current[i + 1].focus();
    }

    function handleChangeFour(i) {
        baseRateRef.current[i + 1].focus();
    }

    function handleChangeFive(i) {
        discountRateRef.current[i + 1].focus();
    }

    function handleChangeSix(i) {
        OtherRateRef.current[i + 1].focus();
    }

    function handleChangeSummary(i) {
        roomTypeIdRef.current[i + 1].focus();
    }

    function handleChangeSummaryTwo(i) {
        roomTypeNameRef.current[i + 1].focus();
    }

    function handleChangeSummaryThree(i) {
        avgBaseRateRef.current[i + 1].focus();
    }

    function handleChangeSummaryFour(i) {
        avgDiscountRateRef.current[i + 1].focus();
    }

    return <>
        <input type="hidden"
            className={"isRoomSelected"}
            name={"isRoomSelected" + counter}
            id={"isRoomSelected" + counter}
            value="0"
            ref={(ref) => isRoomSelectedRef.current.push(ref)}
            onChange={() => handleChange(counter)}
        />
        <input
            type="hidden"
            className={"isDealSelected"}
            name={"isDealSelected" + counter}
            id={"isDealSelected" + counter}
            value="0"
            ref={(ref) => isDealSelectedRef.current.push(ref)}
            onChange={() => handleChangeOne(counter)}
        />
        <input
            type="hidden"
            className={"isDiscountSelected"}
            name={"isDiscountSelected" + counter}
            id={"isDiscountSelected" + counter}
            value="0"
            ref={(ref) => isDiscountSelectedRef.current.push(ref)}
            onChange={() => handleChangeTwo(counter)}
        />
        <input
            type="hidden"
            className={"selectedRoomTypeId"}
            name={"selectedRoomTypeId" + counter}
            id={"selectedRoomTypeId" + counter}
            value="0"
            ref={(ref) => selectedRoomTypeIdRef.current.push(ref)}
            onChange={() => handleChangeThree(counter)}
        />
        <input
            type="hidden"
            className={"baseRate"}
            name={"baseRate" + counter}
            id={"baseRate" + counter}
            value="0"
            ref={(ref) => baseRateRef.current.push(ref)}
            onChange={() => handleChangeFour(counter)}
        />
        <input
            type="hidden"
            className={"discountRate"}
            name={"discountRate" + counter}
            id={"discountRate" + counter}
            value="0"
            ref={(ref) => discountRateRef.current.push(ref)}
            onChange={() => handleChangeFive(counter)}
        />
        <input
            type="hidden"
            className={"OtherRate"}
            id={"OtherRate" + counter}
            name={"OtherRate" + counter}
            value="0"
            ref={(ref) => OtherRateRef.current.push(ref)}
            onChange={() => handleChangeSix(counter)}
        />
        <input
            type="hidden"
            name="showOnlyRatePlanForOtherRoom"
            id="showOnlyRatePlanForOtherRoom"
            value="0"
            ref={showOnlyRatePlanForOtherRoomRef}
        />


        <input
            type="hidden"
            name={"roomTypeId" + counter}
            value=""
            ref={(ref) => roomTypeIdRef.current.push(ref)}
            onChange={() => handleChangeSummary(counter)}
        />
        <input
            type="hidden"
            name={"roomTypeName" + counter}
            value=""
            ref={(ref) => roomTypeNameRef.current.push(ref)}
            onChange={() => handleChangeSummaryTwo(counter)}
        />
        <input
            type="hidden"
            name={"avgBaseRate" + counter}
            value=""
            ref={(ref) => avgBaseRateRef.current.push(ref)}
            onChange={() => handleChangeSummaryThree(counter)}
        />
        <input
            type="hidden"
            name={"avgDiscountRate" + counter}
            value=""
            ref={(ref) => avgDiscountRateRef.current.push(ref)}
            onChange={() => handleChangeSummaryFour(counter)}
        />
    </>
}

export default React.memo(HiddenInputs);