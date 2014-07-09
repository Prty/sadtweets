/////////////
// REQUIRE //
/////////////

var express = require('express'),
	router  = express.Router(),
	util    = require('util'),
	Twit    = require('twit'),
	TwitterStrategy = require('passport-twitter').Strategy;

var TWITTER_CONSUMER_KEY    = 'PKhzF4Ww6DqbqribSUxQGn5VG';
var TWITTER_CONSUMER_SECRET = 'aQuQHE827XmXmw4gz3NjXTB44LJ4o60gFhkBiB9S9eny2TJH4A';

var T = new Twit({
    consumer_key:         TWITTER_CONSUMER_KEY
  , consumer_secret:      TWITTER_CONSUMER_SECRET
  , access_token:         '899268949-te88ah5lgWDQNZcCFSL53WqZOYshMmFSRO2DTznA'
  , access_token_secret:  'PKyIEecr8mLOOIVZ2mQfh3lw1kr1EWfTOA5HTpOWttzxw'
});


///////////////////////
// TWEETS CONTROLLER //
///////////////////////

exports.show = function(req, res) {
	console.log(req.params.username);
	var returnedData;
	var returnedDataObject = {};

	T.get('statuses/user_timeline', { screen_name: req.params.username, count: 200 },  function (err, data, response) {
		returnedData = data;

		//	
		//	loop through returned data and create object to push to array
		//	
		for (var i = 0; i < returnedData.length; i++) {
			if (returnedData[i].retweet_count === 0 && returnedData[i].favorite_count === 0 && returnedData[i].in_reply_to_status_id === null && returnedData[i].entities.user_mentions.length === 0) {

			var tweet = {
				id: returnedData[i].id,
				text: returnedData[i].text,
				source: returnedData[i].source,
				twitter_source_link: 'https://twitter.com/' + returnedData[i].user.screen_name + '/status/' + returnedData[i].id,
				retweet_count: returnedData[i].retweet_count,
				favorite_count: returnedData[i].favorite_count,
				retweeted: returnedData[i].favorited,
				favorited: returnedData[i].retweeted,
				in_reply: returnedData[i].in_reply_to_status_id,
				user_mentions: returnedData[i].entities.user_mentions,
				user_id: returnedData[i].user.id,
				username: returnedData[i].user.name,
				screenname: returnedData[i].user.screen_name,
				profile_background: returnedData[i].user.profile_background_image_url,
				profile_image: returnedData[i].user.profile_image_url
			};
			returnedDataObject[tweet.id] = tweet;
		}	
	}

		res.json(returnedDataObject);
		// user.res.json(data);
		// res.redirect('index.html');
	});





	console.log('Redirecting -> TweetsController.show');

	// TWITTER API CALL
	// res.json({hello: 'world', tweets: [{}]req.params.username});
};