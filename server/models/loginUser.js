
var mongoose=require('mongoose');
var bcrypt=require('bcrypt-nodejs');
var fs = require('fs');

// var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })

var login=mongoose.Schema({

username:{type:String,unique:true,required:"User Email is Required!"},
lastName:{type:String,required:"Last Name is Required!"},
firstName:{type:String,required:"first Name is Required!"},
password:{type:String,required:"password Is is Required!"},
mobileNo:{type:Number},
roll_no:{type:Number},
gender:{type: String,enum: ['Male', 'Female']},
 role: {type: String, default: 'Normal User'},
 city:String,
 country:String,
 registrationDate:{type: Date,default: Date.now},
 isDeleted: {type: Boolean,default: false},

// For editting the user profile.
//image:{ data: Buffer, contentType: String },
DOB:{type:Date,default:Date.now},
lastLoginTime:{type:Date, default:Date.now}

});


login.pre('save', function (next) {
	var user = this;
	//var imgPath = 'Libraries/Pictures/DSC03334.jpg';
    // calling next kicks off the next middleware in parallel
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function(err, salt) {
	    bcrypt.hash(user.password, salt, null,function(err, hash) {
	        user.password = hash;
	        next();
	    });
	});
});

var loginuser=mongoose.model('User',login);
module.exports=loginuser;