const http = require('http');
const application = require('./application');
const constantes = require('../library/constantes');
const multicastRecver = require('../library/multicastRecver');
const port = process.env.PORT || 0;

let AFORegisteryUrl = [];

const server = http.createServer(application);
server.listen(port, function () {
  var host = constantes.getServerIpAddress();
  var port = server.address().port
  var intervalObj = setInterval(() => {
    if (0 !== AFORegisteryUrl.length) {
      constantes.declareService(AFORegisteryUrl, constantes.MSTypeEnum.afoAuthent, host, port, constantes.MSPathnameEnum.afoAuthent);
    }
  }, 10000);
  console.log("AuthentSrv listening at http://%s:%s", host, port)
});

const mcRecver = new multicastRecver(constantes.getServerIpAddress(), constantes.MCastAppPort, constantes.MCastAppAddr, (address, port, message) => {
  console.log('AuthentSrv : MCast Msg: From: ' + address + ':' + port + ' - ' + JSON.stringify(message));
  var regUrl = 'http://' + message.host + ':' + message.port;
  if (-1 === AFORegisteryUrl.indexOf(regUrl)) {
    AFORegisteryUrl.push(regUrl);
  }
});

console.log('AuthentSrv RESTful API server started on: ' + port);
