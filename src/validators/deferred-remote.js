!function($) {
	'use strict';

	/*
		This validator is a general purpose async validator which assumes the remote server will
		return the following response:
		{
			validation: 'success', // required, 'success', 'danger', 'warning', 'reset'
		    message: 'Your error message or error code used by the decorator.' // optional
	 	}

		Your remote server will also need to return a status code of 200. Any other status code
		this validator assumes there is technical problems with the remote validation. Therefore,
		validaiton will fail.
	*/

	$.fn.proveDeferredRemote = function(options) {

		var input = $(this);
		var value = input.vals();
		var hasValue = $.hasValue(value);

		var enabled = $('body').booleanator(options.enabled);
		var url;
		var method = options.method || 'GET';
		var data;

		var dfd = $.Deferred();
		var result = {
			field: options.field,
			validator: options.validator,
			status: 'validated',
			message: undefined
		};

		if (!enabled) {
			result.validation = 'reset';
			dfd.resolve(result);
		} else if (!hasValue) {
			// All validators are optional except for `required` validator.
			result.validation = 'success';
			dfd.resolve(result);
		} else {
			url = ($.isFunction(options.url))? options.url(value) : options.url;
			data = ($.isFunction(options.data))? options.data(value) : options.data;

			$.ajax({
				url: url,
				method: method,
				data: data
			})
			.done(function(data, textStatus, xhr) {
				if (xhr.status === 200 && data.validation) {
					result.validation = data.validation;
					result.message = data.message || options.message;
				} else if (xhr.status === 302 || xhr.status === 404){
					result.validation = 'danger';
					result.message = 'The remote validator endpoint was not found.';
				} else {
					result.validation = 'danger';
					result.message = 'The remote validator returned an incorrect response.';
				}
				dfd.resolve(result);
			})
			.fail(function() {
				result.validation = 'danger';
				result.message = 'The remote validator returned an incorrect response.';
				dfd.resolve(result);
			});
		}

		if (options.debug) {
			console.groupCollapsed('Validator.proveDeferredRemote()', options.field);
				console.log('options', options);
				console.log('input', input);
				console.log('value', value);
				console.log('enabled', enabled);
				console.log('url', url);
				console.log('method', method);
				console.log('data', data);
				console.log('validation', result.validation);
			console.groupEnd();
		}

		return dfd;
	};
}(window.jQuery);
