
var mongoose = require('mongoose');
var User = mongoose.model('user');
var users = {};


users.requestToken = function (req, res, next) {
	var name = req.params.name;
	User.create({name: name }, function (err, user) {
		return res.json({
			status : 200,
			object : 'users',
			message: 'User created.',
			data: [user],
			metadata : {}
		});
	});
};

users.findAll = function (req, res, next) {
	var query = req.params.query;
	query = (query) ? new Buffer(b64string, 'base64') : {};

	User.find(query,function(err, results) {
    	return res.json({
			status : 200,
			object : 'users',
			message: 'All good!',
			data: results,
			metadata : { count : results.length }
		});
  });
};

users.findById = function (req, res, next) {

	var id = req.params.id;
  	User.findOne({'_id': id}, function (err, user) {
		return res.json({
			status : 200,
			object : 'users',
			message: 'User found.',
			data: [user],
			metadata : {}
		});
	});
};

users.add = function (req, res, next) {
	User.create(req.body, function (err, user) {
		return res.json({
			status : 200,
			object : 'users',
			message: 'User created.',
			data: [user],
			metadata : {}
		});
	});
};

users.update = function (req, res, next) {
	var id = req.params.id;
  var updates = req.body;

  User.update({"_id": id}, updates, function (err, numberAffected) {
    return res.json({
			status : 200,
			object : 'users',
			message: 'User updated.',
			data: [updates],
			metadata : {count: numberAffected}
		});
  });
};

users.delete = function (req, res, next) {
	var id = req.params.id;
  User.remove({'_id':id},function(result) {
    return res.json({
			status : 200,
			object : 'users',
			message: 'User deleted.',
			data: [],
			metadata : {count: numberAffected}
		});
  });
};

module.exports = users;
