class CollaborationHandler {
  constructor(collaborationService, noteService, validator) {
    this._collaborationService = collaborationService;
    this._noteService = noteService;
    this._validator = validator;
  }

  async postCollaborationHandler(request, h) {
    this._validator.validateCollaborationPayload(request.payload);
    const { noteId, userId } = request.payload;
    const { id: credentialId } = request.auth.credentials;
    await this._noteService.verifyNoteOwner(noteId, credentialId);
    const collaborationId = await this._collaborationService.addCollaboration(
      noteId,
      userId,
    );
    const response = h.response({
      status: 'success',
      message: 'success add collaboration',
      data: {
        collaborationId,
      },
    });
    response.code(201);
    return response;
  }

  async deleteCollaborationHandler(request) {
    this._validator.validateCollaborationPayload(request.payload);
    const { noteId, userId } = request.payload;
    const { id: credentialId } = request.auth.credential;
    await this._noteService.verifyNoteOwner(noteId, credentialId);
    await this._collaborationService.deleteCollaboration(noteId, userId);
    return {
      status: 'success',
      message: 'success delete',
    };
  }
}

module.exports = CollaborationHandler;
