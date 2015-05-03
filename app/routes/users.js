module.exports = function(app){
    var users = require('../controllers/users');
    app.post('/users/request-token', users.requestToken);
    app.get('/users', users.findAll);
 	app.get('/users/:id', users.findById);
	app.post('/users/:id', users.add);
 	app.put('/users/:id', users.update);
 	app.delete('/users/:id', users.delete);
}