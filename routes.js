var RootController 		= require('./controllers/index').RootController;
var TweetsController 	= require('./controllers/index').TweetsController;
var AuthController 		= require('./controllers/index').AuthController;

module.exports = function(app, passport) {
	app.get('/',						isLoggedIn,	RootController.index);
	app.get('/search',								RootController.search);
	app.get('/:username',				isLoggedIn,	RootController.show);
	app.get('/tweets/:username',		isLoggedIn, TweetsController.show);
	app.get('/auth/twitter',						passport.authenticate('twitter',	{ scope : 'email' }));
	app.get('/auth/twitter/callback',				passport.authenticate('twitter',	{
																							successRedirect : '/search',
																							failureRedirect : '/'
																						}));
};


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()) {
		console.log('req.user.twitter.username: ' + req.user.twitter.username);
		console.log('req.params.username: ' + req.params.username)
		console.log('isAuthenticated');

		if (req.user.twitter.username === req.params.username) {
			return next();
		} else if (req.params.username === undefined) {
			res.redirect('/');	
		} else {
			res.redirect('/');
		}
	} else {
		// if they aren't redirect them to the home page
		console.log('isNotAuthenticated');
		res.redirect('/');
	}
}