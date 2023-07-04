require('dotenv').config();

const Hapi = require('@hapi/hapi');
const NotesService = require('./services/postgres/NoteService');
const notes = require('./api/notes');
const NoteValidator = require('./validator/notes');

const init = async () => {
  const noteService = new NotesService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: notes,
    options: {
      service: noteService,
      validator: NoteValidator,
    },
  });

  await server.start();

  console.log(`server run at ${server.info.uri}`);
};

init();
