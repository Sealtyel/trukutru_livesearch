(function($) {
//testing
    $.fn.trukutru = function(options) {
        
        var input = this;
        var warning_no_values_sent = "Trukutru Livesearch Warning: No values sent on initialization. Please verify you are sending a correct array on the 'values' option.";
        var warning_incorrect_json_format = "Trukutru Livesearch Warning: JSON sent as 'values' has incorrect format.";

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

        $.fn.trukutru.open = function() {
            $.fn.trukutru.filter_elements(input.val());
            input.closest('.trukutru-content').addClass('active');
        }

        $.fn.trukutru.close = function() {
            input.closest('.trukutru-content').removeClass('active');
        }

        $.fn.trukutru.destroy = function() {
            $('.trukutru-content ul').remove();
            $('.trukutru-content').each(function() {
                var parent = $(this).parent();
                var input = $(this).children('input');
                $(this).remove();
                parent.append(input);
            });
        }

        $.fn.trukutru.filter_elements = function(seed) {
            $('.trukutru-content ul').empty();

            var matches = 0;

            if(!settings.caseSensitive) {
                seed = seed.toLowerCase();
            }

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
                if(typeof settings.onNoResults == 'function') {
                    settings.onNoResults.call(this);
                }
            }
        }

        return this.each( function() {
            console.log(settings.valuesType);

            if(settings.valuesType == "json") {
                try {
                    settings.values = JSON.parse(settings.values);
                }catch(e) {
                    console.warn(warning_incorrect_json_format);
                    return;
                }
            }

            //Warn if there are no values on the array
            if(settings.values.length == 0) {
                console.warn(warning_no_values_sent);
                return;
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
                    $.fn.trukutru.open();
                }
            });

            $(this).blur(function(event) {
                $.fn.trukutru.close();
            });

        	$(document).on("keyup", $(this), function(event) {
        		var seed = $(event.target).val();
        		$.fn.trukutru.filter_elements(seed);
                $.fn.trukutru.open();
        	});
        });
    }
}(jQuery));