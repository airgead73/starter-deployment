const http = require('http');
const app = require('./app/app.js')
const port = process.env.PORT || 6060;

if (port === undefined) {
  throw new Error(
    "Port is not defined."
  );
}

app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      console.log(`Port ${port} requires privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.log(`Port ${port} is already in use.`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {  
  console.log(`Listening on ${port}.`)
}