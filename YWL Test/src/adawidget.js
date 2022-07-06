 (function () {   
   var params = {"propertyId":"265"};
   var paramsArr = [];
   var pl2 = document.createElement('script');
   for(let key in params) { paramsArr.push(key + '=' + encodeURIComponent(params[key])) };
   pl2.type = 'text/javascript';
   pl2.async = true;
   pl2.src = 'https://www.ada-tray.com/adawidget/?' + btoa(paramsArr.join('&'));
   (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(pl2);
 })();

(function () {
    var params = {"propertyId":"265","arrival":"","departure":"","partnerId":"19238","displayPage":"reservation"};
    var paramsArr = [];
    var pl = document.createElement('script');
    for(let key in params) { paramsArr.push(key + '=' + encodeURIComponent(params[key])) };
    pl.type = 'text/javascript';
    pl.async = true;
    pl.src = 'https://www.innstaging.com/external/widgets/?' + btoa(paramsArr.join('&'));
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(pl);
})();