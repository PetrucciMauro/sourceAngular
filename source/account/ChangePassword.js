/*
 * Name : Pietro Tollot
 * Module : serverNode
 * Location : source/account/ChangePassword.js
 *
 */

//==============
// configuration
//==============

var config = require('../../config');
var database = config.database;
var MongoClient = require('mongodb').MongoClient;

//=========
// resource
//=========

var post = function(req, res) {
	var header=req.headers['authorization']||'null';
	parts=header.split(/:/);
	user=parts[0];
	pass=parts[1];
	passNew=parts[2];
  
  
	
	MongoClient.connect(database, function(err, db) {
                if(err) {
                      console.log(err);
                      res.status(500);
                      res.json({
                               success: false,
                               message: err
                               });
                }
							  db.collection('users').findOne({'username': user, 'password': pass}, function(err, doc) {
                                    if(err) {
                                               console.log(err);
                                               res.status(500);
                                               res.json({
                                                        success: false,
                                                        message: err
                                                        });
                                    }
																		if(doc != null){
																		db.collection('users').update({'username': user}, {$set: {'password' : passNew }}, function(err, doc){
                                                        if(err) {
                                                                  console.log(err);
                                                                  res.status(500);
                                                                  res.json({
                                                                           success: false,
                                                                           message: err
                                                                           });
                                                        }
																												console.dir('called udpate()');
																												res.json({
																															success: true,
																															message: 'Password updated'
																															});
																												db.close();
																												
																												});
																		}
																		else{
																		res.status(400);
																		res.json({
																					success: false,
																					message: 'Username or password not correct'
																					});
																		db.close();
																		}
																		
																		
																		});
							  });
};

exports.post = post;