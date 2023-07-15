const InvariantError = require('../../exceptions/InvariantError');
const { CollaborationPayloadSchema } = require('./schema');

const CollaboratorValidator = {
  validateCollaborationPayload: (payload) => {
    const result = CollaborationPayloadSchema.validate(payload);
    if (result.error) {
      throw new InvariantError(result.error);
    }
  },
};
module.exports = CollaboratorValidator;
