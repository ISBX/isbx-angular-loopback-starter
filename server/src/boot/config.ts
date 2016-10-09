export = (server) => {
  const config = server.get('public');

  server.get('/config.js', (req, res) => {
    res.send(`window.config = ${JSON.stringify(config)};`);
  });
};
