const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "note berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    response.header("Access-Control-Allow-Origin", "*");
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "note gagal ditambahkan",
  });

  response.code(500);

  response.header("Access-Control-Allow-Origin", "*");
  return response;
};

const getAllNotesHandler = () => ({
  status: "success",
  data: {
    notes,
  },
});

const getNoteHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "note not found",
  });
  response.code(404);
  return response;
};

const editNoteHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString;

  const index = notes.findIndex((n) => n.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: "success",
      message: "note berhasil diupdate",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "gagal update note",
  });
  response.code(404);
  return response;
};

const deleteNoteHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((n) => n.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "note berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "note gagal dihapus",
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteHandler,
  editNoteHandler,
  deleteNoteHandler,
};
