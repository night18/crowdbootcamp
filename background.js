/**
Author: Chun-Wei Chiang
Create Date: 2017/10/12
Class name: Background.js
Purpose: 
Modify History:
**/

var lastTabId = 0;

const reg_domain = new RegExp("https*:\/\/\w*.mturk.com\/",'i');

//Fires when the active tab in a window changes
chrome.tabs.onActivated.addListener(function(activeInfo){
	//activeInfo contains tabId(Integer) and windowId(Integer)
	
	lastTabId = activeInfo.tabId;
	chrome.pageAction.show(lastTabId);


	// chrome.browserAction.setIcon({
	// 	path: "img/inactive.png"
	// });
})

//Fired when a tab is updated.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	//see https://developer.chrome.com/extensions/tabs#event-onUpdated
	lastTabId = tabId;
	chrome.pageAction.show(lastTabId);

	//To check whether the user is in Mturk
	if(changeInfo.url && reg_domain.test(changeInfo.url)){
		chrome.pageAction.setIcon({
			path: "img/active.png",
			tabId: lastTabId
		});

		chrome.pageAction.setPopup({
			tabId: lastTabId,
			popup: "html/login.html"
		});


		
	}
	
})


// chrome.runtime.onMessage.addListener(function(msg, sender){
// 	if((msg.from === "content") && (msg.subject === "active")){	
// 		chrome.browserAction.setIcon({
// 			path: "img/active.png"
// 		});
// 	}
// })