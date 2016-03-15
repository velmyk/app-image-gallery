'use strict';

const 	url = require('url');

const 	showLanding = require('./showLanding'),
		uploadImageForm = require('./uploadImage'),
		lastImage = require('./lastImage'),
		searchImageForm = require('./searchImageForm'),
		findImageByName = require('./findImageByName'),
		listOfImages = require('./listOfImages');

const 	routes = new Map();

routes.set('/', showLanding);
routes.set('/post', uploadImageForm);
routes.set('/last', lastImage);
routes.set('/search', searchImageForm);
routes.set('/find', findImageByName);
routes.set('/list', listOfImages);


const 	router = (req, res) => {
	let parsedUrl = url.parse(req.url).pathname;

	try {
		routes.get(parsedUrl)(req, res);
	} catch (err) {
		showLanding(req, res);
	}
};

module.exports = router;