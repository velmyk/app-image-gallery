'use strict';

global.basePath = __dirname;

const 	http = require('http');

const reqHandler = require('./server/api');

require('dotenv').load();

const port = process.env.SERVER_PORT;

http.createServer(reqHandler).listen(port);

console.log('node server running on port ' + port);