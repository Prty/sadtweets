var RootController = require('./controllers/index').RootController;
var TweetsController = require('./controllers/index').TweetsController;

module.exports = function(app) {
  app.get('/', RootController.index);
  app.get('/:username', RootController.show);
  app.get('/tweets/:username', TweetsController.show);
};