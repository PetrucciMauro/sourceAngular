//==============
// configuration
//==============

var fs = require('fs');
var multer  = require('multer')

//=========
// resource
//=========

var del = function(req, res){
	var dir= __dirname+'/../../../../files/'+req.user+'/audio/';
	var name = req.originalUrl.split("/")[5];
	var there_is = fs.existsSync(dir+name);
	
	if(there_is){
		fs.unlinkSync(dir+name);
		res.json({
					success: true,
					message: 'correctly delete file '+dir+name
					});
		
	}
	else{
		res.json({
					success: false,
					message: 'file '+dir+name+' does not exists'
					});
	}
	
};

var get = function (req, res) {
	
	var options = {
	root: __dirname + '/../../../../files/'+req.user+'/audio',
	dotfiles: 'deny',
	headers: {
		'x-timestamp': Date.now(),
		'x-sent': true
	}
	};
	
	var file_name = req.originalUrl.split("/")[5];
	var there_is = fs.existsSync( __dirname+'/../../../../files/'+req.user+'/audio/'+file_name);
	
	if(there_is == false){
		res.status(407).send({
																							success: false,
																							message: 'File not found'
																							});
	}
	else{
		res.sendFile(file_name, options, function (err) {
															if (err) {
															console.log(err);
															res.status(err.status).end();
															}
															else {
															console.log('Sent:', file_name);
															}
															});
	}
};


var post = [ multer({
																				dest:  __dirname+'/../../../../files/',
																				
																				changeDest: function(dest, req, res) {
																				var newDestination = dest + req.user + '/audio';
																				return newDestination;
																				},
																				
																				rename: function (fieldname, filename, req, res) {
																				var new_name = req.originalUrl.split("/")[5];
																				return new_name; }
																				
																				}),
												function(req, res){
												console.log(req.body) // form fields
												console.log(req.files) // form files
												res.status(204).end()
												}];


exports.delete= del;
exports.get= get;
exports.post = post;
















