const loopback = require('loopback');

export = (server) => {
  // enable authentication
  server.enableAuth();

  server.middleware('auth', loopback.token({
    model: server.models.accessToken,
    currentUserLiteral: 'me'  // Allows /api/Accounts/me/ in place of /api/Account/:id
  }));
};
