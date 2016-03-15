'use strict';

const 	fileService = require('../../services/fileService'),
		    EXCEPTIONS = require('../../services/EXCEPTIONS.js');

const SOURCE_DIR = '/public/';

const sendFile = (res, file) => {
  res.writeHead(200, {'Content-Type': 'image/png' });
  res.end(file);
};

const showError = (res, err) => {
	if (err.message === EXCEPTIONS.NO_FILES_FOUND) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		return res.end(err.message)
	};
	
	console.error(err.message);
};

const lastImage = (req, res) => {
  fileService.getAllFiles(SOURCE_DIR)
    .then(files => Promise.all(files.map(fileService.getFileStat.bind(null, SOURCE_DIR))))
    .then(fileService.findLatestFile)
    .then(fileService.readFile.bind(null, SOURCE_DIR))
    .then(sendFile.bind(null, res))
    .catch(showError.bind(null, res));
};
  

module.exports = lastImage;