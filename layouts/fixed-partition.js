/**
 * Algorithm: fixed-partition
 *
 * The algorithm outlined by Johannes Treitz in "The algorithm
 * for a perfectly balanced photo gallery" (see url below).
 *
 * Options:
 *   - containerWidth      Width of the parent container (in pixels)
 *   - idealElementHeight  Ideal element height (in pixels)
 *   - spacing             Spacing between items (in pixels)
 *
 * @throws
 * @see https://www.crispymtn.com/stories/the-algorithm-for-a-perfectly-balanced-photo-gallery
 * @param {object[]} elements
 * @param {object} options
 * @return {object}
 */
module.exports = function(elements, options) {
	var i, n, positions = [], elementCount;

	var spacing = options.spacing || 0;
	var containerWidth = options.containerWidth;
	var idealHeight = options.idealElementHeight || (containerWidth / 3);
	if (!containerWidth) throw new Error('Invalid container width');

	// calculate aspect ratio of all photos
	var aspect;
	var aspects = [];
	var aspects100 = [];
	for (i = 0, n = elements.length; i < n; i++) {
		aspect = elements[i].width / elements[i].height;
		aspects.push(aspect);
		aspects100.push(Math.round(aspect * 100));
	}

	// calculate total width of all photos
	var summedWidth = 0;
	for (i = 0, n = aspects.length; i < n; i++) {
		summedWidth += aspects[i] * idealHeight;
	}

	// calculate rows needed
	var rowsNeeded = Math.round(summedWidth / containerWidth)

	// adjust photo sizes
	if (rowsNeeded < 1) {
		// (2a) Fallback to just standard size
		var xSum = 0, width;
		elementCount = elements.length;

		var padLeft = 0;
		if (options.align === 'center') {
			var spaceNeeded = (elementCount-1)*spacing;
			for (var i = 0; i < elementCount; i++) {
				spaceNeeded += Math.round(idealHeight * aspects[i]) - (spacing * (elementCount - 1) / elementCount);
			}
			padLeft = Math.floor((containerWidth - spaceNeeded) / 2);
		}

		for (var i = 0; i < elementCount; i++) {
			width = Math.round(idealHeight * aspects[i]) - (spacing * (elementCount - 1) / elementCount);
			positions.push({
				y: 0,
				x: padLeft + xSum,
				width: width,
				height: idealHeight
			});
			xSum += width;
			if (i !== n - 1) {
				xSum += spacing;
			}
		}
		ySum = idealHeight;
	} else {
		// (2b) Distribute photos over rows using the aspect ratio as weight
		var partitions = linear_partition(aspects100, rowsNeeded);
		var index = 0;
		var ySum = 0, xSum;
		for (i = 0, n = partitions.length; i < n; i++) {
			var element_index = index;
			var summedRatios = 0;
			for (j = 0, k = partitions[i].length; j < k; j++) {
				summedRatios += aspects[element_index + j];
				index++;
			}

			xSum = 0;
			height = Math.round(containerWidth / summedRatios);
			elementCount = partitions[i].length;
			for (j = 0; j < elementCount; j++) {
				width = Math.round((containerWidth - (elementCount - 1) * spacing) / summedRatios * aspects[element_index + j]);
				positions.push({
					y: ySum,
					x: xSum,
					width: width,
					height: height
				});
				xSum += width;
				if (j !== elementCount - 1) {
					xSum += spacing;
				}
			}
			ySum += height;
			if (i !== n - 1) {
				ySum += spacing;
			}
		}
	}

	return {
		width: containerWidth,
		height: ySum,
		positions: positions
	};
};

/**
 * Partitions elements into rows.
 *
 * @author Johannes Treitz <https://twitter.com/jtreitz>
 * @see https://www.crispymtn.com/stories/the-algorithm-for-a-perfectly-balanced-photo-gallery
 * @param {int[]} seq
 * @param {int} k
 * @return {int[][]}
 */
var linear_partition = function(seq, k) {
	var ans, i, j, m, n, solution, table, x, y, _i, _j, _k, _l;
	var _m, _nn;

	n = seq.length;
	if (k <= 0) {
		return [];
	}
	if (k > n) {
		return seq.map(function(x) {
			return [x];
		});
	}
	table = (function() {
		var _i, _results;
		_results = [];
		for (y = _i = 0; 0 <= n ? _i < n : _i > n; y = 0 <= n ? ++_i : --_i) {
			_results.push((function() {
				var _j, _results1;
				_results1 = [];
				for (x = _j = 0; 0 <= k ? _j < k : _j > k; x = 0 <= k ? ++_j : --_j) {
					_results1.push(0);
				}
				return _results1;
			})());
		}
		return _results;
	})();
	solution = (function() {
		var _i, _ref, _results;
		_results = [];
		for (y = _i = 0, _ref = n - 1; 0 <= _ref ? _i < _ref : _i > _ref; y = 0 <= _ref ? ++_i : --_i) {
			_results.push((function() {
				var _j, _ref1, _results1;
				_results1 = [];
				for (x = _j = 0, _ref1 = k - 1; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
					_results1.push(0);
				}
				return _results1;
			})());
		}
		return _results;
	})();
	for (i = _i = 0; 0 <= n ? _i < n : _i > n; i = 0 <= n ? ++_i : --_i) {
		table[i][0] = seq[i] + (i ? table[i - 1][0] : 0);
	}
	for (j = _j = 0; 0 <= k ? _j < k : _j > k; j = 0 <= k ? ++_j : --_j) {
		table[0][j] = seq[0];
	}
	for (i = _k = 1; 1 <= n ? _k < n : _k > n; i = 1 <= n ? ++_k : --_k) {
		for (j = _l = 1; 1 <= k ? _l < k : _l > k; j = 1 <= k ? ++_l : --_l) {

			m = [];
			for (x = _m = 0; 0 <= i ? _m < i : _m > i; x = 0 <= i ? ++_m : --_m) {
				m.push([Math.max(table[x][j - 1], table[i][0] - table[x][0]), x]);
			}

			var minValue, minIndex = false;
			for (_m = 0, _nn = m.length; _m < _nn; _m++) {
				if (_m === 0 || m[_m][0] < minValue) {
					minValue = m[_m][0];
					minIndex = _m;
				}
			}

			m = m[minIndex];
			table[i][j] = m[0];
			solution[i - 1][j - 1] = m[1];
		}
	}
	n = n - 1;
	k = k - 2;
	ans = [];
	while (k >= 0) {
		ans = [
			(function() {
				var _m, _ref, _ref1, _results;
				_results = [];
				for (i = _m = _ref = solution[n - 1][k] + 1, _ref1 = n + 1; _ref <= _ref1 ? _m < _ref1 : _m > _ref1; i = _ref <= _ref1 ? ++_m : --_m) {
					_results.push(seq[i]);
				}
				return _results;
			})()
		].concat(ans);
		n = solution[n - 1][k];
		k = k - 1;
	}
	return [
		(function() {
			var _m, _ref, _results;
			_results = [];
			for (i = _m = 0, _ref = n + 1; 0 <= _ref ? _m < _ref : _m > _ref; i = 0 <= _ref ? ++_m : --_m) {
				_results.push(seq[i]);
			}
			return _results;
		})()
	].concat(ans);
};
