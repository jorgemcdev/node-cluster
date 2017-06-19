'use strict';

var _cluster = require('cluster');

var _cluster2 = _interopRequireDefault(_cluster);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var numCPUs = process.argv['2'] || _os2.default.cpus().length; /* eslint global-require: 0*/

if (numCPUs > _os2.default.cpus().length) {
  numCPUs = _os2.default.cpus().length;
}

if (_cluster2.default.isMaster) {
  _winston2.default.info('Master ' + process.pid + ' is running');

  for (var i = 0; i < numCPUs; i += 1) {
    _cluster2.default.fork();
  }

  _cluster2.default.on('online', function (worker) {
    _winston2.default.info('Worker ' + worker.process.pid + ' is listening');
  });

  _cluster2.default.on('exit', function (worker, code, signal) {
    if (signal) {
      _winston2.default.warning('Worker ' + worker.process.pid + ' killed by signal: ' + signal);
    } else if (code !== 0) {
      _winston2.default.warning('Worker exited with error code: ' + code);
    } else {
      _winston2.default.info('Worker ' + worker.process.pid + ' Success');
    }
    _cluster2.default.fork();
  });
} else {
  require('./server');
}