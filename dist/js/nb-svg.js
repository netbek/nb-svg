/**
 * AngularJS directives for SVG
 *
 * @author Hein Bekker <hein@netbek.co.za>
 * @copyright (c) 2015 Hein Bekker
 * @license http://www.gnu.org/licenses/agpl-3.0.txt AGPLv3
 */

(function (window, angular, undefined) {
	'use strict';

	angular
		.module('nb.svg', [])
		.directive('nbSvgViewBox', nbSvgViewBox)
		.directive('nbSvgViewBoxOnce', nbSvgViewBoxOnce)
		.directive('nbSvgXlinkHref', nbSvgXlinkHref)
		.directive('nbSvgXlinkHrefOnce', nbSvgXlinkHrefOnce);

	function nbSvgViewBox () {
		return {
			link: function (scope, element, attrs, controller) {
				var watch = scope.$watch(function attrs (scope) {
					return {
						width: attrs.width,
						height: attrs.height
					};
				}, function (newValue, oldValue, scope) {
					if (newValue.width && newValue.height) {
						element.attr('viewBox', '0 0 ' + newValue.width + ' ' + newValue.height);
					}
				}, true);

				scope.$on('$destroy', function () {
					watch();
				});
			}
		};
	}

	/**
	 * One-time binding.
	 */
	function nbSvgViewBoxOnce () {
		return {
			link: function (scope, element, attrs, controller) {
				var watch = scope.$watch(function attrs (scope) {
					var width, height;

					if (attrs['data-width'] && attrs['data-height']) {
						width = attrs['data-width'];
						height = attrs['data-height'];
					}
					else if (attrs.width && attrs.height) {
						width = attrs.width;
						height = attrs.height;
					}

					return {
						width: width,
						height: height
					};
				}, function (newValue, oldValue, scope) {
					if (newValue.width && newValue.height) {
						element.attr('viewBox', '0 0 ' + newValue.width + ' ' + newValue.height);
					}
					watch();
				}, true);

				scope.$on('$destroy', function () {
					watch();
				});
			}
		};
	}

	// Based on http://stackoverflow.com/a/16988147
	nbSvgXlinkHref.$inject = ['$sniffer'];
	function nbSvgXlinkHref ($sniffer) {
		return {
			priority: 99,
			link: function (scope, element, attrs) {
				attrs.$observe('nbSvgXlinkHref', function (value) {
					if (!value) {
						return;
					}

					attrs.$set('xlink:href', value);

					if ($sniffer.msie) {
						element.prop('xlink:href', value);
					}
				});

				scope.$on('$destroy', function () {
					// If IE, then remove the property before the DOM element is
					// removed, to prevent memory leak in IE < 9.
					if ($sniffer.msie) {
						element.removeProp('xlink:href');
					}
				});
			}
		};
	}

	/**
	 * One-time binding.
	 */
	nbSvgXlinkHrefOnce.$inject = ['$sniffer'];
	function nbSvgXlinkHrefOnce ($sniffer) {
		return {
			priority: 99,
			link: function (scope, element, attrs) {
				attrs.$observe('nb-svg-xlink-href-once-value', function (value) {
					attrs.$set('xlink:href', value);

					if ($sniffer.msie) {
						element.prop('xlink:href', value);
					}
				});

				scope.$on('$destroy', function () {
					// If IE, then remove the property before the DOM element is
					// removed, to prevent memory leak in IE < 9.
					if ($sniffer.msie) {
						element.removeProp('xlink:href');
					}
				});
			}
		};
	}
})(window, window.angular);