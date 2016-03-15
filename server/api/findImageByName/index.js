'use strict';

const url = require('url');

const fileService = require('../../services/fileService');

const SOURCE_DIR = '/public/';

const sendFile = (res, file) => {
  res.writeHead(200, {'Content-Type': 'image/png' });
  res.end(file);
};

const showError = (res, err) => {
  res.writeHead(404);
  res.end('No Such File');
  console.error(err);
};

const findImageByName = (req, res) => {
    let parsedUrl = url.parse(req.url, true);

    fileService.readFile(SOURCE_DIR, parsedUrl.query.name + '.png')
      .then(sendFile.bind(null, res))
      .catch(showError.bind(null, res));
};
  

module.exports = findImageByName;