      
      $( document ).ready(function() {
			var tweets 		= $('.tweet'),
				firstTweet 	= tweets.first(),
				tweetsShown = [];

			fadeFunction(firstTweet);
			function getRandTweet () {
				console.log('tweets length: ' + tweets.length);	
			}

			function fadeFunction(tweetElement) {
				tweetElement.fadeIn( 1000, function() {
					$(this).transition({scale: 1.06}, 5000);
					$(this).fadeOut( 1000, function () {
						// getRandTweet();
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
       });






      
   //    $( document ).ready(function() {
   //    		var tweets 		= $('.tweet'),
			// 	firstTweet 	= tweets.first();        	

			// fadeFunction(firstTweet);

			// function fadeFunction(tweetElement) {
			// 	tweetElement.fadeIn('slow', function() {
			// 		$(this).fadeOut(function () {
			// 			if (tweetElement.next().length) {
			// 				tweetElement.next().fadeIn('slow', function () { 
									


			// 					fadeFunction(tweetElement.next());
			// 				});
			// 			} else {
			// 				alert('no more sad tweets!');
			// 			}
			// 		});
			// 	});
			// }
   //     });





