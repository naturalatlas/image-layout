function generateGrid(layoutName, options) {
	var layout = require('../layouts/' + layoutName + '.js');
	var images = [
		{src: 'photos/1.jpg', width: 600/2, height: 400/2},
		{src: 'photos/2.jpg', width: 400/2, height: 600/2},
		{src: 'photos/3.jpg', width: 480/2, height: 600/2},
		{src: 'photos/4.jpg', width: 600/2, height: 355/2},
		{src: 'photos/5.jpg', width: 600/2, height: 400/2},
		{src: 'photos/6.jpg', width: 600/2, height: 400/2},
		{src: 'photos/7.jpg', width: 600/2, height: 366/2}
	];

	// calculate positioning
	var photoset = document.createElement('div');
	photoset.className = 'photos';
	var result = layout(images, options);

	// build html
	var elements = [];
	var positions = result.positions;
	for (var i = 0, n = positions.length; i < n; i++) {
		elements.push('<div style="background-image:url(' + images[i].src + ');width:' + positions[i].width + ';height:' + positions[i].height + ';left:' + positions[i].x + ';top:' + positions[i].y + ';position:absolute;"></div>');
	}
	photoset.innerHTML = elements.join('');
	photoset.style.width = result.width;
	photoset.style.height = result.height;

	var container = document.createElement('div');
	container.innerHTML += '<h2><code>' + layoutName + '</code></h2>';
	container.appendChild(photoset);
	document.body.appendChild(container);
};

generateGrid('fixed-columns', {
	containerWidth: 500,
	columnCount: 3
});

generateGrid('fixed-partition', {
	containerWidth: 500,
	idealElementHeight: 150
});