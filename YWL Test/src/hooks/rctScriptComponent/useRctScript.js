import React, { useEffect } from "react";

const useRctScript = (url, useData) => {
  useEffect(() => {
    let paramsArr = [];
    for (let [keys, values] of Object.entries(useData)) {
      paramsArr.push(`${keys}=${encodeURIComponent(values)}`);
    }
    let urlJoinWithParams = btoa(paramsArr.join("&"));
    let scriptUrl = `${url}${urlJoinWithParams}`;
    const script = document.createElement("script");
    script.setAttribute("src", scriptUrl);
    script.setAttribute("type", "text/javascript");
    script.setAttribute("async", true);
    document.head.appendChild(script);
  }, [url, useData]);
};

export default useRctScript;
