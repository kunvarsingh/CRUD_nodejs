
var studentObj = require('../models/studentSchema');
var userObj = require('../models/userSchema');

var addstudent = function(req,res){
	var fields = {};
	fields = req.body;
	//res.jsonp({status: 200, msg:"user saved successfully."});
	studentObj(fields).save(function(err,data){
		if(err){
			res.jsonp(err);
		}else{
			res.jsonp({status: 200, msg:"student saved successfully."});
		}
	});
	//db.close();
}

var getDataFromCollection = function(req,res){
	var fields={};
	var req_student_rollNo = req.body.roll_no;
	console.log(req_student_rollNo);
}

		
exports.addstudent = addstudent;
exports.getDataFromCollection=getDataFromCollection;

