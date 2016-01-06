(function($) {
//testing
    $.fn.trukutru = function(options) {

    	var settings = $.extend({
    		//options
    		caseSensitive: false,
    		highlight: false,
    		noResultsText: "No value found, keep writting to create element",
    		requestParameters: [],
    		requestType: "POST",
    		requestUrl: "",
    		saveWithUnfocus: true,
    		selectWithEnter: true,
    		selectWithSpacebar: true,
    		selectWithTab: true,
    		separator: ',',
    		values : [],
    		//callbacks
    		onSaveError: null,
    		onSaveSuccess: null,
    		//triggers
    		open: null,
    		close: null,
    		destroy: null
    		/*
    		- [style-classes] (several)
			 */
    	}, options);

        return this.each( function() {
        	
        	if(settings.values.length == 0) {
        		console.warn("Trukutru Livesearch Warning: No values sent on initialization. Please verify you are sending a correct array on the 'values' option.");
        	}

        	$(document).on("keyup", $(this), function(event) {
        		$('#results').empty();
        		var matches = 0;

        		var seed = $(event.target).val();

        		if(!settings.caseSensitive) {
        			seed = seed.toLowerCase();
        		}

        		if(seed.length > 0) {
	        		for (var i = 0; i < settings.values.length; i++) {
	        			var element = settings.values[i];

	        			if(!settings.caseSensitive) {
	        				element = element.toLowerCase();
	        			}

	        			if(element.indexOf(seed)>-1) {
	        				$('#results').append(settings.values[i]);
	        				$('#results').append("<br>");
	        				matches++;
	        			}
	        		}

	        		if(matches == 0) {
	        			$('#results').append(settings.noResultsText);
	        		}
        		}
        	});
        });
    }
}(jQuery));