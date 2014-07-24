(function () {

	Object.size = function(obj) {
    var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
		return size;
	};

	var fullURL   = document.URL,
		parsedURL = fullURL.slice(30),
		tweetsTemplate,
		shownTweets = [];


	var methods = {
		init: function () {
			console.log('Sad Tweets js init!');

			methods.showIntroSadTweets();

			var source = $('#tweets-template').html();
			tweetsTemplate = Handlebars.compile( source );

			if (parsedURL.length > -1) {
				methods.getSadTweets('url');	
			}

			// history.pushState(null, null, 'twitterhandle');
			// console.log(document.URL);
			

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

		showSadTweets: function () {
			 audioElement.play();	//call audio

			// retrieve tweets from template in the DOM								
			var tweets 		= $('.tweet'),
				firstTweet 	= tweets.first(),
				sadTweetsLength = tweets.length,
				nextRandTweet;

			introSadTweets = $('.intro-wrapper').fadeOut(function () {
				fadeFunction(firstTweet);
			});

			function fadeFunction(tweetElement) {

				var tweetElementID = $(tweetElement).children().children()[0].innerHTML;
				shownTweets.push(tweetElementID);
				sadTweetsLength--;
				nextRandTweet = getNextRandTweet();
				console.log(nextRandTweet);
				console.log(sadTweetsLength);



				function getNextRandTweet () {
					var randTweet = tweets[Math.floor(Math.random() * tweets.length)];
					var randTweetID = $(randTweet).children().children()[0].innerHTML;

					if (sadTweetsLength > 0 && !shownTweets.indexOf(randTweetID)) {
						console.log('getNextRandTweet!');
						getNextRandTweet();
					} else if (sadTweetsLength === 0) {
						$('.fin').fadeIn(1000, function(){
							// $('this').load(function(){
							// 	window.location.href = "http://prty.jp"
							// });
						});
					} else {
						return randTweet;
					}
				}
				// shownTweets.indexOf(tweetElementID) 



				$(tweetElement).fadeIn( 1000, function() {
					$(this).transition({scale: 1.06}, 5000);
					$(this).fadeOut( 1000, function () {
						fadeFunction(nextRandTweet);

						// if (tweetElement.next().length) {
						// 	fadeFunction(tweetElement.next());
						// } else {
						// 	console.log('no more sad tweets!');
						// 	$('.fin').fadeIn(1000, function(){
						// 		// $('this').load(function(){
						// 		// 	window.location.href = "http://prty.jp"
						// 		// });
						// 	});
						// }
					});
				});
			}
       	},
		getSadTweets: function (context) {
			
			var params = {
				url: 'http://sad-tweets.herokuapp.com/tweets/' + twitterhandle,
				dataType: 'json',
				success: function (data) {
					console.log(data);
					var dataLength = Object.size(data);

					// history.pushState(null, null, twitterhandle);

					///////////////////////////////
					// HANDLE BAR SUCESS ACTIONS //
					///////////////////////////////

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
					methods.showSadTweets();
					// 	console.log(html);
						
					// } // end of for loop
				} // end of sucess
			}// end of params

			if (context === 'url') {
				params.url = 'http://localhost:3000/tweets/' + parsedURL
			} else if (context === 'input') {
	
				// fetch data from input form
				var raw_twitterhandle = $('.twitter-form-input').val();
				var twitterhandle = raw_twitterhandle.substr(1);
				console.log(twitterhandle);
				params.url = 'http://localhost:3000/tweets/' + twitterhandle
				
			}// enf of if statement
			$.ajax(params);
		} // end of getSadTweets
	}// end of method
	window.SadTweets = methods;
})();




