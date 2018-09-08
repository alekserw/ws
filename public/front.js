console.log('hi there');


var device = {
	sr: window.screen.width + 'x'+ window.screen.height,
	vp: Math.max(document.documentElement.clientWidth ,window.innerWidth  || 0) +'x'+ 
		Math.max(document.documentElement.clientHeight,window.innerHeight || 0)
}

var url =  'stat/',
	params = "";

for (var key in device) {
    if (params != "") {
        params += "&";
    }
    params += key + "=" + encodeURIComponent(device[key]);
};


function httpGetAsync(theUrl,callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

// httpGetAsync(url +'?' + params);


