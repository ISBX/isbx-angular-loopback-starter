import explorer = require('loopback-explorer');

export = (server) => {
  const restApiRoot = server.get('restApiRoot');

  const explorerApp = explorer(server, { basePath: restApiRoot });
  server.use('/explorer', explorerApp);
  server.once('started', () => {
    const baseUrl = server.get('url').replace(/\/$/, '');
    // express 4.x (loopback 2.x) uses `mountpath`
    // express 3.x (loopback 1.x) uses `route`
    const explorerPath = explorerApp.mountpath || explorerApp.route;
    console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
  });
};
