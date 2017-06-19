'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use((0, _morgan2.default)('tiny'));

app.get('/', function (req, res) {
  res.status(200).send({ message: 'Wellcome' });
});

app.listen(3000, function (err) {
  if (err) _winston2.default.error('Cant Start Server.');
  _winston2.default.info('Server Started on PORT:3000');
});

exports.default = app;