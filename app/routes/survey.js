module.exports = function(app){
    var survey = require('../controllers/survey');
    app.get('/survey/next', survey.next);
}