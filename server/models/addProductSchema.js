
var mongoose=require("mongoose");

var addproductschema = mongoose.Schema({
	productName: {  
		type: String,
		required:"Product Name No is Required!"
	},
    quantity: 
     {
     	type:Number,
     	required: "quantity is Required!"
     },

     labelPrice: 
     { 
     	type: Number,
        default:0
     },

 	maxPrice: 
 	{
        type: Number,
        default:0
    },

	 discountedPrice: {
	    type: Number,
        default:0
	  },

    category:String,
    subCategory:String,

    shortDescription: {
        type: String,
      },
       longDescription: {
        type: String,
      },
       Remarks: {
        type: String,
      },
      isDeleted: {
        type: Boolean,
        default: false
      }
});

var addproducts = mongoose.model('Product', addproductschema);

module.exports = addproducts;