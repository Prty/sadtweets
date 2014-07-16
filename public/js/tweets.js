      
      $( document ).ready(function() {
      		console.log($('.tweets').length);
        
	        // $( ".wrapper" ).fadeIn( 2000, function() {	
	        var firstchild = $(".tweet").eq(0);  
	        	console.log(firstchild);
	        	firstchild.fadeIn( 2000, function () { 
	          	
		          	$(this).transition({ scale: 1.1 }, 8000, function() {
		          		$( this ).fadeOut( function() {
		          			var nextsibling = $( this ).next();
		          			nextsibling.fadeIn( 2000 );
		          		});
		    
		           });
	        	});

	
	        // });

       });





      // $( document ).ready(function() {
      // 		console.log($('.tweets').length);
        
	     //    // $( ".wrapper" ).fadeIn( 2000, function() {	
	     //    var firstchild = $(".tweet").first();  
	     //    	console.log(firstchild);
	     //    	firstchild.fadeIn( 2000, function () { 
	          	
		    //       	$(this).transition({ scale: 1.1 }, 8000, function() {
		    //       		$( this ).fadeOut( function() {
		    //       			var nextsibling = $( this ).next();
		    //       			nextsibling.fadeIn( 2000 );
		    //       		});
		    
		    //        });
	     //    	});

	
	     //    // });

      //  });