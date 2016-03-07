/**
 * jQuery Prove (https://github.com/dhollenbecl/jquery-prove)
 */
!function ($) {
	"use strict";

	/**
	 * Constructor to create a new instance using the given element.
	 *
	 * @param {jQuery} element
	 * @param {Object} options
	 * @returns {Prove}
	 */
	function Prove(element, options) {

		this.$element = $(element);

		this.options = this.mergeOptions($.extend({}, options, this.$element.data()));

		console.log('Prove()', this.options);

		this.setupFields();
	}

	//$.Prove = Prove;
	//$.Prove.xxx = function(){};

	//$.Prove.prototype.defaults = {
	Prove.prototype = {

		defaults: {
			/**
			 * Triggered on change of the prove.
			 *
			 * Not triggered when selecting/deselecting options manually.
			 *
			 * @param {jQuery} option
			 * @param {Boolean} checked
			 */
			onChange : function(option, checked) {

			},
			/**
			 * Triggered after initializing.
			 *
			 * @param {jQuery} $select
			 * @param {jQuery} $container
			 */
			onInitialized: function($element, $container) {

			},
			option1: false,
			option2: 'btn btn-default',
			templates: {
				button: '<button type="button" class="prove dropdown-toggle" data-toggle="dropdown"><span class="prove-selected-text"></span> <b class="caret"></b></button>',
				liGroup: '<li class="prove-item prove-group"><label></label></li>'
			}
		},

		constructor: Prove,

		/**
		 * Builds the container of the prove.
		 */
		buildContainer: function() {
			//this.$container = $(this.options.buttonContainer);
			//this.$container.on('show.bs.dropdown', this.options.onDropdownShow);
			//this.$container.on('hide.bs.dropdown', this.options.onDropdownHide);
			//this.$container.on('shown.bs.dropdown', this.options.onDropdownShown);
			//this.$container.on('hidden.bs.dropdown', this.options.onDropdownHidden);
		},

		/**
		 * Unbinds the whole plugin.
		 */
		destroy: function() {
			console.log('destroy()');
			//this.$container.remove();
			//this.$element.show();
			//this.$element.data('prove', null);

			var el = this.$element;
			el.data('prove', false);

			this.teardownFields();

			el.trigger('prove.destroyed');
		},

		/**
		 * Refreshs the prove based on the selected options of the select.
		 */
		refresh: function () {

		},

		/**
		 * Select all options of the given values.
		 *
		 * If triggerOnChange is set to true, the on change event is triggered if
		 * and only if one value is passed.
		 *
		 * @param {Array} selectValues
		 * @param {Boolean} triggerOnChange
		 */
		select: function(selectValues, triggerOnChange) {

		},

		/**
		 * Clears all selected items.
		 */
		clearSelection: function () {
			//this.deselectAll(false);
			//this.updateButtonText();
			//this.updateSelectAll();
		},

		/**
		 * Deselects all options of the given values.
		 *
		 * If triggerOnChange is set to true, the on change event is triggered, if
		 * and only if one value is passed.
		 *
		 * @param {Array} deselectValues
		 * @param {Boolean} triggerOnChange
		 */
		deselect: function(deselectValues, triggerOnChange) {

		},

		/**
		 * Rebuild the plugin.
		 *
		 * Rebuilds the dropdown, the filter and the select all option.
		 */
		rebuild: function() {

		},

		/**
		 * Enable the prove.
		 */
		enable: function() {
			//this.$element.prop('disabled', false);
			//this.$button.prop('disabled', false)
			//	.removeClass('disabled');
		},

		/**
		 * Disable the prove.
		 */
		disable: function() {
			//this.$element.prop('disabled', true);
			//this.$button.prop('disabled', true)
			//	.addClass('disabled');
		},

		/**
		 * Set the options.
		 *
		 * @param {Array} options
		 */
		setOptions: function(options) {
			this.options = this.mergeOptions(options);
		},

		/**
		 * Merges the given options with the default options.
		 *
		 * @param {Array} options
		 * @returns {Array}
		 */
		mergeOptions: function(options) {
			return $.extend(true, {}, this.defaults, this.options, options);
		},

		//return jquery selector that represents the element in the DOM
		domSelector: function(name, field){
			return (field.selector)
				? field.selector
				: '[name="' + name + '"]';
		},
		//return string of space seperated events used to detect change to the DOM element
		domEvents: function(name, field){
			return 'change keyup click blur';
		},
		setupFields: function(options){

			var opts = options || this.options;
			var fields = opts.fields || {};
			var that = this;

			console.log('setupFields()');

			$.each(fields, function(name, field){
				that.bindDomEvent(name, field);
			});
		},
		teardownFields: function(options){

			var opts = options || this.options;
			var fields = opts.fields || {};
			var that = this;

			console.log('teardownFields()');

			$.each(fields, function(name, field){
				that.unbindDomEvent(name, field);
			});
		},
		//delagate events on form form for specific field
		bindDomEvent: function(name, field){

			var el = this.$element;
			var events = this.domEvents(name, field);
			var selector = this.domSelector(name, field);

			console.log('bindDomEvents()', events, selector);

			// http://api.jquery.com/on/
			el.on(events, selector, field, this.validateFieldHandler);
		},
		unbindDomEvent: function(name, field){
			var el = this.$element;
			var events = this.domEvents(name, field);
			var selector = this.domSelector(name, field);

			console.log('unbindDomEvents()', events, selector);

			// http://api.jquery.com/off/
			el.off(events, selector);
		},
		validateFieldHandler: function(event){

			var input = $(event.target);
			var value = input.val();
			var field = event.data;
			//var normalizer = event.data.normalizer;

			//todo: add data normalizer
			//value = normalizer(value);

			console.log('validateFieldHandler()', field);
		}
	};

	$.fn.prove = function(option, parameter, extraOptions) {
		//console.log('prove()', option);

		return this.each(function() {

			var el = $(this);
			var data = el.data('prove');
			var options = typeof option === 'object' && option;
			var isInitialized = (data);

			// either initialize or call public method
			if (!isInitialized) {
				// initialize new instance
				data = new Prove(this, options);
				el.data('prove', data);
				el.trigger('prove.initialized');
			} else if (typeof option === 'string') {
				// call public method
				data[option](parameter, extraOptions);
			} else {
				throw new Error('invalid invocation.');
			}
		});
	};

	$.fn.prove.Constructor = Prove;

}(window.jQuery);