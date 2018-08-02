const express = require('express');
const application = express();

const apiUserRoutes = require('./APIUser');
application.use('/api/user', apiUserRoutes);

const apiHealthRoutes = require('./APIHealth');
application.use('/health', apiHealthRoutes);

module.exports = application;