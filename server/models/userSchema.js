
var mongoose=require("mongoose");

var userschema = mongoose.Schema({
	rollNo: {  
		type: Number,
		required:"Roll No is Required!"
	},
    name: 
     {
     	type:String,
     	required: true
     },

     role: 
     { 
     	type: String,
     	 default: 'student' 
     },

 	bacon: 
 	{
        type: Number,
        required: [true, 'Why no bacon?']
    },

	 drink: {
	    type: String,
	    enum: ['Coffee', 'Tea'],
	  },

    city:String,
    country:String,

    AddmissionDate: {
        type: Date,
        default: Date.now
      },
      isDeleted: {
        type: Boolean,
        default: false
      }
});

var user = mongoose.model('user', userschema);

module.exports = user;