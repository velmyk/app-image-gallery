'use strict';

const fileService = require('../../services/fileService');

const SOURCE_DIR = '/server/api/searchImageForm/';

const sendFile = (res, file) => {
  res.writeHead(200, {'Content-Type': 'text/html' });
  res.end(file);
};

const showError = (err) => {
  console.error(err);
};

const searchImageForm = (req, res) => {

	fileService.readFile(SOURCE_DIR, 'searchImageForm.html')
		.then(sendFile.bind(null, res))
		.catch(showError);
};

module.exports = searchImageForm;