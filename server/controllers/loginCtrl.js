var userloginObj = require('../models/loginUser');
var bcrypt=require('bcrypt-nodejs');
var bodyParser = require('body-parser');

var multer = require('multer');
/*
Date: 17 april,2017
Name:  addloginuser
Purpose: This function is used to Add login user.
Author: Kunvar Singh
*/
var addloginuser = function(req,res){
	var fields = {};
	fields = req.body;
	//res.jsonp({status: 200, msg:"user saved successfully."});
	userloginObj(fields).save(function(err,data){
		if(err){
			res.jsonp({status:201,msg:"Already Exists",Error:err});
			console.log("i am in error"+err);
		}else{
			res.jsonp({status: 200, msg:"user registration has been saved successfully."});
		}
	});
}
//user listing for login 
var listLoginUser = function(req,res){
	var fields = {};
	userloginObj.find({},{},function(err,data){
     	if(err){
			res.jsonp(err);
		}else{
			res.jsonp({status: 200, msg:"User Data",data: data});
		}
   });
}


/*
Date: 17 april,2017
Name:  login
Purpose: This function is used to login user.
Author: Kunvar Singh
*/

var login=function(req,res){
var username=req.body.username;
var Userpassword=req.body.password;
	if(username !=""){
	
		userloginObj.find({username:username},{username:1,password:1,mobileNo:1},function(err,data){
			if(err){
				res.jsonp(err);
			}
			else{
					if(data.length > 0){
						var Userstatus=false;
						bcrypt.compare(Userpassword, data[0].password, function(err, response) {
			    			 if(response === true){
			    			 	res.jsonp({status: 200, msg:"User Varified successfully.",Userstatus:response});
			    			 }
			    			 else{
			    			 	res.jsonp({status: 201, msg:"password does not match.",Userstatus:response});
			    			 }
			    			
			    			
						});
					
					}
					else{
						res.jsonp({status: 201, msg:"User Name does not exists."});
					}
			}
		});
	}
	else
	{
		res.jsonp({staus:201,mes:"Invalid Username"});
	}
}


/*
Date: 18 april,2017
Name:  getUserVerify
Purpose: This function is used to update profile user.
Author: Kunvar Singh
*/

var updateUserProfile=function(req,res){
	userloginObj.update({ name: req.params.username },{	$set : 
		{
		username:req.body.username ? req.body.username : "",
		mobileNo:req.body.mobileNo ? req.body.mobileNo : "",
		city:req.body.city ? req.body.city : "",
		country:req.body.country ? req.body.country : "",
		image:req.body.image ? req.body.image : "",
		lastLoginTime:req.body.lastLoginTime ? req.body.lastLoginTime : "",
		DOB:req.body.DOB ? req.body.DOB : ""
		}
		},function(err,data){
		if(err){
				res.jsonp(err);
			}else{
				res.jsonp({status: 200, msg:"user profile updated successfully."});
			}
		});
}

//For delete profile user
var deleteUserProfile=function(req,res){
	userloginObj.update({_id: req.params.id},{isDeleted : true},function(err,data){
		if(err){
			res.jsonp(err);
		}
		else{
			console.log("Hi I m delete");
			res.jsonp({status:200,msg:"delete user profile successfully!."});
		}
	})
}



//Module Export--------------------------------
exports.addloginuser = addloginuser;
exports.login=login;
exports.updateUserProfile=updateUserProfile;
exports.deleteUserProfile=deleteUserProfile;
exports.listLoginUser=listLoginUser;