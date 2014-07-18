(function () {

	Object.size = function(obj) {
    var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
		return size;
	};

	var fullURL   = document.URL,
		parsedURL = fullURL.slice(22),
		tweetsTemplate;

	var methods = {
		init: function () {
			console.log('Sad Tweets js init!');

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
		showSadTweets: function () {
      		var tweets 		= $('.tweet'),
				firstTweet 	= tweets.first();        	

			fadeFunction(firstTweet);

			function fadeFunction(tweetElement) {
				tweetElement.fadeIn( 1000, function() {
					$(this).transition({scale: 1.06}, 5000);
					$(this).fadeOut( 1000, function () {
						if (tweetElement.next().length) {
								fadeFunction(tweetElement.next());
						} else {
							console.log('no more sad tweets!');
							$('.fin').fadeIn(1000, function(){
								// $('this').load(function(){
								// 	window.location.href = "http://prty.jp"
								// });
							});
						}
					});
				});
			}
       	},
		getSadTweets: function (context) {
			
			var params = {
				url: 'http://localhost:3000/tweets/' + twitterhandle,
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
							text: obj.text,
							favorite_count: obj.favorite_count,
							retweet_count: obj.retweet_count,
							screenname: obj.screenname,
							link: obj.twitter_source_link,
							profile_image: obj.profile_image,
							profile_background: obj.profile_background
						}
						console.log(obj.text);
						var html = tweetsTemplate(tweet);
						tweetContainer.append(html);
					});

					history.pushState(null, null, twitterhandle);
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