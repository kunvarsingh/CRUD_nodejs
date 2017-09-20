var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var index = require('./routes/index');
var mongoose=require('mongoose');// for database
var cors = require('cors'); //For handling the server request
var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


var paypal = require('paypal-rest-sdk'); // for payment
var stripe=require('stripe')('sk_test_4csyQYMqLru5BP5j42We04qn');

var AWS = require('aws-sdk');
var config = {
  "apiVersion": "2012-08-10",
  "accessKeyId": "abcde",
  "secretAccessKey": "abcde",
  "region":"us-west-2",
  "endpoint": "http://localhost:3004"
}
var dynamodb = new AWS.DynamoDB(config);

console.log("dynamodbdynamodbdynamodb:::"+dynamodb);
//for csv file.
var parse = require('csv-parse');
const fs = require('fs');
var Promise  = require('promise');
var promises = [];
var readline = require('readline');


mongoose.connect('mongodb://localhost:27017/testdatabase');
//check if we are connected successfully or not
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Here is the logic for scrapping in nodejs

var cheerio = require('cheerio');
var request = require('request');
app.get('/scrape', function(req, res){

url = 'http://www.imdb.com/title/tt1229340/';

request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);
console.log('html::'+html);
    var title, release, rating;
    var json = { title : "", release : "", rating : ""};

    $('.header').filter(function(){
        var data = $(this);
      console.log('HTML::::'+data);

        title = data.children().first().text();            
        release = data.children().last().children().text();

        json.title = title;
        console.log(' json.title'+ json.title);
        json.release = release;
    })

    $('.star-box-giga-star').filter(function(){
        var data = $(this);
        rating = data.text();

        json.rating = rating;
        console.log('json.rating::'+json.rating);
    })
}

// To write to the system we will use the built in 'fs' library.
// In this example we will pass 3 parameters to the writeFile function
// Parameter 1 :  output.json - this is what the created filename will be called
// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
// Parameter 3 :  callback function - a callback function to let us know the status of our function

fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})
})
})

// Ending section

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// Page will display after payment has beed transfered successfully
app.get('/success', function(req, res) {
  res.send("Payment transfered successfully.");
});
 
// Page will display when you canceled the transaction 
app.get('/cancel', function(req, res) {
  res.send("Payment canceled successfully.");
});

app.post('/charge',function(req,res){

// 	stripe.customers.create(
//   { email: 'customer@example.com' },
//   function(err, customer) {
//     err; // null if no error occurred
//     customer; // the created customer object
//   }
// );
stripe.customers.create({
  email: 'kunwarsingh7595@gmail.com'
}).then(function(customer){
  return stripe.customers.createSource(customer.id, {
    source: {
       object: 'card',
       exp_month: 10,
       exp_year: 2018,
       number: '4242 4242 4242 4242',
       cvc: 100
    }
  });
}).then(function(source) {
  return stripe.charges.create({
    amount: 5000,
    currency: 'usd',
    customer: source.customer
  });
}).then(function(charge) {
	res.send("Payment has been successfully.");
  // New charge created on a new customer
}).catch(function(err) {
  // Deal with an error
});

// var token=req.body.stripeToken;
// var chargeAmount=req.body.chargeAmount;
// var charge=stripe.charges.create({
// 	amount:chargeAmount,
// 	currency:"USD",
// 	description:"i am kunvar",
// 	statement_descriptor:"i am st desc",
// 	source:token
// 	 // object: 'card',
//   //      exp_month: 10,
//   //      exp_year: 2018,
//   //      number: '4242 4242 4242 4242',
//   //      cvc: 100
// },function(err,charge){
// if(err & err.type=== "StripeCardError"){
// 	console.log("invalid card");
// };
// });
// res.send("Payment has been successfully.");
 });

// catch 404 and forward to error handler




app.locals.baseurl = 'http://localhost:3004';
//for payment configuration:
var config = {
  "port" : 3004,
  "api" : {
    "host" : "api.sandbox.paypal.com",
    "port" : "",            
    "client_id" : "AVWctCFY1yY8oq6WT6t2YfHJ_0PZJ0sZtJZEWiII-TVbOaXcr9u3emtJdtY4XOyi0kxKZWiL5SFJg7AE",  // your paypal application client id
    "client_secret" : "ENpeWQnwnTSS6fvSibXGr0jTF8ZS8iv6LzXP-Pn0D5uE2ozOIHGYOrzKcPT-zmemSM8AOZiNBjMovS6c" // your paypal application secret id
  }
}
paypal.configure(config.api);
// Page will display when you canceled the transaction 
app.get('/cancel', function(req, res) {
  res.send("Payment canceled successfully.");
});
app.get('/success', function(req, res) {
  res.send("Payment success successfully.");
});


app.post('/paynow', function(req, res) {
   // paypal payment configuration.
  var payment = {
  "intent": "sale",
  "payer": {
    "payment_method": "paypal"
  },
  "redirect_urls": {
    "return_url": app.locals.baseurl+"/success",
    "cancel_url": app.locals.baseurl+"/cancel"
  },
  "transactions": [{
    "amount": {
      "total":parseInt(req.body.amount),
      "currency":  req.body.currency
    },
    "description": req.body.description
  }]
};

paypal.payment.create(payment, function (error, payment) {
  if (error) {
    console.log(error);
    res.send("i am in error");
  } else {
    if(payment.payer.payment_method === 'paypal') {
      req.paymentId = payment.id;
      var redirectUrl;
      console.log(payment);
     // res.send("i am in paymentId"+req.payment);
      for(var i=0; i < payment.links.length; i++) {
        var link = payment.links[i];
        if (link.method === 'REDIRECT') {
         redirectUrl = link.href;
        }
      }
      res.redirect(redirectUrl);
    }
  }
});
});
 

app.get('/readCsv', function(req, res) {
var csvData=[];
var inputPath="C:/Users/Kunvar/Documents/Archive/nitishUnh.csv";
fs.createReadStream(inputPath)
    .pipe(parse({delimiter: ','}))
    .on('data', function(csvrow) {
        console.log("i am csv data"+csvrow);
        //do something with csvrow
        csvData.push(csvrow);        
    })
    .on('end',function() {
      //do something wiht csvData
      //console.log(csvData);
    });
});

app.get('/readMultipleCsv', function(req, res) {
var readFile = function (file) {
    return new Promise(function (resolve, reject) {
        var lines = [];
        var rl    = readline.createInterface({
            input: fs.createReadStream('C:/Users/Kunvar/Documents/Archive/'+file)
        });

        rl.on('line', function (line) {
            // Split line on comma and remove quotes
            var columns = line
                .replace(/"/g, '')
                .split(',');

            lines.push(columns);
            //console.log(lines);
        });

        rl.on('close', function () {
            // Add newlines to lines
            lines = lines.join("\n");
            resolve(lines)
        });
    });
};

var writeFile = function (data) {
    return new Promise(function (resolve, reject) {
        fs.appendFile('output.csv', data, 'utf8', function (err) {
            if (err) {
                resolve('Writing file error!');
            } else {
                reject('Writing file succeeded!');
            }
        });
    });
};

fs.readdir('C:/Users/Kunvar/Documents/Archive', function (err, files) {
    for (var i = 0; i < files.length; i++) {
        promises.push(readFile(files[i]));

        if (i == (files.length - 1)) {
            var results = Promise.all(promises);

            results.then(writeFile)
                .then(function (data) {
                    console.log(data)
                }).catch(function (err) {
                console.log(err)
            });
        }

    }
});
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//File Upload
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Images");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});
var upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count
app.post("/api/Upload", function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded sucessfully!.");
    });
});

module.exports = app;
