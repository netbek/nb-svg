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
		.directive('nbSvgXlinkHref', nbSvgXlinkHref);

	function nbSvgViewBox () {
		return {
			link: function (scope, element, attrs) {
				function set (value) {
					if (!value || !attrs.width || !attrs.height) {
						return;
					}

					element.attr('viewBox', '0 0 ' + attrs.width + ' ' + attrs.height);
				}

				attrs.$observe('width', set);
				attrs.$observe('height', set);
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
})(window, window.angular);