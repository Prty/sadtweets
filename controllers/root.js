/////////////////////
// ROOT CONTROLLER //
/////////////////////

exports.index = function(req, res) {
	console.log('Redirecting -> RootController.index');
	res.redirect('/search');
};

exports.show = function(req, res) {
	console.log('Redirecting -> RootController.index');
	res.render('index', { username: req.params.username });
	// console.log(req)
	// res.render('index');
};

exports.search = function (req, res) {
	// console.log(req.user)
	console.log('search: ' + req.user.twitter.username);
	res.redirect('/' + req.user.twitter.username);
}