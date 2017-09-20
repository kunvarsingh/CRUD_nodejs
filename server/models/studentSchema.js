
var mongoose=require("mongoose");

var studentSchema = mongoose.Schema({
    student_name: 
     {
     	type:String,
     	required: true
     },
    roll_no: {  
        type: Number,
        required:"Roll No is Required!"
    },
     studnet_role: 
     { 
     	type: String,
     	 default: 'student' 
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

var student = mongoose.model('student', studentSchema);

module.exports = student;