browser.runtime.onMessage.addListener(notify);
browser.browserAction.onClicked.addListener(handleClick);
browser.downloads.onCreated.addListener(handleCreated);

function notify(message) 
{
	if (message.action == "download")
		downloadPage(message);
}

function handleCreated(item) {
	console.log(item.url);
}

function handleClick(e) 
{
	browser.tabs.query(
	{
		currentWindow: true,
		active: true
	}).then(sendMessageToTabs).catch(onError);
}

function sendMessageToTabs(tabs) {
	for (let tab of tabs) 
	{
		browser.tabs.sendMessage(
			tab.id,
			{greeting: "query-site"}
		).catch(onError);
	}
}

function onError(error)
{
	console.error(`Error: ${error}`);
}

function onStartedDownload(id)
{
	//console.log(`Started downloading.`);
}

function onFailed(error) 
{
	console.log(`Download failed" ${error}`);
}

function downloadPage(message) 
{
	console.log("Preparing download.");

	for (i = 0; i < message.urls.length; i++) 
	{
		var imgUrl = message.urls[i];
		
		var downloading = browser.downloads.download(
		{
		  url : imgUrl.url,
		  filename : imgUrl.fileName,
		  conflictAction : 'uniquify'
		});
		downloading.then(onStartedDownload, onFailed);
	}
}