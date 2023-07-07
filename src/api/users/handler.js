class UserHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postUserHandler(request, h) {
    this._validator.validateUserPayload(request.payload);
    const userId = await this._service.addUser(request.payload);

    const response = h.response({
      status: 'success',
      message: 'success save user',
      data: {
        userId,
      },
    });
    response.code(201);
    return response;
  }

  async getUserHandler(request) {
    const { id } = request.params;
    const user = await this._service.getUser(id);

    return {
      status: 'success',
      data: {
        user: {
          id: user.id,
          username: user.username,
          fullname: user.fullname,
        },
      },
    };
  }
}

module.exports = UserHandler;
