var RootController 		= require('./controllers/index').RootController;
var TweetsController 	= require('./controllers/index').TweetsController;
var AuthController 		= require('./controllers/index').AuthController;

module.exports = function(app, passport) {
	app.get('/',						isLoggedIn,	RootController.index);
	app.get('/search',					isLoggedIn, RootController.search);
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
	
	if (req.isAuthenticated())
		console.log('isAuthenticated');
		return next();
	// if they aren't redirect them to the home page
	console.log('isNotAuthenticated');
	res.redirect('/');
}