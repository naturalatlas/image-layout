var layout = require('../layouts/fixed-partition');
var containerWidth = 360;
var idealElementHeight = 280;
var elements = [{"width":1000,"height":666.6666666666666},{"width":1000,"height":1500},{"width":1000,"height":1500},{"width":1000,"height":666.6666666666666},{"width":1000,"height":666.6666666666666}];

console.log(layout(elements, {
	align: 'center',
	idealElementHeight: idealElementHeight,
	containerWidth: containerWidth,
	spacing: 5
}));
