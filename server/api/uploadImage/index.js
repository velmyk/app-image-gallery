'use strict';

const multiparty = require('multiparty');

const fileService = require('../../services/fileService');

const TEMPLATE_SOURCE_DIR = '/server/api/uploadImage/',
      SOURCE_DIR = './public/';

const sendTemplate = (res, file) => {
  res.writeHead(200, {'Content-Type': 'text/html' });
  res.end(file);
};

const showError = (err) => {
  console.error(err);
};

const parseForm = (req) => {
  const form = new multiparty.Form();

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      err ? reject(err) : resolve(files.f[0]);
    });
  });
  
};

const uploadImage = (req, res) => {

  if (req.method === 'GET') {
    fileService.readFile(TEMPLATE_SOURCE_DIR, '/uploadForm.html')
      .then(sendTemplate.bind(null, res))
      .catch(showError);
  }

  if (req.method === 'POST') {
    parseForm(req)
      .then(fileService.copyFile.bind(null, SOURCE_DIR))
      .catch(showError);
  }
  
}

module.exports = uploadImage;


