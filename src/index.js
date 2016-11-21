import Hapi from 'hapi';
import Application from './lib';
import Controller from './lib/controller';

// create a server with a host and port
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000
});

const application = new Application({
  // responds to http://localhost:8000/
  '/': Controller
}, {
  server: server
});

application.start();