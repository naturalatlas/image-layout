/**
 * Algorithm: fixed-columns
 *
 * Options:
 *   - containerWidth   Width of the parent container (in pixels)
 *   - columnCount      Number of columns
 *
 * @throws
 * @param {object[]} elements
 * @param {object} options
 * @return {object}
 */
module.exports = function(elements, options) {
	var i, j, l, n, k, limit, i_column,col, colMin, src_width, src_height, dst_width, dst_height, aspect;

	var containerWidth = options.containerWidth;
	if (!containerWidth) throw new Error('Invalid container width');
	var columnCount = options.columnCount || 3;
	var columnWidth = Math.round(containerWidth / columnCount);
	var maxSpan = options.maxSpan || 3;

	var positions = [];
	var cols = [];
	for (i = 0; i < columnCount; i++) {
		cols.push(0);
	}

	// distribute images to columns as evenly as possible
	for (i = 0, n = elements.length; i < n; i++) {
		src_width = elements[i].width;
		src_height = elements[i].height;
		aspect = src_width / src_height;
		dst_width = columnWidth;
		dst_height = Math.round(dst_width / aspect);

		// pick the column that is least-filled
		colMin = false;
		for (i_column = 0, k = columnCount; i_column < k; i_column++) {
			if (colMin === false || cols[i_column] < colMin) {
				colMin = cols[i_column];
				col = i_column;
			}
		}

		// update the column heights
		var y = cols[col];
		cols[col] += dst_height;

		positions.push({
			x: (col * columnWidth) + 'px',
			y: y + 'px',
			width: dst_width + 'px',
			height: dst_height + 'px'
		});
	}

	// TODO: equalize columns w/option?
	return {
		width: containerWidth + 'px',
		height: Math.max.apply(Math, cols) + 'px',
		positions: positions
	}
};