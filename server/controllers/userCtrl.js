
var userObj = require('../models/userSchema');

var adduser = function(req,res){
	var fields = {};
	fields = req.body;
	//res.jsonp({status: 200, msg:"user saved successfully."});
	userObj(fields).save(function(err,data){
		if(err){
			res.jsonp(err);
		}else{
			res.jsonp({status: 200, msg:"user saved successfully."});
		}
	});
	//db.close();
}

var updateuser = function(req,res){
	var fields = {};
	fields = req.body;
	userObj.update({ name: req.params.name },{$set: { country:req.body.country}},function(err,data){
	if(err){
			res.jsonp(err);
		}else{
			res.jsonp({status: 200, msg:"user updated successfully."});
		}
	});
}

var listuser=function(req,res){

	userObj.find({},{name:1,rollNo:1},function(err,data){
     	if(err){
			res.jsonp(err);
		}else{
			res.jsonp({status: 200, msg:"get users successfully.",data: data});
		}
   });

}
var deleteUser=function(req,res){

	userObj.update({_id: req.params.id},{isDeleted : true},function(err,data){
		if(err){
			res.jsonp(err);
		}
		else{
			console.log("Hi I m delete")
			res.jsonp({status:200,msg:"delete user successfully!."});
		}
	})
}
		
exports.adduser = adduser;
exports.updateuser = updateuser;
exports.listuser = listuser;
exports.deleteUser = deleteUser;

