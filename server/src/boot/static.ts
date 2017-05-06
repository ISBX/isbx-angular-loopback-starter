import express = require('express');
import path = require('path');

export = (server) => {
  let outDir = __dirname + '/../../../client/dist';

  server.use(express.static(outDir));

  if (server.get('env') ===  'development') {
    server.get('*', (req, res) => {
      const index = path.join(outDir, 'index.html');
      res.sendFile(index);
    });
  }

};
