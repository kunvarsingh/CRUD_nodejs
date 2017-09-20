var paypal = require('paypal-rest-sdk');

//var paymentObj = require('../models/paymentSchema');

//  var addpayment = function(req,res){
//  	paypal.configure({
//   'mode': 'sandbox', //sandbox or live
//   'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
//   'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
// });

// var card_data = {
//   "type": "visa",
//   "number": "4417119669820331",
//   "expire_month": "11",
//   "expire_year": "2018",
//   "cvv2": "123",
//   "first_name": "Joe",
//   "last_name": "Shopper"
// };

// paypal.creditCard.create(card_data, function(error, credit_card){
//   if (error) {
//     console.log(error);
//     throw error;
//   } else {
//     console.log("Create Credit-Card Response");
//     console.log(credit_card);
//   }
// });
// 	var fields = {};
// 	fields = req.body;
// 	//res.jsonp({status: 200, msg:"user saved successfully."});
// 	paymentObj(fields).save(function(err,data){
// 		if(err){
// 			res.jsonp(err);
// 		}else{

// 	if(payment.payer.payment_method === 'paypal') {
//       req.paymentId = payment.id;
//       var redirectUrl;
//       console.log(payment);
//       for(var i=0; i < payment.links.length; i++) {
//         var link = payment.links[i];
//         if (link.method === 'REDIRECT') {
//           redirectUrl = link.href;
//         }
//       }
//       res.redirect(redirectUrl);
//     }
// 			res.jsonp({status: 200, msg:"payment done successfully."});
// 		}
// 	});
// 	//db.close();
 //}
	
//exports.addpayment = addpayment;

