/////////////
// REQUIRE //
/////////////

exports.authenticate = function (passport) {
	passport.authenticate('twitter');
};

exports.callback = function (passport) {
	passport.authenticate('twitter', {
		successRedirect : '/search',
		failureRedirect : '/'
	});
};