const express = require('express');
const application = express();

const apiUserRoutes = require('./APIUser');
application.use('/api/user', apiUserRoutes);

module.exports = application;