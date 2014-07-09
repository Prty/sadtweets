/////////////////////
// ROOT CONTROLLER //
/////////////////////

exports.index = function(req, res) {
	console.log('Redirecting -> RootController.index');
	res.redirect('/');
};

exports.show = function(req, res) {
	console.log('Redirecting -> RootController.index');
	res.render('index', { username: req.params.username });
	// console.log(req)
	// res.render('index');

};