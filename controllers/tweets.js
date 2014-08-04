/////////////
// REQUIRE //
/////////////
console.log('tweets.js!');

var express = require('express'),
	router  = express.Router(),
	util    = require('util'),
	moment = require('moment'),
	Twit    = require('twit'),
	TwitterStrategy = require('passport-twitter').Strategy;
	

var configAuth = require('../config/auth');

var TWITTER_CONSUMER_KEY    = 'TMthFBQyrtDg6exhL2dP0Yj09';
var TWITTER_CONSUMER_SECRET = 'vhyrhbyTTgws4xOzPY4QKtTlTm6F5Gz13EDViSzqptwpAaN7rZ';

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
	console.log('req.user.twitter.username: ' + req.user.twitter.username)
	console.log(req.params.user);

	T.setAuth(req.user.twitter.token);


	// console.log(req.params.username);
	console.log('First Twitter Request!');
	var returnedData,
		returnedDataObject = {},
		currentLastTweetID,
		tweet = {},
		requestCount = 0;

	T.get('statuses/user_timeline', { screen_name: req.user.twitter.username, count: 200 },  function (err, data, response) {
		returnedData = data;

		// console.log(returnedData);
		console.log(err);

		//	
		//	loop through returned data and create object to push to array
		//
		if (returnedData) {
			for (var i = 0; i < returnedData.length; i++) {
				if (returnedData[i].retweet_count === 0 && returnedData[i].favorite_count === 0 && returnedData[i].in_reply_to_status_id === null && returnedData[i].entities.user_mentions.length === 0) {
					tweet = {
						id: returnedData[i].id_str,
						text: returnedData[i].text,
						source: returnedData[i].source,
						twitter_source_link: 'https://twitter.com/' + returnedData[i].user.screen_name + '/status/' + returnedData[i].id_str,
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
						profile_image: returnedData[i].user.profile_image_url,
						created_at: returnedData[i].created_at,
						relative_created_at: moment(returnedData[i].created_at).fromNow(true),
						format_created_at: parseTwitterDate(returnedData[i].created_at)
					};
					returnedDataObject[tweet.id] = tweet;
					// console.log(returnedData);
					currentLastTweetID = tweet.id;
				}	
			}

			currentLastTweetID = returnedData[returnedData.length - 1].id_str;
		}

		if (currentLastTweetID === undefined) {
			res.json(returnedDataObject);
		} else {
			requestCount++;
			console.log(currentLastTweetID);
			nextTweetRequest();
		}
		// res.json(returnedDataObject);
	});

	function nextTweetRequest () {
		console.log('nextTweetRequest!');

		T.setAuth(req.user.twitter.token);

		T.get('statuses/user_timeline', { screen_name: req.user.twitter.username, max_id: currentLastTweetID, count: 200 },  function (err, data, response) {
			returnedData = data;
			//	
			//	loop through returned data and create object to push to array
			//

			if (returnedData) {
				for (var i = 0; i < returnedData.length; i++) {
					if (returnedData[i].retweet_count === 0 && returnedData[i].favorite_count === 0 && returnedData[i].in_reply_to_status_id === null && returnedData[i].entities.user_mentions.length === 0) {
						tweet = {
							id: returnedData[i].id_str,
							text: returnedData[i].text,
							source: returnedData[i].source,
							twitter_source_link: 'https://twitter.com/' + returnedData[i].user.screen_name + '/status/' + returnedData[i].id_str,
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
							profile_image: returnedData[i].user.profile_image_url,
							created_at: returnedData[i].created_at,
							relative_created_at: moment(returnedData[i].created_at).fromNow(true),
							format_created_at: parseTwitterDate(returnedData[i].created_at)
						};
						returnedDataObject[tweet.id] = tweet;
						// console.log(returnedData);
						currentLastTweetID = tweet.id;	
					}
				}

				currentLastTweetID = returnedData[returnedData.length - 1].id_str;
			}	

			// returnedData[returnedData.length];

			console.log('currentLastTweetID: ' + currentLastTweetID);
			if (currentLastTweetID === undefined) {
				res.json(returnedDataObject);
			} else if (requestCount === 6) {
				res.json(returnedDataObject);
			} else {
				requestCount++;
				nextTweetRequest();
			}
		});
	}

	function parseTwitterDate(text) {
		//running regex to grab everything after the time
		var newtext = text.replace(/(\d{1,2}[:]\d{2}[:]\d{2}) (.*)/, '$2 $1');
		//moving the time code to the end
		newtext = newtext.replace(/(\+\S+) (.*)/, '$2 $1')
		var date = new Date(Date.parse(newtext)).toLocaleDateString();
		var time = new Date(Date.parse(newtext)).toLocaleTimeString();
		return date + ' • ' + time;
	}

	console.log('Redirecting -> TweetsController.show');

	// TWITTER API CALL
	// res.json({hello: 'world', tweets: [{}]req.params.username});
};