(function($) {
//testing
    $.fn.trukutru = function(options) {
        
        var warning_no_values_sent = "Trukutru Livesearch Warning: No values sent on initialization. Please verify you are sending a correct array on the 'values' option.";

        var settings = $.extend({
    		caseSensitive: false,
    		highlight: false,
            maxElementsDisplayed: 0, 
            maxElementsSelected: 0,
            maxElementsText: "You can't select more options.",
            multiple: false,
    		noResultsText: "No value found, keep writting to create element.",
            openWithFocus: false,
    		requestParameters: [],
    		requestType: "POST",
    		requestUrl: "",
    		saveWithUnfocus: true,
    		selectWithEnter: true,
    		selectWithSpacebar: true,
    		selectWithTab: true,
    		separator: ',',
    		values : [],
            valuesType: "array",
    		//callbacks
    		onSaveError: null,
    		onSaveSuccess: null,
            onNoResults: null,
            onElementSelected: null
    	}, options);

        return this.each( function() {

            var input = $(this);

            function filter_elements(seed) {
                $('.trukutru-content ul').empty();

                var matches = 0;

                if(!settings.caseSensitive) {
                    seed = seed.toLowerCase();
                }

                $(event.target).closest('.trukutru-content').addClass('active');

                for (var i = 0; i < settings.values.length; i++) {
                    var element = settings.values[i];

                    if(!settings.caseSensitive) {
                        element = element.toLowerCase();
                    }

                    if(element.indexOf(seed)>-1) {
                        
                        if(settings.highlight) {
                            element = element.replace(seed,"<b>"+seed+"</b>");
                        }

                        if(settings.maxElementsDisplayed == 0 || $('.trukutru-content ul li').length < settings.maxElementsDisplayed) {
                           $('.trukutru-content ul').append("<li><a href='#'>"+element+"</li>");
                        }
                        matches++;
                    }
                }
                

                if(matches == 0) {
                    $('.trukutru-content ul').append("<li><a href='#'>"+settings.noResultsText+"</li>");
                }
            }

            //Warn if there are no values on the array
            if(settings.values.length == 0) {
                console.warn(warning_no_values_sent);
            }

            //Prepare UI for trukutru livesearch
            var parent    = input.parent();
            var container = $('<div></div>');
            var elements  = $('<ul></ul>');
            
            container.addClass('trukutru-content');
            container.append(input);
            container.append(elements);

            parent.append(container);

            $(this).focus(function(event) {
                if(settings.openWithFocus) {
                    filter_elements("");
                    $(event.target).closest('.trukutru-content').addClass('active');
                }
            });

            $(this).blur(function(event) {
                filter_elements("");
                $(event.target).closest('.trukutru-content').removeClass('active');
            });

        	$(document).on("keyup", $(this), function(event) {
        		var seed = $(event.target).val();
        		filter_elements(seed);
        	});
        });
    }
}(jQuery));