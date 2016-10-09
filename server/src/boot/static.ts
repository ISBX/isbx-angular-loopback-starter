import express = require('express');
import path = require('path');

export = (server) => {
  let outDir = __dirname + '/../../../client/dist';

  if (server.get('env') ===  'development') {
    let webpackDevMiddleware = require('webpack-dev-middleware');
    let webpack = require('webpack');
    let config = require(__dirname + '/../../../config/webpack.development.js');

    let compiler = webpack(config);
    let middleware = webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath
    });

    server.use(middleware);

    server.get('*', (req, res) => {
      const index = middleware.fileSystem.readFileSync(path.join(config.output.path, 'index.html'));
      res.end(index);
    });
  } else {
    server.use(express.static(outDir));
  }

};
