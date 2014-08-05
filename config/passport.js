////////////////////////
// REQUIRE STRATEGIES //
////////////////////////

var TwitterStrategy  = require('passport-twitter').Strategy;

// load up the user model
var User = require('../models/user');

// load the auth variables
var configAuth = require('./auth');



//////////////////////////////
// PASSPORT EXPORT FUNCTION //
//////////////////////////////

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    // code for login (use('local-login', new LocalStategy))
    // code for signup (use('local-signup', new LocalStategy))
    // code for facebook (use('facebook', new FacebookStrategy))

    // =========================================================================
    // TWITTER =================================================================
    // =========================================================================
    passport.use(new TwitterStrategy({

        consumerKey     : configAuth.twitterAuth.consumerKey,
        consumerSecret  : configAuth.twitterAuth.consumerSecret,
        callbackURL     : configAuth.twitterAuth.callbackURL

    },
    function(token, tokenSecret, profile, done) {
        // make the code asynchronous
	 	// User.findOne won't fire until we have all our data back from Twitter
        process.nextTick(function() {

            User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
                console.log('updated');
                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);
    
                // if the user is found then log them in
                if (user) {
                    if(user.twitter.secretToken)
                        return done(null, user);
                    
                    //Add the secret token if it's not there
                    user.set('twitter.secretToken', tokenSecret);
                    user.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, user);
                    });
                } else {
                    // if there is no user, create them
                    var newUser                 = new User();
    
                    // set all of the user data that we need
                    newUser.twitter.id          = profile.id;
                    newUser.twitter.token       = token;
                    newUser.twitter.username    = profile.username;
                    newUser.twitter.displayName = profile.displayName;
                    newUser.twitter.secretToken = tokenSecret;
    
                    // save our user into the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        
        });

    }));

};