(function () {

	Object.size = function(obj) {
    var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
		return size;
	};

	// Init Variables
	var fullURL   = document.URL,
		parsedURL,
		ENVpath,
		LOCALpath = 'http://localhost:3000/',
		LIVEpath = 'http://www.sadtweets.com/',
		tweetsTemplate,
		shownTweets = [],
		sadTweetsLength,
		nextRandTweet,
		tweets,
		twitterhandle;

	// Init App Environment
	if (fullURL.indexOf(LIVEpath) > -1) {
		parsedURL = fullURL.slice(25);
		ENVpath = LIVEpath + 'tweets/';
	} else if (fullURL.indexOf(LOCALpath) > -1) {
		parsedURL = fullURL.slice(22);
		ENVpath = LOCALpath + 'tweets/';
	}

	var methods = {
		init: function () {
			console.log('Sad Tweets js init!');
			twitterhandle = $('.ejs-context').html();
			methods.showIntroSadTweets();

			var source = $('#tweets-template').html();
			tweetsTemplate = Handlebars.compile( source );

			var source = $('#tweets-share-template').html();
			tweetsShareTemplate = Handlebars.compile( source );


			if (parsedURL.length > 0) {
				methods.getSadTweets('url', twitterhandle);	
			}

			// Init getSadTweets input form event handler
			$('.get-sadtweets-button').on('click', function (e) {
				e.preventDefault();
				methods.getSadTweets('input');
			});
		},

		showIntroSadTweets: function(){
			$( '.wrapper' ).fadeIn(2000);
			$( '.field' ).on( 'click', function() {
				$('.field').val('@');
			});
		},

		showSadTweets: function (context) {
			audioElement.play();	//call audio
			$('.footer_tweets').fadeIn(2000); // fadein second footer
			
			// retrieve tweets from template in the DOM								
			tweets 		= $('.tweet'),
			firstTweet 	= tweets[0],
			sadTweetsLength = tweets.length;
			console.log(sadTweetsLength);

			console.log(tweets);

			if (context === 'input') {
				$('.intro-wrapper').fadeOut(function () {
					methods.fadeFunction(firstTweet);
				});
			} else if (context === 'url') {
				$('.user').fadeIn(function () {
					self = this;
					setTimeout(function () {
						$(self).fadeOut(function () {
							methods.fadeFunction(firstTweet);
						});
					}, 3000);
				});
			}
       	},
       	fadeFunction: function (tweetElement) {
       		console.log(tweetElement);
       		shownTweets.push(tweetElementID);
       		console.log('shownTweets:');
       		console.log(shownTweets);
			var tweetElementID = $(tweetElement).children().children()[0].innerHTML;
			sadTweetsLength--;
			console.log('sadTweetsLength: ' + sadTweetsLength);
			nextRandTweet = methods.getNextRandTweet();

			$(tweetElement).fadeIn( 1000, function() {
				$(this).transition({scale: 1.06}, 5000);
				$(this).fadeOut( 1000, function () {
					methods.fadeFunction(nextRandTweet);
				});
			});
		},
		getNextRandTweet: function () {
			var randNum = Math.floor(Math.random() * tweets.length);
			console.log('randNum: ' + randNum);
			var randTweet = tweets[randNum];
			console.log('randTweet');
			console.log(randTweet);
			var randTweetID = $(randTweet).children().children()[0].innerHTML;
			console.log('randTweetID: ' + randTweetID);
			console.log('shownTweets.indexOf');
			console.log(shownTweets.indexOf(randTweetID));
			var indexOfSadTweets = shownTweets.indexOf(randTweetID);

			if (sadTweetsLength > 0 && indexOfSadTweets === -1) {
				console.log('randTweet is not in ShownTweetsArray');		
				return randTweet;
			} else if (sadTweetsLength > 0 && indexOfSadTweets > -1) {
				console.log('getNextRandTweet');
				methods.getNextRandTweet();
			} else if (sadTweetsLength === 0) {
				$('.fin').fadeIn(1000);
			} else {
				console.log('WTF!!!');
			}
		},
		getSadTweets: function (context, twitterhandle_url) {
			console.log('getSadTweets: ' + context + ' ' + twitterhandle_url);

			////////////////////////
			// DEFINE AJAX PARAMS //
			////////////////////////

			var params = {
				url: '',
				dataType: 'json',
				success: function (data) {
					alert('sucess from getSadTweets!');
					console.log(data);
					var dataLength = Object.size(data);

					if (dataLength) {
						// history.pushState(null, null, twitterhandle);

						////////////////////////////////
						// HANDLE BAR SUCCESS ACTIONS //
						////////////////////////////////

						tweetContainer = $('.tweets-container');
						tweetContainer.empty();

						$.each(data, function (idx, obj) {
							var tweet = {
								id: obj.id,
								text: obj.text,
								favorite_count: obj.favorite_count,
								retweet_count: obj.retweet_count,
								username: obj.username,
								screenname: obj.screenname,
								link: obj.twitter_source_link,
								profile_image: obj.profile_image,
								profile_background: obj.profile_background,
								created_at: obj.created_at,
								relative_created_at: obj.relative_created_at,
								format_created_at: obj.format_created_at
							}
							console.log(obj.text);
							var html = tweetsTemplate(tweet);
							tweetContainer.append(html);
						});

						history.pushState(null, null, twitterhandle);
						methods.showSadTweets(context);
						// 	console.log(html);
							
						// } // end of for loop
					} else {
						$('.intro-wrapper').fadeOut(function () {
							$('.notweets').fadeIn();
						});
					}	
				} // end of success
			}// end of params

			/////////////////////////////////
			// DEFINE CONTEXT OF AJAX CALL //
			/////////////////////////////////

			if (context === 'url') {
				params.url = ENVpath + twitterhandle_url
				var html = tweetsShareTemplate(parsedURL);

			} else if (context === 'input') {
				// fetch data from input form
				var raw_twitterhandle = $('.twitter-form-input').val();
				var twitterhandle = raw_twitterhandle.substr(1);
				params.url = ENVpath + twitterhandle
				
				var html = tweetsShareTemplate(parsedURL);
				tweetShareContainer = $('.tweets-share-container');
				tweetShareContainer.append(html);
			}// enf of if statement


			///////////////
			// AJAX CALL //
			///////////////

			$.ajax(params);
		} // end of getSadTweets
	}// end of method
	window.SadTweets = methods;
})();




