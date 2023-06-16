const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteHandler,
  editNoteHandler,
  deleteNoteHandler,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/notes",
    handler: addNoteHandler,
  },
  {
    method: "GET",
    path: "/notes",
    handler: getAllNotesHandler,
  },
  {
    method: "GET",
    path: "/notes/{id}",
    handler: getNoteHandler,
  },

  {
    method: "PUT",
    path: "/notes/{id}",
    handler: editNoteHandler,
  },
  {
    method: "DELETE",
    path: "/notes/{id}",
    handler: deleteNoteHandler,
  },
];
module.exports = routes;
