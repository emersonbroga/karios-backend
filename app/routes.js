module.exports = function(app){
    var users = require('./controllers/users');
    app.get('/users/request-token');
    app.get('/users', users.findAll);
    app.get('/users/:id', users.findById);
	app.post('/users/:id', musicians.add);
    app.put('/users/:id', musicians.update);
    app.delete('/users/:id', musicians.delete);
}