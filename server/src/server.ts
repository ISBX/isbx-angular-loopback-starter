import loopback = require('loopback');
import boot = require('loopback-boot');
require('events').EventEmitter.prototype._maxListeners = 100;

const app = loopback();

// boot scripts mount components like REST API
boot(app, __dirname);

app.start = () => {
  // start the web server
  return app.listen(() => {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// start the server if `$ node server.js`
if (require.main === module || app.get('env') === 'test') {
  app.start();
}

export = app;
