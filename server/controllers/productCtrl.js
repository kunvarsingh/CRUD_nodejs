var productObj = require('../models/addProductSchema');

var addproduct = function(req,res){
	var fields = {};
	fields = req.body;
	productObj(fields).save(function(err,data){
		if(err){
			res.jsonp(err);
		}else{
			res.jsonp({status: 200, msg:"products added successfully."});
		}
	});
}

var updateproduct = function(req,res){
	var fields = {};
	fields = req.body;
	productObj.update({_id: req.params.id },{$set: { 
		productName:req.body.productName,
		category:req.body.category,
		quantity:req.body.quantity
	}},function(err,data){
	if(err){
			res.jsonp(err);
		}else{
			res.jsonp({status: 200, msg:"product updated successfully."});
		}
	});
}

var listAllproducts=function(req,res){

	productObj.find({},{},function(err,data){
     	if(err){
			res.jsonp(err);
		}else{
			res.jsonp({status: 200, msg:"All Products listing here..",data: data});
		}
   });

}
var deleteproduct=function(req,res){

	productObj.update({_id: req.params.id},{isDeleted : true},function(err,data){
		if(err){
			res.jsonp(err);
		}
		else{
			res.jsonp({status:200,msg:"delete user successfully!."});
		}
	})
}

var productsListByCategory=function(req,res){
	productObj.find({category: req.params.category},{},function(err,data){
     	if(err){
			res.jsonp(err);
		}else{
			res.jsonp({status: 200, msg:"Category data:",data: data});
		}
   });
}

var productsListBySubCategory=function(req,res){
	productObj.find({subcategory: req.params.subcategory},{},function(err,data){
     	if(err){
			res.jsonp(err);
		}else{
			res.jsonp({status: 200, msg:"subcategory Data:",data: data});
		}
   });
}

exports.addproduct = addproduct;
exports.listAllproducts=listAllproducts;
exports.deleteproduct=deleteproduct;
exports.updateproduct=updateproduct;

exports.productsListByCategory=productsListByCategory;
exports.productsListBySubCategory=productsListBySubCategory;