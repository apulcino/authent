const http = require('http');
const application = require('./application');
const port = process.env.PORT || 3000;
const server = http.createServer(application);
server.listen(port, function () {
    
      var host = server.address().address
      var port = server.address().port
    
      console.log("Example app listening at http://%s:%s", host, port)
    
    });
console.log('todo list RESTful API server started on: ' + port);
