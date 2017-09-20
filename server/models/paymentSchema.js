
var mongoose=require("mongoose");

var paypalschema = mongoose.Schema({
	amount: {  
		type: Number,
		required:"Amount is Required!"
	},
   currency:{
    type:String,
    default: "INR"
   },
    description:{
    type:String
   },
      Paymentstatus: {
        type: Boolean,
        default: false
      }
});

var paypal = mongoose.model('paypal', paypalschema);

module.exports = paypal;