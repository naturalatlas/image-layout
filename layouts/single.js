/**
 * Algorithm: fixed-columns
 *
 * Options:
 *   - maxWidth   Max width of the parent container (in pixels)
 *   - maxHeight   Max height of the parent container (in pixels)
 *
 * @throws
 * @param {object[]} elements
 * @param {object} options
 * @return {object}
 */
module.exports = function(elements, options) {
	var el = elements[0];

	var scale = 1;
	if (el.width * scale > options.maxWidth) scale = options.maxWidth / el.width;
	if (el.height * scale > options.maxHeight) scale *= options.maxHeight / (scale * el.height);

	var w = Math.round(el.width * scale) + 'px';
	var h = Math.round(el.height * scale) + 'px';

	return {
		width: w,
		height: h,
		positions: [{x: '0px', y: '0px', width: w, height: h}]
	};
};
