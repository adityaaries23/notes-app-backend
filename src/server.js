const Hapi = require('@hapi/hapi');
const NotesService = require('./services/inMemory/NotesService');
const notes = require('./api/notes');
const NoteValidator = require('./validator/notes');

const init = async () => {
  const noteService = new NotesService();

  const server = Hapi.server({
    port: '5000',
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
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
