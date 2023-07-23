const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: (request, h) => handler.postUserHandler(request, h),
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: (request) => handler.getUserHandler(request),
  },
  {
    method: 'GET',
    path: '/users',
    handler: (request) => handler.getUserByUsernameHandler(request),
  },
];

module.exports = routes;
