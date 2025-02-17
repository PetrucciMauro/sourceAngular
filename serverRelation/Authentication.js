/*
 * Name : Pietro Gabelli
 * Module : serverNode
 * Location : serverRelation/Authentication.js
 *
 */

var Authentication = function(hostname){
	
	// private_fields
	var token = 'null';
	var host = hostname;
	//public_fields
	var that = {};
	//public_methods
	that.authenticate = function(user, password){
		var req = new XMLHttpRequest();
		req.open('GET', host+'/account/authenticate', false);
		req.setRequestHeader("Authorization", user+":"+password);
		req.send();
		var res = JSON.parse(req.responseText);
		token = req.getResponseHeader("Authorization");
		messageState = res.message;
		return res.success;
	};
	that.getMessage = function(){
		return messageState;
	};
	that.getToken = function(){
		return token;
	};
	that.deAuthenticate = function(){
		token = 'null';
		return true;
	};
  that.changepassword = function(user, password, newpassword){
    var req = new XMLHttpRequest();
    req.open('POST', host+'/account/changepassword', false);
    req.setRequestHeader("Authorization", user + ":" + password + ":" + newpassword);
    req.send();
    var res = JSON.parse(req.responseText);
    messageState = res.message;
    return res.success;
  };
	
	return that;
};

//exports.Authentication = Authentication;
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;