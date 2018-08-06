const constantes = require('../library/constantes');
const express = require('express');
const application = express();

const apiUserRoutes = require('./APIUser');
application.use(constantes.MSPathnameEnum.afoAuthent, apiUserRoutes);

const apiHealthRoutes = require('./APIHealth');
application.use(constantes.MSPathnameEnum.afoHealth, apiHealthRoutes);

module.exports = application;