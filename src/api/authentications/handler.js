class AuthenticationsHandler {
  constructor(userService, validator, tokenManager, authenticationsService) {
    this._userService = userService;
    this._validator = validator;
    this._tokenManager = tokenManager;
    this._authenticationsService = authenticationsService;
  }

  async postAuthenticationHandler(request, h) {
    this._validator.validatePostAuthenticationPayload(request.payload);
    const { username, password } = request.payload;
    const id = await this._userService.verifyUserCredential(username, password);
    const payload = { id };

    const accessToken = this._tokenManager.generateAccessToken(payload);
    const refreshToken = this._tokenManager.generateRefreshToken(payload);

    await this._authenticationsService.addRefreshToken(refreshToken);

    const response = h.response({
      status: 'success',
      message: 'success authentications',
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  async putAuthenticationHandler(request) {
    this._validator.validatePutAuthenticationPayload(request.payload);
    const { refreshToken } = request.payload;

    await this._authenticationsService.verifyRefreshToken(refreshToken);
    const { id } = this._tokenManager.verifyRefreshToken(refreshToken);

    const accessToken = this._tokenManager.generateAccessToken(id);

    return {
      status: 'success',
      message: 'success renew token',
      data: {
        accessToken,
      },
    };
  }

  async deleteAuthenticationHandler(request) {
    this._validator.validateDeleteAuthenticationPayload(request.payload);
    const { refreshToken } = request.payload;

    await this._authenticationsService.verifyRefreshToken(refreshToken);
    await this._authenticationsService.deleteRefreshToken(refreshToken);

    return {
      status: 'success',
      message: 'success delete',
    };
  }
}

module.exports = AuthenticationsHandler;
