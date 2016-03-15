'use strict';

const fs = require('fs'),
      path = require('path');

const EXCEPTIONS = require('./EXCEPTIONS');

const getCreationTime = (file) => {
  return file.stat.birthtime.getTime();
}

const isFileOlder = (fileToCompare, fileToCompareWith) => {
  return getCreationTime(fileToCompare) < getCreationTime(fileToCompareWith);
};

const getFileStat = (sourceDir, fileName) => {
  return new Promise((resolve, reject) => {
    fs.stat(path.join(basePath, sourceDir, fileName), (err, fileStat) => {
      err ? reject(err)
          : resolve({
              stat: fileStat,
              name: fileName
            });
    });
  });
};

const getAllFiles = (sourceDir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(path.join(basePath, sourceDir), (err, files) => {
      err ? reject(err) : resolve(files);
    });
  });
};

const findLatestFile = (files) => {
  return new Promise((resolve, reject) => {
    if(!files.length) reject(new Error(EXCEPTIONS.NO_FILES_FOUND));
    let latestFile = files.reduce((result, current) => {
          return isFileOlder(result, current) ? current : result;  
        });
    resolve(latestFile.name);
  });
};

const readFile = (sourceDir, fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(basePath, sourceDir, fileName), (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
};

const copyFile = (targetDir, file) => {
  let tempPath = file.path,
      fileName = file.originalFilename;

  return new Promise((resolve, reject) => {
    fs.rename(tempPath, targetDir + fileName, (err) => {  
      err ? reject(err) : resolve('success');
    });
  });
};

const service = {
  getAllFiles: getAllFiles,
  findLatestFile: findLatestFile,
  readFile: readFile,
  getFileStat: getFileStat,
  copyFile: copyFile
};

module.exports = service;