import React, { useState, useEffect } from 'react'

import AddOn from './addons/AddOn';

const AddOns = ({ convertPrice, addOnDetails, updateGrandTotal, addonids, /*addOnAmountRef, addOnQuantityRef,*/ addon_total_priceRef, addon_quantityRef, addon_priceRef, addOnIdRef, addon_tax_percentRef, addon_tax_amountRef, perNightAddonRef, perItemAddonRef, perPersonAddonRef, currencySign }) => {
    return (
        <>
            {Object.values(addOnDetails).map((addOn, keyAddon) => (
                <AddOn
                    convertPrice={convertPrice} val2={addOn} keyAddon={keyAddon} updateGrandTotal={updateGrandTotal} 
                    addonids={addonids} /*addOnAmountRef={addOnAmountRef} addOnQuantityRef={addOnQuantityRef}*/ 
                    addon_total_priceRef={addon_total_priceRef} addon_quantityRef={addon_quantityRef} addon_priceRef={addon_priceRef}
                    addOnIdRef={addOnIdRef} addon_tax_percentRef={addon_tax_percentRef} addon_tax_amountRef={addon_tax_amountRef}
                    perNightAddonRef={perNightAddonRef} perItemAddonRef={perItemAddonRef} perPersonAddonRef={perPersonAddonRef} 
                    key={keyAddon} currencySign={currencySign} />
            ))}
        </>
    )
}

export default AddOns