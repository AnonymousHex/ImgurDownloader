browser.runtime.onMessage.addListener(notify);

function notify(message) 
{
	if (message.greeting == "query-site")
		download();
}

function download() 
{
	var divs = document.getElementById("account-thumbs").getElementsByTagName("DIV");
	var urls = new Array();
	var count = 0;
	var windowLocation = window.location.href;
	var pageNumber = windowLocation.includes('#') ? windowLocation.substring(windowLocation.lastIndexOf('#') + 1) : 1;
	
	//one less because of the clear div at the bottom
	for (i = 0; i < divs.length - 1; i++) 
	{
		var div = divs[i];
		if (div.id.length != 7 || div.childNodes.length != 1)
			continue;
		
		var imgUrl = div.childNodes[0].href + '.png';
		var fileName = imgUrl.substring(imgUrl.lastIndexOf('/') + 1);
		urls[count] = {"url": imgUrl, "fileName" : pageNumber + '/' + fileName};
		count++;
	}

	var message = 
	{
		"action" : "download",
		"urls" : urls
	};

	browser.runtime.sendMessage(message);
}
