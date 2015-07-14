/**
 * text-progress - v0.1.1 - 15-07-2015
 * @desciption TextProgress is a simple text-based progress indicator.
 * @copyright Aliaksandr Astashenkau <dfsq.dfsq@gmail.com>.
 * @licence MIT.
 */
(function (root, factory) {

	'use strict';

	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([], factory);
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	} else {
		// Browser globals (root is window)
		root.TextProgress = factory();
	}
}(this, function () {

	'use strict';

	// Helper utility functions
	var utils = {

		mixin: function mix() {
			var arg, prop, result = {};
			for (arg = 0; arg < arguments.length; arg++) {
				for (prop in arguments[arg]) {
					if (arguments[arg].hasOwnProperty(prop)) {
						result[prop] = arguments[arg][prop];
					}
				}
			}
			return result;
		},

		template: function(str, data) {
			return str.replace(/\${(.*?)}/g, function(a, b) {
				return typeof data[b] !== 'undefined' ? data[b] : '';
			});
		}
	};


	function TextProgress(options) {
		this.options = utils.mixin({
			max: 100
		}, options);
		this.element = this.options.element;
		this.element.classList.add('progress');
		this.progressType = this.getRenderer(options.type);
	}

	TextProgress.prototype = {

		constructor: TextProgress,

		display: function() {
			this.element.innerHTML = this.progressType.render(this.getPercent(), this.value, this.options.max);
		},

		set: function(value) {
			this.value = value;
			this.display();
		},

		increment: function(value) {
			this.set(this.value + value);
		},

		getRenderer: function(type) {
			var options = typeof type === 'object' ? type : {name: type};
			return new TextProgress.TYPES[options.name](options);
		},

		getPercent: function() {
			return Math.ceil(this.value * 100 / this.options.max);
		}
	};

	TextProgress.TYPES = {

		simple: function() {
			return {
				render: function(percent) {
					return percent + '%';
				}
			};
		},

		terminal: function(options) {

			var defaults = {
				width: 20,
				charCompleted: '=',
				charRemaining: '−',
				template: '[<span class="completed">${completed}</span><span class="remaining">${remaining}</span>] ${percent}%'
			};

			return {
				options: utils.mixin(defaults, options),
				render: function(percent) {

					var completed = Math.floor(this.options.width * percent / 100),
						remaining = this.options.width - completed,
						completedStr = new Array(completed + 1).join(this.options.charCompleted),
						remainingStr = new Array(remaining + 1).join(this.options.charRemaining);

					return utils.template(this.options.template, {
						completed: completedStr,
						remaining: remainingStr,
						percent: percent
					});
				}
			};
		},

		changes: function(options) {

            var defaults = {
				charCompleted: '+',
				charRemaining: '−',
                template: '${total} <span class="completed">${completed}</span><span class="remaining">${remaining}</span>'
            };

            return {
                options: utils.mixin(defaults, options),
                render: function(percent, value) {

                    var completedStr = new Array(value + 1).join(this.options.charCompleted),
                        remainingStr = new Array(this.options.total - value + 1).join(this.options.charRemaining);

                    return utils.template(this.options.template, {
						completed: completedStr,
						remaining: remainingStr,
                        total: this.options.total
                    });
                }
            };
        }
	};

	return TextProgress;
}));
