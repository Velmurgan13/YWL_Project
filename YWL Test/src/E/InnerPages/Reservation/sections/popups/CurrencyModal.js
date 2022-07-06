import React from "react";
import ReactHtmlParser from "react-html-parser";
import {assetsUrl} from "../../../../../Configuration/config_url";
import {updateCurrecny} from "../../../../../DataLayer/datalayerUtilities";

import "./index.css";

function CurrencyModal(props) {
    // console.log(props)
    const setSelectedCurrrecny = async (code, abbr) => {
        let t = window.confirm('Are you sure you want to change the currency?');
        // console.log(code, abbr, t);

        if(t){
            let currencyData = {
                'code':code,
                'abbr':abbr
            };
            const response = await updateCurrecny(currencyData);
            // console.log('response', response.data);
            if(response.data.price !== '' && response.data.price !== undefined){
                props.onCancel();
                props.setConvertPrice(parseFloat(response.data.price));
                props.setCurrencySign(response.data.currency_symbol);
                props.setCurrencyAbbr(response.data.currency_abbr);
                props.setCurrencyFlagAbbr(response.data.country_abbreviation);
            }
        }
    }

    return <>
        <div className="currencyModal">
            <div className="modal-header text-center fs-16 ratePolicyBorder mb-4">
                All Currencies
            </div>

            <div className="max-content">
                <div className="ML20 text-left mt-2 currencyList">
                    <ul>
                        {Object.values(props.all_country_currency_code).map((curval, key) => {
                            // console.log(curval, props.currencyAbbr)
                            return <>
                                <li key={key} className={`col-4 currencyName ${(props.currencyAbbr === curval.currency_code) ? 'currentCurrency' : ''}`} title={curval.country} onClick={() => setSelectedCurrrecny(`${curval.currency_code}`, `${curval.abbreviation}`)}>
                                    <span className="mr-1"><img src={assetsUrl+'/flag/'+curval.abbreviation.toLowerCase()+'.gif'} alt={curval.currency_code+' Flag'} /></span>
                                    <span>{`${curval.currency_code} (${ReactHtmlParser(curval.currency_symbol)})`}</span>
                                </li>
                            </>
                        })}
                    </ul>
                </div>
            </div>
            <div className="" onClick={props.onCancel}>
                <button
                    className="btn--alt close p-4 text-dark btnClose"
                    onClick={props.onCancel}
                >
                    <svg
                        className="text-dark bi bi-x"
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </button>
            </div>
        </div>
    </>
}

export default CurrencyModal;