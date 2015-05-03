var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var fs = require('fs');

var mongoUri = 'mongodb://10.11.8.233/kairos';

mongoose.connect(mongoUri);

var db = mongoose.connection;
db.on('connected', function () {
	var app = express();
	// enable cors
	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

	// middleware
	app.use(bodyParser.urlencoded({ extended: false }));

	// parse application/json
	app.use(bodyParser.json());

	// check token middleware
	app.use(function(req, res, next) {
		console.log(req.path);
		if('/users/request-token' == req.path){ next(); return; }
		var token = (req.method === 'GET') ? req.query.token : req.body.token;
		token = (typeof(token) == 'undefined') ? null : token;
		if(!token){
			return res.send(400, {
						status : 400,
						object : 'users',
						message: 'Token not sent',
						data: [],
						metadata : { }
					});
		}
		var User = mongoose.model('user');
		User.find({'token': token},function(err, results) {
				
			if(results.length == 0){
				return res.send(400, {
					status : 400,
					object : 'users',
					message: 'Token is not valid',
					data: [],
					metadata : { }
				});
			}else{
				next();
			}
  	});
	});


	// models
	require('./app/models/UserModel');


	// routes
	require('./app/routes/users')(app);


	app.get('/', function(req, res) {
	  res.send('Hello TechCrunch\n');
	});


	app.listen(3001);
	console.log('Listening on port 3001...');
});