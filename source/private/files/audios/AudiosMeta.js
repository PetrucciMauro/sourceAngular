/*
 * Name : Pietro Tollot
 * Module : serverNode
 * Location : source/private/files/audios/AudiosMeta.js
 *
 */
//==============
// configuration
//==============

var fs = require('fs');

//=========
// resource
//=========
var get = function(req, res){
	var file_names = fs.readdirSync(__dirname+'/../../../../files/'+req.user+'/audio');
	res.json({
										success: true,
										message: 'correctly get files names',
										names: file_names
										});
};


exports.get = get;