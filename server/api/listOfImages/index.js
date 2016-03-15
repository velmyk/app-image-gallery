'use strict';

const 	fileService = require('../../services/fileService'),
		EXCEPTIONS = require('../../services/EXCEPTIONS.js');

const 	SOURCE_DIR = '/public/';

const 	sendList = (res, files) => {
	if (!files.length) files = [EXCEPTIONS.NO_FILES_FOUND];
 	res.writeHead(200, {'Content-Type': 'text/html' });
  	res.end(files.join('<br>'));
};

const 	showError = (err) => {
  console.error(err);
};

const 	listOfImages = (req, res) => {
	fileService.getAllFiles(SOURCE_DIR)
		.then(sendList.bind(null, res))
		.catch(showError);
};
  

module.exports = listOfImages;