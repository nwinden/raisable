var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var campaigns = require('./routes/campaigns');
var pay = require('./routes/pay');
var sponsor = require('./routes/sponsor');


//middleware
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// mongoose connection

// process.env.MONGODB_URI will only be defined if you are running on Heroku
if(process.env.MONGODB_URI != undefined) {
    // use the string value of the environment variable
  var  databaseURI = 'mongodb://heroku_3rd65rt7:jkbu598e43ni3jskajvh60d97u@ds017155.mlab.com:17155/heroku_3rd65rt7';
} else {
    // use the local database server
    databaseURI = 'mongodb://localhost:27017/raisable';
}


mongoose.connect(databaseURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connection open ', databaseURI);
});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose error connecting ', err);
});

//routes
app.use('/campaigns', campaigns);
app.use('/pay', pay);
app.use('/sponsor', sponsor);

// start server
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
  console.log('listening on port ', app.get('port'));
});

// Handle index file separately



app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});
