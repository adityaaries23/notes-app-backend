/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
const AuthenticationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'authentications',
  version: '1.0.0',
  register: async (
    server,
    { authenticationsService, userService, tokenManager, validator }
  ) => {
    const authenticationHandler = new AuthenticationsHandler(
      userService,
      validator,
      tokenManager,
      authenticationsService
    );
    server.route(routes(authenticationHandler));
  },
};
