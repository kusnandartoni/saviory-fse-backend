var express = require('express');
var cors = require('cors');
var app = express();
var db = require('./db');

app.use(cors());
var UserController = require('./user/UserController');
app.use('/users', UserController);
var AuthController = require('./auth/AuthController');
app.use('/auth', AuthController);

module.exports = app;