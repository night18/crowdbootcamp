/**
Author: Chun-Wei Chiang
Create Date: 2017/10/18
Class name: popup.js
Purpose: Control the popup page and detect the amazon turk ID
Modify History:
**/

// function click(e) {
//   chrome.tabs.executeScript(null,
//       {code:"document.body.style.backgroundColor='" + e.target.id + "'"});
//   window.close();
// }

function getWorkerID(){
	const dashboardUrl = "https://www.mturk.com/mturk/dashboard";

	let workerID = localStorage.getItem("AMTmentor.workerID");

	if(!workerID){
		$.ajax({
			async: false,
			type: 'GET',
			url: dashboardUrl,
			success: function(data){
				workerID = $('span.orange_text_right', $(data)).text().trim().split(': ')[1];
				localStorage.setItem("AMTmentor.workerID", workerID);
			}
		});
	}
	return workerID
}

function workerNameScrpit(){
	let name = document.getElementById('user_name_field').innerHTML;
	return name;
}

const getWorkerName = async () => {
	try{
		let workerName = localStorage.getItem("AMTmentor.workerName");

		// We have to convert the function to a string
		const scriptToExec = `(${workerNameScrpit})()`;


		if(!workerName){
			name = await chrome.tabs.executeScript(null, 
				{code: scriptToExec}
			);

			workerName = name;
			localStorage.setItem("AMTmentor.workerName", workerName);
		}

		return workerName;
	
	}catch(err){
		console.log(err);
	}
	
}

document.addEventListener('DOMContentLoaded', async () => {
	

	let workerID = getWorkerID();
	let workerName = await getWorkerName();

	if(workerName){
		$('#mturk_username').text(workerName);
	}

	if(workerID){
		$('#mturk_userid').text(workerID);	
	}
	

});


