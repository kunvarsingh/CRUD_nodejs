var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var user= require('../server/controllers/userCtrl');
var loguser=require('../server/controllers/loginCtrl');
var product=require('../server/controllers/productCtrl');
var payment=require('../server/controllers/paymentCtrl');
var studnet=require('../server/controllers/studentCtrl');

var jsonParser = bodyParser.json();
 
// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/addUser', user.adduser);
router.post('/updateuser/:name', user.updateuser);
router.delete('/deleteUser/:id', user.deleteUser);
router.get('/listuser', user.listuser);


//Api's for the  student services
router.post('/addstudent', studnet.addstudent);
router.post('/getDataFromCollection/:roll_no',studnet.getDataFromCollection);

// API's routing for user in shopping cart section:

router.post('/addloginuser',urlencodedParser, loguser.addloginuser);
router.post('/login',loguser.login);
router.post('/updateUserProfile/:userName',loguser.updateUserProfile);
router.delete('/deleteUserProfile/:id',loguser.deleteUserProfile);

// API's routing for user in shopping cart in product section:
router.post('/addproduct',product.addproduct);
router.get('/listAllproducts',product.listAllproducts);
router.delete('/deleteproduct/:id',product.deleteproduct);
router.post('/updateproduct/:id',product.updateproduct);

router.get('/productsListByCategory/:category',product.productsListByCategory);
router.get('/productsListBySubCategory/:subcategory',product.productsListBySubCategory);

router.get('/listLoginUser',loguser.listLoginUser);

//For making payment integration
//router.get('/addpayment',payment.addpayment);
module.exports = router;
