/**
 * File Name: Global.js Author: Janardhan Bobba  Description: This file should
 * be included in all the HTML files. All or any of the generic functions are to
 * be defined in this class. This also load any other specified js files using
 * Require.js
 */

initialize()

function alertBox(status, msg) {
	$(".content").css("display","none");
	$('<div class="alertBox '+status+'"><div style="text-align:center;">'+msg+'</div><span class="ok"><a href="#" class="okBtn" id="Ok"><span> Ok</span></a><span></div></div>')
			.appendTo("body");
}


/**
 * This function is helps to redirect to pageUrl(Page name)
 * @param pageUrl
 */
function NavigateTo(pageUrl) {
	window.location=pageUrl;
}

/**
 * This function is helps to redirect to pageUrl(The full path)
 * @param pageUrl
 */
function NavigateToBack(pageUrl) {
	window.location.pathname = pageUrl;
}

/**
 *  This function is helps to Store the data in the key, value pairs
 * @param key
 * @param item
 */
function Store(key, item) {
	localStorage[key] = JSON.stringify(item);

}

/**
 * This function is helps to Retrieve the data of the key returns value 
 * @param key
 * @returns
 */
function Retrieve(key) {
	if (!localStorage.hasOwnProperty(key))
		return null;
	return JSON.parse(localStorage[key]);
}


/**
 * This function is used to collect the Confirmation from the user
 * @param text
 * @returns {Boolean}
 */
function GetConfirmation(text) {
	var agree = confirm(text);
	if (agree) {
		return true;
	} else {
		return false;
	}
}

/**
 * This function is used to load the basic information of the user
 */
function initialize() {
	Store("username","Bitool" )
	Store("emailid", "bitool@do.in")
	
	$(".username").text(Retrieve("username"));
	$(".emailid").text(Retrieve("emailid"));
}
