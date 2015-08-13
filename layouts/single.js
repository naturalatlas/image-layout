/**
 * Algorithm: fixed-columns
 *
 * Options:
 *   - containerWidth Max width of the parent container (in pixels)
 *   - maxHeight Max height of the parent container (in pixels)
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
	if (el.height * scale > options.containerWidth) scale *= options.containerWidth / (scale * el.height);

	var w = Math.round(el.width * scale);
	var h = Math.round(el.height * scale);
	var padLeft = options.align === 'center' ? Math.floor((options.containerWidth - w)/2) : 0;

	return {
		width: options.containerWidth,
		height: h,
		positions: [{x: padLeft, y: 0, width: w, height: h}]
	};
};
